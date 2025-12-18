---
title: Send Instant Notifications
description: "Learn how to send instant notifications via the Altinn Notifications API for time-critical messages such as one-time passwords (OTP)."
linktitle: Instant Notifications
tags: [instant notifications, OTP, SMS, email]
weight: 30
---

{{% notice info %}}
Before you start, make sure you have read the [explanation of instant notifications](/en/notifications/explanation/instant-notifications/) to understand when and how you should use this feature.
{{% /notice %}}

## Prerequisites

Before you can send instant notifications, you must have:

1. **Maskinporten client** with scope `altinn:serviceowner/notifications.create`
2.   - See the [Maskinporten integration guide](/en/notifications/guides/#creating-a-new-maskinporten-client) for more information about setup.
2. **Altinn token** for authentication against the API
3. **Recipient's contact information** (phone number or email address)


## API Endpoints

Altinn Notifications offers two endpoints for instant notifications:

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

If you send the same request again with the same `idempotencyId`, you receive HTTP status `200 OK` with the same response content, without resending the SMS.

### Error Handling

Possible error codes:

| Status | Error Code | Description | Solution |
|--------|------------|-------------|----------|
| `400 Bad Request` | - | Invalid request (e.g., missing required fields) | Check that all required fields are included and have the correct format |
| `401 Unauthorized` | - | Missing or invalid token | Ensure valid Altinn token in Authorization header |
| `403 Forbidden` | - | Missing access to the API | Verify that the Maskinporten client has the correct scope |
| `422 Unprocessable Entity` | `NOT-00001` | Missing contact information for recipient(s) | Verify that the phone number or email address is valid and that the recipient has registered contact information in Altinn |
| `499 Client Closed Request` | `NOT-00002` | Request terminated - The client disconnected or cancelled the request | Check network connectivity and ensure adequate timeout settings in your HTTP client |

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

## Next Steps

- Explore the [API reference](/en/notifications/reference/api/) to set up authentication
- See the [OpenAPI specification](/en/notifications/reference/openapi/) for detailed technical documentation
