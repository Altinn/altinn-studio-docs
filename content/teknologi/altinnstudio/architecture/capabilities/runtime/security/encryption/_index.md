---
title: Encryption 
description: Description of the encryption architecture
tags: [architecture, security, encryption]
toc: true
---

Apps hosted in Altinn Apps could cover lots of functional scenario. For statefull apps where the App store data in Altinn Platform in the Storage component, the 
type of data could be data that is 100% public to highly sensitive data. 

The Org that creates the App, would based on the type of data have spceial requirements for encryption to support their Confidentiality requirement for the data.

## Storage encryption
The storage component uses Azure Cosmos DB and Azrue Blob storage to store data for apps. In Cosmos metadata about instance data is stored, while in Azure Blob Storage.

Azure Cosmos DB encryps all data at rest. This is transparent for Altinn Platform. 
[See documentation about Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/database-encryption-at-rest)

Azure Blob storage encrypts all data at rest. This is transparent for Altinn Platform. Blog storage support customer managed keys.

[See documentation about Azure Storage Encryption](https://docs.microsoft.com/en-us/azure/storage/common/storage-service-encryption)