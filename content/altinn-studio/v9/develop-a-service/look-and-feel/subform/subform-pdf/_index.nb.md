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

Regelsiden for [ALTINNAPP1024]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1024" >}}) forklarer hvordan du retter feilen.

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

Systemoppgaven bruker bare UI-mappen til underskjemaet. `PdfLayout.json` er valgfri.

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

Denne filen bestemmer hvordan PDF-en for hver oppføring ser ut. Du kobler den til med `pdfLayoutName` i `Settings.json` for underskjemaet. Uten denne filen viser PDF-en alle sidene i underskjemaet. Her bruker du typisk en `Summary2`-komponent som oppsummerer underskjemaet:

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

Mens appen lager PDF-ene, ser brukeren den vanlige lastevisningen. Feiler PDF-genereringen, viser appen en standardside med knappen **Prøv igjen**. Vil du vise en egen side mens oppgaven kjører, lager du en UI-mappe med samme navn som systemoppgaven. Se [Hva brukeren ser mens en systemoppgave kjører]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/visning" >}}).

## Metadata på PDF-ene

Hver PDF får to metadatafelt. Et system som henter PDF-ene, kan bruke dem til å koble hver PDF til riktig oppføring.

| Nøkkel                 | Verdi |
|------------------------|-------|
| `subformUiFolder`      | UI-mappen til underskjemaet, som i `subformUiFolder` |
| `subformDataElementId` | ID-en til dataelementet for oppføringen PDF-en er laget av |

## Oppgradere fra v8

V9 støtter ikke `subformComponentId` og `subformDataTypeId` i `subformPdfConfig`, og bygget stopper med [ALTINNAPP0602]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0602" >}}). `studioctl app upgrade v9` skriver om oppgaven til `subformUiFolder`. Har oppgaven en UI-mappe med bare ventesiden og den skjulte komponentkopien Altinn Studio laget, fjerner oppgraderingen mappen. Ellers beholder den mappen og gir en advarsel.

PDF-ene har metadatafeltet `subformUiFolder` i stedet for `subformComponentId`. Leser et system det gamle feltet, må det lese `subformUiFolder` i stedet.

## Slik tester du PDF-generering

Fyll ut hovedskjemaet og legg til én eller flere oppføringer i underskjemaet. Når prosessen kommer til systemoppgaven for underskjema-PDF, lager appen en PDF for hver oppføring og går automatisk videre til neste steg i prosessen, for eksempel kvittering.

## Feilsøking

Hvis du får feilmelding om at systemoppgaven feilet under PDF-generering, kan du åpne underskjemaet i appen og legge til query-parameteren `pdf=1`. Da ser du det samme innholdet som PDF-en skulle ha vist, og eventuelle feilmeldinger.
