---
draft: true
title: PDF-generering for underskjema
linktitle: PDF-generering
description: Slik setter du opp PDF-generering for underskjema
tags: [underskjema, pdf, needsReview]
weight: 16
---

Med systemoppgaven for underskjema-PDF kan du lage en egen PDF for hver oppføring i et underskjema. Oppgaven lager PDF-ene fra UI-mappen til underskjemaet, og trenger ingen UI-mappe selv.

{{<notice warning>}}
Systemoppgaven lager PDF-ene én etter én, i ett og samme steg i prosessen. Steget har en tidsgrense, så med mange oppføringer kan det ta for lang tid. Test med et realistisk antall oppføringer i testmiljøet.
{{</notice>}}

## Forutsetninger

Appen har ett eller flere underskjemaer. Denne veiledningen forklarer ikke hvordan du setter opp selve underskjemaet. Les om det i [Underskjema]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/subform" >}}).

## Slik setter du opp PDF-generering

### Legge til oppgaven i Altinn Studio

1. Åpne arbeidsflyt-editoren og dra inn PDF-systemoppgaven for underskjema der i prosessen du vil lage PDF-ene, ofte rett etter dataoppgaven med underskjemaet.
2. Velg underskjemaet under **Underskjema** i konfigurasjonspanelet.

Listen viser UI-mappene som har `"type": "subform"` i `Settings.json`, og mappene en **Tabell for underskjema** åpner. Altinn Studio holder valget oppdatert. Gir du underskjemaet et nytt navn, endrer Studio `subformUiFolder`. Sletter du underskjemaet, fjerner Studio innstillingen, og du må velge et underskjema på nytt.

Er oppgaven satt opp med `subformComponentId` og `subformDataTypeId` fra før, stopper bygget med [ALTINNAPP0602]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0602" >}}) til de gamle innstillingene er borte. Panelet fjerner dem ikke når du velger et underskjema. Kjør `studioctl app upgrade v9`, som skriver om oppgaven for deg. Se [Oppgradere fra v8](#oppgradere-fra-v8).

### process.bpmn

Altinn Studio skriver oppsettet til `process.bpmn`. Setter du opp oppgaven for hånd, ser den slik ut:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="PdfSubform" name="PDF - underskjema">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>subformPdf</altinn:taskType>
            <altinn:subformPdfConfig>
                <altinn:filenameTextResourceKey>subformPdfFileName</altinn:filenameTextResourceKey>
                <altinn:subformUiFolder>underskjema</altinn:subformUiFolder>
            </altinn:subformPdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1d4qgf7</bpmn:incoming>
    <bpmn:outgoing>Flow_1psipb3</bpmn:outgoing>
</bpmn:serviceTask>
```

Oppgaven er et `<bpmn:serviceTask>`-element, og den må ha én inngående og én utgående sekvensflyt.

#### Parametere i subformPdfConfig

| Parameter                 | Beskrivelse |
|---------------------------|-------------|
| `subformUiFolder`         | Obligatorisk. Navnet på UI-mappen til underskjemaet, altså mappen under `App/ui` som har sidene i underskjemaet. Systemoppgaven lager én PDF for hvert dataelement av datatypen som `defaultDataType` i `Settings.json` for mappen angir. |
| `filenameTextResourceKey` | Valgfri. Nøkkel til tekstressursen som gir filnavnet til PDF-ene. Uten denne får PDF-ene et standard filnavn. Bruk gjerne en variabel i filnavnet, slik at det er lett å skille PDF-ene fra hverandre. |

Bygget stopper hvis

- `subformUiFolder` ikke er en UI-mappe
- mappen mangler `defaultDataType`
- `defaultDataType` ikke finnes i `applicationmetadata.json`
- `subformUiFolder` er UI-mappen til en oppgave i prosessen, ikke til et underskjema

Appen sjekker det samme når den starter, og starter ikke med en slik feil. Regelsiden for [ALTINNAPP1024]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1024" >}}) forklarer hvordan du retter feilen.

Eksempel på tekstressurs for filnavn med variabel:

{{< code-title >}}
App/config/texts/resource.{language}.json
{{< /code-title >}}

```json
{
  "id": "subformPdfFileName",
  "value": "Mitt filnavn {0}",
  "variables": [
    {
      "key": "MySubformProperty",
      "dataSource": "dataModel.SubformModel"
    }
  ]
}
```

### Mappestruktur under App/ui

Systemoppgaven bruker bare UI-mappen til underskjemaet. `PdfLayout.json` er valgfri. Lar du den være, må du også fjerne `pdfLayoutName` fra `Settings.json`.

```text
App/ui/
└── underskjema/
    ├── Settings.json
    └── layouts/
        ├── Underskjema.json
        └── PdfLayout.json
