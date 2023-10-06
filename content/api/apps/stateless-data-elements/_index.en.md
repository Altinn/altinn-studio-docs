---
title: Stateless data elements
description: The app API to work with stateless date elements not associated with an instance
toc: true
tags: [api]
weight: 100
aliases:
- /teknologi/altinnstudio/altinn-api/app-api/stateless-data-elements/
---

## Overview

A stateless data element is a data object based on a data model without relations to an instance, instance owner or a state.
The data is never persisted anywhere, and the available endpoints simply creates, prefills and/or runs calculations on a data object before 
returning it to the caller.

**basePath**
```http
{org}/{app}/v1/data
```

## Create new data 

Endpoint for creating a new stateless data element based on a data type.

```http
POST basePath?dataType=[dataTypeId]
Accept: application/{xml/json}
```

The **dataType** parameter is required and should reference one of the [data types defined on the application](../../models/app-metadata/#datatype) that requires app logic.

If prefill or calculations are defined for the data type, these will be run on the data element before it is returned.

### Response 

A response with the data element in the body will be returned if a valid data type is provided.

## Calculate data

Endpoint for running calculations on a data element.

```http
PUT basePath?dataType=[dataTypeId]
Accept: application/{xml/json}
```

The **dataType** parameter is required and should reference one of the [data types defined on the application](../../models/app-metadata/#datatype) that requires app logic.

The Content-Type is used by Altinn to deserialize the request into a strongly typed object. A request must either be **application/json** or **application/xml**.
No other Content-Types are supported. Content-Type is **not** validated against allowed Content-Types on the data type.

### Providing data as application/json

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

### Providing data as application/xml

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
