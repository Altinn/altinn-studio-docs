---
title: Registrering av system
description: Hvordan kan du registrere system
linktitle: Registrering av system
hidden: true
---

- SmartCloud AS registrerer deretter SmartCloud-systemet i Altinn systemregister.
  - De definerer nødvendige rettigheter for å få tilgang til "Krav og betalinger" ved å knytte klient-ID-en til systemet.

```json
{
  "id": "991825827_smartcloud",
  "systemVendorOrgNumber": "991825827",
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
  "clientId": ["xxxxxx-xxxx-xxxx-xxxx-xxxxxxx"],
  "allowedredirecturls": ["https://smartcloudxxxx/receipt"],
  "isVisible": true
}
```

- Registrering av systemet med nødvendige tilgangspakker i Altinns systemregister. I dette eksempelet registreres et system med nødvendig tilgang til én tilgangspakke. Leverandører må registrere systemet med tilgangspakker dersom brukerne deres for eksempel er et regnskapsfirma som representerer sine kunder.

```json
{
  "id": "991825827_smartcloud_ap",
  "systemVendorOrgNumber": "991825827",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  },
  "name": {
    "nb": "Smartcloud TP",
    "en": "SmartCloud AP",
    "nn": "Smartcloud TP"
  },
  "description": {
    "nb": "SmartCloud er verdens beste system.",
    "en": "SmartCloud Rocks",
    "nn": "SmartSky er vestlandets beste system"
  },
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
    }
  ],
  "clientId": ["xxxxx-xxxx-xxx-xxx-xxx"],
  "allowedredirecturls": ["https://smartcloudxxxx/receipt"],
  "isVisible": true
}
```

Se her (https://platform.tt02.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/export) for liste over tilgjengelige tilgangspakker i tt02-miljøet.

Se her (../../../../api/authentication/systemuserapi/systemregister/model/) for en detaljert beskrivelse av hvert enkelt felt. Ved videre kommunikasjon må systemleverandøren referere til verdien angitt i feltet "id".
