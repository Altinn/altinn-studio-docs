---
title: Tekster
description: De ulike tekstegenskapene som kan brukes for svaralternativer
weight: 150
---

## Ledetekst

Den vanligste tekstegenskapen for svaralternativer er `label` (ledetekst). Dette er teksten som vises for brukeren i
brukergrensesnittet (i motsetning til `value`, som er [verdien som lagres i datamodellen](../data-binding)).
Både `label` og `value` er påkrevde egenskaper for et svaralternativ.

```json
[
  { "value": "norway", "label": "Norge" },
  { "value": "denmark", "label": "text.key.for.denmark" }
]
```

Ledetekster, som alle tekster, kan være enten ren tekst eller en nøkkel som peker til en tekstressurs. Hvis
`label` er en nøkkel som peker til en tekstressurs, kan teksten endres i henhold til brukerens valgte språk.

Den endelige teksten som vises for brukeren kan [også lagres i datamodellen](../data-binding/#lagring-av-ledetekst--visningsverdi) hvis
det er nødvendig.

## Beskrivelse og hjelpetekst

Hvis du trenger å gi ytterligere informasjon om et alternativ, kan du bruke egenskapene `description` og `helpText`.
`description` og `helpText` kan vises av komponentene `RadioButtons` og `Checkboxes`.

Beskrivelser og hjelpetekster kan spesifiseres på samme måte som en ledetekst (`label`) er gitt, enten i
[statiske](../../sources/static), [dynamiske](../../sources/dynamic) eller
[svaralternativer fra datamodellen](../../sources/from-data-model).

Klikk på overskriftene nedenfor for å utvide eksemplene.

{{% expandlarge id="static" header="Statisk JSON-fil eller komponentkonfigurasjon" %}}
```json
[
  {
    "value": "norway",
    "label": "Norge",
    "description": "Dette er en beskrivelse",
    "helpText": "Dette er en hjelpetekst"
  },
  {
    "value": "denmark",
    "label": "Danmark"
  }
]
```
{{% /expandlarge %}}

{{% expandlarge id="dynamic" header="Dynamiske svaralternativer via C#-kode" %}}
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
{{% /expandlarge %}}

{{% expandlarge id="from-data-model" header="Svaralternativer basert på repeterende strukturer i datamodellen" %}}
Legg merke til at egenskapene `label`, `description` og `helpText` også kan være [dynamiske uttrykk](../../../dynamics)
i denne modusen.

```json
{
  "id": "checkboxes-component-id",
  "type": "Checkboxes",
  ...
  "source": {
    "group": "some.group",
    "label": "checkboxes.label",
    "description": "checkboxes.description",
    "helpText": [
      "if", ["equals", ["dataModel.someField"], "someValue"],
        "checkboxes.helpText1",
      "else",
        "checkboxes.helpText2"
    ],
    "value": "some.group[{0}].someField"
  }
}
```
{{% /expandlarge %}}