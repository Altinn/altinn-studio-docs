---
title: Frontend konfigurasjon 
description: Følg disse stegene for å konfigurere frontenden din for betaling.
weight: 3
---
### 1. Legg til betalingslayout

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
        },
        "paymentSettings": {
          "autoForwardToPayment": true
        }
      }
    ]
  }
}
```

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


Legg til en tilpasset layoutfil, f.eks. ```receiptLayout.json```.


For å vise en juridisk gyldig kvittering til kunden, må du legge til en tilpasset layout for den.
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

Dette er alt du trenger for å vise en gyldig kvittering, men du kan også tilpasse den ved å legge til ytterligere komponenter, for eksempel en paragrafkomponent hvis du ønsker å legge til ytterligere informasjon.


