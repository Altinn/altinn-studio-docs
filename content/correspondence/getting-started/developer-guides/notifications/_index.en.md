---
title: Altinn 3 Correspondence Developer guides
linktitle: Notifications in Correspondence
description: How to get started with Notifications in Altinn 3 Correspondence, for developers
tags: [Correspondence, guide, events]
toc: true
weight: 40
---

{{<children />}}

{{% notice warning  %}}
This section of the documentation is a work in progress and currently makes extensive reference to external sources.
{{% /notice %}}

{{% notice warning  %}}
Currently, the Events for Correspondence are not ready for full-scale use due to pending changes in Altinn Events and Authorization.
This documents the expected scenario, but may be subject to change.
{{% /notice %}}

To use notifications in Altinn Correspondence, a notification order is placed when a message is created. The notification will primarily be sent out at the publication time of the message. If a reminder is activated, the reminder will be sent after 7 days if the message has not been read. In the test and staging environment, the reminder will be sent out after 1 hour if the message has not been read.

Notifications can be sent via either email or SMS. While email does not have a time window, SMS notifications are sent between 9:00 AM and 5:00 PM. If the sending time falls outside this window, the notification will be sent the following day.
{{% notice warning  %}}
In the test environment, Notifications via SMS can only be sent to phone numbers that are whitelisted internally. Contact us at [Altinn@Slack#produkt-melding](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog) if this is required for your service.
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
A list of keywords will soon be implemented in Altinn Notifications, but it is not available yet.
This feature will allow you to incorporate keywords into the text, such as \$sendersName\$ to display the name of the organization that sent the correspondence,
or \$recipientName\$ to use the name of the individual or organization receiving the correspondence. Further details will be provided when it is ready.

## Notification Templates
Two types of notification templates are offered when using notifications through the Correspondence API.
{{% notice warning  %}}
NOTE: These templates are not the final version and will change, especially when keywords are ready.
{{% /notice %}}

**CustomText:**

- The entire message is written by the sender and sent in full to the recipient.

**GenericAltinnMessage:**

A generic Altinn text with the option to supplement with additional text. Currently supported languages are Norwegian, Nynorsk, and English. The language is chosen based on the language defined in the message.

**Title:** You have received a message in Altinn {textToken}<br>
**Content:** Hello \$recipientName\$, you have received a new message in Altinn from \$sendersName\$. {textToken} Log in to Altinn inbox to see this message.

**Reminder Title:** Reminder - you have received a message in Altinn {textToken}<br>
**Reminder Content:** Hello \$recipientName\$, this is a reminder that you have received a new message in Altinn from \$sendersName\$. {textToken} Log in to Altinn inbox to see this message.

In the text, textToken will be replaced with the value given in, for example, "EmailSubject" for the title. SMS uses only the content, not the title.

Note! Links should NEVER be used in notifications.

## Notification Channels 
Supported notification channels:

- **Email:** Sends an email to the recipient.
- **SMS:** Sends an SMS to the recipient. Supports both national and international phone numbers.
- **EmailPreferred:** Uses email as the main communication channel, and SMS as a fallback if email is not available.
- **SmsPreferred:** Uses SMS as the main communication channel, and email as a fallback if SMS is not available.
The first notification and the reminder notification can use different notification channels. For example, the first notification is sent by email, while the reminder notification seven days later is sent by SMS.
## Cancellation of Notification
If a message is deleted before the publication date, the notification order will also be deleted. In situations where an error occurs during the publication of a message, the notification will also be deleted.

## Errors in Notification Ordering
If no contact information is available for a recipient, the message will still be sent as planned. Information about the notification can be viewed by retrieving the details about the specific correspondence. Improvements are planned to provide feedback on this during the creation of a message.
