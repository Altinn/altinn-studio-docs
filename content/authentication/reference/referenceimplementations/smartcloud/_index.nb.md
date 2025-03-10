---
title: SmartCloud - Altinn Referanseimplementering
linktitle: SmartCloud
description: Referanseimplementering for integrering av Systembruker-funksjonalitet i sluttbrukersystemer.
weight: 5
---

SmartCloud demonstrerer hvordan systemleverandører kan integrere Systembruker-funksjonalitet i sine produkter, inkludert:

- Opprette en systembrukertoken fra Maskinporten
- Bruke systembrukertoken for å kalle offentlige API-er
- Registrere forespørsler om å opprette systembrukere
- Sjekke statusen for systembrukerforespørsler
- Liste opp alle systembrukere for et system

## Opprette en Systembrukerforespørsel

Sluttbrukere kan registrere seg som brukere for SmartCloud. Avhengig av SmartCloud-versjonen vil forskjellige rettigheter bli forespurt.

Forespørselen sendes fra [Redirect controller](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserClientSystem/SuperSystem/SuperSystem.Server/Controllers/RedirectController.cs#L35). Rettighetene som forespørres varierer basert på produktet.

SmartCloud autentiserer med Maskinporten og ber om en token med omfanget **altinn:authentication/systemuser.request.write**.

## Opprette en Maskinporten Systembrukertoken

SmartCloud inkluderer kode for å generere en Maskinporten-token for systembrukere ved bruk av det "innloggede" organisasjonsnummeret.

## Kalle API-er med Systembrukertoken

Med den genererte systembrukertoken kan SmartCloud kalle ulike API-er.

- [LogisticController](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserClientSystem/SuperSystem/SuperSystem.Server/Controllers/LogisticController.cs) kaller Logistics API, som krever leseadgang for ressursen.

Prosjektet kan studeres [her](https://github.com/TheTechArch/altinn-systemuser/tree/main/src/SystemUserClientSystem/SuperSystem).
