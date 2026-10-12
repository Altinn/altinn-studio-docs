---
draft: true
title: "ALTINNAPP1010: exclusive gateway mixes flows with and without a condition"
description: "Some of the sequence flows an exclusive gateway lists have a condition, and others do not"
weight: 110
---

This diagnostic is reported when some of the sequence flows an exclusive gateway lists in
`<bpmn:outgoing>` have a `<bpmn:conditionExpression>`, and others do not. The message names the
gateway and the flows without a condition.

When one of the flows has a condition, the app checks the conditions on all of them, treats a
flow without a condition as always true, and fails unless exactly one flow is true. With one flow
without a condition, leaving the gateway fails whenever one of the conditions holds. With two or
more, those flows are always true together, and leaving the gateway always fails. Making the flow
without a condition the gateway's `default` does not help. The rule checks only the gateways an
instance can reach from a start event.

Category `Process`, severity **error**. The rule therefore fails the build.

Give every flow the gateway lists a condition, so that exactly one of them holds:

```xml
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

See [how to control the flow out of a gateway with expressions](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
