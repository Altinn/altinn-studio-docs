---
title: Configuration
description: A description of required configurations before using Altinn CLI.
toc: true
tags: [altinn-cli configuration]
aliases:
- /altinn-cli/commands
- /teknologi/altinnstudio/solutions/cli/configuration
---

# Configuration

The configuration of Altinn CLI is contained in `appsettings.json` in the repository.

It contains three sections:
  1. Top level config
  2. Maskinporten settings
  3. InstantiationConfig


## Top level configurations

These configurations cover where to read and store data for the general commands, 
as well as setting up base addresses for both Platform Storage and the app owner to interact with.

Below are the default values, further follows a description of each property. 

```json
{
  "StorageBaseAddress": "https://platform.tt02.altinn.no/storage/api/v1",
  "AppBaseAddress": "https://{org}.apps.tt02.altinn.no",
  "StorageOutputFolder": "c:/storage/Output",
  "StorageInputFolder": "c:/storage/Input",
  "CommandDefinitionFile": "C:/storage/CommandDefs/Commands.json"
}
```

Name | Description
------------|-------
StorageBaseAddress | Base address for Platform Storage. Use domain `tt02.altinn.no` or `altinn.no` 
AppBaseAddress | Base address for the app owner in Altinn. Use domain `tt02.altinn.no` or `altinn.no`  
StorageOutputFolder | Folder where all output data should be stored. I.e. where to store downloaded instance data.
StorageInputFolder | Folder where all input data can be found. I.e. where all instance templates are available,
CommandDefinitionFile | Path for custom command definitions. If file exists, default commands will not be available.


## Maskinporten settings

All clients interacting with an Altinn App and Altinn Platform must be authenticated using an Altinn Token. 
In Altinn CLI, this is enabled by first authenticating through _Maskinporten_, and then converting the token. 

Maskinporten settings cover the configuration for the registered client in maskinporten, 
as well as enabling an automatic exchange into an Altinn Token before sending a request.

[Read more about setting up a maskinporten client with a custom key here.](maskinporten-setup)

[A closer description of the config values is available here.](https://github.com/Altinn/altinn-apiclient-maskinporten)

Your maskinporten setting should look something like the example below. 
Note that `ExchangeToAltinnToken` is set to `true`, and the scopes that are required. for interacting with an app or the platform.

```json
  "MaskinportenSettings": {
    "Environment": "ver2",
    "ClientId": "e15abbbc-36ad-4300-abe9-021c9a245e20",
    "Scope": "altinn:serviceowner altinn:serviceowner/instances.read altinn:serviceowner/instances.write",
    "EncodedJwk": "eyJwIjoiMms2RlZMRW9iVVY0dmpjRjRCVWNLOUhasdfasdfarhgawfN2YXE5eE95a3NyS1Q345435S19oNV45645635423545t45t54wrgsdfgsfdgsfd444aefasdf5NzdFcWhGTGtaSVAzSmhZTlA0MEZOc1EifQ==",
    "ExhangeToAltinnToken": true
  }
```

## Instantiation configuration

The instantiation configuration is used by the batch command to identify folders to read/write from and to, 
as well as to find the mappings for Altinn App entities such as applicationId and dataType. 

Below is a description of each property in the config, further follows an example of an instantiation configuration.

Name | Description
----------------------|-------
InputFolder           | The folder where all batch files are available to be processed
OutputFolder          | The folder where all processed batch files are moved to
ErrorFolder           | The folder where the generated batch of all failed jobs is stored
ApplicationIdLookup   | A dictionary for mapping _ExternalServiceCode_ to _ApplicationId_
DataTypeLookup        | A dictionary for mapping _DataFormatId_ to _dataType_

```json
"InstantiationConfig": {
    "InputFolder": "C:/altinn-batch/input",
    "OutputFolder": "C:/altinn-batch/output/",
    "ErrorFolder": "C:/altinn-batch/error/",
    "ApplicationIdLookup": {
      "5681": "ttd/apps-test",
      "1337": "ttd/apps-test-prod",
    },
    "DataTypeLookup": {
      "6823": "default",
      "1337": "Kursdomene_BliTjenesteeier_M_2020-05-25_5703_34553_SERES"
    }
  }
```

{{<children>}}
