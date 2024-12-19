---
title: Send notifications
linktitle: Send notifications
description: Endpoint for sending a notification via a selected notification channel to one or more recipient.
weight: 50
toc: true
---

## Endpoint

POST /orders

## Authentication

This API requires authentication and the request must also include one of the following:

- Maskinporten scope __altinn:serviceowner/notifications.create__ (for external system callers)
- Platform Access Token (for Altinn Apps and internal Altinn systems)

See [Authentication and Authorization](/notifications/reference/api/#authentication--authorization) for more information.

## Request

### Content-type

application/json


### Request body
The request body must contain the order request formatted as an
[NotificationOrderRequestExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/NotificationOrderRequestExt.cs)
and serialized as JSON.


### Required order request properties

#### __notificationChannel__
Type: _enum_ _[NotificationChannelExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/NotificationChannelExt.cs)_

The notification channel to use when sending the notification.

#### recipients
Type: _List of [RecipientExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/RecipientExt.cs)_

A list containing one or more recipient objects, each recipient containing either
a national identity number, an organization number, an email address, or a mobile number.

#### emailTemplate*
Type: [EmailTemplateExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/EmailTemplateExt.cs)

The template property for the email notifications. 

#### smsTemplate*
Type: [SmsTemplateExt](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/SmsTemplateExt.cs)

The template property for the SMS notifications. 

\* required for certain notification channel

### Optional order request properties

#### requestedSendTime
Type: _DateTime_

Default: _Current date and time_

The date and time (with time zone specification) when the notification should be sent to recipient.

#### sendersReference
Type: _string_

An internal reference for notification creator to track the notification in
the future. Could be a case number or another identifier. It is recommended, but not required,
that the sender's reference is unique within the organization's notification orders.

#### resourceId
Type: _string_

The ID of the Altinn resource the notifications should be related to as the ID appears in the Altinn Resource Registry. 
For an Altinn app with ID _{org}/{app}_ the format of the resourceId is `app_{org}_{app}` e.g. app_ttd_apps-test.

#### ignoreReservation
Type: _boolean_

A boolean indicating whether the notification content satisfies the requirements for overriding KRR reservations
when sending notifications to an individual.

#### conditionEndpoint
Type: _Url_

The URL to use when checking whether the condition to send the notification is met.

## Response

### Response codes
- 202 Accepted: The request was accepted and a notification order has been successfully generated.
- 400 Bad Request: The request was invalid. Refer to the problem details in the response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates missing or invalid scope or Platform Access Token.

### Content-Type
- application/json

### Response body

The response body is formatted as an
[NotificationOrderRequestResponseExt.cs](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/NotificationOrderRequestResponseExt.cs)
and serialized as JSON.

Find a short description of each property below.

#### orderId
Type: _Globally Unique Identifier (GUID)_

The generated ID for the notification order.


#### recipientLookup\*
Type: [_RecipientLookupResultExt_](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Models/RecipientLookupResultExt.cs)

The result object describing the result of the recipient lookup containing the properties below.

  - _status_: the result of the initial lookup.
  - _isReserved_: a list containing national identity numbers for recipients that are reserved.
  - _missingContact_: a list containing national identity numbers and organization numbers for recipients where contact
    details for selected notification channel were not identified.


| Status         | Description                                               |
| -------------- | --------------------------------------------------------- |
| Success        | The recipient lookup was successful for all recipients.   |
| PartialSuccess | The recipient lookup was successful for some recipients.  |
| Failed         | The recipient lookup failed for all recipients.           |

\* property is only included if the order request requires recipient lookup.


### Response headers

#### Location
Type: _URL_

The self link for the generated notification order

## Examples
{{% notice info %}}
In the examples below we have included place holders for both the Platform Access and Altinn token.
__You only need one of them__, reference the [Authentication section](#authentication) for which one applies to your use case.
{{% /notice %}}

### Request
This example demonstrates sending a notification to two recipients, identified by their organization and national identity numbers.
The API first attempts to send an email to each recipient, as email is the preferred communication channel.
If an email address is unavailable for a recipient, the API automatically falls back to sending an SMS to that recipient.

```bash
curl --location 'https://platform.altinn.no/notifications/api/v1/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [INSERT ALTINN TOKEN]' \
--header 'PlatformAccessToken: [INSERT PLATFORM ACCESS TOKEN]' \
--data-raw '{
    "sendersReference": "9A547448-FDF4-4E60-87AC-C2F652C8353C",
    "emailTemplate": {
        "subject": "A test email from Altinn Notifications",
        "body": "A message to be sent immediately from an org.",
        "content-type": "Plain"
    },
    "smsTemplate": {
        "body": "Demo SMS content"
    },
    "notificationChannel": "emailPreferred",
    "recipients": [
        {"organizationNumber": "311000179"},
        {"nationalIdentityNumber": "11876995923"}
    ],
    "resourceId": "app_ttd_apps-test"
}'
```

### Request using keywords

You can use the following predefined, case-sensitive keywords to dynamically personalize the email body and subject:
- `$recipientName$`: Replaced with the full name of the recipient (supports both individuals and organizations).
- `$recipientNumber$`: Replaced with the organization number for recipients that are organizations. For individuals, this will remain empty.

These same predefined, case-sensitive keywords can also be used for dynamic personalization of the SMS text content.

This example demonstrates sending a customized notification to two recipients, identified by their organization numbers.
The API first attempts to send a customized SMS, as SMS is the preferred communication channel.
If a mobile number is unavailable for any recipient, the API automatically falls back to sending a customized email instead to that recipient.

```bash
curl --location 'https://platform.altinn.no/notifications/api/v1/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [INSERT ALTINN TOKEN]' \
--header 'PlatformAccessToken: [INSERT PLATFORM ACCESS TOKEN]' \
--data-raw '{
    "sendersReference": "586B753D-9A02-49C8-AC22-2060E3A7862F",
    "emailTemplate": {
        "subject": "Important notification regarding your organization, $recipientName$",
        "body": "Dear $recipientName$, this is an official notification regarding your organization, identified by the organization number $recipientNumber$. Please take the necessary actions.",
        "content-type": "Plain"
    },
    "smsTemplate": {
        "body": "Dear $recipientName$, this is an official notification regarding your organization, identified by the organization number $recipientNumber$. Please take the necessary actions."
    },
    "notificationChannel": "smsPreferred",
    "recipients": [
        {"organizationNumber": "311000179"},
        {"organizationNumber": "312508729"}
    ],
    "resourceId": "app_ttd_apps-test"
}'
```

### Response

#### 202 Accepted

In cases where reservation check or address lookup of recipients is required for an order,
the initial result of the lookup will be included in the response. This includes
a list containing national identity numbers for all reserved persons and a list containing national identity number
or organization number for the recipients we could not find contact details for.

Headers:

```bash
-- header 'Location: https://platform.altinn.no/notifications/api/v1/orders/f1a1cc30-197f-4f34-8304-006ce4945fd1'
```

Body:

```json
{
    "orderId": "f1a1cc30-197f-4f34-8304-006ce4945fd1",
    "recipientLookup": {
        "status": "PartialSuccess",
        "isReserved": ["11876995923"],
        "missingContact": []
    }
}
```

#### 400 Bad Request
Response contains a problem details object with the error message in the detail property.

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "NotificationChannel": [
      "A notification channel must be defined."
    ]
  },
  "traceId": "00-24d7cbf2a13f938741e8d2351d535556-2c30279c4891e50f-00"
}
```
