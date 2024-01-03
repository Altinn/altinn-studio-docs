---
title: Prosess task
description: Definere prosess tasks
tags: [altinn-apps, process, bpmn, task]
weight: 10
toc: true
---

## Oppgavetyper

### Data task

En dataoppgave er der brukeren/systemet som bruker den digitale tjenesten gjennom brukergrensesnittet eller API-en kan lese, skrive og endre data relatert til en digital tjeneste.

En dataoppgave krever at all data for en gitt prosessoppgave er gyldig og at brukeren/systemet har lagt til all nødvendig data.

Datavalidering er en del av standardlogikken i malen. Applikasjonsutviklere kan legge til egendefinert validering for hvert dataelement og oppgave.

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

### Confirmation task

En bekreftelsesoppgave er der sluttbrukeren som bruker applikasjonen gjennom nettleseren eller systemet gjennom API kan bekrefte data som er en del av prosessen.

Når en bruker bekrefter en bekreftelsesoppgave, opprettes det en bekreftelseslogg for instansen som detaljerer at bruker/system X har bekreftet.

Eksempel på en bekreftelsesoppgave:

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

### Signing task

En signeringsoppgave er der sluttbrukeren som bruker applikasjonen gjennom nettleseren eller systemet gjennom API kan signere data som er en del av prosessen.

Når en bruker utfører en signering, genereres det et signaturobjekt som inneholder brukerinformasjonen og en hash av dataelementene som er definert i prosessoppgaven. Samtidig opprettes en hendelseslogg for instansen som detaljerer at bruker/system X har signert.

Eksempel på en signeringsoppgave:

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

```xml
<bpmn:task id="Task_2" name="Tilbakemelding">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:taskType>feedback</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

## Actions i oppgaver

I versjon 8 av app-pakken ble det introdusert handlinger i oppgaver. Dette gjør det mulig for utviklere å knytte handlingstastene i brukergrensesnittet til brukerhandlinger i backenden.
Det er mulig å autorisere hver handling i en oppgave separat i policy-filen.

### Handlinger med spesifikk Altinn-logikk knyttet til dem

#### write
Standardhandling som utføres når en dataoppgave eller tilbakemeldingsoppgave sendes inn.

#### confirm
Standardhandling som utføres når en bekreftelsesoppgave sendes inn.

#### sign
Handling som genererer et signaturobjekt basert på konfigurasjonen av oppgaven, se [Signatur]().

#### reject
Handling som brukes når man går tilbake fra en oppgave til en annen. Å utføre handlingen "reject" vil låse opp dataelementene i måloppløpet.

#### Egendefinerte handlinger og egendefinert logikk ved utførelse av handlingen

#### Egendefinert handling i oppgave
For å legge til handlinger i en oppgave må du endre filen `App/config/process/process.bpmn` og legge til ønsket handling i oppgaven.

Eksempel på en prosess der oppgaven Task_1 har handlingene _demo_ og _custom_ definert:

```xml {hl_lines=["15-27"]}
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="Definitions_1eqx4ru" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
targetNamespace="http://bpmn.io/schema/bpmn" 
xmlns:altinn="http://altinn.no/process">
  <bpmn:process id="Process_1rq9ej8" isExecutable="false">
    <bpmn:startEvent id="StartEvent">
      <bpmn:outgoing>Flow1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow1" sourceRef="StartEvent" targetRef="Task1" />
    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>Flow1</bpmn:incoming>
      <bpmn:outgoing>Flow2</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
          <altinn:actions>
            <altinn:action>demo</altinn:action>
            <altinn:action>custom</altinn:action>
          </altinn:actions>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow2" sourceRef="Task1" targetRef="EndEvent" />
    <bpmn:endEvent id="EndEvent">
      <bpmn:incoming>Flow2</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
</bpmn:definitions>
```

Når disse handlingene har blitt [tildelt brukere i policy.xml](), er det mulig å legge til [ActionButtons i brukergrensesnittet som er koblet til handlingene](). <!--//TODO: Add a link to docs for defining XACML and ActionButton-->