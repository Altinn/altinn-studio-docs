---
title: Architecture patterns in Audit Log
linktitle: Architecture patterns
description: Patterns for ingesting, storing and retrieving authentication and authorisation events.
weight: 1
toc: true
---

Audit Log separates asynchronous ingestion from storing and reading security events.

## Queue-based ingestion

Azure Functions read queue events and forward them to the Audit Log API.

**Benefits:** Loose coupling, traffic buffering and retries.

**Drawbacks:** Events are eventually consistent, may be duplicated and require dead-letter monitoring.

**Code examples**

- [`AuthorizationEventsProcessor` processes events](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Functions/Altinn.Auth.AuditLog.Functions/AuthorizationEventsProcessor.cs).

## Separate event streams over shared layers

Authentication and authorisation events use parallel models, services, repositories and controllers.

**Benefits:** Domain differences remain explicit.

**Drawbacks:** Parallel layers can duplicate code and diverge.

**Code examples**

- [`AuthenticationEventService` handles authentication events](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Altinn.Auth.AuditLog.Core/Services/AuthenticationEventService.cs).

## Time-based database partitioning

A hosted service creates database partitions through a dedicated repository.

**Benefits:** Predictable queries and manageable retention.

**Drawbacks:** Missing partitions can stop writes; cleanup must follow retention requirements.

**Code examples**

- [`PartitionCreationHostedService` creates partitions](https://github.com/Altinn/altinn-auth-audit-log/blob/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e/src/Altinn.Auth.AuditLog/Services/PartitionCreationHostedService.cs).
