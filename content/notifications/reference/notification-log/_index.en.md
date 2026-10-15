---
title: Notification Log API for end users logged in to the portal
linktitle: Notification Log
description: Overview of the end user API for retrieving the notification log of a dialog.
weight: 35
toc: true
---

The Notification service keeps track of an association between dialogs and notifications that are registered. This
makes it possible to later retrieve a list of all the notification addresses that received a notification related to
a dialog. The log also includes any failed attempts to send a notification, so that a user can discover errors, for
example with an email account.

The API is used by the portal at altinn.no when opening the activity log of a dialog.

{{% notice warning %}}
This is currently only available for users logged in with ID-porten. Work will continue to make the feature
available for end user systems with system user authentication.
{{% /notice %}}

## Endpoint

```http
GET /notifications/api/v1/future/enduser/log
```

## Query parameters

Searching the notification log requires a dialog ID, while the transmission ID is optional.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dialogId` | string | Yes | Dialogporten dialog identifier to filter by |
| `transmissionId` | string | No | Dialogporten transmission identifier to filter by |


## Request examples

### Query by dialog ID

```http
GET /notifications/api/v1/future/enduser/log?dialogId=550e8400-e29b-41d4-a716-446655440000
```

### Query by both dialog and transmission identifiers

```http
GET /notifications/api/v1/future/enduser/log?dialogId=550e8400-e29b-41d4-a716-446655440000&transmissionId=550e8400-e29b-41d4-a716-446655440001
```

## Response

Returns an array of log entries for notifications that match the specified filters. If no entries match the
criteria, an empty list is returned.

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
    "status": "Delivered",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:02:30Z"
  }
]
```

### Response fields

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `notificationId` | UUID | No | Unique identifier for the email or SMS notification this log entry is derived from |
| `dialogId` | string | Yes | Dialogporten dialog identifier |
| `transmissionId` | string | Yes | Dialogporten transmission identifier, or null if there is no transmission association |
| `type` | string | No | Notification order type: `Notification` (standard), `Reminder` (reminder), `Instant` (immediate send), or `Composed` (with attachments). See [Composed Email](/en/notifications/guides/composed-email/) and [Instant Notifications](/en/notifications/guides/instant-notifications/). |
| `channel` | string | No | Delivery channel: `Email` or `Sms` |
| `destination` | string | No | Email address or phone number the notification was sent to |
| `status` | string | No | Delivery result status (see [status values reference](/en/notifications/reference/notification-status/)) |
| `requestedSendTime` | DateTime | No | UTC timestamp when the sender requested the notification be sent |
| `lastUpdateTime` | DateTime | No | UTC timestamp when the provider (email or SMS service) reported the delivery result |

## Status codes

| Status | Meaning | Description |
|--------|---------|-------------|
| `200` | OK | Log entries matching the filter were retrieved. Returns an empty array if no entries match. |
| `400` | Bad Request | One or more parameters are invalid. `dialogId` is a required field and must be a valid UUID. |
| `401` | Unauthorized | The request did not include valid authentication credentials. |
| `403` | Forbidden | The caller is not authorized to access the notification log for the specified dialog. |
| `499` | Request Terminated | The client disconnected or cancelled the request. |

## Error responses

When a validation error occurs (missing or invalid query parameters), the API returns a standard validation response:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "dialogId": [
      "The value '01a0ae3d-df1d-790d-8343-sasdasdasd' is not valid for dialogId.",
      "A value for the 'dialogId' parameter or property was not provided."
    ]
  },
  "traceId": "00-057e1d5fdfa49d63834136fc4f5a47d9-039d9fc51942fcf4-01"
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
  "instance": "/notifications/api/v1/future/enduser/log",
  "traceId": "0HMVH5K9A0O5E:00000002"
}
```

For the complete error code reference, see [Error Codes](/en/notifications/reference/error-codes/).

## Example: Complete workflow

### 1. Query by dialog ID

```bash
curl -X GET \
  'https://platform.altinn.no/notifications/api/v1/future/enduser/log?dialogId=550e8400-e29b-41d4-a716-446655440000' \
  -H 'Authorization: ******'
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
    "status": "Delivered",
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
    "status": "Delivered",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:01:15Z"
  },
  {
    "notificationId": "550e8400-e29b-41d4-a716-446655440002",
    "dialogId": "550e8400-e29b-41d4-a716-446655440000",
    "transmissionId": "550e8400-e29b-41d4-a716-446655440001",
    "type": "Notification",
    "channel": "Email",
    "destination": "jane.smith@example.com",
    "status": "Failed_Bounced",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T11:14:32Z"
  }
]
```

### 2. Inspect log entries for troubleshooting

From the response above, you can see:
- The first email was delivered (`Delivered`)
- The SMS was delivered (`Delivered`)
- The second email was rejected by the email server (`Failed_Bounced`)
- All notifications were requested at the same time, but the delivery results were reported at different times

### 3. Query with a validation error

```bash
curl -X GET \
  'https://platform.altinn.no/notifications/api/v1/future/enduser/log?dialogId=01a0ae3d-df1d-790d-8343-sasdasdasd' \
  -H 'Authorization: ******'
```

**Response (400 Bad Request):**

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "dialogId": [
      "The value '01a0ae3d-df1d-790d-8343-sasdasdasd' is not valid for dialogId.",
      "A value for the 'dialogId' parameter or property was not provided."
    ]
  },
  "traceId": "00-057e1d5fdfa49d63834136fc4f5a47d9-039d9fc51942fcf4-01"
}
```

## Notes and limitations

- Query parameters are case-sensitive and must exactly match Dialogporten identifiers.
- Whitespace-only values for `dialogId` or `transmissionId` are treated as missing.

## See also

- [Status Feed reference](/en/notifications/reference/status-feed/) — Sequential feed API for polling
- [Status Values reference](/en/notifications/reference/notification-status/) — All delivery statuses
- [Error Codes reference](/en/notifications/reference/error-codes/) — Error codes and troubleshooting
- [API Overview](/en/notifications/reference/api/) — Other APIs
