---
title: Storage componentens
linktitle: Storage
description: Altinn 3 uses different types of storage components.
tags: [architecture, infrastructure]
---

## Cosmos DB

Altinn 3 uses Cosmos DB to store metadata about data in Altinn.

- Instances
- InstanceEvents
- DataElements

Azure CosmosDB is configured with one Write Region and one read region. This for redundancy.

Azure CosmosDB provides automatic backup of the database. This is in additon to our custom backup.

[Read more about Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction)
  
## PostgreSQL

PostgreSQL is used at a relational database for Altinn Platform Events and for Altinn Repository.

## Azure Blob storage

All da

## Azure Disks

The Kubernetes Cluster uses disks for volumes

We use [Azure Disk](https://azure.microsoft.com/en-us/services/storage/disks/) for storage in Kubernetes Cluster
