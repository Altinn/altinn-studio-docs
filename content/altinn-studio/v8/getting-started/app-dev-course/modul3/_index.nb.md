---
title: "Modul 3: Utforme skjemaet"
description: I denne modulen skal du lage første versjon av skjemaet.
linktitle: "Modul 3: Utforme skjemaet"
tags: [apps, training, form]
weight: 30
---

I denne modulen skal du sette opp et enkelt skjema basert på kravene fra Sogndal kommune.

## Temaer som dekkes i denne modulen

- Legge til skjemakomponenter og koble dem til datamodell
- Redigere tekster i skjemaet

## Krav fra kommunen

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
  - E-postadresse
  - Telefon

## Lag skjemaet

Gå til Utforming i menyen for å sette opp skjemaet.

Du ser at skjemaet har en tom førsteside. Den kan du bruke som utgangspunkt.

Sett opp skjemaet ut fra kravene til kommunen.

- Velg om du vil sette opp tre tekstfelter selv, eller bruke adressekomponenten under Avansert.
- På den siste siden må du legge til en knapp. Velg komponenten Send inn til dette.
- Pass på å legge inn ledetekster for alle skjemafelter.
- Gå til Datamodellknytninger i panelet til høyre for å knytte alle feltene du lager i skjemaet til datamodellfeltene du lagde tidligere.
- Vi anbefaler at du laster opp endringene dine underveis når du jobber på Utforming-siden. Da blir de lagret sammen med resten av tjenesten.


## Nyttig dokumentasjon

- [Brukerveiledning - lag en enkel tjeneste]({{< relref "/altinn-studio/v8/guides/development/basic-form" >}})
- [Tilgjengelige komponenter i Altinn Studio]({{< relref "/altinn-studio/v8/designer/build-app/ui-designer/components/" >}})
- [Retningslinjer for bruk av komponenter]({{< relref "/altinn-studio/v8/guides/design/guidelines/components/" >}})

## Oppsummering

I denne modulen har du opprettet en tjeneste i Altinn Studio,
lagd en datamodell og satt opp et skjema som kobler komponenter til feltene i datamodellen.

{{<navigation-buttons
  urlBack="../modul2"
  textBack="<< Forrige modul"
  urlNext="../modul4"
  textNext="Neste modul >>"
>}}
