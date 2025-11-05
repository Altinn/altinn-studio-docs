---
title: Users
description: This API allows you to read data about users
weight: 50
---

## Data sources
The Profile API cannot register a user's address from the National Population Register or notification addresses. These are managed by the National Population Register and the Contact and Reservation Register, respectively. 
Profile fetches updates from the Contact and Reservation Register every ten minutes. The notification addresses then become available to Altinn's notification component.

## User settings
A logged-in user can change display settings in the Altinn workspace, for example the language and which parties should appear in the party list.
The API supports both PUT (replaces the entire object) and PATCH (updates parts of the object).

### Response model
```json
{
  "language": "nn",
  "preSelectedPartyId": 0,
  "preselectedPartyUuid": null,
  "doNotPromptForParty": true,
  "showClientUnits": false,
  "shouldShowSubEntities": true,
  "shouldShowDeletedEntities": false
}
```

* **language** (string) The user's language choice as a two-letter code. Valid values: "no", "nn", "en".
* **preSelectedPartyId** (int) This field is deprecated. Use preSelectedPartyUuid instead.
* **preSelectedPartyUuid** (GUID) Pre-selected party as a party UUID.
* **doNotPromptForParty** (bool) If true, the user will not be prompted to select a party when starting a new form.
* **showClientUnits** (bool) If true, show client units in the party list. Applies only to accountants and auditors.
* **shouldShowSubEntities** (bool) If true, show sub-entities in the party list.
* **shouldShowDeletedEntities** (bool) If true, show deleted entities in the party list.