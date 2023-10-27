---
title: Send notifications
linktitle: Send notifications
description: "Service owners and internal Altinn systems can send notifications to individuals or individuals with a
specific role within an organisation. The contact point for the recipient does not need to be known, as 
Altinn Notifications has access to a wide range or registries to retrieve contact information 
given an organisation number or a national identity number." 
tags: [notifications]
weight: 30
toc: true

---

{{% notice info %}}
Todo: quality check of what is stated here. 
{{% /notice %}}



{{% notice info %}}
TODO: QA PO, legal, devs
{{% /notice %}}


## Combining notification channels

To be completed and considered. EmailPreferred, SMSPreferred. 

## Persistence of sent notifications

- The contents of a notification is persisted for XX years and will then be deleted. 
- Metadata related to a notification, who sent it, who received it, what time it was sent, 
and send status is persisted for XX years. 

## Registries used for recipient addresses

When sending a notification to an organisation or person based on a national identification number
and optionally a role code, the contact information is retrieved from preferences registered in Altinn by the end user, or a 
copy of one of the Norwegian national registries (Folkeregisteret, Kontakt- og reservasjonsregistret
or Enhetsregisteret).

## Cost
{{% notice info %}}
Todo: can we say anything about cost or billing here? or link to something else? 
{{% /notice %}}
