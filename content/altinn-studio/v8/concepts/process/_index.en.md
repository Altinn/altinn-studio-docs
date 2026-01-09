---
title: Process
linktitle: Process
description: Altinn apps have a business process that is defined in the process.bpmn file.
tags: [prosess, oppgave, process, bpmn, tasks]
weight: 50
aliases:
- /en/altinn-studio/guides/process/
---


At least one task must be defined in this process, and newly created apps come with a "data" task by default.
This is a task where data is to be collected, either through forms in the app or via API calls.

More about the process in the [reference documentation](/en/altinn-studio/reference/process).

## Process task (task)
It is possible to create your own process tasks, but there are likely to be relatively large breaking changes to the interface in the next major version (9.0).
The process tasks that come as standard implement the `IProcessTask` interface, and in principle you can create your own implementations of this.
It is recommended that you contact us if this is considered relevant.

## Service task
{{% insert "content/altinn-studio/v8/guides/development/service-tasks/intro.en.md" %}}

[How to do it](/en/altinn-studio/v8/guides/development/service-tasks)
