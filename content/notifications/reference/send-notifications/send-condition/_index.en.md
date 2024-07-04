---
title: Send condition
linktitle: Send condition
tags: [notifications, send conditions]
weight: 30
---

Send condition is a feature that enables registering a  notification order 
for a notification to be sent only if a given condition is met. The requested send time could be immediately 
or in the future. An example use case is reminders where a notification should be sent only if a user is yet to 
complete an action. By using send condition the notification containing the initial request for a user to complete
an action and the notification containing the reminder can be ordered at the same time.

A send condition can be evaluated as true or false i.e. true if the condition for sending the notification is met. 

## Condition endpoint

The send condition is checked by the application using the condition endpoint provided in the notification order. 
Below is an example of a notification order request with a condition endpoint. 

```json {linenos=false,hl_lines="7"}
{
"subject": "Reminder to complete task",
"sendersReference":"application:qwerty",
"requestedSendTime": "2024-07-24T12:00:00Z",
"body": "Reminder to complete application by 31.07. Kind regards service owner",
"recipients":[{"emailAddress":"recipient@domain.com"}],
"conditionEndpoint":"https://servcieowner.com/application/qwerty/reminderRequired"
}
```

### Request

### Response
