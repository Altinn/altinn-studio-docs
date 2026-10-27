---
draft: true
title: "ALTINNAPP1025: PDF service task lists an entry that adds nothing to its PDF"
description: "autoPdfTaskIds lists the PDF task itself or a blank entry"
weight: 125
---

This diagnostic is reported when a PDF service task without `pdfLayoutName` lists itself or a
blank entry in `<altinn:pdfConfig><altinn:autoPdfTaskIds>`. The message names the PDF task and
says whether the entry is the task itself or blank.

Neither entry adds anything to the PDF, and the automatic PDF skips them. The pages in the PDF
task's own UI folder are what the user sees while the task runs, and are never part of the PDF.
A blank entry names no task.

If the PDF task sets `pdfLayoutName`, the app ignores `autoPdfTaskIds`, and the rule checks
nothing. If `autoPdfTaskIds` lists only blank entries, the build reports
[ALTINNAPP1000]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1000" >}})
instead.

Category `Process`, severity **warning**.

Remove the entry from `autoPdfTaskIds`.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
