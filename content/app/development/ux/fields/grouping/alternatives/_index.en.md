---
title: Settings for views
linktitle: Settings
description: Settings for views.
tags: [translate-to-english]
weight: 3
---

Det er implementert en ny (valgfri) parameter som kan legges inn på definisjonen av en repeterende gruppe i layout-filen, som gjør at man kan styre litt
rundt visningen og oppførselen til gruppen på siden. I tillegg er det lagt til støtte for flere "sider" inne i redigerings-flaten til gruppen.

## Styre visning

Det er lagt til en ny parameter, `edit`, som kan settes på en gruppe-komponent (repeterende gruppe). Denne lar oss definere forskjellige innstillinger
mtp visning av et gruppe-element under redigering/utfylling. Følgende innstillinger kan settes.

### mode

Definerer om tabellen (som viser alle elementene i gruppen) skal vises når et element er åpent i redigerings-modus.
Følgende verdier godtas:

| Verdi       | Beskrivelse                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| "showTable" | Standard oppførsel om ingenting er satt. Viser tabellen over flaten for redigering av gruppe-element.        |
| "hideTable" | Skjuler tabellen når et gruppe-element er åpent for redigering.                                              |
| "showAll"   | Skjuler tabellen. Viser alle elementene i gruppen i redigerings-modus, under hverandre. Lagre-knapp skjules. |
| "likert"    | Likert visning.                                                                                              |

### filter

Støtte for å filtrere elementene i gruppen, slik at kun de elementene som matcher de definerte kriteriene vises.
F.eks. i en gruppe som viser arbeidserfaring, vis kun de elementene der arbeidssted var Oslo.
Liste med kriterier er basert på verdi av ett eller flere felter i gruppen, på formen

```json
"edit": {
  "filter": [
    { "key": "<felt i datamodell>", "value": "<ønsket verdi>" }
  ]
}
```

Dersom det er flere kriterier, må alle matche for at elementet skal vises.

Om det kun er ett resultat, vises dette automatsk i redigerings-modus. Om det er flere elementer i gruppen som matcher filteret, vil disse vises.
Andre elementer i gruppen skjules. `filter` kan kombineres med `mode`-parameter.

{{%notice warning%}}
Om man kombinerer `"mode": "showAll"` med `"filter"`, vil det ikke fungere å legge til nye elementer i gruppen. Dette er fordi man med "showAll" kun
viser redigerings-flaten, og så lenge filteret ikke matcher, vil ikke elementet vises.
{{% /notice %}}

### addButton

Bestemmer om "Legg til ny"-knappen vises under tabellen. Nyttig å skjule denne om man kun ønsker å presentere data.

### saveButton

Bestemmer om "Lagre"-knappen vises når et gruppeelement er i redigeringsmodus. Standard oppførsel om parameteren ikke er satt er at "Lagre"-knapp vises.
Dersom man har satt `"mode": "showAll"` skjules Lagre-knappen alltid, da man i denne modusen ikke har mulighet til å lukke redigerings-flaten for
gruppe-elementet. Dataene lagres uansett.

### deleteButton

Bestemmer om "Slett"-knappen vises når et gruppeelement er i redigeringsmodus. Standard oppførsel om parameteren ikke er satt er at "Slett"-knapp vises.

### multiPage

Sier at redigering/utfylling av gruppe kan gjøres over flere "sider"/visninger. Krever mer oppsett for å fungere, se under for mer informasjon.

### openByDefault

Sier at gruppen skal åpnes i editeringsmodus om det ikke finnes noen elementer i gruppen fra før. Merk at denne ikke kan brukes sammen med `"mode": "showAll"`.

Eksempel:

```json
{
  ...
  "edit": {
    "openByDefault": true
  }
}
```

## Show group as part of Panel

A new parameter, `panel`, can be added to the group component. This will render the group childrne as part of a [Panel component.](../../../components/panel/).

Look and settings will be similar of those of the panel component. Example configuration: 

```json
      {
        "id": "input-panel-group",
        "type": "Group",
        "children": [
          "panel-1",
          "panel-2"
        ],
        "dataModelBindings": {},
        "textResourceBindings": {
          "title": "Dette er bare en demo av input panel utenfor repeterende gruppe.",
          "body": "Her ser jeg bare at ting fungerer som forventet."
        },
        "panel": {
          "variant": "info"
        }
      },
```

Here the group is configured with the variant "info". The configuration is otherwise equal as a regular group.

This will produce the following output:

![Group with panel](input-panel.jpeg "Group with panel")

The following settings is configurable in the `pabel` field:

