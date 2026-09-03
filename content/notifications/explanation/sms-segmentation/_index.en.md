---
title: SMS segmentation
description: "Long SMS messages are automatically split into several segments so they can be delivered. This article explains how SMS segmentation works, how the characters in a message determine the number of segments, and what this means for the cost."
linktitle: SMS segmentation
tags: [sms, segmentation, character limit]
weight: 40
---

## Introduction

An SMS can only hold a limited number of characters. When you send a longer message through Altinn Notifications, it is automatically split into several parts, called segments. The recipient still sees a single, continuous message, because the phone reassembles the segments.

It is useful to understand how this splitting works, because each segment is counted and charged as a separate SMS. A message that looks short can still become several segments if it contains certain characters. The characters you use therefore affect both the cost and how much text there is room for.

## The character encoding determines the segment length

How many characters fit in each segment depends on how the text is encoded. An SMS is sent in one of two ways, and the receiving phone chooses automatically based on which characters the message contains:

- **GSM-7** is the standard alphabet for SMS. It covers ordinary letters, numbers and punctuation, and **the Norwegian letters æ, ø and å** (including capitals). As long as the message only uses characters from this alphabet, there is plenty of room in each segment.
- **UCS-2** is used when the message contains at least one character that is not in the GSM-7 alphabet, for example an emoji or a non-Latin character. The whole message is then encoded in a way that takes more space, leaving room for far fewer characters per segment.

A single character outside the GSM-7 alphabet is enough to switch the whole message to UCS-2. This more than halves the available space, as the table below shows.

## How many characters fit

| Character encoding | Single message | Per segment in a split message |
|--------------------|----------------|--------------------------------|
| GSM-7 (ordinary text, including æ, ø, å) | 160 characters | 153 characters |
| UCS-2 (emoji, typographic characters, non-Latin characters) | 70 characters | 67 characters |

When a message has to be split, part of the space in each segment is used for joining information, that is, the data the phone needs to put the segments back together in the right order. Each segment therefore holds slightly less than a single message: 153 characters with GSM-7 and 67 characters with UCS-2.

### Characters that count double in GSM-7

Some characters are part of GSM-7, but live in a separate extension table, and each of them counts as **two** characters:

- `^ { } \ [ ] ~ |`
- `€` (the euro sign)

If you use several curly brackets or euro signs, for example, the message fills up faster than the number of visible characters suggests.

## Number of segments and upper limit

A message can become up to **16 segments** in Altinn Notifications. How much text this allows in total depends on the character encoding:

- With **GSM-7**, the upper limit is 16 × 153 characters.
- With **UCS-2**, the upper limit is 16 × 67 characters.

There is therefore no single fixed cap on the number of characters. The cap depends on which characters the message contains. A message with only ordinary text fits far more than a message with an emoji or other special characters.

Messages longer than 16 segments are truncated. The full text then does not reach the recipient, so it is important to keep long messages within the limit.

## Example: one character can double the cost

Imagine a 70-character message that uses only ordinary letters:

- Written as ordinary text (GSM-7), it fits in **one** SMS, since the limit is 160 characters. You pay for one segment.
- Replace the straight quotation mark `"` with a typographic one (`"` or `"`), or add a single emoji, and the whole message switches to UCS-2. The limit for a single message is then 70 characters, and a 70-character message fills it exactly. Add a little more text and it splits into **two** segments of 67 characters each, and you pay for two.

A single "smart" quotation mark, a dash (– or —) or an emoji can therefore move the message from GSM-7 to UCS-2 and more than double the number of segments, and with it the cost.

## Advice for keeping costs down

To avoid messages becoming more expensive or longer than necessary:

- keep messages short. The shorter the text, the greater the chance it fits in a single segment
- be careful with emoji and typographic characters. A single such character can halve the available space and double the cost
- watch which quotation marks and dashes you paste in. Characters from word processors are often typographic variants that trigger UCS-2. Use the straight `"` and the hyphen `-` instead
- keep long messages within 16 segments. Text beyond the limit is truncated and does not arrive
- consider email for longer content. SMS is best suited to short messages
