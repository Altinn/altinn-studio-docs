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
  - Dersom i A2 vil migrering skje til A3 etter kort tid, men **varsling** vil fullføres i A2 uavhengig av migrering.
  - Dersom i Altinn 3, så vil Meldingen være tilgjengelig i Altinn 2 Portalen.
    - A3 Meldinger vil ikke være tilgjengelige via A2 API.
- Sjekk av status på Melding opprettet i A2 må gjøres mot A2 før migreringstidspunkt, deretter enten A2 eller A3.

- Man må integrere seg mot Altinn 3 API for å opprette/følge opp nye Meldinger der.
  - TE må opprette nye Ressurser i RessursRegisteret for sine nye tjenester, se [guide](../../getting-started/developer-guides/serviceowner/) her.
  - Ressurser for Migrerte meldinger blir opprettet av Flytt av Data prosjektet.

## Sluttbrukere

### Via Altinn 2 portal

- Får full oversikt i Altinn-portalen over både Altinn 2- og Altinn 3-meldinger.
- Når de åpner et Altinn 3 element vises dette i Altinn 2 Portalen, tilnærmet likt som for et Altinn 2 element.

### Via Sluttbrukersystem

- Får først opp Altinn 3 meldinger når Sluttbrukersystem har integrert seg mot A3.

### Via Arbeidsflate

- Får opp Meldingene som er opprettet i Altinn 3, samt de meldinger som er blitt migrert fra Altinn 2 og tilgjengeligjort i Dialogporten.
- Meldinger i Altinn 2 som ikke er blitt migrert, og ikke er blitt opprettet i **vil ikke være tilgjengelig** siden Arbeidsflate baserer seg på Dialogporten, og Altinn 2 Meldinger ikke er opprettet i Dialogporten fra før.

## SluttbrukerSystem

- For å få full oversikt over meldinger vil man måtte integrere seg mot både Altinn 2 og Altinn 3 API.
- Når meldinger blir migrert fra A2 til A3, vil det være mulig å identifisere dem ved at A3-elementet inneholder Altinn 2 Correspondence ID.
- Når elementet er migrert, kan sluttbrukersystemet jobbe med det via enten Altinn 2- eller Altinn 3-API. Merk at **endringer utført via A3-API ikke synkroniseres til A2**.
  - Men de må sørge for å håndtere migrerte meldinger på en god måte slik at de ikke jobber med både Altinn 2 og Altinn 3 versjonen av det aktuelle elementet.

## Dialogporten og Arbeidsflate

- Altinn 2 meldinger er ikke tilgjengelige i Dialogporten før de har blitt migrert til Altinn 3 Melding og en Dialog blir opprettet i Dialogporten som peker til meldingen.
- Dialogporten / Arbeidsflate styrer når migrerte meldinger skal tilgjengeligjøres hos dem ved å kalle et dedikert API-endepunkt hos Altinn 3 Melding for å hente ut migrerte meldinger, og deretter oppretter en Dialog basert på det.

{{<children />}}
