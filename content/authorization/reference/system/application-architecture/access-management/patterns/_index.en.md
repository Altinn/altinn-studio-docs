---
title: Architecture patterns in Access Management
linktitle: Architecture patterns
description: Patterns used to divide APIs, model access relationships, enrich attributes and handle side effects in Access Management.
weight: 1
toc: true
---

Access Management has grown through several generations of access control. Its code therefore combines newer patterns with older services that remain in use. This page describes the current code; it does not recommend copying every solution into other components.

## Consumer-specific API surfaces over a shared core

Access Management has separate API projects for end users, service owners, enterprises, Maskinporten, metadata and internal consumers. Each surface owns its controllers, contracts and security boundary, whilst domain services, integrations and persistence are shared.

This is a modular host with several API façades. The division is physical in the project structure, but several APIs can be composed into the same executable host.

**Advantages**

- Each consumer receives a bounded API and clearer security scope.
- Internal models do not have to become public contracts.
- API surfaces can evolve and be tested without duplicating domain logic.

**Disadvantages**

- Shared startup and dependency registration can become extensive.
- Similar OpenAPI, authentication and validation code can be duplicated.
- Project boundaries do not provide runtime isolation when surfaces share a host.

**Code examples**

- [`AccessManagementHost` composes core, persistence, integrations and API modules](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement/AccessManagementHost.cs).
- [`AccessManagementEnduserHost` registers the end-user services](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Api.Enduser/AccessManagementEnduserHost.cs).
- [`AccessManagementServiceOwnerHost` configures the service-owner API](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Api.ServiceOwner/AccessManagementServiceOwnerHost.cs).

## Gradual replacement of the older architecture

The codebase contains both `Altinn.AccessManagement.Core` and the newer `Altinn.AccessMgmt.Core`, together with two persistence areas. The executable host registers both. New APIs and services can be introduced alongside older flows and enabled with feature flags.

This resembles the strangler pattern: new functionality is placed around or beside the old implementation and traffic moves gradually. It is a transition architecture, not a desirable permanent division.

**Advantages**

- The team can move one flow at a time without a risky complete rewrite.
- Feature flags support controlled rollout and faster rollback.
- Old contracts can continue whilst new models are established.

**Disadvantages**

- Two cores and persistence models make placement of new code unclear.
- Dependencies can cross old and new boundaries, making later removal harder.
- Terms and rules can develop two diverging implementations.
- Long-lived feature flags increase the combinations to test and operate.

**Code examples**

- [`AccessManagementHost` registers both older and newer components](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement/AccessManagementHost.cs).
- [`AccessMgmtFeatureFlags` collects switches for newer flows and background services](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.Core/AccessMgmtFeatureFlags.cs).
- [`AssignmentService` combines the newer EF model with older contracts](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.Core/Services/AssignmentService.cs).

## Resolver graph for attribute enrichment

Authorization and validation flows can start with a few attributes, such as a URN or party identifier, and require more. Resolvers form a tree of internal nodes and leaf functions. Each leaf declares the attributes it needs and can resolve. The tree runs until no new attributes are added.

This combines a resolver chain, a dependency graph and fixed-point calculation. Callers request desired attributes without knowing every intermediate step.

**Advantages**

- Attribute lookups and dependencies are reusable.
- Only resolvers that can contribute to the desired result need to run.
- Independent branches can execute concurrently.

**Disadvantages**

- The runtime call chain can be hard to follow.
- Incorrect dependency declarations can omit attributes or cause unnecessary calls.
- Parallel resolvers require thread-safe results and integration clients.
- A growing graph needs protection against cycles and unexpectedly expensive lookups.

**Code examples**

- [`AttributeResolver` traverses until the result no longer changes](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Core/Resolvers/AttributeResolver.cs).
- [`UrnResolver` is the root for Altinn resolvers](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Core/Resolvers/UrnResolver.cs).
- [`AltinnOrganizationResolverTests` verifies a concrete branch](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/AccessMgmt.Tests/Unit/Resolvers/Altinn/AltinnOrganizationResolverTests.cs).

## Composable assertions for validation

Validation rules are small functions that add structured errors. `Asserter<T>` combines them with `All`, `Any` and `Single`. Domain extensions express rules for attribute combinations and delegability.

This resembles the specification and composite patterns, but the result is `ValidationProblemDetails` rather than only true or false.

**Advantages**

- Small rules can be reused and composed.
- A response can contain several errors.
- Combination rules are explicit and independently testable.

**Disadvantages**

- Custom combinator semantics require precise tests.
- Names such as `Any` and `Single` can be misunderstood without knowledge of error semantics.
- Rules split between combinators and extensions can be hard to discover.

