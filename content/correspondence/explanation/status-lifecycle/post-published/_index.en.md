---
title: Post-Published Lifecycle
linktitle: Post-Published Lifecycle
description: Altinn 3 Correspondence post-published lifecycle and recipient interactions.
tags: []
toc: true
weight: 2
---

## Post-Published Lifecycle

After a correspondence is published, recipients can interact with it:

{{< correspondence-life-cycle-post-published >}}

## Post-Published Status States

1. **Fetched**: Recipient has accessed the correspondence (via GetOverview or GetContent API)
2. **Read**: Recipient has either accessed the correspondence content for the first time or explicitly marked it as read (requires prior Fetched status)
3. **AttachmentsDownloaded**: Recipient has downloaded one or more attachments (can occur at any time)
4. **Confirmed**: Recipient has confirmed the correspondence (requires prior Fetched status)
5. **PurgedByRecipient**: Correspondence has been deleted by the recipient
6. **PurgedByAltinn**: Correspondence has been deleted by the system

## Status Rules

- **Fetched** is automatically set when recipients call GetOverview or GetContent
- **Read** is set either automatically when accessing content for the first time or explicitly via `/markasread` endpoint.  This status is optional - recipients can confirm directly from Fetched without reading
- **Confirmed** requires explicit action via `/confirm` endpoint and requires prior Fetched status
- **AttachmentsDownloaded** can occur from any state after **Published**
- **Confirmation** is only required if the correspondence has `IsConfirmationNeeded = true`

## Recipient Interaction Process

### Fetching Correspondence
- Recipients access correspondence details (triggers Fetched status)
- This is automatically triggered by GetOverview or GetContent API calls
- Required before any other recipient actions

### Reading and Confirmation
- Accessing content automatically marks as read (first time only)
- Can also explicitly mark as read via `/markasread` endpoint
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