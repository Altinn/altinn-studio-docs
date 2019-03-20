---
title: RESTful APIs (Representation State Transfer)
description: Guidelines for designing REST apis for microservices in Altinn
tags: ["development", "handbook", "back-end", "rest", "api"]
weight: 100
---
{{%notice warning%}}
This page is work-in-progress. This is a proposed api which most likely is going to change.
{{% /notice%}}

#### REST
REST is an architectural style for designing loosely coupled applications over HTTP which was coined by [Rob Fielding](https://en.wikipedia.org/wiki/Roy_Fielding) in 2000.
We will define services according to [REST](https://restfulapi.net/rest-architectural-constraints/). 

All REST APIs should be versioned.

```http
/api/v1/resource
```

#### Resources

A resources is a thing that the client and server knows about.
The API provides methods to ifind, create, update or delete a resource object.
A resource in a system should have only one logical URI, which should provide a way to fetch related or additional data about the resource.

#### Platform Storage

Data service to store instance data for applications, and metadata about applications

Resources: Instance, Application,  ApplicationOwner, InstanceOwner, Schema

##### Instance (Application instance)

An application instance is created when a instance onwer starts a workflow in an Altinn application. 
An instance replaces Altinn2 Message.
An instanceOwner is a person/company that reports information via Altinn.
An applicationId refers to the application information element which defines the metadata about the application.

```json
{
    "id": "762011d1-d341-4c0a-8641-d8a104e83d30",
    "applicationId": "KNS/sailor",
    "applicationOwnerId": "KNS",
    "instanceOwnerId": "666",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "XXX",
    "lastChangedDateTime": "2019-03-07T23:59:49+01:00",
    "lastChangedBy": "XXX",
    "dueDateTime": null,
    "visibleDateTime": null,
    "presentationField": "Færder påmelding 2019",
    "externalSystemReference": null,
    "currentWorkflowStep": "started",
    "isCompleted": true,
    "isDeleted": [{
        "deletionDateTime": "2017-12-22",
        "deletedBy": "KNS"
    }],
    "applicationOwnerFeedback": {
        "receivedDate": "2019-05-11T03:00:23+01:00",
        "status": "OK"
    },
    "data": {
        "boatdata": {
            "762011d1-d341-4c0a-8641-d8a104e83d30": {
                "contentType": "application/json",
                "storageUrl": "KNS/sailor/762011d1-d341-4c0a-8641-d8a104e83d30/data/boatdata/992011d1-d341-4c0a-8641-d8a104e83d30",
                "fileName": "davidsyacht.json",
                "createdDateTime": "2019-03-06T15:00:23+01:00",
                "createdBy": "XXX",
                "signature": "oajviojoi2j3l23889yv8js909u293840zz092u3",
                "fileSize": 2003,
                "isLocked": true
        },
        "crewlist": {
            "999911d1-d341-4c0a-8641-d8a104e83d30": {
                "contentType": "text/xml",
                "storageUrl": "KNS/sailor/762011d1-d341-4c0a-8641-d8a104e83d30/data/crewlist/999911d1-d341-4c0a-8641-d8a104e83d30",
                "fileName": "crewLIst.xml",
                "createdDateTime": "2019-03-07T23:59:49+01:00",
                "createdBy": "XXX",
                "lastChangedDateTime": "2019-03-10T23:59:49+01:00",
                "lastChangedBy": "XXX"
            }
        }
    }
}
```

Create a new instance. Post with params that identifies the application and the instance owner.

```http
/instances?applicationId=KNS/sailor&instanceOwnerId=1024
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

##### Data service

A data element is a file that contains a specific form element of an instance.
It may be structured file, e.g. json, xml, or it may be a binary file, e.g. pdf.
The application metadata restricts the types of form elements that are allowed {formId}.

Get a specific data element

```http
/instances/{instanceId}/data/{formId}/{dataId}
```

Post to create a specific data element. Content a file (as MultipartContent).
After success the instance's data section is updated, with the appropriate dataId guid
that is used to identify the specific data element

```http
/instances/{instanceId}/data/{formId}
```

Put to replace a specific data element. Delete to remove data element.

```http
/instances/{instanceId}/data/{formId}/{dataId}
```

##### ApplicationOwner

Get metadata about an application owner

```http
/owners/{applicationOwnerId}
```

##### Application (metadata)

Resource: http://platform.altinn.no/applications/KNS/sailor
```json
{
    "id": "KNS/sailor",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "XXX",
    "title": "Færder påmelding",
    "type": "innsending",
    "applicationOwnerId": "KNS",
    "workflowId": "standard",
    "isDeleted": false,
    "isArchived": false,
    "validFrom": null,
    "validTo": null,
    "forms": {
        "boatdata": {
            "contentType": "application/schema+json",
            "storageUrl": "sailor/schema/boatdata",
            "createdDateTime": "2019-03-04T12:01:00+01:00",
            "createdBy": "M2",
            "signatureRequired": true,
            "shouldEncryptData": true
        },
        "crewlist": {
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

#### Altinn-studio 
...

tbd

#### App services (runtime)

TBD...

One cluster per application owner. An application owner can have many apps.

```http
https://{applicationOwnerNick}.apps.altinn.no
```

Resources: App, Application, Instance

Put/post to change workflow step

```http
/instances/{instanceId}/workflow/{stepId}
```

Get receipt

```http
/instances/{instanceId}/receipt
```

Get validate model

```http
/instances/{instanceId}/forms/{formId}/validate
```

Get metadata about a specific application

```http
/applications/{applicationId}
```

Get schema for a specific form in the application 

```http
/applications/{applicationId}/forms/{formId}
```

Get texts for a specific form in the application 

```http
/texts
```
