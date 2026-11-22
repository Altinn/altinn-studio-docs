---
draft: true
title: "ALTINNAPP1024: subformPdf task names a UI folder it cannot render"
description: "subformUiFolder is not a subform's UI folder with a defaultDataType the app declares"
weight: 124
---

This diagnostic is reported when `<altinn:subformPdfConfig><altinn:subformUiFolder>` on a
`subformPdf` task in `config/process/process.bpmn` names a folder the app cannot generate PDFs
from. That is the case when

- the folder is the UI folder of a task in the process, not of a subform
- the app has no UI folder `ui/<folder>` with a `Settings.json`
- the folder's `Settings.json` has no `defaultDataType`
- `defaultDataType` is not a data type in `applicationmetadata.json`

The message names the task, the folder and what is wrong.

The task generates one PDF for each entry of the data type that `defaultDataType` names, from the
folder's pages. A
task's UI folder shows the task's own form, not the entries of a subform. The app checks the
same thing when it starts, and does not start with such a task.

Category `Process`, severity **error**. The rule therefore fails the build.

Name the subform's UI folder in `subformUiFolder`, and set `defaultDataType` in the folder's
`Settings.json` to the data type the subform stores its entries in.

See the [guide to PDF generation for subforms](/nb/altinn-studio/v9/develop-a-service/look-and-feel/subform/subform-pdf/) (documentation available in
Norwegian only).
