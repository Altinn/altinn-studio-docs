---
title: Grid
description: Grid-komponenten brukes til å visuelt oppstille komponenter i en tabellvisning
---

![Grid](grid.png "Komponenter oppstilt i en Grid")

## Konfigurasjon

Grid-komponenten konfigureres som alle andre, men krever en konfigurasjon for rader og celler. For å starte med en
2x2 Grid med to kolonner og to rader, kan vi bruke følgende konfigurasjon:

```json
{
  "id": "myGrid",
  "type": "Grid",
  "rows": [
    {
      "cells": [
        { "text": "Celle 1" },
        { "text": "Celle 2" }
      ]
    },
    {
      "cells": [
        { "text": "Celle 3" },
        { "text": "Celle 4" }
      ]
    }
  ]
}
```

Hver celle må være enten et objekt med en `text`-egenskap (for tekstceller), et objekt med en `component`-egenskap
(refererer til andre komponenter), eller `null` (for en tom celle). Hver rad må ha samme antall celler som alle andre
rader.

### Rader
For noen rader, vanligvis den første, kan du konfigurere en overskriftsrad. For å gjøre dette, legg til
en `header`-egenskap til raden og sett den til `true`. Dette vil gjøre raden har en annen bakgrunnsfarge og gjøre
teksten uthevet. 

```json {hl_lines=[2]}
{
  "header": true,
  "cells": [
    { "text": "Celle 1" },
    { "text": "Celle 2" }
  ]
}
```

En rad kan også bli konfigurert som skrivebeskyttet. Dette vil gjøre raden har en gul bakgrunnsfarge. For å
konfigurere en rad som skrivebeskyttet, legg til en `readOnly`-egenskap til raden og sett den til `true`.

```json {hl_lines=[2]}
{
  "readOnly": true,
  "cells": [
    { "text": "Celle 3" },
    { "text": "Celle 4" }
  ]
}
```

Merk at komponenter inni en `readOnly`-rad ikke blir automatisk satt til `readOnly`. Hvis du vil gjøre en
komponent skrivebeskyttet inni en `readOnly`-rad, må du konfigurere den slik manuelt.

### Celler
Celler kan konfigureres til å vise tekst eller en annen komponent. For å konfigurere en celle som viser tekst,
legg til en `text`-egenskap til cellen og sett den til teksten du vil vise. Du kan også angi en tekstressursnøkkel
som teksten som skal vises i cellen. For å konfigurere en celle som viser en annen komponent, legg til en
`component`-egenskap til cellen og sett den til id-en til komponenten du vil vise i cellen.

```json {hl_lines=[5]}
{
  "cells": [
    { "text": "Celle 1" },
    { "component": "minKomponent" }
  ]
}
```

I konfigurasjonen over er det en forutsetning at `myComponent` er en komponent som er konfigurert et annet sted i
layout-konfigurasjonen. Foreløpig er det støtte for følgende komponenter i Grid-komponenten:

- Button
- Checkboxes
- Custom (subject to the custom implementation)
- Datepicker
- Dropdown
- Header
- Image
- Input
- InstantiationButton
- MultipleSelect
- Paragraph
- PrintButton
- RadioButtons
- TextArea

Spesielt for `RadioButtons` og `Checkboxes` er at merkelappen som indikerer valget ikke blir vist dersom det bare
finnes et valgalternativ å velge mellom.

### Bredder, tekst og justering

{{% expandlarge id="full-example" header="Vis et fullstendig konfigurasjonseksempel" %}}
```json
[
  {
    "id": "gjeld-grid",
    "type": "Grid",
    "textResourceBindings": {
      "title": "Totalfordeling av gjeld",
      "description": "Her skal du fylle ut fordelingen av all din gjeld, og hvilke typer den gjelder."
    },
    "rows": [
      {
        "header": true,
        "cells": [
          {},
          { "text": "Fordeling" },
          { "text": "Beløp" },
          { "text": "Innhentet og verifisert" }
        ]
      },
      {
        "cells": [
          { "text": "laan-bolig" },
          { "component": "fordeling-bolig" },
          { "component": "belop-bolig" },
          { "component": "innhentet-bolig" }
        ]
      },
      {
        "cells": [
          { "text": "laan-studie" },
          { "component": "fordeling-studie" },
          { "component": "belop-studie" },
          { "component": "innhentet-studie" }
        ]
      },
      {
        "cells": [
          { "text": "laan-kredittkort" },
          { "component": "fordeling-kredittkort" },
          { "component": "belop-kredittkort" },
          { "component": "innhentet-kredittkort" }
        ]
      },
      {
        "readOnly": true,
        "cells": [
          { "text": "SUM" },
          { "component": "fordeling-total" },
          null,
          null
        ]
      }
    ]
  },
  {
    "id": "fordeling-bolig",
    "type": "Input",
    ...
  },
  {
    "id": "fordeling-studie",
    "type": "Input",
    ...
  },
  {
    "id": "fordeling-kredittkort",
    "type": "Input",
    ...
  },
  {
    "id": "belop-bolig",
    "type": "Input",
    "readOnly": true,
    ...
  },
  {
    "id": "belop-studie",
    "type": "Input",
    "readOnly": true,
    ...
  },
  {
    "id": "belop-kredittkort",
    "type": "Input",
    "readOnly": true,
    ...
  },
  {
    "id": "innhentet-bolig",
    "type": "Checkboxes",
    ...
  },
  {
    "id": "innhentet-studie",
    "type": "Checkboxes",
    ...
  },
  {
    "id": "innhentet-kredittkort",
    "type": "Checkboxes",
    ...
  },
  {
    "id": "fordeling-total",
    "type": "Input",
    "readOnly": true,
    ...
  }
]
```
{{% /expandlarge %}}

## Mobilvisning