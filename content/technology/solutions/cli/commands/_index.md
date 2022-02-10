---
title: Commands
description: Altinn CLI Commands
toc: true
tags: [altinn-cli commands]
aliases:
- /altinn-cli/commands
- /teknologi/altinnstudio/solutions/cli/commands
---

## Application

The Application command is used to interact with application instances. 

### CreateInstance
TODO.

### GetInstances

This command downloads all application instances and stores them in the `StorageOutputFolder`.

`Application GetInstances org=<org> app=<app>`

Note that all instances, regardless of state, are downloaded. 

## Batch 

The batch command allows you to interact with an application through providing batches of data.

### CreateInstancesA2

`Batch CreateInstancesA2` instantiates a batch of instances based on the Altinn 2 xml schema.

Some configurations are required to be in place before running this command. 


## Storage

The Storage command is used to fetch and upload instance data.  

### GetData

GetData fetches data elements from Storage. Data can be fetched for an Applikation with different filter criterias or data can be fetch for a spesific owner and instance. 

Examples:

**Storage GetData ownerId=<ownerId> instanceId=<instanceid>  dataId=<dataId>** fetches a specific data element

**Storage GetData appId=<applicationId> <Filter criterias ex. processIsComplete=true>** fetchs all data elements for an application whose status processing is set to completed

### GetInstance

### UploadData

Upload uploads a data element to storage, for instance a receipt. 

Example:

**Storage UploadData ownerId=<ownerId> instanceId=<instanceId> elementType=<elementType> file=<filepath>**
The command options defines application owner and to which instance the data shall attached and the full path to the file that shall be uploaded.  




## Help

The Help command displays help information that is registered on commands, subcommands and options according command line options. 

Example : 
        **Help Storage** displays the available Storage subcommands.
        **Help Storage GetData** displays help information registred on the GetData subcommand which shall a command description and a list with description on all options that can be used. 

