---
title: Data elements
description: The app API to work with the data elements associated with an instance
toc: true
tags: [api]
weight: 100
---

## Overview

A Data element consist of two parts; its metadata document and the actual data blob. This API work primarily with the blob while keeping the metadata document updated.

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

The response will depend on the type of blob. There are currently 2 primary types; forms and attachments.

### Response with form data

The respons will either be a json or xml serialized version of the object model depending on the **Accept** header in the request. The value **application/xml** will result in an XML document and the value **application/json** will result inn a JSON document.

### Response with instance attachment

The respons will be a file stream. Content-Type will be the same as the original value given when the file was uploaded. The same is true for the file name.

```http
Content-Disposition: attachment; filename=cute_cat.png; filename*=UTF-8''cute_cat.png
Content-Length: 16994
Content-Type: image/png
```

## Upload data

Endpoint for initially uploading a new data element on a specific instance.

```http
POST basePath?dataType={data type name}
```

The **dataType** parameter is required and should contain the name of one of the data types defined on the application. Data types with an **appLogic** property are linked to a form and will have data validation and calculation rules associated with them. Submitted data will be deserialized from **application/xml** or **application/json** based on the content-type of the request. Data types without an **appLogic** property will be handeled as any random file and streamed directly to storage.

### Submitting form as application/json

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

### Submitting form as application/xml

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

### Submitting attachment

Most web api client frameworks will have support for creating a valid file upload request for binary data.

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename=receipt.pdf; filename*=UTF-8''receipt.pdf
Content-Length: 16994

%PDF-1.4
%Óëéá
1 0 obj
...
```

### Upload response

The endpoint returns the data element metadata document that was created.

```json
{
    "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
    "instanceGuid": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "dataType": "default",
    "contentType": "application/xml",
    "blobStoragePath": "org/app/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
    "selfLinks": {
        "apps":   "{appPath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
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

Endpoint for replacing an existing data element with new data. The new data must match the data type of the data element it is replacing.

```http
PUT basePath/{dataGuid}
```

The endpoint works exactly like the endpoint for uploading a new data element.

## Delete data

Endpoint for deleting an existing data element. It is currently not possible to delete the data for a form this way. 

```http
DELETE basePath/{dataGuid}
```

## Validate data


