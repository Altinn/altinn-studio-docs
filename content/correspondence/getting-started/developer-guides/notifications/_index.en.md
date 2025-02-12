---
title: Notifications in Altinn 3 Correspondence
linktitle: Notifications in Correspondence
description: How to get started with Notifications in Altinn 3 Correspondence, for developers
tags: [Correspondence, guide, events]
toc: true
weight: 40
---

{{<children />}}


To use notifications in Altinn Correspondence, a notification order is placed when a message is created.
The notification will primarily be sent out at the publication time of the message.
If a reminder is activated, the reminder will be sent after 7 days if the message has not been read.
In the test and staging environment, the reminder will be sent out after 1 hour if the message has not been read.

Notifications can be sent via either email or SMS. While email does not have a time window, SMS notifications are sent between 9:00 AM and 5:00 PM.
If the sending time falls outside this window, the notification will be sent the following day.
{{% notice warning  %}}
In the test environment, Notifications via SMS can only be sent to phone numbers that are whitelisted internally.
Contact us at [Altinn@Slack#produkt-melding](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog) if this is required for your service.
{{% /notice %}}

A notification order is made by adding the following when initializing a message:

```json
{
  "Correspondence": {
    ...,
    "notification": {
      "notificationTemplate": CustomText (0) | GenericAltinnMessage(1),
      "notificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3),
      "SendReminder": boolean,
      "EmailBody": string?,
      "EmailSubject": string?,
      "SmsBody": string?,
      "ReminderNotificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3),
      "ReminderEmailBody": string?,
      "ReminderEmailSubject": string?,
      "ReminderSmsBody": string?
    }
  },
  "Recipients": [],
  "ExistingAttachments":{...}
}
```

## Keyword support

Keywords is a list of tokens which enable personalization in notifications. These will be automaticly supplied with text by Altinn.

| Value                 | Description                                                                                                                           | Extra                                                                                    |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------- |-------------------------------------------------------------------------------------------|
| \$sendersName\$       | Will be supplied with the senders name. Either by the "MessageSender" attribute if it has value, or by a lookup in Altinn Register.   | Supported for all scenarios                                                               |
| \$recipientName\$     | Will be supplied with the recipients name, which will be either det organizations name or a persons name                              | Supported for all scenarios                                                               |
| \$recipientNumber\$   | If the recipient is a organization, it will be supplied with the organization number, otherwise it will be left empty                 | Is not supported when notifications is sent directly to an email adress or a phone number |

## Notification Templates

Two types of notification templates are offered when using notifications through the Correspondence API.

**CustomText:**

- The entire message is written by the sender and sent in full to the recipient.

**GenericAltinnMessage:**

A generic Altinn text with the option to supplement with additional text. Currently supported languages are Norwegian, Nynorsk, and English.
The language is chosen based on the language defined in the message.

**Title:** You have received a message in Altinn {textToken}<br>
**Content:** Hello \$recipientName\$, you have received a new message from \$sendersName\$. {textToken} Log in to Altinn to see this message.

**Reminder Title:** Reminder - you have received a message in Altinn {textToken}<br>
**Reminder Content:** Hello \$recipientName\$, this is a reminder that you have received a new message from \$sendersName\$. {textToken} Log in to Altinn to see this message.

In the text, textToken will be replaced with the value given in, for example, "EmailSubject" for the title. SMS uses only the content, not the title.

Note! Links should NEVER be used in notifications.

## Notification Channels

Supported notification channels:

- **Email:** Sends an email to the recipient.
- **SMS:** Sends an SMS to the recipient. Supports both national and international phone numbers.
- **EmailPreferred:** Uses email as the main communication channel, and SMS as a fallback if email is not available.
- **SmsPreferred:** Uses SMS as the main communication channel, and email as a fallback if SMS is not available.
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
However, it is also possible to choose optional recipients of the notification that are not necessarily the recipient(s) of the correspondence. 
In practice this means that custom recipients will override/replace the original recipient provided for the notification.
This can be achieved by populating the `customNotificationRecipients` field under `notification` as follows:

```json
{
  "notification": {
    ...,
    "customNotificationRecipients": [
      {
        "recipientToOverride": "string",
        "notificationRecipient": [
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

### How to use it
```
correspondence.notification.customNotificationRecipients[0].recipientToOverride
correspondence.notification.customNotificationRecipients[0].recipients[0].organizationNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].nationalIdentityNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].mobileNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].emailAddress
```

{{% panel theme="warning" %}}
⚠️ IMPORTANT: 
Keep in mind the value that is given to `notificationTemplate` and `notificationChannel`, as these will impact the custom recipient. Further details are provided [here](#notification-templates).
{{% /panel %}}


### Explanation of template and channel

For each of the optional recipients, they must override an existing recipient in the `Correspondence.Recipients` list.
This value corresponds to either the organization number or national identity number of the recipient for the correspondence.

Furthermore, it is only possible to provide one of the following fields for the recipient

1. Organization number
2. National identity number
3. Mobile number and/or email address

Lastly, if either mobile number or email address is used, they must follow the correct format in order to be able to send the notifications.
For emails, most of the values are accepted as long as they are on the form 'user@example.com'.
For mobile numbers, they must satisfy the _E.164 format_.

{{% panel theme="warning" %}}
⚠️ IMPORTANT: In order to use custom recipients for notifications, they must __all__ be valid. 
Without valid recipients, the correspondence will not be sent out.

Therefore, it is recommended to only use this feature if it is critical for the service. 
For large dispatches of correspondences these should be made without custom recipients.
{{% /panel %}}
