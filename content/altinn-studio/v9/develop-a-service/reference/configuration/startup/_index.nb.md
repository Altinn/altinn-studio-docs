---
title: Styre hva som skjer når brukerne åpner appen
linktitle: Oppstart
description: Slik oppretter appen en ny instans eller lar utfylleren velge en aktiv instans.
toc: true
weight: 500
draft: true
---

Egenskapen `onEntry.show` i `App/config/applicationmetadata.json` styrer hva som skjer når utfylleren åpner appen uten en lenke til en bestemt instans.

For en app som oppretter og bruker instanser, kan du velge mellom:

- `new-instance`: Appen oppretter en ny instans. Dette er standardverdien når `onEntry.show` ikke er satt.
- `select-instance`: Appen lar utfylleren fortsette på en aktiv instans eller opprette en ny.

Hvis appen skal starte med en tilstandsløs visning, kan du i stedet angi ID-en til den aktuelle brukergrensesnittmappen. Se hvordan du kan [konfigurere tilstandsløse apper](../stateless/).

## La utfylleren velge en aktiv instans

Sett `onEntry.show` til `select-instance`:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "onEntry": {
    "show": "select-instance"
  }
}
```

Den valgte aktøren er personen eller virksomheten som utfylleren fyller ut skjemaet for. Appen undersøker om aktøren har aktive instanser:

- Hvis det ikke finnes noen aktive instanser, oppretter appen en ny instans automatisk.
- Hvis det finnes én eller flere aktive instanser, viser appen siden der utfylleren kan velge instans.

På siden med instanser kan utfylleren fortsette på en eksisterende instans eller velge **Start på nytt**. Siden vises også når det bare finnes én aktiv instans, slik at utfylleren fortsatt kan velge å opprette en ny.

![Siden med instanser utfylleren kan velge fra, med en aktiv instans](instance-selection.png "Utfylleren kan fortsette på en aktiv instans eller starte på nytt")

## Tilpass siden med instanser

Bruk `onEntry.instanceSelection` for å styre sortering og paginering:

- `sortDirection`: Sorterer instansene i stigende (`asc`) eller synkende (`desc`) rekkefølge etter siste endring. Standardverdien er `asc`.
- `rowsPerPageOptions`: Angir alternativene for hvor mange instanser som vises per side. Standardverdien er `[10, 25, 50]`.
- `defaultSelectedOption`: Angir indeksen i `rowsPerPageOptions` som skal være valgt når utfylleren åpner siden. Indeksen starter på `0`, som også er standardverdien.

Eksempelet nedenfor viser 25 instanser per side som standard:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "onEntry": {
    "show": "select-instance",
    "instanceSelection": {
      "sortDirection": "desc",
      "rowsPerPageOptions": [10, 25, 50, 100],
      "defaultSelectedOption": 1
    }
  }
}
```
