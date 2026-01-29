---
title: PDF
tags: [altinn-apps, process, bpmn, task, service task, pdf, systemoppgave]
weight: 15
---

Generering av PDF følger med appen som en standard systemoppgave som kan legges til som et steg i prosessen.

{{<notice warning>}}
Tidligere lå ikke denne funksjonaliteten i en systemoppgave, men var bakt inn i den grenerelle koden for å endre prosesssteg. Dersom appen din ble satt opp før versjon 8.9, så bør du deaktivere funksjonalitenen som kjøres utenfor prosessdefinisjonen.

Det gjør du ved å slå av "enablePdfGeneration" på alle datatyper.

Fordeler med å migrere til systemoppgave er:
- Mulighet for å prøve på nytt dersom PDF-generering feiler, uten å måtte kjøre en full process next på ny, som kan ha utilsiktede sideeffekter.
- Mulighet til å lage mange PDF-er basert på en oppgave, eller slå sammen mange oppgaver til én PDF.
- I fremtiden: Kjøre PDF-generering som bakgrunnsjobb med automatiske retries og bedre skalering.
{{</notice>}}

Du kan bruke arbeidsflyt-fanen i Altinn Studio for å legge til en PDF-systemoppgave. Det finnes to alternativer:

{{% expandlarge id="auto-generated-pdf" header="Autogenerert PDF basert på tidligere oppgaver" %}}

Følgende systemoppgave vil bli satt inn i `process.bpmn`. Innholdet vil da basere seg på komponentene i skjemaet, men i "oppsummeringsmodus". Denne funksjonen respekterer ikke pdfLayoutName-konfigurasjon i Settings.json.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Pdf_auto" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>pdf</altinn:taskType>
            <altinn:pdfConfig>
                <altinn:filenameTextResourceKey>pdfFileName</altinn:filenameTextResourceKey>
                <altinn:autoPdfTaskIds>
                    <altinn:taskId>Form1</altinn:taskId>
                    <altinn:taskId>Form2</altinn:taskId>
                </altinn:autoPdfTaskIds>
            </altinn:pdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_0er70tq</bpmn:incoming>
    <bpmn:outgoing>Flow_19ikt1z</bpmn:outgoing>
</bpmn:serviceTask>
```

{{% /expandlarge %}}

{{% expandlarge id="custom-pdf-layout" header="Egendefinert PDF med eget layout-set" %}}

Følgende systemoppgave vil bli satt inn i `process.bpmn`. Med dette alternativet så kan du selv definere innholdet i PDF-en i et layout-set for PDF-systemoppgaven.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Pdf" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>pdf</altinn:taskType>
            <altinn:pdfConfig>
                <altinn:filenameTextResourceKey>pdfFileName</altinn:filenameTextResourceKey>
            </altinn:pdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>SequenceFlow_0c458hu</bpmn:incoming>
    <bpmn:outgoing>SequenceFlow_5assd2s</bpmn:outgoing>
</bpmn:serviceTask>
```

### Layout-set

Det trengs et nytt layout-set for PDF-systemoppgaven for å definere innholdet. Dette vil bli automatisk generert om du bruker arbeidsflyt-editor. Da må du bare redigere innholdet i `PdfLayout.json`.

Filene og mappestrukturen skal se omtrent slik ut:

```
App/ui/
├── layout-sets.json
├── form/
│   ├── Settings.json
│   └── layouts/
│       └── ...
└── Pdf/
    ├── Settings.json
    └── layouts/
        ├── PdfLayout.json
        └── ServiceTask.json
```

#### layout-sets.json

{{< code-title >}}
  App/ui/layout-sets.json
{{< /code-title >}}

```json {hl_lines="11-17"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
  "sets": [
    {
      "id": "form",
      "dataType": "model",
      "tasks": [
        "Task_Utfylling"
      ]
    },
    {
      "id": "Pdf",
      "dataType": "model",
      "tasks": [
        "Pdf"
      ]
    }
  ],
  "uiSettings": {
    "taskNavigation": [
      {
        "taskId": "Task_Utfylling",
        "name": "Utfylling"
      },
      {
        "type": "receipt"
      }
    ]
  }
}
```

#### Settings.json

{{< code-title >}}
  App/ui/Pdf/Settings.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "pdfLayoutName": "PdfLayout",
    "order": [
      "ServiceTask"
    ]
  }
} 
```

#### PdfLayout.json

I denne filen defineres innholdet i PDF-en. Ofte brukes komponenten Summary2, enten mot enkeltkomponter eller mot hele sider/layout-sets.

{{< code-title >}}
  App/ui/Pdf/layouts/PdfLayout.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "InstanceInformation",
        "type": "InstanceInformation"
      },
      {
        "id": "Summary_form",
        "type": "Summary2",
        "target": {
          "type": "layoutSet",
          "taskId": "form"
        }
      }
    ]
  }
}
```

#### ServiceTask.json

Denne layout-filen vises hvis PDF-genereringen feiler. Den kan inneholde feilmeldinger eller instruksjoner til brukeren. Tilpass gjerne.

{{< code-title >}}
  App/ui/Pdf/layouts/ServiceTask.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "size": "L",
        "id": "Header-IIkZPf",
        "type": "Header",
        "textResourceBindings": {
          "title": "Uff da! Her tryna PDF service-tasken, det var sikkert ikke med vilje!"
        }
      },
      {
        "id": "Button-BddG51",
        "type": "Button",
        "textResourceBindings": {
          "title": "Prøv igjen"
        }
      },
      {
        "id": "reject-button",
        "type": "ActionButton",
        "textResourceBindings": {
          "title": "Gå tilbake"
        },
        "action": "reject",
        "buttonStyle": "secondary"
      }
    ]
  }
}
```

{{% /expandlarge %}}

## Filnavn

Det er frivillig å inkludere `<altinn:filenameTextResourceKey`>. Her kan du oppgi en tekstressursnøkkel som vil bli brukt somn filnavn, med språk og variabelstøtte. Om den mangler vil PDF-en få navnet på applikasjonen som filnavn.

```json
{
  "id": "pdfFileName",
  "value": "Mitt filnavn {0}",
  "variables": [
    {
      "key": "EtDatamodellfelt",
      "dataSource": "dataModel.model"
    }
  ]
}
```

{{<notice warning>}}
  Ved bruk av autogenerert PDF kan man ikke bruke `datamodel.default`. Man må bruke faktisk ID for datamodellen, feks. `dataModel.model`.
{{</notice>}}

## Test

Fyll ut skjemaet og gå videre. Når du når systemoppgaven for PDF i arbeidsflyten, så skal PDF-en genereres og gå automatisk videre til neste element i BPMN-prosessen, for eksempel kvittering.

## Feilsøking

Dersom du får feilmelding om at systemoppgaven feilet under PDF-generering, så kan det være lurt å åpne skjemaet i appen og legge til query param pdf=1. Da vil du se det samme innholdet som PDF-en skulle inneholdt, og evt. de samme feilmeldingene i frontend.