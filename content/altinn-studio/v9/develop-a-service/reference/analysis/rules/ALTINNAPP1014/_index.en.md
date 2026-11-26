---
draft: true
title: "ALTINNAPP1014: PDF service task has no data type to store its PDFs in"
description: "applicationmetadata.json lacks the data type ref-data-as-pdf, which pdf and subformPdf tasks store their PDFs in"
weight: 114
---

This diagnostic is reported when the process in `config/process/process.bpmn` has a `pdf` or
`subformPdf` task that an instance can reach, but no entry in `dataTypes` in
`applicationmetadata.json` has the id `ref-data-as-pdf`. The message names the task and the task
type.

The tasks store every PDF they generate in the data type `ref-data-as-pdf`. The app does not
create the data type itself and does not check it when it starts. Without the data type, the
task generates the PDF but fails to store it. A `pdf` task then fails every time it runs, and a
`subformPdf` task whenever an instance has a subform to make a PDF of.

Category `Process`, severity **error**. The rule therefore fails the build.

Add the data type to `dataTypes`:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "id": "ref-data-as-pdf",
  "allowedContentTypes": ["application/pdf"]
}
```

If the data type exists but cannot hold PDFs, the build reports
[ALTINNAPP1015]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1015" >}})
instead.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
