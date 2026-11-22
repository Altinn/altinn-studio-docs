---
draft: true
title: "ALTINNAPP1015: data type cannot hold what the task stores in it"
description: "A data type that a task stores PDFs, signatures or other data in does not accept what the task stores"
weight: 115
---

This diagnostic is reported when a task in `config/process/process.bpmn` stores something in a
data type that does not accept it. The message names the task, the data type, what is wrong and
how to fix it.

The rule checks these data types, which the tasks store data in:

- `ref-data-as-pdf`, which `pdf` and `subformPdf` tasks store their PDFs in
- `signingPdfDataType` in a signing task, which must accept `application/pdf`
- `signeeStatesDataTypeId` in a signing task with `signeeProviderId`, which must accept
  `application/json`
- `paymentReceiptPdfDataType` in a payment task, which must accept `application/pdf`

Such a data type does not accept what the task stores when

- it has `appLogic.classRef`, which makes it a form's data model rather than a file
- `allowedContentTypes` has values, but not the content type the task stores

In a signing task that has the `sign` action, the rule also reports when `taskIds` on the data
type in `signatureDataType` has values, but not the signing task. Storage accepts a signature
only in a data type that belongs to no task, or to the signing task, so otherwise every
signature in the task fails.

The rule checks only tasks an instance can reach.

Category `Process`, severity **error**. The rule therefore fails the build.

Correct the data type as the message says: remove `appLogic.classRef` or use a data type without
one, add the content type to `allowedContentTypes`, or add the signing task to `taskIds`.

See the [signing task reference]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}).
