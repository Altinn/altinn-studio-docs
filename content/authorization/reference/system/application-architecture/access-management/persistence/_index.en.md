---
title: Access Management persistence architecture
linktitle: Persistence architecture
description: Database schemas, tables, audit history and blob storage in Access Management.
weight: 2
toc: true
---

The persistence architecture shows both the newer EF-based model and legacy schemas still in use. It is based on [the EF snapshot and SQL migrations at source commit `20fcb3f`](https://github.com/Altinn/altinn-authorization-tmp/tree/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.AccessManagement/src).

Select a diagram to open it at full size in a new tab.

## Storage overview

<a href="./storage-overview.svg" target="_blank" rel="noopener"><img src="./storage-overview.svg" alt="Access Management storage overview" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

## The `dbo` schema

The `dbo` schema is split into two diagrams because it contains 34 tables.

### Catalogue and metadata

<a href="./dbo-catalog-schema.svg" target="_blank" rel="noopener"><img src="./dbo-catalog-schema.svg" alt="Catalogue and metadata tables in dbo" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

These tables describe entities, providers, resources, roles, areas and access packages. Link tables express which roles grant packages and resources.

### Access relations and operations

<a href="./dbo-access-schema.svg" target="_blank" rel="noopener"><img src="./dbo-access-schema.svg" alt="Access and operational tables in dbo" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

This group contains assignments, delegations, requests, instance and resource links, the outbox, error queue and import progress. The `connections` view projects relations across assignments and delegations, but is not a table.

## The `dbo_history` schema

<a href="./dbo-history-schema.svg" target="_blank" rel="noopener"><img src="./dbo-history-schema.svg" alt="Audit tables in dbo_history" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

The 27 audit tables store validity, change operation and the actor or system performing the change, together with a copy of the domain fields.

## The `consent` schema

<a href="./consent-schema.svg" target="_blank" rel="noopener"><img src="./consent-schema.svg" alt="Consent tables in consent" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Six tables store consent requests, rights, events, language context, metadata and resource attributes. Several links are enforced in application logic and have no foreign keys in the baseline script.

## Legacy schemas

### `delegation`

<a href="./delegation-schema.svg" target="_blank" rel="noopener"><img src="./delegation-schema.svg" alt="Legacy delegation tables" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

The three change tables refer to policy blob paths and versions and store the identities taking part in a delegation.

### `accessmanagement`

<a href="./accessmanagement-schema.svg" target="_blank" rel="noopener"><img src="./accessmanagement-schema.svg" alt="Legacy resource table in accessmanagement" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

This schema contains the resource lookup referenced by `resourceregistrydelegationchanges`.

## Blob container

`MetadataContainer` specifies the container for XACML policy blobs. Default configuration uses `metadata`. PostgreSQL stores the policy path and version ID, whilst blob leases coordinate updates. Account and container names may vary by environment.

## Scope and maintenance

The EF diagrams are generated from `AppDbContextModelSnapshot` and show key columns. Audit fields are grouped as `Audit_*`. Indexes, checks, triggers, functions and full foreign-key names are omitted for readability. Update the diagrams and source commit when the EF snapshot, SQL migrations or blob configuration change.