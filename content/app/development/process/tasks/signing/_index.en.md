---
title: Signing task
description: Defining signing process tasks
tags: [altinn-apps, process, bpmn, task, sign, signing]
toc: true
---

{{% panel theme="warning" %}}
⚠️ Signing task require version 8.0.0 or newer of app-libs
{{% /panel %}}

Setting up a signing task in the process file requires a bit more work than a regular data, confirm or feedback task.

This page will walk you through what you need to configure and how that is connected to other parts of the configuration.

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

### Making sign an available action

As for confirmation steps we need to define the actions available, to generate a signing object the user needs to be able to perform the sign action:

```xml
<altinn:actions>
    <altinn:action>sign</altinn:action>
</altinn:actions>
```

The sign action can be the only option or in combination with other actions like confirm and/or reject, based on the needs of each application.

### Configure what dataelements to sign

Once a user performs a sign action the config from `<altinn:signatureConfig>` will be used to create a signature object.

Currently the app developer defines what data elements are going to be a part of the signature object by defining a list of dataTypes. This can be form data, attachments or pdfs.

The dataTypes are defined in the `App/config/applicationmetadata.json` file. 

The example signing task above defines that alle dataelements connected to the dataType Model should be a part of the signature.

If the application also has a datatype with attachments  named `attachments` where the user provides additional files that the developer wants to be a part of the signature object the `<altinn:signatureConfig>` should look like this:

```xml
<altinn:signatureConfig>
    <altinn:dataTypesToSign>
        <altinn:dataType>Model</altinn:dataType>
        <altinn:dataType>attachmetns</altinn:dataType>
    </altinn:dataTypesToSign>
    <altinn:signatureDataType>signature</altinn:signatureDataType>
</altinn:signatureConfig>
```

### Configure where to store the signature object

A signature object also requires a dataType where it should be stored once generated. This is defined in the `<altinn:signatureDataTyep>` and also needs to be defined in `App/config/applicationmetadata.json`

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

### Design layout for the signing step

The signing step requires a layout that defines what should be displayed to the user. This is done through a separate layout set, which in turn is associated with the signing process step (`Task_2` in our example).

If you have a v3 application without a layout set, see [Layout-sets](../../../ux/pages/layout-sets/) for how to set this up.

Create a new folder in `App/ui/` with a name that describes this layout set, for example, _signing_. In this folder, create the file `Settings.json` and a folder named `layouts`.

In the `layouts` folder, create files that define how pages in this layout set should look. The only component that a signing layout must have is an [`ActionButton`](../../../ux/components/ActionButton/) with `"action": "sign"`, which defines that when the user presses this, they perform the sign action, advancing the process.

An example of a simple layout with a read-only text field and a signing button may look like this:


```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "name-readonly-input",
        "type": "Input",
        "dataModelBindings": {
          "simpleBinding": "Name"
        },
        "readOnly": true,
        "required": true
      },
      {
        "id": "sign-button",
        "type": "ActionButton",
        "textResourceBindings": {
          "title": "Sign"
        },
        "action": "sign",
        "buttonStyle": "primary"
      }
    ]
  }
}
```

### Define authorization rule that gives the user signing rights

To allow users to sign, a rule must be defined in `App/config/authorization/policy.xml` that grants users the rights to sign in the given process step.

This rule must specify that users who should be able to sign have the permission rights: _read_, _write_, and _sign_ on the step.

An example of an authorization rule granting these permissions for the _DAGL_ role on the process step with the ID _Task_2_ could look like this:

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:7" Effect="Permit">
    <xacml:Description>Rule that defines that user with role DAGL can read, write and sign for [ORG]/[APP] when it is in Task_2</xacml:Description>
    <xacml:Target>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Task_2</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:task" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">write</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">sign</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
    </xacml:Target>
</xacml:Rule>
```

### Configure unique signatures

If an application has multiple signing steps it is possible to ensure that one person cannot sign both steps even if they have the necessary roles.

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

### Enable the signer to decline signing

If it should be possible to decline signing and, for example send the instance back to the previous step, this can be done by adding a `reject` action to this process step.

This is then added to the authorization rule, and a separate `ActionButton` is defined that is associated with the `reject` action.

See [Controlling process flow](../../flowcontrol/) for more information.


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

