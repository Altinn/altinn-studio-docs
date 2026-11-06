---
title: applicationmetadata.json
description: The format of the application metadata.
tags: [app-structure]
---

## Overview

`applicationmetadata.json` describes the app: who owns it, which data it stores and who can start it. Altinn Studio creates the file when you create the app, and updates it when you, for example, add a data model or an attachment component. The file is at `App/config/applicationmetadata.json` in the app repository.

When you deploy the app to an environment, the platform reads the file and stores the metadata in Altinn Storage.

## Example

This is the file in a new app with one data model:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/application/application-metadata.schema.v1.json",
  "id": "ttd/my-app",
  "org": "ttd",
  "title": { "nb": "My app" },
  "dataTypes": [
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": ["application/pdf"],
      "maxCount": 0,
      "minCount": 0
    },
    {
      "id": "model",
      "allowedContentTypes": ["application/xml"],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.model.model"
      },
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 1
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": true,
    "organisation": true,
    "person": true,
    "subUnit": true
  },
  "autoDeleteOnProcessEnd": false
}
```

## Properties

| Property | Description |
| --- | --- |
| `id` | The ID of the app, in the form `{org}/{app}`. |
| `org` | The organisation that owns the app. |
| `title` | The name of the app, for each language. |
| `dataTypes` | The data the app stores: form data, attachments and PDFs. Each data type says which file types it accepts (`allowedContentTypes`), how many elements an instance can have (`minCount` and `maxCount`), and which task in the process it belongs to (`taskId`). Form data has `appLogic` with the class of the data model in `classRef`. See [attachments](/en/altinn-studio/v8/reference/data/attachments/). |
| `partyTypesAllowed` | Which party types can start the app. See [party types](/en/altinn-studio/v8/reference/configuration/partytype/). |
| `onEntry` | What the user sees when the app starts. See [startup](/en/altinn-studio/v8/reference/configuration/startup/). |
| `autoDeleteOnProcessEnd` | Whether the platform deletes the instance when the process ends. See [automatic deletion](/en/altinn-studio/v8/reference/configuration/process/auto-delete/). |
| `presentationFields` and `messageBoxConfig` | What the message box shows about the instance. See [message box](/en/altinn-studio/v8/reference/configuration/messagebox/). |
