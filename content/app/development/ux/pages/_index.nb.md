---
title: Sider
description: Hvordan sette opp en app med flere sider, sporvalg, oppsummering eller flere skjema.
toc: false
weight: 10
---

Flere sider kan enkelt settes opp i Altinn Studio, men dersom du ønsker å gjøre det manuelt, se [Oppsett](#oppsett). Det er også noen instillinger som ikke er tilgjengelig i Altinn Studio som eventuelt må settes manuelt; se [Innstillinger](#innstillinger) for det.

## Oppsett

Sider plasseres i `ui/layouts`-mappen i appen, for å konfigurere rekkefølgen på sidene, se [Navigasjon](/nb/app/development/ux/pages/navigation/). Dersom du har flere prosess-steg som har egne layoutsider er strukturen litt annerledes; dersom dette er tilfelle, se [Flere skjema](/nb/app/development/ux/pages/layout-sets).

```
|- App/
  |- ui/
    |- layouts/
      |- side1.json
      |- side2.json
      |- side3.json
    |- Settings.json
```

## Innstillinger

Det er flere ulike innstillinger som kan konfigureres for sidene dine.
Disse innstillingene konfigureres i `Settings.json`-filen som du kan se i mappestrukturen over og ligger i `pages`-objektet.
Dersom du bruker layout sets er det en egen fil for hvert sett.

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

De tilgjengelige innstillingene er følgende:

| Egenskap              | Type    | Verdi                                                                                                                                                                            |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hideCloseButton       | Boolean | Om lukk skjema-knappen øverst i høyre hjørne skal skjules eller ikke.                                                                                                            |
| showLanguageSelector  | Boolean | Om språkvelgeren skal vises eller ikke. Lar brukeren bytte språk etter de har startet skjemautfylligen.                                                                          |
| showExpandWidthButton | Boolean | Om utvid bredde-knappen skal vises eller ikke. Lar brukeren utvide bredden til siden slik at den fyller hele nettleservinduet.                                                   |
| showProgress          | Boolean | se [Navigasjon](/nb/app/development/ux/pages/navigation/#fremdriftsindikator)                                                                                                    |
| pdfLayoutName         | String  | se [PDF](/nb/app/development/ux/pdf/#egendefinert-konfigurasjon)                                                                                                                 |
| order                 | Array   | se [Navigasjon](/nb/app/development/ux/pages/navigation/#rekkefølge)                                                                                                             |
| excludeFromPdf        | Array   | se [PDF](/nb/app/development/ux/pdf/#automatisk-konfigurasjon)                                                                                                                   |
| expandedWidth         | Boolean | se [Utvidet skjemabredde](#utvidet-skjemabredde)                                                                                                                                             |

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

## Utvidet skjemabredde

Default verdien for en sides breddehåndtering kan settes til å være utvidet ved å legge til `expandedWidth`-egenskapen
til en layout i `data`-egenskapen. Dette vil gjøre at siden utvider seg til å fylle hele bredden av nettleservinduet når
den åpnes. If you set `expandedWidth` on multiple levels, the more specific value will override the general.

`layout-settings.json`:

```json
{
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
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
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
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
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
