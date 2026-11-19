---
draft: true
title: "ALTINNAPP1009: duplicate element id in the process"
description: "Two or more elements or sequence flows in process.bpmn have the same id"
weight: 109
---

This diagnostic is reported when several elements in `config/process/process.bpmn` have the same
`id`. The rule counts start events, tasks, service tasks, exclusive gateways, end events and
sequence flows together. The message names the id and how many elements use it, and points at
the second element with the id.

BPMN requires every id to be unique within the file. The app can send an instance the wrong way
when two elements share an id. The **Prosess** tab in Altinn Studio Designer also drops elements
with an id it has already read, so they disappear the next time you save the process from there.
The rule checks the whole process, including elements no instance can reach.

Category `Process`, severity **error**. The rule therefore fails the build.

Give each element its own id, and update the sequence flows and the `<bpmn:incoming>` and
`<bpmn:outgoing>` lists that refer to it.
