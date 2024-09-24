---
title: User defined metadata
description: App API for adding user defined metadata to data elements.
toc: true
tags: [api]
weight: 100
---

## Overview

Custom metadata on data elements allows key-value pairs of metadata to be added to a data element via the API. There are dedicated endpoints for setting and retrieving these values. 
The data is also available in other endpoints where metadata about data elements is retrieved.

It is important to note that this is data that users with write permissions on the data element can freely edit via the API. 
If you want to add metadata that cannot be edited via the apps API, you should use [metadata](../metadata) instead. 
That field is not exposed via the app's API and can only be set through calls to storage, often via custom-developed C# code.

## Retrieve

Endpoint for downloading the list of custom metadata that has already been added to a data element.

```http
GET {org}/{appname}/instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}/user-defined-metadata
Accept: application/json
```

Svaret:
```json
{
    "userDefinedMetadata": [
        {
            "key": "TheKey",
            "value": "TheValue"
        },
        {
            "key": "AnotherKey",
            "value": "AnotherValue"
        }
    ]
}
```

## Edit

Endpoint for editing the metadata. Submitted data will overwrite the entire list and will remove everything that is not included in the latest update.

```http
PUT {org}/{appname}/instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}/user-defined-metadata
Content-Type: application/json

{
    "userDefinedMetadata": [
        {
            "key": "TheKey",
            "value": "TheValue"
        },
        {
            "key": "AnotherKey",
            "value": "AnotherValue"
        }
    ]
}
```

The response will contain the list of all key-value pairs that have been added to the data element, in the same format as the submitted data.