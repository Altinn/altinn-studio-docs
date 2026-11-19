---
draft: true
title: "ALTINNAPP1018: process references a data type that the app skips"
description: "A task with the sign action names a data type the app cannot find, and the app skips it instead of failing"
weight: 118
---

This diagnostic is reported when a task in `config/process/process.bpmn` names a data type the
app cannot find, but the app skips the id instead of failing. That applies in tasks that an
instance can reach and that have the `sign` action:

- An entry in `<altinn:uniqueFromSignaturesInDataTypes>` has an id that no data type has. The
  app skips it when it checks that the person signing has not signed already.
- An entry in `<altinn:dataTypesToSign>` has an id that no data type has, while other entries in
  the list exist. The `sign` action leaves that data type out of what the user signs.
- An entry in `<altinn:dataTypesToSign>` matches a data type only when upper and lower case are
  ignored. The `sign` action signs it, but the signing view requires the exact id and does not
  show its documents.

The message names the task, the entry, what the app skips and how to fix it.

Category `Process`, severity **warning**. It is a warning because nothing fails.

Correct the id so that it matches a data type exactly, or add the data type to
`applicationmetadata.json`.

If none of the data types in `<altinn:dataTypesToSign>` exists, the build reports
[ALTINNAPP1013]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1013" >}})
instead.

See the [signing task reference]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}).
