---
hidden: true
---

Legg til en ny mappe under `App/ui` for signeringsoppgaven din. Kall den f.eks. `signing`.

Oppdater filen `App/ui/layout-sets.json` med ny sidegruppe, som har samme `id` som mappen du nettopp opprettet.

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

I mappen du opprettet, legg til en ny fil kalt `signing.json`.

Det finnes et sett med ferdige komponenter for å bygge opp layout for et signeringssteg. Vi anbefaler å bruke disse, men de er ikke obligatoriske.

- SigneeList:
  - Lister ut signatarer og tilhørende signeringsstatus.
- SigningDocumentList:
  - Lister ut dataene som blir signert på. Feks. vedlegg, xml-data eller PDF-oppsummering fra tidligere steg.
- SigningStatusPanel: 
  - Utleder status for signeringssteget og viser relevante knapper til sluttbruker, feks. "Signer"-knappen.

Dersom du ikke benytter SigningStatusPanel for å vise "Signer"-knappen, så må du legge til en egen action button med action "sign", for å la sluttbruker signere.

Eksempel på bruk av komponentene:

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