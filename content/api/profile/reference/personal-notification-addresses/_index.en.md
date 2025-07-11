---
title: Your contact information for the organization
description: Manage the user's personal notification addresses for an organization.
weight: 40
---

## What is your contact information for the organization?
Users can configure personal notifications on behalf of an organization, typically to their own phone number or company e-mail. Both channels are allowed, but only one of each.
Some users want to set up notifications only for specific services in Altinn. This can be added to a list of services you want notifications for, called `resourceIncludeList`. As of now, it is not possible to filter out individual services you do *not* want notifications for.

## How do you use the API?
To use the API, you must be a logged-in end user. It is important that the access token used contains the `userId` to indicate who the logged-in user is.

In the path, you must indicate which party you want to manage addresses on behalf of. This is identified with `partyUuid`.

### Model

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

* **userId** (int) Internal ID for the user in Altinn.
* **partyUuid** (GUID) Internal ID for the party in Altinn.
* **emailAddress** (string) The user's email address for notifications. May be null.
* **phoneNumber** (string) Phone number for SMS notifications to the user. May be null.
* **resourceIncludeList** (list of string) A list of services the user wants notifications for. May be null. The list must contain full URNs with resource IDs.