---
title: Notifications in Altinn 3 Correspondence
linktitle: Notifications
description: How to get started with Notifications in Altinn 3 Correspondence, for developers
tags: [Correspondence, guide, events]
toc: true
weight: 40
---

{{<children />}}


To use notifications in Altinn Correspondence, a notification order is placed when a message is created.
The notification will be sent out 5 minutes after the publication time of the message. If the publication time is in the past, the notification will be sent 5 minutes after the current time.
If a reminder is activated, the reminder will be sent after 7 days if the message has not been read.
In the test and staging environment, the reminder will be sent out after 1 day if the message has not been read.

{{% notice info %}}
Note: The reminder timing in test and staging environments is currently set to 1 day due to limitations in the notification service. This is a temporary change, and work is in progress to restore the previous 1-hour delay.
{{% /notice %}}

Notifications can be sent via either email or SMS. While email does not have a time window, SMS notifications are sent between 9:00 AM and 5:00 PM.
If the sending time falls outside this window, the notification will be sent the following day.
{{% notice warning  %}}
In the test environment, you can only send SMS notifications to whitelisted phone numbers.  
Send an email to [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no?subject=Whitelist%20phone%20number) with the phone number that needs to be whitelisted.
{{% /notice %}}

A notification order is made by adding the following when initializing a message:

```json
{
  "correspondence": {
    ...,
    "notification": {
      "notificationTemplate": CustomMessage (0) | GenericAltinnMessage(1),
      "notificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3) | EmailAndSms(4),
      "sendReminder": boolean,
      "emailBody": string?,
      "emailSubject": string?,
      "emailContentType": Plain(0) | Html(1),
      "smsBody": string?,
      "reminderNotificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3) | EmailAndSms(4),
      "reminderEmailBody": string?,
      "reminderEmailSubject": string?,
      "reminderEmailContentType": Plain(0) | Html(1),
      "reminderSmsBody": string?,
      "requestedSendTime": DateTimeOffset?,
      "customRecipients": [
        {
          "organizationNumber": string?,
          "nationalIdentityNumber": string?,
          "mobileNumber": string?,
          "emailAddress": string?
        }
      ],
      "overrideRegisteredContactInformation": boolean
    }
  },
  "Recipients": [],
  "ExistingAttachments":{...}
}
```

## Field Validation and Character Limits

When creating notifications, the following validation rules and character limits apply. These limits are recommended by the Altinn Notifications service to ensure proper display and delivery:

| Field | Maximum Length | Description |
|-------|---------------|-------------|
| `emailSubject` | 128 characters | Recommended by Altinn Notifications service to ensure the email subject is displayed correctly in email clients |
| `emailBody` | 10,000 characters | Supports detailed content in both plain text and HTML format |
| `smsBody` | 2,144 characters | Aligns with the Altinn Notifications service SMS processing limits. Equivalent to 16 SMS segments (16 × 134 characters per segment) |
| `reminderEmailSubject` | 128 characters | Same recommendation as main email subject |
| `reminderEmailBody` | 10,000 characters | Supports detailed content in both plain text and HTML format |
| `reminderSmsBody` | 2,144 characters | Same limit as main SMS body |

**Note:** If you exceed these limits, you will receive a `400 Bad Request` error response with details about which field exceeded the limit.

## Keyword support

Keywords is a list of tokens which enable personalization in notifications. These will be automaticly supplied with text by Altinn.

| Value                           | Description                                                                                                                           | Extra                                                                                     |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------- |-------------------------------------------------------------------------------------------|
| \$sendersName\$                 | Will be supplied with the senders name. Either by the "MessageSender" attribute if it has value, or by a lookup in Altinn Register.   | Supported for all scenarios                                                               |
| \$correspondenceRecipientName\$ | Will be supplied with the correspondence recipient's name, which will be either the organization's name or a person's name            | Supported for all scenarios                                                               |
| \$recipientName\$               | Will be supplied with the notification recipient's name, which will be either the organization's name or a person's name              | Is not supported when notifications is sent directly to an email adress or a phone number |
| \$recipientNumber\$             | If the recipient is a organization, it will be supplied with the organization number, otherwise it will be left empty                 | Is not supported when notifications is sent directly to an email adress or a phone number |

## Notification Templates

Two types of notification templates are offered when using notifications through the Correspondence API.

