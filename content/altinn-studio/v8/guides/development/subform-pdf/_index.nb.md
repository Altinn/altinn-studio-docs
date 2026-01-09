---
title: PDF underskjema
description: Hvordan sette opp PDF-generering for underskjema
weight: 100
---

## Oversikt

Underskjema-PDF systemoppgaven lar deg generere separate PDF-dokumenter for hvert eksemplar av et underskjema.

{{<notice warning>}}
Denne funksjonaliteten forsøker å generere flere PDF-er i løpet av behandlingen av en http request til appens backend. Det er visse begrensninger rundt hvor mange PDF-er man bør forsøke å generere samtidig på denne måten. I fremtiden vil dette kunne kjøre som en bakgrunnsjobb, og da vil den grensen forsvinne. Test med et realistisk antall PDF-er i testmiljø for å se om grensen er nådd.
{{</notice>}}

## Forutsetninger
- Du har en applikasjon med ett eller flere underskjema. Denne guiden viser ikke oppsett av underskjema.

## Oppsett

### Process.bpmn

For å aktivere PDF-generering for underskjema må du legge til en `serviceTask` av type `subformPdf` i arbeidsflyten din.

**NB!** På sikt vil det være mulig å dra inn underskjema-PDF direkte via Arbeidsflyt-editoren i Altinn Studio, men denne funksjonaliteten er dessverre ikke tilgjengelig enda.

Inntil videre anbefales følgende fremgangsmåte:
1. Dra inn en vanlig data-oppgave i Arbeidsflyt-editoren
2. Del endringene i Studio
3. Rediger `process.bpmn` manuelt på egen maskin
4. Konverter data-oppgaven til en `bpmn:serviceTask` (se eksempel nedenfor)

Dette sikrer at sekvensflyter og diagrammet blir korrekt.

```xml
<bpmn:serviceTask id="PdfSubform" name="PDF - underskjema">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>subformPdf</altinn:taskType>
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
| `filenameTextResourceKey` | Nøkkel til tekstressurs som definerer filnavnet for den genererte PDF-en. Kan inneholde variabler. Det kan være lurt å bruke en variabel i filnavnet som gjør det lett å se forskjell på de ulike underskjema-PDF-ene. |
| `subformComponentId`(*)   | ID-en til underskjemakomponenten. Du må ha en kopi av komponenten både der underskjemaet skal ligge i hovedskjemaet, og i ServiceTask.json-layouten til systemoppgaven.                                                |
| `subformDatatTypeId`(*)   | Datatype-ID-en for subformen.                                                                                                                                                                                          |

Eksempel på tekstressurs for filnavn med variabel:

```json
{
      "id": "pdfFileName",
      "value": "Mitt filnavn {0}",
      "variables": [
        {
          "key": "MySubformProperty",
          "dataSource": "datamodel.SubformModel"
        }
      ]
    }
```

### Layout-sets.json

Du må definere et eget layout-set for systemoppgaven som skal lage PDF av underskjemaet.

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

For hver underskjema med PDF-generering må du ha følgende mappestruktur under `App/ui/`:

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

Denne filen definerer hvordan PDF-en skal se ut. Den bruker typisk en `Summary2`-komponent for å vise oppsummering av subformen:


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

Denne layout-filen vises hvis PDF-genereringen feiler. Den kan inneholde feilmeldinger eller instruksjoner til brukeren.

**NB!** I tillegg må du legge til en skjult kopi av underskjema-komponenten i denne layouten for at PDF-genereringen skal fungere korrekt. Se `mySubformComponentId` nedenfor. Vi håper å en dag kunne fjerne dette, men i nåværende versjon er det påkrevd.

{{< code-title >}}
ui/underskjemaPDf/layout/ServiceTask.json
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
               "title": "Det oppsto en feil ved generering av PDF. Vennligst prøv igjen."
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

Fyll ut hovedskjemaet og legg til ett eller flere eksemplarer av underskjemaet. Når du når systemoppgaven for underskjema-PDF i arbeidsflyten, så skal PDF-en genereres for hvert eksemplar av underskjemaet og gå automatisk videre til neste element i BPMN-prosessen, for eksempel kvittering.

## Feilsøking

Dersom du får feilmelding om at systemoppgaven feilet under PDF-generering, så kan det være lurt å åpne underskjemaet i appen og legge til query param pdf=1. Da vil du se det samme innholdet som PDF-en skulle inneholdt, og evt. de samme feilmeldingene i frontend.