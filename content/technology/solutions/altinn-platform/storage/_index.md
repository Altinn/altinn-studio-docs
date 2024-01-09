---
title: Storage
description: The Storage component gives storage capabilities to the apps.
tags: [platform, storage]
---

Storage support storage of structured and unstructured data for apps.
Apps that need the cabability to store data uses the storage service in the Altinn platform to store both metadata and actual data.

## Metadata
Stored in Azure Cosmos Db.

## Formdata and attachments
Stored in Azure Blob Storage. One storage account for each application owner.

## Additional details



```json
{
    "id": "test/sailor",
    "versionId": "v32.23-xyp",
    "org": "test",
    "app": "sailor",
    "created": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "XXX",
    "title": { "nb": "Testapplikasjon", "en": "Test Application" },
    "processId": "standard",
    "validFrom": "2019-04-01T12:14:22+01:00",
    "validTo": null,
    "maxSize": null,
    "dataTypes": [
        {
            "id": "boatdata",
            "description": {"nb": "Båtdata", "en": "Boat data"},
            "allowedContentTypes": ["application/json"],
            "taskId": "Task_1",
            "appLogic": {
                "autoCreate": true,
                "classRef": "Skjema",
                "schemaRef": "schemas/boatname"
            },
            "maxSize": 200000,
            "maxCount": 1
        },
        {
            "id": "crewlist",
            "allowedContentTypes": ["application/xml"],
            "taskId": "Task_2",
            "appLogic": {
                "autoCreate": false,
                "classRef": "CrewList",
                "schemaRef": "schemas/crewlist"
            },
            "maxSize": null,
            "minCount": 1,
            "maxCount": 3
        },
        {
            "id": "certificate",
            "allowedContentType": ["application/pdf"],
            "appLogic": null,
            "maxSize": null,
            "maxCount": 1
        }
    ]
}
```

### Application type

