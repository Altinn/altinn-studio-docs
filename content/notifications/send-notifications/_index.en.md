---
title: Send notifications
linktitle: Send notifications
description: "Service owners and internal Altinn systems can send notifications to individuals in a personal 
capacity or a proffesional capacity thoguh a role they have within an organisation. The contact point for the 
recipient does not need to be known, as Altinn has access to a wide range 
of registries to retrieve contact information given an organisation number or a national identity number." 
tags: [notifications]
weight: 30
toc: true

---

## Combining notification channels

{{% notice info %}}
Per November '23 only one communication chanel is supported. 
Once multiple channels are provided, it will be possible to combine notification channels for a single order request.
{{% /notice %}}

## Registries used for recipient addresses

When sending a notification through Altinn the sender can provide the contact details (email 
or SMS). In addition to this, Altinn uses a set of registries to retrieve the contact details
if noen have been provided by the sender. 

__The common contact register (Kontakt- og reservasjonsregisteret)__

Altinn has a local copy of this register which can be used used to retrieve
contact details if the recipient is identified by person number.

[Read more about the common contact register is available here](https://eid.difi.no/en/privacy-policy/privacy-policy-common-contact-register-krr).

__The National Registry for Notification Addresses for Businesses (Varslingsadresser for Enheter)__

Altinn has a local copy of this register which can be used used to retrieve contact details if the 
recipient is identified by organisation number.

[Read more about the notification addresses to apply in public administration here](https://www.brreg.no/en/other-topics/notification-addresses-to-apply-in-public-administration/?nocache=1704206499405).


__Altinn user profile__
 
End users can register their preferred contact details for notifications related to organisations in their 
Altinn profile. These contact details can be used when the recipient is identified by organisation number. 

<!--
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
-->
