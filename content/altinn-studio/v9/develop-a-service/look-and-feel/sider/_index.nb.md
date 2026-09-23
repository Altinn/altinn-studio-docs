---
draft: true
title: Sider
description: Slik setter du opp en app med flere sider og oppsummering.
toc: true
tags: [needsReview, translate]
---

Du kan sette opp flere sider enkelt i Altinn Studio Designer. Vil du gjøre det manuelt, se [Oppsett](#oppsett). Enkelte innstillinger er ikke tilgjengelige i Designer, og disse må du sette manuelt — se [Innstillinger](#innstillinger) for dem.

## Oppsett

Du plasserer sidene i `layouts`-mappen under mappen for prosessteget. Mappenavnet under `App/ui/` må være nøyaktig det samme som prosesstegets ID i `process.bpmn`, for eksempel `Task_1` — det er denne mappenavn-matchen som kobler sidene til riktig prosessteg. Vil du endre rekkefølgen på sidene, se [Navigasjon]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/sider/navigasjon" >}}#vise-en-sidemeny-med-rekkefølgen-på-sidene). Under ser du et eksempel på filstrukturen for en app med to prosessteg:

```
|- App/
  |- config/
    |- process/
      |- process.bpmn        <- her definerer du Task_1 og Task_2
  |- ui/
    |- Settings.json          <- valgfritt: globale innstillinger for hele appen
    |- Task_1/
      |- Settings.json
      |- layouts/
        |- side1.json
        |- side2.json
        |- side3.json
    |- Task_2/
      |- Settings.json
      |- layouts/
        |- side1.json
        |- side2.json
        |- side3.json
```

Mappenavnet skiller mellom store og små bokstaver, og må være helt likt prosesstegets ID — som ofte har stor forbokstav, for eksempel `Task_1`.

Datamodellen til prosessteget setter du i `Settings.json`-filen til mappen, med egenskapen `defaultDataType`. Se [Innstillinger](#innstillinger) for de andre innstillingene du kan sette i denne fila.

## Innstillinger

Du kan konfigurere flere ulike innstillinger for sidene dine. Du gjør dette i `Settings.json`-filen til prosesstegmappen, som du ser i mappestrukturen over, under `pages`-objektet. Hvert prosessteg har sin egen fil.

I tillegg finnes en valgfri, felles `Settings.json`-fil i `App/ui/` for innstillinger som gjelder hele appen, som `taskNavigation`, `showProgress` og `autoSaveBehavior`. Denne fila er flat — innstillingene ligger direkte i roten av fila, ikke inni et `pages`-objekt.

{{% notice warning %}}
Legger du innstillingene i et `pages`-objekt i denne fila, slik du gjør i prosesstegets `Settings.json`, blir de stille ignorert. Du får ingen feilmelding, men innstillingen slår rett og slett ikke inn.
{{% /notice %}}

**Eksempel på prosesstegets `Settings.json`:**

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
  "defaultDataType": "Skjema",
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

**Eksempel på den globale `App/ui/Settings.json`:**

```json
{
  "taskNavigation": [
    {
      "name": "task.form",
      "taskId": "Task_1"
    },
    {
      "type": "receipt"
    }
  ],
  "showProgress": true,
  "autoSaveBehavior": "onChangePage"
}
```

Dette er innstillingene du har tilgjengelig:

| Egenskap              | Type    | Verdi                                                                                                                          |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| hideCloseButton       | Boolean | Om appen skal skjule knappen for å gå tilbake til innboksen, øverst til venstre.                                               |
| showLanguageSelector  | Boolean | Om appen skal vise språkvelgeren. Lar brukeren bytte språk etter at utfyllingen er startet.                                    |
| showExpandWidthButton | Boolean | Om appen skal vise knappen for å utvide bredden. Lar brukeren utvide siden slik at den fyller hele nettleservinduet.           |
| showProgress          | Boolean | Se [Navigasjon]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/sider/navigasjon" >}}#vise-en-fremdriftsindikator)                               |
| pdfLayoutName         | String  | Se [PDF](/nb/altinn-studio/v8/reference/ux/pdf/#egendefinert-konfigurasjon)                                                     |
| order                 | Array   | Se [Navigasjon]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/sider/navigasjon" >}}#vise-en-sidemeny-med-rekkefølgen-på-sidene)         |
| groups                | Array   | Se [Navigasjon]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/sider/navigasjon" >}}#gruppere-sider)                                            |
| excludeFromPdf        | Array   | Se [PDF](/nb/altinn-studio/v8/reference/ux/pdf/#automatisk-konfigurasjon)                                                       |
| expandedWidth         | Boolean | Se [Utvidet skjemabredde](#utvidet-skjemabredde)                                                                               |

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

## Utvidet skjemabredde

Du kan sette standardverdien for sidebredden til utvidet ved å legge til `expandedWidth`-egenskapen i `data`-egenskapen til en layout. Da fyller siden hele bredden av nettleservinduet når den åpnes. Setter du `expandedWidth` på flere nivåer, overskriver den mest spesifikke verdien de mer generelle.

`App/ui/Settings.json` (globalt, for hele appen):

```json
{
  "expandedWidth": true
}
```

`Settings.json` (per prosessteg):

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
