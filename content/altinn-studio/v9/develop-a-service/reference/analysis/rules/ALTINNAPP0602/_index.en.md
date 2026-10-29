---
title: "ALTINNAPP0602: subformComponentId and subformDataTypeId are not supported"
description: "A subformPdf task has settings that are no longer supported"
weight: 62
---

This diagnostic is reported when a `subformPdf` task in `config/process/process.bpmn` has
`<altinn:subformComponentId>` or `<altinn:subformDataTypeId>` in `<altinn:subformPdfConfig>`.
This version of the app backend no longer supports the settings. The message names the task and
the element.

Category `Deprecation`, severity **error**. The rule therefore fails the build.

Name the subform's UI folder in `<altinn:subformUiFolder>` instead. The app generates the PDFs
from that folder and takes the data type from the folder's `defaultDataType`.
`studioctl app upgrade v9` makes the change for you. If the upgrade cannot find the subform, it
leaves the task unchanged and lists it as a to-do, and you make the change by hand. Then also
check that the subform's `Settings.json` has `"type": "subform"`, and the old `subformDataTypeId`
as `defaultDataType`.

See the [guide to PDF generation for subforms](/nb/altinn-studio/v9/develop-a-service/look-and-feel/subform/subform-pdf/) (documentation available in
Norwegian only).
