---
title: Send email with file references
description: "How to send composed email orders with file references through the Composed Notifications API."
linktitle: Email with file references
tags: [email, attachments, sas, composed email]
weight: 40
---

{{% notice info %}}
Before you start, make sure you have read the [explanation of composed email orders](/en/notifications/explanation/composed-email/) to understand when and how you should use this feature.
{{% /notice %}}

When you test and monitor composed email orders, you can look up detailed descriptions of order and notification status values in the reference for [status values for orders and notifications]({{< relref "/notifications/reference/notification-status" >}}).

## Prerequisites

Before you start, ensure that you have:

1. A **Maskinporten client** with scope `altinn:serviceowner/notifications.composedemail.create`
2. An **Altinn token** for API authentication
3. Files uploaded to **Azure Blob Storage**
4. A **SAS URL** for each file you want to include as an attachment

{{% notice info %}}
`attachments` is optional. If it is null or empty, the email is sent without attachments.
If attachments are included, each item must satisfy the SAS URL and attachment validation rules.
{{% /notice %}}

## API endpoint

Altinn Notifications offers one endpoint for composed email orders:

| Endpoint | Description |
|----------|-------------|
| `POST /future/orders/composed-email` | Send composed email order (with optional attachments via SAS URL references) |

**Base URL:**
- **Test (TT02):** `https://platform.tt02.altinn.no/notifications/api/v1`
- **Production:** `https://platform.altinn.no/notifications/api/v1`

## Send composed email order

### Request structure

```json
{
  "idempotencyId": "string",
  "sendersReference": "string (optional)",
  "requestedSendTime": "2026-07-01T10:00:00Z",
  "recipient": {
    "emailAddress": "string",
    "emailSettings": {
      "subject": "string",
      "body": "string",
      "contentType": "Plain",
      "attachments": [
        {
          "filename": "string",
          "mimeType": "string",
          "sasUrl": "https://..."
        }
      ]
    }
  }
}
```

### Fields

#### idempotencyId (required)
- **Type:** String
- **Description:** Unique identifier for this sending. Used to ensure that the same message is not sent multiple times upon repeated requests.
- **Example:** `"3fa85f64-5717-4562-b3fc-2c963f66afa6"`

{{% notice info %}}
Use a unique ID for each new sending. If you send the same request with the same `idempotencyId` multiple times, only the first sending is executed. Subsequent requests return the result from the first sending.
{{% /notice %}}

#### sendersReference (optional)
- **Type:** String
- **Description:** Your own reference for this sending. Used for logging and tracking.
- **Example:** `"ref-2026-001"`

#### requestedSendTime (optional)
- **Type:** DateTime (UTC)
- **Description:** Requested send time for the notification order.
- **Example:** `"2026-07-01T10:00:00Z"`

{{% notice info %}}
If `requestedSendTime` is omitted, the API uses the current UTC time.
{{% /notice %}}

#### emailAddress (required)
- **Type:** String
- **Description:** Recipient's email address.
- **Example:** `"recipient@example.com"`

#### subject (required)
- **Type:** String
- **Description:** Email subject line.
- **Example:** `"Decision regarding your application"`

#### body (required)
- **Type:** String
- **Description:** Email body content.
- **Example:** `"Please review the attached decision document."`

#### contentType (optional)
- **Type:** String
- **Values:** `"Plain"` or `"Html"`
- **Default:** `"Plain"`
- **Description:** Content type for the email body.

#### attachments (optional)
- **Type:** Array
- **Description:** List of file references to include as email attachments. If omitted, null, or empty, the email is sent without attachments.

#### filename (required when attachment is provided)
- **Type:** String
- **Description:** Attachment filename.
- **Validation:** Must not include path separators (`/`, `\`) and must include a file extension.
- **Example:** `"decision.pdf"`

#### mimeType (required when attachment is provided)
- **Type:** String
- **Description:** MIME type for the attachment.
- **Validation:** Must be supported by Azure Communication Services.
- **Example:** `"application/pdf"`

#### sasUrl (required when attachment is provided)
- **Type:** String (absolute URI)
- **Description:** SAS URL used by the API to retrieve the file at send time.
- **Example:** `"https://youraccount.blob.core.windows.net/container/decision.pdf?se=...&sp=r&sr=b&sig=..."`

### Validation requirements

#### SAS URL requirements

Each attachment SAS URL is validated at the API boundary:

| Rule | Requirement |
|------|-------------|
| URL scheme | Must be `https` |
| Host | Must end with `.blob.core.windows.net` |
| Required query parameters | `se`, `sig`, `sp`, `sr` must be present and non-empty |
| Resource type (`sr`) | Must be `b` (blob) |
| Permissions (`sp`) | Must contain `r` (read) |
| Expiry (`se`) | Must be parseable as a datetime |
| Expiry buffer | Must be at least **15 minutes after `requestedSendTime`** |

#### Attachment requirements

| Rule | Requirement |
|------|-------------|
| Filename | Must not include path separators (`/`, `\`) |
| Filename | Must include a file extension |
| MIME type | Must be supported by Azure Communication Services |

### Example: Send composed email with attachment

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/composed-email" \
  -H "Authorization: ******" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "ref-2026-001",
    "requestedSendTime": "2026-07-01T10:00:00Z",
    "recipient": {
      "emailAddress": "recipient@example.com",
      "emailSettings": {
        "subject": "Decision regarding your application",
        "body": "Please review the attached decision document.",
        "contentType": "Plain",
        "attachments": [
          {
            "filename": "decision.pdf",
            "mimeType": "application/pdf",
            "sasUrl": "https://youraccount.blob.core.windows.net/container/decision.pdf?se=2026-07-01T12%3A00%3A00Z&sp=r&sr=b&sig=..."
          }
        ]
      }
    }
  }'
```

### Response

On successful registration, you receive `201 Created` with tracking identifiers:

```json
{
  "notificationOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "notification": {
    "shipmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "ref-2026-001"
  }
}
```

If you send the same request again with the same `idempotencyId`, the API returns `200 OK` with the same response content.

### Error handling

Possible error codes:

| Status | Error Code | Description | Solution |
|--------|------------|-------------|----------|
| `400 Bad Request` | - | Validation failed | Check request payload, SAS URL values, and attachment fields |
| `401 Unauthorized` | - | Missing or invalid token | Ensure valid Altinn token in Authorization header |
| `403 Forbidden` | - | Missing scope to access the API | Verify that the Maskinporten client has `altinn:serviceowner/notifications.composedemail.create` |
| `499 Client Closed Request` | `NOT-00002` | Request terminated before completion | Check network connectivity and timeout settings |

## Next steps

- [API reference](/en/notifications/reference/api/)
- [OpenAPI specification](/en/notifications/reference/openapi/)
