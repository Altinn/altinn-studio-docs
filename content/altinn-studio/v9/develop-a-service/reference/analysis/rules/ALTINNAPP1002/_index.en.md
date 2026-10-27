---
draft: true
title: "ALTINNAPP1002: PDF service task includes a task without a UI folder"
description: "autoPdfTaskIds lists a task that has no UI folder"
weight: 102
---

This diagnostic is reported when a PDF service task without `pdfLayoutName` lists a task in
`autoPdfTaskIds`, but the app has no UI folder `ui/<task-id>` for that task. The PDF then gets
no content from that task. The message names the PDF task and the task it lists.

The rule also applies when the PDF task has a UI folder of its own without `pdfLayoutName`. If
the folder sets `pdfLayoutName`, the app ignores `autoPdfTaskIds`, and the rule checks nothing.
If `autoPdfTaskIds` lists the PDF task itself, the build reports
[ALTINNAPP1025]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1025" >}})
instead.

Category `Process`, severity **warning**.

Check that the task id is correct. The most common cause is a typo.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
