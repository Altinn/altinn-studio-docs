---
title: Altinn Notifications API
linktitle: API
description: An overview of the Altinn Notifications API
weight: 10
toc: true
---

The Altinn Notifications API is an HTTP-based RESTful API that provides endpoints and actions for ordering,
managing and reviewing notifications sent through Altinn.

## Base URL

{{% insert "content/altinn-studio/v8/guides/shared/api/base-urls.md" "notifications"%}}

## Authentication & Authorization

### Altinn token

{{% insert "content/altinn-studio/v8/guides/shared/api/altinn-token.md" "Notifications"%}}

### Maskinporten scopes

{{% insert "content/altinn-studio/v8/guides/shared/api/maskinporten-scopes.md" %}}


### Platform Access token

{{% insert "content/altinn-studio/v8/guides/shared/api/platform-access-token.md" %}}

## Error Handling

The Altinn Notifications API uses standard HTTP status codes and provides detailed error information through problem details responses.

### Error Codes

The API returns unique error codes in the format `NOT-XXXXX` for specific error conditions. These error codes help you identify and handle specific error scenarios programmatically.

For a complete reference of all error codes, see the [Error Codes Reference](/en/notifications/reference/error-codes/).

### Common Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `NOT-00001` | 422 | Missing contact information for recipient(s) |
| `NOT-00002` | 499 | Request terminated by client |
| `NOT-00003` | 404 | Shipment not found |

### Problem Details Response Format

When an error occurs, the API returns a problem details response following [RFC 9110](https://tools.ietf.org/html/rfc9110):

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.23",
  "title": "Unprocessable Entity",
  "status": 422,
  "errorCode": "NOT-00001",
  "detail": "Missing contact information for recipient(s)",
  "instance": "/future/orders"
}
```

