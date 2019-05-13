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

# Two API consumers
There are primarily two types of consumers of the Altinn APIs. 
The first group is applications and systems used by the owners of the applications hosted on the Altinn platform. The group is called *Application Owners*.
The second group is organizations and people using the applications through a client system, the group is called *Application Users*. 
The two groups have many similar needs, but there are also differences in what type of tasks they need to be able to perform. 
Traditionally the two groups have had access to completely separated API endpoints in Altinn. 
The new API will be available to both parties, but with some functions that will normally be used only by one of the groups. 

## Application Owner
A list of common tasks for an application owner.

- Query instances for a given application according to status
- Create an application instance
- Submitt form data 
- Download form data
- Confirm successful download 
- Change workflow state?

## Application Users
A list of common tasks for an end user. 

- Create an application instance
- Submitt form data
- Download form data
- Change workflow state
- View status of an instance

# Multiple API
The new solution will have multiple APIs. There will be one API for each application and one common API available by the platform. The primary platform API will provide access to information about instances and the actual data.

## Application API

### Application endpoint

```http
https://nav.apps.altinn.no/nav-app2018
```

Identifies the organization cluster and the application.

### Create an application instance for an Instance Owner

Altinn assigns an unique identifier to all users that wishes to report data. We call this id *instanceOwnerId*. 
If you do not know this system, you should provide the official identity number as the payload to the creation request.

```json
{
    "reportee": { "ssn": "12247918309", "organizationNumber": "123456789", "userName": "xyz" },
    "applicationOwner": {
        "labels" : [ "gr", "x2" ]
    },
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding"
}
```

Then you can do a post to create a new instance of the application for the specific user.

```http
POST /instances
```

Returns all metadata about the instance that was created. This includes the guid for the instance and a direct resource URI.

```json
{
    "id": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "link": "/instances/41e57962-dfb7-4502-a4dd-8da28b0885fc?instanceOwnerId=347829",
    "applicationId": "nav-app2018",
    "applicationOwnerId": "nav",
    "instanceOwnerId": "347829",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "Nav23",
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding",
    "currentWorkflowStep": "FormFilling",
    "applicationOwner": {
        "labels": [ "gr", "x2" ]
    }
}
```

### Submitt form data (first time)

With form data attached as e.g. XML document

```http
POST /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data?formId=default?instanceOwnerId=347829
```

Returns instance metadata updated and with guid to data element

```json
{
    "id": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "selfLink": "/instances/41e57962-dfb7-4502-a4dd-8da28b0885fc?instanceOwnerId=347829",
    "applicationId": "nav-app2018",
    "applicationOwnerId": "nav",
    "instanceOwnerId": "347829",
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
    "applicationOwner": {
        "labels": [ "gr", "x2" ]
    },
    "data": [
        {
            "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "formId": "default",
            "contentType": "application/xml",
            "storageUrl": "nav/nav-app2018/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "dataLink": "/instances/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "fileName": "default.xml",
            "createdDateTime": "2019-03-06T15:00:23+01:00",
            "createdBy": "Nav23",
            "fileSize": 20001,
            "isLocked": false,
            "applicationOwner": {
                "downloads": ["2019-05-20T00:00:00Z", "2019-05-22T00:00:00Z"],
                "downloadsConfirmed": ["2019-05-22T00:00:01Z"]
            },
        },
    ]
}
```

### Confirm successful download

```http
POST /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data/fc1c2a1b-d115-4dd2-8769-07e64de9588d/confirmDownload?instanceOwnerId=12345
```

### Query instances

```http
GET /instances?workflow.currentStep=Submitted&filter="lastChanged ge 2019-05-01T00:00:00+01:00"&label=gr
```
Returns a paginated set of instances (JSON)

```json
{
    "_links": {
        "self": {
            "href": "unstances?page=0&size=100"
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


### Download form data

```http
GET /instances/41e57962-dfb7-4502-a4dd-8da28b0885fc/data/fc1c2a1b-d115-4dd2-8769-07e64de9588d?instanceOwnerId=12345
```

{{% children description="true" depth="2" %}}
