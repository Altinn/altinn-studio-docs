---
title: Instant Notifications
description: "Instant notifications is a feature in Altinn Notifications that sends notifications immediately to a single recipient. This is especially suitable for time-critical messages such as one-time passwords, alerts, and other situations where delays are not acceptable."
linktitle: Instant Notifications
tags: [instant notifications, OTP, one-time password]
weight: 50
---

## What is Instant Notifications?

Instant notifications is a specialized notification service in the Altinn Notifications API that sends messages **immediately** to **a single recipient** given a specific email address or phone number. 
Unlike regular notification orders that are queued before processing, instant notifications bypass the queue and are sent directly to the SMS/email service.

This functionality is designed for use cases where **rapid delivery is critical**, and where you cannot afford delays that may occur with queue-based processing.

## When Should You Use Instant Notifications?

Instant notifications is particularly well-suited for the following situations:

### One-Time Passwords (OTP)

The most common use case for instant notifications is sending **one-time passwords** (OTP). These codes:

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

Instant notifications can also be used for other types of time-critical messages:

- **Alarms and critical alerts** requiring immediate action
- **Real-time messages** in interactive services
- **Confirmations** that users are waiting for in the user interface
- **Status updates** that must be displayed immediately

## Differences Between Instant Notifications and Regular Notification Orders

| Aspect | Instant Notifications | Regular Notification Orders |
|--------|------------------|----------------------------|
| **Delivery** | No queue | Queued |
| **Number of recipients** | Single recipient | One or more recipients |
| **Recipient information** | Must provide specific address (phone number/email) | Supports lookup via KRR based on national identity number |
| **Use case** | Time-critical notifications (e.g., OTP) | General notifications and mass mailings |
| **Notification channels** | Either SMS or email | SMS, email, or combinations |


### Recipient Setup

**Instant Notifications:**
- You must provide **exact contact information** (phone number or email address)
- **No automatic lookup** in the Contact and Reservation Register (KRR)
- **No validation** of whether the recipient has reserved themselves against digital communication

**Regular Notification Orders:**
- Supports lookup based on **national identity number** or **organization number**
- Automatically retrieves contact information from KRR
- Respects **reservations** against digital communication

## Technical Characteristics

### Immediate Sending with Asynchronous Status Tracking

Instant notifications works as follows:

- The API call registers the order and sends it immediately to the SMS/email service
- The API returns `201 Created` or `200 OK` with order tracking information (`shipmentId` and `notificationOrderId`)
- The notification is sent to the SMS/email gateway immediately (bypassing the queue)
- Delivery status must be retrieved asynchronously via the status feed (`/future/shipment/feed`) or by polling `/future/shipment/:id` 
- **Note:** the initial `201 Created` response confirms the order was registered and accepted by the gateway, not that delivery succeeded

### Idempotency

Instant notifications supports **idempotency** through a mandatory `idempotencyId` field:

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

- Designed for **individual, time-critical messages**, not mass mailings
- Intended for single-recipient notifications that require immediate sending
- For high volumes or bulk notifications, you should use regular notification orders instead

### Security and Privacy

When using instant messaging, you must be aware of:

- **No KRR validation** - you are responsible for having valid consent to contact the recipient
- **No reservation check** - recipients who have reserved themselves against digital communication will still receive the message

{{% notice warning %}}
When using instant notifications, you are responsible for ensuring that you have the right to contact the recipient at the provided address. Altinn performs no validation against KRR or other registers.
{{% /notice %}}

## Use Case: Sending One-Time Password (OTP)

Let's look at a complete scenario for how instant notifications is used to send a one-time password:

### Scenario

A user wants to confirm their mobile number in a service. The service must send a 6-digit one-time code that the user must provide within 5 minutes.

### Requirements

1. The code must be sent **immediately** when the user requests it
2. The code has a **time-to-live of 5 minutes** (300 seconds)
3. If the user does not receive the code, they must be able to **request a new code**
4. The system must **prevent duplicate sends** if the user clicks multiple times

### Solution with Instant Messaging

### Step 1: Generate one-time code
```plaintext
The service generates a random 6-digit code: 123456
Stores the code in database with expiration time (5 minutes from now)
```

### Step 2: Send instant SMS 
```plaintext
Call to instant SMS endpoint with:
- Recipient's phone number
- Message: "Your one-time code is: 123456. The code expires in 5 minutes."
- Time-to-live: 300 seconds
- Idempotency ID: unique ID for this sending
```

### Step 3: Handle result
```plaintext
If success:
  - Show message to user: "One-time code sent to your mobile number"
  - Let the user enter the code

If error:
  - Show error message and offer retry
```

### Step 4: Verify code
```plaintext
When user enters code:
  - Validate against stored code in database
  - Check that the code has not expired
  - Mark the code as used
```


## Next Steps

- Read the [instant notifications guide](/en/notifications/guides/instant-notifications/) to learn how to implement instant notifications in your service
- Explore the [OpenAPI specification](/en/notifications/reference/openapi/) for technical specification details
