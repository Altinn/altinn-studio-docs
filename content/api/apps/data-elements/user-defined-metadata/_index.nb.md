---
title: Brukerdefinerte metadata
description: App API for å legge til brukerstyrte metadata på et dataelement.
toc: true
tags: [api]
weight: 100
---

## Oversikt

Brukerdefinerte metadata på dataelement gjør det mulig å legge nøkkel-verdi-par med metadata på et dataelement via API-et.
Det er dedikerte endepunkter for å sette og hente ut disse verdiene.
Dataene er også tilgjengelige i andre endepunkter hvor man får ut metadata om dataelementer.

{{%panel info%}}
**Merk:** 
Dette er data som brukere med skriverettigheter på dataelementet kan redigere fritt via API-et. 
Dersom man ønsker å legge til metadata som ikke kan redigeres via API-et bør man bruke [metadata](../metadata) i stedet. 
Det feltet er ikke eksponert via appens API, og kan kun settes via kall til storage, gjerne via egenutviklet C#-kode.
{{% /panel%}}

## Hent ut

Endepunkt for å laste ned listen med brukerdefinerte metadata som allerede er lagt til på et data element.

```http
GET {org}/{appname}/instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}/user-defined-metadata
Accept: application/json
```

Svaret:
```json
{
    "userDefinedMetadata": [
        {
            "key": "TheKey",
            "value": "TheValue"
        },
        {
            "key": "AnotherKey",
            "value": "AnotherValue"
        }
    ]
}
```

## Rediger

Endepunkt for å redigere metadataene. Innsendte data overskriver hele listen og vil fjerne alt som ikke er med i siste oppdatering.

```http
PUT {org}/{appname}/instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}/user-defined-metadata
Content-Type: application/json

{
    "userDefinedMetadata": [
        {
            "key": "TheKey",
            "value": "TheValue"
        },
        {
            "key": "AnotherKey",
            "value": "AnotherValue"
        }
    ]
}
```

Svaret vil inneholde listen over alle nøkkel-verdi-par som er lagt til på data elementet, i samme format som innsendte data.