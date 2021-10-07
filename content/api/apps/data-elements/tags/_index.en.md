---
title: Tags
description: The app API to work with the tags on a data element.
toc: true
tags: [api]
weight: 100
---

## Overview

The tag API for data elements have endpoints for listing of tags, adding a tag and removing a tag.

**basePath**
```http
{org}/{appname}/instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}/
```

## Get tags 

Endpoint for retrieving a list of tags already added to a data element.

```http
GET basePath/tags
Accept: application/json
```

## Add tag

Endpoint for adding a tag to a data element.

```http
POST basePath/tags
Content-Type: application/json

"letters"
```

The body should contain the new word in quotes. This is the JSON representation of a text and the Content-Type needs to be application/json. The word being added can consist of any letter from all languages.

The response is a list of tags on the data element including the new word.

## Delete tag

Endpoint for removing a tag from a data element.

```http
DELETE basePath/tags/{tag}
```

The response will have status code 204 if the operation was successfull.