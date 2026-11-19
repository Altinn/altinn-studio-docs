---
draft: true
title: "ALTINNAPP1007: element has more than one outgoing sequence flow"
description: "A start event, task or service task in process.bpmn has several outgoing sequence flows"
weight: 107
---

This diagnostic is reported when a start event, a task or a service task in
`config/process/process.bpmn` is the `sourceRef` of more than one sequence flow that leads to a
start event, a task, a service task, an exclusive gateway or an end event. The message names the
element and the sequence flows.

The app cannot choose between several sequence flows out of such an element, and fails when an
instance leaves it. Only an exclusive gateway can choose a way. The rule checks only elements an
instance can reach.

Category `Process`, severity **error**. The rule therefore fails the build.

Give the element one outgoing sequence flow to an exclusive gateway, and let the gateway choose
between the ways on.

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
