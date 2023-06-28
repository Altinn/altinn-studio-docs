---
title: Process task
description: Defining process tasks
tags: [altinn-apps, process, bpmn, task]
weight: 2
---

## Task types

### Data Task

A data task is where the user/system accessing the digital service through UI or API can read, write and modify data related to a digital service.

A data task requires that all data for a given process task is valid and that the user/system has added all the necessary data.

The data validation is part of the standard logic in the template. Application developers can add custom validation for each data element and task.

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

### Confirmation Task

A confirmation task is where the end user accessing the application through the browser or system through API can confirm data that is part of the process.

When a user confirms a confirmation task a confirm instance event log is created detaling that user/system X has confirmed.

Example of a confirmation task

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

### Signing Task

A signing task is where the end user accessing the application through the browser or system through API can sign data that is part of the process.

When a user performs a sign action a signature object containing the user information and a hash of the data elements defined in the process task will be generated along a instance event log detaling that user/system X has signed

Example of a signing task
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

As the example abov shows a signing task needs additinal information. See [Setting up signing]() for details on how to configure a singing task and the effects.

### Feedback Task

A feedback task allows the service owner or others to give feedback to the entity reporting data.

It allows uploading data and moving the process forward.

Example of a feedback task
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

## Actions in tasks
In version 8 of the app nugets actions in tasks were introduced. This makes it possible for developers to assosiate ActionButtons in the UI with UserActions in the backend.
It is possible to authorize each action in a task separatly in the policy file.

### Actions with special altinn logic connected to them

#### write
Default action that is performed when a data or feedback task is submitted

#### confirm
Default action that is performed when a confirmation task i submitted

#### sign
Action that generates a signature object based on the configuration of the task see [Signature]()

#### reject
Action to use when moving back from one task to another. Performing aciton reject will ensure data elements in the target task is unlocked.

### Custom actions and custom logic when action is performed

#### Custom action in task
To add actions to a task you have to modify the `App/config/process/process.bpmn` file and add the wanted action to the task.

Example of a process where Task_1 has the actions _demo_ and _custom_ defined:

```xml {hl_lines=["15-27"]}
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="Definitions_1eqx4ru" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
targetNamespace="http://bpmn.io/schema/bpmn" 
xmlns:altinn="http://altinn.no/process">
  <bpmn:process id="Process_1rq9ej8" isExecutable="false">
    <bpmn:startEvent id="StartEvent">
      <bpmn:outgoing>Flow1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow1" sourceRef="StartEvent" targetRef="Task1" />
    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>Flow1</bpmn:incoming>
      <bpmn:outgoing>Flow2</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
          <altinn:actions>
            <altinn:action>demo</altinn:action>
            <altinn:action>custom</altinn:action>
          </altinn:actions>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow2" sourceRef="Task1" targetRef="EndEvent" />
    <bpmn:endEvent id="EndEvent">
      <bpmn:incoming>Flow2</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
</bpmn:definitions>
```

Once these actions have been [granted to users in policy.xml]() it is possible to add a [ActionButtons in the UI connected to the acitons]() <!--//TODO: Add a link to docs for defining XACML and ActionButton-->

