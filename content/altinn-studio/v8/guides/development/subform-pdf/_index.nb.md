---
title: PDF underskjema
description: Hvordan sette opp PDF-generering for underskjema
weight: 16
---

## Oversikt

Underskjema-PDF-systemoppgaven lar deg generere separate PDF-dokumenter for hvert eksemplar av et underskjema.

{{<notice warning>}}
Denne funksjonaliteten genererer flere PDF-er i løpet av én enkelt HTTP-forespørsel til appens backend. Det er begrensninger på hvor mange PDF-er du bør generere samtidig på denne måten. I fremtiden vil dette kunne kjøre som en bakgrunnsjobb, og da forsvinner denne begrensningen. Test med et realistisk antall PDF-er i testmiljøet for å avdekke eventuelle grenser.
{{</notice>}}

{{%notice info%}}
Krever minst versjon 8.9.0 av Altinn NuGet-pakkene.
{{%/notice%}}

## Forutsetninger
- Du har en applikasjon med ett eller flere underskjemaer. Denne guiden dekker ikke oppsett av selve underskjemaet.

## Oppsett

### Process.bpmn

For å aktivere PDF-generering for underskjema, må du legge til en `serviceTask` av type `subformPdf` i arbeidsflyten din.

**NB!** På sikt vil det være mulig å dra inn underskjema-PDF direkte via arbeidsflyt-editoren i Altinn Studio, men denne funksjonaliteten er foreløpig ikke tilgjengelig.

Inntil videre anbefaler vi følgende fremgangsmåte:
1. Dra inn en vanlig dataoppgave i arbeidsflyt-editoren.
2. Del endringene i Studio.
3. Rediger `process.bpmn` manuelt på egen maskin.
4. Konverter dataoppgaven til en `bpmn:serviceTask` (se eksempel nedenfor).

Dette sikrer at sekvensflyter og diagrammet blir korrekt.

```xml
<bpmn:serviceTask id="PdfSubform" name="PDF - underskjema">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>subformPdf</altinn:taskType>
            <altinn:actions>
              <altinn:action>reject</altinn:action> <!-- Legges til via Handlinger, dersom man skal kunne f.eks. gå tilbake. -->
            </altinn:actions>
            <altinn:subformPdfConfig>
                <altinn:filenameTextResourceKey>subformPdfFileName</altinn:filenameTextResourceKey>
                <altinn:subformComponentId>mySubformComponentId</altinn:subformComponentId>
                <altinn:subformDatatTypeId>SubformModel</altinn:subformDatatTypeId>
            </altinn:subformPdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1d4qgf7</bpmn:incoming>
    <bpmn:outgoing>Flow_1psipb3</bpmn:outgoing>
</bpmn:serviceTask>
```

Husk at oppgaven må ha en inngående og en utgående sekvensflyt.

#### Parametere i subformPdfConfig

| Parameter                 | Beskrivelse                                                                                                                                                                                                            |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `filenameTextResourceKey` | Nøkkel til tekstressursen som definerer filnavnet for den genererte PDF-en. Kan inneholde variabler. Bruk gjerne en variabel i filnavnet som gjør det enkelt å skille de ulike underskjema-PDF-ene fra hverandre. |
| `subformComponentId`(*)   | ID-en til underskjemakomponenten. Du må ha en kopi av komponenten både der underskjemaet ligger i hovedskjemaet, og i ServiceTask.json-layouten til systemoppgaven.                                                |
| `subformDatatTypeId`(*)   | Datatype-ID-en for underskjemaet.                                                                                                                                                                                  |

Eksempel på tekstressurs for filnavn med variabel:

```json
{
      "id": "pdfFileName",
      "value": "Mitt filnavn {0}",
      "variables": [
        {
          "key": "MySubformProperty",
          "dataSource": "dataModel.SubformModel"
        }
      ]
    }
```

### Layout-sets.json

Du må definere et eget layout-set for systemoppgaven som genererer PDF av underskjemaet.

