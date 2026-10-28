---
title: Tilstands- og persistensarkitektur for Access Management UI
linktitle: Tilstand og persistens
description: Cookies, hurtigbuffer og eksterne datakilder i Access Management UI.
weight: 2
toc: true
---

Access Management UI eier ingen database, meldingskø eller blobcontainer. React-klienten og BFF-en holder kortvarig tilstand, mens backendtjenestene eier de autoritative dataene. Modellen bygger på [kildecommit `8539d5b`](https://github.com/Altinn/altinn-access-management-frontend/tree/8539d5bd44c1fbace079a65dfa42831a599f8806).

Klikk på et diagram for å åpne det i full størrelse i en ny fane.

## Lagringsgrense

<a href="./storage-boundary.svg" target="_blank" rel="noopener"><img src="./storage-boundary.svg" alt="Lagringsgrensen for Access Management UI" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

React-klienten bruker Redux Toolkit og RTK Query til tilstand og svar fra API-er. Koden bruker ikke `localStorage`, `sessionStorage`, IndexedDB eller Redux Persist. Tilstanden forsvinner når nettleserkonteksten lastes på nytt.

BFF-en bruker `IMemoryCache`. Hurtigbufferen er lokal for hver prosess og er verken delt mellom instanser eller en autoritativ datakilde. Standardkonfigurasjonen bruker ti minutters absolutt utløpstid for ressursmetadata og ressurseiere.

## Cookies i nettleseren

<a href="./browser-state.svg" target="_blank" rel="noopener"><img src="./browser-state.svg" alt="Cookies og klienttilstand i Access Management UI" style="width:100%;height:auto;display:block;cursor:zoom-in;" /></a>

De viktigste cookiegruppene er:

- `AltinnStudioRuntime` inneholder JWT-en som BFF-en bruker når den kaller backendtjenester
- `XSRF-TOKEN` brukes som beskyttelse mot forfalskede forespørsler og sendes som `X-XSRF-TOKEN`
- `AltinnPartyId` og `AltinnPartyUuid` angir parten brukeren handler på vegne av
- `selectedLanguage` og `altinnPersistentContext` påvirker språkvalget
- `AltinnLogoutInfo` brukes til kontrollert videresending og enkelte forespørselsidentifikatorer ved utlogging

Cookies er klienttilstand, ikke komponentens forretningsdatabase. Endringer i tilganger, samtykker, systembrukere og forespørsler lagres gjennom API-ene hos tjenesten som eier dataene.

## Eksternt dataeierskap

BFF-en samler data fra blant annet Access Management, Register, Resource Registry, Profile, Authentication, Maskinporten og systembrukertjenester. Diagrammet viser disse som eksterne autoritative kilder. Databasemodellene deres dokumenteres på sidene for de respektive komponentene.

## Avgrensning og vedlikehold

Oppdater siden hvis komponenten får database, distribuert hurtigbuffer, nettleserlagring eller nye sikkerhetskritiske cookies. En endring fra prosesslokal til distribuert hurtigbuffer vil også endre konsistens- og driftsmodellen.
