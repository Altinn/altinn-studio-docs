---
title: App metadata
description: The application metadata document is holds technical information about the app and the data type requirements.
toc: true
tags: [api]
weight: 20
---

## Application

The Application model is the main model for metadata for the application.

Name | Description
-----|-------------
id | A gobally unique id for the application. The value has two parts separated by a '/' character. The first part is the short name of the application owner and the second part is the name of the app. 
versionId | The current version of the application. (Currently not in use.)
org | The short name of the application owner.
title | A collection of the application title in different languages.
validFrom | The date and time from when the application can be used to create instances.
validTo | The data and time for when the application will expire and can no longer be used to create new instances.
processId | The id of the process model being used by the application. (Currently not in use.)
dataTypes | A list of all the data types associated with the application. See [DataType](#datatype).
partyTypesAllowed | A collection of flags that controls what type of instance owners new instances can be created for. See [PartyTypesAllowed](#partytypesallowed)
autoDeleteOnProcessEnd | A value indicating whether an instance will be automatically deleted once the process ends. This can be used by highly sensitiv applications to force an instance delete instead of sending the instance to the archive.
presentationFields | A collection of presentation fields. See [PresentationField](#presentationfield). Currently not in use. 
dataFields | A collection of data fields. See [DataField](#datafield).
eFormidling | The configuration for the eFormidling integration for the application. See [eFormidlingContract](#eFormidlingContract).

## DataType

Data type represents the requirements for data elements. Data types representing a form will have model validation in addition to the requirements defined here.

Name | Description
-----|-------------
id | The id of the data type. Unique for the app.
description | A collection of data type descriptions in different languages.
allowedContentTypes | A list of Content-Types allowed by the data type.
allowedContributers | A list of allowed contributors. This can be used to restrict who it is that can work with the data type.
appLogic | A complex object with information on how a data type is connected to a model. See [ApplicationLogic](#applicationlogic).
taskId | A reference to a task from the application process. The value indicate that the data type requirements must be fulfilled before the process can move on from the given step in the process.
maxSize | The maximum allowed size of the data element.
maxCount | The maximum number of data elements of this type. 
minCount | The minimum required number of elements of this type.
grouping | The name of a group. This can be used to logically associate a data type to a group. E.g *Photos* or a text resource key.


## ApplicationLogic

ApplicationLogic holds information about how a data type representing a form is connected to a model.

Name | Description
-----|-------------
autoCreate | A value indicating whether a data element will be automatically created once an instance moves into the process step indicated by *taskId*.
classRef | The name of the C# class used to represent the form as a model in application logic.
schemaRef | A reference to the original schema used to define the model.

## PartyTypesAllowed

PartyTypesAllowed contains a set of values indicating the type of owners an instance can have.

Name | Description
-----|-------------
bankruptcyEstate | A value indicating that the instance owner can be a bancruptcy estate.
organisation | A value indicating that the instance owner can be any organisation.
person | A value indicating that the instance owner can be a person.
subUnit | A value indicating that the instance owner can be a sub unit.

## PresentationField

This type is used by a feature still in development. 

PresentationField represents a form field extraction rule. Every time a form is being saved the presentation field rules will be applied and any values from the form will be stored directly on the instance. This can later be used to present instance specific data in places like the portal message box. The purpose is to make it easier to identify a specific instance in a list with many almost identical instances.

Name | Description
-----|-------------
id | An id or key to identify the specific rule. 
path | A path to a specific field or property in the form model. 
dataTypeId | The name of the datatype. See [DataType](#datatype). 

## DataField

DataField represents a form field extraction rule. Every time a form is being saved the data field rules will be applied and any values from the form will be stored directly on the instance. While [PresentationField](#presentationField) will have logic applied to it with regards to where and how it's used, the use of data fields is entirely up to the application developer and the application owner. One usage scenario is to provide data fields which can be used for routing to the correct backend system.


Name | Description
-----|-------------
id | An id or key to identify the specific rule. 
path | A path to a specific field or property in the form model. 
dataTypeId | The name of the datatype. See [DataType](#datatype). 

## eFormidlingContract

This type is used by a feature still in development. 

eFormidlingContract holds the configuration of the eFormidling integration for the application. 
An application configured to enable eFormidling integration in combination with the eFormidiling contract will send a shipment to eFormidling for every instance that is created. 

Name | Description
-----|-------------
serviceId | The service identifier of the process
process | The process type to be set on the shipment
receiver  | The receiver of the eFormidling shipment. 
sendAfterTaskId | The id of the last task to be completed before the shipment is sent
type | The document type of the shipment e.g. arkivmelding
typeVersion | The version of the document type
standard | The document standard e.g. urn:no:difi:arkivmelding:xsd::arkivmelding
securityLevel | The security level to be set on the standard business document
dataTypes | A list of the dataTypes to be included in the shipment. Data type for both form data and attachments should be listed to be included in the shipment

## Complete example

This is a complete app metadata document with data types.

```json
{
    "id": "ttd/bli-applikasjonseier",
    "versionId": null,
    "org": "ttd",
    "title": {
        "nb": "Bli applikasjonseier"
    },
    "validFrom": null,
    "validTo": null,
    "processId": null,
    "dataTypes": [
        {
            "id": "Kursdomene_BliTjenesteeier_M_2020-05-25_5703_34553_SERES",
            "description": null,
            "allowedContentTypes": [
                "application/xml"
            ],
            "allowedContributers": null,
            "appLogic": {
                "autoCreate": true,
                "classRef": "Altinn.App.Models.BliTjenesteeier_M",
                "schemaRef": null
            },
            "taskId": "Task_1",
            "maxSize": null,
            "maxCount": 1,
            "minCount": 1,
            "grouping": null
        },
        {
            "id": "ref-data-as-pdf",
            "description": null,
            "allowedContentTypes": [
                "application/pdf"
            ],
            "allowedContributers": null,
            "appLogic": null,
            "taskId": null,
            "maxSize": null,
            "maxCount": 0,
            "minCount": 0,
            "grouping": null
        }
    ],
    "partyTypesAllowed": {
        "bankruptcyEstate": true,
        "organisation": true,
        "person": true,
        "subUnit": true
    },
    "autoDeleteOnProcessEnd": false,
    "created": "2020-07-17T08:26:21.5707559Z",
    "createdBy": "sandgrainone",
    "lastChanged": "2020-07-17T08:26:21.5708691Z",
    "lastChangedBy": "sandgrainone"
}
```
