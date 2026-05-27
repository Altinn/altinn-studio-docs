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

| Setting                                   | Description                                                                        |
|-------------------------------------------|------------------------------------------------------------------------------------|
| `disableSync`                             | Disable all dialog synchronization. Overrides all other settings.                  |
| `disableCreate`                           | Disable creation of dialogs when app instances are created.                        |
| `disableDelete`                           | Disable deletion of dialogs when app instances are deleted.                        |
| `disableAddActivities`                    | Disable adding activities.                                                         |
| `disableAddTransmissions`                 | Disable adding transmissions.                                                      |
| `disableSyncDueAt`                        | Disable synchronizing the due at date.                                             |
| `disableSyncStatus`                       | Disable synchronizing the status.                                                  |
| `disableSyncContentTitle`                 | Disable synchronizing the title.                                                   |
| `disableSyncContentSummary`               | Disable synchronizing the summary.                                                 |
| `disableSyncContentAdditionalInformation` | Disable synchronizing the additional information.                                  |
| `disableSyncContentExtendedStatus`        | Disable synchronizing the extended status.                                         |
| `disableSyncAttachments`                  | Disable synchronizing dialog attachments (only recognized IDs).                    |
| `disableSyncApiActions`                   | Disable synchronizing API actions (only recognized IDs).                           |
| `disableSyncGuiActions`                   | Disable synchronizing GUI actions (only recognized IDs).                           |
| `disableMarkCompletedWhenConfirmed`       | Disable setting dialog status to completed when app instance is ArchivedConfirmed. |
| `enableUserSuppliedDialogId`              | Use user-supplied dialogId found in DataValues with key: dialog.id.                |

#### Enable user-supplied dialogId
By default, the adapter generates a dialog ID deterministically from the instance ID and creation timestamp of the instance. Enabling this setting instead uses a dialog ID supplied by the app itself, found in DataValues entry with key dialog.id.

Requirements for the supplied dialog ID:
- Must be a valid UUIDv7
- The timestamp embedded in the UUID must be in the past
- Must not already be in use by a different app instance

**Collision detection:** The adapter checks the given dialog for any service owner labels with urn:altinn:integration:storage:{instanceId}. If a label is found pointing to a different instance, the sync is rejected

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
        "disableSyncContentAdditionalInformation": false,
        "disableSyncContentExtendedStatus": false,
        "disableSyncAttachments": false,
        "disableSyncApiActions": false,
        "disableSyncGuiActions": false,
        "disableMarkCompletedWhenConfirmed": false,
        "enableUserSuppliedDialogId": false
    }
  }
}
```
