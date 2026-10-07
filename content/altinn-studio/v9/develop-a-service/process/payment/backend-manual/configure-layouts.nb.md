---
draft: true
hidden: true
tags: [needsReview]
---

### Legge til PaymentDetails-komponenten i skjemaet ditt

Dette viser en tabell som viser elementene brukeren må betale for.
Du kan plassere dette hvor som helst i appen din, men vi anbefaler å sette det på den siste siden før brukeren blir bedt om å betale.

Systemet beregner ordrelinjene ut fra data i skjemaet. Når brukeren endrer disse dataene, må appen hente ordrelinjene på nytt. Derfor legger du til datafeltene som systemet bruker i beregningen, i `refetchDependencies`. Hver verdi er et uttrykk som peker på et felt i datamodellen. Navnet på nøkkelen kan du velge fritt, og verdiene sendes ikke til serveren.

```json
{
  "id": "paymentDetails",
  "type": "PaymentDetails",
  "textResourceBindings": {
    "title": "Oversikt over betaling",
    "description": "Her er en oversikt over hva du skal betale for."
  },
  "refetchDependencies": {
    "inventory": ["dataModel", "GoodsAndServicesProperties.Inventory.InventoryProperties"]
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

Oppdater `Settings.json` i UI-mappen til betalingsoppgaven (`App/ui/<taskId>/Settings.json`), og angi kvitteringslayouten din i feltet `pdfLayoutName`:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
  "defaultDataType": "model",
  "pages": {
    "order": [
      "payment"
    ],
    "pdfLayoutName": "receiptLayout",
    "showProgress": true,
    "showLanguageSelector": true
  }
}
```

Dette er alt du trenger for å vise en gyldig kvittering, men du kan også tilpasse `receiptLayout.json` ved å legge til ytterligere komponenter, for eksempel en paragrafkomponent hvis du ønsker å legge til mer informasjon.
