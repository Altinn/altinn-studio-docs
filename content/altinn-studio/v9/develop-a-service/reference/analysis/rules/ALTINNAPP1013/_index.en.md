---
draft: true
title: "ALTINNAPP1013: process names an unknown data type"
description: "A task in process.bpmn names a data type that applicationmetadata.json does not declare, in a setting the app fails on"
weight: 113
---

This diagnostic is reported when a task in `config/process/process.bpmn` names a data type that
is not among the `dataTypes` in `config/applicationmetadata.json`, in a setting where the app
fails on an unknown id. The message names the task, the data type and the element that names
it. If the element is empty, the message says so.

The rule checks these settings:

- `signatureDataType`, `signeeStatesDataTypeId` and `signingPdfDataType` in
  `<altinn:signatureConfig>`
- `dataTypesToSign` in `<altinn:signatureConfig>`, when none of the data types it lists exists
- `paymentDataType` and `paymentReceiptPdfDataType` in `<altinn:paymentConfig>`
- every `dataTypes` list in `<altinn:eFormidlingConfig>`, whatever its `env`
- `subformDataTypeId` in `<altinn:subformPdfConfig>` on a `subformPdf` task

It checks the signing, payment and eFormidling settings on every task, whatever its type, since
the app's own task types can read them too.

The app finds a data type by its exact id, so the case must match as well. Only the sign
action ignores case when it reads `dataTypesToSign`. Depending on the setting, the app does not
start, the sign or payment action fails, or the task fails when an instance reaches it, often
after the user has signed or paid.

The rule checks only tasks an instance can reach from a start event, except `dataTypes` in
`<altinn:eFormidlingConfig>` on an `eFormidling` task and `subformDataTypeId` on a `subformPdf`
task, which the app checks when it starts. It checks `dataTypesToSign` only when the task lists
the `sign` action in `<altinn:actions>`.

Category `Process`, severity **error**. The rule therefore fails the build.

Correct the id, or add the data type to `applicationmetadata.json`. Settings where the app
skips an unknown id instead of failing are reported by ALTINNAPP1018.

See how to set up
[signing]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}),
[payment]({{< relref "/altinn-studio/v9/develop-a-service/process/payment" >}}) and
[eFormidling]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}).
