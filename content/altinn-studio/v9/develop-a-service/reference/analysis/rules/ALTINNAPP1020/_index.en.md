---
draft: true
title: "ALTINNAPP1020: task is missing a required setting or has an invalid value"
description: "A built-in task type lacks a setting it needs, or process.bpmn has a value the app cannot read"
weight: 120
---

This diagnostic is reported when a task in `config/process/process.bpmn` lacks a setting its
task type needs, or has a value the app cannot read. An empty element counts as missing. The
message names the task, the setting and what is wrong with it, what happens, and how to fix it.
For a setting that can differ by environment, it also names the environments where it fails.

The rule checks these settings for the built-in task types:

- `signing`: `<altinn:signatureDataType>`; at least one data type in
  `<altinn:dataTypesToSign>`; `<altinn:signeeProviderId>` and `<altinn:signeeStatesDataTypeId>`,
  both or neither; and, when `<altinn:signeeProviderId>` is set, an
  `<altinn:correspondenceResource>` for Staging and Production
- `payment`: `<altinn:paymentDataType>` and `<altinn:paymentReceiptPdfDataType>`
- `subformPdf`: `<altinn:subformPdfConfig>`, with `<altinn:subformComponentId>` and
  `<altinn:subformDataTypeId>`
- `eFormidling`: `<altinn:eFormidlingConfig>`, with `<altinn:process>`, `<altinn:standard>`,
  `<altinn:typeVersion>`, `<altinn:type>` and `<altinn:securityLevel>` (a whole number) for each
  of Development, Staging and Production, also where eFormidling is disabled, and `true` or
  `false` in `<altinn:disabled>`, if present

In every task, whatever its type, the rule also reports two values that stop the app from
reading the process:

- an `<altinn:runDefaultValidator>` in `<altinn:signatureConfig>` that the app cannot read as
  true or false, such as `True` or `yes`
- a `type` attribute on an `<altinn:action>` with a value other than `processAction` or
  `serverAction`

The app checks most of these settings when it starts, and does not start without them. It checks
a setting that differs by environment only for the environment it starts in, so a value missing
for Production otherwise shows up first when the app is deployed there. Some signing settings the
app does not fully check at startup, so an empty or missing one fails later, when the task starts
or someone signs.

Category `Process`, severity **error**. The rule therefore fails the build.

Add or fill in the setting the message names, for every environment it lists. A setting that
differs by environment needs one entry without `env`, or one for each environment. Where a value
has the wrong format, use the format the message gives.

See [the task types and their settings](/nb/altinn-studio/v9/develop-a-service/process/reference/task-types/) (documentation available in
Norwegian only).
