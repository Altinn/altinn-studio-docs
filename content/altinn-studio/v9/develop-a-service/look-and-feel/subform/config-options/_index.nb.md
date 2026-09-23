---
draft: true
title: Innstillinger for underskjema
linktitle: Innstillinger
description: Oversikt over innstillingene for komponenten Tabell for underskjema (Subform)

tags: [needsReview]
---

Denne siden beskriver innstillingene du kan sette på komponenten **Tabell for underskjema** (`Subform`) i layoutfilen til hovedskjemaet. Du finner en fullstendig liste over egenskaper i [komponentoversikten]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/Subform" >}}).

## Innstillinger

| Innstilling                                   | Type   | Påkrevd | Beskrivelse                                                                                                                                                     |
| --------------------------------------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                            | string | Ja      | En unik ID, som på andre komponenter. Må være unik på tvers av alle sidene i mappen.                                                                             |
| type                                          | string | Ja      | Må være `Subform`.                                                                                                                                              |
| layoutSet                                     | string | Ja      | Navnet på mappen under `App/ui` som inneholder sidene til underskjemaet.                                                                                        |
| [tableColumns](#tablecolumns)                 | array  | Ja      | Kolonnene i tabellen. Hver kolonne har en overskrift og innholdet i cellene.                                                                                   |
| showAddButton                                 | bool   | Nei     | Om tabellen skal vise knappen for å legge til en oppføring. Standardverdien er `true`.                                                                         |
| showDeleteButton                              | bool   | Nei     | Om tabellen skal vise knappen for å slette en oppføring. Standardverdien er `true`.                                                                            |
| entryDisplayName                              | string | Nei     | Navnet på hver oppføring. Kan være et [uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/expressions" >}}). Appen bruker navnet som overskrift på hver oppføring i en fullstendig oppsummering. Appen viser oppføringene i sidemenyen bare hvis du har satt `entryDisplayName`. |
| summaryDelimiter                              | string | Nei     | Tegnet som skiller verdiene fra hverandre i den gamle oppsummeringskomponenten (`Summary`). Standardverdien er ` — `.                                           |
| [textResourceBindings](#textresourcebindings) | object | Nei     | Tekstene til komponenten.                                                                                                                                       |

{{% notice warning %}}
Har du satt `disallowUserCreate` til `true` for datatypen i `applicationmetadata.json`, må du også sette `showAddButton` til `false`. Ellers viser appen en feilmelding om at komponenten er satt opp feil.
{{% /notice %}}

## textResourceBindings

Du kan tilpasse disse tekstene i `textResourceBindings`-objektet:

| Tekst             | Beskrivelse                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| `title`           | Tittelen på tabellen. Uten tittel viser appen heller ikke `description` og `help`. |
| `description`     | En beskrivelse som står under tittelen.                                 |
| `help`            | En hjelpetekst.                                                         |
| `addButton`       | Teksten på knappen for å legge til en oppføring. Uten denne teksten viser knappen bare et plusstegn, så sett alltid en tekst. |
| `tableEditButton` | Teksten på knappen for å endre en oppføring. Kan være et uttrykk som henter verdier fra oppføringen. Standardteksten er **Endre**. |

## tableColumns

`tableColumns` er en liste med kolonnene i tabellen. Hver kolonne må ha `headerContent` og `cellContent`.

| Innstilling           | Påkrevd | Beskrivelse                                                                                                                         |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| headerContent         | Ja      | Overskriften på kolonnen. Kan være en tekstressurs, men kan ikke hente verdier fra datamodellen.                                    |
| cellContent.value     | Ja      | Et uttrykk som henter verdien i cellen fra datamodellen til underskjemaet, vanligvis `["dataModel", "feltnavn"]`.                   |
| cellContent.default   | Nei     | Teksten appen viser hvis `value` ikke gir noe resultat. Kan være en tekstressurs.                                                   |

```json
"tableColumns": [
  {
    "headerContent": "kjoretoy-tabell.regnr",
    "cellContent": {
      "value": ["dataModel", "RegNr"]
    }
  },
  {
    "headerContent": "kjoretoy-tabell.eier",
    "cellContent": {
      "value": ["dataModel", "Eier.Navn"],
      "default": "kjoretoy-tabell.eier.ukjent"
    }
  }
]
```

{{% notice info %}}
Eldre apper bruker `query` i stedet for `value`, for eksempel `"query": "Eier.Navn"`. `query` er utgått, men virker fortsatt. Designer lager foreløpig kolonner med `query`. Bytter du til `value`, kan du bruke uttrykk, for eksempel til å sette sammen flere felter i én kolonne.

I `value` og `entryDisplayName` kan du ikke bruke uttrykk som leser verdier fra komponenter, for eksempel `component` og `displayValue`. Bruk `dataModel` i stedet.
{{% /notice %}}

## Innstillinger for oppsummering

Når du oppsummerer tabellen med `Summary2`, kan du velge visningstype med `display` i `overrides`:

- `table` viser de samme kolonnene som tabellen.
- `full` viser alle opplysningene i hver oppføring.

Sett alltid `display`. Skjemaet oppgir `table` som standardverdi, men setter du ikke `display`, viser appen i dag fullstendig visning.

```json
{
  "id": "oppsummering",
  "type": "Summary2",
  "target": {
    "type": "component",
    "id": "kjoretoy-tabell"
  },
  "overrides": [
    {
      "componentId": "kjoretoy-tabell",
      "display": "table"
    }
  ]
}
```
