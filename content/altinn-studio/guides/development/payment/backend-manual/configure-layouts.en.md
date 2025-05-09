---
hidden: true
---

### Add OrderDetails component to your form

This will display a table showing the items the user will need to pay for.
You can put this anywhere in your app, but we recommend at the very least putting it on the last page before the user is prompted to pay.

In order to update the order lines as the data used to calculate the order lines changes, you need to add a mapping to
the data fields used to calculate the order lines.

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

### Add a layout for the receipt (Optional)

If you would like to display additional information by adding components the receipt presented to the customer,
you need to add a custom layout for it.

Add a custom layout file, f ex `receiptLayout.json`.

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

Update your layout set Settings.json file, specifying your receipt layout in the `pdfLayoutName` field:

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

This is all you need to render a valid receipt, however, you can also customize it by adding additional components to
`receiptLayout.json`, for example a Paragraph component if you want to add additional information.