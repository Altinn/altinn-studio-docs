---
draft: true
hidden: true
---

### Add OrderDetails component to your form

This will display a table showing the items the user will need to pay for.
You can put this anywhere in your app, but we recommend at the very least putting it on the last page before the user is prompted to pay.

To update the order lines when the data used to calculate them changes, add those data fields to `refetchDependencies`. Each value is an expression that points to a field in the data model. You can choose the key names freely, and the values are not sent to the server.

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

Update the `Settings.json` file in the payment task's UI folder (`App/ui/<taskId>/Settings.json`), specifying your receipt layout in the `pdfLayoutName` field:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
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

This is all you need to render a valid receipt, however, you can also customize it by adding additional components to
`receiptLayout.json`, for example a Paragraph component if you want to add additional information.
