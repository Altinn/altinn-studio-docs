---
title: Send email notifications 
linktitle: Send email notifications 
description: Developer guide on sending an email notification order

weight: 50
toc: true
---

{{% notice info %}}
TODO: QA devs
{{% /notice %}}


## Endpoint

POST /order/email

## Authentication

This API requires authentication and the request must also include one of the following: 
- Maskinporten scope __altinn:notifications.create__ (for external system callers) 
- Platform Access Token (for Altinn Apps and internal Altinn systems)

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.

## Request

### Content-type

application/json


### Request body
The request body must contain the order request formatted as an
[EmailNotificationOrderRequestExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/EmailNotificationOrderRequestExt.cs)
and serialized as a JSON string.


### Required order request properties 

#### body
Type: _string_

The body of the email in either plain text or HTML format.

#### subject
Type: _string_

The subject of the emailSubject of the email

#### recipients
Type: _List of [RecipientExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/RecipientExt.cs)_
  
A list containing one or more recipients consisting of e-mail address and optionally a 
recipient id.

### Optional order request properties

#### fromAddress
Type: _string_ 

Default: _noreply@altinn.no_

The from address to use as sender of the email. 


#### content-type
Type: _enum_ _[EmailContentType](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Core/Enums/EmailContentType.cs)_

Default: _Plain_ 

The content type of the email can be either Plain or Html.

#### requestedSendTime
Type: _DateTime_ 

The date and time when the notification should be sent to recipient. 
If left blank, email will be sent immediately.
  
#### sendersReference
Type: _string_
  
An internal reference for notification creator to lookup or identify the notification in 
the future. Could be a case number or another id. It is recommended, but not required, 
that the sender's reference is unique within the organisation's notification orders.

## Response
A successful registration of the notification order will result in a _202 Accepted_ response with an orderId 
in the response body and a self link to the generated notification order in the 'Location' header.

### Content-Type
- application/json

### Response codes
- 202 Accepted: The notification order request was accepted and a notification order has been successfully generated.
- 400 Bad Request: The request was invalid.

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates that required scope or Platform Access Token is missing or invalid.

## Examples

### Request

Note that the Platform Access and Altinn tokens should be inserted in the headers.

```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/app' \
--header 'Content-Type: application/json' \
--header 'PlatformAccessToken: {Insert Platform Access token}' \
--header 'Authorization: Bearer {Insert Altinn token}' \
--data '{
	"type": "app.instance.created",
	"source": "https://ttd.apps.altinn.no/ttd/apps-test/instances/50019855/428a4575-2c04-4400-89a3-1aaadd2579cd",
	"subject": "/party/50019855",
	"specversion": "1.0",
	"alternativesubject": "/person/01017512345"
}'
```

### Response

#### 200 OK
Response contains the ID for the cloud event.

```json
"4815d141-8cf6-4555-8c3c-e069c7b80c79"
```

#### 400 Bad Request
Response contains a problem details object with the error message in the detail property.

```json
{
	"type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
	"title": "Bad Request",
	"status": 400,
	"detail": "Missing parameter values: source, subject and type cannot be null",
	"traceId": "00-4b54a6a0c9b74bf5afc5e917863f96fd-eb14b06c1f0c3cf8-00"
}
```