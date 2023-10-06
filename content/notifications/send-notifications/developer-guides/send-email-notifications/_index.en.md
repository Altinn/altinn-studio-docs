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
- Platform Access Token (for Altinn Apps or internal Altinn systems)

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.

## Request

### Content-type

application/json


### Request body
The request body should contain the order request formatted as an
[EmailNotificationOrderRequestExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/EmailNotificationOrderRequestExt.cs)
and serialized as a JSON string.


### Required order request properties 

#### type
- event type of the cloud event, type: string



### Optional order request properties

#### reqested send time
- 

## Response
A successful registration of the notification order should result in a _202 Accepted_ response with an orderId object
as well as a self link to the generated notification order in the location header.

### Content-Type
- application/json

### Response codes
- 202 Accepted: The notification order request was accepted and a notification order has been successfully generated.
- 400 Bad Request: The request was invalid.

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header or that app is not authorized to publish events for the provided source.
- 403 Forbidden: Indicates that Platform Access Token is missing or invalid.

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