**CustomText:**

- The entire message is written by the sender and sent in full to the recipient.

**GenericAltinnMessage:**

A generic Altinn text with the option to supplement with additional text. Currently supported languages are Norwegian, Nynorsk, and English.
The language is chosen based on the language defined in the message.

**Title:** A message has been received in Altinn {textToken}<br>
**Content:** Hello. $correspondenceRecipientName$ has received a new message from $sendersName$. {textToken} Log in to Altinn to see this message.

**Reminder Title:** Reminder - a message has been received in Altinn {textToken}<br>
**Reminder Content:** Hello. This is a reminder that $correspondenceRecipientName$ has received a new message from $sendersName$. {textToken} Log in to Altinn to see this message.

In the text, textToken will be replaced with the value given in, for example, "EmailSubject" for the title. SMS uses only the content, not the title.

Note! Links should NEVER be used in notifications.

## Notification Channels

Supported notification channels:

- **Email:** Sends an email to the recipient.
- **SMS:** Sends an SMS to the recipient. Supports both national and international phone numbers.
- **EmailPreferred:** Uses email as the main communication channel, and SMS as a fallback if email is not available.
- **SmsPreferred:** Uses SMS as the main communication channel, and email as a fallback if SMS is not available.
- **EmailAndSms:** Sends both email and SMS to the recipient simultaneously.
  The first notification and the reminder notification can use different notification channels. 
  For example, the first notification is sent by email, while the reminder notification seven days later is sent by SMS.

## Cancellation of Notification

If a message is deleted before the publication date, the notification order will also be deleted. 
In situations where an error occurs during the publication of a message, the notification will also be deleted.

## Errors in Notification Ordering

If no contact information is available for a recipient, the message will still be sent as planned.
Information about the notification can be viewed by retrieving the details about the specific correspondence.
Improvements are planned to provide feedback on this during the creation of a message.

## Custom recipients for Notifications

For all correspondences created with Notifications enabled, the notifications will be sent to the recipient specified in the creation of the correspondence.
However, it is also possible to choose additional recipients of the notification that are not necessarily the recipient(s) of the correspondence. 
In practice this means that custom recipients will receive notifications **in addition to** the original correspondence recipient.

### Using customRecipients (Recommended)
The recommended approach is to use the `customRecipients` field under `notification` to specify multiple recipients:

```json
{
  "notification": {
    ...,
    "customRecipients": [
      {
        "organizationNumber": "string",
        "nationalIdentityNumber": "string",
        "mobileNumber": "string",
        "emailAddress": "string"
      },
      {
        "organizationNumber": "string",
        "nationalIdentityNumber": "string",
        "mobileNumber": "string",
        "emailAddress": "string"
      }
    ]
  }
}
```

**Note**: Notifications will be sent to both the default correspondence recipient AND all custom recipients listed above.

{{% notice warning %}}
⚠️ DEPRECATED: The `customRecipient` field is deprecated and will be removed in a future version. Please use `customRecipients` instead.
{{% /notice %}}

### Using customRecipient (Deprecated)
For backward compatibility, you can still use the `customRecipient` field for a single recipient:

```json
{
  "notification": {
    ...,
    "customRecipient": {
      "organizationNumber": "string",
      "nationalIdentityNumber": "string",
      "mobileNumber": "string",
      "emailAddress": "string"
    }
  }
}
```

{{% notice warning %}}
⚠️ DEPRECATED: The `customNotificationRecipients` field is deprecated and will be removed in a future version. Please use `customRecipients` instead.
{{% /notice %}}

### Using customNotificationRecipients (Deprecated)
This can be achieved by populating the `customNotificationRecipients` field under `notification` as follows:

```json
{
  "notification": {
    ...,
    "customNotificationRecipients": [
      {
        "recipientToOverride": "string",
        "recipients": [
          {
            "organizationNumber": "string",
            "nationalIdentityNumber": "string",
            "mobileNumber": "string",
            "emailAddress": "string"
          }
        ]
      }
    ]
  }
}
```

### Validation Rules for Custom Recipients

When using custom recipients, the following validation rules apply:

1. **Additional Recipients**: Custom recipients are sent notifications **in addition to** the default correspondence recipient, not instead of them.

2. **Single Recipient Only**: If custom recipients are specified, the correspondence must have only one default recipient (not multiple recipients).

