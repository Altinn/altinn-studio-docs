---
title: Send notifications
linktitle: Send notifications
description: "Service owners and internal Altinn systems can send notifications to individuals in a personal 
capacity or a professional capacity though a role they have within an organisation. The contact point for the 
recipient does not need to be known, as Altinn has access to a wide range 
of registries to retrieve contact information given an organisation number or a national identity number." 
tags: [notifications]
weight: 30
toc: true

---

## Combining notification channels

{{% notice info %}}
As of April '24 it is not possible to combine notification channels for a single order request.
This functionality can be expected in the first half of '24. 
{{% /notice %}}

## Recipient lookup 

Sending notifications to a national identity number or organisation number is possible.
A lookup of the contact details and reservation status of the recipient will be done both at the time
of ordering a request and at the requested send time. 

The entity ordering the notification is responsible to checking whether the notification 
will be sent or not, as recipient lookup results are shared in the response of the order request
as well as detailed in the notification after requested send time. 

### Recipient lookup result 
{{% notice warning  %}}
The recipient lookup result reflects the situation at a specific point in time. 
If the requested send time is significantly later than the time of ordering - the final lookup may have a different result. 
The status of a notification order should therefore always be checked after the requested send time 
to confirm whether or not notifications were successfully generated, sent and delivered.
{{% /notice %}}


The _recipient lookup result_ provides insight into the probability of Altinn being able to send the notification
to the recipients stated in the order. By checking the contents of this object after posting an order alternative
measures can be taken before the requested send time if there are reserved persons or recipients where no contact details can be found. 

|    Property    |                                                  Description                                                   |
| :------------: | :------------------------------------------------------------------------------------------------------------: |
|     status     |                                        The result of the initial lookup                                        |
|   isReserved   |                    A list containing national identity numbers for all reserved recipients.                    |
| missingContact | A list containing national identity number and/or organisation numbers for recipients missing contact details. |


The status property can hold one of three values.

|     Status     |                       Description                        |
| :------------: | :------------------------------------------------------: |
|    Success     | The recipient lookup was successful for all recipients.  |
| PartialSuccess | The recipient lookup was successful for some recipients. |
|     Failed     |     The recipient lookup failed for all recipients.      |


__Samples__
```json
"recipientLookup": {
    "status": "Success",
    "isReserved": [ "16069412345" ],
    "missingContact": [ "810419652", "14029112345" ]
  }
```


### Registries used for lookup

When sending a notification through Altinn the sender can provide the contact details (email 
or SMS). In addition to this, Altinn uses a set of registries to retrieve the contact details
if none have been provided by the sender. 

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
