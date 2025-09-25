---
title: Commands
description: A description of all default Altinn CLI Commands
toc: true
tags: [altinn-cli commands]
aliases:
- /altinn-cli/commands
- /teknologi/altinnstudio/solutions/cli/commands
---

## The command concept

The concept of the CLI application are related to the different parts of a command line command.

Example: `Storage GetData appId=ttd/how-to-name-it processIsComplete=true`

- **Command**: Storage
- **SubCommand**: GetData
- **Option**: "appId=ttd/how-to-name-it" "processIsComplete=true"

### Command

The name of the command shall give an indication of which system component that shall be accessed.

### SubCommand

A sub command defines the operation to be performed on the Command component.

### Option

Options are often used as filter criteria that can be a part of the API call.


## Application command

The Application command is used to interact with application instances. 
Required configurations are [top level configurations](../configuration/#top-level-configurations) and [maskinporten settings](../configuration/#maskinporten-settings)

### CreateInstance
TODO.

### GetInstances

This command downloads all application instances and stores them in the configured StorageOutputFolder.
Note that all instances, regardless of state, are downloaded. 

```bash
Application GetInstances org={org} app={app}
```

## Batch command

The batch command allows you to interact with an application through providing batches of data.

Some configurations are required to be in place before running the batch command.
Read about the setup of [MaskinportenSettings](../configuration/#maskinporten-settings) and [IntantiationConfig](../configuration/#instantiation-configuration).

### CreateInstancesA2

`Batch CreateInstancesA2` instantiates a batch of instances based on the Altinn 2 xml schema.

## Storage command

The Storage command is used to fetch and upload instance data.  

Required configurations are [top level configurations](../configuration/#top-level-configurations) and [maskinporten settings](../configuration/#maskinporten-settings)

### GetData

GetData fetches data elements from Storage. Data can be fetched for an application with different filter criteria or data can be fetch for a specific owner and instance. 

Examples:
 
Below is an example for fetching a specific data element

```bash 
Storage GetData ownerId={ownerId} instanceId={instanceId}  dataId={dataId}
```

Below is an example for fetching all data elements for an application instances where the process is completed

```bash
Storage GetData appId=<applicationId> processIsComplete=true
```

### GetInstance

GetInstance fetches the metadata of an instance from Platform Storage. 
An option `savetofile` is available for storing the instance object to a file, rather than write it in the console.
The json-file will be available in the configured StorageOutputFolder. 

Examples: 

Below is an example for fetching an instance object and writing it to the console 

```bash 
Storage GetInstance ownerId={ownerId} instanceId={instanceId} 
```

The command below will save the instance data to a file.
`Storage GetInstance ownerId=50042027 instanceId=d1e27067-fcce-461c-88b3-ff0d94631a40 savetofile`

### UploadData

Upload uploads a data element to storage, for instance a receipt. 

Example:

```bash
Storage UploadData ownerId={ownerId} instanceId={instanceId} elementType={elementType} file={filepath}
```

The command options defines application owner and to which instance the data shall attached and the full path to the file that shall be uploaded.  

## Help command

The Help command displays help information that is registered on commands, subcommands and options according command line options. 

Examples: 

`Help Storage` displays the available Storage subcommands.

`Help Storage GetData` displays help information registered on the GetData subcommand which shall a command description and a list with description on all options that can be used. 

