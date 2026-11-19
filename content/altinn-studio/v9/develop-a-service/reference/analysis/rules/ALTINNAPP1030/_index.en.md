---
draft: true
title: "ALTINNAPP1030: exclusive gateway routes on gatewayAction right after a service task that returns no action"
description: "An exclusive gateway right after a pdf, subformPdf or eFormidling task has a condition that reads gatewayAction"
weight: 130
---

This diagnostic is reported when an exclusive gateway in `config/process/process.bpmn` comes
right after a service task of type `pdf`, `subformPdf` or `eFormidling`, and a condition on a
sequence flow the gateway lists in `<bpmn:outgoing>` reads `["gatewayAction"]`. The message
names the gateway, the sequence flows, the service task and the task type.

A gateway after a service task gets the action the service task returns, not the action the user
took in the task before. These three service tasks never return an action, so
`["gatewayAction"]` is always `null` there. Nor is it ever `reject`, because a service task that
fails can only be retried. The gateway therefore cannot choose its way by the action.

The rule checks only the gateway right after the service task, and only service tasks an
instance can reach. The condition on the default flow does not count, because the app never
evaluates it. `fiksArkiv` and the app's own service tasks may return an action, so the rule does
not report them.

Category `Process`, severity **error**. The rule therefore fails the build.

You fix it in one of two ways:

- Move the service task after the gateway, onto the branch that needs it.
- Remove the gateway if it only took the user back when the service task failed.

In the example below, the gateway reads the action from the confirmation task, and the PDF task
sits on the branch where the user has confirmed. The example shows only the sequence flows.
Remember to update `<bpmn:incoming>` and `<bpmn:outgoing>` on the elements too.

Incorrect:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:sequenceFlow id="Flow_1" sourceRef="Task_Confirm" targetRef="Task_Pdf" />
<bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Pdf" targetRef="Gateway_1" />
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["equals", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="Task_Data">
  <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

Correct:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:sequenceFlow id="Flow_1" sourceRef="Task_Confirm" targetRef="Gateway_1" />
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_Pdf">
  <bpmn:conditionExpression>["equals", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="Task_Data">
  <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Pdf" targetRef="EndEvent_1" />
```

See [how to route out of a gateway by the user's action](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/#slik-styrer-du-flyten-ut-av-en-gateway-med-brukerhandlingen)
(documentation available in Norwegian only).
