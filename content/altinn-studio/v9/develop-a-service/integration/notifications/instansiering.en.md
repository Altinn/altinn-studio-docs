---
title: Notify on instantiation
linktitle: Notification on instantiation
description: How to notify the instance owner when your app creates an instance
draft: true
weight: 30
toc: true
tags: [needsReview]
---

When your app creates an instance, you can ask Altinn to notify the instance owner by email or SMS at the same time. You control this with the `notification` field in the instantiation request, and you do not need any code of your own in the app to use the feature.

{{% notice warning %}}
The feature requires version `8.11.0` or later of `Altinn.App.Api` and `Altinn.App.Core`.
{{% /notice %}}

## Prerequisites

The app must have timezone support in its container image. The `aspnet:8.0-alpine` base image does not include timezone data, and without it the notification can fail silently: the app creates the instance as normal and the API returns `201 Created`, but no notification is ever sent. The only trace is an error in the app log.

This affects notifications where the instance has a due date (`dueBefore`) and the notification uses custom texts (`customEmail` or `customSms`). The app converts the due date to Norwegian local time before it replaces the `$dueDate$` token, and that conversion needs timezone data. Missing timezone data also gives wrong timestamps elsewhere in the app, for example in generated PDFs.

Apps you have created from the current app template already have this support. In older apps you must add these lines to the `Dockerfile`:

```Dockerfile
  # Add globalization timezone support
  RUN apk add --no-cache icu-libs icu-data-full tzdata
  ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
```

