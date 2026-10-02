---
draft: true
title: "ALTINNAPP1002: PDF service task includes a task without a UI folder"
description: "autoPdfTaskIds lists a task that has no UI folder"
weight: 102
---

This diagnostic is reported when a PDF service task lists a task in `autoPdfTaskIds`, but the
app has no UI folder `ui/<task-id>` for that task. The PDF then gets no content from that task.
The message names the PDF task and the task it lists.

Category `Process`, severity **warning**.

Check that the task id is correct. The most common cause is a typo.

See the [guide to PDFs in the app]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
