---
hidden: true
---

- Legg til en ny mappe under `App/ui` for signeringsoppgaven din. Kall den f.eks. "signing".
- Oppdater filen `App/ui/layout-sets.json` med ny sidegruppe, som har samme `id` som mappen du nettopp opprettet.
  Din oppdaterte `layout-sets.json` kan se slik ut:

  ```json
  {
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
    "sets": [
      {
        "id": "form",
        "dataType": "model",
        "tasks": [
          "Task_1"
        ]
      },
      {
        "id": "signing",
        "dataType": "model",
        "tasks": [
          "SigningTask"
        ]
      }
    ]
  }
  ``` 

- I din signing layoutSet mappe, legg til en ny fil, `signing.json`, med følgende layout:

  ```json
  {
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
    "data": {
      "layout": [
      {
        "id": "headerSigningFounders",
        "type": "Header",
        "size": "L",
        "textResourceBindings": {
          "title": "Her kan man ha en overskrift"
        }
      },
      {
        "id": "signee-list",
        "type": "SigneeList",
        "textResourceBindings": {
          "title": "Personer som skal signere",
          "description": "Personer som skal signere beskrivelse",
          "help": "Dette er personer som skal signere"
        }
      },
      {
        "id": "signing-documents",
        "type": "SigningDocumentList",
        "textResourceBindings": {
          "title": "Dokumenter som skal signeres",
          "description": "Dokumenter som skal signeres beskrivelse"
        }
      },
      {
        "id": "signing-state",
        "type": "SigningStatusPanel"
      }
    ]
    }
  }
  ```