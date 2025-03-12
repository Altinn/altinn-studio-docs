---
title: Persistence
linktitle: Persistence
description:
weight: 10
---

## Configure minimum persistence lifetime

You may configure the persistence lifetime for instances of an application by configuring the `preventInstanceDeletionForDays` property in the `App/config/applicationmetadata.json`-file.
This prevents the instances from being deleted by users and the service owner for the time period set.

### Example - prevent deletion of instances for 30 days

```
{
    ...
    "preventInstanceDeletionForDays": 30,
    ...
}
```
