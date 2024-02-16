---
title: Process tasks
description: Defining process tasks
tags: [altinn-apps, process, bpmn, task]
weight: 10
---

## Task types

### Data Task

A data task is where the user/system accessing the digital service through UI or API can read, write and modify data related to a digital service.

A data task requires that all data for a given process task is valid and that the user/system has added all the necessary data.

The data validation is part of the standard logic in the template. Application developers can add custom validation for each data element and task.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v8">}}
```xml
<bpmn:task id="Task_1" name="Utfylling">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:taskType>data</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```
{{</content-version-container>}}
{{<content-version-container version-label="v7">}}
```xml
<bpmn:task id="Task_1" name="Utfylling" dataType="data">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Confirmation Task

A confirmation task is where the end user accessing the application through the browser or system through API can confirm data that is part of the process.

When a user confirms a confirmation task a confirm instance event log is created detailing that user/system X has confirmed.

Example of a confirmation task
{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v8">}}
```xml
<bpmn:task id="Task_2" name="Bekreftelse">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:actions>
            <altinn:action>confirm</altinn:action>
        </altinn:actions>
        <altinn:taskType>confirmation</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```
{{</content-version-container>}}
{{<content-version-container version-label="v7">}}
```xml
<bpmn:task id="Task_2" name="Bekreftelse" dataType="confirmation">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Signing Task

A signing task is where the end user accessing the application through the browser or system through API can sign data that is part of the process.

When a user performs a sign action a signature object containing the user information and a hash of the data elements defined in the process task will be generated along a instance event log detailing that user/system X has signed

Example of a signing task (only supported in v8)
```xml
<bpmn:task id="Task_1">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:actions>
            <altinn:action>sign</altinn:action>
        </altinn:actions>
        <altinn:taskType>signing</altinn:taskType>
        <altinn:signatureConfig>
        <altinn:dataTypesToSign>
            <altinn:dataType>MyDataModel</altinn:dataType>
        </altinn:dataTypesToSign>
        <altinn:signatureDataType>signature2</altinn:signatureDataType>
        <altinn:uniqueFromSignaturesInDataTypes>
            <altinn:dataType>signature1</altinn:dataType>
        </altinn:uniqueFromSignaturesInDataTypes>
        </altinn:signatureConfig>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

As the example above shows a signing task needs additional information. See [Setting up signing](signing) for details on how to configure a singing task and the effects.

### Feedback Task

A feedback task allows the service owner or others to give feedback to the entity reporting data.

It allows uploading data and moving the process forward.

Example of a feedback task

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v8">}}
```xml
<bpmn:task id="Task_2" name="Bekreftelse">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:taskType>feedback</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```
{{</content-version-container>}}
{{<content-version-container version-label="v7">}}
```xml
<bpmn:task id="Task_2" name="Bekreftelse" dataType="feedback">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```
{{</content-version-container>}}
{{</content-version-selector>}}
