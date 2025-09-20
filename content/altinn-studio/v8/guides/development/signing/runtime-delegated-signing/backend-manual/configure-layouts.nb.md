---
hidden: true
---

Legg til en ny mappe under `App/ui` for signeringssteget ditt. Kall den f.eks. `signing`.

I denne mappen, legg til en `layouts`-mappe og en `Settings.json`-fil.

Legg til en layout-fil kalt f.eks. `signing.json` i `layouts`-mappen.

Mappestrukturen skal se slik ut:

```
App/
├── ui/
│   └── signing/
│       ├── layouts/
│       │   └── signing.json
│       └── Settings.json
```

Det finnes et sett med ferdige komponenter for å bygge opp layout for et signeringssteg. Vi anbefaler å bruke disse, men de er ikke obligatoriske.

- SigneeList:
  - Lister ut signatarer og tilhørende signeringsstatus. Les mer [her](/altinn-studio/v8/reference/ux/components/signeelist/).
- SigningDocumentList:
  - Lister ut dataene som blir signert på. Feks. vedlegg, xml-data eller PDF-oppsummering fra tidligere steg. Les mer [her](/altinn-studio/v8/reference/ux/components/signingdocumentlist/).
- SigningActions: 
  - Utleder status for signeringssteget og viser relevante knapper til sluttbruker, feks. "Signer"-knappen. Les mer [her](/altinn-studio/v8/reference/ux/components/signingactions/).

Dersom du ikke benytter `SigningActions` for å vise "Signer"-knappen, så må du legge til en egen action button med action "sign", for å la sluttbruker signere. 

Eksempel på bruk av komponentene:

```json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "headerSigningFounders",
        "type": "Header",
        "size": "M",
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
        "type": "SigningActions"
      }
    ]
  }
}
```

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