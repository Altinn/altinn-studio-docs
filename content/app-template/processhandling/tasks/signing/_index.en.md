---
title: Signing task
description: Defining signing process tasks
tags: [altinn-apps, process, bpmn, task, sign, signing]
weight: 1
---

Setting up a signing task in the process file requires a bit more work than a regular data, confirm or feedback task.

This page will walk you through what you need to configure and how that is connected to other parts of the configuration

## Defining and configuring a signing task

A signing task in its simples format looks something like this:

```xml
<bpmn:task id="Task_2" name="Signing">
    <bpmn:incoming>Flow_1enq1lu</bpmn:incoming>
    <bpmn:outgoing>Flow_0ybpfuh</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>signing</altinn:taskType>
            <altinn:actions>
                <altinn:action>sign</altinn:action>
            </altinn:actions>
            <altinn:signatureConfig>
                <altinn:dataTypesToSign>
                    <altinn:dataType>Model</altinn:dataType>
                </altinn:dataTypesToSign>
                <altinn:signatureDataType>signature</altinn:signatureDataType>
            </altinn:signatureConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

#### Making sign an available aciton

As for confirmation steps we need to define the actions available, to generate a signing object the user needs to be able to perform the sign action:

```xml
<altinn:actions>
    <altinn:action>sign</altinn:action>
</altinn:actions>
```

The sign action can be the only option or in combination with other actions like confirm and/or reject, based on the needs of each application.

#### Configure what dataelements to sign

Once a user performs a sign action the config from `<altinn:signatureConfig>` will be used to create a signature object.

Currently the app developer defines what data elements are going to be a part of the signature object by defining a list of dataTypes. This can be form data, attachments or pdfs.

The dataTypes are defined in the `App/config/applicationmetadata.json` file. 

The example signing task above defines that alle dataelements connected to the dataType Model should be a part of the signature.

If the application also has a datatype with attchments named `attachments` where the user provides additional files that the developer wants to be a part of the signature object the `<altinn:signatureConfig>` should look like this:

```xml
<altinn:signatureConfig>
    <altinn:dataTypesToSign>
        <altinn:dataType>Model</altinn:dataType>
        <altinn:dataType>attachmetns</altinn:dataType>
    </altinn:dataTypesToSign>
    <altinn:signatureDataType>signature</altinn:signatureDataType>
</altinn:signatureConfig>
```

#### Configure where to store the signature object

A singature object also requires a dataType where it should be stored once generated. This is defined in the `<altinn:signatureDataTyep>` and also needs to be defined in `App/config/applicationmetadata.json`

Example of a applicationmetadata.json with a signature datatype named signature:

```json
{
  "id": "ttd/vga-dev-v8",
  "org": "ttd",
  "title": {
    "nb": "vga-dev-v8",
    "en": "vga-dev-v8"
  },
  "dataTypes": [
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": [
        "application/pdf"
      ],
      "maxCount": 0,
      "minCount": 0,
      "enablePdfCreation": true
    },
    {
      "id": "Model",
      "allowedContentTypes": [
        "application/xml"
      ],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.Model",
        "allowAnonymousOnStateless": false,
        "autoDeleteOnProcessEnd": false
      },
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 1,
      "enablePdfCreation": true
    },
    {
      "id": "signature",
      "allowedContentTypes": [
        "application/json"
      ],
      "taskId": "Task_2",
      "maxSize": 25,
      "maxCount": 1,
      "minCount": 0,
      "enablePdfCreation": false
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": false,
    "organisation": false,
    "person": false,
    "subUnit": false
  },
  "autoDeleteOnProcessEnd": false,
  "created": "2022-10-21T07:30:47.2710111Z",
  "createdBy": "appdeveloper",
  "lastChanged": "2022-10-21T07:30:47.2710121Z",
  "lastChangedBy": "appdeveloper"
}
```

#### Configure unique signatures

If an application has multiple signing steps it is possible to ensure that one person can not sign both steps even if they have the necessary roles.

Example if two members of the board should sign, but the same person cannot perform both signing steps.

To configure this we need to add the first signature dataobject to the list in `<altinn:uniqueFromSignaturesInDataTypes>` for signing task two

```xml
<bpmn:task id="Task_2" name="Signing">
    <bpmn:incoming>Flow_1enq1lu</bpmn:incoming>
    <bpmn:outgoing>Flow_0ybpfuh</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>signing</altinn:taskType>
            <altinn:actions>
                <altinn:action>sign</altinn:action>
            </altinn:actions>
            <altinn:signatureConfig>
                <altinn:dataTypesToSign>
                    <altinn:dataType>Model</altinn:dataType>
                </altinn:dataTypesToSign>
                <altinn:signatureDataType>signature</altinn:signatureDataType>
            </altinn:signatureConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
<bpmn:task id="Task_3" name="Second Signing">
    <bpmn:incoming>Flow_1enadsf</bpmn:incoming>
    <bpmn:outgoing>Flow_0yadsfh</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>signing</altinn:taskType>
            <altinn:actions>
                <altinn:action>sign</altinn:action>
            </altinn:actions>
            <altinn:signatureConfig>
                <altinn:dataTypesToSign>
                    <altinn:dataType>Model</altinn:dataType>
                </altinn:dataTypesToSign>
                <altinn:signatureDataType>signature2</altinn:signatureDataType>
                <altinn:uniqueFromSignaturesInDataTypes>
                    <altinn:dataType>signature</altinn:dataType>
                </altinn:uniqueFromSignaturesInDataTypes>
            </altinn:signatureConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

In the example the signing object for Task_2 is stored in the dataType signature, and in signature2 for Task_3. 

In addition Task_3s `<altinn:signatureConfig>` has defined that it should be unique from all signature objects stored in dataType `signature`.

```xml
<altinn:uniqueFromSignaturesInDataTypes>
    <altinn:dataType>signature</altinn:dataType>
</altinn:uniqueFromSignaturesInDataTypes>
```

### Signing object stored when user signs

Once the user performs the sign action a signature object will be stored as dataType signature. The signature object will look something like this:

```json
{
    "id": "ab5b8d43-64a5-482d-bfab-99e5ae6b2f55",
    "instanceGuid": "5267dc93-aa7d-4af9-934b-b0cf5b97d86e",
    "signedTime": "2023-06-16T12:16:36.6250698Z",
    "signeeInfo": {
        "userId": "1337",
        "personNumber": "01039012345",
        "organisationNumber": null
    },
    "dataElementSignatures": [
        {
            "dataElementId": "c71177df-e74d-44a2-976c-0443c98756ba",
            "sha256Hash": "cee2a288ccc273e85f9bdbbc2de52b02d0f0caac80a62e0352bd72689b283286",
            "signed": true
        }
    ]
}
```

If multiple dataElements are signed they will be added to the `dataElementSignatures` list.

The field `sha256Hash` contains a base64 encoded sha256Hash generated from the data stored in Altinn at the time of signing.
The `signeeInfo` object hold the information about who performed the signing.

