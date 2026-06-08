---
title: Status values for orders and notifications
linktitle: Status values
description: Reference for order status and notification results in Altinn Notifications
weight: 30
toc: true
---

This page describes the status values used when Altinn Notifications reports
processing progress for notification orders and delivery results for email and SMS.

These values appear in responses from the status APIs (for example
`/future/shipment/{id}` and the status feed). They help you:

- monitor your deliveries
- understand what went wrong when something fails
- provide good customer support

Example response from the status API:

```json
{
  "shipmentId": "c1d034c5-6af7-4813-aff7-920ab02e27b2",
  "sendersReference": "b6030a4e-93a3-489f-8478-85618d198745",
  "type": "Notification",
  "status": "Order_Processed",
  "lastUpdate": "2026-02-04T11:32:01.268148Z",
  "recipients": [
    {
      "type": "Email",
      "destination": "nullstilt@altinn.xyz",
      "status": "Email_Succeeded",
      "lastUpdate": "2026-02-04T11:33:09.64992Z"
    },
    {
      "type": "SMS",
      "destination": "+4798765432",
      "status": "SMS_Accepted",
      "lastUpdate": "2026-02-04T11:33:01.433868Z"
    }
  ]
}
```

## How to read the status fields

- **Order level**: the top-level `status` shows the overall progress for the
  order (`Order_*` values).
- **Recipient level**: each element in `recipients` has a `status` field that
  shows the result for one channel to one recipient (`Email_*` or `SMS_*` values).

The names in the API response follow this pattern:

- `Order_{OrderProcessingState}`
- `Email_{EmailNotificationResultType}`
- `SMS_{SmsNotificationResultType}`

The tables below show both the enum value and the actual string that appears
in the API.

## OrderProcessingState (order status)

Order status describes how far a notification order has progressed in processing.

| Enum value            | API status string        | Description                                                                 | Type                         |
|-----------------------|--------------------------|-----------------------------------------------------------------------------|------------------------------|
| `Registered`          | `Order_Registered`       | The order has been created and stored, processing has not yet started.     | Temporary                    |
| `Processing`          | `Order_Processing`       | The order is currently being processed (Altinn looks up recipients, checks send conditions, etc.). | Temporary        |
| `Processed`           | `Order_Processed`        | The order has been fully processed and handed off to the email and SMS channels. | Temporary              |
| `Completed`           | `Order_Completed`        | The order has been fully processed, and all notifications have reached a final delivery status. | Final          |
| `SendConditionNotMet` | `Order_SendConditionNotMet` | The send condition was not met, so no notifications were sent.        | Final                        |
| `Cancelled`           | `Order_Cancelled`        | The order was cancelled before sending.                                    | Final                        |

**Difference between `Completed` and `Processed`**

- `Processed` means that the system has processed the order and created all
  required notifications, but is still waiting for final delivery status from
  the email and SMS providers.
- `Completed` means that both the order and all related notifications have
  reached a final delivery status (for example delivered or failed in the
  email and SMS channels).

## EmailNotificationResultType (email result)

Status for a single email notification to one recipient.

| Enum value                     | API status string                 | Description                                                  | Type        |
|--------------------------------|-----------------------------------|--------------------------------------------------------------|-------------|
| `New`                          | `Email_New`                       | The email has been created, but not yet sent further.        | Temporary   |
| `Sending`                      | `Email_Sending`                   | The email is currently being sent.                           | Temporary   |
| `Succeeded`                    | `Email_Succeeded`                 | The email provider has accepted the email but has not yet confirmed that it was delivered.           | Temporary   |
| `Delivered`                    | `Email_Delivered`                 | The provider has confirmed that the email was delivered.     | Final       |
| `Failed`                       | `Email_Failed`                    | Failure without a more specific reason.                      | Final       |
| `Failed_RecipientNotIdentified`| `Email_Failed_RecipientNotIdentified` | The recipient could not be identified.                | Final       |
| `Failed_InvalidFormat`         | `Email_Failed_InvalidFormat`     | The email address format is invalid.                         | Final       |
| `Failed_RecipientReserved`     | `Email_Failed_RecipientReserved`  | The recipient is reserved or blocked.                        | Final       |
| `Failed_SuppressedRecipient`   | `Email_Failed_SuppressedRecipient` | The recipient is suppressed by the provider.                 | Final       |
| `Failed_TransientError`        | `Email_Failed_TransientError`     | Temporary failure from the provider. This notification will not be retried automatically, but a new notification order may succeed. | Final   |
| `Failed_Bounced`               | `Email_Failed_Bounced`            | The email bounced.                                           | Final       |
| `Failed_FilteredSpam`          | `Email_Failed_FilteredSpam`       | Filtered as spam by the provider.                            | Final       |
| `Failed_Quarantined`           | `Email_Failed_Quarantined`        | Placed in quarantine by the provider.                        | Final       |
| `Failed_TTL`                   | `Email_Failed_TTL`                | The email expired before it could be delivered.              | Final       |

