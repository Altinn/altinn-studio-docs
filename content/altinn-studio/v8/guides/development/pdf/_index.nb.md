---
title: PDF
description: Hvordan sette opp PDF-generering som systemoppgave
tags: [altinn-apps, process, bpmn, task, service task, pdf, systemoppgave]
weight: 15
---

## Oversikt

Generering av PDF følger med appen som en standard systemoppgave som kan legges til som et steg i prosessen.

{{<notice warning>}}
Tidligere lå ikke denne funksjonaliteten i en systemoppgave, men var bakt inn i den grenerelle koden for å endre prosesssteg. Dersom appen din ble satt opp før versjon 8.9, så bør du deaktivere funksjonalitenen som kjøres utenfor prosessdefinisjonen.

Det gjør du ved å slå av "enablePdfGeneration" på alle datatyper.

Fordeler med å migrere til systemoppgave er:
- Mulighet for å prøve på nytt dersom PDF-generering feiler, uten å måtte kjøre en full process next på ny, som kan ha utilsiktede sideeffekter.
- Mulighet til å lage mange PDF-er basert på en oppgave, eller slå sammen mange oppgaver til én PDF.
- I fremtiden: Kjøre PDF-generering som bakgrunnsjobb med automatiske retries og bedre skalering.
{{</notice>}}

{{%notice info%}}
Krever minst versjon 8.9.0 av Altinn NuGet-pakkene.
{{%/notice%}}

## Oppsett

Du kan bruke arbeidsflyt-fanen i Altinn Studio for å legge til en PDF-systemoppgave. 

![Legg til PDF-systemoppgave](add-pdf-step.png "Legg til PDF-systemoppgave")

Dra og slipp PDF-systemoppgaven der i prosessen du ønsker å generere en PDF, ofte rett etter en data-oppgave.

Når det er utført vil et konfigurasjonspanel åpne seg til høyre i skjermbildet.
Der har man to alternative tilnærminger til oppsett av PDF: standard eller egendefinert.

{{% expandlarge id="auto-generated-pdf" header="Standard PDF basert på tidligere oppgaver" %}}

Ved valg av dette alternativet blir du bedt om å velge hvilke tidligere oppgaver som skal være med i PDF-en. Innholdet vil da basere seg på komponentene i de valgte oppgavene, men i "oppsummeringsmodus". Denne funksjonen respekterer ikke pdfLayoutName-konfigurasjon i Settings.json.

![Eksempeloppsett standard PDF](auto-pdf.png "Eksempeloppsett standard PDF")

En systemoppgave vil bli satt inn i `process.bpmn`. Kan avvike noe fra eksempelet nedenfor. 

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Pdf" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>pdf</altinn:taskType>
            <altinn:actions>
              <altinn:action>reject</altinn:action> <!-- Legges til via Handlinger, dersom man skal kunne f.eks. gå tilbake. -->
            </altinn:actions>
            <altinn:pdfConfig>
                <altinn:filenameTextResourceKey>pdfFileName</altinn:filenameTextResourceKey>
                <altinn:autoPdfTaskIds>
                    <altinn:taskId>Task_Utfylling1</altinn:taskId>
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

Ved valg av dette alternativet så kan du selv bestemme innholdet i PDF-en ved å definere et layout-set for PDF-systemoppgaven.

Du blir først bedt om å oppgi et navn for layout-set til systemoppgaven, og så må du velge en datamodell som default datamodell for settet. Her kan du f.eks. velge modellen til en av oppgavene som er i PDF-en.

![Eksempeloppsett manuell PDF](manual-pdf.png "Eksempeloppsett manuell PDF")

En systemoppgave vil bli satt inn i `process.bpmn` og layout-set filene vil bli generert, dog uten innhold i PdfLayout.json.

{{< code-title >}}
  App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:serviceTask id="Pdf" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
        <altinn:taskType>pdf</altinn:taskType>
        <altinn:actions>
          <altinn:action>reject</altinn:action> <!-- Legges til via Handlinger, dersom man skal kunne f.eks. gå tilbake. -->
        </altinn:actions>
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
        "Task_Utfylling1"
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
        "taskId": "Task_Utfylling1",
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
        "id": "SummaryTaskUtfylling1",
        "type": "Summary2",
        "target": {
          "type": "layoutSet",
          "taskId": "Task_Utfylling1"
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
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "size": "L",
        "id": "service-task-title",
        "type": "Header",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.title"
        }
      },
      {
        "id": "service-task-body",
        "type": "Paragraph",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.body"
        }
      },
      {
        "id": "service-task-help-text",
        "type": "Paragraph",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.help_text"
        }
      },
      {
        "id": "service-task-button-group",
        "type": "ButtonGroup",
        "children": [
          "service-task-retry-button",
          "service-task-back-button"
        ]
      },
      {
        "id": "service-task-retry-button",
        "type": "Button",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.retry_button"
        }
      },
      {
        "id": "service-task-back-button",
        "type": "ActionButton",
        "textResourceBindings": {
          "title": "service_task_custom_pdf_default.back_button"
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
  Ved bruk av standard PDF, kan man ikke bruke `dataModel.default`. Man må bruke faktisk ID for datamodellen, f.eks. `dataModel.model`.
{{</notice>}}

## Test

Fyll ut skjemaet og gå videre. Når du når systemoppgaven for PDF i arbeidsflyten, så skal PDF-en genereres og gå automatisk videre til neste element i BPMN-prosessen, for eksempel kvittering.

## Feilsøking

Dersom du får feilmelding om at systemoppgaven feilet under PDF-generering, så kan det være lurt å åpne skjemaet i appen og legge til query param pdf=1. Da vil du se det samme innholdet som PDF-en skulle inneholdt, og evt. de samme feilmeldingene i frontend.