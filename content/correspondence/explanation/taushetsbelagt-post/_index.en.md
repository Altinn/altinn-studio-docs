---
title: Confidential correspondences
linktitle: Confidential correspondences
description: Overview of confidential correspondence ("taushetsbelagt post") in Altinn 3.
tags: []
toc: true
weight: 14
hidden: true
---

## What is Confidential information in Altinn?

Confidential information is a messaging service designed to send particularly sensitive information (for example, regarding individuals involved in criminal cases or child welfare cases). Only those who are responsible for processing such sensitive information should have access to read it. Therefore, the access control for confidential information is stricter than for other messaging services. Note that the message will be invisible in the recipient's inbox until someone has been granted access (through an individual services or a role/access package).


### No one is automatically granted access to confidential information

For other types of messages sent via Altinn, most key roles registered in the Register of Business Enterprises at the Brønnøysund Register Centre are automatically granted read access.

These key roles are:
- General Manager (Daglig leder)
- Chair of the Board (Styreleder)
- Sole Proprietor (Innehaver)
- Managing Shipowner (Bestyrende reder)
- Partner with unlimited liability registered with a national ID number (FNR)
- Partner with limited liability registered with a national ID number (FNR)
- Norwegian representative for a foreign entity


Note that for confidential information, access is not automatically granted to key roles within the organization (such as the general manager). This is because only employees with a professional need should be able to read sensitive messages (from for example, general practitioners, child welfare services, or the police).

All key roles are automatically assigned as Main Administrator in Altinn. The Main Administrator can delegate all access rights in Altinn and must specifically delegate access to confidential information for anyone to be able to read such messages.
Important: The person who is Main Administrator will not be able to view or read confidential messages unless they grant access to themselves.


### Access management

Since no one is automatically granted access to confidential messages, the Main Administrator must assign access rights to the person who will distribute, or process, confidential information within the organization. In some cases, the Main Administrator may need to grant access to themselves — for instance, if they are responsible for distributing the Correspondence internally or if they will be handling the case personally.

It is important that service owners who send confidential information are aware of this, and that any notifications sent via SMS and/or email include information on how the recipient can gain access to the message.


## Requirements for confidential information

To ensure the appropriate person within the recipient organization gains access to the confidential message, it is essential that the sender adapts the message content in a way that makes it clear what the message is about and who at the recipient organization should have access.

For example, this can be done by using clear and specific wording in the MessageTitle field. Use the name of the correct recipient (e.g. the case officer) if known, or alternatively use a case number or other information that links the message to the appropriate person in the organization.


## Notification requirements 

When a message containing confidential content is created, the receiving organization MUST be notified using the `Notification` feature, to ensure they are made aware that a confidential message has been received in their inbox.
(Note that the correspondence will be invisible in the recipient's inbox unless someone in the organization has been granted access through an individual right or role/access package.)

The notification must include information stating that the message is confidential, along with instructions on what the organization must do to ensure the correct person gets access. Therefor the notification should include:
- What the message is about (without disclosing personal data)
- Who should receive the message
- Which specific service must be delegated to provide access, etc.

We strongly recommend that the notification text is tailored to the content of the message if possible.
If not, we recommend the following standard notification text:

{{% notice warning  %}}
`$recipientName$` `$recipientNumber$`  has received a confidential message: `messageTitle` from `$sendersName$`. To access the message, someone in `$recipientName$` must be granted access to `Navn på tjenesten` in Altinn. The message will not be visible before someone is granted access. Read more about confidential information on Altinn’s website.
{{% /notice %}}

#### Upcoming functionality
Altinn is considering a solution where a separate message (Correspondence) is sent as a reminder to those with the role or access package "Mail/Archive". This message will contain the same information as a notification – that the organization has an unopened confidential message. The reminder will be sent to the organization’s inbox after 7 days if the confidential message has not been opened.
