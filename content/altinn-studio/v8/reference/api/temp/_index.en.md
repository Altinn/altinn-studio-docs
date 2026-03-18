---
title: Notifications
description: How to use notifications on instantiation
weight: 50
---

This document describes sending notification(s) to the instance owner when an instance is created. Here is an overview of the functionality and how you can try it out.

{{% notice warning %}}
Notification on instantiation is published in release candidate. The APIs are considered stable, but may still change before final release.
{{% /notice %}}

## Release candidate packages

The NuGet packages are `Altinn.App.Api` and `Altinn.App.Core`, version `8.11.0-rc.2`.

## What's new?

A new field, `notification`, has been added to the request body of `POST /instances/create` and `POST /instances` (multipart). This field allows you to specify which channel the notification should be sent on, and optionally provide custom texts, a scheduled send time, and reminders.

## How it works

### Fields in the `notification` object

### InstantiationNotification

| Field | Type | Required | Description |
|---|---|---|---|
| `notificationChannel` | int (enum) | No | Channel for sending. Default: `4` (EmailAndSms). See table below for valid values. |
| `language` | string | No | Language code (`nb`, `nn`, `en`). Only used for organizations – individuals use their profile language. |
| `requestedSendTime` | string (datetime) | No | Earliest time for sending (ISO 8601, UTC). If not set, the notification is sent as soon as possible. |
| `allowSendingAfterWorkHours` | bool | No | Allows sending outside of working hours. Default: `false` (daytime only). |
| `customSms` | object | No | Custom SMS text and sender name. If not set, default text is used. |
| `customEmail` | object | No | Custom email subject and body. If not set, default text is used. |
| `reminders` | list | No | List of reminders that can be sent after the initial notification. |

**`customSms`**

| Field | Type | Required | Description |
|---|---|---|---|
| `senderName` | string | Yes | Sender name displayed in the SMS. |
| `text` | CustomText | Yes | Custom SMS text in nb, nn and en. |

**`customEmail`**

| Field | Type | Required | Description |
|---|---|---|---|
| `subject` | CustomText | Yes | Custom subject in nb, nn and en. |
| `body` | CustomText | Yes | Custom body text in nb, nn and en. |

**`CustomText`**

| Field | Type | Required | Description |
|---|---|---|---|
| `nb` | string | Yes | Text in Norwegian Bokmål. |
| `nn` | string | Yes | Text in Norwegian Nynorsk. |
| `en` | string | Yes | Text in English. |

**`reminders` (list of reminder objects)**

Each object in the `reminders` list may contain the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `requestedSendTime` | string (datetime) | No | Earliest time for sending the reminder (ISO 8601, UTC). |
| `sendAfterDays` | int | No | Number of days after the initial notification before the reminder is sent. Cannot be combined with `requestedSendTime`. |
| `customSms` | object | No | Overrides the SMS text from the initial notification for this reminder. |
| `customEmail` | object | No | Overrides the email text from the initial notification for this reminder. |

If neither `requestedSendTime` nor `sendAfterDays` is set, the reminder is sent as soon as possible after the initial notification has been processed.

If no custom texts are provided on the reminder, the texts from the initial notification are inherited.

### Channel selection (`notificationChannel`)

Note that `notificationChannel` is an integer enum, not a string. Valid values are:

| Value | Channel | Description |
|---|---|---|
| `0` | Email | Email only |
| `1` | Sms | SMS only |
| `2` | EmailPreferred | Email first, SMS as fallback if the recipient has no email address |
| `3` | SmsPreferred | SMS first, email as fallback if the recipient has no phone number |
| `4` | EmailAndSms | Both email and SMS are sent simultaneously (default) |

### Language

- For individuals, the language is automatically retrieved from their Altinn profile.
- For organizations, the language specified in the instantiation request (`language` field in the `notification` object) is used, with Norwegian Bokmål as fallback.

### Send time

By default, notifications are only sent during working hours. To allow sending at any time of day, set `allowSendingAfterWorkHours` to `true`. This applies to both email and SMS.

### Scheduled send time

If `requestedSendTime` is set, the notification will not be sent before that time. In addition, Altinn Notifications will call back to the app just before sending to confirm that the notification is still relevant. The app can then reject the send if the state has changed — for example if the instance has already been submitted.

If `requestedSendTime` is not set, the notification is sent as soon as possible (typically within a few minutes).