3. **Single Identifier Required**: Each custom recipient must have exactly one identifier field populated:
   - `organizationNumber` (for organizations)
   - `nationalIdentityNumber` (for persons)
   - `emailAddress` (for direct email notifications)
   - `mobileNumber` (for direct SMS notifications)

4. **Keyword Restrictions**: When using `emailAddress` or `mobileNumber`, the `$recipientName$` keyword cannot be used in any notification content (email subject, email body, SMS body, reminder fields) because name lookup is not available for direct contact information.

5. **Format Validation**:
   - **Email addresses**: Must be in valid email format (e.g., `user@example.com`)
   - **Mobile numbers**: Must adhere to E.164 standard and be valid phone numbers. Can start with `+` or `00` for international format. Norwegian numbers starting with 4 or 9 will automatically get `+47` prefix if no country code is provided.
   - **Organization Numbers**: Must be in format `0192:organizationnumber` or `urn:altinn:organizationnumber:organizationnumber`
   - **National Identity Numbers**: Must be valid 11-digit Norwegian social security numbers

### How to use it
For recommended approach (multiple recipients):
```
correspondence.notification.customRecipients[0].organizationNumber
correspondence.notification.customRecipients[0].nationalIdentityNumber
correspondence.notification.customRecipients[0].mobileNumber
correspondence.notification.customRecipients[0].emailAddress
correspondence.notification.customRecipients[1].organizationNumber
// ... additional recipients
```

For deprecated single recipient approach:
```
correspondence.notification.customRecipient.organizationNumber
correspondence.notification.customRecipient.nationalIdentityNumber
correspondence.notification.customRecipient.mobileNumber
correspondence.notification.customRecipient.emailAddress
```

For deprecated multiple recipients approach:
```
correspondence.notification.customNotificationRecipients[0].recipientToOverride
correspondence.notification.customNotificationRecipients[0].recipients[0].organizationNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].nationalIdentityNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].mobileNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].emailAddress
```

{{% panel theme="warning" %}}
⚠️ IMPORTANT: 
Both `notificationTemplate` and `notificationChannel` are applicable when using custom recipients:

- **`notificationTemplate`**: Determines the content (email subject, body, SMS body) that will be sent to the custom recipient
- **`notificationChannel`**: For organization and person custom recipient, this determines the channel(s) the notification(s) are sent to. For direct email/mobile custom recipients, the channel is not applicable any more.

Further details are provided [here](#notification-templates).
{{% /panel %}}

## Override Default Recipient Behavior

By default, when using custom recipients, notifications are sent to both the default correspondence recipient AND all custom recipients. However, you can override this behavior using the `overrideRegisteredContactInformation` flag.

### Using overrideRegisteredContactInformation

The `overrideRegisteredContactInformation` flag allows you to control whether the default correspondence recipient should be included in notifications:

```json
{
  "notification": {
    ...,
    "customRecipients": [
      {
        "organizationNumber": "string",
        "nationalIdentityNumber": "string",
        "mobileNumber": "string",
        "emailAddress": "string"
      }
    ],
    "overrideRegisteredContactInformation": true
  }
}
```

### Behavior

- **`overrideRegisteredContactInformation: false` (default)**: Notifications are sent to the default correspondence recipient AND all custom recipients
- **`overrideRegisteredContactInformation: true`**: Notifications are sent ONLY to custom recipients (default correspondence recipient is excluded)

### Validation Rules

1. **Custom Recipients Required**: The `overrideRegisteredContactInformation` flag can only be set to `true` when `customRecipients` is provided and not empty
2. **Default Value**: If not specified, `overrideRegisteredContactInformation` defaults to `false`

### Example Use Cases

**Scenario 1: Additional Recipients (Default Behavior)**
```json
{
  "notification": {
    "customRecipients": [{"organizationNumber": "123456789"}],
    "overrideRegisteredContactInformation": false
  }
}
```
Result: Notifications sent to both the default correspondence recipient AND the custom organization

**Scenario 2: Override Default Recipient**
```json
{
  "notification": {
    "customRecipients": [{"organizationNumber": "123456789"}],
    "overrideRegisteredContactInformation": true
  }
}
```
Result: Notifications sent ONLY to the custom organization (default correspondence recipient excluded)


