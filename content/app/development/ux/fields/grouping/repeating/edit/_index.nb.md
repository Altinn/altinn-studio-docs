---
title: Innstillinger for redigering av rad
title: Redigering
description: Innstillinger for redigering/utfylling av en rad i en repeterende gruppe
weight: 1
---

## Styre visning

Det kan settes en parameter, `edit`, på en gruppe-komponent (kun for repeterende grupper). Denne lar oss definere forskjellige innstillinger
mtp visning av et gruppe-element under redigering/utfylling. Følgende innstillinger kan settes.

### mode

Definerer om tabellen (som viser alle elementene i gruppen) skal vises når et element er åpent i redigerings-modus.
Følgende verdier godtas:

| Verdi       | Beskrivelse                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------|
| "showTable" | Standard oppførsel om ingenting er satt. Viser tabellen over flaten for redigering av gruppe-element.           |
| "hideTable" | Skjuler tabellen når et gruppe-element er åpent for redigering.                                                 |
| "showAll"   | Skjuler tabellen. Viser alle elementene i gruppen i redigerings-modus, under hverandre. Lagre-knapp skjules.    |
| "likert"    | Likert visning, må brukes om eneste komponent i gruppen er en [Likert-komponent](../../../../components/likert) |

### addButton

Bestemmer om "Legg til ny"-knappen vises under tabellen. Nyttig å skjule denne om man kun ønsker å presentere data.

### alwaysShowAddButton

Bestemmer om "Legg til ny"-knappen vises under tabellen selv om en rad er åpen. Den vises dersom ``"alwaysShowAddButton": true`` og at følgende to betingelser er oppnådd: (1) [addButton](http://localhost:1313/app/development/ux/fields/grouping/alternatives/#addbutton) er **ikke** satt til ``false``, (2) antall rader ikke overskrider [maxCount.](http://localhost:1313/nb/app/development/ux/fields/grouping/setup/)\
En brukercase for dette er å tillate brukeren til å legge til flere rader uten å måtte lagre og lukke eksisterende rad først, som er spesielt nyttig i kombinasjon med [openByDefault](http://localhost:1313/nb/app/development/ux/fields/grouping/alternatives/#openbydefault) (hvor det kanskje ikke er åpenbart for brukeren at flere rader kan legges til).
### saveButton

Bestemmer om "Lagre"-knappen vises når et gruppeelement er i redigeringsmodus. Standard oppførsel om parameteren ikke er satt er at "Lagre"-knapp vises.
Dersom man har satt `"mode": "showAll"` skjules Lagre-knappen alltid, da man i denne modusen ikke har mulighet til å lukke redigerings-flaten for
gruppe-elementet. Dataene lagres uansett.

### deleteButton

Bestemmer om "Slett"-knappen vises når et gruppeelement er i redigeringsmodus. Standard oppførsel om parameteren ikke er satt er at "Slett"-knapp vises.

### multiPage

Sier at redigering/utfylling av gruppe kan gjøres over flere "sider"/visninger. Krever mer oppsett for å fungere,
[se egen dokumentasjon for dette](../multipage).

### filter

Lar deg filtrere bort enkelte rader, slik at kun et subsett av radene vises. Denne parameteren utgår og vil
fjernes i en fremtidig versjon. Mer informasjon og beskrivelse av alternativer finnes [i dokumentasjonen dedikert til dynamikk i repeterende grupper](../dynamics).

### openByDefault

Sier at gruppen skal åpnes i redigeringsmodus til å begynne med. Følgende verdier godtas:

| Value   | Description                                                                                                                                                                                                                                                           |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| "first" | Dersom det finnes preutfylte elementer eller eksisterende data i gruppen vil det første elementet åpnes i redigeringsmodus til å begynne med. Dersom det ikke finnes noen elementer i gruppen fra før av, vil et nytt element legges til og åpnes i redigeringsmodus. |
| "last"  | Dersom det finnes preutfylte elementer eller eksisterende data i gruppen vil det siste elementet åpnes i redigeringsmodus til å begynne med. Dersom det ikke finnes noen elementer i gruppen fra før av, vil et nytt element legges til og åpnes i redigeringsmodus.  |
| true    | Dersom det ikke finnes noen preutfylte elementer eller eksisterende data i gruppen fra før av, vil et nytt element legges til og åpnes i redigeringsmodus.                                                                                                            |
| false   | Ingen elementer åpnes til å begynne med.                                                                                                                                                                                                                              |

Merk at denne ikke har noen effekt om den brukes sammen med `"mode": "showAll"`.

Eksempel:

```json
{
  ...
  "edit": {
    "openByDefault": "first"
  }
}
```

### saveAndNextButton

Bestemmer om "Lagre og åpne neste"-knappen skal vises når et gruppeelement er i redigeringsmodus. Standard oppførsel dersom parameteren ikke er satt er at knappen ikke vises.

Merk at denne ikke har noen effekt om den brukes sammen med `"mode": "showAll"`.

### alertOnDelete

Bestemmer om det skal vises et varslingspanel når brukeren trykker på "Slett" knappen. En potensiell situasjon hvor dette kan være ønskelig er hvis en rad inneholder store mengder data.
Standard oppførsel om parameteren ikke er satt er at varslingspanelet ikke vises.

Eksempel:

```json
{
  ...
  "edit": {
    "alertOnDelete": true
  }
}
```

