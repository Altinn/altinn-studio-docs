---
title: Organization notification addresses
description: This API allows you to manage organizations' notification addresses
weight: 30
---

## What are notification addresses for organizations?
For organizations to be notified of new messages in Altinn, they must register at least one notification address. This must be a mobile number or an email address.
These are also used by the Brønnøysund Register Centre and are kept in sync through regular updates between the systems.

The update usually runs every ten minutes.

## How do you use the API?
There are endpoints for reading, adding, and deleting notification addresses.
All endpoints require authentication. To use the API, you must be a logged-in end user. It is important that the access token used contains `userId` to indicate who the logged-in user is.
The end user must also have one of a set of valid roles to manage the organization's notification addresses.

In the path for managing notification addresses, you must include the organization's organization number.

### Model
```json
{
  "organizationNumber": "123456789",
  "notificationAddresses": [
    {
      "notificationAddressId": 1,
      "email": "string",
      "countryCode": null,
      "phone": null
    },
    {
      "notificationAddressId": 2,
      "email": null,
      "countryCode": "+47",
      "phone": "98765432"
    }
  ]
}
```
* **organizationNumber** (string) Contains the organization's organization number.
* **notificationAddresses** (list of notification addresses)
    * **notificationAddressId** (int) An identifier for the address. Used to delete or update a stored address.
    * **email** (string) Email address used for notifications to the organization. It is null if the address is a phone number.
    * **phone** (string) Phone number used for notifications to the organization. It is null if the address is an email.
    * **countryCode** (string) Country code belonging to the phone number.

{{% notice warning  %}}
### Updating an address may result in a new id
If you update an address to a value (email or phone number) that has been used before for the selected organization, you may receive the old `notificationAddressId` in return. 
Therefore, it is important to always check the response when you have changed a notification address.
{{% / notice %}}