### Custom cancellation logic

When `requestedSendTime` is set, Altinn Notifications will call back to the app before each notification and reminder is sent. By default, the notification is only sent if the process has not yet ended — that is, the instance is still active and awaiting a response from the user.

You can override this behaviour by implementing the `ICancelInstantiationNotification` interface and registering it in the DI container:

```csharp
public class MyNotificationCancellation : ICancelInstantiationNotification
{
    public bool ShouldSend(Instance instance)
    {
        // Only send the notification if the instance is not archived
        return instance.Status?.IsArchived is not true;
    }
}
```

Register the implementation in `Program.cs`:

```csharp
services.AddTransient<ICancelInstantiationNotification, MyNotificationCancellation>();
```

### Default texts

If you do not provide custom texts, default texts will be used.

Example of a received email with default text:

*Subject:* New form created in Altinn

*Body:* The Norwegian Test Department has created a new form (notification-instantiation-ttd) for ASTROLOG NÆR with social security number 54928201018 - open your Altinn inbox to view the form.

### Custom texts and tokens

Custom texts support the following tokens, which are replaced dynamically:

| Token | Description |
|---|---|
| `$appName$` | The name of the app, as defined in the app metadata |
| `$instanceOwnerName$` | The name of the instance owner |
| `$serviceOwnerName$` | The name of the service owner, as defined in the Altinn CDN |
| `$orgNumber$` | The organization number of the instance owner, if the instance owner is an organization |
| `$socialSecurityNumber$` | The social security number of the instance owner, if the instance owner is an individual |
| `$dueDate$` | The due date of the instance, if set (format: dd-MM-yyyy) |

### How are recipient addresses determined?

Altinn Notifications handles this based on Altinn Profile for individuals and the registry for organizations.

In test environments, contact details can be updated for testing at https://tt02.altinn.no/ui/Profile.

For SMS testing in a test environment, the phone number must be whitelisted. Please get in touch if this is needed.

## Examples

### Simple example of instance creation with notification

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 0
  }
}
```

### Example with custom texts

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 4,
    "customSms": {
      "senderName": "MyOrg",
      "text": {
        "nb": "$appName$ er klar for $instanceOwnerName$",
        "nn": "$appName$ er klar for $instanceOwnerName$",
        "en": "$appName$ is ready for $instanceOwnerName$"
      }
    },
    "customEmail": {
      "subject": {
        "nb": "$appName$ - ny instans opprettet",
        "nn": "$appName$ - ny instans oppretta",
        "en": "$appName$ - new instance created"
      },
      "body": {
        "nb": "Hei $instanceOwnerName$, en ny instans av $appName$ er opprettet for deg.",
        "nn": "Hei $instanceOwnerName$, ei ny instans av $appName$ er oppretta for deg.",
        "en": "Hello $instanceOwnerName$, a new instance of $appName$ has been created for you."
      }
    }
  }
}
```

### Example with scheduled send time and sending outside working hours

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 0,
    "requestedSendTime": "2025-12-01T09:00:00Z",
    "allowSendingAfterWorkHours": true
  }
}
```

### Example with reminders

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 0,
    "requestedSendTime": "2025-12-01T09:00:00Z",
    "reminders": [
      {
        "sendAfterDays": 7
      },
      {
        "sendAfterDays": 14,
        "customEmail": {
          "subject": {
            "nb": "Påminnelse: $appName$ venter på deg",
            "nn": "Påminning: $appName$ ventar på deg",
            "en": "Reminder: $appName$ is waiting for you"
          },
          "body": {
            "nb": "Hei $instanceOwnerName$, vi minner om at $appName$ fortsatt venter på svar.",
            "nn": "Hei $instanceOwnerName$, vi minner om at $appName$ framleis ventar på svar.",
            "en": "Hello $instanceOwnerName$, we would like to remind you that $appName$ is still awaiting your response."
          }
        }
      }
    ]
  }
}
```

### Self-identified users

```json
{
  "instanceOwner": {
    "externalIdentifier": "urn:altinn:person:legacy-selfidentified:jensjensen"
  },
  "notification": {
    "notificationChannel": 0
  }
}
```

```json
{
  "instanceOwner": {
    "username": "epost:jens.jensen@digdir.no"
  },
  "notification": {
    "notificationChannel": 0
  }
}
```
