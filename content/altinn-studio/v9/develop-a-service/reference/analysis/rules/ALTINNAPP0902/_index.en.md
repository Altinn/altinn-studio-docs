---
draft: true
title: "ALTINNAPP0902: auto-delete combined with deletion prevention"
description: "applicationmetadata.json sets both autoDeleteOnProcessEnd and preventInstanceDeletionForDays"
weight: 92
---

This diagnostic is reported when `applicationmetadata.json` sets `autoDeleteOnProcessEnd` to
`true` and `preventInstanceDeletionForDays` to a number of days. The message names the number of
days.

`autoDeleteOnProcessEnd` deletes the instance when its process ends. `preventInstanceDeletionForDays`
forbids deleting the instance for that many days after it is archived, and the instance is archived
when its process ends. The two settings ask for opposite things at the same moment, so the app
cannot honour both.

Category `Metadata`, severity **error**. The rule therefore fails the build.

Remove one of the two settings: `autoDeleteOnProcessEnd` if the instance must be kept, or
`preventInstanceDeletionForDays` if it should be deleted when the process ends.
