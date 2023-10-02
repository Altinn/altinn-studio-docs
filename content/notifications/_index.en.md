
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
There are sections with missing and/or only partial documentation.
{{% /notice %}}


## Main benefits
Reasons to consider using Altinn Notifications 

1. Contact information from national registries can be retrieved at send time based of 
   organisation number or person identification number.
2. Altinn roles can be used to identified the correct recipients within an organisation.
3. Notifications can have send conditions related to the state or actions performed on an Altinn App instance
4. A seamless integration for notifications in an Altinn App workflow. 


## Terminology

#### Notification order vs notification 
- A notification order is the request to send a notification through one or 
  multiple notifications to one or multiple recipients.
  A single order can result in the creation of one or multiple notifications.

- A notification is the one instance of an email or SMS that is sent to a single recipient. 

Here is an example of a standard notification order: 


Here is an example of a notification: 


## Notification channels

Notification channels are the communication pathways through which Altinn enables you to 
communicate with your end users. 

Currently, we offer two notification channels:

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
end users to communicate through  the channels that best suit the end users preferences and communication habits.

Stay tuned for updates as we continue to enhance our notification capabilities to better serve your needs.

If you have any questions or feedback regarding notification channels, 
please don't hesitate to [reach out to us through GitHub](https://github.com/Altinn/altinn-notifications/issues/new?assignees=&labels=kind%2Fquestion%2Cstatus%2Ftriage&projects=&template=question.yml).


## Who can use Altinn Notifications

Sending notifications through Altinn Notifications is limited to registered service owners,
Altinn Apps and Altinn services. 

Maskinporten authentication is be required in order to send notification via our platform.