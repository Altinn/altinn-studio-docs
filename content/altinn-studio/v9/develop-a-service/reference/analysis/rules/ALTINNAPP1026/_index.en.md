---
draft: true
title: "ALTINNAPP1026: pdfLayoutName names a page that does not exist"
description: "A PDF service task's pdfLayoutName names a page that does not exist in the task's UI folder"
weight: 126
---

This diagnostic is reported when a PDF service task in `config/process/process.bpmn` has a UI
folder `ui/<task-id>` whose `Settings.json` sets `pdfLayoutName`, but the folder has no page
`layouts/<pdfLayoutName>.json`. The message names the task and the value of `pdfLayoutName`.

The PDF is the page that `pdfLayoutName` names, and the app then ignores `autoPdfTaskIds`. If
the page does not exist, the app has nothing to make the PDF from. The app looks the page up by
the exact name you give, so upper and lower case must match. The app checks the same thing when
an instance reaches the task. The task then fails at once, instead of waiting for the PDF
generator to give up. A preview of the PDF fails the same way.

Category `Process`, severity **error**. The rule therefore fails the build.

Correct `pdfLayoutName` so that it names a page in `ui/<task-id>/layouts`, or add the page.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
