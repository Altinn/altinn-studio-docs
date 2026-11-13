---
draft: true
title: "ALTINNAPP1004: sequence flow leads to an element the app cannot move to"
description: "A sequence flow has no target, or leads to an element an instance cannot move to"
weight: 104
---

This diagnostic is reported when a sequence flow in `config/process/process.bpmn` leads
somewhere an instance cannot go. The message names the flow and what is wrong with it:

- the flow has no `targetRef`, or its `targetRef` names no element of the process
- the flow leads to an element the app does not run, such as a `<bpmn:parallelGateway>`, a
  `<bpmn:subProcess>` or an element without the BPMN namespace
- the flow leads to a start event

An instance can move only to the tasks, service tasks, exclusive gateways and end events of the
process. The app fails when an instance leaves an element along a flow of the first two kinds,
and an instance moved to a start event is left without a current task.

The rule checks only the flows the app follows out of the elements an instance can reach from a
start event. Out of a start event, task or service task, the app skips a flow of the first two
kinds as long as another flow out of the element leads on, so the rule reports those flows only
when none does. Out of an exclusive gateway, the rule reports every such flow the gateway lists
in `<bpmn:outgoing>`.

Category `Process`, severity **error**. The rule therefore fails the build.

Point the flow at a task, service task, exclusive gateway or end event, or remove it.
