---
title: Encryption 
description: Description of the encryption architecture
tags: [architecture, security, encryption]
toc: true
---

{{% panel %}}
**NOTE:** Work in progress. [See Github Issue](https://github.com/Altinn/altinn-studio/issues/958).
{{% /panel %}}

Apps hosted in Altinn Apps could cover lots of functional scenario. For statefull apps where the App store data in Altinn Platform in the Storage component, the 
type of data could be data that is 100% public to highly sensitive data. 

The Org that creates the App, would based on the type of data have spceial requirements for encryption to support their Confidentiality requirement for the data.

## Storage encryption
The storage component uses Azure Cosmos DB and Azrue Blob storage to store data for apps. In Cosmos metadata about instance data is stored, while in Azure Blob Storage.

Azure Cosmos DB encryps all data at rest. This is transparent for Altinn Platform. 
[See documentation about Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/database-encryption-at-rest)

Azure Blob storage encrypts all data at rest. This is transparent for Altinn Platform. Blog storage support customer managed keys.

[See documentation about Azure Storage Encryption](https://docs.microsoft.com/en-us/azure/storage/common/storage-service-encryption)


## Application layer encryption
For App scenario where there is a higher requirement for encryption there might be a need to implement Application layer encryption. 

This can be done throug custom encryption code using standard algorithms or through existing libraries like 
the [Azure Storage client library](https://docs.microsoft.com/en-us/azure/storage/common/storage-client-side-encryption?toc=%2fazure%2fstorage%2fblobs%2ftoc.json).

### Algorithms
For a application layer encryption functionality we would need to choose a best practice encryption algoritmh together with best practice key-length.

Needs to be analyzed.

### Limitations
Application layer encryption would probably limit the size on the data, since it would not be possible to stream data to storage before we encrypt. 

Needs to be analyzed

### Key management
When doing application layer encryption Altinn Platform needs to manage the keys for the encrypted data.

Needs to be analyzed.

### Risk
Doing Application Layer introudces risks for data loss. (if keys are lost).

Needs to be analyzed.
