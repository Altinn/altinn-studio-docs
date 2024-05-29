---
title: Lag skjema
description: Lag første versjon av skjemaet
linktitle: Lag skjema
tags: [apps, training, form]
weight: 30
---

I denne modulen skal du sette opp et enkelt skjema basert på kravene fra Sogndal kommune.

### Temaer som dekkes i denne modulen

- Legge til skjemakomponenter og koble dem til datamodell
- Redigering av tekster i skjema

### Krav fra kommunen

Skjemaet innhenter personlig informasjon om tilflytteren og skal ha følgende komponenter:
- Navn
  - Fornavn
  - Mellomnavn (valgfritt)
  - Etternavn
- Alder
- Adresse
  - Gateadresse
  - Postnummer
  - Poststed
- Kontaktinformasjon
  - Epost
  - Telefon

## Lag skjema

Du kan sette opp skjemaet fra "Lage"-siden. Naviger til denne via "Lage"-knappen i topp-menyen.

Der ser du at det er opprettet en tom første-side for skjemaet som utgangspunkt.

1. Sett opp skjemaet basert på kravene fra kommunen.
   - Pass på å legge inn ledetekster for alle skjemafelter.
   - For adresse kan du bruke Adresse-komponenten som ligger under "Avansert", eller 3 tekstfelter.
   - For at skjemaet skal kunne sendes inn må du legge til en "Knapp" på den siste siden.
   - Alle skjemafelter må knyttes til tilhørende felt i datamodellen - dette gjør du i "Datamodellknytninger"-seksjonen
      i høyre-panelet.

Husk å laste opp endringer når du jobber i Designer så de reflekteres i det sentrale filområdet til tjenesten.

### Nyttig dokumentasjon

- [Brukerveiledning - lag en enkel tjeneste](/nb/altinn-studio/guides/basic-form)
- [Tilgjengelige komponenter i Altinn Studio](/altinn-studio/designer/build-app/ui-designer/components/)
- [Retningslinjer for bruk av komponenter](/nb/altinn-studio/guides/design/guidelines/components/)

## Oppsummering

I denne modulen har du opprettet en tjeneste i Altinn Studio,
lagd en datamodell og satt opp et skjema som kobler komponenter til feltene i datamodellen.

{{<navigation-buttons
  urlBack="../datamodel"
  textBack="<< Forrige modul"
  urlNext="../create-form"
  textNext="Neste modul >>"
>}}
