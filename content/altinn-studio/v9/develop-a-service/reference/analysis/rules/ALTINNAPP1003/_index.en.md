---
draft: true
title: "ALTINNAPP1003: task uses the wrong BPMN element"
description: "A task in process.bpmn is a different BPMN element from the one its task type requires"
weight: 103
---

This diagnostic is reported when a task in `config/process/process.bpmn` is a different BPMN
element from the one its `<altinn:taskType>` requires. A service task must be a
`<bpmn:serviceTask>` element, and every other task a `<bpmn:task>` element. The message names
the task, the task type, the element the task is, and the element it should be.

The rule knows these task types:

- the built-in service tasks `pdf`, `subformPdf`, `eFormidling` and `fiksArkiv`
- the built-in user tasks `data`, `confirmation`, `feedback`, `signing` and `payment`
- the app's own `IServiceTask`, `IPipelineServiceTask` and `IProcessTask`, when `Type` returns
  a constant

The rule reports nothing about a task type it cannot settle at build time, such as one that
comes from a package. The app checks the same thing when it starts, and does not start if a task
uses the wrong element.

Category `Process`, severity **error**. The rule therefore fails the build.

Change the task to the element the message gives.

See [the task types and the elements they use](/nb/altinn-studio/v9/develop-a-service/process/reference/task-types/) (documentation available in
Norwegian only).
