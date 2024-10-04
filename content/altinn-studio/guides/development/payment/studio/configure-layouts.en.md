---
hidden: true
---
> The setup in this section is done from the Lage page in the app editor. Navigate there by clicking on "Lage"
> in the top menu while in the app editor.

### How to show payment information in the form
> This step should be done in the layout set connected to the data task (the form). You can switch between layout sets 
> in the dropdown at the top left of the Lage-page. The default data task that is shipped with the app when it is created
> is connected to a default layout set called "form". If you have added other data tasks to the process, the layout set
> name matches the ID of the process task.

- Drag the component "Payment details" into the form. This component shows a table that displays the elements the user
  must pay for.
  - The component is located at the bottom of the "Advanced" section in the component column on the left-hand side of
    the page.
  
  You can place this component anywhere you like in your form. We recommend that you place it on the last page the user 
  is shown before moving on to the payment task.

- To update the order details when the user enters data in the form, you need to map which data fields are used to 
  calculate the order. This is a manual process for now, and is done directly in the layout-files. See example below.

```json {linenos=false,hl_lines=[8,9,10]}
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

### How to show payment information in the payment task
This was configured automatically if you used Altinn Studio Designer and the process editor to set up the payment task.
See the tab "Manual setup" for details on how to do this manually.

### How to set up a separate layout for payment receipt (optional)
This step is optional. The default is to use the same setup as the layout from the payment step.

1. Ensure that you are working on the views for the payment step.
2. Click "Add new page".
3. In the configuration panel for the page, open "PDF" and click on "Convert page to PDF".
4. Add the "Payment" component, and any other of the available components to the PDF layout.
5. To preview the final PDF, click the developer tool button at the botton right-hand side of the preview column ![Developer tools](./devtools.png)
   - Click the "Preview PDF" button.
