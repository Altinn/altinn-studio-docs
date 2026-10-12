---
draft: true
title: "ALTINNAPP1005: exclusive gateway's outgoing list does not match its sequence flows"
description: "The sequence flows an exclusive gateway lists differ from the ones that start at it"
weight: 105
---

This diagnostic is reported when the sequence flows an exclusive gateway lists in
`<bpmn:outgoing>` differ from the sequence flows that have the gateway as `sourceRef`. The
message names the gateway and the flow, and says which of these it is:

- the gateway lists a flow that starts at another element, or has no `sourceRef`
- a flow starts at the gateway, but the gateway does not list it

The app leaves a gateway only along the flows it lists, whatever their `sourceRef`. In the first
case, an instance can leave the gateway along a flow that starts somewhere else in the diagram.
In the second case, the diagram shows the flow as one of the gateway's branches, but the app
never takes it. An id in `<bpmn:outgoing>` that names no sequence flow is not reported, since the
app ignores it. The rule checks only the gateways an instance can reach from a start event.

Category `Process`, severity **error**. The rule therefore fails the build.

List exactly the flows that start at the gateway, and no others:

```xml
<bpmn:exclusiveGateway id="Gateway_1">
  <bpmn:incoming>Flow_2</bpmn:incoming>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
  <bpmn:outgoing>Flow_4</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2" />
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```
