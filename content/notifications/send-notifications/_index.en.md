---
title: Send notifications
linktitle: Send notifications
description: "As a service owner or internal Altinn system one can send notifications to people in organisations
based on roles or to people. The contact point for the recipient does not need to be known, as the Notification 
component has access to a wide range or registries to retrieve contact information given an organisation number
or a national identity number." 
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
