---
title: Konfigurasjon av et underskjema
linktitle: Konfigurasjon
description: Slik kan du konfigurere og utforme et underskjema
weight: 120
---

{{% notice warning  %}}
Denne veiledningen er under utvikling og testing. Underskjema er lansert i foreløpig versjon.
{{% /notice %}}

## Parametere

| Parameter                                     | Type   | Påkrevd | Beskrivelse                                                                                                                                                            |
| --------------------------------------------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                            | string | Ja      | En unik ID, som ID-en på andre komponenter. Må være unik i layout-filen, og bør være unik på tvers av sider.                                                           |
| type                                          | string | Ja      | Må settes til 'Subform'                                                                                                                                                |
| layoutSet                                     | string | Ja      | ID for sidegruppe til underskjema. Må være unik i layout-sets.json.                                                                                                    |
| [tableColumns](#tablecolumns)                 | array  | Ja      | En liste med objekter som inneholder kolonnedefinisjoner for tabellen for underskjema. Hver oppføring gir en overskrift, celleforespørsel og standardverdi for cellen. |
| showAddButton                                 | bool   | Nei     | Vis Legg-til knapp? Standardverdien er sann.                                                                                                                           |
| showDeleteButton                              | bool   | Nei     | Vis Slett-knapp? Standardverdien er sann.                                                                                                                              |
| [textResourceBindings](#textresourcebindings) | object | Nei     | Objekt som beskriver tekstressursbindinger for underskjema-komponenten.                                                                                                |

## textResourceBindings

Du kan tilpasse disse nøklene i `textResourceBindings`-objektet:

- `title` - Tittelen på underskjema-komponenten.
- `description` - En beskrivelse av komponenten, som vises under tittelen.
- `addButton` - Hva Legg-til knappen skal inneholde.

## tableColumns

`tableColumns` er en liste med objekter som definerer kolonnene i tabellen for underskjemaet.

Hver oppføring må ha en definisjon for `headerContent` og `cellContent`. `cellContent` er også et objekt, som må ha et `query`-parameter og en valgfri `default`-parameter.

{{< notice info >}}
_query_-verdien er en oppslagsti for det valgte feltet i underskjemaets datamodell.

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
