---
title: Data
description: The Platform API for working with data elements.
toc: true
tags: [api]
weight: 200
aliases:
- /teknologi/altinnstudio/altinn-api/platform-api/instancee-events/
---

### DataElement
The DataElement model is a metadata document for a specific form or binary file. The most important aspects of this document is that it holds information about where the actual data is being stored, and how the data is being used by the application.

Most apps will automatically create a data element to represent the form being filled out by the user. More advanced apps will also require the user to upload attachments or to fill in multiple forms.

An instance can have many data elements, but each data element can not reference more than one data file.

## Request data element
In order to query a single data element:
```http
GET /instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}
```

### instanceOwnerPartyId
- The party id of the instance owner.

### instanceGuid
- The id of the instance that the data element is associated with.

### dataGuid
- The id of the data element to retrieve.

## Request list of data elements
Query a list of data elements belonging to an instance:
```http
GET /instances/{instanceOwnerPartyId}/{instanceGuid}/dataelements
```

### instanceOwnerPartyId
- The party id of the instance owner

### instanceGuid
- The id of the instance that the data element is associated with

## Create and save data element

It is possible to POST a data element to the API. 

 ```http
 POST /instances/{instanceOwnerPartyId}/{instanceGuid}/data
```

This endpoint has parameters in the path as well as optional parameters as query parameters.

## instanceOwnerPartyId *
- The party id of the instance owner.

## instanceGuid *
- The id of the instance that the data element is associated with.

## dataType
- The data type identifier for the data being uploaded.

## refs
- An optional array of data element references.

## generatedFromTask
- An optional id of the task the data element was generated from

{{% notice info %}}
There are also PUT and DELETE endpoints available. Please see the openAPI page for technical details.
{{% /notice %}}
