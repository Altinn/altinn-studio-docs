---
title: Redigere rader
linktitle: Redigering
description: Slik bestemmer du hvordan brukeren redigerer en rad i en repeterende gruppe, og hvilke knapper brukeren ser
weight: 1
toc: true
tags: [needsReview]
---

Med egenskapen `edit` bestemmer du hvordan brukeren fyller ut og endrer en rad i en repeterende gruppe. Du kan for eksempel velge om tabellen skal være synlig mens brukeren redigerer, og hvilke knapper brukeren skal se.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json {hl_lines=["8-12"]}
{
  "id": "personer",
  "type": "RepeatingGroup",
  "children": ["person-fornavn", "person-etternavn"],
  "dataModelBindings": {
    "group": "personer"
  },
  "edit": {
    "mode": "hideTable",
    "openByDefault": "first",
    "alertOnDelete": true
  }
}
```

## Oversikt over innstillingene

| Innstilling           | Standardverdi  | Kan være et uttrykk | Beskrivelse                                                                                             |
|-----------------------|----------------|---------------------|---------------------------------------------------------------------------------------------------------|
| [`mode`](#mode)       | `"showTable"`  | Nei                 | Om tabellen skal være synlig mens brukeren redigerer en rad.                                            |
| [`addButton`](#addbutton) | `true`     | Ja                  | Om brukeren skal se **Legg til ny**-knappen.                                                            |
| [`alwaysShowAddButton`](#alwaysshowaddbutton) | `false` | Nei      | Om brukeren skal se **Legg til ny**-knappen også mens en rad er åpen.                                   |
| [`editButton`](#editbutton) | `true`   | Ja                  | Om brukeren skal se **Rediger**-knappen i tabellen.                                                      |
| [`saveButton`](#savebutton) | `true`   | Ja                  | Om brukeren skal se **Lagre og lukk**-knappen når en rad er åpen.                                       |
| [`saveAndNextButton`](#saveandnextbutton) | `false` | Ja         | Om brukeren skal se **Lagre og åpne neste**-knappen når en rad er åpen.                                 |
| [`deleteButton`](#deletebutton) | `true` | Ja                | Om brukeren skal se **Slett**-knappen.                                                                  |
| [`alertOnDelete`](#alertondelete) | `false` | Ja             | Om brukeren må bekrefte før appen sletter en rad.                                                       |
| [`compactButtons`](#compactbuttons) | `false` | Nei          | Om knappene **Rediger** og **Slett** i tabellen bare skal vise et ikon.                                 |
| [`buttonLayout`](#buttonlayout) | `"horizontal"` | Nei       | Om knappene **Rediger** og **Slett** skal stå ved siden av hverandre eller under hverandre.             |
| [`openByDefault`](#openbydefault) | `false` | Nei            | Om appen skal åpne en rad automatisk når brukeren kommer til siden.                                     |
| [`multiPage`](#multipage) | `false`    | Nei                 | Om brukeren skal fylle ut en rad over flere sider.                                                      |

Når en innstilling kan være et uttrykk, kan du bruke et [dynamisk uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/expressions" >}}) i stedet for `true` eller `false`. Appen vurderer uttrykket for hver rad for alle disse innstillingene unntatt `addButton`. Du kan altså for eksempel skjule **Slett**-knappen på bare noen av radene.

## mode

Med `mode` bestemmer du om tabellen med alle radene skal være synlig mens brukeren redigerer en rad. Du kan velge mellom disse verdiene:

| Verdi         | Beskrivelse                                                                                                                                                                       |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `"showTable"` | Standardverdien. Appen viser tabellen, og raden brukeren redigerer, åpner seg inne i tabellen.                                                                                   |
| `"hideTable"` | Appen skjuler tabellen mens en rad er åpen. Brukeren har alltid en knapp for å komme ut av raden. Hvis du har skjult både **Lagre og lukk** og **Lagre og åpne neste**, viser appen **Lagre og lukk** likevel. |
| `"showAll"`   | Appen viser ingen tabell, men viser alle radene åpne under hverandre. Brukeren ser ingen knapp for å lagre og lukke en rad, men appen lagrer dataene uansett.                    |
| `"onlyTable"` | Appen viser tabellen, men brukeren kan aldri åpne en rad. Passer sammen med [redigering direkte i tabellen]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/grouping/repeating/table#redigere-direkte-i-tabellen" >}}).             |

## addButton

Med `addButton` bestemmer du om brukeren skal se **Legg til ny**-knappen under tabellen. Sett den til `false` hvis brukeren bare skal se dataene og ikke skal kunne legge til rader.

Knappen forsvinner også når gruppen har så mange rader som `maxCount` tillater.

Du kan endre utseendet på knappen med egenskapen `addButton` på selve gruppen, utenfor `edit`. Der kan du sette `size` (`"sm"`, `"md"` eller `"lg"`), `fullWidth`, `textAlign` og `position`.

## alwaysShowAddButton

Vanligvis skjuler appen **Legg til ny**-knappen mens en rad er åpen. Med `"alwaysShowAddButton": true` ser brukeren knappen også da. Når brukeren klikker på den, lukker appen raden som er åpen, og åpner den nye raden. Hvis du bruker `validateOnSaveRow` og den åpne raden har feil, må brukeren rette dem før appen legger til en ny rad.

Også med `alwaysShowAddButton` ser brukeren bare knappen hvis

- `addButton` ikke er satt til `false`
- gruppen har færre rader enn `maxCount`

Innstillingen er spesielt nyttig sammen med [`openByDefault`](#openbydefault). Når appen åpner en rad automatisk, skjønner ikke alltid brukeren at det går an å legge til flere.

## editButton

Med `editButton` bestemmer du om brukeren kan åpne en rad. Standard er at brukeren kan det.

Er `editButton` `false`, ser brukeren ikke **Rediger**-knappen i tabellen. Appen åpner heller ikke raden på andre måter:

- [`openByDefault`](#openbydefault) åpner ikke raden.
- Legger brukeren til en rad med **Legg til ny**, legger appen til raden, men åpner den ikke.

Skal brukeren kunne legge til rader når `editButton` er `false`, må brukeren kunne fylle ut feltene [direkte i tabellen]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/grouping/repeating/table#redigere-direkte-i-tabellen" >}}), eller `mode` må være `"showAll"`.

Hvis `mode` er `"onlyTable"`, ser brukeren aldri knappen, uansett hva du setter `editButton` til.

## saveButton

Med `saveButton` bestemmer du om brukeren skal se **Lagre og lukk**-knappen når en rad er åpen. Standard er at brukeren ser knappen.

Med `"mode": "showAll"` ser brukeren aldri knappen, fordi brukeren ikke kan lukke radene i den modusen. Appen lagrer dataene uansett.

## saveAndNextButton

Med `saveAndNextButton` bestemmer du om brukeren skal se **Lagre og åpne neste**-knappen når en rad er åpen. Knappen lagrer raden og åpner den neste. Standard er at brukeren ikke ser knappen.

Brukeren ser bare knappen når det finnes en rad etter den som er åpen. På den siste raden ser brukeren **Lagre og lukk** i stedet.

Innstillingen har ingen virkning med `"mode": "showAll"`.

## deleteButton

Med `deleteButton` bestemmer du om brukeren skal se **Slett**-knappen. Standard er at brukeren ser knappen.

## alertOnDelete

Med `alertOnDelete` ber appen brukeren bekrefte før den sletter en rad. Det er lurt hvis en rad inneholder mye data, slik at brukeren ikke mister dataene ved en feil. Standard er at appen sletter raden uten å spørre.

Bekreftelsen gjelder **Slett**-knappen i tabellen. Med `"mode": "showAll"` sletter knappen raden uten å spørre, også når `alertOnDelete` er `true`.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "edit": {
    "alertOnDelete": true
  }
}
```

