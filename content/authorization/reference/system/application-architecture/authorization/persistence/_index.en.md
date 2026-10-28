---
title: Authorization and PDP persistence architecture
linktitle: Persistence architecture
description: Delegation metadata, policy blobs, event queue and local cache in Authorization and the PDP.
weight: 2
toc: true
---

The persistence architecture distinguishes data owned by the PDP, data it writes, local non-durable cache state and data read from other components. The model is based on [source commit `20fcb3f`](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization).

Select a diagram to open it at full size in a new tab.

## Storage overview

<a href="./storage-overview.svg" target="_blank" rel="noopener"><img src="./storage-overview.svg" alt="Authorization and PDP storage overview" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

The PDP owns one PostgreSQL table and uses two blob containers. Authorization events are written to an Azure Storage queue. Information from Register, Resource Registry, Access Management, Profile, and Storage is read through APIs and is not owned by the PDP.

## The `delegation` database schema

<a href="./delegation-schema.svg" target="_blank" rel="noopener"><img src="./delegation-schema.svg" alt="Database model for the PDP delegation schema" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

`delegationchanges` is an append-oriented change log. Each row contains the path of a delegation policy in Blob Storage and, when present, its blob version ID. Database functions find the current change or history for a combination of application and parties.

`AuthorizationDbContext` has no `DbSet`, and the EF snapshot is empty. EF uses a hand-written baseline to create or adopt the schema, whilst raw Npgsql repositories continue to use the table and functions. The down migration is deliberately empty to prevent loss of delegation data.

## Blob structure

<a href="./blob-structure.svg" target="_blank" rel="noopener"><img src="./blob-structure.svg" alt="Blob containers and policy paths in Authorization" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

`MetadataContainer` uses the default name `metadata` and contains application and resource policies. `DelegationsContainer` uses the default name `delegationpolicies` and contains versioned `delegationpolicy.xml` files. The repository selects a container from the file name.

Blob leases protect concurrent policy updates. PostgreSQL stores the blob path and an optional version ID, allowing the PDP to evaluate the policy version associated with a change when specified.

## Event queue and cache

`AuthorizationEventQueueName` specifies the decision-event queue. Default configuration uses `authorizationeventlog`. Events are sent to Audit Log, and queue messages have a 90-day TTL.

`IMemoryCache` stores parsed policies, parties, profiles, roles and responses from Resource Registry and Access Management. The cache is local to the process and is not an authoritative or durable data source.

## Scope and maintenance

The diagrams show the PDP's own storage boundaries. They do not document databases behind external APIs. Update the diagrams and source commit when the baseline migration, policy paths, container configuration, queue or caching strategy changes.