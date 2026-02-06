---
title: Instant notifications
description: "Instant notifications sends notifications immediately to a single recipient, suitable for time-critical messages such as one-time passwords."
linktitle: Instant notifications
tags: [instant notifications, OTP, one-time password]
weight: 50
---

## What is instant notifications?

Instant notifications is a variant of the notification service in Altinn Notifications that sends messages **immediately** to **a single recipient** (email address or phone number).

This feature is useful when the user is waiting for information to proceed, such as a one-time password (OTP) during login.

## When should you **not** use instant notifications?

{{% notice info %}}
In most cases, regular notifications are sufficient. You can omit `requestedSendTime` to send the notification as soon as possible, and use `sendingTimePolicy: "Anytime"` to allow sending around the clock. This combination typically delivers an SMS to the user within a couple of minutes.
{{% /notice %}}

## Technical characteristics

### Immediate sending with asynchronous status tracking

The service is semi-synchronous: the order and sending occur synchronously until handover to the email or SMS provider, while delivery reports arrive asynchronously as for regular orders.

Instant notifications works as follows:

- The API call registers the order and sends it immediately to the SMS or email service
- The notification is sent to the message gateway immediately and bypasses the queue
- The API returns `201 Created` or `200 OK` with tracking information (`shipmentId` and `notificationOrderId`)
- Delivery status must be retrieved asynchronously via the status feed (`/future/shipment/feed`) or by polling `/future/shipment/:id`
- **Note:** The `201 Created` response code only confirms that the system registered and accepted the order, not that delivery succeeded. Email can fail for various reasons, and mobile phones may be out of coverage.

### Idempotency

Instant notifications supports **idempotency** through a mandatory `idempotencyId` field:

- Prevents the same message from being sent multiple times upon repeated requests
- Useful during network problems or timeouts
- The same `idempotencyId` returns the same result (`shipmentId` etc.) without resending the message
- The API does not check whether the content differs from previous calls with the same ID
- The API returns `201 Created` on the first successful call, or `200 OK` if the call with the same `idempotencyId` has already succeeded

### Time-to-live

For **SMS-based instant notifications**, you must specify a `timeToLiveInSeconds` field:

- Specifies how long the SMS gateway should attempt to deliver the message
- Important for one-time passwords that expire after a certain time. A code that arrives after expiration is useless.

### Capacity

Instant notifications **is not for high volume workflows**:

- Intended for **individual, time-critical messages**, not mass mailings
- Intended for single-recipient notifications that **require** immediate sending
- Use regular notification orders for high volumes or bulk notifications

## Next steps

- Read the [instant notifications guide](/en/notifications/guides/instant-notifications/) to learn how to implement instant notifications in your service
- Explore the [OpenAPI specification](/en/notifications/reference/openapi/) for technical specification details
