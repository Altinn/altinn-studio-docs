---
draft: true
title: "ALTINNAPP1015: data type cannot hold what the task stores in it"
description: "A built-in task in process.bpmn stores data in a data type that rejects it"
weight: 115
---

This diagnostic is reported when a built-in task in `config/process/process.bpmn` stores data
in a data type that rejects it. The message names the task, what it stores, the data type, what
is wrong and how to fix it.

The rule checks what these tasks store:

- the PDFs of a `pdf` or `subformPdf` task, in `ref-data-as-pdf`
- the signatures (`signatureDataType`), the signing PDF (`signingPdfDataType`) and, when the
  task has a `signeeProviderId`, the signee states (`signeeStatesDataTypeId`) of a `signing`
  task
- the payment receipt (`paymentReceiptPdfDataType`) of a `payment` task

A data type rejects a file when it has an `appLogic.classRef`, which makes it a form data
model, or when its `allowedContentTypes` is not empty and does not list the file's content type
exactly: `application/pdf` for the PDFs, and `application/json` for the signee states. Altinn
Storage also accepts a signature only in a data type whose `taskId` is empty or is the signing
task. Storing then fails every time the task stores that data, and for signatures this means
that no one can sign in the task.

Category `Process`, severity **error**. The rule therefore fails the build.

Do what the message says: remove the `appLogic.classRef` or use another data type, add the
content type to `allowedContentTypes`, or set the `taskId` of the signature data type to the
signing task or remove it.
