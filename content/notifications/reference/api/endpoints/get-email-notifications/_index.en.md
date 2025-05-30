---
title: Get email notifications
linktitle: Get email notifications 
description: Endpoint for retrieving the send status of all email notifications generated by a notification order.

weight: 60
toc: true
---

## Endpoint

GET /orders/{id}/notifications/email

The {id} represents the unique identifier of the notification order for which notifications are to be retrieved.

## Authentication

This API requires authentication, and the request must include one of the following:

- Maskinporten scope __altinn:serviceowner/notifications.create__ (for external system callers)
- Platform Access Token (for Altinn Apps and internal Altinn systems)

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.

## Response

### Response codes
- 200 OK: The email notifications were successfully retrieved.
- 404 Not Found: No order matching the provided ID was found. Refer to the problem details in the response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates missing or invalid scope or Platform Access Token.

### Content-Type
- application/json

### Response body
The response body is formatted as an
[EmailNotificationSummaryExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/EmailNotificationSummaryExt.cs)
and serialized as a JSON string.


### Response body properties

#### orderId
Type: _Globally Unique Identifier (GUID)_

The ID of the notification order to which the retrieved notifications are associated.

#### sendersReference
Type: _string_

The sender's reference provided by the creator in the notification order request.

#### generated
Type: _int_

The total number of email notifications generated so far based on the notification order.

#### succeeded
Type: _int_

The number of email notifications that have been successfully sent so far.

#### notifications
Type: _List of [EmailNotificationWithResult](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/EmailNotificationWithResultExt.cs)_

A list of generated notifications with their send results. Each notification will include the following properties:
  - id: The ID of the notification.
  - succeeded: A boolean indicating whether the notification was sent successfully.
  - _recipient_: The contact details of the recipient to whom the notification was sent.
  - _sendStatus_: The status of the notification's delivery.

| Status                        | Description                                                                                                     |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------|
| New                           | The email has been created but has not yet been picked up for processing.                                       |
| Sending                       | The email is being processed and will be sent shortly.                                                          |
| Succeeded                     | The email has been accepted by the third-party service and will be sent soon.                                   |
| Delivered                     | The email was successfully delivered to the recipient. No errors were reported, indicating successful delivery. |
| Failed                        | The email was not sent due to an unspecified failure.                                                           |
| Failed_RecipientNotIdentified | The email was not sent because the recipient’s email address could not be found.                                |
| Failed_InvalidEmailFormat     | The email was not sent due to an invalid email address format.                                                  |
| Failed_Bounced                | The email bounced due to issues like a non-existent email address or invalid domain.                            |
| Failed_FilteredSpam           | The email was identified as spam and rejected or blocked (not quarantined).                                     |
| Failed_Quarantined            | The email was quarantined due to being flagged as spam, bulk mail, or phishing.                                 |

## Examples
{{% notice info %}}
In the example below we have included placeholders for both the Platform Access and Altinn Token.
__You only need one of them__, see the [Authentication section](#authentication) for which one applies to your use case.
{{% /notice %}}

### Request


```bash
curl --location 'https://platform.altinn.no/notifications/api/v1/orders/f1a1cc30-197f-4f34-8304-006ce4945fd1/notifications/email' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [INSERT ALTINN TOKEN]' \
--header 'PlatformAccessToken: [INSERT PLATFORM ACCESS TOKEN]'
```

### Response

#### 200 OK
Response body contains the email notification summary.

```json
{
    "orderId": "f1a1cc30-197f-4f34-8304-006ce4945fd1",
    "sendersReference": "ref-2023-12-01",
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
