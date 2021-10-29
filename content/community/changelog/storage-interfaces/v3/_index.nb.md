---
title: v3
description: Oversikt over endringer introdusert i v3 av Altinn.Platform.Storage.Interface.
toc: true
weight: 90
---

## 3.4.0 Lagt til MessageBoxConfig på modellen Applicaton

- `Application` modellen har blitt utvidet med en ny egenskap for å holde på en meldingsbokskonfigurasjon.

## 3.3.0 Lagt til Tags på modellen DataElement

- `DataElement` modellen har blitt utvidet med en ny egenskap for å holde på en liste med stikkord (tags).

## 3.2.0 Innføring av ny modell OnEntryConfig

- Innføring av en ny model, `OnEntryConfig` for å støtte definering av hva som skal skje når en bruker åpner opp en applikasjon. Modellen er lagt inn som en egenskap på `Application`.

## 3.0.1 Innføring av ny modell DataValues

- Modellen `DataValues` er innført til å representere input til API endepunkt for registrering av tekster fra skjema direkte på en Instance.

## 3.0.0 Refactoring and model application/instance model changes

### Endringer som krever tilpassninger i app kode (breaking changes)

- Modellen `PresentationField` har endret navn til `DataField`.
  Dette gjøres slik at den kan benyttes i flere sammenhenger. Bruken av modellen er utvidet til å representere et element i egenskapen `DataFields` på `Application` i tillegg til at den fortsatt brukes for å representere elementer i egenskapen `PresentationFields`. Det er ingen andre endringer i modellen eller hvordan den blir brukt.

### Andre endringer

- `Application` modellen er utvidet med en ny egenskap kalt `DataFields` og `Instance` er utvidet med korresponderende egenskap kalt `DataValues` for å holde verdiene identifisert basert på `DataFields`.
