---
title: Administrere tilgangslister via API
linktitle: Tilgangslisteadministrasjon i API
description: I Altinn Studio kan du administrere tilgangslister for ressurser i Altinn Ressursregister.
toc: false
weight: 1
---

## Bakgrunn

For visse tjenester er det nødvendig å begrense tilgangen til spesifikke organisasjoner. I Altinn 2 ble dette håndtert via Tjenesterettighetsregisteret (SRR).

I Altinn 3 håndteres denne funksjonaliteten av Ressursrettighetsregisteret (RRR) gjennom tilgangslister. Tilgangslister lar deg definere og administrere hvilke organisasjoner som har tilgang til spesifikke ressurser, noe som sikrer et mer sikkert og kontrollert miljø.

## Forutsetninger

Klienten må være definert i Maskinporten med følgende scopes:

- `altinn:resourceregistry/access-list.read`
- `altinn:resourceregistry/access-list.write`
- `altinn:resourceregistry/resource.write`

[Full swagger-dokumentasjon](https://docs.altinn.studio/api/resourceregistry/spec/#/)

## Opprette ny tilgangsliste

Det første steget er å opprette listen.

**PUT** `/access-lists/{owner}/{identifier}`

Hvor `owner` er organisasjonskoden og `identifier` er en valgt ID for listen.

Eksempel på payload:

```json
{
  "name": "Godkjente banker",
  "description": "Denne listen inneholder godkjente banker i henhold til regel 123"
}
```

## Legge til medlemmer i listen

Post til /access-lists/{owner}/{identifier}/members med et medlem.

Medlemmet kan identifiseres med forskjellige ID-er. Bare én kan gis. Organisasjonsnummer ville

```json
{
  "data": [
    "urn:altinn:organization:identifier-no:123456789"
  ]
}
```

## Tilordne tilgangsliste til ressurs

Når en tilgangsliste tilordnes en ressurs, kan handlingene begrenses med et handlingsfilter. I tilfeller der én tilgangsliste skal ha lesetilgang og en annen tilgangsliste skal ha lese- og skrivetilgang.

Med en null eller tom liste er alle handlinger tillatt. Handlingene må samsvare med handlingene i XACML-policyen.

**PUT** `/access-lists/{owner}/{identifier}/resource-connections/{resourceIdentifier}`


```json
{
  "actionFilters": [
    "read",
    "write"
  ]
}
```

Etter oppdatering, publiser ressursen til forskjellige miljøer. Merk: Hvis du aktiverer RRR før du setter opp listen, vil tilgangen bli tapt for alle.