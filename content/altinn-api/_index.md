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
- Submitt form data 
- Download form data
- Confirm successful download 
- Change workflow state?

### Application Users

A list of common tasks for an end user. 

- Create an application instance
- Submitt form data
- Download form data
- Change workflow state
- View status of an instance

## Two different APIs

The new solution will have multiple APIs. There are two APIs available for Application Owners and Users.
There will be one API for each application cluster, called the *Application API*, and one for the Platform Storage cluster, called *Platform Storage API*. 
Both apis will provide similar operations. The Application API has business rules and must be used for validation of schema data, to change workflow state of the application instance. 
The Platform Storage API will provide access to information stored by the application.

### Application API

```http
https://nav.apps.altinn.no/nav/app2018
```

Identifies the organization cluster and the application. Should be used to instantiate an application, to validate data, to change workflow and to save/update data elements.

### Platform Storage API

```http
https://platform.altinn.no/storage
```

A "read only" interface that should be used to access metadata about instances and to download dataelements. Should be used by application owners to download data elements. Downloads will be logged. 

### Create an application instance for an Instance Owner

Altinn assigns an unique identifier to all users that wishes to report data. We call this id *instanceOwnerId*. 
If you do not know this system, you should provide the official identity number as the payload to the creation request.

```json
{
    "reportee": { "ssn": "12247918309" | "organizationNumber": "123456789" | "userName": "xyz" },
    "labels" : [ "gr", "x2" ],
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding",
    "data" : [
        { "formId": "default", "contentType": "application/xml", "content": "base64xckljsiojfiewljf"}
    ]
}
```

Then you can do a post to create a new instance of the application for the specific user.

```http
POST https://nav.apps.altinn.no/nav/app2018/instances
```

Returns metadata about the instance that was created. This includes the guid for the instance and a direct resource URI.

```json
{
    "id": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "selfLinks": {
        "apps": "https://nav.apps.altinn.no/nav/app2018/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc",
        "platform": "https://platform.altinn.no/storage/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc"
    },
    "appId": "nav/app2018",
    "labels": [ "gr", "x2" ],
    "instanceOwnerId": "347829",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "Nav23",
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding",
    "workflow": {
        "currentStep": "FormFilling",
    },
    "status": {
        "isArchived": false,
        "isSoftDeleted": false,
        "isMarkedForHardDelete": false
    },
    "data": [
    {
        "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        "formId": "default",
        "contentType": "application/xml",
        "storageUrl": "nav/app2018/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        "dataLink": {
            "apps":   "https://nav.apps.altinn.no/nav/app2018/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "platform": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff"
        },
        "fileName": "prefill.xml",
        "createdDateTime": "2019-03-06T15:00:23+01:00",
        "createdBy": "Nav23",
        "fileSize": 20001,
        "isLocked": false,
    },
    ]
}
```

### Create a  data element (optional)

With form data attached as e.g. XML document

```http
POST https://nav.apps.altinn.no/nav/app2018/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/data?formId=default
```

Returns instance metadata updated and with guid to data element

```json
{
    "id": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "selfLinks": {
        "apps": "https://nav.apps.altinn.no/nav/app2018/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fcø",
        "platform": "https://platform.altinn.no/storage/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc"
    },
    "appId": "nav/app2018",
    "instanceOwnerId": "347829",
    "labels": [ "gr", "x2" ],
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "Nav23",
    "lastChangedDateTime": "2019-04-29T12:24:40Z",
    "lastChangedBy": "Nav23",
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding",
    "workflow": {
        "currentStep": "FormFilling",
        "isCompleted": false
    },
    "data": [
        {
            "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "formId": "default",
            "contentType": "application/xml",
            "storageUrl": "nav/app2018/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "dataLinks": {
                "apps":   "https://nav.apps.altinn.no/nav/app2018/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
                "platform": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff"
            },
            "fileName": "default.xml",
            "createdDateTime": "2019-03-06T15:00:23+01:00",
            "createdBy": "Nav23",
            "lastChangedDateTime": "2019-03-07T15:00:23+01:00",
            "lastChangedBy": "Nav23",
            "fileSize": 20001,
            "isLocked": false
        }
    ]
}
```

### Update a data element

Update (replace) a data element with a new one (payload)

```http
PUT https://nav.apps.altinn.no/nav/app2018/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff
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
        "formId": "default",
        "contentType": "application/xml",
        "storageUrl": "nav/app2018/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        "dataLinks": {
            "apps":   "https://nav.apps.altinn.no/nav/app2018/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "platform": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff"
        },
        "fileName": "default.xml",
        "createdDateTime": "2019-03-06T15:00:23+01:00",
        "createdBy": "Nav23",
        "fileSize": 20001,
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
        "applicationOwner": {
            "downloaded": ["2019-05-15T08:23:01+01:00"],
            "downloadConfirmed": ["2019-05-16T10:23:00+01:00"]
        }
    }
]
}
```

### Query instances

```http
GET https://platform.altinn.no/storage/instances?workflow.currentStep=Submit&lastChangedDateTime=after(2019-05-01)&label=gr
```

Returns a paginated set of instances (JSON)

```json
{
    "_links": {
        "self": {
            "href": "instances?page=0&size=100"
        },
        "next": {
            "href": "instances?page=1&size=100"
        },
        "last": {
            "href": "instances?page=123&size=100"
        }
    },
    "_embedded": {
        "instances": [
            {},
            {}
      ]
    }
}
```

### Application events

Events can be queried. May be piped.

```http
GET https://platform.altinn.no/storage/applications/nav/app2018/events?after=2019-03-30&workflow.currentStep=Submit
```

Query result:

```json
[
    {
        "id": "112453234523423344",
        "at": "2019-06-01T12:12:22+01:00",
        "appId": "nav/app2018",
        "instanceOwnerId": "347829",
        "instanceLink": "https://platform.altinn.no/storage/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc",
        "dataLinks": [
            {
                "formId": "default",
                "dataLink": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff"
            },
            {
                "formId": "attachement",
                "dataLink": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/89fsxx7a-82a9-4bba-z2f2-c8c4dac69agf"
            },
            {
                "formId": "prefill",
                "dataLink": "https://platform.altinn.no/storage/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/72xx238f-83b9-4bba-x2f2-c8c4dac69alj"
            }
        ],
        "eventType": "WorkflowStateChange",
        "workflowStep": "Submit",
        "userId": "userX"
    }
]
```

{{% children description="true" depth="2" %}}
