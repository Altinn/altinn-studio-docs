---
title: Flowcontrol
description: Controlling process flow
tags: [altinn-apps, process, bpmn, gateway]
weight: 20
toc: true
---

## Exclusive Gateways

Exclusive gateways allow a different path in the process based on direct user input, data, or other aspects available from code.

## Gateways controlling flow with expressions

### Prerequisites

* Your application uses version 8.0.0 or newer of the Altinn nugets.
* Application with a process containing a exclusive gateway

### Controlling flow out of a gateway based on data provided by the user using expressions

It is possible to control what flow is chosen out of a gateway based on data that was provided by a user in a previous task using the same expression language used to hide/show elements in the UI.
To accomplish this we first need to define what formdata should be provided as context to the expression.

Example:
```xml {hl_lines=["6-10"]}
...
<bpmn:exclusiveGateway id="Gateway_1">
    <bpmn:incoming>Flow_t1_g1</bpmn:incoming>
    <bpmn:incoming>Flow_g1_t2</bpmn:incoming>
    <bpmn:outgoing>Flow_g1_end</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:gatewayExtension>
            <altinn:connectedDataTypeId>Schema</altinn:connectedDataTypeId>
        </altinn:gatewayExtension>
    </bpmn:extensionElements>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2" />
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent" />
...
```
In the example above the gateway is adding the formdata stored in the datatype _Schema_ as context to the expressions. Form data and dataTypes are defined in the _applicaitonmetadata.json_ file.

Once the gateway is connected to a datatype we can leverage the expressions language to define if flows leading out of the gateway are available.

NOTE: There need to be only one flow available after filtering out flows, unless there is a default flow and it is part of the possible flows out of the gateway

We now need to define these expressions in the outgoing flows from the gateway. In the example gateway we have two outgoing flows: _Flow_g1_t2_ and _Flow_g1_end_

We want to send the process to follow the _Flow_g1_t2_ if the field Amount in the formdata is greater than or equal to 1000 or _Flow_g1_end_ if it is below 1000

To achive this we need to add conditionExpressions to the outgoing flows

```xml {hl_lines=[2,5]}
<bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2">
    <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent">
    <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```
If the user has submitted a Amount of 1000 the expressions in sequenceFlow _Flow_g1_end_ evaluates to false and the flow is removed from the possible flows to choose and the only available flow is _Flow_g1_t2_ and therefor it is chosen.

To see more possibilities with expressions see [Expressions](../../../app/development/logic/expressions/)


### Controlling flow out of a gateway base on user action performed using expressions

In addition to using the expressions against the datamodel it is also possible in a process conditionExpression to make decisions based on the action taken by the user/system in the task before the gateway.

If an applications process has a confirmation step where it is possible to reject the data and send the instance back to the previous step (Task_1) if the end user performs the reject action

```xml
<bpmn:task id="Task_2" name="Person">
    <bpmn:incoming>Flow_t1_t2</bpmn:incoming>
    <bpmn:outgoing>Flow_t2_g1</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>confirmation</altinn:taskType>
            <altinn:actions>
                <altinn:action>confirm</altinn:action>
                <altinn:action>reject</altinn:action>
            </altinn:actions>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
<bpmn:exclusiveGateway id="Gateway_1">
    <bpmn:incoming>Flow_t2_g1</bpmn:incoming>
    <bpmn:incoming>Flow_g1_t1</bpmn:incoming>
    <bpmn:outgoing>Flow_g1_end</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_g1_t1" sourceRef="Gateway_1" targetRef="Task_1" />
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent" />
```

In the example above there is defined two actions in _Task_2_ confirm and reject. [Read more about actions](../tasks/)

What we want to accomplish is to make the process engine choose _Flow_g1_t1_ if the user performs action _reject_ and _Flow_g1_end_ if action performed was _confirm…

To do this we use the expression function _gatewayAction_

