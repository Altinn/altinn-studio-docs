---
title: Altinn API
description: Description of the Altinn API for end users and application owners.
tags: ["external", "api", "rest"]
weight: 100
alwaysopen: false
---

{{%notice warning%}}
This page is work-in-progress. This is a proposed api which most likely is going to change.
{{% /notice%}}

# Altinn API

## Introduction
There are primarily two types of consumers of the Altinn APIs. 
The first group consists of applications and systems used by the owners of the applications hosted on the Altinn platform. The group is called *Application Owners*.
The second group consists of organizations and people using the applications through a client system, the group is called *Application Users*. 
The two groups have many similar needs, but there are also differences in what type of tasks they need to be able to perform. 
Traditionally the two groups have had access to completely separated API endpoints in Altinn. 
The new API will be available to both parties, but with some functions that will normally be used only by one of the groups. 

### Application Owner

A list of common tasks for an application owner.

- Query instances for a given application according to status
- Create an application instance
- Upload form data
- Download form data
- Confirm successful download
- Change workflow state?

### Application Users

A list of common tasks for an end user.

- Create an application instance
- Upload form data
- Download form data
- Change workflow state
- View status of an instance

## Two different APIs

The new solution will have multiple APIs. There are two APIs available for Application Owners and Users.
There will be one API for each application cluster, called the *Application API*, and one for the Platform Storage cluster, called *Platform Storage API*. 
Both apis will provide similar operations. The Application API has business rules and must be used for validation of schema data, to change workflow state of the application instance. 
The Platform Storage API will provide access to information stored by the application. [More information on the Platform apis can be found here](/architecture/application/altinn-platform)

### Application API

An api that provides access to all instances of a specific app.

```http
https://org.apps.altinn.no/org/app2018
```

Identifies the organization cluster and the application. Should be used to instantiate an application, to validate data, to change workflow and to save/update data elements.

### Platform Storage API

An api that provides access to all instances of all apps, it should be used to access metadata about instances and to download data elements.

```http
https://platform.altinn.no/storage
```

Should be used by application owners to download data elements. Downloads will be logged. 

### Create an application instance

Altinn assigns an unique identifier to all users that wishes to report data. We call this id *instanceOwnerId*. 
If you do not know this, you should provide the official identity number, e.g social security or organization number, and in some case user name. This should be provided as part of the payload to the creation request. Altinn will look up this identifier and replace it with the instanceOwnerId. The official identity number will not be stored in the instance metadata.

Data elements can be provided as part of the creation request, but can also be uploaded at a later time

```json
{
    "instanceOwnerLookup": { "personNumber": "12247918309" | "organizationNumber": "123456789" | "userName": "xyz" },
    "labels" : [ "gr", "x2" ],
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding",
    "data" : [
        { "elementType": "default", "contentType": "application/xml", "content": "base64xckljsiojfiewljf"}
    ]
}
```

```http
POST https://org.apps.altinn.no/org/app2018/instances
```

This call will return the instance metadata record which was created. A unique identifier (guid) will be created and should be used for later reference.

```json
{
    "id": "347829/762011d1-d341-4c0a-8641-d8a104e83d30",
    "selfLinks": {
        "apps": "https://org.apps.altinn.no/org/app2018/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc",
        "platform": "https://platform.altinn.no/storage/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc"
    },
    "appId": "org/app2018",
    "labels": [ "gr", "x2" ],
    "instanceOwnerId": "347829",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "org23",
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding",
    "workflow": {
        "currentStep": "FormFilling",
        "isComplete": false
    },
    "instanceOwnerStatus": {
        "isArchived": false,
        "isSoftDeleted": false,
        "isMarkedForHardDelete": false
    },
    "appOwnerStatus": {
        "message": {"nb": "felt 23 er feil"}
    },
    "data": [
    {
        "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        "elementType": "default",
        "contentType": "application/xml",
        "storageUrl": "org/app2018/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        "dataLink": {
            "apps":   "https://org.apps.altinn.no/org/app2018/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "platform": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff"
        },
        "fileName": "prefill.xml",
        "createdDateTime": "2019-03-06T15:00:23+01:00",
        "createdBy": "org23",
        "fileSize": 20001,
        "isLocked": false,
    },
    ]
}
```

### Create a data element (optional)

Post data file (xml-document) as body of request. Must specify elementType as definied in the application metadata.

