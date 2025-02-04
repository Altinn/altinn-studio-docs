---
title: ButtonGroup
description: 
weight: 10
---
## Bruk
Sett opp ulike typer knapper horisontalt
<!-- Kort beskrivelse av komponenten og hvordan den brukes. -->

### Anatomi
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-2244&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A2244&show-proto-sidebar=1&embed-host=share" allowfullscreen></iframe>
Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "button-group1",
        "type": "ButtonGroup",
        "children": [
          "nav-buttons",
          "submit-button"
        ]
      },
      {
        "id": "nav-buttons",
        "type": "NavigationButtons",
        "textResourceBindings": {
          "next": "Neste",
          "back": "Forrige"
        },
        "showBackButton": true
      },
      {
        "id": "submit-button",
        "type": "Button",
        "textResourceBindings": {
          "title": "Send inn"
        }
      }
    ]
  }
}
```

## Konfigurasjon

For å konfigurere en knappegruppe, legg til en ny komponent med typen `ButtonGroup` i layout-filen før knappene du vil gruppere sammen.
Du spesifiserer hvilke knappekomponenter som skal inkluderes i knappegruppen ved å legge til ID-ene deres i knappegruppens `children`-egenskap.
Følgende komponenttyper kan legges til i en knappegruppe:

- `Button` (Send inn-knapp)
- `NavigationButtons`
- `PrintButton`
- `InstantiationButton`
<!-- - `ActionButton` -->
