---
title: Your contact information for the organization
description: Her finner du dokumentasjon for API-et til Profil-komponenten i Altinn 3-plattformen.
weight: 40
---

## What is your contact information for the organization?
If a user wants to receive personal notifications on behalf of an organization, they can set this up. This will typically be to the user's own phone number or company email. You can set up both, but only one of each.
Some users want to set up notifications only for specific services in Altinn. This can be added to a list of services you want notifications for, called `resourceIncludeList`. As of now, it is not possible to filter out individual services you do *not* want notifications for.

## How do you use the API?
To use the API, you must be a logged-in end user. It is important that the access token used contains the `userId` to indicate who the logged-in user is.

In the path, you must indicate which party you want to manage addresses on behalf of. This is identified with `partyUuid`.

**Model**

```json
{
  "userId": 1,
  "partyUuid": "b82320a2-e34d-47bb-8fb3-e6122a50087c",
  "emailAddress": "example@digdir.no",
  "phoneNumber": "+4798765432",
  "resourceIncludeList": [
    "urn:altinn:resource:resource-id"
  ]
}
```

* **userId** (string) Internal ID for the user in Altinn.
* **partyUuid** (Guid) Internal ID for the party in Altinn.
* **emailAddress** (string) The user's email address for notifications. Can be null.
* **phoneNumber** (string) Phone number for SMS notifications to the user. Can be null.
* **resourceIncludeList** (list of string) A list of services the user wants notifications for. Can be null. The list only accepts full URN values with resource ID.