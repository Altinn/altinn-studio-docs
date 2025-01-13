---
title: Recipient lookup
description: "Altinn Notifications offers a comprehensive recipient lookup service for notifications sent
to national identity and organization numbers. This article explains the lookup process,
including the registries used, ensuring accurate contact details and delivery."
linktitle: Recipient lookup
tags: [notifications, recipient lookup]
weight: 30
---


Altinn Notifications supports sending notifications to recipients identified by national identity or organization numbers.
Recipient contact details and reservation status are checked during order placement and again at the requested send time.

The ordering entity must verify whether notifications were sent, as lookup results are provided in the order response and updated after the requested send time.

### Recipient lookup
{{% notice warning  %}}
The recipient lookup result reflects the contact information available at a specific moment.
If there's a significant delay between ordering and sending a notification, the final lookup may yield different results.
Therefore, always verify the notification's status after the scheduled send time to confirm successful generation, dispatch, and delivery.
{{% /notice %}}


The _recipientLookup_ object indicates the likelihood of Altinn successfully delivering notifications
to the specified recipients. Reviewing this information allows for alternative actions before the send time if recipients are reserved or lack contact details.

| Property       | Description                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| status         | The result of the initial lookup.                                                                             |
| isReserved     | A list of national identity numbers for recipients who have chosen to opt out of electronic communication.    |
| missingContact | A list of national identity and/or organization numbers for recipients who do not have contact details.       |

The status property can have one of three values:
| Status         | Description                                     |
| -------------- | ----------------------------------------------- |
| Success        | Recipient lookup succeeded for all recipients.  |
| PartialSuccess | Recipient lookup succeeded for some recipients. |
| Failed         | Recipient lookup failed for all recipients.     |


__Samples__
```json
"recipientLookup": {
    "status": "Success",
    "isReserved": [ "16069412345" ],
    "missingContact": [ "810419652", "14029112345" ]
  }
```


### Registries used for lookup

When sending a notification through Altinn, the sender can provide the contact details (email or SMS).
Additionally, Altinn uses a set of registries to retrieve contact details if the sender has not provided them for a recipient.

__The Contact and Reservation Register (Kontakt- og reservasjonsregisteret)__

Altinn maintains a local copy of this register, which can be used to retrieve
name and contact details when the recipient is identified by their national identity number.

[Read more about the Contact and Reservation Register here](https://eid.difi.no/en/privacy-policy/privacy-policy-common-contact-register-krr).

__The Notification Addresses for Businesses (Varslingsadresser for Enheter)__

Altinn also maintains a local copy of this register, 
which can be used to retrieve name and contact details when the recipient is identified by their organization number.

[Read more about the Notification Addresses for Businesses here](https://www.brreg.no/en/other-topics/notification-addresses-to-apply-in-public-administration/?nocache=1704206499405).


__Altinn user profile__

End users can register their preferred contact details for notifications related to organizations
in their Altinn profile. These contact details can be used when the notification recipient is identified by an organization that the user can represent.