---
title: Digital Portal - Altinn Referanseimplementering
linktitle: Digital Portal
description: Referanseimplementering som viser hvordan en tjenesteeier kan integrere mot Altinns tjenesteeier-API med pålogging via ID-porten og scopebasert tilgangsstyring.
weight: 7
---

Digital Portal er en referanseimplementering som viser hvordan en tjenesteeier kan integrere mot Altinns tjenesteeier-API (Access Management og Client Delegations) med pålogging via ID-porten og scopebasert tilgangsstyring. Applikasjonen viser hele flyten fra innlogging med valgte OAuth-scopes, videre tokenveksling til Altinn plattformtoken, og kall mot Altinns moderne tilgangsstyrings-API-er på vegne av innlogget bruker.

## Hva prosjektet demonstrerer

- **Scopevalg ved pålogging** der brukeren velger granulære Altinn-scopes før omdirigering til ID-porten. Bare det som er valgt kommer med i access token.
- **Authorization Code-flyt med PKCE (S256)** mot ID-porten, statevalidering og `code_verifier` lagret i en kortlivet HttpOnly-cookie.
- **Tokenveksling** fra ID-porten access token til Altinn plattformtoken via `/authentication/api/v1/exchange/id-porten`.
- **Kall mot Altinns Access Management-API-er** for å hente autoriserte parter, opprette og slette forbindelser, delegere tilgangspakker og sjekke delegeringsrett.
- **Klientdelegering fra tjenesteeier-perspektiv** — hente klientene en organisasjon har tilgang til å agere på vegne av.
- **Tokenintrospeksjon** av JWT-claims (sub, scope, exp, aud, iss) som vises i grensesnittet etter innlogging.
- **Automatisk tokenfornying** som fornyer token før utløp.

## Sikkerhet

- Tokens lagres bare i HttpOnly-, Secure- og SameSite=Strict-cookies — aldri i `localStorage`.
- PKCE med S256, og `state` valideres ved callback.
- Alle klientkall mot Altinn går via backenden slik at plattformtokenet aldri eksponeres til nettleseren.

## Teknologi

- Backend: ASP.NET Core (.NET 10).
- Frontend: React, TypeScript, Vite og Digdir designsystem.
- Autogenererte DTO-er som speiler Altinns API-modeller.

## Prøv applikasjonen

Applikasjonen kjører på
[digitalportal.azurewebsites.net](https://digitalportal.azurewebsites.net).

## Les mer

Prosjektet finnes på GitHub:
[DigitalPortal](https://github.com/TheTechArch/DigitalPortal).
