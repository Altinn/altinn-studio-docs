---
draft: true
title: "ALTINNAPP1007: element has more than one outgoing sequence flow"
description: "A start event, task or service task has more than one sequence flow out of it"
weight: 107
---

This diagnostic is reported when a start event, task or service task in
`config/process/process.bpmn` has more than one outgoing sequence flow. The message names the
element and the flows.

Only an exclusive gateway can choose between flows. Out of any other element, the app follows
every flow that has the element as `sourceRef`, so it cannot tell which one to take, and fails
when an instance leaves the element. The rule does not count a flow without a target, or with a
target the app does not run, since the app skips it. It checks only the elements an instance can
reach from a start event.

Category `Process`, severity **error**. The rule therefore fails the build.

Route the flows through an exclusive gateway: connect the element to the gateway with a single
flow, and let the other flows start at the gateway.

See [how to control the flow out of a gateway](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
