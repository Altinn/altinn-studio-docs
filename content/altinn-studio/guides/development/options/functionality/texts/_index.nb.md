---
title: Tekster
description: De ulike tekstegenskapene som kan brukes for svaralternativer
weight: 150
---

## Beskrivelse og hjelpetekst

`description` og `helpText` støttes av kodelister i apper som bruker versjon 7.8.0 eller høyere. Beskrivelse og
hjelpetekst kan vises av komponentene `RadioButtons` og `Checkboxes` ved å sette attributtene i en `option` som
brukes av komponenten.

Beskrivelser og hjelpetekster kan gis til `options` på samme måte som en `label` er gitt, enten i statiske eller
dynamiske kodelister. Man kan også bruke dem i kodelister basert på repeterende grupper i `source`-attributten.

```json
[
  {
    "value": "norway",
    "label": "Norge",
    "description": "This is a description",
    "helpText": "This is a help text"
  },
  {
    "value": "denmark",
    "label": "Danmark"
  }
]
```

```cs
var options = new AppOptions
{
  Options = new List<AppOption>
  {
    new AppOption
    {
      Label = "Ole",
      Value = "1",
      Description = "This is a description",
      HelpText  = "This is a help text"
    },
    new AppOption
    {
      Label = "Dole",
      Value = "2"
    }
  }
};
```

Beskrivelser og hjelpetekster som brukes i kodelister basert på repeterende grupper kan settes opp med dynamiske
tekstressurser på samme måte som `label`, som beskrevet i
[kodelister fra repeterende grupper](repeating-group-codelists).

```json
{
  "id": "checkboxes-component-id",
  "type": "Checkboxes",
  ...
  "source": {
    "group": "some.group",
    "label": "checkboxes.label",
    "description": "checkboxes.descripiton",
    "helpText": "checkboxes.helpText",
    "value": "some.group[{0}].someField"
  }
}
```