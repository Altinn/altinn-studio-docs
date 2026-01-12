---
title: Placeholders in message templates
description: "Placeholders let you personalize notifications by replacing variables with recipient information."
linktitle: Placeholders
tags: [notifications, message templates, personalization]
weight: 35
---

Placeholders are variables that start and end with dollar signs (`$`). Add them to your message template, and Altinn replaces them by looking up the recipient in public registers (name/organisation number) when the notification is sent.

Example:
```
Hi $recipientName$, you have received a message.
```

This becomes:
```
Hi Ola Nordmann, you have received a message.
```

## Available placeholders

| Placeholder | Replaced with | When it can be used |
|-----------|----------------------|-------------------|
| `$recipientName$` | The recipient’s name (organisation or person) | For businesses or private individuals. Not when sending directly to an email address or phone number |
| `$recipientNumber$` | Organisation number if the recipient is a business. Empty for private individuals | For businesses. Not when sending directly to an email address or phone number |

## Where can you use placeholders?

You can use placeholders in:
- Email subject
- Email body
- SMS body

## Limitations

When you send directly to an email address or phone number (without national ID or organisation number), you cannot use placeholders. Altinn cannot look up names or organisation numbers for notifications sent directly to email or SMS.

## Examples

### Email

```json
{
  "emailSettings": {
    "subject": "Important information for $recipientName$",
    "body": "Hi $recipientName$,\n\nWe have an important update regarding your ID: $recipientNumber$.\n\nPlease review the details as soon as possible."
  }
}
```

### SMS

```json
{
  "smsSettings": {
    "body": "Hi $recipientName$. You have received a message. Log in to Altinn to read it."
  }
}
```

## Tips

- Test message templates before sending to many recipients
- If `$recipientNumber$` is empty (for individuals), the text can read oddly. Consider avoiding a direct reference to the number.
