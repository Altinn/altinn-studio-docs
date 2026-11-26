---
draft: true
title: "ALTINNAPP1017: data type belongs to a task that does not exist"
description: "taskIds on a data type in applicationmetadata.json lists a task that does not exist in process.bpmn"
weight: 117
---

This diagnostic is reported when `taskIds` on a data type in `applicationmetadata.json` has an
entry that is not the id of a task or service task in `config/process/process.bpmn`. That
includes an empty entry, `null`, and a task inside a sub-process, which the app does not run.
The message names the data type, the entry and why it names no task. A data model (a data type
with `classRef`) in a stateless app may name the UI folder the app shows in `taskIds`, and the
rule does not report that.

The process never stops at such a task. If `taskIds` also lists a task that exists, the entry
has no effect. Otherwise users cannot change the data type's data through the app, and its
`minCount` and validation never apply.

Category `Process`, severity **warning**. It is a warning because keeping a data type for a task
you have removed can be right: old instances still hold data in it.

Correct the entry, or remove it from `taskIds`.