```xml {hl_lines=[2,5]}
<bpmn:sequenceFlow id="Flow_g1_t1" sourceRef="Gateway_1" targetRef="Task_1">
    <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent">
    <bpmn:conditionExpression>["lessThan", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

The expressions function _gatewayAction_ returns the action performed in the task the process just left. In the example above the previous task is _Task_2_.

The _gatewayAction_ function can be combine with all the other functions in [expressions](../../../app/development/logic/expressions/)

## Complex gateways requiring custom code

If the requirements for your gateway cannot be done through expressions you have the option to write a custom code making the flow decisions for you

### Prerequisites

* Your application uses version 7.1.0 or newer of the Altinn nugets.
* Application with a process containing an exclusive gateway.

### Example process with exclusive gateways

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}
```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:altinn="http://altinn.no" id="Altinn_SingleDataTask_Process_Definition" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="10.2.0">
  <bpmn:process id="SingleDataTask" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_s_t1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_s_t1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:task id="Task_1" name="Utfylling" altinn:tasktype="data">
      <bpmn:incoming>Flow_s_t1</bpmn:incoming>
      <bpmn:outgoing>Flow_t1_g1</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_t1_g1" sourceRef="Task_1" targetRef="Gateway_1" />
    <bpmn:exclusiveGateway id="Gateway_1">
      <bpmn:incoming>Flow_t1_g1</bpmn:incoming>
      <bpmn:outgoing>Flow_g1_g2</bpmn:outgoing>
      <bpmn:outgoing>Flow_g1_t2</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_g1_g2" sourceRef="Gateway_1" targetRef="Gateway_2" />
    <bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2" />
    <bpmn:task id="Task_2" name="Bekreftelse" altinn:tasktype="confirmation">
      <bpmn:incoming>Flow_g1_t2</bpmn:incoming>
      <bpmn:outgoing>Flow_t2_g2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_t2_g2" sourceRef="Task_2" targetRef="Gateway_2" />
    <bpmn:exclusiveGateway id="Gateway_2">
      <bpmn:incoming>Flow_g1_g2</bpmn:incoming>
      <bpmn:incoming>Flow_t2_g2</bpmn:incoming>
      <bpmn:outgoing>Flow_g2_end</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_g2_end" sourceRef="Gateway_2" targetRef="EndEvent_1" />
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_g2_end</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
  <!-- BPMN Diagram part is omitted for previty -->
</bpmn:definitions>
```
{{</content-version-container>}}

{{<content-version-container version-label="v8">}}
```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:altinn="http://altinn.no" id="Altinn_SingleDataTask_Process_Definition" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="10.2.0">
  <bpmn:process id="SingleDataTask" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_s_t1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_s_t1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>Flow_s_t1</bpmn:incoming>
      <bpmn:outgoing>Flow_t1_g1</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>data</altinn:taskType>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_t1_g1" sourceRef="Task_1" targetRef="Gateway_1" />
    <bpmn:exclusiveGateway id="Gateway_1">
      <bpmn:incoming>Flow_t1_g1</bpmn:incoming>
      <bpmn:outgoing>Flow_g1_g2</bpmn:outgoing>
      <bpmn:outgoing>Flow_g1_t2</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_g1_g2" sourceRef="Gateway_1" targetRef="Gateway_2" />
    <bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2" />
    <bpmn:task id="Task_2" name="Bekreftelse">
      <bpmn:incoming>Flow_g1_t2</bpmn:incoming>
      <bpmn:outgoing>Flow_t2_g2</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>confirmation</altinn:taskType>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_t2_g2" sourceRef="Task_2" targetRef="Gateway_2" />
    <bpmn:exclusiveGateway id="Gateway_2">
      <bpmn:incoming>Flow_g1_g2</bpmn:incoming>
      <bpmn:incoming>Flow_t2_g2</bpmn:incoming>
      <bpmn:outgoing>Flow_g2_end</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_g2_end" sourceRef="Gateway_2" targetRef="EndEvent_1" />
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_g2_end</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
  <!-- BPMN Diagram part is omitted for previty -->
</bpmn:definitions>
```

{{</content-version-container>}}
{{</content-version-selector>}}

Visual representation of the bpmn definition

![BPMN definition diagram](process-definition.svg "BPMN definition diagram")

### Implementing and injecting custom gateway code

To choose correct sequenceflow out of the exclusive gateway based on instance data the application needs create a class implementing `Altinn.App.Core.Features.IProcessExclusiveGateway` and register it as a service in the dependency injection.

The interface has one string Property `GatewayId`, and a method `FilterAsync`

`GatewayId` is used to identify the Gateway in the process definition it is connected to.

In our example definition a implementation for the first gateway (Gateway_1) would have this property set to `Gateway_1` as this is the value of the attribute `id` for the exclusive gateway in the process definition.

The method FilterAsync is where you implement your custom logic to filter the available sequenceflow(s) out of the gateway based on the instance data.

For further documentation of the interface read the xml documentation for the interface [here](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessExclusiveGateway.cs)

After you have written your custom implementation register it in `Program.cs` in the `RegisterCustomAppServices` method.

Example: 

```csharp
void RegisterCustomAppServices(
    IServiceCollection services, 
    IConfiguration config, 
    IWebHostEnvironment env)
{
    services.AddTransient<IProcessExclusiveGateway, GatewayOne>();
}
```