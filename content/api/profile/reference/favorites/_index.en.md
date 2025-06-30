---
title: Favorites
description: This API allows you to manage which parties are registered as favorites
weight: 20
---

## What are favorites?
When a user is logged in to Altinn's website, an overview is shown of which parties a user can represent.
For users with many choices, it may be useful to select some of these as favorites. This does not do anything other than give the user a shortcut to select this party.

## How do you use the API?
The solution offers endpoints for reading, adding, and removing favorites.
All available endpoints require authentication. To use the API, you must be a logged-in end user. It is important that the access token used contains `userId` to indicate who the logged-in user is.

In the path for favorites, you must indicate which party you want to add or delete. This is identified with `partyUuid`, which must be a valid value and which the user must have in their party list.

**Response format**
```json
{
  "name": "__favoritter__",
  "isFavorite": true,
  "parties": ["uuid1", "uuid2"]
}
```

* **name** (string) The name of the group. For favorites, this will always be `__favoritter__`.
* **isFavorite** (bool) A flag indicating that this is the list of favorites.
* **parties** (List of uuid) A list of partyUuid that are added to favorites.