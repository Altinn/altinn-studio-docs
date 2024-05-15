---
title: Frontend konfigurasjon 
description: Følg disse stegene for å konfigurere frontenden din for betaling.
weight: 3
---
### 1. Legg til Payment layoutSet

Legg til en ny layoutSet-mappe for betalingsoppgaven din, og oppdater `layout-sets.json` filen.

Din `layout-sets.json` kan se slik ut:
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
      "id": "payment",
      "dataType": "model",
      "tasks": [
        "Task_2"
      ]
    }
  ]
}
```
I din payment layoutSet mappe, legg til en ny fil, `payment.json`, med følgende layout:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "payment-test-component",
        "type": "Payment",
        "textResourceBindings": {
          "title": "Oppsummering"
        }
      }
    ]
  }
}
```

Dette er nødvendig for at betaling skal fungere. Uten dette vil betalingssteget ditt bare vise en hvit side.

### 2.  Legg til OrderDetails-komponenten i skjemaet ditt.

Dette vil vise en tabell som viser elementene brukeren må betale for.
Du kan plassere dette hvor som helst i appen din, men vi anbefaler å i det minste sette det på den siste siden før brukeren blir bedt om å betale.

```json
{
    "id": "paymentInformation",
    "allowedContentTypes": [
        "application/json"
    ],
    "maxCount": 0,
    "minCount": 0,
    "enablePdfCreation": false,
    "enableFileScan": false,
    "validationErrorOnPendingFileScan": false,
    "enabledFileAnalysers": [],
    "enabledFileValidators": []
}
```

### 3. Legg til layout for kvitteringen

For å vise en juridisk gyldig kvittering til kunden, må du legge til en tilpasset layout for den.

Legg til en layout fil, f.eks. `receiptLayout.json`.

Her er et minimalt eksempel:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "test",
        "type": "Payment",
        "renderAsSummary": true
      }
    ]
  }
}
```

Oppdater din layoutSet-settings.json-fil, og spesifiser din kvitteringslayout i `pdfLayoutName` feltet:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "order": [
      "payment"
    ],
    "pdfLayoutName": "paymentReceipt", 
    "showProgress": true,
    "showLanguageSelector": true
  }
}
```

Dette er alt du trenger for å vise en gyldig kvittering, men du kan også tilpasse den ved å legge til ytterligere komponenter, for eksempel en paragrafkomponent hvis du ønsker å legge til ytterligere informasjon.


