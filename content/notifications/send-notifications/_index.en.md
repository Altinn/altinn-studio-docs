---
title: Send notifications
linktitle: Send notifications
description: "Service owners and internal Altinn systems can send notifications to individuals either in a personal 
capacity or a proffesional one thoguh a role they have within an organisation. The contact point for the 
recipient does not need to be known, as Altinn Notifications has access to a wide range 
of registries to retrieve contact information given an organisation number or a national identity number." 
tags: [notifications]
weight: 30
toc: true

---

{{% notice info %}}
TODO: QA PO, legal, devs
{{% /notice %}}

## Combining notification channels

{{% notice info %}}
Per November '23 only one communication chanel is supported. 
Once multiple channels are provided, it will be possible to comnine notification channels for a single order request.
{{% /notice %}}

## Registries used for recipient addresses

When sending a notification to individuals or an organisation based on a national identification number
the contact details are retrieved from one of three sources: 

- The user's Altinn profile 
- Altinn's copy of the national registry of notification addresses for businesses 
- Altinn's copy of tje national common contact register (Kontakt- og reservasjonsregisteret)

### How Altinn identifies contact details
{{% notice info %}}
TODO: legg inn en folkelig beskrivelse av dataflyten vi kom fram til i møtet med Terje, Torkel og Stephanie
{{% /notice %}}

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
