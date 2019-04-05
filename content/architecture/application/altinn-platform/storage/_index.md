---
title: Application arhicture Storage component - Altinn Platform
linktitle: Storage
description: Description of the application architecture for Storage component
tags: ["solution", "architecture"]
weight: 100
alwaysopen: true
---

The Storage component will be a ASP.Net Core MVC Application exposing REST-API to Altinn Apps.

[See Github for implementation details](https://github.com/Altinn/altinn-studio/issues/311)

Storage provides persistent storage service for applications in Altinn. It is mostly used by the applications to store information about *instances* and their *data* elements. 
It provides a registry of all *applications* and their metadata. 

Resources: Instance, Application, Event

# /instances

An application instance is created when a instance onwer (reportee) starts a workflow in an Altinn application.
An instance replaces Altinn2 Message. 
An instanceOwner is a person/company that reports information via Altinn.
An applicationId refers to the application information element which defines the metadata about the application.

```json
{
    "id": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "applicationId": "TEST/sailor",
    "applicationOwnerId": "TEST",
    "instanceOwnerId": "666",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "user32",
    "lastChangedDateTime": "2019-03-07T23:59:49+01:00",
    "lastChangedBy": "user34",
    "dueDateTime": null,
    "visibleDateTime": null,
    "presentationField": "Færder påmelding 2019",
    "externalSystemReference": null,
    "currentWorkflowStep": "started",
    "isCompleted": true,
    "isDeleted": [{
        "deletionDateTime": "2017-12-22",
        "deletedBy": "user34"
    }],
    "applicationOwnerFeedback": {
        "receivedDate": "2019-05-11T03:00:23+01:00",
        "status": "OK"
    },
    "data": {
        "692ee7df-82a9-4bba-b2f2-c8c4dac69aff": {
            "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "formId": "boatdata",
            "contentType": "application/json",
            "storageUrl": "TEST/sailor/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "link": "/instances/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "fileName": "davidsyacht.json",
            "createdDateTime": "2019-03-06T15:00:23+01:00",
            "createdBy": "XXX",
            "signature": "oajviojoi2j3l23889yv8js909u293840zz092u3",
            "fileSize": 2003,
            "isLocked": true
        },
         "999911d1-d341-4c0a-8641-d8a104e83d30": {
            "id": "999911d1-d341-4c0a-8641-d8a104e83d30",
            "formId": "crewlist",
            "contentType": "text/xml",
            "storageUrl": "TEST/sailor/762011d1-d341-4c0a-8641-d8a104e83d30/data/999911d1-d341-4c0a-8641-d8a104e83d30",
            "link": "/instances/762011d1-d341-4c0a-8641-d8a104e83d30/data/999911d1-d341-4c0a-8641-d8a104e83d30",
            "fileName": "crewLIst.xml",
            "createdDateTime": "2019-03-07T23:59:49+01:00",
            "createdBy": "XXX",
            "lastChangedDateTime": "2019-03-10T23:59:49+01:00",
            "lastChangedBy": "XXX"
        }
    }
}
```

Create a new instance. Post with params that identifies the application and the instance owner.

```http
/instances?applicationId=TEST/sailor&instanceOwnerId=1024
```

Get information about one instance.

```http
/instances/{instanceId}
```

Get (query) all instances that is instance owner has

```http
/instances&instanceOwnerId={instanceOwnerId}[&since=2017-01-01]
```

Get (query) all instances of a particular application that is completed

```http
/instances?applicationId={applicationId}&completed=true
```

Delete a specific instance (also deletes its data).

```http
/instances/{instanceId}
```

## Data service

A data element is a file that contains a specific form element of an instance.
It may be structured file, e.g. json, xml, or it may be a binary file, e.g. pdf.
The application metadata restricts the types of form elements that are allowed {formId}.

Get a specific data element

```http
/instances/{instanceId}/data/{dataId}
```

Post to create a specific data element. Content a file (as MultipartContent).
After success the instance's data section is updated, with the appropriate dataId guid
that is used to identify the specific data element

```http
/instances/{instanceId}/data?formId={formId}
```

Put to replace a specific data element. Delete to remove data element.

```http
/instances/{instanceId}/data/{dataId}
```

# /applications

Application metadata used to validate data elements in instances

Resource: http://platform.altinn.no/applications/TEST/sailor
```json
{
    "id": "TEST/sailor",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "XXX",
    "title": "Færder påmelding",
    "type": "innsending",
    "applicationOwnerId": "TEST",
    "workflowId": "standard",
    "isDeleted": false,
    "isArchived": false,
    "validFrom": null,
    "validTo": null,
    "forms": {
        "boatdata": {
            "id": "boatdata",
            "contentType": "application/schema+json",
            "storageUrl": "sailor/schema/boatdata",
            "createdDateTime": "2019-03-04T12:01:00+01:00",
            "createdBy": "M2",
            "signatureRequired": true,
            "shouldEncryptData": true
        },
        "crewlist": {
            "id": "crewlist",
            "contentType": "application/xsd+xml",
            "storageUrl": "sailor/schema/crewlist",
            "createdDateTime": "2019-03-04T12:01:00+01:00",
            "createdBy": "M2",
            "lastChangedDateTime": "2019-03-10T23:59:49+01:00",
            "lastChangedBy": "M42"
        }
    }
}
```

Get a list of all Applications

```http
/applications
```

Get metadata about a specific application

```http
/applications/{applicationId}
```

Get the schema of a specific form element in an application

```http
/applications/{applicationId}/forms/{dataId}?format=jsonSchema
```

# /events

User events. Events are associated with an instance, a user and an instance owner. 
Events are generated by the application and posted to storage.

```json
{
    "id": "3ab2cd53-3e26-486d-b6d9-1574fe5a173c",
    "instanceId": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "timestamp" : "2019-05-02T12:24:55+01:00",
    "instanceOwnerId": "12344",
    "userId": "XYZ",
    "eventType": "Submitted",
    "description": "Tax declaration submitted"
}
```

Create an event. POST with body. 

```http
/events
```

Get all events for a specific instance.

```http
/events?instanceId=762011d1-d341-4c0a-8641-d8a104e83d30
```

Get all events for a spesific user.

```http
/events?userId=XYZ
```

