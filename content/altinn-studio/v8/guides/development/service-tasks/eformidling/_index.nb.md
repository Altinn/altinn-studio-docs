---
title: eFormidling
tags: [altinn-apps, process, bpmn, task, service task, eformidling, systemoppgave]
weight: 10
---

En systemoppgave for å sende instansdata via eFormilding følger med appen som standard, og kan legges til som et steg i prosessen for å tas i bruk.

{{<notice warning>}}
Tidligere lå ikke denne funksjonaliteten i en systemoppgave, men var bakt inn i den grenerelle koden for å endre prosesssteg. Dersom appen din ble satt opp før versjon 8.7, så bør du deaktivere funksjonalitenen som kjøres utenfor prosessdefinisjonen.
{{</notice>}}

Slik legger du til eFormidling i prosessen:
```xml
<bpmn:serviceTask id="Task_4" name="eFormidling">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>eFormidling</altinn:taskType>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>SequenceFlow_5assd2s</bpmn:incoming>
    <bpmn:outgoing>SequenceFlow_2asasd1</bpmn:outgoing>
</bpmn:serviceTask>
```

