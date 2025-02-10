---
hidden: true
---

> This is a description of how to set up a signing task in the app process. This involves several manual steps in multiple
> configuration files.
> If you use Altinn Studio Designer to add the signing task to the process, all the manual configuration outlined below
> will be set up automatically. 

### Create data types to store signing related information:

These data types should be added in the `dataTypes` array in `App/config/applicationmetadata.json`.

This data type is used to store the actual signatures that are generated when a user performs the sign action. 

```json
{
    "id": "signatures",
    "allowedContentTypes": [
        "application/json"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

This data type is used to store information about signees. Only required for runtime delegated signing.

```json
{
    "id": "signeeState",
    "allowedContentTypes": [
        "application/pdf"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

 The IDs can be set to something else, but they must match the IDs entered in `signatureDataType` and `signeeStatesDataTypeId` in the process step, as shown in the process task step.

### Extend the app process with signing task:

A process step and a gateway must be added to `App/config/process/process.bpmn`, as in the example below.

Signing uses three user actions. If the Altinn user interface is used by the app, these will be called automatically when you are in the signing step. If only the API is used, these must be called manually via the `/actions` endpoint or via process next.
- `sign`: Explain...
- `reject`: Explain...

```xml
    process task
```
The value of the node `<altinn:signingDataType>signingInformation</altinn:signingDataType>` must match the ID of the data type you configured in the previous step.

### Add Signing layoutSet

Add a new layoutSet folder for your signing task, and update your layout-sets.json.

Your layout-sets.json may look something like this:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
  "sets": [
    {
      "id": "form",
      "dataType": "model",
      "tasks": [
        "Task_1"
      ]
    },
    {
      "id": "signing",
      "dataType": "model",
      "tasks": [
        "Task_2"
      ]
    }
  ]
}
```

In your signing layoutSet folder, add a new file, signing.json, with the following layout:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "headerSigningFounders",
        "type": "Header",
        "size": "L",
        "textResourceBindings": {
          "title": "signing"
        }
      },
      {
        "id": "signee-list",
        "type": "SigneeList",
        "textResourceBindings": {
          "title": "Signees",
          "description": "Signees that should sign",
          "help": "Awaiting signatures from the following people and/or organsations"
        }
      },
      {
        "id": "signing-documents",
        "type": "SigningDocumentList",
        "textResourceBindings": {
          "title": "Documents",
          "description": "Documents that should be signed"
        }
      },
      {
        "id": "signing-state",
        "type": "SigningStatusPanel"
      }
    ]
  }
}
```