---
draft: true
title: PDF-generering for underskjema
linktitle: PDF-generering
description: Slik setter du opp PDF-generering for underskjema
tags: [underskjema, pdf, needsReview]
weight: 16
---

Med systemoppgaven for underskjema-PDF kan du lage en egen PDF for hver oppføring i et underskjema.

{{<notice warning>}}
Systemoppgaven lager PDF-ene én etter én, i ett og samme steg i prosessen. Steget har en tidsgrense, så med mange oppføringer kan det ta for lang tid. Test med et realistisk antall oppføringer i testmiljøet.
{{</notice>}}

## Forutsetninger

Appen har ett eller flere underskjemaer. Denne veiledningen forklarer ikke hvordan du setter opp selve underskjemaet. Les om det i [Underskjema]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/subform" >}}).

## Slik setter du opp PDF-generering

### process.bpmn

Du må legge til en `serviceTask` av typen `subformPdf` i prosessen.

{{% notice info %}}
Du kan foreløpig ikke dra inn underskjema-PDF direkte i arbeidsflyt-editoren i Altinn Studio.
{{% /notice %}}

Inntil videre anbefaler vi følgende fremgangsmåte:

1. Dra inn en vanlig dataoppgave i arbeidsflyt-editoren.
2. Del endringene i Studio.
3. Rediger `process.bpmn` manuelt på egen maskin.
4. Konverter dataoppgaven til en `bpmn:serviceTask` (se eksempel nedenfor).

Slik blir sekvensflytene og diagrammet riktige.

```xml
<bpmn:serviceTask id="PdfSubform" name="PDF - underskjema">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>subformPdf</altinn:taskType>
            <altinn:subformPdfConfig>
                <altinn:filenameTextResourceKey>subformPdfFileName</altinn:filenameTextResourceKey>
                <altinn:subformComponentId>mySubformComponentId</altinn:subformComponentId>
                <altinn:subformDataTypeId>SubformModel</altinn:subformDataTypeId>
            </altinn:subformPdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1d4qgf7</bpmn:incoming>
    <bpmn:outgoing>Flow_1psipb3</bpmn:outgoing>
</bpmn:serviceTask>
```

Oppgaven må ha én inngående og én utgående sekvensflyt.

#### Parametere i subformPdfConfig

| Parameter                 | Beskrivelse                                                                                                                                                                                                            |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `filenameTextResourceKey` | Nøkkel til tekstressursen som definerer filnavnet for den genererte PDF-en. Valgfri. Uten denne får PDF-en et standard filnavn. Kan inneholde variabler. Bruk gjerne en variabel i filnavnet som gjør det enkelt å skille de ulike underskjema-PDF-ene fra hverandre. |
| `subformComponentId`      | Obligatorisk. ID-en til komponenten **Tabell for underskjema** (`Subform`) i hovedskjemaet. Du må også ha en skjult kopi av komponenten med samme ID i layouten til systemoppgaven, se [PdfSubform/layouts/ServiceTask.json](#pdfsubformlayoutsservicetaskjson). |
| `subformDataTypeId`       | Obligatorisk. ID-en til datatypen for underskjemaet. Systemoppgaven lager én PDF for hvert dataelement av denne typen.                                                                                                      |

Eksempel på tekstressurs for filnavn med variabel:

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

### Oppgavemappe for PDF-generering

Opprett en mappe under `App/ui` med samme navn som ID-en til systemoppgaven som genererer PDF-en. I dette eksempelet heter oppgaven `PdfSubform`, og mappen må derfor hete `PdfSubform`.

Legg til en `Settings.json`-fil i oppgavemappen. Sett `defaultDataType` til datatypen for underskjemaet:

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
  "defaultDataType": "SubformModel",
  "pages": {
    "order": ["ServiceTask"]
  }
}
```

### Mappestruktur under App/ui

For hvert underskjema med PDF-generering har du denne mappestrukturen under `App/ui/`. `PdfLayout.json` er valgfri.

```
App/ui/
├── underskjema/
│   ├── Settings.json
│   └── layouts/
│       ├── Underskjema.json
│       └── PdfLayout.json
└── PdfSubform/
    ├── Settings.json
    └── layouts/
        └── ServiceTask.json
```

#### underskjema/Settings.json

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

```
Denne filen inneholder sidene i underskjemaet, som du allerede har laget.
```

#### underskjema/layouts/PdfLayout.json

Denne filen bestemmer hvordan PDF-en for hver oppføring ser ut. Du kobler den til med `pdfLayoutName` i `Settings.json` for underskjemaet. Uten denne filen viser PDF-en alle sidene i underskjemaet. Her bruker du typisk en `Summary2`-komponent som oppsummerer underskjemaet:


{{< code-title >}}
ui/underskjema/layouts/PdfLayout.json
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

#### PdfSubform/Settings.json

{{< code-title >}}
ui/PdfSubform/Settings.json
{{< /code-title >}}

```json
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
    "defaultDataType": "SubformModel",
    "pages": {
        "order": ["ServiceTask"]
    }
}
```
#### PdfSubform/layouts/ServiceTask.json

Denne layouten trenger bare en skjult kopi av komponenten **Tabell for underskjema**, med samme ID som i `subformComponentId`. Uten den fungerer ikke PDF-genereringen. Vi håper å fjerne dette kravet i en senere versjon.

{{% notice info %}}
Feiler PDF-genereringen, viser appen en standardside med knappen **Prøv igjen**, uansett hva du har lagt inn i denne layouten. Brukeren kan ikke gå tilbake til et tidligere steg fra denne siden.
{{% /notice %}}

{{< code-title >}}
ui/PdfSubform/layouts/ServiceTask.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "mySubformComponentId",
        "type": "Subform",
        "layoutSet": "underskjema",
        "hidden": true,
        "tableColumns": [...]
      }
    ]
  }
}
```

## Slik tester du PDF-generering

Fyll ut hovedskjemaet og legg til én eller flere oppføringer i underskjemaet. Når prosessen kommer til systemoppgaven for underskjema-PDF, lager appen en PDF for hver oppføring og går automatisk videre til neste steg i prosessen, for eksempel kvittering.

## Feilsøking

Hvis du får feilmelding om at systemoppgaven feilet under PDF-generering, kan du åpne underskjemaet i appen og legge til query-parameteren `pdf=1`. Da ser du det samme innholdet som PDF-en skulle ha vist, og eventuelle feilmeldinger.
