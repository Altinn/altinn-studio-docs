---
title: Favorites
description: This API allows you to manage which parties are registered as favorites
weight: 20
---

## What are favorites?
When a user logs in to Altinn's website, they see a list of parties they can represent.
For users with many available parties, it may be useful to select some of these as favorites. Marking a favorite only provides a quicker shortcut when selecting that party.

## How do you use the API?
The solution offers endpoints for reading, adding, and removing favorites.
All available endpoints require authentication. To use the API, you must be a logged-in end user. It is important that the access token used contains `userId` to indicate who the logged-in user is.

In the path for favorites, you must indicate which party you want to add or delete. This is identified with `partyUuid`, which must be a valid value and which the user must have in their party list.

### Response model
```json
{
  "name": "__favoritter__",
  "isFavorite": true,
  "parties": ["uuid1", "uuid2"]
}
```

* **name** (string) The name of the group. For favorites, this will always be `__favoritter__`.
* **isFavorite** (bool) A flag indicating that this is the list of favorites.
* **parties** (list of GUID) A list of `partyUuid` values that are currently marked as favorites.