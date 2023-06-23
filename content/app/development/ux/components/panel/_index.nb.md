---
title: Panel
description: Panelkomponenten kan brukes til å vise viktig informasjon til brukeren.
toc: false
---

![De forskjellige variantene av Panel komponenten](panel-example.png "De forskjellige variantene av Panel komponenten")


`FormLayout.json` eksempel
```json
{
  "id": "panelinfo",
  "type": "Panel",
  "textResourceBindings": {
    "title": "Infotekst",
    "body": "Her kommer litt viktig informasjon"
  },
  "variant": "info",
  "showIcon": false
}
```

`variant` kan være en av følgende:
- `info`
- `success`
- `warning`

`showIcon` kan brukes til å skjule/vise ikonet. Ikonet vil vises som standard.