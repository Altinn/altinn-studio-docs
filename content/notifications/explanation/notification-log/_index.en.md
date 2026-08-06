---
title: Notification log
description: "Conceptual overview of the notification log and how to use it to track, audit, and troubleshoot notification delivery."
linktitle: Notification log
tags: [log, audit, tracking, troubleshooting, dialogporten]
weight: 40
---

The Notification Log API allows you to retrieve historical log entries for notifications sent through Altinn Notifications. This page explains what notification logs are, why you need them, and how they work.

## What is a notification log?

A notification log captures immutable records of notification delivery status as reported by email or SMS providers at specific moments in time. Each log entry records:

- **The notification** — Its unique ID, type (Notification, Reminder, Instant, Composed), and delivery channel (Email or SMS)
- **The recipient** — The email address or phone number the notification was sent to
- **Timing** — When the notification was requested to be sent (requestedSendTime) and when the delivery provider reported the result (lastUpdateTime)
- **Result** — The delivery outcome encoded in the status field (e.g., `Email_Delivered`, `Email_Failed_RecipientReserved`, `SMS_Failed_BarredReceiver`)

Because entries are immutable records of provider-reported status, they show the delivery outcome at the moment the provider reported it—not a complete history of all status changes.

## Why retrieve notification logs?

The notification log helps you in several key scenarios:

### Auditing and compliance
Maintain a complete, tamper-proof audit trail of communications linked to specific Dialogporten dialogs and transmissions.

### Troubleshooting delivery issues
When a notification doesn't reach a recipient, the log shows:
- Whether the notification was processed
- The delivery result (succeeded or failed)
- Failure type encoded in the status (e.g., `Email_Failed_InvalidFormat`)
- When the delivery provider reported the result (not a complete status history)

### Tracking multi-channel delivery
For notifications sent to both email and SMS, the log shows separate entries for each channel, letting you see exactly what happened on each path.

### Correlating with Dialogporten
The log entries include Dialogporten `dialogId` and `transmissionId`, allowing you to correlate Altinn Notifications activity with the dialog and transmission events in Dialogporten.

### Integration and monitoring
Pull notification delivery data programmatically to feed into your own monitoring systems, dashboards, or workflows.

## How the notification log compares to other status tools

Altinn Notifications offers multiple ways to check on deliveries:

| Tool | Endpoint | Purpose | Use when |
|------|----------|---------|----------|
| **Status API** | `/future/shipment/{id}` | Real-time status of a shipment | You know the shipment ID and want current status |
| **Status Feed** | `/future/shipment/feed` | Sequential feed of status updates | You poll for new updates |
| **Notification Log** | `/future/log` | Historical query by dialog/transmission | You need to find all notifications for a Dialogporten interaction |

The log is optimized for **retrospective lookups by Dialogporten identifiers**, not real-time monitoring.

## Notification log data

Each log entry includes:

- **notificationId** — Unique identifier for this notification
- **dialogId** — Dialogporten dialog ID (if associated)
- **transmissionId** — Dialogporten transmission ID (if associated)
- **type** — Notification order type (Notification, Reminder, Instant, Composed)
- **channel** — Email or SMS
- **destination** — Email address or phone number
- **status** — Delivery result (Email_Delivered, SMS_Accepted, Email_Failed_*, etc.)
- **requestedSendTime** — When the order requested the notification be sent
- **lastUpdateTime** — When the delivery provider reported the result

For complete field descriptions, see the [Notification Log API Reference](/en/notifications/reference/notification-log/).

## Query patterns

The log API supports three query patterns:

1. **By dialog ID** — Get all notifications for a dialog
2. **By transmission ID** — Get all notifications for a transmission
3. **By both** — Get notifications for a specific transmission within a dialog

At least one identifier must be provided.

## Examples

### "Did we send a notification for this dialog?"

Query by `dialogId` to see all notifications for that dialog, across all channels and order types.

### "Why didn't the email get delivered?"

Query by `dialogId` or `transmissionId`, find the email entry, and check its `status` field. `Email_Failed_InvalidFormat` means invalid email address. `Email_Failed_RecipientReserved` means the recipient blocked emails.

### "Which recipients got both email and SMS?"

Query by `dialogId` and count how many entries exist for each `destination` across both channels.

### "Generate an audit trail for compliance"

Query by `dialogId` to generate audit logs showing which notifications were processed and their delivery status, as required for your compliance and regulatory obligations.

## Important notes

- **Immutability** — Log entries are write-once records. Once created, they never change.
- **Status from provider** — Each log entry captures the delivery status reported by the provider (email or SMS service).
- **No complete history** — The log does not return every status change for a notification, only the provider-reported delivery outcomes at specific moments in time.
- **Query-time filtering** — Results are filtered by `dialogId` and/or `transmissionId` at query time, not stored in separate tables.

## Related references

- [Notification Log API Reference](/en/notifications/reference/notification-log/) — Complete technical specification
- [Status Values Reference](/en/notifications/reference/notification-status/) — All delivery statuses
- [API Overview](/en/notifications/reference/api/) — Other APIs
