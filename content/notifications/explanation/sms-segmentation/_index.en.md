---
title: SMS Segmentation
description: "Altinn Notifications automatically splits long SMS messages into multiple segments to ensure delivery. This article explains how SMS segmentation works, which character limits apply, and what will and will not work when using the API."
linktitle: SMS Segmentation
tags: [sms, segmentation, character limit]
weight: 40
---

## Introduction

SMS messages have technical limitations on how many characters can be sent in a single message. When you send SMS via Altinn Notifications, the system automatically handles the splitting of long messages into multiple segments. This allows you to send longer texts without having to split them manually.

Understanding how segmentation works is important to ensure that your messages are delivered as expected and to avoid messages being rejected due to length limitations.

## How SMS segmentation works

SMS technology has two different modes for message length:

### Single message (up to 160 characters)

If your message is **160 characters or shorter**, it is sent as a single SMS. This is the most efficient way to send short messages.

### Concatenated messages (over 160 characters)

When the message is **longer than 160 characters**, it is automatically split into multiple segments that are sent separately and reassembled on the recipient's phone. Each segment in a concatenated message can contain **up to 134 characters**.

{{% notice info %}}
The reason segments are 134 characters instead of 160 characters is that some space is used for metadata that tells the recipient's phone how to reassemble the segments.
{{% /notice %}}

## Character limitations

Altinn Notifications has the following limitations for SMS messages:

- **Single message**: up to **160 characters**
- **Concatenated message**: up to **134 characters per segment**
- **Maximum number of segments**: **16 segments**
- **Maximum total length**: **2144 characters** (16 × 134 characters)

{{% notice warning %}}
The maximum limit of 16 segments is a limitation in the SMS gateway that Altinn Notifications uses. Messages that exceed this limit are truncated to the first 16 segments.
{{% /notice %}}

### Segmentation examples

| Message length | Number of segments | Description |
|----------------|-------------------|-------------|
| 50 characters | 1 | Sent as a single SMS |
| 160 characters | 1 | Sent as a single SMS (maximum length) |
| 161 characters | 2 | Split into 2 segments (134 + 27 characters) |
| 268 characters | 2 | Split into 2 segments (134 + 134 characters) |
| 269 characters | 3 | Split into 3 segments (134 + 134 + 1 character) |
| 2144 characters | 16 | Split into 16 segments (maximum length) |
| 2145 characters | 16 | Truncated to 16 segments (content shortened) |

## Special characters and URL encoding

When the system calculates message length, **URL-encoded length** is used. This means that certain special characters count as more than one character.

### Characters that affect length

The following types of characters can affect the actual length of the message:

- **Æ, Ø, Å** and other national special characters
- **Emojis** and other special symbols
- **Line breaks** and other control characters

### Practical example

```text
Original message: "Meeting at 14:00 🕐"
Character length: 20 characters
URL-encoded length: Can be significantly longer due to emoji
```

{{% notice info %}}
To be sure that your message does not exceed the limits, you should test with representative examples that contain the same types of special characters you plan to use.
{{% /notice %}}

## Limitations and what does not work

### What happens to messages over 2144 characters?

When a message (measured in URL-encoded length) exceeds 2144 characters:

- The message is **automatically truncated** to the first 16 segments (2144 characters)
- Content beyond this limit **is not sent**
- You receive **no error message** from the API indicating that the content has been truncated

{{% notice warning %}}
The API will not notify you that the message has been truncated. It is therefore essential to test message length in advance, especially if you are using many special characters.
{{% /notice %}}

### Recommendations

To ensure that your messages are delivered as expected:

1. **Keep messages short and concise** - under 160 characters if possible
2. **Avoid unnecessary emojis** - these can significantly increase the length
3. **Test with representative data** - use special characters similar to what you will use in production
4. **Plan for segmentation** - if you know the message will be long, ensure it still makes sense even when split up
5. **Consider alternative channels** - for longer messages, email may be a better choice

## How the API handles segmentation

When you send an SMS via the Altinn Notifications API:

1. **You send the entire message** - you do not need to split it yourself
2. **The system calculates the length** - based on URL-encoded length
3. **The system calculates the number of segments** - and limits to a maximum of 16 segments
4. **The system splits the message** - automatically into segments if necessary
5. **The message is sent** - segments are delivered to the SMS gateway

{{% notice warning %}}
If the URL-encoded length of the message requires more than 16 segments, only the first 16 segments (2144 characters) are sent. You receive no error message about this, so it is important to validate message length in advance.
{{% /notice %}}

{{% notice info %}}
You cannot control how the message is split into segments. The splitting happens automatically based on the character limits described in this article.
{{% /notice %}}
