---
draft: true
title: "ALTINNAPP1018: process names a data type the app skips"
description: "A task in process.bpmn names a data type that the app skips instead of failing"
weight: 118
---

This diagnostic is reported when a task in `config/process/process.bpmn` names a data type in a
setting where the app skips an id it cannot use, instead of failing. Nothing fails, but the
setting does not do what it says. The message names the task, the data type and the element
that names it, and says what the app skips.

The rule reports:

- an entry in `uniqueFromSignaturesInDataTypes` that names no data type. The app skips it when
  it checks that a signee has not signed already.
- an entry in `dataTypesToSign` that names no data type, while other entries do. The sign
  action leaves it out of what the user signs.
- an entry in `dataTypesToSign` that differs from the id of a data type only in case. The sign
  action ignores case and signs the data, but the signing view matches ids exactly and does not
  show the documents.
- `subformDataTypeId` in `<altinn:subformPdfConfig>` on a task that is not a `subformPdf` task,
  when it names no data type. The task generates no PDFs for it and still succeeds.

An empty entry counts as one that names no data type. When no entry in `dataTypesToSign` names
a data type, ALTINNAPP1013 reports it instead.

Category `Process`, severity **warning**.

Correct the id so it matches the data type exactly, or add the data type.

See [how to set up a signing task]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}).
