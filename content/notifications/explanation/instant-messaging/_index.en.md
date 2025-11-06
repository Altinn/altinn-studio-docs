---
title: "Instant messaging"
description: "What instant messaging in Altinn Notifications is and how to use it, with focus on OTP use cases and technical considerations."
linktitle: "Instant messaging"
tags: [notifications, instant-messaging, otp]
weight: 30
---

## Introduction

This page explains what "instant messaging" in Altinn Notifications means, which scenarios it fits, and how external developers can use the feature, especially for One-Time Password (OTP) use cases.

## What is instant messaging?

Instant messaging in Altinn Notifications is a delivery mechanism for short-lived, high-priority messages that require fast delivery and often a confirmation or action from the recipient. The service is optimised for messages that:

- Require fast delivery (seconds to a few minutes)
- Are time-sensitive (for example OTP)
- Have a short lifecycle

## Typical use cases

### One-Time Passwords (OTP)

OTP is a common use case for instant messaging. When an application needs to send a short code for authentication or verification, instant messaging provides low latency and high delivery priority.

### High-priority alerts

Other examples include security alerts, real-time updates and critical system messages.

## Technical requirements and limitations

### Message size and format

- Messages should be short (for example under 160 characters for SMS-like delivery).
- Supported formats: plain text. Any HTML/rich-text features are not guaranteed.

### Delivery guarantees and backoff

- Instant messages are prioritised in the queue, but delivery guarantees depend on the underlying transport (e.g. SMS provider).
- For OTP, a short TTL (time-to-live) is recommended and logic to avoid re-use of codes.

### Rate limits

- The service may apply rate limits per sender to prevent abuse. Contact the team for exact numbers.

## Example: OTP flow

1. The user initiates an authentication request in the application.
2. The application calls the Notifications API to create an instant message containing the OTP code.
3. Notifications routing delivers the message via the chosen channel (for example SMS).
4. The application validates the OTP when the user submits the code.

```yaml
# Example payload (illustrative)
# Field names may vary according to the API specification
{
  "type": "instant",
  "channel": "sms",
  "to": "+47XXXXXXXX",
  "body": "Your code is 123456. It expires in 5 minutes."
}
```

## Security and privacy

- Avoid including sensitive information in messages.
- OTP codes should be short-lived and unique.

## Limitations and recommendations

- Use instant messaging only for time-critical messages.
- Test delivery in relevant geographical regions and with target providers.

## References

- See also the API specification: [Notifications API reference](../../reference/)
- See related swagger update (issue #1077)

