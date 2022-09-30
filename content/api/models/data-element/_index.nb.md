---
title: DataElement
description: Et DataElement er en metadatabeholder som brukes til å spore statusen til faktiske data blobs.
toc: true
tags: [api, translate-to-norwegian]
weight: 60
---


## DataElement

The data element model is the main model for metadata related to a specific data element. A data element can be any data associated with an instance.
The two most common type of data is the actual form data and attachments.

### Properties

| Name            | Description                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------- |
| id              | A globally unique id for the data element.                                                  |
| instanceGuid    | The globally unique id for the instance the data element is associated with.                |
| dataType        | The name of the data type describing the requirements of the data element.                  |
| filename        | The data blob name if represented as a file.                                                |
| contentType     | The mime-type of the content of the blob.                                                   |
| blobStoragePath | The physical location of the data as it is stored in the Application owner storage account. |
| selfLinks       | A complex type containing a set of named links of how to obtain a copy of the data element. |
| size            | The number of bytes in the blob.                                                            |
| locked          | A value indicating whether the blob is read only.                                           |
| refs            | A list of UUID values. Can be used to link related data elements.                           |
| isRead          | A boolean indicating if the dataElement has been read by a user.                            |
| created         | The date and time when the data element was first created.                                  |
| createdBy       | An idenfificator indicating who it was that created the data element.                       |
| lastChanged     | The date and time when the data element was last changed.                                   |
| lastChangedBy   | An idenfificator indicating who it was that made the last change to the data element.       |

## Complete example

This data element example is from the instance example.

```json
{
    "id": "8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
    "instanceGuid": "bd9edd59-b18c-4726-aa9e-6b150eade814",
    "dataType": "Kursdomene_BliTjenesteeier_M_2020-05-25_5703_34553_SERES",
    "filename": null,
    "contentType": "application/xml",
    "blobStoragePath": "ttd/bli-applikasjonseier/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
    "selfLinks": {
        "apps": "https://local.altinn.cloud/ttd/bli-applikasjonseier/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
        "platform": "https://local.altinn.cloud/storage/api/v1/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d"
    },
    "size": 401,
    "locked": false,
    "refs": [],
    "created": "2020-11-18T15:56:43.1089008Z",
    "createdBy": null,
    "lastChanged": "2020-11-18T15:56:43.1089008Z",
    "lastChangedBy": null
}
```
