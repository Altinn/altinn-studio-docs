---
title: What do you get?
description: "Service owners and internal Altinn systems can send notifications to individuals in a personal capacity 
or a professional capacity through a role they have within an organization. 
The contact point for the recipient does not need to be known, as Altinn has access to a wide range of registries
to retrieve contact information given an organization number or a national identity number."
weight: 20
---

## Main Benefits

Altinn Notifications offers a robust and reliable service for communicating with end users through various channels. 

Key benefits include:

1. **Contact Details Lookup**: Retrieve up-to-date contact information from national registries.
2. **Role-Based Recipient Identification**: Altinn roles can be used to identify the correct recipients within an organization.
3. **Conditional Notifications**: Notifications can have send conditions related to the state of, or actions performed on,
external resources including Altinn App instances.
4. **API Access**: Programmatically send notifications and track delivery status via the Altinn Notifications API.

## Notification Channels

Currently supported channels:

- **Email**: Sends informational and formatted emails directly to users' inboxes.
- **SMS**: Sends concise and timely messages to users' mobile phones. Both national and international numbers.
- **EmailPreferred**: Uses email as the primary communication channel and SMS as a fallback if email contact details are missing.
- **SmsPreferred**: Uses SMS as the primary communication channel and email as a fallback if SMS contact details are missing.

### Future Improvements

Plans to expand notification channels to provide more flexibility and convenience. Future enhancements will support
a wider range of communication platforms, enabling organizations and end users to communicate through their preferred channels.

## SMS Notifications

Altinn SMS notifications ensure timely delivery of concise messages to users' mobile phones. Here are the key details:

### Send Window
Altinn sends SMS notifications daily between 9 AM and 5 PM (Norway time). 
Any SMS scheduled outside of these hours will be sent at 9 AM the following day.

Notification orders can be placed at any time. 

### Supported Recipient Numbers
- **Format**: Mobile numbers must include the country code, preferably with a "+", 
but "00" is also acceptable (e.g., +47900XXXXX, 0047900XXXXX).
- **Restrictions**: SMS to 5-digit numbers is not supported.
- **Norwegian Numbers**: Must start with "4" or "9" after the country code "+47."
  - Valid: +47400XXXXX, +47900XXXXX, 0047400XXXXX, 0047900XXXXX.
  - Invalid: +47500XXXXX, +47600XXXXX, 0047500XXXXX, 0047600XXXXX.
- **International Numbers**: Supported, provided they include a valid country code.

## Email Notifications

Altinn Email notifications allow for the delivery of both plain text and HTML content directly to users' inboxes. 

Here are the specifics:

### Content Types
- **Supported Formats**: Plain text and HTML content types are supported.

### Recipient Restrictions
- **Single Recipient**: Each email notification is sent to a single recipient.
- **Attachments**: Currently, email notifications do not support attachments.

## Recipient Lookup

Altinn provides recipient lookup functionality to determine contact details and reservation status 
using a national identity number or organization number. 

- **Timing**: Lookup occurs both at the time of order placement and at the scheduled send time.
- **Responsibility**: It is the responsibility of the entity ordering the notification to check the send status, 
as lookup results are shared in the order response and detailed in the notification post-sending.

[Read more about recipient lookup in the reference documentation.](../reference/send-notifications/recipient-lookup)

## Send Condition

The send condition feature allows notifications to be sent only if certain criteria are met, which can be evaluated immediately or in the future.

- **Use Case**: Ideal for scenarios like reminders where a notification is sent only if a user has not completed a required action.
- **Evaluation**: Conditions are checked by the application using the provided condition endpoint in the notification order.

[Read more about send conditions in the reference documentation.](../reference/send-notifications/send-condition)

