---
title: RadioButtons
description: RadioButtons kan brukes når brukeren må velge kun ett alternativ fra en liste av mulig valg
toc: false
weight: 10
---

![RadioButtons eksempel](radio-buttons-example.png "RadioButtons eksempel")

`FormLayout.json` eksemepl:

```json
      {
        "id": "radio-buttons-component-id",
        "type": "RadioButtons",
        "textResourceBindings": {
          "title": "some.title"
        },
        "dataModelBindings": {
          "simpleBinding": "some.field"
        },
        "required": true,
        "optionsId": "someOptionId",
      },
```

RadioButtons komponenten lagrer verdier som en streng.

RadioButtons komponenten kan konfigureres ved å legge til alternativer direkte til komponenten ved hjelp av `options`
parameteren:

```json
      {
        "id": "multiple-select-component-id",
        "type": "RadioButtons",
        ...
        "options": [
            { "label": "Label 1", "value": "value1" },
            { "label": "Label 2", "value": "value2" },
        ],
      },
```

eller ved å bruke api baserte `options` som beskrevet [her.](../../../data/options/)

## Stilvalg

RadioButtons komponenten kan vise radioknapper som "cards" ved å sette parameteren `showAsCard` til `true`:

```json
      {
        "id": "multiple-select-component-id"
        "type": "RadioButtons",
        ...
        "showAsCard": true,
      },
```

![RadioButtons som cards eksempel](radio-buttons-as-cards-example.png "RadioButtons som cards eksempel")
