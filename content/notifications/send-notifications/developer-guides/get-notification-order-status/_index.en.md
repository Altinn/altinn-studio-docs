---
title: Get order status
linktitle: Get order status 
description: Endpoint for retrieving the processing status of an order and a summary of all generated notifications.
weight: 51
toc: true
---

## Endpoint

GET /order/{id}/status

{id} represents the id of the notification order to retrieve status for.

## Authentication

This API requires authentication and the request must also include one of the following: 
- Maskinporten scope __altinn:serviceowner/notifications.create__ (for external system callers) 
- Platform Access Token (for Altinn Apps and internal Altinn systems)

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.

## Response

### Response codes
- 200 OK: The notification order status was successfully retrieved.
- 404 Not Found: No order matching the provided id were found. Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates that required scope or Platform Access Token is missing or invalid.

### Content-Type
- application/json

### Response body 
The response body is formatted as an 
[NotificationOrderWithStatusExt.cs](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/NotificationOrderWithStatusExt.cs)
and serialized as a JSON string.

Find a short description of each property below.

#### id
Type: _Guid_

The id of the notification order.

#### sendersReference
Type: _string_

The senders reference the creator provided in the notification order request.

#### requestedSendTime
Type: _DateTime_

The date and time for when the notification generated by the order should be sent.

#### creator
Type: _string_


#### created
Type: _DateTime_

The date and time for when the notification order request was registered.

#### notificationChannel
Type: enum [_NotificationChannel_](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/NotificationChannelExt.cs)

The notification channel used for the notifications sent can be _Email_ or _Sms_.

#### processingStatus
Type: [_StatusExt_](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/StatusExt.cs)

A status object describing the processing status of the notification order containing the properties below.

  - _status_: current processing status 
  - _description_: an English description of the status and a timestamp 
  - _lastupdate_: the date and time when the status was last updated

|   Status   |                                   Description                                    |
| :--------: | :------------------------------------------------------------------------------: |
| Registered | Order has been registered and is awaiting requested send time before processing. |
| Processing |         Order processing is ongoing. Notifications are being generated.          |
| Completed  |      Order processing is completed. All notifications have been generated.       |


#### notificationStatusSummary
Type: [_NotificationsStatusSummaryExt_](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/NotificationsStatusSummaryExt.cs)

An object containing a [NotificationStatusExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/NotificationStatusExt.cs)
object for for each notification channel used.

The _NotificationStatusExt_ object contains  the properties below.
  - links: a set of links to access the notifications generated for the given notification channel
  - generated: the number of generated notifications
  - succeeded: the number of notifications that have been successfully sent
 
  
## Examples

### Request
{{% notice info %}}
In the example we have included place holders for both the Platform Access and Altinn token.

__You only need one of them__, reference [Authentication](#authentication) for which one applies to your use case.
{{% /notice %}}


```bash
curl --location 'https://platform.altinn.no/notifications/api/v1/orders/f1a1cc30-197f-4f34-8304-006ce4945fd1/status' \
--header 'Content-Type: application/json' \
--header 'PlatformAccessToken: [INSERT PLATFORM ACCESS TOKEN]' \
--header 'Authorization: Bearer [INSERT ALTINN TOKEN]' 
```

### Response

#### 200 OK
Response body contains the notification order with status information.

```json
{
    "id": "f1a1cc30-197f-4f34-8304-006ce4945fd1",
    "sendersReference": "ref-2023-12-01",
    "requestedSendTime": "2023-12-12T14:13:27.836731Z",
    "creator": "digdir",
    "created": "2023-12-12T14:13:27.845029Z",
    "notificationChannel": "Email",
    "processingStatus": {
        "status": "Completed",
        "description": "Order processing is completed. All notifications have been generated.",
        "lastUpdate": "2023-12-12T14:13:27.845029Z"
    },
    "notificationsStatusSummary": {
        "email": {
            "links": {
                "self": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/f1a1cc30-197f-4f34-8304-006ce4945fd1/notifications/email"
            },
            "generated": 1,
            "succeeded": 0
        }
    }
}
```

#### 404 Not Found
An empty response is returned with the 404 status code.