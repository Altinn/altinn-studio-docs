---
title: Backup and recovery
linktitle: Backup & Recovery
description: All data created in the different solutions are backed up so it is possible to restore it in case of data loss 
tags: [solution, architecture]
alwaysopen: false
weight: 99
---

## Backup

### Altinn Platform

As described in the data section of the archiecture documentation Altinn Platform stores data both in 
Azure Cosmos DB and in Azure Blob Storage. 

There is differen


#### Cosmos db
According to Cosmos DB [documentation](https://docs.microsoft.com/en-us/azure/cosmos-db/online-backup-and-restore) Azure Cosmos DB 
automatically takes backups of your data at regular intervals. The automatic backups are taken without affecting the performance
 or availability of the database operations. All the backups are stored separately in a storage service, and those backups 
 are globally replicated for resiliency against regional disasters.

Azure Cosmos DB automatically takes a backup of your database every 4 hours and at any point of time, only the 
latest 2 backups are stored. However, if the container or database is deleted, Azure Cosmos DB retains the existing 
snapshots of a given container or database for 30 days.

![image](https://user-images.githubusercontent.com/13309071/77343494-0ea97380-6d32-11ea-9be9-9d573438ee56.png)

This functionality is out of the box when using Azure Cosmos DB. 

##### Custom backup with help of Azure Function
Azure Cosmos DB exposes a change feed for containers in Azure Cosmos DB. 

Change feed support in Azure Cosmos DB works by listening to an Azure Cosmos container for any changes. It then 
outputs the sorted list of documents that were changed in the order in which they were modified. The changes are 
persisted, can be processed asynchronously and incrementally, and the output can be distributed across one or 
more consumers for parallel processing.

 ![image](https://user-images.githubusercontent.com/13309071/77245359-4b844600-6c1e-11ea-9960-b09dd9a05d92.png)

The solution is to have a [Azure Function that listens to the change feed](https://docs.microsoft.com/en-us/azure/cosmos-db/change-feed-functions)  
and copies documents from Cosmos DB when they are created or modified to a blob storage. 

The blob storage is a shared blob storage for all orgs.  (The same way Cosmos DB is shared)
The blob storage should have enabled soft delete. All versions of a document in Cosmos should be written 
to the same blob. Soft delete will keep track of all versions.

#### Blob storage
Each org has their own separte storage account with a blob storage to store data for applications. 
In addition Altinn Platform has a shared blobstorge where metedata like XACML is stored for the different Apps. 



### Altinn Studio



## Recovery

We would need to create tools to be able to restore elements from blob storage to Cosmos DB and from Snapshots in blob storage.

This is defined as issues in Github. [Issue for Cosmos DB](https://github.com/Altinn/altinn-studio/issues/4008) and [Issue for Blob storage](https://github.com/Altinn/altinn-studio/issues/4007)