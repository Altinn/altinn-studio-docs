---
title: Skrivetilgang til API-et
linktitle: API-tilgang
weight: 10
description: Hendelsesproduksjon/publisering kan bare gjøres av tjenesteeiere
---

## Publisering av app-hendelser
App-hendelser må komme fra en app, og kan ikke opprettes direkte gjennom API-et.

## Publisering av generiske - ikke-app hendelser
Ethvert system som ønsker å publisere hendelser gjennom hendelse-API-et vil kreve scopene: **altinn:serviceowner** og **altinn:events.publish**

Disse scopene er tilgjengelige for alle tjenesteeiere. Kontakt tjenesteeier@altinn.no hvis du har problemer med å finne nødvendige scopes i Maskinporten.