```http
POST https://org.apps.altinn.no/org/app2018/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/data?elementType=default
```

This call updates and returns instance metadata where each data element are given a guid.

```json
{
    "id": "347829/762011d1-d341-4c0a-8641-d8a104e83d30",
    ...
    "data": [
        {
            "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "elementType": "default",
            "contentType": "application/xml",
            "storageUrl": "org/app2018/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "dataLinks": {
                "apps":   "https://org.apps.altinn.no/org/app2018/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
                "platform": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff"
            },
            "fileName": "default.xml",
            "createdDateTime": "2019-03-06T15:00:23+01:00",
            "createdBy": "org23",
            "lastChangedDateTime": "2019-03-07T15:00:23+01:00",
            "lastChangedBy": "org23",
            "fileSize": 20001,
            "isLocked": false
        }
    ]
}
```

### Update a data element

Update (replace) a data element with a new one (payload)

```http
PUT https://org.apps.altinn.no/org/app2018/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff
```

### Download a data element (as application owner)

```http
GET https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff
```

Will update metadata for on data element.

```json
{
...
"data": [
    {
        "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        ...
        "fileName": "default.xml",
        "lastChangedDateTime": "2019-03-06T15:00:23+01:00",
        "lastChangedBy": "org24",
        "fileSize": 34059,
        "isLocked": false,
        "applicationOwner": {
            "downloaded": ["2019-05-15T08:23:01+01:00"]
        }
    }
]
}
```

### Confirm successful download

```http
POST https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff/confirmDownload
```

```json
{
...
"data": [
    {
        "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        ...
        "applicationOwner": {
            "downloaded": ["2019-05-15T08:23:01+01:00"],
            "downloadConfirmed": ["2019-05-16T10:23:00+01:00"]
        }
    }
]
}
```

### Change workflow state

{{%excerpt%}}
<object data="/altinn-api/MVP workflow.png" type="image/png" style="width: 25%;";></object>
{{% /excerpt%}}

```http
POST https://org.altinn.no/org/app2018/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/workflow?moveTo=Submit
```

### Query instances

```http
GET https://platform.altinn.no/storage/instances?appId=org/app2018&workflow.currentStep=Submit&lastChangedDateTime=after(2019-05-01)&label=gr
```

Returns a paginated set of instances (JSON)

```json
{
    "_links": {
        "self": {
            "href": "https://platform.altinn.no/storage/instances?page=0&size=100"
        },
        "next": {
            "href": "https://platform.altinn.no/storage/instances?page=1&size=100"
        },
        "last": {
            "href": "https://platform.altinn.no/storage/instances?page=123&size=100"
        }
    },
    "_embedded": {
        "instances": [
            {...},
            {...},
            ...
      ]
    }
}
```

### Application events

Events can be queried. May be piped.

```http
GET https://platform.altinn.no/storage/applications/org/app2018/events?after=2019-03-30&workflow.currentStep=Submit&workflow.isComplete=true
```

Query result:

```json
[
    {
        "id": "112453234523423344",
        "at": "2019-06-01T12:12:22+01:00",
        "appId": "org/app2018",
        "instanceOwnerId": "347829",
        "instanceLink": "https://platform.altinn.no/storage/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc",
        "dataLinks": [
            {
                "elementType": "default",
                "dataLink": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff"
            },
            {
                "elementType": "attachement",
                "dataLink": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/89fsxx7a-82a9-4bba-z2f2-c8c4dac69agf"
            },
            {
                "elementType": "prefill",
                "dataLink": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/72xx238f-83b9-4bba-x2f2-c8c4dac69alj"
            }
        ],
        "eventType": "WorkflowStateChange",
        "workflowStep": "Submit",
        "userId": "userX"
    }
]
```

## Application Users

### API to validate data

The apps will support the possibility to validate the datamodel for the app without creating a instance of the data

```http
POST https://org.apps.altinn.no/api/v1/org/app2018/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/validate
```

### API to calculate / perform business rules

The app will support the possibility to perform calculation / perform business rules for a datamodell to an app  

```http
POST POST https://org.apps.altinn.no/api/v1/org/app2018/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/calculate
```












## Current Runtime APIS



Get FormData

Save FormData


TextResources

ServiceMetadata



















{{% children description="true" depth="2" %}}
