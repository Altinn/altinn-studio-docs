---
draft: true
title: "ALTINNAPP1008: element has no outgoing sequence flow"
description: "A start event, task, service task or exclusive gateway has no sequence flow out of it"
weight: 108
---

This diagnostic is reported when a start event, task, service task or exclusive gateway in
`config/process/process.bpmn` has no outgoing sequence flow. The message names the element.

An instance that reaches the element can never move on. For a start event, task or service task,
the app finds the outgoing flows by their `sourceRef`, not by `<bpmn:outgoing>`, so a flow with a
missing or wrong `sourceRef` does not count. An exclusive gateway has no outgoing flow when it
lists none in `<bpmn:outgoing>` and no flow has it as `sourceRef`. The rule checks only the
elements an instance can reach from a start event, so a task you have not connected yet is not
reported.

Category `Process`, severity **error**. The rule therefore fails the build.

Connect the element to the next element of the process.
