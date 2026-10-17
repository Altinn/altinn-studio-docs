---
draft: true
title: "ALTINNAPP1012: exclusive gateway lists a flow with an empty condition"
description: "A sequence flow an exclusive gateway lists has an empty condition"
weight: 112
---

This diagnostic is reported when an exclusive gateway lists a sequence flow in `<bpmn:outgoing>`
whose `<bpmn:conditionExpression>` is empty or holds only whitespace. The message names the
gateway and the flow.

The app checks the conditions on every flow the gateway lists, and fails on an empty one. Leaving
the gateway therefore fails for every instance, whatever its data. The rule checks only the
gateways an instance can reach from a start event.

Category `Process`, severity **error**. The rule therefore fails the build.

Give the flow a condition, or remove the empty `<bpmn:conditionExpression>`:

```xml
<!-- Fails: the condition is empty -->
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression />
</bpmn:sequenceFlow>

<!-- Works -->
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

If the gateway's other flows have conditions, removing the element leaves the gateway with flows
both with and without a condition, which ALTINNAPP1010 reports.

See [how to control the flow out of a gateway with expressions](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
