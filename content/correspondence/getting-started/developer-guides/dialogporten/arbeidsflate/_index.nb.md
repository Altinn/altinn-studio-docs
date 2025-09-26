---
title: Integrasjoner med Dialogporten og Arbeidsflate
linktitle: Dialogporten/Arbeidsflate
description: Hvordan komme i gang med integrasjoner mot Dialogporten og Arbeidsflate
tags: [Melding, overføring, transmission, guide]
toc: true
weight: 40
---

{{<children />}}

## Transmission
En transmission kan opprettes gjennom Altinn 3 Melding API for å gruppere flere relaterte meldinger innenfor samme dialog.

### Hvordan komme i gang

Når en melding opprettes vil entiteten få tildelt en dialogId som ligger i den eksterne referansen til meldingen.
Fremtidige meldinger som er relatert til dialogen kan grupperes gjennom transmissions. Dette gjøres ved å referere til dialogId i den eksterne referansen.

```json
{
    "correspondence":{
        ...,
        "externalReferences":[
            {
                "referenceValue": string,
                "referenceType" ReferenceType
            }
        ]
    }
}
```
ReferenceValue for en transmission må settes til dialogId for dialogen du refererer til.
I tillegg må referenceType settes til DialogportenDialogId for å indikere at den nye meldingen er del av en eksisterende dialog.

#### Transmission opprettet
Når en transmission har blitt opprettet vil de eksterne referansene til den nyopprettede meldingen bestå av en referanse til dialogen som
meldingen er relatert til, samt en referanse til en transmissionId som har blitt satt.

Responsen skal være i følgende format:

```json
{
    "correspondence":{
        ...,
        "externalReferences":[
            {
                "referenceValue": dialogId,
                "referenceType": DialogportenDialogId
            },
            {
                "referenceValue": transmissionId,
                "referenceType": DialogportenTransmissionId
            }
        ]
    }
}
```
