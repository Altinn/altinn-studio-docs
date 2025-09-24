---
title: Registrering av system
description: Hvordan kan du registrere system
linktitle: Registrering av system
hidden: true
---

En systembruker kan bare ta i bruk ressurser (eller tilgangspakker) hvis selve systemet først er registrert i Altinns systemregister. Registreringen etablerer en teknisk identitet som kobler sammen:
- Hvem som er systemleverandør (organisasjonsnummer)
- Hvilket system (unikt id-felt)
- Hvilke rettigheter (resources) eller tilgangspakker (accessPackages) systemet skal kunne be om
- Hvilken klient (clientId) som brukes ved autentisering
- Godkjente redirect-URL-er (for interaktive OAuth2-strømmer)
- Synlighet (isVisible) for eventuelle sluttbrukervalg

Formål:
- Sikre at bare godkjente systemer kan få token for spesifikke Altinn‑ressurser
- Skille mellom flere systemer hos samme leverandør
- Gi grunnlag for revisjon og sporing

Minimum før registrering:
1. Avklar hvilke API-ressurser eller tilgangspakker som trengs.
2. Tildel/eller opprett en klient (clientId) via riktig forvaltningsprosess.
3. Fastsett unikt system-id (anbefalt mønster: <orgnr>_<systemnavn>).
4. Forbered språkversjoner for navn og beskrivelse (nb/en/nn ved behov).
5. Velg enten rights (resources) eller accessPackages (ikke begge samtidig for samme formål).

Hovedfeltene du sender inn:
- id: Unik nøkkel som brukes videre i alle kall.
- systemVendorOrgNumber og vendor: Identifiserer leverandøren.
- name og description: Presentasjonsdata.
- rights eller accessPackages: Tilgangsgrunnlag.
- clientId: Referanse til registrert klient.
- allowedredirecturls: Påkrevd hvis autorisasjonskodeflyt skal brukes.
- isVisible: Styrer om systemet kan eksponeres i brukerflater.

Etter registrering brukes verdien i id-feltet når systembruker knyttes til rettigheter og når tokens skal innhentes. Endringer i tilgang (nye resources/tilgangspakker) krever oppdatering av systemobjektet. Hold informasjonen konsistent for å unngå avviste autorisasjonsforespørsler.


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
