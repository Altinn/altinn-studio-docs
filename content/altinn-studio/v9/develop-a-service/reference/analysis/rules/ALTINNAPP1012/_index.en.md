---
draft: true
title: "ALTINNAPP1012: exclusive gateway lists a sequence flow with an empty condition"
description: "A sequence flow out of an exclusive gateway in process.bpmn has an empty condition"
weight: 112
---

This diagnostic is reported when an exclusive gateway in `config/process/process.bpmn` lists a
sequence flow with an empty `<bpmn:conditionExpression>`, or one that holds only whitespace. The
message names the gateway and the sequence flow.

The app evaluates the condition on every sequence flow the gateway lists, except the default
flow, and cannot read an empty condition. The gateway therefore fails every time an instance
leaves it, whatever data the instance has. The rule checks only gateways an instance can reach.

The build reports an empty condition on the default flow as
[ALTINNAPP1023]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1023" >}}).

Category `Process`, severity **error**. The rule therefore fails the build.

Give the sequence flow a condition, or remove the empty `<bpmn:conditionExpression>`.

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