```json {hl_lines="18-22"}
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
    "sets": [
      {
         "id": "form",
         "dataType": "model",
         "tasks": ["Task_1"]
      },
      {
         "id": "formPdf",
         "dataType": "model",
         "tasks": ["PdfForm"]
      },
      {
         "id": "underskjema",
         "dataType": "SubformModel"
      },
      {
         "id": "underskjemaPdf",
         "dataType": "SubformModel",
         "tasks": ["PdfSubform"]
      }
    ]
}
```

### UI-mappestruktur

For hvert underskjema med PDF-generering, må du ha følgende mappestruktur under `App/ui/`:

```
App/ui/
├── underskjema/
│   ├── Settings.json
│   └── layouts/
│       ├── Underskjema.json
│       └── PdfLayout.json
└── underskjemaPdf/
    ├── Settings.json
    └── layouts/
        └── ServiceTask.json
```

#### underskjema/Settings.json

```json
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
    "pages": {
        "order": ["Underskjema"],
        "pdfLayoutName": "PdfLayout"
    }
}
```

#### underskjema/layout/Underskjema.json

```
Det legges til grunn at det allerede finnes et underskjema definert i denne filen.
```

#### underskjema/layout/PdfLayout.json

Denne filen definerer hvordan PDF-en skal se ut. Her bruker du typisk en `Summary2`-komponent for å vise en oppsummering av underskjemaet:


{{< code-title >}}
ui/underskjema/layout/PdfLayout.json
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

#### underskjemaPdf/Settings.json

{{< code-title >}}
ui/underskjemaPdf/Settings.json
{{< /code-title >}}

```json
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
    "pages": {
        "order": ["ServiceTask"]
    }
}
```
#### underskjemaPdf/layout/ServiceTask.json

Denne layout-filen viser innhold til brukeren dersom PDF-genereringen feiler, for eksempel feilmeldinger eller instruksjoner.

Dersom du vil la brukeren avbryte systemoppgaven, f.eks. for å gå tilbake til forrige oppgave, må du legge til `reject`-handlingen i prosessdefinisjonen (se XML-eksempelet over) og gi rettigheter til handlingen i appens tilgangspolicy. Hvor brukeren sendes videre, avhenger av sekvensflytene i BPMN-prosessen.

**NB!** Du må også legge til en skjult kopi av underskjemakomponenten i denne layouten for at PDF-genereringen skal fungere korrekt. Se `mySubformComponentId` nedenfor. Vi håper å kunne fjerne dette kravet i en fremtidig versjon, men foreløpig er det påkrevd.

{{< code-title >}}
ui/underskjemaPdf/layout/ServiceTask.json
{{< /code-title >}}

```json
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
   "data": {
      "layout": [
         {
            "size": "L",
            "id": "service-task-title",
            "type": "Header",
            "textResourceBindings": {
               "title": "service_task.title"
            }
         },
         {
            "id": "service-task-body",
            "type": "Paragraph",
            "textResourceBindings": {
               "title": "service_task.body"
            }
         },
         {
            "id": "service-task-help-text",
            "type": "Paragraph",
            "textResourceBindings": {
               "title": "service_task.help_text"
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
               "title": "service_task.retry_button"
            }
         },
         {
            "id": "service-task-back-button",
            "type": "ActionButton",
            "textResourceBindings": {
               "title": "service_task.back_button"
            },
            "action": "reject",
            "buttonStyle": "secondary"
         },
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
## Test

Fyll ut hovedskjemaet og legg til ett eller flere eksemplarer av underskjemaet. Når du når underskjema-PDF-systemoppgaven i arbeidsflyten, genererer appen en PDF for hvert eksemplar av underskjemaet og går automatisk videre til neste steg i prosessen, for eksempel kvittering.

## Feilsøking

Dersom du får feilmelding om at systemoppgaven feilet under PDF-generering, kan du åpne underskjemaet i appen og legge til query-parameteren `pdf=1`. Da ser du det samme innholdet som PDF-en skulle ha vist, og eventuelle feilmeldinger.