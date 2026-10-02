---
draft: true
title: "ALTINNAPP1001: the UI folder of the PDF service task has no pdfLayoutName"
description: "A PDF service task has its own UI folder without pdfLayoutName"
weight: 101
---

This diagnostic is reported when a PDF service task has its own UI folder `ui/<task-id>`, but
the `Settings.json` in the folder has no `pdfLayoutName`. The message names the task.

The pages in the folder are what users see while the process is at the task, and
`pdfLayoutName` names the layout that becomes the PDF. When the task has its own UI folder, the
app ignores `autoPdfTaskIds`. Without `pdfLayoutName`, the app makes the PDF from the pages in
the folder, and in the folder Altinn Studio creates, that is the waiting page. If
`autoPdfTaskIds` lists tasks, PDF generation fails instead.

Category `Process`, severity **error**. The rule therefore fails the build.

Set `pdfLayoutName` in `ui/<task-id>/Settings.json`, or remove the UI folder and list the tasks
to include in the PDF in `autoPdfTaskIds`.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
