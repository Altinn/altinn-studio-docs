---
title: Frontend configuration 
description: Follow these steps to start developing apps in Altinn Studio.
weight: 3
---
### 1. Add Payment layout

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

### 2. Add OrderDetails component to your form.

This will display a table showing the items the user will need to pay for.
You can put this anywhere in your app, but we recommend at the very least putting it on the last page before the user is prompted to pay.

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

### 3. Add layout for the receipt


Add a custom layout file, f ex ```receiptLayout.json```.

In order to display a legally valid receipt to the customer, you need to add a custom layout for it.
Here is a minimal example:

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

This is all you need to render a valid receipt, however, you can also customize it by adding additinal compoments to it, for example a Paragraph component if you want to add additional information.


