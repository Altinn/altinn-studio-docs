---
title: Error Codes
linktitle: Error Codes
description: Reference for Altinn Notifications API error codes
weight: 20
toc: true
---

This page provides a comprehensive reference for all specific error codes returned by the Altinn Notifications API.

## Error Code Format

Altinn Notifications API uses unique error codes in the format `NOT-XXXXX` where `NOT` stands for Notifications and `XXXXX` is a five-digit number.

These error codes are returned in the `code` field of the problem details response. The `code` field is an extension member as defined by [RFC 9457](https://tools.ietf.org/html/rfc9457) (Problem Details for HTTP APIs), providing machine-readable error identification.

## Error Codes

### NOT-00001: Missing Contact Information

**HTTP Status Code:** 422 Unprocessable Entity

**Description:** The API was unable to process the notification order because one or more recipients do not have the required contact information available for Altinn.

**Common Causes:**
- Recipient has not registered an email address or phone number
- Recipient has registered contact information, but it is not valid or verified
- For organizational recipients, the organization may not have registered contact details

**Affected Endpoints:**
- `POST /future/orders` - Creating notification orders with recipient lookup

**Example Response:**
```json
{
  "status": 422,
  "code": "NOT-00001",
  "detail": "Missing contact information for recipient(s)"
}
```

**Resolution:**
- Verify that the recipient's national identity number or organization number is correct
- Ask the recipient to register their contact information to make it available for Altinn
- For instant notifications, consider using the direct `emailAddress` or `phoneNumber` fields instead of relying on recipient lookup

---

### NOT-00002: Request Cancelled by Client

**HTTP Status Code:** 499 Client Closed Request

**Description:** The client disconnected or cancelled the request before the server could complete processing. This is a non-standard HTTP status code (499) commonly used to indicate that the client closed the connection prematurely.

**Common Causes:**
- Client-side timeout occurred
- Network connection was interrupted
- User cancelled the operation
- Application terminated the HTTP request

**Affected Endpoints:**
- All API endpoints (any endpoint can receive this error if the client disconnects)

**Example Response:**
```json
{
  "status": 499,
  "code": "NOT-00002",
  "detail": "The client disconnected or cancelled the request before the server could complete processing"
}
```

**Resolution:**


If you receive this error:
- Increase the timeout setting in your HTTP client
- Check network connectivity and stability
- Implement retry logic using the same `idempotencyId` to safely retry the request
- If the problem persists, contact Altinn support

{{% notice info %}}
This error is not expected during normal operation. It indicates that the client disconnected or cancelled the request before the server could complete processing, meaning the client no longer has an active connection to receive the response.
{{% /notice %}}

---

### NOT-00003: Shipment Not Found

**HTTP Status Code:** 404 Not Found

**Description:** The requested shipment (notification order) could not be found. This can occur when the shipment ID does not exist or when the requesting organization does not have access to the shipment.

**Common Causes:**
- The shipment ID (GUID) does not exist in the system
- The shipment was created by a different organization
- The shipment ID is malformed or invalid
- The shipment may have been created in a different environment (e.g., test vs. production)

**Affected Endpoints:**
- `GET /future/shipment/{id}` - Retrieving delivery manifest for a notification order

**Example Response:**
```json
{
  "status": 404,
  "code": "NOT-00003",
  "detail": "Shipment not found"
}
```

**Resolution:**
- Verify that the shipment ID is correct and properly formatted as a GUID
- Ensure you are querying the correct environment (test or production)
- Verify that the authenticated organization has access to the shipment
- Check that the shipment was successfully created before attempting to retrieve it

---

## General HTTP Status Codes

In addition to the specific error codes above, the API also returns standard HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Request was successful |
| `201 Created` | Resource was successfully created |
| `400 Bad Request` | The request is malformed or contains invalid data |
| `401 Unauthorized` | Authentication is required or has failed |
| `403 Forbidden` | The authenticated user/organization does not have permission to access the resource |

## Related Resources

- [Instant Notifications Guide](/en/notifications/guides/instant-notifications/)
- [Altinn Notifications API Reference](/en/notifications/reference/api/)
- [OpenAPI Specification](/en/notifications/reference/openapi/)
