---
title: Resource Registry persistence architecture
linktitle: Persistence architecture
description: Database model, event log and blob containers in Resource Registry.
weight: 2
toc: true
---

Resource Registry stores resource metadata, access lists and derived resource subjects in PostgreSQL. XACML policies reside in Azure Blob Storage. The model is based on [source commit `8cc7866`](https://github.com/Altinn/altinn-resource-registry/tree/8cc78660c3650e71b48fd18587928ef8065d9ea4).

Select a diagram to open it at full size in a new tab.

## Storage overview

<a href="./storage-overview.svg" target="_blank" rel="noopener"><img src="./storage-overview.svg" alt="Resource Registry storage overview" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

PostgreSQL uses a single schema, `resourceregistry`. The diagrams split that schema by responsibility to keep the details legible. The grouping does not represent separate database schemas.

## Resources and resource subjects

<a href="./resource-schema.svg" target="_blank" rel="noopener"><img src="./resource-schema.svg" alt="Resource and resource-subject tables in resourceregistry" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

`resource_identifier` represents the durable identity of a resource and holds change-feed state. `resources` is a version table where every change receives a new `version_id`. The `current_resources` database view selects the latest version of each resource.

`resourcesubjects` contains subjects derived from the policy. Its composite primary key consists of the resource and subject URNs. The table supports soft deletion and timestamp-based incremental retrieval, but the migrations create no foreign key to the resource tables.

## Access lists

<a href="./access-list-schema.svg" target="_blank" rel="noopener"><img src="./access-list-schema.svg" alt="Access-list tables in resourceregistry" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Access lists use event sourcing with a separate, updated state model. `access_list_events` is the append-oriented event log. `access_list_state`, `access_list_members_state` and `access_list_resource_connections_state` make reads efficient without replaying all events. `version` provides optimistic concurrency control.

The event log has no foreign key to the state table. The access-list-to-resource link also has no foreign key after the resource table was versioned. The diagram therefore distinguishes enforced foreign keys from logical links through `aggregate_id` and `resource_identifier`.

## Blob structure

<a href="./blob-structure.svg" target="_blank" rel="noopener"><img src="./blob-structure.svg" alt="Blob containers and policy paths in Resource Registry" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

Resource Registry uses two configurable containers:

- `ResourceRegistryContainer`, named `resourceregistry` by default, stores resource policies as `<resource ID>/resourcepolicy.xml`
- `MetadataContainer`, named `metadata` by default, stores app policies as `<organisation>/<app>/policy.xml`

Blob versions allow a specific resource-policy version to be retrieved. Blob leases protect conditional updates against concurrent writes. PostgreSQL does not store the blob path or version ID, but `policy_uploaded` records whether a policy has been uploaded for the resource.

## Scope and planned move

The diagrams show tables, key indexes, the view and storage links. Database functions, sequence implementation, grants and full index names are omitted for readability.

Resource Registry is planned to move into `altinn-authorization-tmp`. The source link documents the current implementation. Update this page if the move changes migrations, namespaces, containers or data ownership.
