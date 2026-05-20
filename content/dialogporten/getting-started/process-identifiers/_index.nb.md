---
title: 'Prosessidentifikatorer'
description: 'Lær hvordan prosessidentifikatorer kan brukes til å lage sammenhenger mellom separate dialoger'
weight: 60
---

## Introduksjon

Noen typer prosesser består av flere distinkte delprosesser/dialoger som ikke enkelt eller hensiktsmessig kan uttrykkes som én og samme dialog, f.eks. når det finnes ulike dialoger som må gjennomføres med forskjellige tjenesteleverandører og som ikke nødvendigvis må skje sekvensielt.

Dialoger kan valgfritt inneholde to prosessrelaterte felt:

- `process`, som identifiserer forretningsprosessen dialogen tilhører
- `precedingProcess`, som identifiserer en forretningsprosess som logisk kom før den som refereres av `process`

Begge feltene er enkle URI/URN-strenger. `precedingProcess` kan ikke settes med mindre `process` også er satt.

## Bruksscenarier

Typiske bruksområder for disse feltene er:

- Å gruppere flere dialoger som tilhører samme overordnede sak eller prosess, selv når dialogene håndteres av ulike tjenester eller tjenesteeiere
- Å knytte en dialog til en tidligere prosess når en ny dialog starter som følge av en tidligere prosess
- Å filtrere dialoger på `process` i både sluttbruker- og tjenesteeiersøke-API-er
- Å korrelere dialoger i Altinn Events, der `process` og `precedingProcess` inngår i hendelsespayloaden når de finnes på dialogen

{{<notice info>}}
Arbeidsflate benytter for øyeblikket ikke funksjonaliteten `process` / `precedingProcess`, men dette kan endre seg i fremtiden.
{{</notice>}}

{{<children />}}
