---
draft: true
title: "ALTINNAPP1010: exclusive gateway mixes flows with and without a condition"
description: "Some of the sequence flows an exclusive gateway lists have a condition, and others besides its default do not"
weight: 110
---

This diagnostic is reported when some of the sequence flows an exclusive gateway lists in
`<bpmn:outgoing>` have a `<bpmn:conditionExpression>`, and others do not. The flow the gateway
names in its `default` attribute needs no condition, so the rule leaves it out. The message names
the gateway and the other flows without a condition.

When one of the flows has a condition, the app checks the conditions on all of them except the
default, and takes the default only when none of them holds. It treats a flow without a condition
as always true, and fails when more than one flow is true. With one such flow, leaving the
gateway fails whenever one of the conditions holds, and any default the gateway has is never
taken. With two or more, those flows are always true together, and leaving the gateway always
fails. The app does not start if any gateway in the process mixes flows like this, so the rule
checks every gateway in the process, including gateways no instance can reach, such as one you
have not connected yet.

Category `Process`, severity **error**. The rule therefore fails the build.

Give each of those flows a condition. If the gateway has a default, it takes the default when
none of the conditions holds. Otherwise exactly one of them must hold:

```xml
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

If only one flow has no condition and the gateway has no default, you can make that flow the
default instead:

```xml
<bpmn:exclusiveGateway id="Gateway_1" default="Flow_4">
  <bpmn:incoming>Flow_2</bpmn:incoming>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
  <bpmn:outgoing>Flow_4</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```

See [how to control the flow out of a gateway with expressions](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
