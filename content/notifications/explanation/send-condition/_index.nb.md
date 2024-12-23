---
title: Send Condition
description: "Altinn Notifications offers a feature called Send Condition,
which allows you to create notification orders that are sent to recipients only when a specified condition is met."
linktitle: Send Condition
tags: [notifications, send conditions]
weight: 30
---

## Introduction

The Send Condition feature enables you to create a notification order that will only be sent to recipient(s)
if a specified condition is met. You can choose to send the notification immediately or schedule it for a future date.

### Example Use Case

A common use case is setting reminders, where a notification is sent only
if a user has not completed a specific action. With the send condition,
both the initial notification requesting the action and the reminder notification can be scheduled at the same time.

### Condition Evaluation

A send condition is evaluated as either **true** or **false**, and it is considered **true** when the condition for sending the notification is met.

## Condition Endpoint

The send condition is checked by the application through the condition endpoint
specified in the notification order. Below is an example of a notification order request with the condition endpoint:

```json {linenos=false,hl_lines="11"}
{
  "subject": "Reminder to complete task",
  "sendersReference": "application:qwerty",
  "requestedSendTime": "2024-07-24T12:00:00Z",
  "body": "Reminder to complete application by 31.07. Kind regards, service owner",
  "recipients": [
    {
      "emailAddress": "recipient@domain.com"
    }
  ],
  "conditionEndpoint": "https://serviceowner.com/application/qwerty/reminderRequired"
}
```

### Request

The API client in Altinn Notifications will send a GET request to the provided endpoint with a bearer token.
The token will be a Maskinporten token that includes Digitaliseringsdirektoratet's organization number as part of
the consumer claim, along with the scope `altinn:system/notifications.condition.check`.

- **Method:** GET
- **Headers:**
  - `Authorization: Bearer <maskinporten_token>`
  - `Content-Type: application/json`
- **URL Parameters:** None

#### Example Request

```http
GET /application/qwerty/reminderRequired HTTP/1.1
Host: serviceowner.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI...
Content-Type: application/json
```

#### Example Decoded Token 

Here is an example displaying some of the claims in a decoded Maskinporten token from Altinn Notifications:

```json
{
  "scope": "altinn:system/notifications.condition.check",
  "iss": "https://maskinporten.no/",  
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  }
}
```
- scope: Specifies the scope of the token. This will always be  `altinn:system/notifications.condition.check`
- iss: Specifies the issuer of the token.
  - Production: _https://maskinporten.no/_ 
  - Test: _https://test.maskinporten.no/_ 
- consumer: Specifies the consumer information. ID will always be `0192:991825827`, representing Digdir.


### Response

After evaluating the condition specified in the request,
the endpoint should respond with a JSON object indicating whether the notification should be sent.
The response code must be 200 OK, regardless of whether the condition is met.

Any other status code results in a retry attempt from the API client.

#### Example Response

```json
{
  "sendNotification": true
}
```

- sendNotification: A boolean value (true or false) indicating whether the notification should be sent (true) or not (false).
