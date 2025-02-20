---
title: Sign and submit
linktitle: Sign and submit
description: Follow these steps to implement sign and submit in one step in you app
tags: [signing]
weight: 50
aliases:
- /altinn-studio/guides/signing/sign-and-submit
---

## What does sign and submit mean?

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/intro.en.md" %}}

## Prerequisites
If the service should send a signature receipt to the inbox of the signee, the altinn message service (Correspondence) must be enabled.

## Convert data task step to a singing task

Below is an example of a data task that has been converted to a signing task.

The task will still work like a normal data task, except that the instance owner can sign the data at the same time as submitting the instance.

1. Change the taskType to be `signing`.
2. Add `sign` to possible actions.
3. Configure what data types should be signed, for instance the raw data model, in `<altinn:dataTypesToSign>`.
4. Configure in which data type the actual signature should be stored. The data type is examplified below.

Finished converted example in process.xml:

```xml
<bpmn:task id="Task_1" name="Fyll ut og signer">
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:taskType>signing</altinn:taskType>
        <altinn:actions>
            <altinn:action>sign</altinn:action>
        </altinn:actions>
        <altinn:signatureConfig>
            <altinn:dataTypesToSign>
                <altinn:dataType>model</altinn:dataType>
            </altinn:dataTypesToSign>
            <altinn:signatureDataType>signatureInformation-2mjK</altinn:signatureDataType>
        </altinn:signatureConfig>
    </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_0esyro2</bpmn:incoming>
    <bpmn:outgoing>Flow_1438z6c</bpmn:outgoing>
</bpmn:task>
```

The data type in applicationmetadata.json:

```json
{
    "id": "signatureInformation-2mjK",
    "allowedContentTypes": [
    "application/json"
    ],
    "allowedContributors": ["app:owned"]
}
```

## Access rights

Make sure that the instance owner has rights to do the `sign` action.

For this scenario you can likely add `sign` right next to where they get access to `read` and `write`.

```xml
<xacml:AnyOf>
        <xacml:AllOf>
          <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
            <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
          </xacml:Match>
        </xacml:AllOf>
        <xacml:AllOf>
          <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">write</xacml:AttributeValue>
            <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
          </xacml:Match>
        </xacml:AllOf>
        <xacml:AllOf>
          <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">sign</xacml:AttributeValue>
            <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
          </xacml:Match>
        </xacml:AllOf>
      </xacml:AnyOf>
```