```

#### underskjema/Settings.json

`defaultDataType` er datatypen til underskjemaet. Systemoppgaven lager en PDF for hvert dataelement av denne typen.

{{< code-title >}}
App/ui/underskjema/Settings.json
{{< /code-title >}}

```json
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
    "defaultDataType": "SubformModel",
    "type": "subform",
    "pages": {
        "order": ["Underskjema"],
        "pdfLayoutName": "PdfLayout"
    }
}
```

#### underskjema/layouts/Underskjema.json

```text
Denne filen inneholder sidene i underskjemaet, som du allerede har laget.
```

#### underskjema/layouts/PdfLayout.json

Denne filen bestemmer hvordan PDF-en for hver oppføring ser ut. Du kobler den til med `pdfLayoutName` i `Settings.json` for underskjemaet. Uten denne filen og uten `pdfLayoutName` viser PDF-en alle sidene i underskjemaet. Peker `pdfLayoutName` på en side som ikke finnes, feiler PDF-genereringen.

I Altinn Studio velger du siden i underskjemaet og klikker **Gjør om siden til PDF** under **PDF** i innstillingene for siden. Da setter Studio `pdfLayoutName` for deg.

Her bruker du typisk en `Summary2`-komponent som oppsummerer underskjemaet:

{{< code-title >}}
App/ui/underskjema/layouts/PdfLayout.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "underskjema-summary",
        "type": "Summary2",
        "target": {
          "type": "page",
          "id": "Underskjema"
        }
      }
    ]
  }
}
```

### Det brukeren ser

Mens appen lager PDF-ene, ser brukeren den vanlige lastevisningen. Feiler PDF-genereringen, viser appen en standardside med knappen **Prøv igjen**.

Vil du vise en egen side mens oppgaven kjører, lager du en UI-mappe med samme navn som ID-en til systemoppgaven, og lister minst én side i `pages.order`. I eksempelet er det `App/ui/PdfSubform`. Appen bruker ikke denne mappen når den lager PDF-ene. Se [Hva brukeren ser mens en systemoppgave kjører]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/visning" >}}).

## Metadata på PDF-ene

Hver PDF får to metadatafelt. Et system som henter PDF-ene, kan bruke dem til å koble hver PDF til riktig oppføring.

| Nøkkel                 | Verdi |
|------------------------|-------|
| `subformUiFolder`      | UI-mappen til underskjemaet, som i `subformUiFolder` |
| `subformDataElementId` | ID-en til dataelementet for oppføringen PDF-en er laget av |

## Oppgradere fra v8

V9 støtter ikke `subformComponentId` og `subformDataTypeId` i `subformPdfConfig`, og bygget stopper med [ALTINNAPP0602]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0602" >}}). `studioctl app upgrade v9` skriver om oppgaven til `subformUiFolder`. Oppgraderingen finner underskjemaet gjennom den skjulte kopien av komponenten **Tabell for underskjema** i UI-mappen til oppgaven, og fjerner kopien når den har skrevet om oppgaven.

Deretter rydder oppgraderingen i UI-mappen til oppgaven, slik den gjør for alle systemoppgaver. Ble en side tom uten kopien, fjerner oppgraderingen siden. Står mappen igjen med bare `Settings.json`, fjerner den hele mappen. Lister mappen andre sider i `pages.order`, får du en oppgave du må gjøre selv, fordi v9 viser sidene mens oppgaven kjører. Se [Systemoppgaver viser sidene i UI-mappen mens de kjører]({{< relref "/altinn-studio/v9/new-in-v9/upgrade#systemoppgaver-viser-sidene-i-ui-mappen-mens-de-kjører" >}}).

Oppgraderingen gjør også UI-mappen til underskjemaet klar. Mangler `Settings.json` en `type`, legger oppgraderingen til `"type": "subform"`, slik at Altinn Studio finner underskjemaet. Mangler `defaultDataType`, setter den datatypen fra `subformDataTypeId`. Har mappen en annen `defaultDataType` enn `subformDataTypeId`, får du en oppgave du må gjøre selv.

Mangler kopien, finnes den flere ganger, eller peker den ikke på en UI-mappe, lar oppgraderingen oppgaven stå uendret og lister den som en oppgave du må gjøre selv. Da bytter du ut `subformComponentId` og `subformDataTypeId` med `subformUiFolder` for hånd, og fjerner komponentkopien fra UI-mappen til oppgaven. Lister mappen sider du ikke vil vise mens oppgaven kjører, fjerner du dem også.

PDF-ene har metadatafeltet `subformUiFolder` i stedet for `subformComponentId`. Leser et system det gamle feltet, må det lese `subformUiFolder` i stedet.

## Slik tester du PDF-generering

Fyll ut hovedskjemaet og legg til én eller flere oppføringer i underskjemaet. Når prosessen kommer til systemoppgaven for underskjema-PDF, lager appen en PDF for hver oppføring og går automatisk videre til neste steg i prosessen, for eksempel kvittering.

## Feilsøking

Hvis du får en feilmelding om at systemoppgaven feilet under PDF-generering, kan du se PDF-en for én oppføring i nettleseren. Åpne instansen i appen, og legg til query-parameterne `pdf=1`, `subformUiFolder` og `subformDataElementId` i adressen. `subformUiFolder` er navnet på UI-mappen til underskjemaet, og `subformDataElementId` er ID-en til dataelementet for oppføringen. Adressen slutter da for eksempel med `?pdf=1&subformUiFolder=underskjema&subformDataElementId=<ID>`. Du ser det samme innholdet som PDF-en skulle ha vist, og eventuelle feilmeldinger.
