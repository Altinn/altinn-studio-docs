---
title: Register persistence architecture
linktitle: Persistence architecture
description: Database tables, relationships and Azure Storage usage in Altinn Register.
weight: 2
toc: true
---

The persistence architecture shows how Register stores durable data. The model is based on SQL migrations through version 0.63 at [source commit `8d34dbf`](https://github.com/Altinn/altinn-register/tree/8d34dbf828e40b8d529f0ee2040aa1eeed55bd87/src/apps/Altinn.Register/src/Altinn.Register.Persistence/Migration).

## Storage overview

<a href="./storage-overview.svg" target="_blank" rel="noopener">
  <img src="./storage-overview.svg" alt="Register storage overview" style="width:100%;height:auto;display:block;cursor:zoom-in;" />
</a>

Select the diagram to open it at full size in a new tab.

Register owns the PostgreSQL `register` schema. The MassTransit setup also creates eleven Quartz tables in a configurable shared infrastructure schema. Register uses Azure Storage Queues for background work, but the source does not use Azure Blob Storage and therefore defines no application-owned blob containers.

## Database model

<a href="./database-model.svg" target="_blank" rel="noopener">
  <img src="./database-model.svg" alt="Register database model with tables and key columns" style="width:100%;height:auto;display:block;cursor:zoom-in;" />
</a>

Select the diagram to open it at full size in a new tab.

### Main areas

- `party` is the root for people, organisations, users, self-identified users and system users.
- `external_role_definition` defines role types, whilst `external_role_assignment` connects two parties. Command history and event tables provide idempotency and a change trail.
- import, saga and lease tables store progress and coordination for background jobs.
- `country` and `municipality` contain reference data.
- `rate_limit` stores counters and time windows for rate limiting.

### Scope

The SVG shows all 20 application tables and their key columns, primary keys, foreign keys and unique keys. It omits indexes, PostgreSQL domains and types, sequences, check constraints and stored functions to remain readable. Those details are available in the pinned migrations.

`import_job_state.job_id` and `import_job_party_state.job_id` deliberately have no foreign key to `import_job`, because the tables are updated in separate transactions.

## Maintaining the model

When a migration creates, changes, renames or drops a table, update the SVG and source commit on this page. Changes to Azure Storage clients must also be checked so that new queues or blob containers are documented.