The lines must come after the "FROM" section ending with "AS final". See [the Dockerfile in the app template](https://github.com/Altinn/altinn-studio/blob/main/src/App/template/v8/src/Dockerfile) for a complete example.

## How it works

The `notification` field belongs in the request body of `POST /instances/create` and `POST /instances` (multipart). In the field you choose the channel for the notification, and you can also provide custom texts, a scheduled send time and reminders.

### Fields in the notification object

#### InstantiationNotification

| Field | Type | Required | Description |
|---|---|---|---|
| notificationChannel | int (enum) | No | Channel for sending. Default: 4 (EmailAndSms). See the table below for valid values. |
| language | string | No | Language code (nb, nn, en). Applies to organisations only – individuals get the notification in their profile language. |
| requestedSendTime | string (datetime) | No | Earliest time for sending (ISO 8601, UTC). If you do not set the field, the notification goes out as soon as possible. Maximum delay is 30 days. |
| allowSendingAfterWorkHours | bool | No | Allows sending outside working hours. Default: false (daytime only). Applies to SMS only – email goes out regardless of the time of day. |
| customSms | object | No | Custom SMS text and sender name. If you do not set the field, Altinn uses the default text. |
| customEmail | object | No | Custom email subject and body. If you do not set the field, Altinn uses the default text. |
| reminders | list | No | List of reminders that can go out after the initial notification. |

#### customSms

| Field | Type | Required | Description |
|---|---|---|---|
| senderName | string | Yes | The sender name the recipient sees in the SMS. Maximum 11 characters. |
| text | CustomText | Yes | Custom SMS text in nb, nn and en. |

{{% notice info %}}
If the sender name `senderName` is protected – or later becomes protected – by a third-party product such as SenderID, you must allow Altinn/Digitaliseringsdirektoratet as message producer.
{{% /notice %}}

#### customEmail

| Field | Type | Required | Description |
|---|---|---|---|
| subject | CustomText | Yes | Custom subject in nb, nn and en. |
| body | CustomText | Yes | Custom body text in nb, nn and en. |

#### CustomText

| Field | Type | Required | Description |
|---|---|---|---|
| nb | string | Yes | Text in Norwegian Bokmål. |
| nn | string | Yes | Text in Norwegian Nynorsk. |
| en | string | Yes | Text in English. |

#### reminders (list of reminder objects)

{{% notice warning %}}
You need Maskinporten to be able to cancel reminders.
{{% /notice %}}

Each object in the `reminders` list can contain these fields:

| Field | Type | Required | Description |
|---|---|---|---|
| requestedSendTime | string (datetime) | No | Earliest time for sending the reminder (ISO 8601, UTC). You cannot combine the field with `sendAfterDays`. Maximum delay is 30 days. |
| sendAfterDays | int | No | Number of days from the initial notification until the reminder goes out. You cannot combine the field with `requestedSendTime`. Maximum delay is 30 days. |
| customSms | object | No | Overrides the SMS text from the initial notification for this reminder. |
| customEmail | object | No | Overrides the email text from the initial notification for this reminder. |

If you set neither `requestedSendTime` nor `sendAfterDays`, the reminder goes out as soon as possible after Altinn has processed the initial notification.

If you do not provide custom texts on the reminder, the reminder inherits the texts from the initial notification.

### Channel selection (notificationChannel)

Note that `notificationChannel` is an integer enum, not a string. Valid values are:

| Value | Channel | Description |
|---|---|---|
| 0 | Email | Email only |
| 1 | Sms | SMS only |
| 2 | EmailPreferred | Email first, SMS as fallback if the recipient has no email address |
| 3 | SmsPreferred | SMS first, email as fallback if the recipient has no phone number |
| 4 | EmailAndSms | Both email and SMS at the same time (default) |

### Language

For individuals, Altinn retrieves the language automatically from their profile.

For organisations, the language you provide in the instantiation request applies (the `language` field in the `notification` object), with Norwegian Bokmål as fallback.

### Send time

By default, notifications only go out during working hours. If you want to allow sending at any time of day, set `allowSendingAfterWorkHours` to `true`. This applies to both email and SMS.

### Scheduled send time

If you set `requestedSendTime`, the notification goes out at that time at the earliest. In addition, Altinn Notifications calls back to the app just before sending to confirm that the notification is still relevant. The app can then reject the send if the state has changed – for example if the end user has already submitted the instance.

If you do not set `requestedSendTime`, the notification goes out as soon as possible, typically within a few minutes.

### Custom logic for cancelling the notification

When you set `requestedSendTime`, Altinn Notifications calls back to the app before each notification and each reminder. By default, the notification only goes out if the process has not ended – that is, the instance is still active and awaiting a response from the end user.

You can override this behaviour: write a class that uses the `ICancelInstantiationNotification` interface, and register the class in the DI container.

```csharp
public class MyNotificationCancellation : ICancelInstantiationNotification
{
    public bool ShouldSend(Instance instance)
    {
        // Custom logic here, for example:
        // Only send the notification if the instance is not archived
        return instance.Status?.IsArchived is not true;
    }
}
```

Register the class in `Program.cs`:

```csharp
services.AddTransient<ICancelInstantiationNotification, MyNotificationCancellation>();
```

### Default texts

If you do not provide custom texts, Altinn uses default texts.

Example of a received email with default text:

**Subject:** New form created in Altinn

**Body:** The Norwegian Test Department has created a new form (notification-instantiation-ttd) for ASTROLOG NÆR with social security number 54928201018 - open your Altinn inbox to view the form.

### Custom texts and tokens

Custom texts support these tokens, which Altinn replaces dynamically:

| Token | Description |
|---|---|
| `$appName$`| The name of the app, from the app metadata |
| `$instanceOwnerName$` | The name of the instance owner |
| `$serviceOwnerName$` | The name of the service owner, from the Altinn CDN |
| `$orgNumber$` | Organisation number (if the instance owner is an organisation) |
| `$socialSecurityNumber$` | Social security number (if the instance owner is an individual) |
| `$dueDate$` | The due date of the instance (format: `dd-MM-yyyy HH:mm:ss`) |

{{% notice warning %}}
Custom texts combined with a due date (`dueBefore`) on the instance require timezone support in the container image. Without it, no notifications go out. See [Prerequisites](#prerequisites).
{{% /notice %}}

### How Altinn finds the recipient addresses

Altinn Notifications finds the addresses itself, based on Altinn Profile for individuals and the Central Coordinating Register for Legal Entities for organisations.

In test environments you can change your own contact details at
<https://tt02.altinn.no/ui/Profile>.

To test SMS in a test environment, the number must be allowlisted. Get in touch if you need this.

## Examples

Each example below shows both endpoints:

- **`POST /{org}/{app}/instances/create`** – simplified endpoint where the entire body is a single JSON object.
- **`POST /{org}/{app}/instances`** – multipart endpoint where `notification` must be a separate multipart part with `name="notification"` and `Content-Type: application/json`. If you put `notification` as a field inside the instance template part, the field is silently ignored.

### Simple example of instance creation with notification

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/my-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "personNumber": "54928201018"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0
}
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Example with custom texts

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/my-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "personNumber": "54928201018"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
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
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Example with scheduled send time and sending outside working hours

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/my-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "personNumber": "54928201018"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0,
  "requestedSendTime": "2025-12-01T09:00:00Z",
  "allowSendingAfterWorkHours": true
}
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Example with reminders

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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
        "requestedSendTime": "2025-12-15T12:30:00Z",
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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/my-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "personNumber": "54928201018"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0,
  "requestedSendTime": "2025-12-01T09:00:00Z",
  "reminders": [
    {
      "sendAfterDays": 7
    },
    {
      "requestedSendTime": "2025-12-15T12:30:00Z",
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
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Self-identified users

#### ID-porten email user

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

```json
{
  "instanceOwner": {
    "externalIdentifier": "urn:altinn:person:idporten-email:jens.jensen@digdir.no"
  },
  "notification": {
    "notificationChannel": 0
  }
}
```

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/my-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "externalIdentifier": "urn:altinn:person:idporten-email:jens.jensen@digdir.no"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0
}
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

#### Legacy username and password

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/my-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "externalIdentifier": "urn:altinn:person:legacy-selfidentified:jensjensen"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0
}
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}
