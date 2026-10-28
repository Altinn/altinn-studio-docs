---
title: Architecture patterns in Authorization and the PDP
linktitle: Architecture patterns
description: Patterns for building decision context, retrieving policies and evaluating access in Authorization and the PDP.
weight: 1
toc: true
---

Authorization is Altinn's policy decision point (PDP): it receives decision context and determines whether an action is permitted. The code is based on XACML, a standard for attribute-based access control. This page describes the current code and its trade-offs; it does not recommend XACML for every component.

## Separating enforcement from decision-making

The architecture separates four roles. A policy enforcement point (PEP) protects a service and enforces the outcome. The PDP makes the decision. The policy information point (PIP) supplies attributes, while the policy retrieval point (PRP) retrieves the rules to evaluate.

**Benefits**

- A service can enforce access without containing the complete rules engine.
- Decision logic and data retrieval can be tested separately.
- Multiple services can use the same decision model.

**Drawbacks**

- A PDP call adds latency and an operational dependency.
- Boundaries blur when the controller enriches, evaluates and applies additional rules.
- The PEP must interpret every outcome safely. `Indeterminate` is not `Deny`, but must not grant access.

**Code examples**

- [`DecisionController` coordinates the PDP decision flow](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Controllers/DecisionController.cs).
- [`PDPAppSI` is a PEP client for the PDP](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.PEP/src/Altinn.Authorization.PEP/Implementation/PDPAppSI.cs).
- [`DecisionHelper` interprets PDP responses on the PEP side](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.PEP/src/Altinn.Authorization.PEP/Helpers/DecisionHelper.cs).

## XACML as the canonical decision model

The XACML model is the common contract throughout the decision flow. The API accepts both XML and the XACML JSON profile. Model binding reads the raw request, and adapters translate both formats into the same internal context model.

**Benefits**

- A standard model makes policies, requests and results precise.
- XML and JSON clients use the same decision engine.
- The standard's conformance suite can verify semantics.

**Drawbacks**

- XACML has many concepts and is difficult to learn and troubleshoot.
- Format conversion can conceal differences.
- A general standard creates larger contracts than a simple permission request.

**Code examples**

- [`XacmlRequestApiModelBinder` selects XML or JSON](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Modelbindig/XacmlRequestApiModelBinder.cs).
- [`PolicyDecisionPoint` evaluates the internal XACML model](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.ABAC/src/Altinn.Authorization.ABAC/PolicyDecisionPoint.cs).

## Context enrichment before evaluation

The request need not contain every attribute used by a policy. `ContextHandler` enriches it with information about subjects, roles, resources and instances. It orchestrates lookups against Register, Resource Registry, Access Management, profile and storage services.

**Benefits**

- Clients do not need to know every data source behind a decision.
- Policies can use a common attribute vocabulary across services.
- Lookups and backwards compatibility are handled centrally.

**Drawbacks**

- One PDP request can trigger many external calls and unpredictable latency.
- Incorrect or stale attributes can change the decision.
- PDP availability becomes coupled to its data sources and their contracts.

**Code examples**

- [`ContextHandler` builds the enriched decision context](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Services/Implementation/ContextHandler.cs).
- [`DelegationContextHandler` adds attributes for delegated rights](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Services/Implementation/DelegationContextHandler.cs).

## Policy-source strategy and caching

The PRP selects a policy source from the resource. Resource policies are retrieved through Resource Registry, while app policies can come from the policy repository. Parsed policies are cached in memory, and delegations can refer to a particular storage path and version.

**Benefits**

- The decision engine does not need to know the storage location.
- Multiple policy sources share one evaluation flow.
- Caching reduces network calls and expensive XACML parsing.
- Version lookups tie a delegation to the relevant policy version.

**Drawbacks**

- Cache keys and expiry must prevent stale policy use.
- In-memory caching gives application instances different local state.
- Incorrect source selection can cause the wrong policy to be evaluated.

**Code example**

- [`PolicyRetrievalPoint` selects the source and caches policies](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Services/Implementation/PolicyRetrievalPoint.cs).

## Rules engine with combining algorithms

The PDP evaluates rules as data. A policy determines how several rule results are combined, for example whether a denial takes precedence. Decision logic can therefore change in a policy without recompiling service code.

**Benefits**

- Policy and application code can evolve independently.
- The same engine supports several rule strategies.
- A matrix can test combinations of possible outcomes.

**Drawbacks**

- Rule order and algorithm selection can produce surprising outcomes.
- `NotApplicable` and `Indeterminate` make the logic more complex than true or false.
- General evaluation is harder to trace than a direct code branch.

**Code examples**

- [`PolicyDecisionPoint` evaluates policy sets, policies and rules](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.ABAC/src/Altinn.Authorization.ABAC/PolicyDecisionPoint.cs).
- [`CombiningAlgorithmMatrixTest` verifies combinations of outcomes](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.ABAC/test/Altinn.Authorization.ABAC.Tests/CombiningAlgorithmMatrixTest.cs).

## Decomposing requests with several decisions

XACML JSON can send shared attribute categories and several references in one request. The controller constructs a part for each reference, evaluates the parts in sequence and combines the results in one response.

**Benefits**

- Clients avoid repeating the same attributes.
- One API call can request several related decisions.
- Each part uses the normal single-decision flow.

**Drawbacks**

- Parts are processed sequentially, so latency grows with the number of decisions.
- Incorrect references require unambiguous handling.
- A large request can trigger many enrichment and policy lookups.

**Code example**

- [`DecisionController` decomposes `MultiRequests` and combines the responses](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Controllers/DecisionController.cs).

## Conformance tests as an architecture safeguard

The ABAC engine has unit tests for matching and combining results. The deployable PDP also has XACML 3.0 conformance tests. These act as executable contracts for a standard where a small semantic change can alter access.

**Benefits**

- Changes are checked against the standard and Altinn flows.
- Test matrices cover combinations that are difficult to spot in code review.
- The ABAC package can evolve without losing documented decision semantics.

**Drawbacks**

- Conformance does not prove that policies express the correct business rules.
- Large suites can be slow and difficult to troubleshoot.
- Local deviations from the standard must be documented.

**Code example**

- [`Xacml30ConformanceTests` verifies the PDP against the XACML suite](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/test/Altinn.Authorization.Tests/Integration/Xacml30ConformanceTests.cs).

## When to reuse the patterns

The separation between PEP and PDP is useful when several services need the same decision model. XACML and a general ABAC engine should only be reused when the need justifies their complexity. New enrichment sources affect correctness, latency and availability. A system using the PDP must define how its PEP handles `Deny`, `NotApplicable`, `Indeterminate`, timeouts and invalid responses.