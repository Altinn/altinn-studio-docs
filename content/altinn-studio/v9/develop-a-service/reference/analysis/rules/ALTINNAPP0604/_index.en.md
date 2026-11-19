---
draft: true
title: "ALTINNAPP0604: taskId next to taskIds is ignored"
description: "A data type in applicationmetadata.json has both taskId and taskIds, and the app reads only taskIds"
weight: 64
---

This diagnostic is reported when a data type in `applicationmetadata.json` has both a `taskId`
with a value and `taskIds`. This version of the app backend no longer supports `taskId` and
ignores it. The message names the data type and the value of `taskId`.

The data type belongs only to the tasks in `taskIds`, whatever task `taskId` names.

Category `Deprecation`, severity **warning**.

Remove `taskId`, and list every task the data type belongs to in `taskIds`.

If the data type has only `taskId`, the build reports
[ALTINNAPP0603]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0603" >}})
instead.
