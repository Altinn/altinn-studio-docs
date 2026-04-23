---
title: 'Seen'
description: 'Reference information about the seen log entity'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

The schema below shows the seen-log entity returned in dialog details.

Seen-log entries are created automatically when a dialog details endpoint is used to retrieve a dialog. Search/list operations do not create seen-log entries.

The implementation stores seen information per user and per dialog revision:

- if the same user reads the same dialog revision multiple times, only the first access is recorded
- when the dialog changes and a new revision is created, a new seen-log entry can be created for the same user

Each entry contains:

- `id`
- `seenAt`
- `seenBy`
- `isViaServiceOwner`, which identifies entries created through a service-owner-operated frontend
- `isCurrentEndUser`

Seen-log data is also used when calculating `isContentSeen`. A dialog is only considered content-seen if it has been retrieved since its last content update and it does not have the system label `MarkedAsUnopened`.


{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogSeenLog">}}

{{<children />}}
