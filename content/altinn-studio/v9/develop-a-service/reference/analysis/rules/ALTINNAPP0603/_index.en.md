---
draft: true
title: "ALTINNAPP0603: taskId is not supported"
description: "A data type in applicationmetadata.json has taskId, which is no longer supported"
weight: 63
---

This diagnostic is reported when a data type in `applicationmetadata.json` has a `taskId` with a
value, but no `taskIds`. This version of the app backend no longer supports `taskId`. The
message names the data type and the task.

The app reads only `taskIds`, so the data type belongs to no task. The app does not create it
automatically in the task or validate it there, and users can change its data in every task.

Category `Deprecation`, severity **error**. The rule therefore fails the build.

Replace `taskId` with a `taskIds` list that holds the task: `"taskId": "Task_1"` becomes
`"taskIds": ["Task_1"]`. `studioctl app upgrade v9` makes the change for you.

See the [guide to upgrading from v8 to v9](/nb/altinn-studio/v9/new-in-v9/upgrade/)
(documentation available in Norwegian only).
