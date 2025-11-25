---
title: Instant Messaging
description: "Altinn Notifications provides dedicated endpoints for sending SMS and email instantly to a single recipient. This page explains how instant messaging works, which fields each request requires, and how to follow up on delivery."
linktitle: Instant Messaging
tags: [instant, sms, email, otp]
weight: 50
---

## Introduction

Instant messaging in Altinn Notifications is designed for situations where you must deliver a message immediately, without queueing or delay. The feature delivers SMS or email to one recipient and requires the sender to supply all necessary contact details. It is used for one-time passwords (OTP), security alerts, and other time-sensitive deliveries.

The instant endpoints are separate from the ordinary order endpoints. Make sure you select them explicitly in your integration.

## When to use instant messaging

- One-time passwords or passcodes that expire quickly
- Deliveries that must bypass the standard sending queues
- Situations where you have already verified the recipient's contact details
- Alerts that must ignore reservation status or channel preferences held in the Norwegian contact and reservation register

{{% notice warning %}}
Instant messaging only supports one recipient per order. Use the ordinary order endpoints when you need to notify multiple recipients at once.
{{% /notice %}}

## Architecture and endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /future/orders/instant/sms` | Send a single SMS instantly to one recipient. |
| `POST /future/orders/instant/email` | Send a single email instantly to one recipient. |
| `POST /future/orders/instant` | Former general endpoint for instant SMS. Marked as deprecated and kept for backwards compatibility only. |
| `GET /future/shipment/{shipmentId}` | Retrieve the delivery manifest and status for the order. |

### Key characteristics

- **Idempotency**: The `idempotencyId` field ensures that identical requests are not registered twice. Reuse the same value if the client must retry.
- **Time control**: For SMS you must always supply `timeToLiveInSeconds`. The system stops processing when the time window expires and marks the status as `SMS_Failed_TTL` if the message was not delivered in time.
- **Own contact data**: The instant endpoints skip the contact and reservation register lookup. You are responsible for storing and validating the recipient's contact information.
- **Asynchronous response**: The response includes a `shipmentId` that you use to retrieve the status later. The actual delivery happens in the background.

## Send an SMS instantly

### Request example

```http
POST https://platform.altinn.no/notifications/api/v1/future/orders/instant/sms
Content-Type: application/json
Authorization: Bearer <token>

{
  "idempotencyId": "94e9d0f6-7a3d-4a20-b5a7-445fb207f9bb",
  "sendersReference": "otp-login-2024-09-30-1234",
  "recipientSms": {
    "phoneNumber": "<phone number in E.164 format>",
    "timeToLiveInSeconds": 120,
    "smsSettings": {
      "sender": "Altinn",
      "body": "Your one-time code is 428516. It is valid for 2 minutes."
    }
  }
}
```

- `idempotencyId`: A unique value per message. The server returns `200 OK` with the same `shipmentId` if you submit the same ID again.
- `sendersReference`: Optional key that you can use in your own logs.
- `phoneNumber`: Must be in international format including country code.
- `timeToLiveInSeconds`: How long the system should attempt delivery. Choose a value that matches the lifetime of the one-time code.
- `smsSettings.sender`: Displayed as the sender name when the message is delivered. Use approved sender names only.
- `smsSettings.body`: The SMS text. Keep it short and avoid personal data.

{{% notice info %}}
Select a `timeToLiveInSeconds` long enough for the recipient to use the code, yet short enough to prevent misuse. Common OTP values range from 60 to 300 seconds.
{{% /notice %}}

### Response

A successful order returns `201 Created` with the following payload:

```json
{
  "notificationOrderId": "caa7f1c0-9d7b-4e56-8d3f-5350f4eb932f",
  "notification": {
    "shipmentId": "2d4f1359-4c38-48a7-9a5c-c7b036f53f51",
    "sendersReference": "otp-login-2024-09-30-1234"
  }
}
```

- `notificationOrderId` points to the order chain inside Altinn.
- `shipmentId` is the identifier you use to retrieve the status.

If you reuse the `idempotencyId`, the service returns `200 OK` with the same content.

## Send an email instantly

### Request example

```http
POST https://platform.altinn.no/notifications/api/v1/future/orders/instant/email
Content-Type: application/json
Authorization: Bearer <token>

{
  "idempotencyId": "8f2a6a61-073b-4a52-9f42-52e9972af974",
  "sendersReference": "otp-email-2024-09-30-1234",
  "recipientEmail": {
    "emailAddress": "<email address>",
    "emailSettings": {
      "subject": "One-time code for login",
      "body": "<p>Your one-time code is <strong>428516</strong>. It is valid for 2 minutes.</p>",
      "senderEmailAddress": "<sender address>",
      "contentType": "Html"
    }
  }
}
```

- `emailAddress`: Must be a valid email address that you are authorised to use.
- `emailSettings.subject`: Short, descriptive subject lines improve deliverability.
- `emailSettings.body`: Can be `Plain` text or `Html`. Remember to include a text alternative when sending HTML in production.
- `senderEmailAddress`: Optional when your organisation has configured senders in Altinn Notifications. Use addresses approved for your solution.

### Response

The structure matches the SMS response and includes `notificationOrderId` and `shipmentId`.

## Retrieve delivery status

Use the `shipmentId` to fetch the message status:

```http
GET https://platform.altinn.no/notifications/api/v1/future/shipment/2d4f1359-4c38-48a7-9a5c-c7b036f53f51
Authorization: Bearer <token>
```

Sample response:

```json
{
  "shipmentId": "2d4f1359-4c38-48a7-9a5c-c7b036f53f51",
  "status": "SMS_Delivered",
  "lastUpdate": "2024-09-30T08:25:14Z",
  "recipients": [
    {
      "destination": "<phone number in E.164 format>",
      "status": "SMS_Delivered",
      "lastUpdate": "2024-09-30T08:25:13Z"
    }
  ]
}
```

### Interpret status values

- `SMS_Delivered` / `Email_Delivered`: The channel provider confirmed delivery.
- `SMS_Failed_TTL`: The delivery window expired before the message reached the recipient. Consider generating a new code.
- `SMS_Failed_InvalidRecipient` or `Email_Failed_InvalidFormat`: The contact detail is invalid. Notify the user and capture updated details.
- `Email_Failed_Bounced` or `Email_Failed_FilteredSpam`: The provider rejected the message. Follow up manually when needed.

## Best practices for OTP

1. Generate new codes each time and log references only, never the actual code.
2. Set `timeToLiveInSeconds` equal to the code lifetime and inform the recipient in the message.
3. Keep the text short and avoid extra information that could expose security details.
4. Monitor status feeds for `Failed` values and add automation to offer a new code.
5. Ensure your client reuses the `idempotencyId` when network errors occur so the user does not receive duplicates.

## Limitations to be aware of

- Only one recipient per order.
- No attachments or rich formats beyond basic HTML in email.
- You must always supply the contact data; the endpoint does not query the Norwegian contact and reservation register.
- The service does not validate reservation status held in public registers.
- SMS requests must include a positive `timeToLiveInSeconds`.
- You must hold a valid access token with the correct Altinn Notifications scope.
