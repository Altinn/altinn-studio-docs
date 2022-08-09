---
title: Data elements
description: The app API to work with the data elements associated with an instance.
toc: true
tags: [api]
weight: 100
aliases:
- /teknologi/altinnstudio/altinn-api/app-api/data-elements/
---

## Overview

A data element consist of two parts: its metadata document and the actual data blob. This API work primarily with the blob while keeping the metadata document updated.

**basePath**
```http
{org}/{appname}/instances/{instanceOwnerPartyId}/{instanceGuid}/data
```

## Get data 

Endpoint for downloading the data blob.

```http
GET basePath/{dataGuid}
Accept: application/{xml/json}
```

The response will depend on the type of blob. There are currently 2 primary types: form data based on a model and attachments. An Accept header in a request will be considered only when the requested data element is connected to a data model. The header is then used to pick a serializer for the data.

### Response with form data

A response with form data will either be a json or xml serialized version of the data model depending on the **Accept** header in the request. The value **application/xml** will result in an XML document and the value **application/json** will result inn a JSON document.

### Response with attachment

A response with a file attachment will be a file stream. Content-Type will be the same as the original value given when the file was uploaded. The same is true for the file name.

```http
Content-Disposition: attachment; filename=cute_cat.png; filename*=UTF-8''cute_cat.png
Content-Length: 16994
Content-Type: image/png
```

## Upload data

Endpoint for uploading a new data element on a specific instance.

```http
POST basePath?dataType={data type name}
```

The **dataType** parameter is required and should reference one of the [data types defined on the application](../../models/app-metadata/#datatype). Data types with an **appLogic** property are linked to a form and will have data validation and calculation rules associated with them. Data types without an **appLogic** property will be handeled as an attachment and streamed directly to storage.

Request Content-Type is handled a little differently between the two cases:

1. If a request is uploading form data, the Content-Type is used by Altinn to deserialize the request into a strongly typed object. A request must either be **application/json** or **application/xml**. No other Content-Types are supported. Content-Type is **not** validated against allowed Content-Types on the data type.
2. If a request is uploading an attachment, the validation of Content-Type will depend on the rules of the data type.
    1. If the data type has no Content-Type requirements, there will be no validation and the request can contain any Content-Type. 
    2. If the data type has Content-Type requirements, there is a new set of checks. 
        1. The request Content-Type must either be **application/octet-stream** or match the MIME type of the file being uploaded. Altinn will perform a [mapping from file extension to MIME type](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.PlatformServices/Helpers/MimeTypeMap.cs) before comparing with Content-Type. As an example we can see that .xml will map to *text/xml* and not *application/xml*.
        2. If the data type allow Content-Type **application/octet-stream** no further validation is performed.
        3. If not, the identified MIME type must match one of the allowed Content-Types on the data type.

### Uploading form data as application/json

```json
Content-Type: application/json

{
    "dataFormatProvider": "SERES",
    "dataFormatId": "5703",
    "dataFormatVersion": "34553",
    "Tjenesteeier": null,
    "Kontaktperson": {
        "navn": "Sophie Salt",
        "epost": "1337@altinnstudiotestusers.com",
        "telefonnummer": "90001337"
    },
    "OEnsketBruk": null
}

```

### Uploading form data as application/xml

```xml
Content-Type: application/xml

<BliTjenesteeier_M xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" dataFormatProvider="SERES" dataFormatId="5703" dataFormatVersion="34553">
    <Kontaktperson>
        <navn>Sophie Salt</navn>
        <epost>1337@altinnstudiotestusers.com</epost>
        <telefonnummer>90001337</telefonnummer>
    </Kontaktperson>
</BliTjenesteeier_M>
```

### Uploading an attachment

An example of a request uploading a PDF file.

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="receipt.pdf"; filename*=UTF-8''receipt.pdf
Content-Length: 16994

%PDF-1.4
%Óëéá
1 0 obj
...
```

### Response example

The endpoint returns the data element metadata document that was created.

```json
{
    "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
    "instanceGuid": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "dataType": "default",
    "contentType": "application/xml",
    "blobStoragePath": "org/app/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
    "selfLinks": {
        "apps": "{appPath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        "platform": "{storagePath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff"
    },
    "filename": "default.xml",
    "created": "2019-03-06T15:00:23Z",
    "createdBy": "org23",
    "lastChanged": "2019-03-07T15:00:23Z",
    "lastChangedBy": "org23",
    "size": 20001,
    "locked": false
}
```

## Replace data

Endpoint for replacing the content of an existing data element with new data. The new data must match the data type of the data element it is replacing.

```http
PUT basePath/{dataGuid}
```

The endpoint works exactly like the endpoint for uploading a new data element.

## Delete data

Endpoint for deleting an existing data element. It is currently not possible to delete the data for a form this way. 

```http
DELETE basePath/{dataGuid}
```

{{<children>}}