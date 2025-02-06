---
title: PrintButton
description: A button that allows the user to print the current form page
toc: false
weight: 10
---
{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---
The PrintButton component can be added to the form layout where you want an option to open the browsers built-in print dialog.
When the button is clicked the print dialog window will pop up. Commonly there is an option to "Print to PDF" if preferable.

## Anatomy
<!-- Brief description of the component and how it is used. -->
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=216-7922&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=216%3A7922&show-proto-sidebar=1&embed-host=share" allowfullscreen></iframe>

This example is taken from <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Note that the example is not identical to the actual code but has been adapted to create prototypes in Figma.

`FormLayout.json` example

```json
{
  "id": "printButtonInfo",
  "type": "PrintButton"
}
```
The default text on the PrintButton is "Print / Save as PDF".
The text can be overridden by setting the text resource key:
```json
{
  "id": "general.print_button_text",
  "value": "Skriv ut"
}
```
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="200" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=216-7922&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=216%3A7922&show-proto-sidebar=1&embed-host=share" allowfullscreen></iframe>