---
title: Send Condition
linktitle: Send Condition
tags: [notifications, send conditions]
weight: 30
---

## Introduction

The Send Condition feature allows you to register a notification order 
for a notification to be sent only if a specified condition is met. 
The requested send time can be either immediate or set for a future date.

### Example Use Case

A typical use case is setting reminders where a notification should be sent only if a user 
has not yet completed a certain action. By using the send condition, the notification requesting 
a user to complete an action and the reminder notification can be ordered simultaneously.

### Condition Evaluation

A send condition is evaluated as either true or false. 
It is true if the condition for sending the notification is met.


## Condition Endpoint

The send condition is verified by the application using the condition endpoint provided in the notification order. 
Below is an example of a notification order request with a condition endpoint:

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
The token will be a Maskinporten token containing Digitaliseringsdirektoratet's organization number as a part of the
consumer claim and and the scope `altinn:system/notifications.condition.check`.

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

Here is an example showing some of the claims in a decoded Maskinporten token from Altinn Notifications. 

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

Upon evaluating the condition specified in the request, 
the endpoint should respond with a JSON object indicating whether the notification should be sent.
Response code must be 200 OK regardless if condition is met. 

Any other status code results in a retry attempt from the API client.

#### Example Response

```json
{
  "sendNotification": true
}
```

- sendNotification: A boolean value (true or false) indicating whether the notification should be sent (true) or not (false).
