---
draft: true
title: Datamodellbindinger
linktitle: Datamodellbindinger
description: Slik kobler du komponenter i en layout til felter i en datamodell
toc: true
tags: [needsReview]
---

En datamodellbinding kobler en komponent til et felt i en datamodell. Komponenten bruker bindingen til å lese eller lagre data.

Du angir bindingene i `dataModelBindings` på komponenten. Hvilke bindinger en komponent støtter, står i [oversikten over komponentens egenskaper]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components" >}}). En `Input` bruker for eksempel `simpleBinding`, mens en `RepeatingGroup` bruker `group`.

## Kort format

Skriv feltstien som en streng når feltet ligger i standarddatamodellen for layoutsettet:

```json
{
  "id": "fornavn",
  "type": "Input",
  "dataModelBindings": {
    "simpleBinding": "person.fornavn"
  }
}
```

Feltstien bruker punktnotasjon. I eksempelet peker `person.fornavn` på feltet `fornavn` i objektet `person`.

Standarddatamodellen er verdien i `defaultDataType` i `App/ui/<layoutsett>/Settings.json`.

## Utvidet format

Bruk et objekt med `dataType` og `field` når bindingen skal peke til en annen datamodell enn standardmodellen:

```json
{
  "id": "fornavn",
  "type": "Input",
  "dataModelBindings": {
    "simpleBinding": {
      "dataType": "kontaktinformasjon",
      "field": "person.fornavn"
    }
  }
}
```

`dataType` er ID-en til datatypen i `App/config/applicationmetadata.json`. `field` er feltstien i datamodellen.

Med det utvidede formatet kan komponenter i samme skjema være bundet til forskjellige datamodeller. Bruk det korte formatet for komponenter som er bundet til standarddatamodellen, og det utvidede formatet for komponenter som er bundet til en annen datamodell.

## Bindingnøkler

Nøkkelen i `dataModelBindings` forteller hvilken verdi komponenten skal lese eller lagre. Vanlige nøkler er:

| Nøkkel | Brukes til |
| --- | --- |
| `simpleBinding` | Én verdi, for eksempel tekst, tall eller en boolsk verdi |
| `list` | En liste med tekstverdier |
| `group` | En liste med objekter i en repeterende struktur |

Noen komponenter har egne bindingnøkler. `Address` har for eksempel egne bindinger for adresse, postnummer og poststed. Bruk egenskapsoversikten for komponenten for å se hvilke nøkler den støtter, og hvilke som er påkrevd.

## Bindinger i repeterende grupper

En `RepeatingGroup` bindes til listen den skal vise. Komponentene i gruppen bindes til feltene i hvert objekt i listen. Hvis gruppen er bundet til `personer`, binder du et navnefelt i gruppen til `personer.navn`:

```json
[
  {
    "id": "personer",
    "type": "RepeatingGroup",
    "children": ["person-navn"],
    "dataModelBindings": {
      "group": "personer"
    },
    "maxCount": 10
  },
  {
    "id": "person-navn",
    "type": "Input",
    "dataModelBindings": {
      "simpleBinding": "personer.navn"
    }
  }
]
```
