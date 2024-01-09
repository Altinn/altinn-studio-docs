---
title: Apps infrastruktur tilganger
linktitle: Apps
description: Hvordan bestille tilganger til Altinn Apps infrastruktur.
toc: false
weight: 200
---

## Tilgang til logger og hemmeligheter

Det er definert to forskjellige typer roller for tilgang i driftsmiljøene i Altinn Apps.

- _Developer_ gir tilgang til _Application Insights_ der applikasjonslogger samles for tjenesteeier sine applikasjoner i miljøet.
- _Operations_ gir tilgang til _Key Vault_ for å laste opp hemmeligheter som sertifikater, passord og api-nøkler.

Disse rollene er videre delt opp i tilgang til test (TT02) og produksjon (prod). En bruker kan tildeles en eller flere roller.

Tjenesteeiere kan bestille følgende tilganger for sine ressurser i miljøene TT02 og produksjon:

- Test Developer
- Test Operations
- Prod Developer
- Prod Operations

For å få aksess til disse rollene må autoriserte bestillere hos Tjenesteeier, bestille dette på vår [Selvbetjeningsportal](https://www.altinndigital.no/oversikt).
Portalen beskriver også hvordan man oppretter en ny bruker hvis man ikke har dette fra før av.

For å opprette en ny sak for å søke om tilgang trykker man først på fanen _Support_ og så _Ny sak_ i menyen til venstre.
* På første side av skjemaet huk av for valgene _Bestilling_ og _Tilganger_.
* Huk så av for _Altinn 3.0 - Apps_ på andre side.
* Til slutt fylles kontaktinformasjon for brukeren ut, samt hvilke roller hen skal ha tilgang til.

Når rollene har blitt tildelt kan logger og/eller hemmeligheter aksesseres via [Microsoft Azure Portal](https://portal.azure.com).
