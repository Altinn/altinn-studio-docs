---
title: Produksjonssetting av apper
linktitle: Produksjonssetting
description: Tjenesteeier kan selv produksjonssette sine applikasjoner, og gjøre vedlikehold av kode og avhengigheter.
toc: true
weight: 60
---

## Få tilgang til et produksjonsmiljø

Første gang man skal gjøre deploy av en applikasjon til produksjonsmiljøet er det behov for at det er satt opp et eget tjenesteeier-cluster.
For å få dette gjelder følgende prosess:

1. [Send en e-post](mailto:tjenesteeier@digdir.no) med en beskjed om hvilken/hvilke apps du har klar til produksjonssetting.
2. Vent på beskjed om at cluster er opprettet.

Denne rutinen trenger bare å følges en gang. Når clusteret er satt opp, er løsningen selvbetjent etterpå.

## Produksjonssette en app

Produksjonssetting av applikasjonen gjøres på [samme måte som for testmiljøer](/nb/altinn-studio/reference/testing/deploy).
Den som skal produksjonssette app'en må være medlem av gruppen `Deploy-Production` for sin organisasjon i Altinn Studio.
Tilgang til grupper i Altinn Studio administreres av hver enkelt organisasjon i Altinn Studio.
[Les mer om tilganger i Altinn Studio](/nb/altinn-studio/guides/access-management/studio/).


## Bestille Om skjema-side

Altinn vedlikeholder en [oversikt over alle tjenester i løsningen](https://www.altinn.no/skjemaoversikt/). For at Altinn brukerservice skal kunne hjelpe brukerne med en tjeneste, må informasjon legges inn her. For å sikre effektiv kommunikasjon med Altinn brukerservice og en smidig tildeling av rettigheter til tjenesten, er det avgjørende å registrere nøyaktig samme navn på både Om skjema-siden og i Appen. Bestillingsskjemaet heter _"Publiser informasjon om tjeneste på Altinn PROD og TT02"_, og finnes etter innlogging på [altinndigtal.no](https://altinndigital.no).


**Merk!** Bestillingsskjemaet er inntil videre optimalisert for Altinn II-tjenester. Gjør derfor følgende:

- I feltet _"Tjenestekode"_, oppgi 9999 og i feltet _"Utgavekode"_ oppgi 9999
- I feltet _"Hvem skal bruke skjemaet"_ husk å angi hvilke roller som er satt på tjenesten i tillegg til beskrivelsen av hvem tjenesten er for.

{{<children />}}
