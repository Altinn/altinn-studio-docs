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

These error codes are returned in the `errorCode` field of the problem details response when an error occurs.

## Error Codes

### NOT-00001: Missing Contact Information

**HTTP Status Code:** 422 Unprocessable Entity

**Description:** The API was unable to process the notification order because one or more recipients do not have the required contact information registered in Altinn.

**Common Causes:**
- Recipient has not registered an email address or phone number in their Altinn profile
- Recipient has registered contact information, but it is not valid or verified
- For organizational recipients, the organization may not have registered contact details

**Affected Endpoints:**
- `POST /future/orders` - Creating notification orders with recipient lookup
- `POST /future/orders/instant/sms` - When using national identity numbers instead of direct phone numbers
- `POST /future/orders/instant/email` - When using national identity numbers instead of direct email addresses

**Example Response:**
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

**Resolution:**
- Verify that the recipient's national identity number or organization number is correct
- Ask the recipient to log in to Altinn and register their contact information
- For instant notifications, consider using the direct `emailAddress` or `phoneNumber` fields instead of relying on recipient lookup

---

### NOT-00002: Request Terminated

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
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "Client Closed Request",
  "status": 499,
  "errorCode": "NOT-00002",
  "detail": "The client disconnected or cancelled the request before the server could complete processing",
  "instance": "/future/orders/instant/sms"
}
```

**Resolution:**
- Increase the timeout setting in your HTTP client (recommended: 10-15 seconds for instant notifications)
- Check network connectivity and stability
- Implement retry logic using the same `idempotencyId` to safely retry the request
- If the problem persists, contact Altinn support

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
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
  "title": "Not Found",
  "status": 404,
  "errorCode": "NOT-00003",
  "detail": "Shipment not found",
  "instance": "/future/shipment/3fa85f64-5717-4562-b3fc-2c963f66afa6"
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
| `500 Internal Server Error` | An unexpected error occurred on the server |

## Best Practices

1. **Always check the `errorCode` field**: When you receive an error response, examine the `errorCode` field in the problem details response to understand the specific issue.

2. **Implement proper error handling**: Your application should handle each error code appropriately:
   - For `NOT-00001`: Inform the user about missing contact information and provide guidance on how to register it
   - For `NOT-00002`: Implement retry logic with appropriate timeouts
   - For `NOT-00003`: Validate the shipment ID before making the request

3. **Log error details**: Always log the complete error response including the `errorCode`, `detail`, and `instance` fields for debugging purposes.

4. **Use idempotency**: For POST requests, always use a unique `idempotencyId` to enable safe retries in case of network errors or timeouts.

## Related Resources

- [Instant Messaging Guide](/en/notifications/guides/instant-messaging/)
- [Altinn Notifications API Reference](/en/notifications/reference/api/)
- [OpenAPI Specification](/en/notifications/reference/openapi/)
