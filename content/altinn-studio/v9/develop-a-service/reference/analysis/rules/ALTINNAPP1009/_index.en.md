---
draft: true
title: "ALTINNAPP1009: duplicate element id in the process"
description: "More than one element in process.bpmn uses the same id"
weight: 109
---

This diagnostic is reported when more than one element in `config/process/process.bpmn` uses the
same `id`. The rule counts the start events, tasks, service tasks, exclusive gateways, end events
and sequence flows together, so a task and a sequence flow cannot share an id either. The message
names the id and how many elements use it, and the rule reports it once, on the second element.
The rule checks the whole process, including elements no instance can reach.

BPMN requires ids to be unique. When Altinn Studio opens the file, it drops every element that
repeats an id used earlier in the file, so those elements are gone the next time you save the
process in Altinn Studio. The app can also send an instance to the wrong element, or find more
than one next element and fail.

Category `Process`, severity **error**. The rule therefore fails the build.

Give each element its own id, and update the references to the id you change.