| Property  | Type             | Description                                                                     |
| --------- | ---------------- | ------------------------------------------------------------------------------- |
| id        | string           | application id                                                                  |
| versionId | string           | release or commit id                                                            |
| processId | string           | application process id                                                          |
| title     | LanguageString[] | application title in different languages                                        |
| validFrom | dateTime         | when the application is valid from                                              |
| validTo   | dateTime?        | when the application is valid to                                                |
| dataTypes | DataType[]       | Metadata about data requirements in the application. See [DataType](#datatype). |
| maxSize   | integer          | the maximum number of bytes that the data elements can have                     |

### DataType

The DataType model represents data requirements for an application for different process tasks.

| Property            | Type             | Description                                                                                                                                                |
| ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                  | string           | Required. Id of the data type.                                                                                                                             |
| description         | LanguageString[] | A short description of the data type. Language support.                                                                                                    |
| allowedContentTypes | string[]         | A list of allowed content types.                                                                                                                           |
| allowedContributers | string[]         | A list of allowed contributers. On the format '{keyword}:{value}' Approved keywords are: _org_ and _orgno_.                                                |
| taskId              | string           | Required. Associated task from the process definition. Defines that the data is required to progress to next task in a process.                            |
| appLogic            | ApplicationLogic | Data object that connect data to application models. This should be null for data types describing attachments. See [ApplicationLogic](#applicationlogic). |
| maxSize             | int              | Maximum allowed size of a data item of this type. Undefined means that the limit is unbounded.                                                             |
| maxCount            | int              | Maximum allowed data item count of this type. Zero or below indicate unbounded.                                                                            |
| minCount            | int              | Minimum number of data items of this type. Zero or below indicate that the data type is optional.                                                          |

#### Example

```json
{
    "id": "receipt",
    "allowedContentTypes": ["image/jpeg", "image/png"],
    "taskId": "Task_1",
    "appLogic": null,
    "maxSize": 20,
    "minCount": 1,
    "maxCount": 3
}
```
In order to complete process task **Task_1** the user must upload at least one image. It can be either a jpg or png below 20 MB. The user is allowed to upload additional 2 images. The application does not have any business logic associated with the data type. 

### ApplicationLogic
The ApplicationLogic model describes the connection between a data type and a corresponding data model in the application. This is required for all data types associated with an XSD or JSON Schema. In most cases it also implies that there is a UI with a form the user can fill in. 

| Property   | Type   | Description                                                                                                             |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| autoCreate | bool   | Indicate that the application should automatically create a data item of this type with every new application instance. |
| classRef   | string | Reference to the class definition representing the data model.                                                          |
| schemaRef  | string | Reference to the XSD or JSON schema.                                                                                    |

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
    "created": "2019-05-02T13:08:21.981476Z",
    "instanceOwnerPartyId": "60238",
    "user": {
        "userId": 3,
        "authenticationLevel": 1,
        "enduserSystemId": 2
    }
}
```

### Instance Event type
| Attribute                | Type         | Description                                                                                                                                                                                                    |
| ------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                       | Guid?        | Id set by CosmosDB when the instance event is stored                                                                                                                                                           |
| instanceId               | string       | {instanceOwnerPartyId}/{instanceGuid}                                                                                                                                                                          |
| dataId                   | string       | Id of data element if event is related to a data element.                                                                                                                                                      |
| created                  | DateTime?    | DateTime set by CosmosDB when the event is stored                                                                                                                                                              |
| eventType                | string       | the event type. Available instance event types are listed [here](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage.Interface/Enums/InstanceEventType.cs) |
| instanceOwnerPartyId     | string       | the instance owner id                                                                                                                                                                                          |
| user.userId              | int?         | the user who triggered the event                                                                                                                                                                               |
| user.authenticationLevel | int          | the authentication level for the user or system that triggered the event                                                                                                                                       |
| user.endUserSystemId     | int?         | the end user system that triggered the event                                                                                                                                                                   |
| process                  | ProcessState | the process step during which the event occured                                                                                                                                                                |

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

| Attribute          | Type               | Description                                                 |
| ------------------ | ------------------ | ----------------------------------------------------------- |
| id                 | string             | unique id (corrresponds to instance guid)                   |
| instanceOwnerId    | integer            | id of instance owner                                        |
| org                | string             | Application owner for the app                               |
| appName            | string             | name of the application                                     |
| title              | string             | title of the application in language defined in the request |
| processCurrentTask | string             | current task in the process state                           |
| createDateTime     | dateTime           | creation time                                               |
| lastChangedBy      | string             | user id of the user who last changed the instance           |
| lastChangedBy      | string             | user id                                                     |
| dueDateTime        | dateTime?          | deadline for submit                                         |
| bool               | allowDelete        | is current user allowed to delete instance                  |
| bool               | authorizedForWrite | is current user allowed to write to edit the instance       |
| deletedDateTime    | dateTime?          | date the instance was deleted                               |
| archivedDateTime   | dateTime?          | date the instance was archived                              |

### Operations
Get a single instance in message box instance format in (optional) preffered language. Default lanugage is norsk bokmål (nb).
Available language specifications: en, nb, nn-NO.

```http
GET /sbl/instances/{instanceOwnerPartyId}/{instanceId}?language={languageId}
```

Get list of all instances for an instance owner in a specific state, with a visible dateTime that has passed and (optional) preffered language.
Available states: active, deleted, archived.
Available language specifications: en, nb, nn-NO.

```http
GET /sbl/instances/{instanceOwnerPartyId}?state={instanceState}&language={languageId}
```

Search instances based on query parameters
All query parameters are optional. 

```http
GET /sbl/instances/search?instanceOwner.partyId={instanceOwnerPartyId}&language={languageId}&appId={applicationId}
```

Mark an instance for deletion in storage. Set parameter hard equal to true or false to indicate soft or hard deletion.
Calling this endpoint will not the delete the instance from Storage, simply mark is as deleted. 

```http
DELETE /sbl/instances/{instanceOwnerPartyId}/{instanceId}?hard={true/false}
```

Restore a soft deleted instance.

```http
PUT /sbl/instances/{instanceOwnerPartyId}/{instanceId}/undelete
```

## ProcessHistory

The process history is a list comprised of process history events for a given instance.

### ProcessHistoryItem type

| Attribute | Type      | Description                                                                                                                                                                                                                              |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EventType | string    | the event type. Available process event types are listed [here](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage.Interface/Enums/InstanceEventType.cs) with the prefix _process__ |
| ElementId | string    | element id for the process flow step                                                                                                                                                                                                     |
| Occured   | DateTime? | event occurence time                                                                                                                                                                                                                     |
| Started   | DateTime? | task start time                                                                                                                                                                                                                          |
| Ended     | DateTime? | task end time                                                                                                                                                                                                                            |


### Operations
Get process history for a given instance

```http
GET /instances/{instanceOwnerPartyId}/{instanceId}/process/history
```

## Texts

Represents text resources for an application. 

### Text type

| Property  | Type           | Description                                                                            |
| --------- | -------------- | -------------------------------------------------------------------------------------- |
| id        | string         | text id {org-app-language}. Only used internally for storage purposes. Auto generated. |
| language  | string         | the language. Two letter ISO name.                                                     |
| org       | string         | the org. Only used internally for storage purposes. Auto generated.                    |
| resources | TextResource[] | list of text resources                                                                 |

The `id` and `org` fields are generated by the system, and should not be included when using POST the text resource object.
Example of an text element that should be sent during a POST:

````json
{
    "language": "nb",
    "resources:": [
        {"id": "some_id", "value": "some value"},
        {"id": "some_other_id", "value": "some other value"},
        {"id": "yet_another_id", "value": "Text containing two variables: {0} and {1}.",
         "variables":[
            {
            "key": "dataSouce.TextKey_1",
            "dataSource": "dataModel.dataModelName"
            },
            {
            "key": "dataSouce.TextKey_2",
            "dataSource": "dataModel.dataModelName"
            }]
        }
    ]
}
````

### TextResource type

| Property  | Type                        | Description                                      |
| --------- | --------------------------- | ------------------------------------------------ |
| id        | string                      | text resource id (for instance schema.postplace) |
| value     | string                      | the value                                        |
| variables | list\<TextResourceVariable> | list of text resource variables.                 |

### TextResourceVariable type
| Property   | Type   | Description                                                                |
| ---------- | ------ | -------------------------------------------------------------------------- |
| key        | string | the key for the text resource variable                                     |
| dataSource | string | the datasource for the text resource variable. Allowed prefix: "dataModel" |


### Operations

Create a new text resource for an application.

```http
POST /applications/{appId}/texts
```
Get a specific text resource for an application.

```http
GET /applications/{appId}/texts/{language}
```

Update a specific text resource for an application.

```http
PUT /applications/{appId}/texts/{language}
```

Delete a specific text resource for an application.

```http
DELETE /applications/{appId}/texts/{language}
```