**Code examples**

- [`Asserter<T>` composes rules and builds validation errors](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Core/Asserters/Asserter.cs).
- [`AttributeMatchAsserter` defines domain rules](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessManagement.Core/Asserters/AttributeMatchAsserter.cs).
- [`AsserterTests` verifies the combinator semantics](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/AccessMgmt.Tests/Unit/Asserters/AsserterTests.cs).

## Graph model for access relationships

The newer data model represents actors as `Entity` and relationships as `Assignment` or `Delegation`. Roles describe the relationship type. Access packages, resources and instances attach through separate junction tables. The same base model can therefore express several access relationships.

This is a relational graph model: nodes and edges are stored in PostgreSQL tables rather than a graph database. `ConnectionQuery` centralises traversal and projection.

**Advantages**

- Shared concepts express roles, packages, resources and delegation chains.
- New relationship types can often be added without a separate top-level domain.
- PostgreSQL retains transactions, foreign keys and a familiar operational model.

**Disadvantages**

- Queries require many joins and can be difficult to optimise.
- Generic names such as `Entity` and `Assignment` hide domain meaning without documentation.
- Deep or recursive relationships can be expensive in a relational database.
- A flexible model needs strong rules to prevent invalid combinations.

**Code examples**

- [`Assignment` models a directed relationship with a role](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Models/Assignment.cs).
- [`Delegation` represents onward delegation of an assignment](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Models/Delegation.cs).
- [`ConnectionQuery` traverses assignments, delegations and hierarchy](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Queries/Connection/ConnectionQuery.cs).
- [`ConnectionQueryTests` verifies graph queries against PostgreSQL](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/AccessMgmt.Tests/Integration/Services/ConnectionQueryTests.cs).

## Query objects over Entity Framework

Complex reads are collected in query classes and filter objects. They compose EF queries, select direction and data sources, and project into dedicated result models. This separates demanding read logic from writing domain services.

**Advantages**

- Complex query logic can be tested and optimised together.
- Filter objects make available choices explicit.
- `AsNoTracking` and projection can reduce pure-read cost.

**Disadvantages**

- The abstraction can hide generated SQL and call counts.
- Too many options can turn one query object into another monolith.
- PostgreSQL-specific plan workarounds require database tests and measurements.

**Code examples**

- [`ConnectionQuery` encapsulates complex read logic](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Queries/Connection/ConnectionQuery.cs).
- [`ConnectionQueryFilter` describes query constraints](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Queries/Connection/ConnectionQueryFilter.cs).
- [`ConnectionQueryFilterTest` verifies filter combinations](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/AccessMgmt.Tests/Unit/Queries/ConnectionQueryFilterTest.cs).

## Audit trail and transactional outbox

The EF model contains audit fields and audit entities. Callers pass `AuditValues` to an extended `SaveChangesAsync`, carrying the acting person or system into the database change. For side effects such as notifications, an outbox message is stored with domain data. A background job retrieves it, selects a handler and records the outcome.

The outbox pattern solves the dual-write problem between a database and external service: the commit contains both domain state and the side-effect request. The side effect itself occurs later and outside the database transaction.

**Advantages**

- Audit information follows the normal persistence flow.
- A successful commit does not lose the notification request.
- External failures can be retried without rolling back domain data.
- Handler logs and status support troubleshooting.

**Disadvantages**

- Side effects are eventually consistent and can be delayed.
- Messages can be processed more than once; handlers and recipients need idempotency.
- Outbox tables require cleanup, monitoring and poison-message handling.
- Audit data is reliable only when every writer supplies correct `AuditValues`.

**Code examples**

- [`AuditExtensions` extends persistence with audit values](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Extensions/AuditExtensions.cs).
- [`OutboxMessage` stores the side-effect request](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Models/OutboxMessage.cs).
- [`OutboxHandlerJob` locks, processes and updates messages](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.Core/HostedServices/Outbox/OutboxHandlerJob.cs).
- [`RightholderAddedNotificationHandler` creates a notification idempotency key](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.Core/Outbox/RightholderAddedNotificationHandler.cs).
- [`OutboxHandlerJobTest` verifies message processing](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/test/Altinn.AccessMgmt.Core.Tests/Integration/HostedServices/Outbox/OutboxHandlerJobTest.cs).

## When to reuse the patterns

The patterns solve different problems and should not be introduced as one shared standard. Before reusing one, determine whether the component has the same need for several API surfaces, gradual migration, graph queries, attribute enrichment or reliable side effects. The team must also be able to test failure states, explain indirect flows and operate the associated background processes.