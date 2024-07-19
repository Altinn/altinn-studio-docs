---
title: Send notifications
linktitle: Send notifications
description: "Service owners and internal Altinn systems can send notifications to individuals in a personal
capacity or a professional capacity though a role they have within an organization. The contact point for the
recipient does not need to be known, as Altinn has access to a wide range
of registries to retrieve contact information given an organization number or a national identity number."
tags: [notifications]
weight: 30
---

## Combining notification channels

{{% notice info %}}
As of April '24 it is not possible to combine notification channels for a single order request.
This functionality can be expected in the first half of '24.
{{% /notice %}}

## Recipient lookup

Sending notifications to a national identity number or organization number is supported.
A lookup of the contact details and reservation status of the recipient will be done both at the time
of ordering a request and at the requested send time.

The entity ordering the notification is responsible for checking whether the notification
will be sent or not, as recipient lookup results are shared in the response of the order request
as well as detailed in the notification after requested send time.

[Read more about recipient lookup in the reference documentation.](../reference/send-notifications/recipient-lookup)


## Send condition
Send condition is a feature that enables putting in a notification order request
for a notification to be sent only if a given condition is met, the requested send time could be immediately 
or in the future. An example use case is reminders, where a notification should be sent only if a user is yet to 
complete an action. 

A send condition can be evaluated as true or false i.e. true if the condition for sending the notification is met. 
The send condition is checked by the application using the condition endpoint provided in the notification order. 

[Read more about send condition in the reference documentation.](../reference/send-notifications/send-condition)

## SMS send window
Altinn sends SMS notifications daily between 9 AM and 5 PM (Norway time). 
Any SMS scheduled outside of these hours will be sent at 9 AM the following day.

Notification orders can be placed at any time. 

<!--

## Persistence of sent notifications

{{% notice info %}}
TODO: confirm numbers
{{% /notice %}}
- The contents of a notification is persisted for XX years and will then be deleted.
- Metadata related to a notification, who sent it, who received it, what time it was sent,
and send status is persisted for XX years.

## Cost
{{% notice info %}}
Todo: can we say anything about cost or billing here? or link to something else?
{{% /notice %}}
-->
