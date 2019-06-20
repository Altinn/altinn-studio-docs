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
- Change workflow state

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
apiPath = https://org.apps.altinn.no/org/appName
```

Identifies the organization cluster and the application. Should be used to instantiate an application, to validate data, to change workflow and to save/update data elements.

### Platform Storage API

An api that provides access to all instances of all apps, it should be used to access metadata about instances and to download data elements.

```http
storagePath = https://platform.altinn.no/storage
```

Should be used by application owners to download data elements. Downloads will be logged. 

### Create an application instance

Altinn assigns an unique identifier to all users that wishes to report data. We call this id *instanceOwnerId*. 
If you do not know this, you should provide the official identity number, e.g national identification number for persons or organisation number for organisations, and in some case user name. This should be provided as part of the payload to the creation request. Altinn will look up this identifier and replace it with the instanceOwnerId. The official identity number will not be stored in the instance metadata.

Data elements can be provided as part of the creation request, but can also be uploaded at a later time.

The client specify the instance owner and can set a number of the metadata fields of the instance by attaching the following form.

```json
{
    "instanceOwnerLookup": { "personNumber": "12247918309" | "organisationNumber": "123456789" | "userName": "xyz" },
    "labels" : [ "gr", "x2" ],
    "appId" : "org/appName",
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding"
}
```
Data elements (files) can be attached to the initial request as a *multipart/form-data*. The name of the parts must correspond to element types defined in the application metadata. 

```http
POST {appPath}/instances
```

{{%excerpt%}}
<object data="/altinn-api/Instantiate for an instance owner.png" type="image/png" style="width: 75%;";></object>
{{% /excerpt%}}

A multipart formdata should contain the instance json document, and the data element files of the instance. Notice that the element types *default*, and *cv* should be defined in application metadata.

```
Content-Type: multipart/form-data; boundary="abcdefg"

--abcdefg
Content-Type: application/json; charset=utf-8
Content-Disposition: form-data; name="instance"
{ ... }

--abcdefg
Content-Type: application/xml
Content-Disposition: form-data; name="default"
<xml> ... </xml>

