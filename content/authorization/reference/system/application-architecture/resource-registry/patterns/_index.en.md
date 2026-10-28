---
title: Architecture patterns in Resource Registry
linktitle: Architecture patterns
description: Patterns for resource metadata, policies, access lists and ownership.
weight: 1
toc: true
---

Resource Registry combines conventional layering with explicit aggregates for access lists. The component is planned to move into the temporary authorisation repository; pinned links preserve the analysed source.

## Service layer over repositories

Controllers use core services that depend on repository interfaces.

**Benefits:** API, domain logic and storage can be tested separately.

**Drawbacks:** Thin layers add forwarding; large services collect too many rules.

**Code examples**

- [`ResourceRegistryService` coordinates resource flows](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry.Core/Services/ResourceRegistryService.cs).

## Aggregates with event handlers

Persistence defines generic boundaries for aggregates and aggregate events.

**Benefits:** Rules and events belong to one consistency boundary.

**Drawbacks:** Indirect event flow is harder to trace; large aggregates cause contention.

**Code examples**

- [`IAggregateRepository` defines aggregate storage](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry.Persistence/Aggregates/IAggregateRepository.cs).

## Explicit ownership authorisation

An ASP.NET Core handler verifies resource ownership through a provider.

**Benefits:** The rule is reusable and declarative.

**Drawbacks:** Several handlers can interact unexpectedly; owner lookup failures affect all protected operations.

**Code examples**

- [`OwnedResourceAuthorizationHandler` verifies ownership](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry/Auth/OwnedResourceAuthorizationHandler.cs).

## Access lists as a subdomain

Access lists have dedicated APIs, service boundaries and persistence.

**Benefits:** List rules are isolated from general metadata.

**Drawbacks:** Consistency across resources, lists and memberships spans operations.

**Code examples**

- [`AccessListService` contains list rules](https://github.com/Altinn/altinn-resource-registry/blob/8cc78660c3650e71b48fd18587928ef8065d9ea4/src/Altinn.ResourceRegistry.Core/AccessLists/AccessListService.cs).
