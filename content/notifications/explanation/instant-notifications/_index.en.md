---
title: Instant Notifications
description: "Instant notifications is a feature in Altinn Notifications that sends notifications immediately to a single recipient. This is especially suitable for time-critical messages such as one-time passwords, alerts, and other situations where delays are not acceptable."
linktitle: Instant Notifications
tags: [instant notifications, OTP, one-time password]
weight: 50
---

## What is Instant Notifications?

Instant notifications is a specialized variant of the notification service in Altinn Notifications that sends messages **immediately** to **a single recipient** (only to an email address or phone number).

This functionality is designed for use cases, such as login, where the user is waiting for information via SMS/email to proceed in an ongoing process.


## When Should You *NOT* Use Instant Notifications?

{{% notice info %}}
In most cases, using "regular" notifications is best. It is possible to omitt `requestedSendTime`, to indicate that the notification should be processed as soon as possible,
and for SMS to use `sendingTimePolicy: "Anytime"` to allow sending at any time of day. This combination will usually result in an SMS to the user within a couple of minutes.
{{% /notice %}}

## Technical Characteristics

### Immediate Sending with Asynchronous Status Tracking

The service is semi-synchronous in that the order/sending is synchronous until handover to the email/SMS provider, while delivery reports happen asynchronously as for regular orders.

Instant notifications works as follows:

- The API call registers the order and sends it immediately to the SMS/email service
- The notification is sent to the SMS/email gateway immediately (bypasses the queue)
- The API returns `201 Created` or `200 OK` with order tracking information (`shipmentId` and `notificationOrderId`)
- Delivery status must be retrieved asynchronously via the status feed (`/future/shipment/feed`) or by polling `/future/shipment/:id`
- **Note:** the initial `201 Created` response only confirms that the order was registered and accepted by the gateway, not that delivery succeeded (email can still fail for various reasons or the mobile phone is out of coverage area etc)

### Idempotency

Instant notifications supports **idempotency** through a mandatory `idempotencyId` field:

- Prevents the same message from being sent multiple times upon repeated requests
- Useful during network problems or timeout
- The same `idempotencyId` will return the same result (`shipmentId` etc) without resending the message
- There is no logic/detection of whether the content differs from previous calls
- The API returns `201 Created` on the first successful call, or `200 OK` if the call (with the same `idempotencyId`) previously succeeded

### Time-to-Live

For **SMS-based instant notifications**, you must specify a `timeToLiveInSeconds` field:

- Defines how long the SMS gateway should attempt to deliver the message
- Important for OTP use cases where the code expires after a certain time, and late delivery is pointless (i.e. not useful to receive a code after the validity period).

### Capacity

Instant notifications is **not optimized for high volume**:

- Designed for **individual, time-critical messages**, not mass mailings
- Intended for single-recipient notifications that require immediate sending
- For high volumes or bulk notifications, you should use regular notification orders instead


## Next Steps

- Read the [instant notifications guide](/en/notifications/guides/instant-notifications/) to learn how to implement instant notifications in your service
- Explore the [OpenAPI specification](/en/notifications/reference/openapi/) for technical specification details
