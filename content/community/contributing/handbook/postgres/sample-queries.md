---
title: Sample queries
linktitle: Sample queries
description: Sample queries for PostgreSQL
tags: [development, postgresql]
weight: 100
---

## Update json property
- Generic need: update json property (not top level)
- Example case: undelete soft deleted instance by updating the IsSoftDeleted boolean property

```sql
update storage.instances set instance = jsonb_set(instance, '{Status, IsSoftDeleted}', 'false')
	where org = 'serviceowner' and instance -> 'InstanceOwner' ->> 'PersonNumber' in ('ssn1', 'ssn2')

```

## Delete json property
- Generic need: delete json field (not top level)
- Example case: undelete soft deleted instance by removing the SoftDeleted timestamp property

```sql
update storage.instances set instance = instance::jsonb #- '{Status, SoftDeleted}'
	where org = 'serviceowner' and instance -> 'InstanceOwner' ->> 'PersonNumber' in ('ssn1', 'ssn2')

```