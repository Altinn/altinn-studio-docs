---
title: Tags
description: App API for å manipulere stikkord på et data element
toc: true
tags: [api]
weight: 100
---

## Oversikt

Api'et for tags (stikkord) på data elementer har endepunkter for å liste ut tags, legge til en tag, samt sletting av tag.

**baseSti**
```http
{org}/{appname}/instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}/
```

## Hent tags

Endepunkt for å laste ned listen med tags som allerede er lagt til på et data element.

```http
GET baseSti/tags
Accept: application/json
```

## Legge til tag

Endepunkt for å legge til en ny tag.

```http
POST baseSti/tags
Content-Type: application/json

"bokstaver"
```

API kallet må inneholde det nye ordet i anførselstegn. Dette er en JSON representasjon av en enkel tekst og Content-Type skal være application/json. Ordet kan inneholde bokstaver fra alle verdens språk.

Svaret på et kall vil inneholde listen over alle tags lagt til på data elementet inkludert det nye ordet.

## Slett tag

Endepunkt for l fjerne en tag fra et data element.

```http
DELETE baseSti/tags/{tag}
```

Svaret vil gi http status kode 204 hvis operasjonen lykkes.
