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

- Maskinporten scope __altinn:serviceowner/notifications.create__ (for external system callers) 
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
#### __body__

Type: _string_

The body of the email in either plain text or HTML format.

#### subject
Type: _string_

The subject of the emailSubject of the email

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

Default: Current time

The date and time when the notification should be sent to recipient. 
  
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
{{% notice info %}}
In the example we have included place holders for both the Platform Access and Altinn token.
__You only need one of them__, reference the [Authentication section](#authentication) for which one applies to your use case.
{{% /notice %}}


```bash
curl --location 'https://platform.altinn.no/notifications/api/v1/orders/email' \
--header 'Content-Type: application/json' \
--header 'PlatformAccessToken: [INSERT PLATFORM ACCESS TOKEN]' \
--header 'Authorization: Bearer [INSERT ALTINN TOKEN]' \
--data-raw '{
	"subject": "A test email from Altinn Notifications",
	"body": "A message to be sent immediately from an org.",
	"content-type": "Plain",
    "recipients":[{"emailAddress":"testuser@altinn.no"}]
}'
```

### Response

#### 202 Accepted
Response body contains the ID for the cloud event.

```json
{
    "orderId": "0f92fcfb-778e-4fe4-99dc-51b4f91d71fd"
}
```

Response headers contains a self link for retrieving the generated notification order.
```bash
-- header 'Location: https://platform.altinn.no/notifications/api/v1/orders/0f92fcfb-778e-4fe4-99dc-51b4f91d71fd'
```

#### 400 Bad Request
Response contains a problem details object with the error message in the detail property.

```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-9ac2962c93d79629aa5c3744e4259663-344b49720aa49b0a-00",
    "errors": {
        "Subject": [
            "'Subject' must not be empty."
        ]
    }
}
```