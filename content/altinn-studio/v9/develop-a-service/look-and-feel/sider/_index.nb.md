---
draft: true
title: Sider
description: Slik setter du opp en app med flere sider, layoutsett og oppsummering.
toc: true
tags: [needsReview, translate]
---

Du kan sette opp flere sider enkelt i Altinn Studio Designer. Vil du gjøre det manuelt, se [Oppsett](#oppsett). Enkelte innstillinger er ikke tilgjengelige i Designer, og disse må du sette manuelt — se [Innstillinger](#innstillinger) for dem.

## Oppsett

Du plasserer sidene i `layouts`-mappen til layoutsettet. Hvert prosessteg kan ha sitt eget layoutsett. Vil du endre rekkefølgen på sidene, se [Navigasjon](/nb/altinn-studio/v8/reference/ux/pages/navigation/#vise-en-sidemeny-med-rekkefølgen-på-sideroppgaver). Under ser du et eksempel på filstrukturen for to prosessteg, hver med sitt eget layoutsett:

```
|- App/
  |- ui/
    | - layout-sets.json
    |- skjema-a/
      |- Settings.json
      |- layouts/
        |- side1.json
        |- side2.json
        |- side3.json
    |- skjema-b/
      |- Settings.json
      |- layouts/
        |- side1.json
        |- side2.json
        |- side3.json
```

I `layout-sets.json`-filen definerer du hvilket prosessteg (task) du skal bruke hvert layoutsett i. Merk at ID-en skiller mellom store og små bokstaver. Bruker du stor bokstav i mappenavnet, må ID-en gjenspeile dette. Vi anbefaler små bokstaver i mappenavn.

Eksempel:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
  "sets": [
    {
      "id": "skjema-a",
      "dataType": "schema_4222_160523_forms_212_20160523",
      "tasks": ["Task_1"]
    },

    {
      "id": "skjema-b",
      "dataType": "schema_3161_140411_forms_1549_11554",
      "tasks": ["Task_2"]
    }
  ]
}
```

## Innstillinger

Du kan konfigurere flere ulike innstillinger for sidene dine. Du gjør dette i `Settings.json`-filen, som du ser i mappestrukturen over, under `pages`-objektet. Bruker du layoutsett, har hvert sett sin egen fil.

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

Dette er innstillingene du har tilgjengelig:

| Egenskap              | Type    | Verdi                                                                                                                          |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| hideCloseButton       | Boolean | Om appen skal skjule knappen for å gå tilbake til innboksen, øverst til venstre.                                               |
| showLanguageSelector  | Boolean | Om appen skal vise språkvelgeren. Lar brukeren bytte språk etter at utfyllingen er startet.                                    |
| showExpandWidthButton | Boolean | Om appen skal vise knappen for å utvide bredden. Lar brukeren utvide siden slik at den fyller hele nettleservinduet.           |
| showProgress          | Boolean | Se [Navigasjon](/nb/altinn-studio/v8/reference/ux/pages/navigation/#vise-en-fremdriftsindikator)                               |
| pdfLayoutName         | String  | Se [PDF](/nb/altinn-studio/v8/reference/ux/pdf/#egendefinert-konfigurasjon)                                                     |
| order                 | Array   | Se [Navigasjon](/nb/altinn-studio/v8/reference/ux/pages/navigation/#vise-en-sidemeny-med-rekkefølgen-på-sideroppgaver)         |
| groups                | Array   | Se [Navigasjon](/nb/altinn-studio/v8/reference/ux/pages/navigation/#gruppere-sider)                                            |
| excludeFromPdf        | Array   | Se [PDF](/nb/altinn-studio/v8/reference/ux/pdf/#automatisk-konfigurasjon)                                                       |
| expandedWidth         | Boolean | Se [Utvidet skjemabredde](#utvidet-skjemabredde)                                                                               |

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

## Utvidet skjemabredde

Du kan sette standardverdien for sidebredden til utvidet ved å legge til `expandedWidth`-egenskapen i `data`-egenskapen til en layout. Da fyller siden hele bredden av nettleservinduet når den åpnes. Setter du `expandedWidth` på flere nivåer, overskriver den mest spesifikke verdien de mer generelle.

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

Layoutfil:

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
