---
draft: true
title: "ALTINNAPP1017: data type belongs to a task that does not exist"
description: "The taskId of a data type in applicationmetadata.json names no task in process.bpmn"
weight: 117
---

This diagnostic is reported when a data type in `config/applicationmetadata.json` has a
`taskId` that is not the id of a task in `config/process/process.bpmn`. The message names the
data type and the `taskId`. If the id belongs to something other than a task, such as a
gateway, an event or a task inside a sub-process, which the app does not run, the message says
so.

Only a `<bpmn:task>` or `<bpmn:serviceTask>` element directly in the process counts, and the id
must match exactly. An empty `taskId` matches no task. The process never stops at the task, so
users can never change the data of the data type through the app, and its `minCount` and
validation never apply.

A stateless app can find its data model through a `taskId` that names the UI folder in
`onEntry.show`. The rule does not report such a data model.

The rule is only a warning, since keeping a data type for a task you have removed can be
deliberate: old instances still hold its data.

Category `Process`, severity **warning**.

Set `taskId` to the task the data belongs to, or remove it.
