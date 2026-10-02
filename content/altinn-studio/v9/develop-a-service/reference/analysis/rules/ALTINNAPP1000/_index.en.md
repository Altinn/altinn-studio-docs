---
draft: true
title: "ALTINNAPP1000: PDF service task has nothing to render"
description: "A PDF service task has neither autoPdfTaskIds nor its own UI folder"
weight: 100
---

This diagnostic is reported when a PDF service task in `config/process/process.bpmn` does not
say what the PDF should contain. The task lists no tasks in
`<altinn:pdfConfig><altinn:autoPdfTaskIds>`, and the app has no UI folder `ui/<task-id>` with a
`Settings.json`. The message names the task.

Without the rule, PDF generation fails only when an instance reaches the task, and the cause
shows up only in the log of the PDF generator.

Category `Process`, severity **error**. The rule therefore fails the build.

List the tasks to include in the PDF in `autoPdfTaskIds`, or create a UI folder `ui/<task-id>`
with a `Settings.json` and design the PDF yourself.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
