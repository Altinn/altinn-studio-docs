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
  - Dersom den opprettes i Altinn 2, vil migrering skje til Altinn 3 etter kort tid, men varslingen vil fullføres i A2 uavhengig av migrering.
  - Dersom i Altinn 3, så vil Meldingen være tilgjengelig i Altinn 2 Portalen.
    - A3 Meldinger vil ikke være tilgjengelige via A2 API.
- Sjekk av status på meldinger opprettet i A2 må gjøres mot A2 inntil melding er migrert, deretter kan man gå mot enten A2 eller A3.
  - Vi anbefaler at man benytter Altinn 3 APIene så fort som mulig, og når [CorrespondenceSync](/nb/correspondence/transition/data-migration/#synkronisering-av-statusendringer-mellom-altinn-2-og-3) løsningen er i drift, bør man unngå å benytte Altinn 2 API.
- Man **må** integrere seg mot Altinn 3 API for å opprette/følge opp nye meldinger der.

## Sluttbrukere

### Via Altinn 2 portal

- Får full oversikt i Altinn-portalen over både Altinn 2- og Altinn 3-meldinger.
- Når de åpner et Altinn 3 element vises dette i Altinn 2 Portalen, tilnærmet likt som for et Altinn 2 element.

### Via Sluttbrukersystem

- Får først opp Altinn 3 meldinger når Sluttbrukersystem har integrert seg mot A3.

### Via Arbeidsflate

- Viser meldingene opprettet i Altinn 3 og de migrerte Altinn 2-meldingene som er tilgjengeliggjort i Dialogporten.
- Meldinger fra Altinn 2 som verken er migrert eller opprettet i Dialogporten, vil ikke vises i Arbeidsflate, da den baserer seg på Dialogporten.  

## SluttbrukerSystem

- For å få full oversikt over meldinger vil man måtte integrere seg mot **både** Altinn 2 og Altinn 3 API.
- Når meldinger blir migrert fra A2 til A3, vil det være mulig å identifisere dem ved at A3-versjonen av meldingen inneholder Altinn 2 Correspondence ID/ReporteeElementId/AR.
- Når meldingen er migrert, kan sluttbrukersystemet jobbe med det via enten Altinn 2- eller Altinn 3-API. Endringer på meldingene vil bli synkronisert på tvers, men vær OBS på at det kan være en forsinkelse før det er blitt oppdatert.
- SBS må sørge for å håndtere migrerte meldinger på en god måte slik at de ikke jobber med både Altinn 2 og Altinn 3 versjonen av det aktuelle elementet.
  - Vi anbefaler at så fort [CorrespondenceSync](/nb/correspondence/transition/data-migration/#synkronisering-av-statusendringer-mellom-altinn-2-og-3) løsningen er i drift, så stanser sluttbrukersystemet med bruk av Altinn 2 API.

## Dialogporten og Arbeidsflate

- Altinn 2 meldinger er ikke tilgjengelige i Dialogporten før de har blitt migrert til Altinn 3 Melding og en Dialog blir opprettet i Dialogporten som peker til meldingen.
- For historiske meldinger vil Dialogporten / Arbeidsflate styrer når disse skal tilgjengeligjøres hos dem, og det er Team Melding og Formidling som er ansvarlige for å implementere og utføre aksjonene i Altinn 3 Melding for å opprette Dialogene og tilgjengeligjøre meldingene.
- Når man er kommet i fasen "Løpende migrering og tilgjengeliggjøring av meldinger", vil migreringskomponenten for meldingsdata automatisk opprette dialogen som en del av operasjonen for å mirgere ferske meldinger til Altinn 3 Melding.

{{<children />}}
