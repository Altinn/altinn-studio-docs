---
draft: true
title: Oversikt over komponenter, versjonering og forvaltningsansvar
linktitle: Komponenter, versjoner og ansvar
description: Oversikt over komponenter, versjonering og forvaltningsansvar i Altinn Studio.
weight: 3
---

Her er viktige tjenester og biblioteker som Studio-teamet eier og forvalter:

## Studio Designer
[Studio Designer](https://altinn.studio/) er verktøyet der du designer tjenester.

- Nye funksjoner og feilrettinger publiseres løpende
- Utvikling og arbeid organiseres [i Altinn/altinn-studio GitHub-repo](https://github.com/Altinn/altinn-studio)

## App-biblioteker
App-bibliotekene består av [Altinn.App.Api, Altinn.App.Core](https://github.com/Altinn/app-lib-dotnet) og [frontend](https://github.com/Altinn/app-frontend-react).

- Bibliotekene ligger på NuGet.org. Alle Studio-apper refererer til disse bibliotekene
- Vi bruker [SemVer 2.0](https://semver.org/) for versjonering. Forhåndsversjoner består av `preview`- og `rc` (release candidate)-stadier. Når `rc`-stadiet er nådd, er målet vårt kun å gjøre feilrettinger og patching frem til stabilisering
- HTTP API-ene som beskrives i appen via OpenAPI-spesifikasjon, følger egen versjonering. API-endringer her skjer i takt med major versjonsendring i resten av appen (bibliotekene). Merk at det kan være API-er som _ikke_ er beskrevet i OpenAPI-spesifikasjoner. Disse er ment til internt bruk, og vi kan gjøre endringer på disse uten å kommunisere det
- Utvikling og arbeid organiseres [i Altinn/app-lib-dotnet](https://github.com/Altinn/app-lib-dotnet) og [Altinn/app-frontend-react](https://github.com/Altinn/app-frontend-react) GitHub-repo

## Localtest
[Localtest](https://github.com/Altinn/app-localtest) er en lokal kopi av kjerne-API-ene i Altinn-plattformen.

- Nye funksjoner og feilrettinger publiseres løpende ved behov
- Utvikling og arbeid organiseres [i Altinn/app-localtest GitHub-repo](https://github.com/Altinn/app-localtest)

## Ansvar for apper
Appene i seg selv eies og forvaltes av tjenesteeierorganisasjonene.
