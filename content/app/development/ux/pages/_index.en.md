---
title: Pages
description: How to set up an app with multiple pages, tracks, summary or multiple layouts.
toc: false
weight: 10
---

Multiple layout pages can easily be set up in Altinn Studio, if you want to do it manually, see [Setup](#setup). There are also some configuration options that are not available in Altinn Studio but must be set manually; for that, see [Settings](#settings).

## Setup

Layout pages are placed in the `ui/layouts` folder in the app, to configure the order of the layout pages, see [Navigation](/app/development/ux/pages/navigation/). If you have multiple process steps that require layouts, the structure is slightly different; in that case see [Layout sets](/app/development/ux/pages/layout-sets/).

```
|- App/
  |- ui/
    |- layouts/
      |- side1.json
      |- side2.json
      |- side3.json
    |- Settings.json
```

## Settings

There are several different settings that can be configured for your pages.
These settings are configured in the `Settings.json` file seen in the folder structure above and lie in the `pages` object.
If you use layout sets there is a separate file for each layout set.

```json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "order": [
      "Info",
      "Form",
      "Summary"
    ],
    "excludeFromPdf": [
      "Info",
      "Summary"
    ],
    "hideCloseButton": false,
    "showLanguageSelector": false,
    "showExpandWidthButton": false,
    "showProgress": true,
    "pdfLayoutName": "PDFLayout"
  },
  ...
}
```

The available settings are the following:

| Property              | Type    | Value                                                                                                                                                                          |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hideCloseButton       | Boolean | Whether or not the close button in the upper right corner should be hidden.                                                                                                    |
| showLanguageSelector  | Boolean | Whether or not the language selector should be visible. Allows the user to switch language after opening the form.                                                             |
| showExpandWidthButton | Boolean | Whether or not the expand width button should be visible. Allows the user to expand the width of the page to fill the browser window.                                          |
| showProgress          | Boolean | see [Navigation](/app/development/ux/pages/navigation/#progress-indicator)                                                                                                     |
| pdfLayoutName         | String  | see [PDF](/app/development/ux/pdf/#custom-layout-configuration)                                                                                      |
| order                 | Array   | see [Navigation](/app/development/ux/pages/navigation/#order)                                                                                                                  |
| excludeFromPdf        | Array   | see [PDF](/app/development/ux/pdf/#automatic-configuration)                                                                                                                    |

{{<children />}}