## SmsNotificationResultType (SMS result)

Status for a single SMS to one recipient.

| Enum value                     | API status string                 | Description                                                  | Type        |
|--------------------------------|-----------------------------------|--------------------------------------------------------------|-------------|
| `New`                          | `SMS_New`                         | The SMS has been created, but not yet sent further.          | Temporary   |
| `Sending`                      | `SMS_Sending`                     | The SMS is currently being sent.                             | Temporary   |
| `Accepted`                     | `SMS_Accepted`                    | Accepted by the SMS gateway.                                 | Temporary   |
| `Delivered`                    | `SMS_Delivered`                   | Confirmed delivered to the recipient's handset.              | Final       |
| `Failed`                       | `SMS_Failed`                      | Failure without a more specific reason.                      | Final       |
| `Failed_InvalidRecipient`      | `SMS_Failed_InvalidRecipient`     | Invalid phone number or recipient.                           | Final       |
| `Failed_RecipientReserved`     | `SMS_Failed_RecipientReserved`    | The recipient is blocked or reserved.                        | Final       |
| `Failed_BarredReceiver`        | `SMS_Failed_BarredReceiver`       | The operator has barred the recipient's subscription.        | Final       |
| `Failed_Deleted`               | `SMS_Failed_Deleted`              | The message was deleted before delivery.                     | Final       |
| `Failed_Expired`               | `SMS_Failed_Expired`              | The message expired at the operator or gateway.              | Final       |
| `Failed_Undelivered`           | `SMS_Failed_Undelivered`          | The message could not be delivered.                          | Final       |
| `Failed_RecipientNotIdentified`| `SMS_Failed_RecipientNotIdentified` | The recipient could not be identified.                  | Final       |
| `Failed_Rejected`              | `SMS_Failed_Rejected`             | Rejected by provider or operator.                            | Final       |
| `Failed_TTL`                   | `SMS_Failed_TTL`                  | The notification reached its time-to-live (TTL) in Altinn without a final delivery report arriving. See the explanation below. | Final       |

## Time-to-live (TTL) and expiry

The time-to-live (TTL) determines how long Altinn keeps tracking a notification
before it is considered expired. How long the lifetime is, and whether you can
control it yourself, depends on which endpoint you use.

### Default lifetime of 48 hours

Regular notifications (ordered through `/orders` and `/future/orders`) have a
fixed lifetime of **48 hours** that service owners **cannot configure**. Altinn
calculates the expiry time from the requested send time plus 48 hours for both
email and SMS.

Instant notifications (the `/future/orders/instant/*` endpoints) are handled
differently:

- For instant SMS, the sender **must** set `timeToLiveInSeconds` in the request.
  A valid value is between 60 and 172,800 seconds (48 hours). See the
  [instant notifications guide]({{< relref "/notifications/guides/instant-notifications" >}})
  for recommended values.
- For instant email, the same fixed lifetime of 48 hours applies as for regular
  notifications, and it cannot be configured.

### Difference between `Failed_TTL` and `Failed_Expired`

Both statuses mean that the message expired before it was delivered, but they
arise in different places:

- **`Failed_TTL`** is set by Altinn when the internal time-to-live (TTL) is
  reached. This happens in two situations:
  - the notification remained in a non-final state until the lifetime was
    reached – for example due to repeated transient failures while attempting
    delivery to the third party (Link Mobility for SMS), or
  - the notification was accepted for sending, but no delivery report arrived
    within the lifetime – for example because the recipient was out of coverage
    or had the phone switched off, or because the delivery report arrived too
    late from the provider.
- **`Failed_Expired`** (SMS only) is set when the operator or gateway reports
  back that the message's validity period expired at their end. In this case a
  delivery report does arrive, but it states that the operator gave up.

In short: `Failed_TTL` applies to expiry during Altinn's own tracking, whereas
`Failed_Expired` applies to expiry reported by the operator or gateway.

### When a notification expires

When the lifetime is reached, this happens:

- The result is reported as `Failed_TTL`, `Failed_Expired` or another final
  failure state.
- You should not resend the same notification without first considering whether
  the content is still relevant for the recipient.

