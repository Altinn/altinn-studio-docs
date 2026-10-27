---
draft: true
title: "ALTINNAPP1000: PDF service task has nothing to render"
description: "A PDF service task has neither pdfLayoutName nor autoPdfTaskIds"
weight: 100
aliases:
  - /altinn-studio/v9/develop-a-service/reference/analysis/rules/altinnapp1001/
---

This diagnostic is reported when a PDF service task in `config/process/process.bpmn` does not
say what the PDF should contain. The task lists no tasks in
`<altinn:pdfConfig><altinn:autoPdfTaskIds>`, and it has no UI folder `ui/<task-id>` whose
`Settings.json` sets `pdfLayoutName`. The message names the task.

The PDF is the page that `pdfLayoutName` names, or otherwise an automatic PDF of the tasks in
`autoPdfTaskIds`. The pages in `pages.order` are what the user sees while the task runs, and are
never part of the PDF. Without the rule, the task fails only when an instance reaches it.

Category `Process`, severity **error**. The rule therefore fails the build.

List the tasks to include in the PDF in `autoPdfTaskIds`, or set `pdfLayoutName` in
`ui/<task-id>/Settings.json` and design the PDF yourself.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
