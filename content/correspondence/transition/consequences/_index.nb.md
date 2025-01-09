---
title: Konsekvenser
linktitle: Konsekvenser
description: Konsekvenser for partene som bruker Altinn Melding
tags: []
toc: false
weight: 60
---
Her er en kort oppsummering av hvilke konsekvenser valgt overgangs- og migreringsløsning har for de forskjellige partene:

## Tjenesteeier

- Ved opprettelse av Meldingen i API, blir den opprettet i miljøet som kalles («hjemstedet» til elementet).
  - Dersom i A2 vil migrering skje til A3 etter **migreringsventetid**, men varsling vil fullføres i A2 uavhengig av migrering.
  - Dersom i Altinn 3, så vil Meldingen være tilgjengelig i Altinn 2 Portalen.
- Sjekk av status på Melding opprettet i A2 må gjøres mot A2 og eventuelt deretter mot A3 etter migrering.
  - Siden migrering først utføres etter **migreringsventetid**, antas det at TE ikke trenger å sjekke for samme element i både A2 og A3, men at endringer av interesse allerede har skjedd i A2.
- Man må integrere seg mot Altinn 3 API for å opprette/følge opp nye Meldinger der.
  - De kan bruke de migrerte tjenestene, eller etablere helt nye.

## Sluttbrukere

### Via Altinn 2 portal

- Får en full oversikt i Altinn portal av både Altinn 2 og 3 elementer.
- Når de åpner et Altinn 3 element vises dette i Altinn 2 Portalen, tilnærmet likt som for et Altinn 2 element.

### Via Sluttbrukersystem

- Får først opp Altinn 3 elementer når Sluttbrukersystem har integrert seg mot A3.

### Via Arbeidsflate

- Får opp Meldingene som er opprettet i Altinn 3, samt de som er blitt migrert.
- Meldinger i Altinn 2 som ikke er blitt migrert, **vil ikke være tilgjengelig** siden Arbeidsflate baserer seg på Dialogporten, og Altinn 2 Meldinger ikke er opprettet i Dialogporten fra før.

## SluttbrukerSystem

- For å få full oversikt over elementer vil man måtte integrere seg mot både Altinn 2 og Altinn 3 API.
- Når elementer blir migrert fra A2 til A3 vil det mulig å identifisere dette ved at A3-elementet inneholder Altinn 2 Correspondence ID.
  - Dette gjør det mulig å utelukke evt. duplikater.
- Når elementet er migrert, så må SBS være integrert mot Altinn 3 API for å jobbe videre med det.
  - Men gitt at det migreres etter forventet aktiv tidsrom, burde det ikke være behov.

## Dialogporten og Arbeidsflate

- Altinn 2 elementer er ikke tilgjengelige i Dialogporten før de har blitt migrert og en Dialog blir opprettet som peker til elementet.
- Ved å redusere **migreringsventetid**, kan migrering skje relativt raskt etter at de er opprettet i Altinn 2, og dermed gjøre dem tilgjengelig i Dialogporten og Arbeidsflate.

{{<children />}}
