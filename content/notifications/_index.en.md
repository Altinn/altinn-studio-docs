---
title: Notifications
description: Description of the notifications capabilities in Altinn 3.
toc: true
weight: 20
aliases:
  - /altinn-notifications/
---

{{% notice warning  %}}
This section of the documentation is a work in progress.
There are sub sections with missing and/or only partial documentation.
{{% /notice %}}

{{% notice info %}}
TODO: QA PO, devs
{{% /notice %}}

## Main benefits

Reasons to consider using Altinn Notifications for communication with Norwegian citizens or businesses

1. Contact information in national registries can be retrieved at send time based of
   organisation number or person identification number.
2. Altinn roles can be used to identified the correct recipients within an organisation.
3. Notifications can have send conditions related to the state of, or actions performed on, an Altinn App instance
4. A seamless integration for notifications in an Altinn App workflow.

## Terminology

- #### Notification order

  A _notification order_ is the request to send a notification through one or
  multiple notifications to one or multiple recipients.
  A single order can result in the creation of one or multiple notifications.

  Here is an example of a standard notification order:

  [Insert json of order with 2 recipients]

- #### Notification

  A _notification_ is the one instance of an email or SMS that is sent to a single recipient.

  Here is an example of a notification:

  [Insert json]

- #### Notification channel

  A _notification channel_ is the communication pathways through which Altinn enables you to
  communicate with your end users.

## Notification channels

Currently, we support sending notifications through two channels:

- email
- sms

#### Future improvements

In the future, we plan to extend our notification channel options to provide even more flexibility and convenience.
Our goal is to support a wider range of communication platforms. This expansion will allow both  your organisation 
and the end users to communicate through the channels that best suit the end users preferences and communication habits.

Stay tuned for updates as we continue to enhance our notification capabilities to better serve your needs.

If you have any questions or feedback regarding notification channels,
please don't hesitate to [reach out to us through GitHub](https://github.com/Altinn/altinn-notifications/issues/new?assignees=&labels=kind%2Fquestion%2Cstatus%2Ftriage&projects=&template=question.yml).

## Who can use Altinn Notifications

Sending notifications through Altinn Notifications is limited to registered service owners,
Altinn Apps and internal Altinn services.

Maskinporten authentication is be required in order to send notification via our platform.

## When to use Altinn Notifications 


{{% notice info %}}
TODO: say something about "varsel" vs "melding" or "beskjed". Kan brukes til begge deler. 
What is important to think about ? 
{{% /notice %}}
 
 ### Communication with private persons
[Kontakt- og reservasjonsregisteret](https://eid.difi.no/nb/kontakt-og-reservasjonsregisteret) 
(the common contact register) is used to retrieve contact information when an organisation sends a notification 
through Altinn to a private person without providing the contact details to use. 

In using this register both Altinn, and the sender of the notification,
must adhere to [eForvaltningsforskriften §29](https://lovdata.no/forskrift/2004-06-25-988/§29). 

We have summarized some of the information here, but encourage you to familiarize yourself with 
[Digitaliseringsdirektoratet's guidelines for using the register](https://samarbeid.digdir.no/kontaktregisteret/retningslinjer-bruk-av-kontakt-og-reservasjonsregisteret/143). 


Altinn Notifications should be used to support the execution of your organisations public authority. Meaning the use 
should be linked to your organisation's _social mission_ and not for
commercial purposes, marketing, or any other use that can be considered as private law.

Altinn Notifications should be used when the message communicated in the notification contains 
information that is important for the subject to receive and/or is important for the sending organisation 
that the recipient receives.

### Communication with persons as an entity of an organisation 

### General guidelines 