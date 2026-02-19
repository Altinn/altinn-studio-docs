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
| `Processing`          | `Order_Processing`       | The order is currently being processed (recipient lookup, send condition evaluation, etc.). | Temporary        |
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
| `Succeeded`                    | `Email_Succeeded`                 | The email has been accepted by the email provider.           | Temporary   |
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
| `Failed_TTL`                   | `SMS_Failed_TTL`                  | The message expired before delivery (time-to-live exceeded). | Final       |

## Time-to-live (TTL) and expiry

For both email and SMS, messages can expire before they are delivered:

- For SMS you can explicitly set a **time-to-live (TTL)** when ordering certain
  types of notifications (for example instant notifications).
- Email and SMS will also have an upper limit at the provider / gateway for how
  long they attempt delivery.

When TTL or maximum lifetime is reached:

- the result will typically be reported as `Failed_TTL`, `Failed_Expired`
  or another terminal failure state
- it does not make sense to retry the same notification without first
  considering whether the content is still relevant for the recipient

