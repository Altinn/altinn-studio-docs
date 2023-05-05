---
title: Dynamisk oppførsel i repeterende grupper
linktitle: Dynamikk
description: Hvordan skjule rader i en repeterende gruppe
---

## Skjul rader i repeterende grupper.

Noen ganger er det ønskelig å skjule rader i repeterende grupper når gitte kriterier inntreffer.
Dette kan gjøres ved å bruke `hiddenRow` egenskapen som evalueres med dynamiske utrykk. Eksempelet under viser hvordan
vi kan skjule en rad dersom fornavn i datamodellen er lik "John".

```json {linenos=inline}
{
  "id": "myGroup",
  "type": "group",
  "hiddenRow": ["equal", ["dataModel", "firstName"], "John"],
}
```
Du kan lese mer om [dynamiske utrykk her](/app/development/logic/expressions).

## Filter (utgår)

{{%notice warning%}}
Denne funksjonaliteten vil bli avviklet. Vennligst bruk `hiddenRow` med dynamiske utrykk istedenfor. Se ovenfor.
{{% /notice %}}


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
