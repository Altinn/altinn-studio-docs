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

Currently, Altinn offers two notification channels:

- email
- sms

#### Combining notification channels

{{% notice info %}}
To be completed and considered. EmailPreferred, SMSPreferred. </br></br>
Do we want to explain these concepts here or is that too early?
{{% /notice %}}

#### Future improvements

In the future, we plan to extend our notification channel options to provide even more flexibility and convenience.
Our goal is to support a wider range of communication platforms. This expansion will allow your organisation and your
end users to communicate through the channels that best suit the end users preferences and communication habits.

Stay tuned for updates as we continue to enhance our notification capabilities to better serve your needs.

If you have any questions or feedback regarding notification channels,
please don't hesitate to [reach out to us through GitHub](https://github.com/Altinn/altinn-notifications/issues/new?assignees=&labels=kind%2Fquestion%2Cstatus%2Ftriage&projects=&template=question.yml).

## Who can use Altinn Notifications

Sending notifications through Altinn Notifications is limited to registered service owners,
Altinn Apps and Altinn services.

Maskinporten authentication is be required in order to send notification via our platform.
