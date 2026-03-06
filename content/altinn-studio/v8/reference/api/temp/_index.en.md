---
title: Notifications
description: How to use experimental packages for notifications on instantiation
weight: 50
---

We have added support for sending notifications to the instance owner when an instance is created. Here is an overview of the functionality and how you can try it out.

## Experimental packages

The NuGet packages are `Altinn.App.Api.Experimental` and `Altinn.App.Core.Experimental`, version `8.11.0-pr.4620.instantiation-notification-api-approach.1c43a2d4`.

## What's new?

A new field, `notification`, has been added to the request body of `POST /instances/create` and `POST /instances` (multipart). This field allows you to specify which channel the notification should be sent on, and optionally provide custom texts.

## How it works

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

**Default texts**
If you do not provide custom texts, default texts will be used.

Example of a received email with default text:

*Subject:* New form created in Altinn

*Body:* The Norwegian Test Department has created a new form (notification-instantiation-ttd) for ASTROLOG NÆR with social security number 54928201018 - open your Altinn inbox to view the form.

## Fields in the `notification` object

**`InstansiationNotification`**

| Field | Type | Required | Description |
|---|---|---|---|
| `notificationChannel` | int (enum) | No | Channel for sending. Default: `4` (EmailAndSms). See table above for valid values. |
| `language` | string | No | Language code (`nb`, `nn`, `en`). Only used for organizations – individuals use their profile language. |
| `customSms` | object | No | Custom SMS text and sender name. If not set, default text is used. |
| `customEmail` | object | No | Custom email subject and body. If not set, default text is used. |

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

## Custom texts and tokens

Custom texts support the following tokens, which are replaced dynamically:

| Token | Description |
|---|---|
| `$appName$` | The name of the app, as defined in the app metadata |
| `$instanceOwnerName$` | The name of the instance owner |
| `$serviceOwnerName$` | The name of the service owner, as defined in the Altinn CDN |
| `$orgNumber$` | The organization number of the instance owner, if the instance owner is an organization |
| `$socialSecurityNumber$` | The social security number of the instance owner, if the instance owner is an individual |
| `$dueDate$` | The due date of the instance, if set (format: dd-MM-yyyy) |

## How are recipient addresses determined?

Altinn Notifications handles this based on Altinn Profile for individuals and the registry for organizations.

In test environments, contact details can be updated for testing at https://tt02.altinn.no/ui/Profile.

For SMS testing in a test environment, the phone number must be whitelisted. Please get in touch if this is needed.

## Simple example of instance creation with notification

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

Example with custom texts:

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

## Note

This is the first preview. Support for scheduled send time, reminders, and custom cancellation logic will be added in later releases.
