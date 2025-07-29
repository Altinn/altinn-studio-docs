---
title: Pages
description: How to set up an app with multiple pages, multiple layout sets, or summary.
toc: false
weight: 10
---

Multiple layout pages can easily be set up in Altinn Studio, if you want to do it manually, see [Setup](#setup). There are also some configuration options that are not available in Altinn Studio but must be set manually; for that, see [Settings](#settings).

## Setup

Layout pages are placed in the `layouts` folder for the layout set; each process task can have its own layout set. To configure the order of the layout pages, see [Navigation](/altinn-studio/reference/ux/pages/navigation/#showing-a-side-menu-with-the-order-of-pagestasks). Example of a file structure with two process tasks, each with its own layout set:

```
|- App/
  |- ui/
    | - layout-sets.json
    |- form-a/
      |- Settings.json
      |- layouts/
        |- page1.json
        |- page2.json
        |- page3.json
    |- form-b/
      |- Settings.json
      |- layouts/
        |- page1.json
        |- page2.json
        |- page3.json
```

In the `layout-sets.json` file, you define which task in the process where each layout-set should be used.
Note that the ID is case sensitive, so if you have a capital letter in the folder name, the ID must reflect this. We recommend lower case letters in folder names.

Example:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
  "sets": [
    {
      "id": "form-a",
      "dataType": "schema_4222_160523_forms_212_20160523",
      "tasks": ["Task_1"]
    },

    {
      "id": "form-b",
      "dataType": "schema_3161_140411_forms_1549_11554",
      "tasks": ["Task_2"]
    }
  ]
}
```

## Settings

There are several different settings that can be configured for your pages.
These settings are configured in the `Settings.json` file seen in the folder structure above and lie in the `pages` object.
If you use layout sets there is a separate file for each layout set.

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
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

| Property              | Type    | Value                                                                                                                                 |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| hideCloseButton       | Boolean | Whether or not the back to inbox button in the upper left corner should be hidden.                                                    |
| showLanguageSelector  | Boolean | Whether or not the language selector should be visible. Allows the user to switch language after opening the form.                    |
| showExpandWidthButton | Boolean | Whether or not the expand width button should be visible. Allows the user to expand the width of the page to fill the browser window. |
| showProgress          | Boolean | see [Navigation](/altinn-studio/reference/ux/pages/navigation/#progress-indicator)                                                    |
| pdfLayoutName         | String  | see [PDF](/altinn-studio/reference/ux/pdf/#custom-layout-configuration)                                                               |
| order                 | Array   | see [Navigation](/altinn-studio/reference/ux/pages/navigation/#order)                                                                 |
| groups                | Array   | see [Navigation](/altinn-studio/reference/ux/pages/navigation/#grouping-pages)                                                        |
| excludeFromPdf        | Array   | see [PDF](/altinn-studio/reference/ux/pdf/#automatic-configuration)                                                                   |
| expandedWidth         | Boolean | see [Expanded form width](#expanded-form-width)                                                                                       |

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

## Expanded form width

For å få en side til å automatisk utvide seg til full bredde av nettleservinduet når den åpnes, kan du legge til
egenskapen `expandedWidth` for en layout. Dette setter standardtilstanden til siden til å være utvidet.
Du kan sette expandedWidth på tre nivåer: i filen `layout-sets.json`, i filen `Settings.json` og i en spesifikk side sin
layout-fil. Dersom du setter `expandedWidth` på flere nivåer, vil den spesifikke verdien overskrive de generelle.

`layout-sets.json`:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
  "uiSettings": {
    "expandedWidth": true
  },
  "sets": [
    ...
  ]
}
```

`Settings.json`:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
      "order": [
         ...
      ],
      "expandedWidth": true,
      ...
  },
  "components": {
    ...
  }
}
```

Layout-fil:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "expandedWidth": true,
    "layout": [
      components...
    ],
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

{{<children />}}
