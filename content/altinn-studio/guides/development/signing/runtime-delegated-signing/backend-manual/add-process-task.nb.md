---
hidden: true
---

> Her følger en beskrivelse for hvordan man setter opp en signeringsoppgave i prosessen. Dette involverer flere steg, i flere konfigurasjonsfiler.
> Om du bruker Altinn Studio Designer, så blir all denne konfigurasjonen satt opp automatisk når du legger til signeringsoppgaven i prosessen.

### Opprett to datatyper for å lagre data relatert til signering:

Disse datatypene legger til i `dataTypes` i `App/config/applicationmetadata.json`.

Den første datatypen benyttes av signeringssteget til å lagre de faktiske signaturene som genereres når brukeren utfører signeringshandlingen.

```json
{
    "id": "signatures",
    "allowedContentTypes": [
        "application/json"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

Denne datatypen benyttes for å lagre informasjon om signatarene som skal få deligert rettigheter til å signere og dere status.

```json
{
    "id": "signeeState",
    "allowedContentTypes": [
        "application/pdf"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

ID-ene kan settes til noe annet, men det må matche ID-ene som legges inn i `signatureDataType` og `signeeStatesDataTypeId` i prossessteget, som vist i punktet under.

### Utvid app prossesen med signing task:

Det må legges til et prosessteg og en gateway i `App/config/process/process.bpmn`, som i eksemplet nedenfor.

Signering benytter to user actions. Dersom Altinn-brukergrensesnittet brukes av appen, så vil disse bli kalt automatisk når man står i signeringssteget. Om kun API-et benyttes, så må disse kalles manuelt via `/actions`-endepunktet eller process next.
- `sign`: Explain...
- `reject`: Explain...

```xml
    process task
```
NB: Verdien til noden `<altinn:signatureDataType>signatures</altinn:signatureDataType>` må samsvare med ID-en til datatypen du konfigurerte i forrige steg.

### Legg til sidegruppe for signering

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
          "Task_2"
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