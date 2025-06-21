---
title: 'Integrating Altinn Apps'
description: 'How to override or enrich the automatic Dialogporten integration from your app'
weight: 50
---

## Introduction

Altinn Apps are automatically synchronized with Dialogporten. Every time a new
instance is created, the dialog service will create or update a corresponding
dialog that is visible to the end user in Altinn Inbox ("arbeidsflate"). This
guide explains how the default behaviour can be adjusted and how you can take
full control over the integration if needed.

## Automatic dialog synchronization

By default, the synchronization is enabled for all applications. Updates to the
instance, such as status changes, added activities or attachments, will be
reflected in Dialogporten. The behaviour can be tuned through the
`syncAdapterSettings` section in `applicationmetadata.json`.

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
"messageBoxConfig": {
    /* ...*/
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
```

## Using the Dialogporten WebAPI SDK

Some scenarios require more control than the automatic synchronization offers.
The [Dialogporten WebAPI SDK](https://github.com/Altinn/dialogporten/tree/main/src/Digdir.Library.Dialogporten.WebApiClient)
gives your application programmatic access to Dialogporten so you can create and
update dialogs yourself. This enables fine-grained handling of activities,
transmissions and synchronization with Altinn Inbox.
