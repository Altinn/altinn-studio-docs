---
title: Sider
description: Hvordan sette opp en app med flere sider, flere layout-sett, eller oppsummering.
toc: false
weight: 10
---

Flere sider kan enkelt settes opp i Altinn Studio, men dersom du ønsker å gjøre det manuelt, se [Oppsett](#oppsett). Det er også noen instillinger som ikke er tilgjengelig i Altinn Studio som eventuelt må settes manuelt; se [Innstillinger](#innstillinger) for det.

## Oppsett

Sider plasseres i `layouts`-mappen for layout-settet; hvert prosess-steg kan ha et eget layout-sett. For å konfigurere rekkefølgen på sidene, se [Navigasjon](/nb/altinn-studio/v8/reference/ux/pages/navigation/#vise-en-sidemeny-med-rekkefølgen-på-sideroppgaver). Eksempel på filstruktur ved to prosess-steg med hvert sitt layout-sett:

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

I `layout-sets.json`-filen defineres hvilket steg i prosessen (task) hvor hvert layout-set skal brukes.
Merk at id'en er case sensitiv, så om du har stor bokstav i mappenavnet må id'en reflektere dette. Vi anbefaler små bokstaver i mappenavn.

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

Det er flere ulike innstillinger som kan konfigureres for sidene dine.
Disse innstillingene konfigureres i `Settings.json`-filen som du kan se i mappestrukturen over og ligger i `pages`-objektet.
Dersom du bruker layout sets er det en egen fil for hvert sett.

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

De tilgjengelige innstillingene er følgende:

| Egenskap              | Type    | Verdi                                                                                                                          |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| hideCloseButton       | Boolean | Om tilbake til innboks-knappen øverst i venstre hjørne skal skjules eller ikke.                                                |
| showLanguageSelector  | Boolean | Om språkvelgeren skal vises eller ikke. Lar brukeren bytte språk etter de har startet skjemautfylligen.                        |
| showExpandWidthButton | Boolean | Om utvid bredde-knappen skal vises eller ikke. Lar brukeren utvide bredden til siden slik at den fyller hele nettleservinduet. |
| showProgress          | Boolean | se [Navigasjon](/nb/altinn-studio/v8/reference/ux/pages/navigation/#vise-en-fremdriftsindikator)                                  |
| pdfLayoutName         | String  | se [PDF](/nb/altinn-studio/v8/reference/ux/pdf/#egendefinert-konfigurasjon)                                                       |
| order                 | Array   | se [Navigasjon](/nb/altinn-studio/v8/reference/ux/pages/navigation/#vise-en-sidemeny-med-rekkefølgen-på-sideroppgaver)            |
| groups                | Array   | se [Navigasjon](/nb/altinn-studio/v8/reference/ux/pages/navigation/#gruppere-sider)                                               |
| excludeFromPdf        | Array   | se [PDF](/nb/altinn-studio/v8/reference/ux/pdf/#automatisk-konfigurasjon)                                                         |
| expandedWidth         | Boolean | se [Utvidet skjemabredde](#utvidet-skjemabredde)                                                                               |

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

## Utvidet skjemabredde

Default verdien for en sides breddehåndtering kan settes til å være utvidet ved å legge til `expandedWidth`-egenskapen
til en layout i `data`-egenskapen. Dette vil gjøre at siden utvider seg til å fylle hele bredden av nettleservinduet når
den åpnes. Dersom du setter `expandedWidth` på flere nivåer, vil den spesifikke verdien overskrive de generelle.

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

Layout-file:

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