| Parameter             | Required | Description                                                                                                                               |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| variant               | Yes      | Which variant of panel the group children should be rendered in. Availiable values are "info", "success" and "warning".                                    |
| iconUrl               | No     | Custom icon can be added to the panel. Relative or full path, for instance "awesomeIcon.png" or "http://cdn.example.com/awesomeIcon.png" |                                                                                           |
| iconAlt               | No     | Alternative text for the custom icon. Only applicable if iconUrl is supplied. Can be plain text or a reference to a text resource.|
| groupReference        | No    | Reference to another group. Can be used if you want to add elements to a repeating group from another context. [Read more.](#legge-til-element-fra-en-annen-repeterende-gruppe) |                                                       |

Example:

```json
        "panel": {
          "variant": "info",
          "iconUrl": "kort.svg",
          "iconAlt": "Betalingskort ikon"
        }
```

### Add element from another repeating group

A use case can be that the user is asked to choose a value from a previously filled out repeating group. As an example imagine the user has to register a set of suspicius transactions.
Her the user is first asked to add a set of different payment cards as a repeating group. Later in the application the user is asked to select a payment card when adding an entry to the suspicious transactions group.
While doing so the user remembers that they forgot to add a payment card and does not want to navigate back to the first repeating group. 

Her comes `groupReference` parameter in to play. This will give the user the possiblity to add an element to a repeating group from the context this list is used. 

An image to illustrate the use case:

![GroupReference case](panel-reference-case.png "GroupReference case")

In this made up case the groups are positioned under each other, but in a real world scenario these might be placed on different pages in the application.

To setup the possibility a group component is added to the repeating group containg the transactions with a reference to the first group containing payment cards.

The following group component is configured as a child for group 2:

```json
      {
        "id": "input-panel-group",
        "type": "Group",
        "dataModelBindings": {},
        "textResourceBindings": {
          "title": "Legg til nytt betalingskort",
          "body": "Kortet du registrer vil bli lagret og tilgjengelig i resten av tjenesten.",
          "add_label": "Legg til nytt betalingskort"
        },
        "panel": {
          "showIcon": true,
          "iconUrl": "kort.svg",
          "variant": "success",
          "groupReference": {
            "group": "first-group"
          }
        }
      },
```

The text resources that is used by panel:

- `title` - the panel title
- `body` - the panel body. Placed above children.
- `add_label` - the add button label.

If `children` is not defined on the group the children of the referenced group will be rendered. By adding `children` you can freely define that only a subset of the referenced group will be displayed.

Demo:

![Demo of groupReference](panel-reference-demo.gif "Demo of groupReference")

See [example app](https://altinn.studio/repos/ttd/input-panel-demo) for a complete form layout setup.

## Flere sider innad i gruppe-visning

{{% notice info %}} Denne funksjonaliteten er p.t. kun tilgjengelig for repeterende grupper. Visning av gruppe over
flere sider inne i redigerings-flaten til gruppen støttes KUN for grupper på øverste nivå, og støttes ikke
for grupper i grupper. {{% /notice %}}

Når man skal legge inn data i en gruppe, kan det være tilfeller der hvert element i gruppen inneholder mange felter, og at det dermed blir mye scrolling
og uoversiktlig for sluttbruker. For å løse dette er det innført en mulighet til å dele opp utfyllingen over flere visninger, som bruker kan navigere
frem/tilbake mellom mens de fyller ut gruppe-elementet. Navigeringen her skjer innad i en layout, og oppdaterer
kun visningen inne i redigeringsflaten for gruppen.

For å ta i bruk denne funksjonaliteten, må man _prefikse_ komponentene i `children` listen med et tall som tilsier hvilken "side" av utfyllingen
komponenten skal vises på, etterfulgt av `:`. Vi starter tellingen på `0`, dvs. at komponenter som skal vises på den første "siden" må prefikses med
`0:`. Komponenter som skal vises på den andre siden prefikses med `1:`. Osv. I tillegg må man sette `"multiPage": true` på den nye [`edit`-parameteren](#styre-visning) (se over).
Se eksempel under:

```json {hl_lines=["5-8", "14-16"]} {linenos=inline}
{
  "id": "Some-group-id",
  "type": "Group",
  "children": [
    "0:fnr",
    "1:fornavn",
    "1:mellomnavn",
    "1:etternavn"
  ],
  "maxCount": 10,
  "dataModelBindings": {
    "group": "familie.barn"
  },
  "edit": {
    "multiPage": true,
    "mode": "hideTable",
  }
}
```

Her har man også lagt inn en [mode](#mode) som skjuler tabellen under redigering.
Resultatet blir som vist under.

![Utfylling i gruppe over flere "sider"](group-multipage.gif "Utfylling i gruppe over flere sider")
