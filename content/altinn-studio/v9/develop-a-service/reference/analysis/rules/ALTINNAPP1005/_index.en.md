---
draft: true
title: "ALTINNAPP1005: exclusive gateway's outgoing list does not match its sequence flows"
description: "An exclusive gateway does not list a sequence flow that starts at it, or lists one that starts elsewhere"
weight: 105
---

This diagnostic is reported when `<bpmn:outgoing>` on an exclusive gateway in
`config/process/process.bpmn` does not match the sequence flows that start at the gateway. That
is the case when

- the gateway is the `sourceRef` of a sequence flow, but does not list it in `<bpmn:outgoing>`
- the gateway lists a sequence flow that starts elsewhere, or that has no `sourceRef`

The message names the gateway and the sequence flow.

The app leaves a gateway only through the sequence flows the gateway lists in `<bpmn:outgoing>`,
whatever the sequence flow's `sourceRef` says. The app never takes a sequence flow the gateway
does not list, even when the process diagram shows it as a way out of the gateway. The rule
checks only gateways an instance can reach.

Category `Process`, severity **error**. The rule therefore fails the build.

List exactly the sequence flows that start at the gateway in `<bpmn:outgoing>`:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:exclusiveGateway id="Gateway_1">
  <bpmn:incoming>Flow_1</bpmn:incoming>
  <bpmn:outgoing>Flow_2</bpmn:outgoing>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_2" sourceRef="Gateway_1" targetRef="Task_2" />
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
