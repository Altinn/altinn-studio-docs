---
title: Architecture patterns in Register
linktitle: Architecture patterns
description: Patterns used to structure requests, transactions, data streams and background work in Altinn Register.
weight: 1
toc: true
---

Register uses several patterns that are absent, or used differently, in the other Altinn Authorization applications. This page explains the purpose of the main patterns and links to representative code examples.

These are descriptions of the current code, not requirements for other components. A team should consider complexity, skills and operational needs before reusing a pattern.

## Request and handler with a selectable data source

Register separates an operation from the code that performs it. A request is a typed value describing the operation. A handler performs it and returns a typed result. A custom mediator dispatches the request to the correct handler.

This resembles the mediator and request/handler patterns. It is not a complete CQRS architecture: the separation organises operations and selects an implementation; it does not establish separate read and write models for the entire application.

Register often has two handlers for one request. One reads through the Altinn 2 bridge and the other uses the Register database. The mediator selects a handler from per-endpoint configuration. This is also the strategy pattern: the implementation can change without changing the controller or request.

**Advantages**

- Controllers depend on the operation rather than a particular data source.
- The team can move one endpoint at a time from Altinn 2 to the new database.
- Handlers can be tested separately with explicit input and output types.
- Data-source selection is centralised and configurable.

**Disadvantages**

- The flow is indirect: a developer must follow the request through the mediator to the selected handler.
- The custom mediator requires local knowledge and maintenance.
- Two handlers can diverge or duplicate logic unless both are covered by tests.
- The mediator resolves handlers from the dependency injection container, making dependencies less visible than direct constructor injection.

**Code examples**

- [`RegisterMediator` selects the A2 or database handler](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/Mediator/RegisterMediator.cs).
- [`ApiSourceSwitchProvider` reads and caches the per-endpoint selection](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/Mediator/ApiSourceSwitchProvider.cs).
- [`GetV1PartyIdentifiers` provides two handlers for one request](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/Operations/GetV1PartyIdentifiers.cs).

## Unit of Work and savepoints

Unit of Work groups operations that must succeed or roll back together. In Register, `IUnitOfWorkManager` creates a bounded service scope with participants. The PostgreSQL participant owns the connection and a `RepeatableRead` transaction. The code can also create savepoints and roll back part of a transaction without discarding all work.

**Advantages**

- Several persistence operations can share one transaction and a consistent view of the data.
- Commit and rollback are explicit.
- `await using` cleans up resources automatically when the unit ends.
- Savepoints allow a bounded failure to be handled within a larger transaction.

**Disadvantages**

- A long-lived transaction can retain locks and database connections for too long.
- Developers must understand the lifetime of both the Unit of Work and its services.
- A stronger isolation level can cause more conflicts or retries during concurrent writes.
- Savepoints add control but also increase the possible error-handling states.

**Code examples**

- [`IUnitOfWork` defines commit, rollback and lifetime](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/UnitOfWork/IUnitOfWork.cs).
- [`NpgsqlUnitOfWorkParticipant` creates the PostgreSQL transaction](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/UnitOfWork/NpgsqlUnitOfWorkParticipant.cs).
- [`SavePointManager` creates, releases and rolls back savepoints](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/UnitOfWork/SavePointManager.cs).
- [`NpgsqlUnitOfWorkTests` verifies the transaction boundary](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/test/Altinn.Register.Persistence.Tests/NpgsqlUnitOfWorkTests.cs).

## Asynchronous streams with resource ownership

Several read operations return `IAsyncEnumerable<T>` instead of loading the complete result into memory. Consumers process items as the database supplies them. Register attaches the database connection and other asynchronous resources to the stream so they are disposed when enumeration ends.

This combines streaming with explicit resource ownership. The latter matters because the query continues after the method that created the stream has returned.

**Advantages**

- Large results do not need to be buffered in memory.
- Consumers can start processing before the complete query finishes.
- Cancellation follows the enumeration.
- Resource ownership prevents a connection being disposed before the stream is read.

**Disadvantages**

- Errors can occur during enumeration rather than when the method returns.
- The connection and possibly a transaction remain open whilst the consumer reads.
- Consumers must end enumeration correctly on cancellation and early return.
- Debugging and testing are more demanding than for a materialised list.

**Code examples**

- [`GetV1PartyIdentifiers` streams a result from a Unit of Work](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/Operations/GetV1PartyIdentifiers.cs).
- [`ResourceOwningEnumerable` binds resources to the stream](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/AsyncEnumerables/ResourceOwningEnumerable.cs).
- [`RegisterPersistenceAsyncEnumerableExtensions` transfers resource ownership](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/AsyncEnumerables/RegisterPersistenceAsyncEnumerableExtensions.cs).

