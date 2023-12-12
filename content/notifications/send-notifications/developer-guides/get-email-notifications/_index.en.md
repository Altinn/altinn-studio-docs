---
title: Get email notifications
linktitle: Get email notifications 
description: Developer guide on retrieving a summary of the generated email notifications

weight: 60
toc: true
---

{{% notice info %}}
TODO: QA devs
{{% /notice %}}


## Endpoint

GET /order/{id}/notifications/email

{id} represents the id of the notification order to retrieve notifications for|

## Authentication

This API requires authentication and the request must also include one of the following: 
- Maskinporten scope __altinn:serviceowner/notifications.create__ (for external system callers) 
- Platform Access Token (for Altinn Apps and internal Altinn systems)

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.

## Response

### Response codes
- 200 OK: The notification order request was accepted and a notification order has been successfully generated.
- 404 Not Found: No order matching the provided id were found 

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates that required scope or Platform Access Token is missing or invalid.

### Content-Type
- application/json

### Response body 
The response body is formatted as an 
[EmailNotificationSummaryExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/EmailNotificationSummaryExt.cs)
and serialized as a JSON string.


### Response body properties

#### orderId
Type: _Guid_

The id of the notification order the listed notifications are related to

#### sendersReference
Type: _string_

The senders reference the creator provided upon the creation of the notification order

#### generated
Type: _int_

The total number of email notifications generated so far based on the notification order

#### succeeded
Type: _int_

The number of email notifications that have been sent successfully so far

#### notifications
Type: _List\<[EmailNotificationWithResult](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/EmailNotificationWithResultExt.cs)\>_

A list of generated notifications with send result.
Each notification will include a send status. Find a description of each status in the table below.


| Status                        | Description       |
|:-----------------------------:|:-----------------:|
| New                           | The email has been created, but has not been picked up for processing yet. |
| Sending                       | The email is being processed and will be attempted sent shortly. |
| Succeeded                     | The email has been accepted by the third party email service and will be sent shortly. |
| Delivered                     | The email was delivered to the recipient. No errors reported, making it likely it was received by the recipient. |
| Failed                        | The email was not sent due to an unspecified failure.|
| Failed_RecipientNotIdentified | The email was not sent because the recipient's email address was not found. |
| Failed_InvalidEmailFormat     | The email was not sent because the recipient’s email address is in an invalid format. |    

## Examples

### Request
{{% notice info %}}
In the example we have included place holders for both the Platform Access and Altinn token.

__You only need one of them__, reference [Authentication](#authentication) for which one applies to your use case.
{{% /notice %}}


```bash
curl --location 'https://platform.altinn.no/notifications/api/v1/orders/f1a1cc30-197f-4f34-8304-006ce4945fd1/notifications/email' \
--header 'Content-Type: application/json' \
--header 'PlatformAccessToken: [INSERT PLATFORM ACCESS TOKEN]' \
--header 'Authorization: Bearer [INSERT ALTINN TOKEN]' 
```

### Response

#### 200 OK
Response body contains the email notification summary.

```json
{
    "orderId": "f1a1cc30-197f-4f34-8304-006ce4945fd1",
    "sendersReference": "ref-9d434357-f6b3-46c9-b779-ccb10479e8d4",
    "generated": 1,
    "succeeded": 0,
    "notifications": [
        {
            "id": "e0197ec7-3d82-4917-8329-8c9ecc4c569b",
            "succeeded": false,
            "recipient": {
                "emailAddress": "recipient@domain.com"
            },
            "sendStatus": {
                "status": "New",
                "description": "The email has been created, but has not been picked up for processing yet.",
                "lastUpdate": "2023-11-14T16:06:02.877361Z"
            }
        }
    ]
}
```

#### 404 Not Found
An empty response is returned with the 404 status code.
