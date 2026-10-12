---
draft: true
title: "ALTINNAPP1014: PDF service task has no data type for its PDFs"
description: "A pdf or subformPdf task has no ref-data-as-pdf data type to store its PDFs in"
weight: 114
---

This diagnostic is reported when `config/process/process.bpmn` has a `pdf` or `subformPdf`
service task, but `config/applicationmetadata.json` has no data type with the id
`ref-data-as-pdf`. Both task types store their PDFs in that data type. The message names the
task and its type.

The app does not create the data type itself, and does not check for it when it starts. The
task generates the PDF and then fails to store it. A `pdf` task fails every time it runs, and a
`subformPdf` task whenever an instance has a subform to print. The rule checks a `subformPdf`
task only when its `subformDataTypeId` names a data type the app has. ALTINNAPP1013 reports an
unknown one.

Category `Process`, severity **error**. The rule therefore fails the build.

Add the data type to `dataTypes` in `applicationmetadata.json`:

```json
{
  "id": "ref-data-as-pdf",
  "allowedContentTypes": ["application/pdf"]
}
```

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
