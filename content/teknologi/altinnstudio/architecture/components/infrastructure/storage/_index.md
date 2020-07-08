---
title: Storage componentens
linktitle: Storage
description: Storage component provide the physical storage of data
tags: [architecture, infrastructure]
---

## Disks
The Kubernetes Cluster uses disks for volumes

We use [Azure Disk](https://azure.microsoft.com/en-us/services/storage/disks/) for storage in Kubernetes Cluster

## SAN

Other data stores are based on Managed Services from Azure. 

- Azure Cosmos DB
- Azure File Share
- Azure Blob Storage

We dont have control how the data is physical stored in Azure by this services.

[Read a technical overview of Cosmos DB](https://azure.microsoft.com/en-us/blog/a-technical-overview-of-azure-cosmos-db/) that talks some about how storage is handled. 

[Read more about the data store components used](../../platform/datareporting/).