--abcdefg
Content-Type: application/pdf
Content-Disposition: form-data; name="cv"
abc4g32dcoj3234jljf...
--abcdefg--
```

This call will return the instance metadata record which was created. A unique identifier (guid) will be created and should be used for later reference.

```json
{
    "id": "347829/762011d1-d341-4c0a-8641-d8a104e83d30",
    "selfLinks": {
        "apps": "https://org.apps.altinn.no/org/appName/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc",
        "platform": "https://platform.altinn.no/storage/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc"
    },
    "appId": "org/appName",
    "labels": [ "gr", "x2" ],
    "instanceOwnerId": "347829",
    "createdDateTime": "2019-03-06T13:46:48.6882148+01:00",
    "createdBy": "org23",
    "dueDateTime": "2019-06-01T12:00:00Z",
    "visibleDateTime": "2019-05-20T00:00:00Z",
    "presentationField": "Arbeidsmelding",
    "workflow": {
        "currentTask": "FormFilling",
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
        "storageUrl": "org/appName/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
        "dataLink": {
            "apps":   "https://org.apps.altinn.no/org/appName/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
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

Post data file (xml-document) as body of request. Must specify elementType as defined in the application metadata.

```http
POST {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/data?elementType=default
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
            "storageUrl": "org/appName/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
            "dataLinks": {
                "apps":   "https://org.apps.altinn.no/org/appName/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff",
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

Update (replace) a data element with a new one (payload). Data as multipart or as single body.

```http
PUT {appPath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff
```

### Download a data element (as application owner)

```http
GET {storagePath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff
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

Application owner must confirm that the data element file was downloaded sucessful.

```http
PUT {storagePath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff/confirmDownload
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

## Download a complete instance with dataelements and pdf

```http
GET {storagePath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/downloadAll
```

Will create a multipart http response with the following content:

1. instance metadata (application/json)
2. the first data element (application/xml)
3. the first data element's pdf (application/pdf)
4. second data element (e.g. attachement)
5. third data element (e.g. image)
6. ...

Data elements with schema has a corresponding pdf file which is generated when the element type's associate workflow task is closed. 

### Change workflow state

{{%excerpt%}}
<object data="/altinn-api/MVP workflow.png" type="image/png" style="width: 25%;";></object>
{{% /excerpt%}}

```http
PUT {appPath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/workflow/startTask?taskId=Submit
```

### Query instances

```http
GET {storagePath}/instances?appId=org/appName&workflow.currentTask=Submit&lastChangedDateTime=after(2019-05-01)&label=gr
```

Returns a paginated set of instances (JSON)

```json
{
    "_links": {
        "self": {
            "href": "{storagePath}/instances?page=0&size=100"
        },
        "next": {
            "href": "{storagePath}/instances?page=1&size=100"
        },
        "last": {
            "href": "{storagePath}/instances?page=123&size=100"
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
GET {storagePath}/applications/org/appName/events?after=2019-03-30&workflow.currentTask=Submit
```

Query result:

```json
[
    {
        "id": "112453234523423344",
        "at": "2019-06-01T12:12:22+01:00",
        "appId": "org/appName",
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

The application will provide a method to validate the datamodel without creating a instance of the data. Data must be provided as formdata.

```http
PUT {appPath}/validate?elementType=modelA
```

### API to calculate / perform business rules

The app will provide a method to perform calculation / perform business rules for a datamodell to an app  

```http
PUT {appPath}/calculate?elementType=modelB
```

## Apps API

Get metadata about the instance.

```http
GET {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc
```

Create form data (first time).

```http
POST {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/data?elementType=model2
```

GET or PUT default form data (save data). Update form data.

```http
{appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/data/692ee7df-82a9-4bba-b2f2-c8c4dac69aff
```

OLD Update formdata
http://altinn3.no/runtime/api/3/RtlOrg/apitracing/7f32a720-a1e9-4565-a351-b3f66f9641b0/Update


Get application's metadata :

```http
GET {appPath}
```

Get the application's workflow:

```http
GET {appPath}/workflow
```

## Sequence diagrams

### Instantiate an app

Client instantiates a app. The app create an initial data element (file) according to the app's prefill rules. Instance metadata, with links to the data element is returned which allow the Client to download the data.
Workflow is set to first task. This means that data can be updated later on.

{{%excerpt%}}
<object data="/altinn-api/Instantiate.png" type="image/png" style="width: 75%;";></object>
{{% /excerpt%}}

### Instantiate an app and complete workflow

Instantiate an app with data as multipart content (stream). The app creates an instance and stores the attached data element. The app attempts to complete the workflow.

{{%excerpt%}}
<object data="/altinn-api/instantiate and complete workflow.png" type="image/png" style="width: 75%;";></object>
{{% /excerpt%}}

### Update Data

Client does a PUT request to the App. It first calculates the data and replaces the existing data element. It returns the instance metadata to the client. 

{{%excerpt%}}
<object data="/altinn-api/Save data.png" type="image/png" style="width: 75%;";></object>
{{% /excerpt%}}

### Validate and calculate

The app provides two methods to check the data before an instance is created. 

The validate method takes a data file of an elementType and performs validation on that file. It returns a validation report.

The calculate method takes a data file and performs calculations and returns the possibly altered data file with updated fields.

{{%excerpt%}}
<object data="/altinn-api/validate and calculate 2.png" type="image/png" style="width: 75%;";></object>
{{% /excerpt%}}

### Workflow

Application has a workflow definition that specifies start events, end events, tasks and the allowed flows (transitions) between the these. A workflow is started by the application, which sets the current task to the first task in the workflow (selects a start event which points to a task).

{{%excerpt%}}
<object data="/altinn-api/workflow.png" type="image/png" style="width: 75%;";></object>
{{% /excerpt%}}

#### Get workflow state of a specific instance

```http
GET {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/workflow
```
OLD Get Current workflow state
Is it in signing? Is it form filling +++ Used by react to decide what to show.
http://altinn3.no/runtime/api/workflow/3/RtlOrg/apitracing/GetCurrentState?instanceId=32dacdff-1f99-4958-9790-b0a0aeccfaa5


#### Complete a workflow task 

Application attempts to finish the current task and moves the workflow forward to the next task in the flow. The application cannot always select the next task, especially when more than one tasks can be chosen. In this case the user must chose which task to select. 

```http
PUT {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/workflow/completeTask
```
OLD  //Complete
http://altinn3.no/runtime/api/3/RtlOrg/apitracing/7f32a720-a1e9-4565-a351-b3f66f9641b0/Complete

```http
PUT {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/workflow/nextTask
```

#### Complete workflow. 

The complete workflow method will attempt to complete the workflow. Hence, the app will move the workflow from one task to the next until it reaches an valid end state. 

If a task's exit condition is not met, the workflow will be stopped in the last valid task. And the user must manually fix the problem and complete the workflow.

```http
PUT {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/workflow/completeWorkflow
```
OLD // CompleteAndSendIn
http://altinn3.no/runtime/RtlOrg/apitracing/7f32a720-a1e9-4565-a351-b3f66f9641b0/CompleteAndSendIn

#### Get the tasks in a workflow?
Returns an list of the next tasks that can be reached from the current task.

```http
GET {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/workflow?nextTasks
```

#### Start a workflow task.

Closes current task and start the wanted task. Updates workflow state accordingly. If exit condition of current task is not met, an error will be returned. If the task is not directly reachable by the flow, an error will be returned.

```http
PUT {appPath}/instances/347829/41e57962-dfb7-4502-a4dd-8da28b0885fc/workflow/startTask?taskId=task3
```

### TextResources


#### Get text resources for the application for a specific language

```http
GET {appPath}/resources/texts?lang=nb
```
OLD http://altinn3.no/runtime/api/Language/GetLanguageAsJSON?languageCode=nb


#### Get text resources for a given element type

```http
GET {appPath}/elementTypes/{typeName}/resources/texts?lang=nb
```
OLD http://altinn3.no/runtime/api/textresources/RtlOrg/apitracing

### Metadata

#### Get the metadata for a given element type

```http
GET {appPath}/elementTypes/{typeName}/metadata
```
OLD http://altinn3.no/runtime/api/metadata/RtlOrg/apitracing/ServiceMetaData

#### Get the layout for a given element type

```http
GET {appPath}/elementTypes/{typeName}/layouts
```
OLD http://altinn3.no/runtime/api/resource/RtlOrg/apitracing/FormLayout.json

#### Gets the rules for a given element type

```http
GET {appPath}/elementTypes/{typeName}/rules
```
OLD http://altinn3.no/runtime/api/resource/RtlOrg/apitracing/RuleHandler.js


##### External API use

```http
GET {appPath}/elementTypes/{typeName}/externalApis
```
OLD (Service configuration) http://altinn3.no/runtime/api/resource/RtlOrg/apitracing/ServiceConfigurations.json

### Other

OLD http://altinn3.no/runtime/api/attachment/3/RtlOrg/apitracing/32dacdff-1f99-4958-9790-b0a0aeccfaa5/GetFormAttachments



{{% children description="true" depth="2" %}}
