---
title: Notification Log API endpoint
linktitle: Notification Log
description: Reference for the notification log retrieval endpoint in Altinn Notifications
weight: 35
toc: true
---

The Notification Log API provides an endpoint to retrieve historical log entries for notifications sent through Altinn Notifications. This allows you to audit, troubleshoot, and track delivery by querying with Dialogporten identifiers.

## Endpoint

```http
GET /notifications/api/v1/future/log
```

## Query parameters

At least one of the following query parameters must be provided and non-empty (whitespace-only values are rejected):

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dialogId` | string | No* | Dialogporten dialog identifier to filter by |
| `transmissionId` | string | No* | Dialogporten transmission identifier to filter by |

*At least one parameter must be provided and non-empty.

## Request examples

### Query by dialog ID

```http
GET /notifications/api/v1/future/log?dialogId=550e8400-e29b-41d4-a716-446655440000
```

### Query by transmission ID

```http
GET /notifications/api/v1/future/log?transmissionId=550e8400-e29b-41d4-a716-446655440001
```

### Query by both identifiers

```http
GET /notifications/api/v1/future/log?dialogId=550e8400-e29b-41d4-a716-446655440000&transmissionId=550e8400-e29b-41d4-a716-446655440001
```

## Response

Returns an array of notification log summary entries matching the provided filter(s). An empty array is returned when no matching entries are found.

### Response schema

```json
[
  {
    "notificationId": "550e8400-e29b-41d4-a716-446655440002",
    "dialogId": "550e8400-e29b-41d4-a716-446655440000",
    "transmissionId": "550e8400-e29b-41d4-a716-446655440001",
    "type": "Notification",
    "channel": "Email",
    "destination": "recipient@example.com",
    "status": "Email_Delivered",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:02:30Z"
  }
]
```

### Response fields

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `notificationId` | UUID | No | Unique ID for the email or SMS notification this log entry comes from |
| `dialogId` | string | Yes | Dialogporten dialog identifier, or null if no association |
| `transmissionId` | string | Yes | Dialogporten transmission identifier, or null if no association |
| `type` | string | No | Notification order type: `Notification` (standard), `Reminder` (reminder), `Instant` (immediate send), or `Composed` (with file attachments). See [Composed Email](/en/notifications/guides/composed-email/) and [Instant Notifications](/en/notifications/guides/instant-notifications/) guides. |
| `channel` | string | No | Delivery channel: `Email` or `Sms` |
| `destination` | string | No | Email address or phone number the notification was sent to |
| `status` | string | No | Delivery result (see [status values reference](/en/notifications/reference/notification-status/)) |
| `requestedSendTime` | DateTime | No | UTC timestamp when the order requested the notification be sent |
| `lastUpdateTime` | DateTime | No | UTC timestamp when the delivery provider (email or SMS service) reported the delivery result |

## Status codes

| Status | Meaning | Description |
|--------|---------|-------------|
| `200` | OK | Notification log entries matching the filter were retrieved successfully. Returns empty array if no entries match. |
| `400` | Bad Request | One or more query parameters are invalid. At least one of `dialogId` or `transmissionId` must be provided and non-empty. |
| `401` | Unauthorized | The request did not include valid authentication credentials. |
| `403` | Forbidden | The caller is not authorized to access notification logs. |
| `499` | Request Terminated | The client disconnected or cancelled the request. |

## Error responses

When a validation error occurs (missing or invalid query parameters), the API returns a standard validation problem response:

```json
{
  "type": "https://altinn.no/problems/validation-error",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "detail": "At least one of 'dialogId' or 'transmissionId' must be provided.",
  "instance": "/notifications/api/v1/future/log",
  "traceId": "0HMVH5K9A0O5E:00000001"
}
```

When a request is terminated by the client (499), the API returns an error with code `NOT-00002`:

```json
{
  "type": "https://altinn.no/problems/request-terminated",
  "title": "Request Terminated",
  "status": 499,
  "code": "NOT-00002",
  "detail": "The client disconnected or cancelled the request before the server could complete processing",
  "instance": "/notifications/api/v1/future/log",
  "traceId": "0HMVH5K9A0O5E:00000002"
}
```

For complete error code reference, see [Error Codes](/en/notifications/reference/error-codes/).

## Example: Complete workflow

### 1. Query by dialog ID

```bash
curl -X GET \
  'https://platform.altinn.no/notifications/api/v1/future/log?dialogId=550e8400-e29b-41d4-a716-446655440000' \
  -H 'Authorization: Bearer {altinn_token}'
```

**Response:**

```json
[
  {
    "notificationId": "550e8400-e29b-41d4-a716-446655440002",
    "dialogId": "550e8400-e29b-41d4-a716-446655440000",
    "transmissionId": "550e8400-e29b-41d4-a716-446655440001",
    "type": "Notification",
    "channel": "Email",
    "destination": "john.doe@example.com",
    "status": "Email_Delivered",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:02:30Z"
  },
  {
    "notificationId": "550e8400-e29b-41d4-a716-446655440003",
    "dialogId": "550e8400-e29b-41d4-a716-446655440000",
    "transmissionId": "550e8400-e29b-41d4-a716-446655440001",
    "type": "Notification",
    "channel": "Sms",
    "destination": "+4798765432",
    "status": "SMS_Accepted",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:01:15Z"
  }
]
```

### 2. Inspect log entry for troubleshooting

From the response above, you can see:
- The email was successfully delivered (`Email_Delivered`)
- The SMS was accepted by the provider (`SMS_Accepted`)
- Both notifications were requested at the same time but delivery reports were received at different times

### 3. Query with validation error

```bash
curl -X GET \
  'https://platform.altinn.no/notifications/api/v1/future/log' \
  -H 'Authorization: Bearer {altinn_token}'
```

**Response (400 Bad Request):**

```json
{
  "type": "https://altinn.no/problems/validation-error",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "detail": "At least one of 'dialogId' or 'transmissionId' must be provided.",
  "instance": "/notifications/api/v1/future/log",
  "traceId": "0HMVH5K9A0O5E:00000002"
}
```

## Notes and limitations

- Query parameters are case-sensitive and must match exact Dialogporten identifiers.
- Whitespace-only values for `dialogId` or `transmissionId` are treated as missing parameters.

## See also

- [Status Feed reference](/en/notifications/reference/status-feed/) — Sequential feed API for polling
- [Status Values reference](/en/notifications/reference/notification-status/) — All delivery statuses
- [Error Codes reference](/en/notifications/reference/error-codes/) — Error codes and troubleshooting
- [API Overview](/en/notifications/reference/api/) — Other APIs
