---
draft: true
title: "ALTINNAPP1023: exclusive gateway's default flow has a condition"
description: "The default sequence flow of an exclusive gateway has a condition, which the app never evaluates"
weight: 123
---

This diagnostic is reported when the sequence flow that an exclusive gateway names in its
`default` attribute has a `<bpmn:conditionExpression>`, even an empty one. The message names the
gateway and the flow.

The gateway takes its default only when none of the conditions on its other flows holds, and it
never evaluates the default's own condition. The condition therefore decides nothing, even when
it seems to work in a test, and the app does not start with it. The rule checks only the gateways
an instance can reach from a start event, but the app does not start with such a condition on any
gateway.

Category `Process`, severity **error**. The rule therefore fails the build.

Remove the condition from the default flow:

```xml
<bpmn:exclusiveGateway id="Gateway_1" default="Flow_4">
  <bpmn:incoming>Flow_2</bpmn:incoming>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
  <bpmn:outgoing>Flow_4</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>

<!-- Fails: the default has a condition -->
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>

<!-- Works -->
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```

If the condition is needed, remove `default` from the gateway instead, so that the app evaluates
the condition like those on the other flows. Then exactly one of the conditions must hold, or
leaving the gateway fails.

See [how to control the flow out of a gateway with expressions](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
