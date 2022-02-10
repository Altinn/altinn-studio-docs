---
title: Configuration
description: Altinn CLI Configuration
toc: true
tags: [altinn-cli configuration]
aliases:
- /altinn-cli/commands
- /teknologi/altinnstudio/solutions/cli/configuration
---

## Configuration

The configuration of Altinn CLI is contained in `appsettings.json` in the repository.

It contains three sections:
  1. Toplevel config
  2. Maskinporten settings
  3. InstantiationConfig

### Top level configurations
```json
{
  "APIBaseAddressLocal": "http://localhost:5010/storage/api/v1",
  "APIBaseAddress": "https://platform.tt02.altinn.no/storage/api/v1",
  "AppAPIBaseAddress": "https://{org}.apps.tt02.altinn.no",
  "UseLiveClient": "True",
  "StorageOutputFolder": "c:/storage/Output",
  "StorageInputFolder": "c:/storage/Input",
  "CommandDefinitionFile": "C:/storage/CommandDefs/Commands.json",
  "MaskinportenBaseAddress": "https://ver2.maskinporten.no",
  "AuthBaseAddress": "https://platform.tt02.altinn.no/authentication/api/v1",
  "tokenSettings": {
  }
}
```
### Maskinporten settings
```json
  "MaskinportenSettings": {
    "Environment": "ver2",
    "ClientId": "",
    "Scope": "altinn:serviceowner altinn:serviceowner/instances.read",
    "EncodedJwk": "",
    "ExhangeToAltinnToken": true,
    "UseAltinnTestOrg":  false
  }
```
### Instantiation configuration

The instantiation configuration is used by the batch command to identify folders to read/write from and to, 
as well as to find the mappings for Altinn App entities such as applicationId and dataType. 

```json
"InstantiationConfig": {
    "InputFolder": "C:/prefill/input",
    "OutputFolder": "C:/prefill/output/",
    "ErrorFolder": "C:/prefill/error/",
    "ApplicationIdLookup": {
      "5681": "ttd/apps-test",
      "1337": "ttd/apps-test-prod",
      "digdir/bli-tjenesteeier": "digdir/bli-tjenesteeier"
    },
    "DataTypeLookup": {
      "6823": "default",
      "1337": "Kursdomene_BliTjenesteeier_M_2020-05-25_5703_34553_SERES"
    }
  }
```