## compactButtons

Med `"compactButtons": true` viser knappene **Rediger** og **Slett** i tabellen bare et ikon, uten tekst. Det sparer plass i tabeller med mange kolonner. Når brukeren åpner en rad, viser knappene teksten som vanlig.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "edit": {
    "compactButtons": true
  }
}
```

## buttonLayout

Med `buttonLayout` bestemmer du hvordan knappene **Rediger** og **Slett** står i tabellen på store skjermer:

- `"horizontal"` er standardverdien. Knappene står ved siden av hverandre, i hver sin kolonne.
- `"vertical"` setter knappene under hverandre i én kolonne. Det sparer plass når tabellen har mange kolonner.

Innstillingen endrer ikke visningen på mobil og nettbrett. Du kan kombinere den med `compactButtons`:

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "edit": {
    "compactButtons": true,
    "buttonLayout": "vertical"
  }
}
```

## openByDefault

Med `openByDefault` åpner appen en rad automatisk når brukeren kommer til siden. Du kan velge mellom disse verdiene:

| Verdi     | Beskrivelse                                                                                                                       |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `"first"` | Hvis gruppen har rader fra før, åpner appen den første raden. Hvis gruppen er tom, legger appen til en ny rad og åpner den.       |
| `"last"`  | Hvis gruppen har rader fra før, åpner appen den siste raden. Hvis gruppen er tom, legger appen til en ny rad og åpner den.        |
| `true`    | Hvis gruppen er tom, legger appen til en ny rad og åpner den. Hvis gruppen har rader fra før, åpner appen ingen rad.               |
| `false`   | Standardverdien. Appen åpner ingen rad.                                                                                            |

Med `"mode": "showAll"` er alle radene åpne fra før. Har du satt `openByDefault` til `true`, `"first"` eller `"last"`, legger appen likevel til en tom rad i en tom gruppe.

Appen legger ikke til en ny rad hvis du har skjult **Legg til ny**-knappen med `addButton`.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "edit": {
    "openByDefault": "first"
  }
}
```

## multiPage

Med `"multiPage": true` kan brukeren fylle ut en rad over flere sider inne i gruppen. Det krever mer oppsett, se [Fylle ut en rad over flere sider]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/grouping/repeating/multipage" >}}).
