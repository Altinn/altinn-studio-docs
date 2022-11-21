---
title: Tools & Software
description: Overview of tools and software used for developing and operating Azure Storage
tags: [development, operations, storage, azure, tools, software]
weight: 100
---

## Azurite 

Azurite is an emulator for local Azure Storage development.
It sets up a local storage account containing blob, queue, and table.

[Instructions on downloading and getting started with Azurite.](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio-code#install-azurite)

We use Azurite during development of components that interact with Azure Storage. 
The local emulator enables us to verify that elements are stored and/or pushed correctly to the storage account
and that our logic is successful in retrieving data from the storage account. 


## Azure Storage Explorer

The storage explorer allows you to view, upload, download and manage items in a Storage Account. 
We use the storage Explorer both for local development and operations of our test and production environments. 

[Instructions on downloading and getting started with Storage Explorer](https://azure.microsoft.com/en-us/products/storage/storage-explorer/)