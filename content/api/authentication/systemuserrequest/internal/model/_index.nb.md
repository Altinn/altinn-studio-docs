---
title: Modell
linktitle: Modell
description: Modell for å behandle systembrukerforespørselen
toc: true
---

## Agent Systembruker respons
Denne modellen er responsmodellen for agent systembrukerforespørsel.

#### id
Den unike identifikatoren for den opprettede forespørselen. Denne ID-en brukes til å sjekke status eller administrere forespørselen.

#### externalref
Dette er en valgfri referanse satt av leverandøren for systembrukerforespørselen. Hvis den ikke er angitt, vil den som standard være partyOrgNo. Hvis den spesifiseres, må denne verdien brukes i tokenforespørselen til Maskinporten.

#### systemid
ID-en til det registrerte systemet i Altinn.

#### partyorgno
Organisasjonsnummeret som må behandle systembrukerforespørselen.

#### accesspackages
Listen over tilgangspakker systembrukeren søker tilgang til.


#### redirecturl
URL-en som brukeren må bli omdirigert til etter å ha godkjent eller avslått systembrukerforespørselen.

#### status
Statusen for forespørselen. Statusen er 'ny' når forespørselen er opprettet. Den endres til 'akseptert', 'avslått' eller 'nektet' avhengig av hvordan forespørselen håndteres av brukeren.

### confirmurl
Leverandøren vil gi denne URL-en til sine kunder for å godkjenne eller avslå systembrukerforespørsler.

#### created
Datoen og tidspunktet forespørselen ble opprettet. Dette er nyttig for å identifisere om forespørselen fortsatt er gyldig.