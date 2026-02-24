---
title: Hastighetsbegrensning
linktitle: Hastighetsbegrensning
description: Referansedokumentasjon for Altinn 3 Formidling
tags: []
toc: true
weight: 40
---

## Hastighetsbegrensning av API-forespørsler

Vi har innført følgende grenseverdier for å balansere ressursbruken per part og unngå overbelastning av infrastrukturen. Bruk av hendelser/webhooks i løsningen din bør eliminere behovet for polling av mange av disse operasjonene.

Hastighetsbegrensning av API-forespørsler gjelder per Maskinporten-integrasjon. Kontakt oss for mer kapasitet.

- `POST /broker/api/v1/filetransfer`
  - Beskrivelse: Initialiser en filoverføring
  - Hastighetsbegrensning: 120 kall per minutt
  
- `POST /broker/api/v1/filetransfer/{fileTransferId}/upload`
  - Beskrivelse: Last opp til en initialisert fil ved hjelp av en binær strøm
  - Hastighetsbegrensning: 120 kall per minutt

- `POST /broker/api/v1/filetransfer/upload`
  - Beskrivelse: Initialiser og last opp en fil ved hjelp av form-data
  - Hastighetsbegrensning: 120 kall per minutt

- `GET /broker/api/v1/filetransfer/{fileTransferId}`
  - Beskrivelse: Få informasjon om filen og dens nåværende status
  - Hastighetsbegrensning: 120 kall per minutt

- `GET /broker/api/v1/filetransfer/{fileTransferId}/details`
  - Beskrivelse: Få mer detaljert informasjon om filopplastingen for revisjons- og feilsøkingsformål
  - Hastighetsbegrensning: 10 kall per minutt

- `GET /broker/api/v1/filetransfer`
  - Beskrivelse: Søk etter filer som kan nås av innringeren i henhold til spesifiserte filtre
  - Hastighetsbegrensning: 10 kall per minutt

- `GET /broker/api/v1/filetransfer/{fileTransferId}/download`
  - Beskrivelse: Last ned filen
  - Hastighetsbegrensning: 120 kall per minutt

- `POST /broker/api/v1/filetransfer/{fileTransferId}/confirmdownload`
  - Beskrivelse: Bekrefter at filen er lastet ned
  - Hastighetsbegrensning: 120 kall per minutt
