---
title: Terminology
description: Words and terms used in Notifications
weight: 15
---

- #### Notification order

  A _notification order_ is the request to send  one or multiple notifications to one or multiple recipients.
  A single order can result in the creation of one or multiple notifications.

  Here is an example of a standard notification order:

    ```json
    {
      "id": "a56c0933-d609-4b5c-a5da-bccfd407c9b8",
      "creator": "ttd",
      "sendersReference": "test-2023-1",
      "requestedSendTime": "2024-01-02T13:49:31.5591909Z",
      "created": "2024-01-02T13:49:31.5799658Z",
      "notificationChannel": "Email",
      "recipients": [
        {
          "emailAddress": "testuser_1@altinn.no"
        },
        {
          "nationalIdentityNumber":"11876995923"
        }
      ],
      "emailTemplate": {
        "fromAddress": "noreply@altinn.cloud",
        "subject": "A test email from Altinn Notifications",
        "body": "A message sent from an application owner through Altinn.",
        "contentType": "Html"
      },
      "links": {
        "self": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/a56c0933-d609-4b5c-a5da-bccfd407c9b8",
        "status": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/a56c0933-d609-4b5c-a5da-bccfd407c9b8/status"
      }
    }
    ```

- #### Notification

  A _notification_ is the single instance of an email or SMS that is sent to a single recipient.

  Here is an example of a set of notifications related to an order:

    ```json
    {
        "orderId": "a56c0933-d609-4b5c-a5da-bccfd407c9b8",
        "sendersReference": "test-2023-1",
        "generated": 2,
        "succeeded": 1,
        "notifications": [
            {
                "id": "a141753c-557f-4bce-95fd-8fc715ca9a40",
                "succeeded": true,
                "recipient":
                {
                    "emailAddress": "testuser_1@altinn.no"
                },
                "sendStatus": {
                    "status": "Succeeded",
                    "description": "The email has been accepted by the third party email service and will be sent shortly.",
                    "lastUpdate": "2024-01-02T13:51:12.706808Z"
                }
            }
               {
                "id": "a9d159e2-6a89-4440-80da-7f2a99c775f4",
                "succeeded": true,
                "recipient":
                {
                    "nationalIdentityNumber":"11876995923",
                    "emailAddress": "testuser_2@altinn.no",
                    "isReserved": false
                },
                "sendStatus": {
                    "status": "Sending",
                    "description": "The email is being processed and will be attempted sent shortly." ,
                    "lastUpdate": "2024-01-02T13:51:12.706808Z"
                }
            }
        ]
    }
    ```

- #### Notification channel

  A _notification channel_ is the communication pathways through which Altinn enables you to
  communicate with your end users.

- #### Send condition

  A send condition can be evaluated as true or false i.e. true if the condition for sending the notification is met. 
  The send condition is checked by the application using the condition endpoint provided in the notification order. 
