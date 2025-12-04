---
title: Send Instant Notifications
description: "Learn how to send instant notifications via the Altinn Notifications API for time-critical messages such as one-time passwords (OTP), authentication confirmations, and other immediate alerts."
linktitle: Instant Messaging
tags: [instant messaging, OTP, SMS, email]
weight: 30
---

## Introduction

This guide shows how to send instant notifications via the Altinn Notifications API. Instant notifications are sent immediately to a single recipient and are particularly suitable for time-critical messages such as one-time passwords (OTP).

{{% notice info %}}
Before you start, make sure you have read the [explanation of instant messaging](/en/notifications/explanation/instant-messaging/) to understand when and how you should use this feature.
{{% /notice %}}

## Prerequisites

Before you can send instant notifications, you must have:

1. **Maskinporten client** with scope `altinn:serviceowner/notifications.create`
2. **Altinn token** for authentication against the API
3. **Recipient's contact information** (phone number or email address)

See the [Maskinporten integration guide](/en/notifications/guides/#creating-a-new-maskinporten-client) for more information about setup.

## API Endpoints

Altinn Notifications offers two endpoints for instant messaging:

| Endpoint | Description |
|----------|-------------|
| `POST /future/orders/instant/sms` | Send instant SMS notification |
| `POST /future/orders/instant/email` | Send instant email notification |

**Base URL:**
- **Test (TT02):** `https://platform.tt02.altinn.no/notifications/api/v1`
- **Production:** `https://platform.altinn.no/notifications/api/v1`

## Send Instant SMS Notification

### Request Structure

To send an instant SMS, you must make a POST request to `/future/orders/instant/sms` with the following structure:

```json
{
  "idempotencyId": "string",
  "sendersReference": "string (optional)",
  "recipientSms": {
    "phoneNumber": "string",
    "timeToLiveInSeconds": 300,
    "smsSettings": {
      "sender": "string (optional)",
      "body": "string"
    }
  }
}
```

### Fields

#### idempotencyId (required)
- **Type:** String
- **Description:** Unique identifier for this sending. Used to ensure that the same message is not sent multiple times upon repeated requests.
- **Example:** `"otp-123456-2024-01-15T10:30:00Z"`

{{% notice info %}}
Use a unique ID for each new sending. If you send the same request with the same `idempotencyId` multiple times, only the first sending will be executed. Subsequent requests will return the result from the first sending.
{{% /notice %}}

#### sendersReference (optional)
- **Type:** String
- **Description:** Your own reference for this sending. Used for logging and tracking.
- **Example:** `"user-verification-12345"`

#### phoneNumber (required)
- **Type:** String
- **Description:** Recipient's phone number in international format.
- **Format:** `+[country code][phone number]`
- **Example:** `"+4712345678"`

{{% notice warning %}}
The phone number must be in international format with country code. Norwegian numbers start with +47.
{{% /notice %}}

#### timeToLiveInSeconds (required)
- **Type:** Integer
- **Description:** Time-to-live for the message in seconds. Specifies how long the SMS gateway should attempt to deliver the message.
- **Example:** `300` (5 minutes)

#### sender (optional)
- **Type:** String
- **Description:** Sender identifier displayed on the recipient's phone.
- **Example:** `"Altinn"`

#### body (required)
- **Type:** String
- **Description:** Content of the SMS message.
- **Limitations:** See [SMS segmentation](/en/notifications/explanation/sms-segmentation/) for details on character limitations.

### Example: Send One-Time Code via SMS

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/sms" \
  -H "Authorization: Bearer {ALTINN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "otp-verification-user123-20240115103000",
    "sendersReference": "user-verification-123",
    "recipientSms": {
      "phoneNumber": "+4712345678",
      "timeToLiveInSeconds": 300,
      "smsSettings": {
        "sender": "Altinn",
        "body": "Your one-time code is: 123456. The code expires in 5 minutes."
      }
    }
  }'
```

### Response

Upon successful sending, you receive a response with HTTP status `201 Created`:

```json
{
  "notificationOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "notification": {
    "shipmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "user-verification-123"
  }
}
```

If you send the same request again with the same `idempotencyId`, you receive HTTP status `200 OK` with the same response content.

### Error Handling

Possible error codes:

| Status | Description | Solution |
|--------|-------------|----------|
| `400 Bad Request` | Invalid request (e.g., missing required fields) | Check that all required fields are included and have the correct format |
| `401 Unauthorized` | Missing or invalid token | Ensure valid Altinn token in Authorization header |
| `403 Forbidden` | Missing access to the API | Verify that the Maskinporten client has the correct scope |
| `500 Internal Server Error` | Internal server error | Try again or contact Altinn support |

## Send Instant Email Notification

### Request Structure

To send an instant email, you must make a POST request to `/future/orders/instant/email` with the following structure:

```json
{
  "idempotencyId": "string",
  "sendersReference": "string (optional)",
  "recipientEmail": {
    "emailAddress": "string",
    "emailSettings": {
      "subject": "string",
      "body": "string",
      "senderEmailAddress": "string (optional)",
      "contentType": "Plain"
    }
  }
}
```

### Fields

#### emailAddress (required)
- **Type:** String
- **Description:** Recipient's email address.
- **Example:** `"user@example.com"`

#### subject (required)
- **Type:** String
- **Description:** Email subject field.
- **Example:** `"Your one-time code from Altinn"`

#### body (required)
- **Type:** String
- **Description:** Content of the email.

#### senderEmailAddress (optional)
- **Type:** String
- **Description:** Sender's email address. If not specified, the default sender address is used.
- **Example:** `"noreply@altinn.no"`

#### contentType (optional)
- **Type:** String
- **Values:** `"Plain"` or `"Html"`
- **Default:** `"Plain"`
- **Description:** Content type for the email body.

### Example: Send One-Time Code via Email

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/email" \
  -H "Authorization: Bearer {ALTINN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "otp-email-user123-20240115103000",
    "sendersReference": "user-verification-email-123",
    "recipientEmail": {
      "emailAddress": "user@example.com",
      "emailSettings": {
        "subject": "Your one-time code from Altinn",
        "body": "Your one-time code is: 123456\n\nThe code expires in 5 minutes.\n\nBest regards\nAltinn",
        "contentType": "Plain"
      }
    }
  }'
```

