---
title: PrintButton
description: A button that allows the user to print the current form page
toc: false
weight: 10
---

The PrintButton component can be added to the form layout where you want an option to open the browsers built-in print dialog.
When the button is clicked the print dialog window will pop up. Commonly there is an option to "Print to PDF" if preferable.

![The PrintButton is rendered as a secondary button](printButton-example.png "The PrintButton is rendered as a secondary button")

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
![Overridden example of the PrintButton](printButton-overridden-example.png "Overridden example of the PrintButton")


The PrintButton supports grid alignment if necessary.
