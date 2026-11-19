---
draft: true
title: "ALTINNAPP1023: exclusive gateway's default flow has a condition"
description: "The sequence flow that default on an exclusive gateway names has a condition"
weight: 123
---

This diagnostic is reported when the sequence flow that `default` on an exclusive gateway in
`config/process/process.bpmn` names has a `<bpmn:conditionExpression>`, even an empty one. That
applies to a default flow the gateway lists in `<bpmn:outgoing>`. The message names the gateway
and the sequence flow.

The gateway takes its default flow only when none of the other conditions is true, and never
evaluates the condition on the default flow itself. Such a condition may seem to work in a test,
but decides nothing. The app checks the same thing when it starts, and does not start with such
a gateway. The rule therefore checks every gateway, including those no instance can reach.

Category `Process`, severity **error**. The rule therefore fails the build.

Remove the `<bpmn:conditionExpression>` from the default flow, or remove `default` from the
gateway so that the app evaluates the condition.

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
