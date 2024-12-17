---
title: Terminology
description: Words and terms used in Notifications
weight: 15
---

- #### Notification order

  A _notification order_ represents a request to send one or more notifications to one or multiple recipients. 
  A single order can result in the creation of multiple notifications.

  Here is an example of a standard notification order:
  ```json
    {
      "id": "a56c0933-d609-4b5c-a5da-bccfd407c9b8",
      "creator": "ttd",
      "sendersReference": "test-2024-1",
      "requestedSendTime": "2024-01-02T13:49:31.5591909Z",
      "created": "2024-01-02T13:49:31.5799658Z",
      "notificationChannel": "Email",
      "recipients": [
        {
          "emailAddress": "testuser_1@altinn.no"
        },
        {
          "organizationNumber": "313600947"
        },
        {
          "nationalIdentityNumber": "11876995923"
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
  
  Here is an example of a notification order with placeholders keywords:
  ```json
    {
      "id": "e1a439bf-0ac6-41f6-978f-f22f4bd9b8a0",
      "creator": "ttd",
      "sendersReference": "test-2024-2",
      "requestedSendTime": "2024-02-02T13:49:31.5591909Z",
      "created": "2024-02-02T13:49:31.5799658Z",
      "notificationChannel": "Email",
      "recipients": [
        {
          "organizationNumber": "313600947"
        },
        {
          "nationalIdentityNumber": "11876995923"
        }
      ],
      "emailTemplate": {
        "fromAddress": "noreply@altinn.cloud",
        "subject": "Important information for $recipientName$",
        "body": "Hello $recipientName$, We have an important update regarding your ID: $recipientNumber$. Please review the details at your earliest convenience.",
        "contentType": "Html"
      },
      "links": {
        "self": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/e1a439bf-0ac6-41f6-978f-f22f4bd9b8a0",
        "status": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/e1a439bf-0ac6-41f6-978f-f22f4bd9b8a0/status"
      }
    }
  ```

- #### Notification

  A _notification_ refers to a single instance of an email or SMS sent to a specific recipient.

  Here is an example of a set of notifications for an order:
  ```json
    {
      "orderId": "a56c0933-d609-4b5c-a5da-bccfd407c9b8",
      "sendersReference": "test-2024-1",
      "generated": 3,
      "succeeded": 1,
      "notifications": 
      [
        {
          "id": "a141753c-557f-4bce-95fd-8fc715ca9a40",
          "succeeded": true,
          "recipient":
            {
              "emailAddress": "testuser_1@altinn.no"
            },
          "sendStatus":
            {
              "status": "Succeeded",
              "description": "The email has been accepted by the third party email service and will be sent shortly.",
              "lastUpdate": "2024-01-02T13:51:12.706808Z"
            }
        },
        {
          "id": "233533a3-6e6b-4758-9ab7-f3c9adf9de02",
          "succeeded": true,
          "recipient":
            {
              "organizationNumber":"313600947",
              "emailAddress": "testuser_2@altinn.no",
              "isReserved": false
            },
          "sendStatus": 
            {
              "status": "Sending",
              "description": "The email is being processed and will be attempted sent shortly." ,
              "lastUpdate": "2024-01-02T13:51:12.706808Z"
            }
        },
        {
          "id": "a9d159e2-6a89-4440-80da-7f2a99c775f4",
          "succeeded": true,
          "recipient":
            {
              "nationalIdentityNumber":"11876995923",
              "emailAddress": "testuser_3@altinn.no",
              "isReserved": false
            },
          "sendStatus":
            {
              "status": "Sending",
              "description": "The email is being processed and will be attempted sent shortly." ,
              "lastUpdate": "2024-01-02T13:51:12.706808Z"
            }
        }
      ]
    }
    ```

- #### Notification channel

  A _notification channel_ refers to the communication pathways used by Altinn to deliver notifications to end users. Common channels include email and SMS.

- #### Send condition

  A _send condition_ is evaluated as either true or false, based on whether the condition for sending the notification is met. 
  The condition is checked by the application through the condition endpoint provided in the notification order. 