---
draft: true
hidden: true
tags: [needsReview]
---

> You do the setup in this section on the **Utforming** page in the app workspace. Go there by clicking **Utforming** in the top menu.

### How to show payment information in the form

> Do this step in the task that contains the form itself. Go to **Oversikt** on the **Utforming** page, and click **Utform** on the card for the task. The form task that comes with the app when you create it has the ID `Task_1`. If you have added other form tasks to the process, select the card with the same ID as the task in the process.

- Drag the **Betalingsdetaljer** component into the form. This component shows a table with the items the user must pay for.
  - The component is in the **Avansert** section of the component column on the left of the page.

  You can place this component anywhere in your form, but we recommend placing it on the last page before the user is asked to pay.

- The app calculates the order lines from data in the form. When the user changes this data, the app must fetch the order lines again. You therefore add the data fields used in the calculation to `refetchDependencies`. Each value is an expression that points to a field in the data model. You can choose the key names freely, and the app does not send the values to the server. You do this manually, directly in the layout files:

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

### How to show payment information in the payment task

Altinn Studio sets this up automatically if you used Altinn Studio Designer and the process editor to set up the payment task.

### How to set up a separate layout for the payment receipt (optional)

This step is optional. If you skip it, the app uses the setup from the payment task in the receipt.

1. Check that the **Utforming** page shows the layout for the payment task.
2. Click **Legg til ny side**.
3. In the configuration panel for the page, open **PDF** and turn on the switch **Siden skal være en PDF**.
4. Add the **Betaling** component, and any other texts and components you want on the PDF page.
5. Preview the PDF by opening the developer tools with the icon button at the bottom right of the preview ![Developer tools](./devtools.png), then click **Generer PDF**.
