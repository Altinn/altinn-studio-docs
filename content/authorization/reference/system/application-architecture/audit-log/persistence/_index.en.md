---
title: Audit Log persistence architecture
linktitle: Persistence architecture
description: Database schemas, event queues and partition model in Audit Log.
weight: 2
toc: true
---

Audit Log stores authentication and authorisation events in PostgreSQL. Azure Storage queues receive events before functions forward them to the Audit Log API. The model is based on [source commit `c070a2c`](https://github.com/Altinn/altinn-auth-audit-log/tree/c070a2c4e18ee648ed9fb8a82dc53e2889ee235e).

Select a diagram to open it at full size in a new tab.

## Storage overview

<a href="./storage-overview.svg" target="_blank" rel="noopener"><img src="./storage-overview.svg" alt="Audit Log storage overview" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

The `eventlog` queue receives authentication events. The `authorizationeventlog` queue receives authorisation events in both legacy JSON and a versioned, Brotli-compressed format. Azure Functions read the queues and send events to the API, which writes them to PostgreSQL.

## The `authentication` schema

<a href="./authentication-schema.svg" target="_blank" rel="noopener"><img src="./authentication-schema.svg" alt="Database model for the authentication schema in Audit Log" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

The active `eventlogv1` table stores authentication events and is partitioned by `created`. Three lookup tables describe event type, authentication method and assurance level. The foreign keys are created as `NOT VALID`: PostgreSQL enforces them for new and changed rows, but the migration did not check existing rows.

The legacy `eventlog` table has the same fields and is a TimescaleDB hypertable with a one-year interval. It remains in the migrations, but the active repository writes to `eventlogv1`.

## The `authz` schema

<a href="./authz-schema.svg" target="_blank" rel="noopener"><img src="./authz-schema.svg" alt="Database model for the authz schema in Audit Log" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

The active `eventlogv1` table stores decision context, resource, operation and the PDP decision. `decision` is a lookup table containing Permit, Deny, Indeterminate and NotApplicable. `subject_party_uuid` was added after the original table migration.

The legacy `eventlog` table is a TimescaleDB hypertable and does not contain `subject_party_uuid`. The active repository writes to `eventlogv1`.

## Monthly partitions and retention

<a href="./partition-model.svg" target="_blank" rel="noopener"><img src="./partition-model.svg" alt="Audit Log partition and retention model" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

A background service creates partitions for the previous, current and next months in both schemas. Names follow `eventlogv1_yYYYYmMM`. The service runs at startup and then daily.

Old-partition deletion is controlled per environment by `EnableOldPartitionDeletion` and `RetentionMonths`. The default configuration disables deletion. The production configuration specifies 24 months but also disables deletion at the analysed commit. This documents technical configuration, not a legal or business retention policy.

## Scope and maintenance

The diagrams show tables, key relations, queues and partitions. Grants, complete lookup values and TimescaleDB internal tables are omitted. The analysed persistence implementation contains no blob containers.
