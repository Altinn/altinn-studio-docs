---
title: Registrering av system
description: Hvordan registrere system i Systemregisteret
linktitle: Registrering av system
weight: 1
---

## Forutsetninger

Systemleverandøren må ta kontakt med Digdir for å få tilgang til systemregisteret og systembruker-scopes. Prosedyren er beskrevet på [Samarbeidsportalen](https://samarbeid.digdir.no/). Vi anbefaler at SBS-orgnummer er lagt inn i testmiljøet TT02. SBS må ta kontakt med servicedesk@altinn.no for å få opprettet ekte orgnummer i TT02. Ta kontakt med tjenesteeier for å finne ut hvilke tilgangspakker tjeneste-API-et er tilknyttet.

## Registrering av systemet i Altinns systemregister

SBS leverandør registrerer deretter SBS system i Altinn systemregister via API. De definerer de nødvendige rettighetene for å få tilgang til en tjeneste ved å knytte klient-ID-en til systemet.

Org-nummer i Id og ID må matche, og det må også matche det som ligger i tokenet. Vi støtter både Maskinporten-token og Altinn-token.

```json
{
  "id": "991825827_smartcloud",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  },
  "name": {
    "nb": "SmartCloud 1",
    "en": "SmartCloud 1",
    "nn": "Smart SKY"
  },
  "description": {
    "nb": "SmartCloud er verdens beste system.",
    "en": "SmartCloud Rocks.",
    "nn": "SmartSky er vestlandets beste system"
  },
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skattegrunnlag"
    }
  ],
  "clientId": ["32ef65ac-6e62-498d-880f-76c85c2052ae"],
  "allowedredirecturls": ["https://smartcloudxxxx/receipt"],
  "isVisible": true
}
```

## Viktige merknader

- ClientId i systemregisteret er den samme som brukes senere ved bruk av systembruker mot Maskinporten.
- Systemer kan endres og slettes i etterkant.

## Modell for systemregisterinformasjon

Modell for å lese og skrive systemregisterinformasjon.

### Model Id

**Format:** `{systemleverandørorgnr}_{valgt navn}`

**Eksempel:** `991825827_testprodukt`

### Vendor

Organisasjonsnummeret til systemleverandøren må inkludere referanse til Enhetsregisteret.

For eksempel:

```json
"vendor": {
  "ID": "0192:991825827"
}
```

«0192» er referansen som angir at det er en verdi for Enhetsregisteret i henhold til Elektronisk adresseordning, og 991825827 er organisasjonsnummeret til Digitaliseringsdirektoratet.

### Description og Name

Brukes for visning i Altinn-portalen.

**Språkstøtte:** nb, nn, en.

```json
"name": {
  "nb": "The Matrix",
  "en": "The Matrix",
  "nn": "The Matrix"
}

"description": {
  "nb": "Test system",
  "en": "Test system",
  "nn": "Test system"
}
```

### Rights og AccessPackages

Definerer hvilke tjenester eller tilgangspakker som kreves. Disse må være satt **før** systembrukeren kan opprettes.

```json
"rights": [
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "app_ttd_endring-av-navn-v2"
      }
    ]
  },
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "ske-krav-og-betalinger"
      }
    ]
  }
]

"accessPackages": [
  {
    "urn": "urn:altinn:accesspackage:skattnaering"
  }
]
```

### ClientId

Et system kan være knyttet til flere klient-ID-er. Disse klient-ID-ene genereres for integrasjoner i Maskinporten, og hver av dem er unik, knyttet spesifikt til et system.

```json
"clientId": [
  "32ef65ac-6e62-498d-880f-76c85c2052ae"
]
```

### IsVisible

- **True:** Systemet er synlig i Altinn-portalen, og kan brukes for å opprette en systembruker.
- **False:** Systemet er ikke synlig i Altinn-portalen, og systembruker må opprettes gjennom leverandørstyrt opprettelse.

```json
"isVisible": true
```

### AllowedRedirectUrls

Du får lov til å opprette en sytembrukerforespørsel med et subset av de angitte URL-ene.

```json
"allowedredirecturls": [
  "https://smartcloudxxxx/receipt"
]
```
