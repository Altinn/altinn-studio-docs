---
title: Post-Published Flow
linktitle: Post-Published Flow
description: Altinn 3 Correspondence post-published status lifecycle and recipient interactions.
tags: []
toc: true
weight: 2
---

## Post-Published Flow

After a correspondence is published, recipients can interact with it:

{{< correspondence-life-cycle-post-published >}}

## Post-Published Status States

1. **Fetched**: Recipient has accessed the correspondence (via GetOverview or GetDetails API)
2. **Read**: Recipient has explicitly marked the correspondence as read (requires prior Fetched status)
3. **AttachmentsDownloaded**: Recipient has downloaded one or more attachments (can occur at any time)
4. **Confirmed**: Recipient has confirmed the correspondence (requires prior Fetched status, not Read)
5. **PurgedByRecipient**: Correspondence has been deleted by the recipient
6. **PurgedByAltinn**: Correspondence has been deleted by the system

## Status Flow Rules

- **Fetched** is automatically set when recipients call GetOverview or GetDetails
- **Read** requires explicit action via `/markasread` endpoint and requires prior Fetched status. This status is optional - recipients can confirm directly from Fetched without reading
- **Confirmed** requires explicit action via `/confirm` endpoint and requires prior Fetched status
- **AttachmentsDownloaded** can occur from any published state and does not require Read status
- **Confirmation** is only required if the correspondence has `IsConfirmationNeeded = true`

## API Differences

### Main Correspondence API
The main Altinn 3 Correspondence API (`/correspondence/api/v1/correspondence`) supports:
- Mark as Read
- Confirm
- Purge (delete)

### Legacy API Only
Archive functionality is **only available** in the Legacy API (`/correspondence/api/v1/legacy/correspondence`):
- Archive correspondence

## Recipient Interaction Process

### Fetching Correspondence
- Recipients access correspondence details (triggers Fetched status)
- This is automatically triggered by GetOverview or GetDetails API calls
- Required before any other recipient actions

### Reading and Confirmation
- Optionally mark as read (explicit action required)
- Download attachments at any time (triggers AttachmentsDownloaded status)
- Confirm if required (only if `IsConfirmationNeeded = true`)
- Read status is not required for confirmation

### Purging
- Recipients can delete correspondence when no longer needed
- System can also purge correspondence based on retention policies

## Error Handling

### During Recipient Actions
- **HTTP 400 Bad Request**: Attempting to read/confirm without fetching first
- **HTTP 404 Not Found**: Correspondence not available for recipient in current state

## Notification Behavior

- Reminder notifications can be sent for unread correspondences
- Notification sending stops once correspondence is marked as read
- Notifications are managed independently of the correspondence status

The system maintains a complete audit trail of all recipient interactions and status changes for compliance and debugging purposes. 