### Example: Send HTML-Formatted Email

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/email" \
  -H "Authorization: Bearer {ALTINN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "otp-html-email-user123-20240115103000",
    "sendersReference": "user-verification-html-email-123",
    "recipientEmail": {
      "emailAddress": "user@example.com",
      "emailSettings": {
        "subject": "Your one-time code from Altinn",
        "body": "<html><body><h1>Your One-Time Code</h1><p>Your one-time code is: <strong>123456</strong></p><p>The code expires in 5 minutes.</p><p>Best regards<br>Altinn</p></body></html>",
        "contentType": "Html"
      }
    }
  }'
```

### Response

Upon successful sending, you receive a response with HTTP status `201 Created`:

```json
{
  "notificationOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "notification": {
    "shipmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "user-verification-email-123"
  }
}
```

## Best Practices

### 1. Use Unique Idempotency IDs

Generate a unique `idempotencyId` for each new sending. A good practice is to include:
- User identifier
- Timestamp
- Type of action

**Example:**
```plaintext
otp-verification-user12345-20240115103045
```

### 2. Handle Timeout

Instant messaging is synchronous and may take a few seconds. Set an appropriate timeout in the HTTP client:
- **Recommended:** 10-15 seconds
- **Minimum:** 5 seconds

### 3. Implement Retry Logic

In case of network errors or timeout, you can retry with the same `idempotencyId`:
```plaintext
1. First attempt: Send request with idempotencyId
2. If timeout or network error: Wait 2 seconds
3. Try again with the same idempotencyId
4. If still error: Show error message to user
```

### 4. Validate Phone Number

Before sending SMS, validate that the phone number:
- Is in international format (`+[country code][number]`)
- Is a valid mobile number (not landline)
- Belongs to the country you expect

### 5. Set Correct Time-to-Live for OTP

For one-time codes, set `timeToLiveInSeconds` to the same value as the code's time-to-live:
- **Standard OTP:** 300 seconds (5 minutes)
- **Short-lived OTP:** 180 seconds (3 minutes)
- **Long-lived OTP:** 600 seconds (10 minutes)

### 6. Use Clear Message

Write clear and concise messages:
- Start with the purpose: "Your one-time code is:"
- Include the code clearly
- Specify time-to-live: "The code expires in 5 minutes"
- Add sender if relevant

**Example of good SMS message:**
```plaintext
Your one-time code is: 123456. The code expires in 5 minutes. Do not share this code with others. From Altinn
```

### 7. Log Sendings

Log all instant notifications in your system for:
- **Troubleshooting:** Track delivery issues
- **Security:** Detect abuse (e.g., many OTP attempts)
- **Audit:** Document who received which messages

Log at minimum:
- Timestamp of sending
- Recipient (anonymize or hash for privacy)
- Result (success/error)
- Idempotency ID

## Complete Example: OTP Implementation

Here is a complete example of how you can implement OTP sending with instant messaging:

### Step 1: Generate and Store OTP

```javascript
// Pseudo-code
function generateAndStoreOTP(userId, phoneNumber) {
  // Generate 6-digit random code
  const otp = generateRandomCode(6);

  // Store in database with expiration time
  database.save({
    userId: userId,
    otp: otp,
    expiresAt: now() + 5 * 60, // 5 minutes
    attempts: 0,
    phoneNumber: phoneNumber
  });

  return otp;
}
```

### Step 2: Send OTP via Instant Messaging

```javascript
// Pseudo-code
async function sendOTP(userId, phoneNumber) {
  // Generate OTP
  const otp = generateAndStoreOTP(userId, phoneNumber);

  // Generate unique idempotency ID
  const idempotencyId = `otp-${userId}-${Date.now()}`;

  // Send instant SMS
  const response = await fetch(
    'https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/sms',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${altinnToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idempotencyId: idempotencyId,
        sendersReference: `otp-${userId}`,
        recipientSms: {
          phoneNumber: phoneNumber,
          timeToLiveInSeconds: 300,
          smsSettings: {
            sender: 'Altinn',
            body: `Your one-time code is: ${otp}. The code expires in 5 minutes.`
          }
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send OTP');
  }

  return response.json();
}
```

### Step 3: Verify OTP

```javascript
// Pseudo-code
function verifyOTP(userId, inputOTP) {
  // Retrieve stored OTP
  const stored = database.get(userId);

  // Check if OTP exists
  if (!stored) {
    return { success: false, error: 'NO_OTP_FOUND' };
  }

  // Check if OTP has expired
  if (now() > stored.expiresAt) {
    return { success: false, error: 'OTP_EXPIRED' };
  }

  // Check for too many attempts
  if (stored.attempts >= 3) {
    return { success: false, error: 'TOO_MANY_ATTEMPTS' };
  }

  // Increment attempt counter
  database.incrementAttempts(userId);

  // Verify OTP
  if (stored.otp === inputOTP) {
    // Delete OTP after successful verification
    database.delete(userId);
    return { success: true };
  }

  return { success: false, error: 'INVALID_OTP' };
}
```

## Testing

### Test in TT02 Environment

To test SMS notifications in TT02:

1. **Add mobile number to allow list**
   - Send email to [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no)
   - Request that your mobile number be added to the allow list for TT02

2. **Test with allowed number**
   - Numbers on the allow list receive actual SMS messages
   - Numbers not on the list go to simulator (shown as success in API)

3. **Test email**
   - Emails are sent normally in TT02
   - Check spam folder if you do not receive email

{{% notice info %}}
There is a delay of up to 10 minutes before changes in contact information in KRR take effect. This does not apply to instant messaging since you provide contact information directly.
{{% /notice %}}

## Next Steps

- Read more about the [instant messaging concept](/en/notifications/explanation/instant-messaging/)
- Explore the [API reference](/en/notifications/reference/api/) for complete API documentation
- See the [OpenAPI specification](/en/notifications/reference/openapi/) for detailed technical documentation
