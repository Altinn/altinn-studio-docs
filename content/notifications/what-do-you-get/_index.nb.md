---
title: What do you get?
description: "Service owners and internal Altinn systems can send customized notifications to individuals in a personal
or professional capacity through roles they hold within an organization.
The recipient's name and contact details do not need to be known upfront, as the Altinn Notifications API can retrieve
this information from national registries using the national identity number or organization number."
weight: 20
---

## Main Benefits
**Altinn Notifications** provides a robust and reliable service for communicating with end users across multiple channels. Key benefits include:
1. **Name Lookup**: Retrieve current names from national registries.
2. **Contact Details Lookup**: Retrieve current contact information from national registries.
3. **Authorization-Based Recipient Identification**: Use Altinn authorization to identify the correct recipients within an organization.
4. **Conditional Notifications**: Enable notifications that depend on the result of a condition check. NOTE: Notifications will request condition result from external system.
5. **API Access**: Programmatically send notifications and monitor their delivery status via the Altinn Notifications API.

## Notification Channels

Altinn Notifications supports the following communication channels:

- **Email**: Sends customized and formatted emails directly to users’ inboxes. 
- **SMS**: Delivers customized, concise, timely messages to users’ mobile phones, supporting both national and international numbers.
- **EmailPreferred**: Prioritizes email as the primary channel, with SMS as a fallback when email contact information is unavailable.
- **SmsPreferred**: Prioritizes SMS as the primary channel, with email as a fallback when SMS contact information is unavailable.

### Future Improvements

Altinn plans to expand its notification channels to include a broader range of communication platforms, offering even greater flexibility and convenience for organizations and users.

## SMS Notifications

Altinn SMS notifications ensure the timely delivery of concise messages to users’ mobile phones. Below are the key details:

### Send Window

- SMS notifications are sent daily between **9 AM and 5 PM (Norway time)**.
- Notifications scheduled outside this timeframe are sent at **9 AM the following day**.
- Notification orders can be placed at any time.

### Supported Recipient Numbers

- **Format**: Mobile numbers must include the country code, preferably with a "+" or "00" (e.g., +47900XXXXX, 0047900XXXXX).
- **Restrictions**: SMS notifications to 5-digit numbers are not supported.
- **Norwegian Numbers**: Must begin with "4" or "9" after the country code "+47."
  - Valid: +47400XXXXX, +47900XXXXX, 0047400XXXXX, 0047900XXXXX.
  - Invalid: +47500XXXXX, +47600XXXXX, 0047500XXXXX, 0047600XXXXX.
- **International Numbers**: Supported, as long as they include a valid country code.

## Email Notifications

Altinn Email notifications provide the capability to send plain text or HTML content directly to users’ inboxes.

### Content Types

- **Supported Formats**: Both plain text and HTML formats are supported.

### Recipient Restrictions

- **Single Recipient**: Each email notification is sent to one recipient.
- **Attachments**: Currently, email notifications do not support attachments.

## Recipient Lookup

Altinn offers recipient lookup functionality to determine names, contact details, and reservation status using a national identity number or organization number.

- **Timing**: Lookup occurs during order placement and again at the scheduled send time.
- **Responsibility**: It is the sender's responsibility to check the send status. Lookup results are provided in the order response and detailed in the finished notifications.

[Learn more about recipient lookup in the explanation documentation.](/notifications/explanation/recipient-lookup)

## Send Condition

The send condition feature ensures notifications are sent only when specific criteria are met. These conditions can be evaluated immediately or scheduled for future evaluation.

- **Use Case**: Ideal for scenarios like reminders, where a notification is sent only if a required action has not been completed.
- **Evaluation**: Conditions are checked by the application using the condition endpoint provided in the notification order.

[Learn more about send conditions in the explanation documentation.](/notifications/explanation/send-condition)
