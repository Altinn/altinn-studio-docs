---
title: TimePicker (Tid)
linktitle: TimePicker (Tid)
description: En komponent som lar brukeren velge et klokkeslett i et skjema.
schemaname: TimePicker
weight: 10
toc: true
---

## Bruk

`TimePicker`-komponenten lar brukeren velge et klokkeslett i et skjema. Den tilbyr et brukervennlig grensesnitt for tidsinntasting med støtte for ulike tidsformater, inkludert 12-timers og 24-timers format, med valgfri visning av sekunder.

### Anatomi

1. **Inputfeltene**: Brukeren kan skrive inn et klokkeslett ved hjelp av tastaturet, eller opp- og ned-pilene. Bytt mellom timer/minutter/sekunder med piltastene eller Tab-tasten.
   ![Timepicker inndata](simpletimepicker.png)
2. **Nedtrekksmeny**: Ved å klikke på klokke-ikonet åpnes nedtrekksmenyen, som lar brukeren velge tidspunkt med musen.
   ![Timepicker nedtrekksmeny](dropdownopen.png "Timepicker nedtrekksmeny")

### Relatert

- [`Datepicker`](/nb/altinn-studio/v8/reference/ux/components/datepicker)
- [`Date`](/nb/altinn-studio/v8/reference/ux/components/date)

## Egenskaper

| **Property**                           | **Type**  | **Description**                                                                                                         |
|----------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------|
| `id`                                   | string    | Unik ID-streng for komponenten. Kan ikke slutte med <bindestrek><tall>.                                                 |
| `dataModelBindings.simpleBinding`      | string    | Datamodellkobling til komponentens felt i datamodellen. Feltet må være av type string.                                  |
| `textResourceBindings.title`           | string    | Tittelen/ledeteksten for komponenten.                                                                                   |
| `textResourceBindings.description`     | string    | Beskrivelsesfelt for komponenten (valgfritt).                                                                           |
| `textResourceBindings.help`            | string    | Hjelpefelt for komponenten (valgfritt).                                                                                 |
| `required`                             | boolean   | Boolean eller uttrykk som indikerer om komponenten er påkrevd når en bruker fyller ut skjemaet. Standard er false.      |
| `readOnly`                             | boolean   | Boolean eller uttrykk som indikerer om komponenten skal presenteres som kun lesbar. Standard er false.                  |
| `format`                               | string    | Tidsformat brukt for visning og inndata. Standard er `HH:mm`. <br/><br/>**Enum:** [HH:mm, HH:mm:ss, hh:mm a, hh:mm:ss a] |
| `minTime`                              | string    | Setter det tidligste tillatte klokkeslettet i HH:mm-format. Kan være en statisk verdi eller et uttrykk.                 |
| `maxTime`                              | string    | Setter det seneste tillatte klokkeslettet i HH:mm-format. Kan være en statisk verdi eller et uttrykk.                   |
| `hidden`                               | boolean   | Boolean eller uttrykk som indikerer om komponenten skal være skjult. Standard er false.                                 |

## Konfigurering

### Legg til komponent

```json
{
  "id": "avtale-klokkeslett",
  "type": "TimePicker",
  "dataModelBindings": {
    "simpleBinding": "avtaleTid"
  },
  "textResourceBindings": {
    "title": "Velg klokkeslett for avtale"
  }
}
```

### Tidsformat

`format`-egenskapen kontrollerer hvordan klokkeslettet vises og skrives inn. Du kan velge mellom 24-timers og 12-timers formater, med valgfrie sekunder.

#### `format`

Setter tidsformatet for visning og inndata. Basert på vanlige mønstre for tidsformatering.

- `HH:mm` - 24-timers format uten sekunder (standard)
- `HH:mm:ss` - 24-timers format med sekunder
- `hh:mm a` - 12-timers format med AM/PM, uten sekunder
- `hh:mm:ss a` - 12-timers format med AM/PM, med sekunder

#### Eksempel

TimePicker med 12-timers format:

```json
{
  "id": "avtale-klokkeslett",
  "type": "TimePicker",
  "dataModelBindings": {
    "simpleBinding": "avtaleTid"
  },
  "textResourceBindings": {
    "title": "Velg klokkeslett for avtale"
  },
  "format": "hh:mm a"
}
```

### Tidsbegrensninger

Du kan angi minimums- og maksimumstidspunkt ved hjelp av `minTime` og `maxTime` egenskapene.

#### `minTime`

Setter det tidligste tillatte klokkeslettet. Må være i HH:mm-format (24-timers). Kan være en statisk verdi eller et uttrykk.

#### `maxTime`

Setter det seneste tillatte klokkeslettet. Må være i HH:mm-format (24-timers). Kan være en statisk verdi eller et uttrykk.

#### Eksempel

TimePicker begrenset til kontortid (09:00-17:00):

```json
{
  "id": "avtale-klokkeslett",
  "type": "TimePicker",
  "dataModelBindings": {
    "simpleBinding": "avtaleTid"
  },
  "textResourceBindings": {
    "title": "Velg klokkeslett for avtale",
    "description": "Velg et tidspunkt mellom kl. 09:00 og 17:00"
  },
  "minTime": "09:00",
  "maxTime": "17:00",
  "format": "hh:mm a",
  "required": true
}
```