---
title: Persistence
linktitle: Persistence
description:
weight: 10
---

## Configure Storage Format in Altinn Storage
Data elements containing form data have a C# class that is used for processing in the application. This allows the application's APIs to work with both JSON and XML.
When accessing storage directly (for example through a machine integration or in the receipt application), the C# class is not available. In such cases, you must work with the serialized data.
For historical reasons, the default format is XML. However, if desired, you can choose JSON by setting allowedContentTypes in the file `App/config/applicationmetadata.json`, ensuring that `application/json appears first.

```json
{
    ...
    "dataTypes":[
        {
            ...
            "appLogic":{
                "className": "Altinn.App.Model",
                ...
            },
            "allowedContentTypes": ["application/json", "application/xml"]
        }
    ]
}
```
When updating older applications that already have instances stored in storage, it is important that `application/xml` remains in the list. Existing data elements will not be converted.

## Configure minimum persistence lifetime

You may configure the persistence lifetime for instances of an application by configuring the `preventInstanceDeletionForDays` property in the `App/config/applicationmetadata.json`-file.
This prevents the instances from being deleted by users and the service owner for the time period set.

### Example - prevent deletion of instances for 30 days

```json
{
    ...
    "preventInstanceDeletionForDays": 30,
    ...
}
```
