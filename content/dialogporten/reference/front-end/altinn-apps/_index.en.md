---
title: 'Altinn Apps integration'
description: 'Reference information for Altinn Apps integration'
weight: 50
toc: true
---

## Application metadata

These settings, along with other, can be defined in the file  `App/config/applicationmetadata.json`

### Sync adapter settings

Set any of the properties below under `syncAdapterSettings` to `true` to override the
automatic synchronization:

| Setting | Description |
| ------- | ----------- |
| `disableSync` | Disable all dialog synchronization. Overrides all other settings. |
| `disableCreate` | Disable creation of dialogs when app instances are created. |
| `disableDelete` | Disable deletion of dialogs when app instances are deleted. |
| `disableAddActivities` | Disable adding activities. |
| `disableAddTransmissions` | Disable adding transmissions. |
| `disableSyncDueAt` | Disable synchronizing the due at date. |
| `disableSyncStatus` | Disable synchronizing the status. |
| `disableSyncContentTitle` | Disable synchronizing the title. |
| `disableSyncContentSummary` | Disable synchronizing the summary. |
| `disableSyncAttachments` | Disable synchronizing dialog attachments (only recognized IDs). |
| `disableSyncApiActions` | Disable synchronizing API actions (only recognized IDs). |
| `disableSyncGuiActions` | Disable synchronizing GUI actions (only recognized IDs). |

### Example

This shows the default syncAdapterSettings. Set any to `true` to override. Changes will not have retroactive effect on any dialog before a resync, which happens whenever the instance is updated or instance events are added.

{{< code-title >}}applicationmetadata.json{{< /code-title >}}
```json
{
  "id": "ttd/my-app",
  /* ... */
  "messageBoxConfig": {
    /* ... */
    "syncAdapterSettings": {
        "disableSync": false,
        "disableCreate": false,
        "disableDelete": false,
        "disableAddActivities": false,
        "disableAddTransmissions": false,
        "disableSyncDueAt": false,
        "disableSyncStatus": false,
        "disableSyncContentTitle": false,
        "disableSyncContentSummary": false,
        "disableSyncAttachments": false,
        "disableSyncApiActions": false,
        "disableSyncGuiActions": false
    }
  }
}
```
