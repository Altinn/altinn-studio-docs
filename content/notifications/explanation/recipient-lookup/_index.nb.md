---
title: Recipient lookup
linktitle: Recipient lookup
tags: [notifications, recipient lookup]
weight: 30
---


Sending notifications to a national identity number or organization number is supported.
A lookup of the contact details and reservation status of the recipient will be done both at the time
of ordering a request and at the requested send time.

The entity ordering the notification is responsible for checking whether the notification
will be sent or not, as recipient lookup results are shared in the response of the order request
as well as detailed in the notification after requested send time.

### Recipient lookup result
{{% notice warning  %}}
The recipient lookup result reflects the situation at a specific point in time.
If the requested send time is significantly later than the time of ordering - the final lookup may have a different result.
The status of a notification order should therefore always be checked after the requested send time
to confirm whether notifications were successfully generated, sent and delivered.
{{% /notice %}}


The _recipient lookup result_ provides insight into the probability of Altinn being able to send the notification
to the recipients stated in the order. By checking the contents of this object, alternative
measures can be taken before the requested send time if there are reserved persons or recipients where no contact details can be found.

|    Property    |                                                  Description                                                   |
| :------------: | :------------------------------------------------------------------------------------------------------------: |
|     status     |                                        The result of the initial lookup                                        |
|   isReserved   |                    A list containing national identity numbers for all reserved recipients.                    |
| missingContact | A list containing national identity number and/or organization numbers for recipients missing contact details. |


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
recipient is identified by organization number.

[Read more about the notification addresses to apply in public administration here](https://www.brreg.no/en/other-topics/notification-addresses-to-apply-in-public-administration/?nocache=1704206499405).


__Altinn user profile__

End users can register their preferred contact details for notifications related to organizations in their
Altinn profile. These contact details can be used when the recipient is identified by organization number.
