---
title: Error Codes
linktitle: Error Codes
description: Reference for Altinn Notifications API error codes
weight: 20
toc: true
---

This page provides a comprehensive reference for all specific error codes returned by the Altinn Notifications API.

## Error Code Format

Altinn Notifications API uses two types of error codes:

### Business Errors
Format: `NOT-XXXXX` where `NOT` stands for Notifications and `XXXXX` is a five-digit number.

These error codes are returned in the `code` field of the problem details response for business logic errors (e.g., missing contact information, resource not found).

### Validation Errors
Format: `NOT.VLD-XXXXX` where `VLD` indicates a validation error.

Validation errors are returned when the request contains invalid data. The response contains:
- A top-level `code` with value `STD-00000`
- A `validationErrors` array with individual validation errors, each with its own `code`

**Example validation error response:**
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "Bad Request",
  "status": 400,
  "detail": "One or more validation errors occurred.",
  "code": "STD-00000",
  "validationErrors": [
    {
      "code": "NOT.VLD-00001",
      "detail": "IdempotencyId cannot be null or empty.",
      "paths": ["IdempotencyId"]
    },
    {
      "code": "NOT.VLD-00010",
      "detail": "The requested send time value must have specified a time zone.",
      "paths": ["RequestedSendTime"]
    }
  ]
}
```

These error codes are defined using [RFC 7807](https://tools.ietf.org/html/rfc7807) (Problem Details for HTTP APIs), providing machine-readable error identification.

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

If you experience many timeouts and similar types of errors:
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

## Validation Error Codes

The following table shows all validation error codes that can be returned by the API. These are returned in the `validationErrors` array in the response.

### Basic Request Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00001` | IdempotencyId cannot be null or empty |

### Send Time Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00010` | The requested send time value must have specified a time zone |
| `NOT.VLD-00011` | Send time cannot be in the past |

### Condition Endpoint Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00020` | ConditionEndpoint must be a valid absolute URI or null |
| `NOT.VLD-00021` | ConditionEndpoint must use http or https scheme |

### Recipient Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00030` | Must have exactly one recipient |
| `NOT.VLD-00031` | Recipient specification cannot be null |
| `NOT.VLD-00032` | One or more recipient is required |
| `NOT.VLD-00033` | Invalid email address format |
| `NOT.VLD-00034` | Invalid sender email address format |
| `NOT.VLD-00035` | Mobile number can contain only '+' and numeric characters, and must adhere to E.164 standard |
| `NOT.VLD-00036` | National identity number must be 11 digits |
| `NOT.VLD-00037` | Organization number must be 9 digits |
| `NOT.VLD-00038` | OrgNumber cannot be null or empty |
| `NOT.VLD-00039` | ResourceId must have valid syntax |
| `NOT.VLD-00040` | National identity number cannot be combined with other identifiers |
| `NOT.VLD-00041` | Organization number cannot be combined with other identifiers |
| `NOT.VLD-00042` | Recipient missing contact information for preferred channel |
| `NOT.VLD-00043` | Recipient missing contact information for SMS channel |
| `NOT.VLD-00044` | Recipient missing contact information for email channel |

### Email Settings Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00050` | Email sending options cannot be null |
| `NOT.VLD-00051` | Email subject cannot be empty |
| `NOT.VLD-00052` | Email body cannot be empty |
| `NOT.VLD-00053` | Email content type must be either Plain or HTML |
| `NOT.VLD-00054` | Email only supports send time policy "Anytime" |

### SMS Settings Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00060` | SMS body cannot be null or empty |
| `NOT.VLD-00061` | SMS only supports send time policy "Daytime" and "Anytime" |

### Reminder Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00070` | Either DelayDays or RequestedSendTime must be defined, but not both |
| `NOT.VLD-00071` | DelayDays must be at least 1 day |
| `NOT.VLD-00072` | RequestedSendTime must be null when DelayDays is set |
| `NOT.VLD-00073` | DelayDays must be null when RequestedSendTime is set |
| `NOT.VLD-00074` | Reminder send time must have a time zone specified |
| `NOT.VLD-00075` | Reminder send time cannot be in the past |

### Channel Schema Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00080` | Invalid channel schema value |
| `NOT.VLD-00081` | EmailSettings must be set when ChannelSchema is EmailAndSms |
| `NOT.VLD-00082` | SmsSettings must be set when ChannelSchema is EmailAndSms |
| `NOT.VLD-00083` | EmailSettings must be set when ChannelSchema is SmsPreferred or EmailPreferred |
| `NOT.VLD-00084` | SmsSettings must be set when ChannelSchema is SmsPreferred or EmailPreferred |
| `NOT.VLD-00085` | SmsSettings must be set when ChannelSchema is Sms |
| `NOT.VLD-00086` | EmailSettings must be set when ChannelSchema is Email |

### Status Feed Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00090` | Sequence number cannot be less than 0 |

### Dialogporten Validation

| Code | Description |
|------|-------------|
| `NOT.VLD-00100` | DialogId must be a valid non-empty GUID |
| `NOT.VLD-00101` | TransmissionId must be a valid non-empty GUID |

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
