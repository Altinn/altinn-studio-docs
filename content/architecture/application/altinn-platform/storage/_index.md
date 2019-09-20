---
title: Altinn Platform - Storage
linktitle: Storage
description: Description of the application architecture for Storage component
tags: [architecture, solution, platform]
weight: 100
---

The Storage component exposes a REST-API to Altinn Apps.

Storage provides persistent storage service for applications in Altinn. It is mostly used by the app-backend to store information about *instances* and their *data* elements. It provides a registry of all *applications* metadata, element types and events. It is also intended to be used by application owners and other clients to read data.

Resources: Instance, Application, InstanceEvent, ApplicationEvent, MessageBoxInstance

{{%excerpt%}}
<object data="/architecture/application/altinn-platform/storage/datamodel.png" type="image/png" style="width: 50%;";></object>
{{% /excerpt%}}

## Instance

An application instance is created when a instance owner (reportee) starts a process in an Altinn application.
An instance replaces Altinn2 Message. 
An instanceOwner is a person/company that reports information via Altinn.
An appId refers to the application information element which defines the metadata about the application.

```json
{
    "id": "60238/762011d1-d341-4c0a-8641-d8a104e83d30",
    "appId": "test/sailor",
    "org": "test",
    "instanceOwnerId": "60238",
    "labels": ["xyz", "importantUser"],
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "user32",
    "lastChangedDateTime": "2019-03-07T23:59:49+01:00",
    "lastChangedBy": "user34",
    "dueDateTime": null,
    "visibleDateTime": null,
    "presentationField": { 
        "nb": "Færder påmelding 2019",
        "en": "Fearder Race Registration 2019"
    },
    "process":  "process": {
        "started": "2019-09-25T09:32:44.20Z",
        "currentTask": {
            "started": "2019-10-10T32:22.00Z",
            "processElementId": "Data_1",
            "name": "Fyll ut",
            "altinnTaskType": "data",
            "validated": {
                "timestamp": "2019-10-04T12:00.00Z",
                "canCompleteTask": true
            }
        }
    },
    "userStatus": {
        "isSoftDeleted": false,
        "isArchived": true,
        "archivedDateTime": "2019-12-20T20:30:33.233Z",
        "isMarkedForHardDelete": false,
    },
    "appOwnerStatus": {
        "message": { "nb": "field 32 is incorrect", "at": "2018-12-22"}
    },
    "data": [
        {
            "id": "692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "elementType": "boatdata",
            "contentType": "application/json",
            "storageUrl": "test/sailor/60238/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff.json",
            "fileName": "davidsyacht.json",
            "createdDateTime": "2019-03-06T15:00:23+01:00",
            "createdBy": "XXX",
            "signature": "oajviojoi2j3l23889yv8js909u293840zz092u3",
            "fileSize": 2003,
            "isLocked": true,
            "pdf": {
                "storageUrl": "test/sailor/60238/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff.pdf",
                "generated": "2019-05-30T14:38:22+01:00"
            }
        },
        {
            "id": "999911d1-d341-4c0a-8641-d8a104e83d30",
            "elementType": "crewlist",
            "contentType": "text/xml",
            "storageUrl": "test/sailor/60238/762011d1-d341-4c0a-8641-d8a104e83d30/data/999911d1-d341-4c0a-8641-d8a104e83d30",
            "fileName": "crewLIst.xml",
            "createdDateTime": "2019-03-07T23:59:49+01:00",
            "createdBy": "XXX",
            "lastChangedDateTime": "2019-03-10T23:59:49+01:00",
            "lastChangedBy": "XXX"
        }
    ]
}
```

### Instance type

| Attribute | Type | Description | User | Owner | App | Storage |
| --- | --- |---| ---| ---|---| --- |
id | string | unique id | | | | C 
appId | string | application id |  | | | C
instanceOwnerId | integer | id of instance owner | C | C | |
labels | string[] | array of string labels | | C |
createDateTime | dateTime | creation time | | | | C
createdBy | string | user id | | | | C
lastChangedDateTime | dateTime? | last changed time | | | | C
lastChangedBy | string | user id | | | | C
dueDateTime | dateTime? | deadline for submit| | CU
visibleDateTime | dateTime? | when visible for user | | CU |
presentationField | string | text shown in inbox | | CU | U
process  | WorkflowState | process state info | | | U | (U)
userStatus | InboxStatus | statuses that the user can change  | U
[instanceState](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage.Interface/Models/InstanceState.cs) | InstanceState | data on delete and archive state of the instance | | |U|C|
[appOwnerState](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage.Interface/Models/ApplicationOwnerState.cs) | AppOwnerState  | status from app owner | | CU | |
data | List<DataElement> | data elements | | | CU


