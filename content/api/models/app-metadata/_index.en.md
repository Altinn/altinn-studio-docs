---
title: App metadata
description: The application metadata document holds technical information about the app and the data type requirements.
toc: true
tags: [api]
weight: 20
aliases:
  - /teknologi/altinnstudio/altinn-api/models/app-metadata/
---

## Application

The Application model is the main model for metadata for the application.

| Name                   | Description                                                                                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                     | A gobally unique id for the application. The value has two parts separated by a '/' character. The first part is the short name of the application owner and the second part is the name of the app.                       |
| versionId              | The version of the app in Altinn Storage. Studio sets it to the commit ID of the release when it deploys the app.                                                                                                                                                           |
| org                    | The short name of the application owner.                                                                                                                                                                                  |
| title                  | A collection of the application title in different languages.                                                                                                                                                             |
| validFrom              | The date and time from when the application can be used to create instances.                                                                                                                                              |
| validTo                | The data and time for when the application will expire and can no longer be used to create new instances.                                                                                                                 |
| processId              | The id of the process model being used by the application. (Currently not in use.)                                                                                                                                        |
| dataTypes              | A list of all the data types associated with the application. See [DataType](#datatype).                                                                                                                                  |
| partyTypesAllowed      | A collection of flags that controls what type of instance owners new instances can be created for. See [PartyTypesAllowed](#partytypesallowed)                                                                             |
| autoDeleteOnProcessEnd | A value indicating whether an instance will be automatically deleted once the process ends. This can be used by highly sensitive applications to force an instance delete instead of sending the instance to the archive. |
| preventInstanceDeletionForDays | The number of days after an instance is archived during which Altinn Storage refuses to delete it. Do not combine it with `autoDeleteOnProcessEnd: true`, because a v9 app then fails to build. See [minimum persistence lifetime]({{< relref "/altinn-studio/v8/reference/data/persistence#configure-minimum-persistence-lifetime" >}}). |
| presentationFields     | A collection of presentation fields. See [PresentationField](#presentationfield).                                                                                                                                           |
| dataFields             | A collection of data fields. See [DataField](#datafield).                                                                                                                                                                   |
| eFormidling            | v8 only. The configuration for the eFormidling integration for the application. See [eFormidlingContract](#eformidlingcontract).                                                                                                    |
| messageBoxConfig        | A collection of configurations related to the Altinn Message box                                                                                                                                                           |
| onEntry | What a user who opens the app without an instance sees. See [OnEntry](#onentry). |
| copyInstanceSettings | Settings for making a new instance as a copy of an archived one. See [CopyInstanceSettings](#copyinstancesettings). |
| apiScopes | The scopes a token must have to call the app's instance API. See [API scopes]({{< relref "/altinn-studio/v8/reference/configuration/authorization/api-scopes" >}}). |
| disallowUserInstantiation | A value indicating whether only service owners can create new instances. Users can still make a copy of an archived instance. The app checks this only in production. Defaults to false. |
| promptForParty | `always` sends users who can represent more than one party to the party selection, even when their profile says not to. `never` skips the party selection. Without the setting, the user's profile decides. |
| onProcessEnd | v9 only. `{ "confirm": true }` makes the app confirm the instance as complete for the service owner when the process ends. The policy must give the service owner the `complete` action. |
| logo | Shows a logo instead of the Altinn logo. With `source` set to `org`, the default, the app shows the service owner's logo. With `resource`, it shows the logo at the URL in the text resource `appLogo.url`. See [Logo]({{< relref "/altinn-studio/v8/reference/ux/logo#properties" >}}). |
| description | A description of the app in different languages. Studio publishes it to the Resource Registry when the app is deployed. |
| access | Settings for delegating access to the app: `rightDescription`, `delegable` and `visible`. Studio publishes them to the Resource Registry when the app is deployed. |
| contactPoints | A list of contact points for the app, each with `category`, `email`, `telephone` and `contactPage`. Studio publishes them to the Resource Registry when the app is deployed. |

## DataType

Data type represents the requirements for data elements. Data types representing a form will have model validation in addition to the requirements defined here.

| Name                             | Description                                                                                                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                               | The id of the data type. Unique for the app.                                                                                                                                                |
| description                      | A collection of data type descriptions in different languages.                                                                                                                              |
| allowedContentTypes              | A list of Content-Types allowed by the data type.                                                                                                                                           |
| allowedContributors              | A list of allowed contributors. This can be used to restrict who it is that can work with the data type.                                                                                    |
| actionRequiredToRead             | An [action]({{< relref "/altinn-studio/v8/reference/configuration/authorization#action-attributes" >}}), in addition to `read`, which is required to read data elements of this type.                           |
| actionRequiredToWrite            | An [action]({{< relref "/altinn-studio/v8/reference/configuration/authorization#action-attributes" >}}), in addition to `write`, which is required to write to data elements of this type.                      |
| appLogic                         | A complex object with information on how a data type is connected to a model. See [ApplicationLogic](#applicationlogic).                                                                    |
| taskId                           | A reference to a task from the application process. The value indicates that the data type requirements must be fulfilled before the process can move on from the given step in the process. Used in v8. A v9 app uses `taskIds` instead. |
| taskIds | A list of the tasks the data type belongs to. Altinn Storage refuses to create, change or delete data of this type in other tasks. A v9 app refuses this too, and requires the data type requirements to be fulfilled before the process can move on from these tasks. A v8 app does not read it. |
| maxSize                          | The maximum allowed size of the data element.                                                                                                                                               |
| maxCount                         | The maximum number of data elements of this type.                                                                                                                                           |
| minCount                         | The minimum required number of elements of this type.                                                                                                                                       |
| grouping                         | The name of a group. This can be used to logically associate a data type to a group. E.g _Photos_ or a text resource key.                                                                   |
| enablePdfCreation | v8 only. A value indicating whether the app makes a PDF when the task of a data type with `appLogic` ends. Defaults to true. A v9 app makes PDFs in a PDF service task, and fails to build when this is true. |
| enableFileScan                   | A value indicating if the data type should be scanned for virus/malware. If a file is scanned and found to be infected before the process is complete, this will cause a validation error.   |
| validationErrorOnPendingFileScan | A value indicating if a pending file scan should trigger a validation error and prevent the completion of the process before the scan is complete.                                           |
| enabledFileAnalysers | The IDs of the file analysers to run when a file of this type is uploaded. See [file validation]({{< relref "/altinn-studio/v8/reference/logic/validation/files" >}}). |
| enabledFileValidators | The IDs of the file validators to run when a file of this type is uploaded. A failing validator stops the upload. See [file validation]({{< relref "/altinn-studio/v8/reference/logic/validation/files" >}}). |
| allowedKeysForUserDefinedMetadata | The keys allowed in the user-defined metadata of a data element. When the list is set, the app refuses other keys. Defaults to allowing all keys. |

## ApplicationLogic

ApplicationLogic holds information about how a data type representing a form is connected to a model.

| Name                      | Description                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| autoCreate                | A value indicating whether a data element will be automatically created once an instance moves into the task in `taskId` (v8) or one of the tasks in `taskIds` (v9). |
| classRef                  | The name of the C# class used to represent the form as a model in application logic.                                                        |
| schemaRef                 | A reference to the original schema used to define the model.                                                                                 |
| disallowUserCreate        | A value indicating whether the a user should be able to create an elemement of the data type. Defaults to allow it (false).                 |
| disallowUserDelete        | A value indicating whether the a user should be able to delete an elemement of the data type. Defaults to allow it (false).                 |
| allowAnonymousOnStateless | Specifies whether or not anonymous access is allowed in stateless mode for this particular data type.                                        |
| autoDeleteOnProcessEnd    | Specifies whether or not data of this type should be automatically marked for hard deletion on process end. Defaults to false.               |
| shadowFields              | Contains the [shadow fields configuration](#shadowfields).                                                                                     |

### ShadowFields

ShadowFields contains the configuration for shadow fields for a given data type.

| Name               | Description                                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------|
| prefix              | The prefix to use to filter out shadow fields. E.g. *"SF_"* or similar.                                                |
| saveToDataType     | The data type to save filtered data (without shadow fields) to. If not set, the containing data type will be updated. |


## PartyTypesAllowed

PartyTypesAllowed contains a set of values indicating the type of owners an instance can have.

| Name             | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| bankruptcyEstate | A value indicating that the instance owner can be a bancruptcy estate. |
| organisation     | A value indicating that the instance owner can be any organisation.    |
| person           | A value indicating that the instance owner can be a person.            |
| subUnit          | A value indicating that the instance owner can be a sub unit.          |

## PresentationField

PresentationField represents a form field extraction rule. Every time a form is being saved the presentation field rules will be applied and any values from the form will be stored directly on the instance. This can later be used to present instance specific data in places like the portal message box. The purpose is to make it easier to identify a specific instance in a list with many almost identical instances.

| Name       | Description                                               |
| ---------- | --------------------------------------------------------- |
| id         | An id or key to identify the specific rule.                |
| path       | A path to a specific field or property in the form model.   |
| dataTypeId | The name of the datatype. See [DataType](#datatype).      |

## DataField

DataField represents a form field extraction rule. Every time a form is being saved the data field rules will be applied and any values from the form will be stored directly on the instance. While [PresentationField](#presentationfield) will have logic applied to it with regards to where and how it's used, the use of data fields is entirely up to the application developer and the application owner. One usage scenario is to provide data fields which can be used for routing to the correct backend system.

| Name       | Description                                               |
| ---------- | --------------------------------------------------------- |
| id         | An id or key to identify the specific rule.                |
| path       | A path to a specific field or property in the form model.   |
| dataTypeId | The name of the datatype. See [DataType](#datatype).      |

## eFormidlingContract

eFormidlingContract holds the configuration of the eFormidling integration for the application. Only v8 reads it: when `EnableEFormidling` is `true` in `AppSettings`, the app sends a shipment to eFormidling when the task in `sendAfterTaskId` ends. See [eFormidling]({{< relref "/altinn-studio/v8/reference/configuration/eformidling" >}}). A v9 app with an `eFormidling` block fails to build, because v9 configures eFormidling on a service task in the process.

| Name            | Description                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| serviceId       | The service identifier of the process. The app does not read it.                                                                                                                 |
| dpfShipmentType | The shipment type for a DPF shipment, such as `altinn3.skjema`. The receiving system uses it to route the shipment. When it is set, the app adds it to the shipment. |
| process         | The process type to be set on the shipment                                                                                                           |
| receiver        | The receiver of the eFormidling shipment.                                                                                                            |
| sendAfterTaskId | The id of the last task to be completed before the shipment is sent                                                                                  |
| type            | The document type of the shipment e.g. arkivmelding                                                                                                  |
| typeVersion     | The version of the document type                                                                                                                     |
| standard        | The document standard e.g. urn:no:difi:arkivmelding:xsd::arkivmelding                                                                                 |
| securityLevel   | The security level to be set on the standard business document                                                                                       |
| dataTypes       | A list of the dataTypes to be included in the shipment. Data type for both form data and attachments should be listed to be included in the shipment |

## MessageBoxConfig

MessageBoxConfig holds configurations related to the presentation of instances in the Altinn MessageBox.

| Name         | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| hideSettings | The settings related to hiding an instance from the message box |
| syncAdapterSettings | Settings that turn off parts of the sync from instances to dialogs in Dialogporten. See [sync adapter settings]({{< relref "/dialogporten/reference/front-end/altinn-apps#sync-adapter-settings" >}}). |

### HideSettings

Only one of the two settings should be used at a time.

| Name       | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| hideAlways | A boolean indicating that the instance should always be hidden           |
| hideOnTask | A list of tasks where the instance should be hidden from the message box |

## CopyInstanceSettings

Configure whether users can make a new instance as a copy of an archived one. You also choose whether the app copies attachments and the due date, and which data types and data fields it leaves out. Finally, you choose which data values and presentation texts the app copies to the new instance.

| Name                      | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| enabled                   | A value indicating whether users can create a copy of an instance.                                |
| excludedDataTypes         | List of data types that should be excluded when a new copy is made.                               |
| excludedDataFields        | List of fields in the data model that should be excluded when a new copy is made.                 |
| includeAttachments        | A value indicating whether the app copies attachments. Defaults to false.                         |
| includeDueBefore          | A value indicating whether the app copies the due date (`dueBefore`). Defaults to false.          |
| includedDataValues        | List of keys in `dataValues` that should be copied from the source instance.                      |
| includedPresentationTexts | List of keys in `presentationTexts` that should be copied from the source instance.               |

The portal message box will show a link called [Create new copy]({{< relref "/altinn-studio/v8/reference/configuration/messagebox/create_copy" >}}) when the user selects an archived instance.

## OnEntry

Configure how the application behaves when a user opens the application without an instance id set

| Name | Description                                                                                                                                                                                                                                             |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show | Possible values: new-instance, select-instance or the name of a stateless view. <br/>_new-instance_ : user will always get a new instance. <br/> _select-instance_ : user will be presented with a list of active instances if any, if no active instances a new one will be created. <br/> _other values_ : the app is stateless and shows the layout set (v8) or the folder under `App/ui` (v9) with that name. |
| instanceSelection | Settings for the page where the user selects an active instance. See [instance selection page]({{< relref "/altinn-studio/v8/reference/configuration/startup#configure-instance-selection-page" >}}). |

## Complete example

This is a complete app metadata document with data types.

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

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
      "allowedContentTypes": ["application/xml"],
      "allowedContributors": null,
      "actionRequiredToRead": null,
      "actionRequiredToWrite": null,
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.BliTjenesteeier_M",
        "schemaRef": null,
        "allowAnonymousOnStateless": false,
        "autoDeleteOnProcessEnd": false,
        "disallowUserCreate": false,
        "disallowUserDelete": false,
        "shadowFields": null
      },
      "taskId": "Task_1",
      "maxSize": null,
      "maxCount": 1,
      "minCount": 1,
      "grouping": null,
      "enablePdfCreation": true,
      "enableFileScan": false,
      "validationErrorOnPendingFileScan": false,
      "enabledFileAnalysers": [],
      "enabledFileValidators": [],
      "allowedKeysForUserDefinedMetadata": null
    },
    {
      "id": "ref-data-as-pdf",
      "description": null,
      "allowedContentTypes": ["application/pdf"],
      "allowedContributors": null,
      "actionRequiredToRead": null,
      "actionRequiredToWrite": null,
      "appLogic": null,
      "taskId": null,
      "maxSize": null,
      "maxCount": 0,
      "minCount": 0,
      "grouping": null,
      "enablePdfCreation": false,
      "enableFileScan": false,
      "validationErrorOnPendingFileScan": false,
      "enabledFileAnalysers": [],
      "enabledFileValidators": [],
      "allowedKeysForUserDefinedMetadata": null
    },
    {
      "id": "uploaded-files",
      "description": null,
      "allowedContentTypes": ["image/jpeg"],
      "allowedContributors": null,
      "actionRequiredToRead": null,
      "actionRequiredToWrite": null,
      "appLogic": null,
      "taskId": "Task_1",
      "maxSize": 25,
      "maxCount": 5,
      "minCount": 1,
      "enablePdfCreation": false,
      "enableFileScan": true,
      "validationErrorOnPendingFileScan": true,
      "enabledFileAnalysers": [],
      "enabledFileValidators": [],
      "allowedKeysForUserDefinedMetadata": null
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": true,
    "organisation": true,
    "person": true,
    "subUnit": true
  },
  "messageBoxConfig": {
    "hideSettings": {
      "hideOnTask": ["Task_3"]
    }
  },
  "autoDeleteOnProcessEnd": false,
  "created": "2020-07-17T08:26:21.5707559Z",
  "createdBy": "sandgrainone",
  "lastChanged": "2020-07-17T08:26:21.5708691Z",
  "lastChangedBy": "sandgrainone"
}
```

The example is for v8. In a v9 app, replace each `taskId` with a `taskIds` list, such as `"taskIds": ["Task_1"]`, and remove `enablePdfCreation`. A v9 app then makes a PDF only if you add a PDF service task to the process.