## Recurring jobs with distributed leases

Register runs import and maintenance jobs in the background. Every replica can contain the same job registration, but a distributed lease determines which replica runs it. The lease has a limited lifetime and is renewed whilst the job runs. If the process loses the lease, the job's cancellation token is cancelled.

The lease provides mutual exclusion between replicas. It does not guarantee exactly-once execution. Crashes, timeouts and network failures can cause work to restart. Jobs should therefore be idempotent or resume safely after partial work.

**Advantages**

- The same container image can run in several replicas without every replica starting the same import.
- Time-limited leases let another replica take over after failure.
- The job framework centralises scheduling, lifecycle, cancellation, logging and metrics.
- `TimeProvider` and interfaces make time-dependent behaviour easier to test.

**Disadvantages**

- Correctness depends on lease duration, renewal and a shared understanding of time.
- A long pause or network failure can lose a lease whilst work is still running.
- Leases do not provide exactly-once execution or replace idempotency.
- The extensive custom job framework requires specialised knowledge.

**Code examples**

- [`RecurringJobHostedService` schedules jobs and acquires leases](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/ServiceDefaults.Jobs/RecurringJobHostedService.cs).
- [`ILeaseProvider` defines acquisition, renewal and release](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/ServiceDefaults.Leases/ILeaseProvider.cs).
- [`RegisterHost` registers import jobs with separate leases](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register/RegisterHost.cs).
- [`RecurringJobHostedServiceTests` tests scheduling and lease behaviour](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/test/Altinn.Register.Tests/Jobs/RecurringJobHostedServiceTests.cs).

## Message-based commands and sagas

Import flows use MassTransit to send commands to queues and process them asynchronously. `ICommandSender` hides transport details from domain code. Longer imports use a saga to retain state across messages and coordinate the next step.

A saga coordinates a business flow spanning several messages or transactions. It replaces one large distributed database transaction with local steps and persisted progress.

**Advantages**

- Producers and consumers do not need to run at the same time.
- Long imports can be split into smaller steps and continue after a restart.
- Queues can absorb load peaks.
- Tests can replace the transport behind `ICommandSender`.

**Disadvantages**

- Results are eventually consistent rather than atomic across the complete flow.
- Messages can be delivered more than once or out of order; consumers must cope with this.
- Troubleshooting requires correlation across messages, consumers and saga state.
- Message-contract and saga-state changes require compatibility planning.

**Code examples**

- [`ICommandSender` separates domain code from message transport](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/ServiceDefaults.MassTransit.Abstractions/ICommandSender.cs).
- [`CommandSender` resolves a queue and sends through MassTransit](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/ServiceDefaults.MassTransit/Commands/CommandSender.cs).
- [`SagaContext` combines message context, saga state and the next command](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Core/ImportJobs/SagaContext.cs).
- [`SagaManager` coordinates the A2 import flow](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register/PartyImport/A2/SagaManager.cs).

## Composed and cached SQL queries

The persistence layer constructs SQL queries from the fields and filters required by an operation. Each combination is cached and reused. Snapshot tests verify the generated SQL for every supported variant.

This resembles the query object pattern: query construction is encapsulated instead of spread across call sites. Register combines it with caching because the variants are bounded and frequently reused.

**Advantages**

- An API can retrieve only the fields needed by the operation.
- Query construction is centralised and can be optimised independently.
- Caching reduces repeated work for the same variant.
- Snapshot tests make generated SQL changes visible in code review.

**Disadvantages**

- The number of combinations grows as fields and filters are added.
- Dynamically generated SQL is harder to read than one static query.
- The cache requires immutable query objects that are safe to share.
- Snapshot tests prove stability, not efficiency with production data.

**Code examples**

- [`PartyQuery` builds and caches query variants](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/PostgreSqlPartyPersistence.PartyQuery.cs).
- [`PostgreSqlPartyPersistence` selects queries from fields and filters](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/PostgreSqlPartyPersistence.cs).
- [`PartyQueryTests` snapshot the SQL variants and test the cache](https://github.com/Altinn/altinn-register/blob/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/test/Altinn.Register.Persistence.Tests/PartyQueryTests.cs).

## When to reuse the patterns

A pattern should solve a specific problem rather than merely make codebases look alike. Before reusing a Register pattern, a team should ask:

- Do we have the same data-volume, migration, transaction or multi-replica problem?
- Is there a standard library or simpler solution that covers the need?
- Does the team have the skills and capacity to operate and maintain the pattern?
- Can automated tests cover failure, cancellation and concurrency states?
- How does the pattern affect production observability and troubleshooting?

The complexity is justified when it protects an important system property. If that property is not relevant to the component, a simpler solution is usually safer.