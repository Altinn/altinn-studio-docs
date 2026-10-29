---
draft: true
hidden: true
tags: [Reviewed]
---

> You do most of the setup in this section on the **Utforming** page in Altinn Studio. Click **Utforming** in the top menu to get there. You do some of the setup manually in the layout files, as described below.

### How to show payment information in the form

> You do this step in the form task. The layout files for the task are in `App/ui/{taskId}/layouts/`. The form task that comes with the app when you create it has the ID `Task_1`. If you have added other form tasks to the workflow, use the folder with the same ID as the task.

- Add a component of the type `PaymentDetails` to the layout file of the page where the user should see the payment. The component shows a table of what the user has to pay for. In Altinn Studio it is called **Betalingsdetaljer**, but you will not find it in **Velg komponent**, so you add it manually, as in the example below.

  You can place the component anywhere in the form, but we recommend putting it on the last page before the user pays.

- The app calculates the order lines from data in the form. When the user changes this data, the app must fetch the order lines again. That is why you add the data fields that the app uses in the calculation to `refetchDependencies`. Each value is an expression that points to a field in the data model. You can choose the key names freely, and the app does not send the values to the server. You add them to the layout file, as in the example below:

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json {linenos=false,hl_lines=[8,9,10]}
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

Altinn Studio sets this up automatically when you add the payment task in **Arbeidsflyt**.

### How to create your own receipt for the payment (optional)

If you skip this step, the app uses the setup from the payment task for the receipt.

1. Click **Utforming** in the top menu, and click **Utform** on the **Oppgave: Betaling** card. If you are already in a task, first click **Oversikt** at the top of the page to get back to the cards.
2. Click **Legg til ny side**.
3. In the panel on the right, open **PDF** and click **Gjør om siden til PDF**.
4. Add the **Betaling** component, and any other texts and components you want on the PDF page.
5. Open the developer tools in the preview with the button at the bottom right, or press **Ctrl+Shift+K** (**⌘+Shift+K** on Mac). Then click **Generer PDF** under **Forhåndsvis PDF**.

   ![The button for opening the developer tools at the bottom right of the preview](/en/altinn-studio/v9/develop-a-service/process/payment/devtools.png "Open the developer tools")
