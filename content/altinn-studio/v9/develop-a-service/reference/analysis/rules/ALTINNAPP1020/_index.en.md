---
draft: true
title: "ALTINNAPP1020: task configuration is missing a required setting or has an invalid value"
description: "A task in process.bpmn lacks a setting its built-in task type needs, or has a value the app cannot read"
weight: 120
---

This diagnostic is reported when a task in `config/process/process.bpmn` lacks a setting its
built-in task type needs, or has a value the app cannot read. The message names the task, what
is missing or invalid, what happens and how to fix it.

The rule checks the following:

- A `signing` task must have a value in `signatureDataType`. `signeeProviderId` and
  `signeeStatesDataTypeId` must either both be there with values or both be absent. With
  `signeeProviderId`, the task also needs `correspondenceResource` for Staging and Production.
  If an instance can reach the task and it has the `sign` action, `dataTypesToSign` must name at
  least one data type.
- A `payment` task must have values in `paymentDataType` and `paymentReceiptPdfDataType`.
- A `subformPdf` task must have `<altinn:subformPdfConfig>` with a value in `subformUiFolder`.
- An `eFormidling` task must have `<altinn:eFormidlingConfig>`, and `process`, `standard`,
  `typeVersion`, `type` and `securityLevel` must have a value in every environment, including
  where eFormidling is disabled. `securityLevel` must be a whole number, and `disabled` must be
  `true` or `false`.
- In every task, `runDefaultValidator` in `<altinn:signatureConfig>` must be a boolean, such as
  `true` or `false`, and `type` on an `<altinn:action>` must be `processAction` or
  `serverAction`.

Without these settings the app does not start, or it fails every time the task runs or the user
signs. The app checks a setting that differs by environment only for the environment it runs in.
Without the rule, a missing value for Production therefore shows only when the app runs in
production. The rule checks each environment separately: Development, Staging and Production.

Category `Process`, severity **error**. The rule therefore fails the build.

Add or correct the setting as the message says.

See [the task types and their settings](/nb/altinn-studio/v9/develop-a-service/process/reference/task-types/)
(documentation available in Norwegian only).
