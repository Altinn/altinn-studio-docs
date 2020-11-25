---
title: Instance
description: An instance is a metadata container that is used to track the status and progress of one interaction between an App user and owner.
toc: true
tags: [api]
weight: 40
---

## Instance

The Instance model is the main model of an instance. An instance works as a form of envelope or folder where data can be collected and exchanged between the user and owner of the application. The instance document is a way for Altinn and external parties to track the state of one specific data exchange. 

### Properties

Name | Description
-----|-------------
id | A gobally unique id for the instance. The value has two parts separated by a '/' character. The first part is the internal unique id of the instance owner and the second part is a generated UUID value.
instanceOwner | A complex type identifying the owner of the instance. See [InstanceOwner](#instanceowner)
appId | The id for the App the instance is associated with. The value has two parts separated by a '/' character. The first part is the short name/identifier of the owner of the App and the second part is the App name.
org | The short name of the App owner.
selfLinks | A complex type containing a set of named URLs. See [ResourceLinks](#resourcelinks)
dueBefore | This can be use by App owner to indicate a deadline for when the instance must be completed and submitted by a user that can represent the instance owner.
visibleAfter | This can be used by App owner to have an instance become visible for App users at a given date and time. This way an instance can be created in advance and populated with data before being available to an application user.
process | A complex type tracking the process state of the instance. See [ProcessState](#processstate)
status | A complex type with more state data. See [InstanceStatus](#instancestatus)
completeConfirmations | A list of complete confirmations. See [CompleteConfirmation](#completeconfirmation)
data | A list of data elements. This include all forms, attachments and other data types being collected. See [DataElement](../data-element)
created | The date and time when the instance was first initialized.
createdBy | An idenfificator indicating who it was that created the instance.
lastChanged | The date and time when the instance was last changed.
lastChangedBy | An idenfificator indicating who it was that made the last change to the instance.

## InstanceOwner

The InstanceOwner model is a simple definition whose only porpose is to hold a universally known identification value of the instance owner.

### Properties

Name | Description
-----|-------------
partyId | A value used internally by Altinn to uniquely identify an entity across Organisations, Persons and Self identified users.
personNumber | If the instance owner is a person this field is populated with a person number from the National Population Register in Norway.
organisationNumber | If the instance owner is an organisation this field is populated with an organisation number from the National Unit Register in Norway.

## InstanceStatus

The InstanceStatus model is used to hold key status related metadata about an instance. All information is also tracked through instance events, but this is an easily accessible summary of the last events.

### Properties

Name | Description
-----|-------------
archived | The date and time for when an archived instance was archived.
softDeleted | The date and time for when a deleted instance were moved to the recycle bin. 
hardDeleted | The date and time for when an instance became unrecoverable through any API. A few days later the instance and all its data will be physically deleted from storage and truly unrecoverable.
readStatus | A field indicating whether an application user has opened the instance at any time. Used internally by the message box to indicate read status of elements.
substatus | A property with human readable status information that will be displayed by the message box.

## CompleteConfirmation

The CompleteConfirmation model is a simple type for holding information about who and when a given stakeholder has told Altinn that the instance is no longer needed. They have obtained all the information they needed from the instance. The instance can be deleted permanently should an application user decide to to so. At the time of writing an instance can have only one stakeholder and that is the Application Owner. 

### Properties

Name | Description
-----|-------------
stakeholderId | The short name of an application owner.
confirmedOn | The date and time for when the application owner confirmed that they consider the instance as no longer needed in Altinn.

## ProcessState

The process state model keeps track of the process of a specific instance.

### Properties

Name | Description
-----|-------------
started | Date and time for when the process was initially started.
startEvent | The name of the start event triggering the beginning of the process.
currentTask | A complex model keeping track of current process step. See [ProcessElementInfo](#processelementinfo)
ended | Date and time for when the process was finished.
endEvent | The name of the end event that the process ended with.

## ProcessElementInfo

The process element info holds information about the current task in the process.

### Properties

Name | Description
-----|-------------
flow | A step counter that increase every time the process moves forward. 
started | Date and time for when the instance entered the current step.
elementId | The unique id of current process task.
name | The name of the task. (Human readable.)
altinnTaskType | The type of task.
validated | A date and time for when the instance was validated as well as a value indicating if the task can be completed without additional changes and a new validation.


## ResourceLinks

The resource link model is should have a collection of URLs that can be used to obtain a copy of the instance document through different API. The propose is to make it easy to switch between API. Primarily when the original was obtain from the storage instance query API and you need to use the App API to perform changes on the instance.

### Properties

Name | Description
-----|-------------
apps | Contains a URL for the endpoint to use to obtain a copy of the current instance document through the App API.
platform | Contains a URL for the endpoint to use to obtain a copy of the current instance document through the Platform Storage API.


## Complete example

This example was created by instantiating an App running locally on a development machine using LocalTest. The process is at first step, Task_1, and it has a single data element which is the main form of the App.

```json
{
    "id": "1337/bd9edd59-b18c-4726-aa9e-6b150eade814",
    "instanceOwner": {
        "partyId": "1337",
        "personNumber": "01039012345",
        "organisationNumber": null
    },
    "appId": "ttd/bli-applikasjonseier",
    "org": "ttd",
    "selfLinks": {
        "apps": "https://altinn3local.no/ttd/bli-applikasjonseier/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814",
        "platform": "https://altinn3local.no/storage/api/v1/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814"
    },
    "dueBefore": null,
    "visibleAfter": null,
    "process": {
        "started": "2020-11-18T15:56:41.5662973Z",
        "startEvent": "StartEvent_1",
        "currentTask": {
            "flow": 2,
            "started": "2020-11-18T15:56:41.5664762Z",
            "elementId": "Task_1",
            "name": "Utfylling",
            "altinnTaskType": "data",
            "ended": null,
            "validated": {
                "timestamp": "2020-11-20T13:00:05.1800273+00:00",
                "canCompleteTask": true
            }
        },
        "ended": null,
        "endEvent": null
    },
    "status": null,
    "completeConfirmations": null,
    "data": [
        {
            "id": "8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
            "instanceGuid": "bd9edd59-b18c-4726-aa9e-6b150eade814",
            "dataType": "Kursdomene_BliTjenesteeier_M_2020-05-25_5703_34553_SERES",
            "filename": null,
            "contentType": "application/xml",
            "blobStoragePath": "ttd/bli-applikasjonseier/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
            "selfLinks": {
                "apps": "https://altinn3local.no/ttd/bli-applikasjonseier/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d",
                "platform": "https://altinn3local.no/storage/api/v1/instances/1337/bd9edd59-b18c-4726-aa9e-6b150eade814/data/8a8a01ae-9533-4aa9-b914-8ab0fae6ea0d"
            },
            "size": 401,
            "locked": false,
            "refs": [],
            "created": "2020-11-18T15:56:43.1089008Z",
            "createdBy": null,
            "lastChanged": "2020-11-18T15:56:43.1089008Z",
            "lastChangedBy": null
        }
    ],
    "created": "2020-11-18T15:56:42.1972942Z",
    "createdBy": "1337",
    "lastChanged": "2020-11-18T15:56:42.1972942Z",
    "lastChangedBy": "1337"
}
```
