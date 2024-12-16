---
title: SmartCloud - Altinn Referanseimplementasjon
linktitle: SmartCloud
description: Her finner du vår referanseimplementasjon for sluttbrukersystemer.
weight: 5
---

SmartCloud er designet for å demonstrere hvordan systemleverandører kan integrere Systembruker-funksjonalitet i sine egne produkter, inkludert:

- Opprette en systembrukertoken fra Maskinporten
- Bruke systembrukertokens fra applikasjoner for å kalle offentlige API-er
- Bruke API-er for å registrere forespørsler om å opprette systembrukere
- Sjekke statusen for systembrukerforespørsler
- Liste opp alle systembrukere for et system

## Opprette en systembrukerforespørsel

Som en del av SmartCloud-applikasjonen kan sluttbrukere registrere seg som brukere for SmartCloud. 

Avhengig av versjonen av SmartCloud vil forskjellige rettigheter bli forespurt.

Forespørselen sendes fra [Redirect controller](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserClientSystem/SuperSystem/SuperSystem.Server/Controllers/RedirectController.cs#L35). Avhengig av produktet varierer rettighetsdelen av forespørselen.

SmartCloud autentiserer med Maskinporten og ber om en token med omfanget **altinn:authentication/systemuser.request.write**.

## Opprette en Maskinporten systembrukertoken

SmartCloud inkluderer kode for å generere en Maskinporten-token for systembrukere. 

Den bruker det "innloggede" organisasjonsnummeret for å opprette Maskinporten-tokenen.

## Kalle API med systembrukertoken

Med den opprettede systembrukertokenen kan SmartCloud kalle ulike API-er.

- [LogisticController](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserClientSystem/SuperSystem/SuperSystem.Server/Controllers/LogisticController.cs) kaller Logistics API. Krever lesetilgang for ressursen.
