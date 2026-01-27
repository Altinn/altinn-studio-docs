---
draft: false
hidden: true
tags: [needsReview, needsTranslation]
---

### Legge til OrderDetails-komponenten i skjemaet ditt

Dette viser en tabell som viser elementene brukeren må betale for.
Du kan plassere dette hvor som helst i appen din, men vi anbefaler å sette det på den siste siden før brukeren blir bedt om å betale.

For å få oppdatert ordrelinjene etter hvert som data som brukes til å beregne ordrelinjer, endres, må du legge til en mapping til datafeltene som brukes til å beregne ordrelinjene.

```json
{
  "id": "paymentDetails",
  "type": "PaymentDetails",
  "textResourceBindings": {
    "title": "Oversikt over betaling",
    "description": "Her er en oversikt over hva du skal betale for."
  },
  "mapping": {
    "GoodsAndServicesProperties.Inventory.InventoryProperties": "paymentDetails"
  }
}
```

### Legge til layout for kvitteringen (valgfritt)

Hvis du vil vise mer informasjon på kvitteringen som vises til kunden, må du legge til en egen tilpasset layout for den.

Legg til en layout-fil, for eksempel `receiptLayout.json`.

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

Oppdater din layoutSet-settings.json-fil, og spesifiser din kvitteringslayout i `pdfLayoutName`-feltet:

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

Dette er alt du trenger for å vise en gyldig kvittering, men du kan også tilpasse `receiptLayout.json` ved å legge til ytterligere komponenter, for eksempel en paragrafkomponent hvis du ønsker å legge til mer informasjon.