C - creation time, U - can be updated

### Operations

Create a new instance of an app for a given instance owner. 
Post with query params that identifies the appId and the instance owner. 
An instance object can be sent as json data to set certian values.

```http
POST /instances?appId=test/sailor&instanceOwnerId=60238
```

Get information about one instance.

```http
GET /instances/{instanceId}
```

Get (query) all instances that is instance owner has

```http
GET /instances/{instanceOwnerId}
```

Query all instances of a particular application that is completed

```http
GET /instances?appId={appId}&process.isCompleted=true
```

Query all instances of an applicatio owner's organisation
```http
GET /instances?org={org}
```

Delete a specific instance (also deletes its data).

```http
DELETE /instances/{instanceId}
```

### Data service

A data element is a file that contains a specific form element of an instance.
It may be structured file, e.g. json, xml, or it may be a binary file, e.g. pdf.
The application metadata restricts the types of form elements that are allowed {elementType}.

Get a specific data element

```http
GET /instances/{instanceId}/data/{dataId}
```

Post to create a specific data element. Content a file (as MultipartContent).
After success the instance's data section is updated, with the appropriate dataId guid
that is used to identify the specific data element

```http
POST /instances/{instanceId}/data?elementType={elementType}
```

Put to replace a specific data element. Delete to remove data element.

```http
PUT /instances/{instanceId}/data/{dataId}
```

Get a predefined PDF of a data element, if it exists.

```http
Accept: application/pdf
GET /instances/{instanceId}/data/{dataId}
```

Update a predefined PDF for a given data element

```http
ContentType: application/pdf
PUT /instances/{instanceId}/data/{dataId}
```

## Application

Application metadata used to validate data element types in instances. And to provide application events.

Resource: /applications/test/sailor

```json
{
    "id": "test/sailor",
    "versionId": "v32.23-xyp",
    "org": "test",
    "app": "sailor",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "XXX",
    "title": { "nb": "Testapplikasjon", "en": "Test Application" }, 
    "processId": "standard",
    "validFrom": "2019-04-01T12:14:22+01:00",
    "validTo": null,
    "maxSize": null,
    "elementTypes": [
        {
            "id": "boatdata",
            "description": {"nb": "Båtdata", "en": "Boat data"},
            "allowedContentType": ["application/json"],
            "appLogic": true,
            "schema": {
                "fileName": "boat.json-schema",
                "schemaUrl": "/applications/test/sailor/schemas/boatdata"
            },
            "canRegisterPdf": true,
            "maxSize": 200000,
            "maxCount": 1,
            "shouldSign": true,
            "shouldEncrypt": true
        },
        {
            "id": "crewlist",
            "allowedContentType": ["application/xml"],
            "appLogic": true,
            "schema": {
                "fileName": "crew.xsd",
                "schemaUrl": "/applications/test/sailor/schemas/crewlist",
            },
            "canRegisterPdf": true,
            "maxSize": null,
            "maxCount": 3,
            "shouldSign": false,
            "shouldEncrypt": false
        },
        {
            "id": "certificate",
            "allowedContentType": ["application/pdf"],
            "appLogic": false,
            "maxSize": null,
            "maxCount": 1,
            "shouldSign": false,
            "shouldEncrypt": false
        }
    ]
}
```

### Application type

| Attribute | Type | Description |
| --------- | ---- | ----------- |
id | string | application id 
versionId | string | release or commit id 
processId | string | application process id
title | LanguageString[] | application title in different languages
validFrom | dateTime | when the application is valid from
validTo | dateTime? | when the application is valid to 
elementTypes | ElementType[] | the elements that are part of an applciation instance
maxSize | integer | the maximum number of bytes that the data elements can have

### Operations

Get a list of all Applications

```http
GET /applications
```

Get metadata about a specific application

```http
GET /applications/{appId}
```

Get application events.

```http
GET /applications/{appId}/events
```

## InstanceEvent

