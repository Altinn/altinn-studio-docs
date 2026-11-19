---
draft: true
title: "ALTINNAPP1006: exclusive gateway's default is not one of the flows it lists"
description: "default on an exclusive gateway names a sequence flow the gateway does not list in outgoing"
weight: 106
---

This diagnostic is reported when `default` on an exclusive gateway in
`config/process/process.bpmn` names a sequence flow the gateway does not list in
`<bpmn:outgoing>`. The message names the gateway and the value of `default`.

The app looks for the default flow only among the sequence flows the gateway lists, and ignores
`default` when it does not find it there. That fails only when the other sequence flows do not
narrow the choice down to one. The rule checks only gateways an instance can reach.

Category `Process`, severity **warning**.

Set `default` to one of the sequence flows in `<bpmn:outgoing>`, or remove `default`. If the
default flow starts at the gateway but is missing from the list, the build also reports
[ALTINNAPP1005]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1005" >}}).
Then add it to `<bpmn:outgoing>`.

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
