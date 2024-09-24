---
title: Konfigurasjonsmuligheter for underskjemas layout
linktitle: Konfigurasjon
description: Muligheter for konfigurering av for underskjemas layout
weight: 120
---
 
{{% notice warning  %}}
Dette dokumentet er under utvikling. Underskjema er kun i preview-release.
{{% /notice %}}

## Parametere

| Parameter                                                       | Type   | Påkrevd | Beskrivelse                                                                                                                                                       |
| --------------------------------------------------------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                              | string | Ja      | Unik ID, tilsvarer ID på andre komponenter. Må være unik i layout-filen, og bør være unik på tvers av sider.                                                       |
| type                                                            | string | Ja      | Må settes til 'Subform'                                                                                                                                           |
| layoutSet                                                       | string | Ja      | Layout set ID for underskjema. Må være unik i layout-sets.json.                                                                                                   |
| [tableColumns](#tablecolumns)                                   | array  | Ja      | En liste med objekter som inneholder kolonnedefinisjoner for underskjema-tabellen. Hver oppføring gir en overskrift, celleforespørsel og standardverdi for cellen. |
| showAddButton                                                   | bool   | Nei     | Vis legg-til knapp? Standardverdi er sann.                                                                                                                        |
| showDeleteButton                                                | bool   | Nei     | Vis slett knapp? Standardverdi er sann.                                                                                                                           |
| [textResourceBindings](#textresourcebindings)                   | object | Nei     | Objekt som beskriver tekstressursbindinger for underskjema-komponenten.                                                                                           |

## textResourceBindings

Følgende nøkler i `textResourceBindings`-objektet kan tilpasses:

- `title` - Tittelen på subform komponenten.
- `description` - En beskrivelse av komponenten som vises under tittelen.
- `addButton` - Innholdet i legg-til knappen.

## tableColumns

`tableColumns` er en liste med objekter som definerer kolonnene i underskjema-tabellen.

Hver oppføring må inneholde en definisjon for `headerContent` og `cellContent`. `cellContent` er også et objekt, som må inkludere et `query`-parameter sammen med valgfri `default`-parameter.

{{< notice info >}}
*query*-verdien er en oppslagsti for underskjemaets datamodell. 

F.eks. `propertyName` eller `propertyName.nestedProperty`
{{< /notice >}}

```json
"tableColumns": [
  {
    "headerContent": "Navn",
    "cellContent": {
      "query": "name"
    }
  },
  {
    "headerContent": "Alder",
    "cellContent": {
      "query": "age",
      "default": "[Ukjent alder]"
    }
  },
]
```