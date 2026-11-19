---
draft: true
title: "ALTINNAPP1004: sequence flow leads to an element the app cannot move to"
description: "A sequence flow in process.bpmn has no target, or leads to an element the app does not run"
weight: 104
---

This diagnostic is reported when a sequence flow that the app follows in
`config/process/process.bpmn` does not lead to an element the app can move an instance to. That
is the case when the sequence flow

- has no `targetRef`
- has a `targetRef` that no element of the process has as its id
- leads to an element the app does not run, such as a parallel gateway, a sub-process or an
  element without the BPMN namespace
- leads to a start event

The message names the sequence flow and what is wrong.

An instance can move only to the tasks, service tasks, exclusive gateways and end events of the
process. The app reads only the elements directly under `<bpmn:process>`. Without the rule, the
app fails only when an instance tries to leave the element the sequence flow starts at.

The rule checks only the sequence flows the app actually follows, from elements an instance can
reach from a start event. From an exclusive gateway, the app follows the sequence flows the
gateway lists in `<bpmn:outgoing>`. If another sequence flow from the same task or start event
leads to an element the app can move to, the app skips a sequence flow without a valid target,
and the rule does not report it. The rule always reports a sequence flow to a start event.

Category `Process`, severity **error**. The rule therefore fails the build.

Point the sequence flow at a task, a service task, an exclusive gateway or an end event, or
remove it.

See the [guide to flow control](/nb/altinn-studio/v9/develop-a-service/reference/process/flowcontrol/)
(documentation available in Norwegian only).