User actions on an instance trigger instance events such as _created_, _saved_, _submitted, _deleted_, and _undeleted_.
The events are associated with an instance, a user and an instance owner and generated by the application and stored in CosmosDB.

Format of the JSON object stored in the database.

```json
{
    "id":"6dff32bc-0928-4ae8-937c-b362d6941c89",
    "instanceId": "60238/5c6b1a71-2e1f-447a-ae2f-d1807dcffbfb",
    "eventType": "deleted",
    "createdDateTime": "2019-05-02T13:08:21.981476Z",
    "instanceOwnerId": "60238",
    "userId": 3,
    "authenticationLevel": 1,
    "enduserSystemId": 2
}
```

### Instance Event type
| Attribute | Type | Description |
| --------- | ---- | ----------- |
| Id | Guid?  | Id set by CosmosDB when the instance event is stored |  
| InstanceId | string | {instanceOwnerId}/{instanceGuid} |  
| DataId | string | Id of data element if event is related to a data element. |  
| CreationDateTime  | DateTime? | DateTime set by CosmosDB when the event is stored |  
| EventType | string | the event type. Available instance event types are listed [here](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage.Interface/Enums/InstanceEventType.cs)|
| InstanceOwnerId  | string | the instance owner id |  
| UserId | int? | the user who triggered the event |  
| AuthenticationLevel | int | the authentication level for the user or system that triggered the event |  
| EndUserSystemId | int? | the end user system that triggered the event |  
| WorkflowStep | string | the process step during which the event occured |  

### Operations

```http
GET /instances/{instanceId}/events
```

Create an event. POST with body. 
**Note** id and createDateTime is set by the system and should not be included in the json object.

```http
POST /instances/{instanceId}/events
```

Get all instance events for a specific instance.

```http
GET /instances/{instanceId}/events
```

Get all instance events for a specific instance filtered by event types

```http
GET /instances/{instanceId}/events?eventTypes={eventTypeA},{eventTypeB}
```

Get all instance events for a specific instance within a time frame
The times are strings defined in UTC-format. E.g. "2019-05-03T12:55:23"

```http
GET /instances/{instanceId}/events?from={fromtime}&to={totime}
```

Get all instance events for a specific instance within a time frame filtered by event types

```http
GET /instances/{instanceId}/events?from={fromtime}&to={totime}&eventTypes={eventTypeA},{eventTypeB}
```

Delete all instance events for a specific instance. DELETE request.

```http
DELETE /instances/{instanceId}/events
```

## MessageBoxInstance

A message box instance is a compressed instance object stripped for data that is
not relevant for the Altinn II message box. In addition some properties from the application
metadata such as application title are included in the object.

### MessageBoxInstance type

| Attribute | Type | Description |
| --- | --- |---| ---|
id | string | unique id (corrresponds to instance guid) |
instanceOwnerId | integer | id of instance owner |
org | string | Application owner for the app |
appName | string | name of the application |
title | string | title of the application in language defined in the request |
processCurrentTask | string | current task in the process state
createDateTime | dateTime | creation time |
lastChangedBy| string | user id of the user who last changed the instance |
lastChangedBy | string | user id | |
dueDateTime | dateTime? | deadline for submit|
bool | allowDelete | is current user allowed to delete instance|
bool | authorizedForWrite  | is current user allowed to write to edit the instance|
deletedDateTime | dateTime? | date the instance was deleted |
archivedDateTime | dateTime? | date the instance was archived |

### Operations
Get a single instance in message box instance format in (optional) preffered language. Default lanugage is norsk bokmål (nb).
Available language specifications: en, nb, nn-NO.

```http
GET /sbl/instances/{instanceOwnerId}/{instanceId}?language={languageId}
```

Get list of all instances for an instance owner in a specific state, with a visible dateTime that has passed and (optional) preffered language.
Available states: active, deleted, archived.
Available language specifications: en, nb, nn-NO.

```http
GET /sbl/instances/{instanceOwnerId}?state={instanceState}&language={languageId}
```

Mark an instance for deletion in storage. Set parameter hard equal to true or false to indicate soft or hard deletion.
Calling this endpoint will not the delete the instance from Storage, simply mark is as deleted. 

```http
DELETE /sbl/instances/{instanceOwnerId}/{instanceId}?hard={true/false}
```

Restore a soft deleted instance.

```http
PUT /sbl/instances/{instanceOwnerId}/{instanceId}/undelete
```
