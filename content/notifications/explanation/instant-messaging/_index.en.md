---
title: Instant Messaging
description: "Instant messaging is a feature in Altinn Notifications that sends notifications immediately to a single recipient. This is especially suitable for time-critical messages such as one-time passwords, alerts, and other situations where delays are not acceptable."
linktitle: Instant Messaging
tags: [instant messaging, OTP, one-time password]
weight: 50
---

## What is Instant Messaging?

Instant messaging is a specialized notification service in Altinn Notifications that sends messages **immediately** to **a single recipient**. Unlike regular notification orders that are queued and processed asynchronously, instant notifications are sent as soon as the request is received and processed synchronously.

This functionality is designed for use cases where **rapid delivery is critical**, and where you cannot afford delays that may occur with queue-based processing.

## When Should You Use Instant Messaging?

Instant messaging is particularly well-suited for the following situations:

### One-Time Passwords (OTP)

The most common use case for instant messaging is sending **one-time passwords** (OTP). These codes:

- Must be delivered **immediately** for a good user experience
- Have a short **time-to-live**
- Are used for **authentication** and **verification**
- Require **fast delivery** to avoid users having to wait or request new codes

**Examples of OTP use:**
- Confirmation of mobile number or email address
- Two-factor authentication (2FA)
- One-time codes for login
- Verification of sensitive information

### Other Time-Critical Notifications

Instant messaging can also be used for other types of time-critical messages:

- **Alarms and critical alerts** requiring immediate action
- **Real-time messages** in interactive services
- **Confirmations** that users are waiting for in the user interface
- **Status updates** that must be displayed immediately

## Differences Between Instant Messaging and Regular Notification Orders

| Aspect | Instant Messaging | Regular Notification Orders |
|--------|------------------|----------------------------|
| **Delivery** | Synchronous - sent immediately | Asynchronous - queued |
| **Number of recipients** | Single recipient | One or more recipients |
| **Recipient information** | Must provide specific address (phone number/email) | Supports lookup via KRR based on national identity number |
| **Use case** | Time-critical notifications (e.g., OTP) | General notifications and mass mailings |
| **API response** | Returns delivery status immediately | Returns order ID for later follow-up |
| **Notification channels** | SMS or email | SMS, email, or combinations |

### Detailed Comparison

#### Recipient Setup

**Instant Messaging:**
- You must provide **exact contact information** (phone number or email address)
- **No automatic lookup** in the Contact and Reservation Register (KRR)
- **No validation** of whether the recipient has reserved themselves against digital communication

**Regular Notification Orders:**
- Supports lookup based on **national identity number** or **organization number**
- Automatically retrieves contact information from KRR
- Respects **reservations** against digital communication

#### Processing Flow

**Instant Messaging:**
1. API receives request
2. Validates content
3. Sends immediately to SMS/email gateway
4. Returns result to client

**Regular Notification Orders:**
1. API receives request
2. Creates notification order
3. Places order in processing queue
4. Returns order ID
5. Processes order asynchronously (including KRR lookup)
6. Sends notifications based on configuration

## Technical Characteristics

### Synchronous Processing

Instant messaging is processed **synchronously**, which means:

- The API call waits until the message is sent to the provider
- You receive **immediate feedback** on whether the sending succeeded or failed
- **Higher response time** on API calls compared to regular notification orders
- No need to poll status endpoints to check delivery status

### Idempotency

Instant messaging supports **idempotency** through a mandatory `idempotencyId` field:

- Prevents the same message from being sent multiple times upon repeated requests
- Useful during network problems or timeout
- The same `idempotencyId` will return the same result without resending the message

### Time-to-Live

For **SMS-based instant notifications**, you must specify a `timeToLiveInSeconds` field:

- Defines how long the SMS gateway should attempt to deliver the message
- Important for OTP use cases where the code expires after a certain time
- Prevents expired messages from being delivered too late

{{% notice info %}}
The time-to-live applies to the SMS provider's delivery attempts. If the recipient's phone is turned off or without coverage, the provider will continue trying until the time-to-live expires.
{{% /notice %}}

## Limitations and Considerations

### Capacity

Instant messaging is **not optimized for high throughput**:

- Designed for **individual messages**, not mass mailings
- Synchronous processing means each request takes longer
- For high volumes, you should consider regular notification orders instead

### Cost

Instant messaging may have **different cost metrics** than regular notification orders:

- Synchronous processing requires more resources
- Discuss with Altinn about the pricing model for your use case

### Security and Privacy

When using instant messaging, you must be aware of:

- **No KRR validation** - you are responsible for having valid consent to contact the recipient
- **No reservation check** - recipients who have reserved themselves against digital communication will still receive the message
- **Logging** - all instant notifications are logged for audit purposes

{{% notice warning %}}
When using instant messaging, you are responsible for ensuring that you have the right to contact the recipient at the provided address. Altinn performs no validation against KRR or other registers.
{{% /notice %}}

## Use Case: Sending One-Time Passwords (OTP)

Let's look at a complete scenario for how instant messaging is used to send a one-time password:

### Scenario

A user wants to confirm their mobile number in a service. The service must send a 6-digit one-time code that the user must provide within 5 minutes.

### Requirements

1. The code must be sent **immediately** when the user requests it
2. The code has a **time-to-live of 5 minutes** (300 seconds)
3. If the user does not receive the code, they must be able to **request a new code**
4. The system must **prevent duplicate sends** if the user clicks multiple times

### Solution with Instant Messaging

**Step 1: Generate one-time code**
```plaintext
The service generates a random 6-digit code: 123456
Stores the code in database with expiration time (5 minutes from now)
```

**Step 2: Send instant SMS**
```plaintext
Call to instant SMS endpoint with:
- Recipient's phone number
- Message: "Your one-time code is: 123456. The code expires in 5 minutes."
- Time-to-live: 300 seconds
- Idempotency ID: unique ID for this sending
```

**Step 3: Handle result**
```plaintext
If success:
  - Show message to user: "One-time code sent to your mobile number"
  - Let the user enter the code

If error:
  - Show error message and offer retry
```

**Step 4: Verify code**
```plaintext
When user enters code:
  - Validate against stored code in database
  - Check that the code has not expired
  - Mark the code as used
```

### Benefits of Instant Messaging for OTP

1. **Immediate delivery** - the user receives the code while waiting
2. **Time-to-live control** - the code is not sent if it has already expired
3. **Idempotency** - prevents duplicate sends upon repeated clicks
4. **Simple implementation** - synchronous API is easier to implement than asynchronous handling

## Next Steps

- Read the [instant messaging guide](/notifications/guides/instant-messaging/) to learn how to implement instant messaging in your service
- See the [API reference](/notifications/reference/api/) for a detailed description of the endpoints
- Explore the [OpenAPI specification](/notifications/reference/openapi/) for complete API documentation
