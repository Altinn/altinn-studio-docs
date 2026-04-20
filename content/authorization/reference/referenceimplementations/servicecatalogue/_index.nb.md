---
title: Tjenesteoversikten - Altinn Referanseimplementering
linktitle: Tjenesteoversikten
description: Referanseimplementering som viser hvordan man bygger en søkbar oversikt over offentlige tjenester i Altinn.
weight: 6
---

Tjenesteoversikten er en referanseimplementering som viser hvordan en utvikler kan bygge en katalog over digitale tjenester registrert i Altinn-plattformen. Applikasjonen fungerer som et tynt proxy- og visningslag over Altinns offentlige metadata-API-er, og gjør det enkelt å se hvilke tjenester som finnes, hvem som eier dem, hvilke roller og tilgangspakker som gir tilgang, og hvilke autentiseringsnivåer de krever.

## Hva prosjektet demonstrerer

- Kall mot Altinn Resource Registry API for å hente ressurslisten, enkeltressurser, policyer og delegerbare rettigheter.
- Kall mot Access Management Metadata API for å hente tilgangspakker, roller og organisasjonstyper.
- Tolkning av XACML-policy serverside for å hente ut minimum autentiseringsnivå per tjeneste.
- Proxymønster som lar frontenden veksle mellom testmiljøet (`tt02`) og produksjon (`prod`) uten kodeendringer.
- Mellomlagring og bakgrunnsjobber som avlaster Altinn-plattformen ved tunge operasjoner som statistikk for autentiseringsnivåer.
- En MCP-server (Model Context Protocol) som eksponerer de samme Altinn-metadataene som verktøy til AI-agenter.

## Teknologi

- Backend: ASP.NET Core (.NET 10) med OpenAPI og SPA-proxy.
- Frontend: React, TypeScript, Vite og Digdir designsystem.
- Delte DTO-er via `Altinn.Authorization.Api.Contracts`.

## Altinn-API-er som brukes

Applikasjonen kaller uautentiserte GET-endepunkter med offentlig tilgjengelige metadata:

- [Resource Registry API](https://docs.altinn.studio/authorization/what-do-you-get/resourceregistry/) for ressurser, policyer og tjenesteeiere.
- Access Management Metadata API for tilgangspakker og roller.

## Prøv applikasjonen

Applikasjonen kjører på
[tjenesteoversikten.no](https://tjenesteoversikten.no).

## Les mer

Prosjektet finnes på GitHub:
[altinnservicecatalogue](https://github.com/TheTechArch/altinnservicecatalogue).
