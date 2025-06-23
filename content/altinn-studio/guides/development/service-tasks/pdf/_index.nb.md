---
title: PDF
tags: [altinn-apps, process, bpmn, task, service task, pdf, systemoppgave]
weight: 10
---

Generering av PDF følger med appen som en standard systemoppgave som kan legges til som et steg i prosessen.

{{<notice warning>}}
Tidligere lå ikke denne funksjonaliteten i en systemoppgave, men var bakt inn i den grenerelle koden for å endre prosesssteg. Dersom appen din ble satt opp før versjon 8.7, så bør du deaktivere funksjonalitenen som kjøres utenfor prosessdefinisjonen.

Det gjør du ved å slå av "enablePdfGeneration" på alle datatyper.
{{</notice>}}


Slik legger du til PDF-generering i prosessen:
```xml
<bpmn:serviceTask id="Task_3" name="PDF">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>pdf</altinn:taskType>
            <altinn:pdfConfig>
                <altinn:filename>pdfFileNameTextResourceKey</altinn:filename>
            </altinn:pdfConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>SequenceFlow_0c458hu</bpmn:incoming>
    <bpmn:outgoing>SequenceFlow_5assd2s</bpmn:outgoing>
</bpmn:serviceTask>
```

Innholdet i PDF-en definerer du ved å opprette et layout-set for systemoppgaven, på samme måte som for andre prosessoppgaver.
```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "SummaryTask1",
        "type": "Summary2",
        "target": {
          "type": "layoutSet",
          "taskId": "Task_1"
        }
      },
      {
        "id": "SummaryTask2",
        "type": "Summary2",
        "target": {
          "type": "layoutSet",
          "taskId": "Task_2"
        }
      }
    ]
  }
}
```