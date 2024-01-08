---
title: Prosess task
description: Definere prosess tasks
tags: [altinn-apps, process, bpmn, task]
weight: 10
---

## Oppgavetyper

### Data task

En dataoppgave er der brukeren/systemet som bruker den digitale tjenesten gjennom brukergrensesnittet eller API-en kan lese, skrive og endre data relatert til en digital tjeneste.

En dataoppgave krever at all data for en gitt prosessoppgave er gyldig og at brukeren/systemet har lagt til all nødvendig data.

Datavalidering er en del av standardlogikken i malen. Applikasjonsutviklere kan legge til egendefinert validering for hvert dataelement og oppgave.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v8">}}
```xml
<bpmn:task id="Task_1" name="Utfylling">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:taskType>data</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```
{{</content-version-container>}}
{{<content-version-container version-label="v7">}}
```xml
<bpmn:task id="Task_1" name="Utfylling" dataType="data">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Confirmation task

En bekreftelsesoppgave er der sluttbrukeren som bruker applikasjonen gjennom nettleseren eller systemet gjennom API kan bekrefte data som er en del av prosessen.

Når en bruker bekrefter en bekreftelsesoppgave, opprettes det en bekreftelseslogg for instansen som detaljerer at bruker/system X har bekreftet.

Eksempel på en bekreftelsesoppgave:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v8">}}
```xml
<bpmn:task id="Task_2" name="Bekreftelse">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:actions>
            <altinn:action>confirm</altinn:action>
        </altinn:actions>
        <altinn:taskType>confirmation</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```
{{</content-version-container>}}
{{<content-version-container version-label="v7">}}
```xml
<bpmn:task id="Task_2" name="Bekreftelse" dataType="confirmation">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Signing task

En signeringsoppgave er der sluttbrukeren som bruker applikasjonen gjennom nettleseren eller systemet gjennom API kan signere data som er en del av prosessen.

Når en bruker utfører en signering, genereres det et signaturobjekt som inneholder brukerinformasjonen og en hash av dataelementene som er definert i prosessoppgaven. Samtidig opprettes en hendelseslogg for instansen som detaljerer at bruker/system X har signert.

Eksempel på en signeringsoppgave (bare tilgjengelig fra versjon 8):

```xml
<bpmn:task id="Task_1">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:actions>
            <altinn:action>sign</altinn:action>
        </altinn:actions>
        <altinn:taskType>signing</altinn:taskType>
        <altinn:signatureConfig>
        <altinn:dataTypesToSign>
            <altinn:dataType>MyDataModel</altinn:dataType>
        </altinn:dataTypesToSign>
        <altinn:signatureDataType>signature2</altinn:signatureDataType>
        <altinn:uniqueFromSignaturesInDataTypes>
            <altinn:dataType>signature1</altinn:dataType>
        </altinn:uniqueFromSignaturesInDataTypes>
        </altinn:signatureConfig>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

Som eksempelet ovenfor viser, krever en signaturoppgave ekstra informasjon. Se [Konfigurering av signering](signing) for detaljer om hvordan du konfigurerer en signaturoppgave og dens effekter.

### Feedback task

En tilbakemeldingsoppgave lar tjenesteeieren eller andre gi tilbakemeldinger til enheten som rapporterer data.

Det lar brukeren laste opp data og fortsette prosessen.

Eksempel på en tilbakemeldingsoppgave:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v8">}}
```xml
<bpmn:task id="Task_2" name="Bekreftelse">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:taskType>feedback</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```
{{</content-version-container>}}
{{<content-version-container version-label="v7">}}
```xml
<bpmn:task id="Task_2" name="Bekreftelse" dataType="feedback">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```
{{</content-version-container>}}
{{</content-version-selector>}}
