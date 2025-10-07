---
title: Om Altinn Studio
description: Altinn Studio er et verktøy for å utvikle, drifte og forvalte digitale tjenester til innbyggere og næringsliv.
weight: 1
tags: [needsReview]
cascade:
  params:
    diataxis: diataxis_explanation
---

Plattformen kjører på en sikker, isolert og skalerbar infrastruktur. Den er ferdig integrert mot flere fellesløsninger og åpne API-er.
Du kan bruke Altinn Studio både med brukergrensesnitt for manuell innsending og med API-er for maskin-til-maskin-innsending.


## Hva kan jeg lage med Altinn Studio?
Med Altinn Studio kan du utvikle digitale tjenester for mange forskjellige formål. Det kan være alt fra enkle skjematjenester og innsynsløsninger til komplekse arbeidsflyter med betaling og signering. Plattformen støtter både tradisjonelle skjemaer og skreddersydde applikasjoner med avanserte integrasjoner.

Se [detaljert oversikt over bruksområder](./usecases).

## Altinn Studio er «bindemiddelet»
Et skjema er sjelden bare datafelter som skal sendes inn. Du trenger mer for å lage en god tjeneste. Det kan være:
- kobling mot ID-porten
- innsending til saksbehandlingssystem
- kobling mot nasjonale registre

Altinn Studio har ferdig utviklede integrasjoner mot flere av Digdirs fellestjenester og nasjonale registre. Vi vil fortsette å utvikle disse og legge til flere.

![Altinn Studio er «bindemiddelet»](./studio-i-midten.png "Altinn Studio er bindemiddelet")

## Lavkode og tradisjonell kode
Altinn Studio kombinerer lavkode og tradisjonell koding. Du kan starte med lavkode i Altinn Studio Designer. Har du avanserte behov, kan du bytte til dedikerte utviklingsverktøy som Visual Studio Code.

Målet er å kunne gjøre mest mulig med lavkode, men beholde muligheten for tradisjonell koding og den fleksibiliteten det gir. Slik kan ikke-tekniske ressurser designe og publisere tjenester uten å hente inn utviklere. Samtidig kan du hente inn en utvikler for å lage mer avansert funksjonalitet som krever koding.

![Verktøyet støtter både lavkode og tradisjonell koding](./nocode_vs_coding.png "Verktøyet støtter både lavkode og tradisjonell koding")


## Prinsipper for Altinn Studio
Dette er noen av prinsippene som ligger til grunn for utviklingen av Altinn Studio:

- **Fri og åpen kildekode** fordi vi tror at åpenhet og mulighet for andre til å bidra er veien å gå for utvikling av tjenester i offentlig sektor.
- **Basert på åpne standarder** fordi lukket kode binder deg til leverandør og ofte medfører ekstra kostnader.
- **Skybasert infrastruktur** med løse koblinger og uten binding mot en spesifikk skyleverandør.
- **Bygget på moderne og populære rammeverk** fordi det gjør det lettere både for oss og våre kunder å skaffe tekniske ressurser, og fordi det er noe folk ønsker å jobbe med og lære.
- **Innebygd sikkerhet** der hvert lag i arkitekturen autoriserer bruken uavhengig av hvor kallene kommer fra.
- **Isolasjon** – hver tjenesteeier får sine egne miljøer for test og produksjon.

Se også:
- [Åpen kildekode og samarbeid](./open-source)
- [Forvaltning](./governance)
