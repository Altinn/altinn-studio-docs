---
draft: true
title: "ALTINNAPP1002: PDF service task lists an entry that adds nothing to its PDF"
description: "autoPdfTaskIds lists the PDF task itself, a task without a UI folder, or a blank entry next to other entries"
weight: 102
---

This diagnostic is reported when a PDF service task without `pdfLayoutName` lists an entry in
`<altinn:pdfConfig><altinn:autoPdfTaskIds>` that adds nothing to the PDF. That is the case when
the entry

- is blank
- is the PDF task itself
- is a task id with no UI folder `ui/<task-id>` in the app

The message names the PDF task and the entry, and says why the entry adds nothing.

The automatic PDF shows each listed task from that task's own UI folder, and skips every other
entry. A blank entry names no task. The pages in `pages.order` in the PDF task's own UI folder are
what the user sees while the task runs, and are never part of the PDF. A task without a UI folder has nothing
to show.

If the PDF task sets `pdfLayoutName`, the app ignores `autoPdfTaskIds`, and the rule checks
nothing. If `autoPdfTaskIds` lists only blank entries, the build reports
[ALTINNAPP1000]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1000" >}})
instead.

Category `Process`, severity **warning**.

Remove the entry, or correct the task id. The most common cause is a typo in the task id. If
the entry is the only one that names a task, list a task that has a UI folder instead, or set
`pdfLayoutName`: without a task to show, the build reports ALTINNAPP1000.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
