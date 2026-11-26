---
draft: true
title: "ALTINNAPP1010: exclusive gateway mixes sequence flows with and without a condition"
description: "An exclusive gateway has a condition on some sequence flows, but not on all the others besides its default"
weight: 110
---

This diagnostic is reported when an exclusive gateway in `config/process/process.bpmn` has a
`<bpmn:conditionExpression>` on some of the sequence flows it lists besides the default flow,
but not on all of them. The message names the gateway and the sequence flows without a
condition.

As soon as one sequence flow has a condition, the app evaluates the conditions on every sequence
flow the gateway lists, except the default flow. The app treats a sequence flow without a
condition as true, and fails when more than one sequence flow is true. With one sequence flow
without a condition, the gateway fails whenever another condition is true. With two or more, it
always fails. The app takes the default flow only when no other condition is true, so it is the
only one that can do without a condition.

The app checks the same thing when it starts, and does not start with such a gateway. The rule
therefore checks every gateway, including those no instance can reach.

Category `Process`, severity **error**. The rule therefore fails the build.

Give every sequence flow besides the default flow a condition. If the gateway has no default
flow and only one sequence flow lacks a condition, you can make that one the default flow with
`default` on the gateway instead:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:exclusiveGateway id="Gateway_1" default="Flow_3">
  <bpmn:incoming>Flow_1</bpmn:incoming>
  <bpmn:outgoing>Flow_2</bpmn:outgoing>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_2" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["equals", ["dataModel", "approved"], true]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
