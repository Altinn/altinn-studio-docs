---
draft: true
title: "ALTINNAPP1013: process references an unknown data type"
description: "A task in process.bpmn names a data type that does not exist in applicationmetadata.json"
weight: 113
---

This diagnostic is reported when a task in `config/process/process.bpmn` names a data type that
no entry in `dataTypes` in `applicationmetadata.json` has as its id, and the app fails where it
uses the id. That applies to these settings in `<altinn:taskExtension>`:

- `signatureDataType`, `signeeStatesDataTypeId` and `signingPdfDataType` in
  `<altinn:signatureConfig>`
- the entries in `<altinn:dataTypesToSign>`, when none of them exists and the task has the
  `sign` action
- `paymentDataType` and `paymentReceiptPdfDataType` in `<altinn:paymentConfig>`
- the entries in `<altinn:dataTypes>` in `<altinn:eFormidlingConfig>`, for every environment

The message names the task, the data type and the setting. The app finds the data type by its
exact id, so upper and lower case must match. Only the `sign` action ignores case.

The app checks few of these ids when it starts. Without the rule, the error often shows only
when an instance reaches the task, perhaps after the user has signed or paid. The rule checks
only tasks an instance can reach, but it checks the eFormidling ids in every `eFormidling` task,
as the app does when it starts.

Category `Process`, severity **error**. The rule therefore fails the build.

Correct the id so that it matches a data type exactly, or add the data type to
`applicationmetadata.json`.

The build reports an unknown id that the app merely skips as the warning
[ALTINNAPP1018]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1018" >}}).

See the [signing task reference]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}).
