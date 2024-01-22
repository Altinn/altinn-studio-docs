---
title: Flytkontroll
description: Kontroller proess flyt
tags: [altinn-apps, process, bpmn, gateway]
weight: 20
toc: true
---

## Eksklusive gateways

Eksklusive gateways tillater en annen vei i prosessen basert på direkte brukerinndata, data eller andre aspekter tilgjengelig fra koden.

## Gateways som kontrollerer flyten med uttrykk

### Forutsetninger

* Applikasjonen din bruker versjon 8.0.0 eller nyere av Altinn-pakkene.
* Applikasjon med en prosess som inneholder en eksklusiv gateway.

### Kontrollere flyten ut av en gateway basert på data levert av brukeren ved hjelp av uttrykk

Det er mulig å kontrollere hvilken flyt som velges ut av en gateway basert på data som ble levert av en bruker i en tidligere oppgave ved hjelp av samme uttrykkspråk som brukes til å skjule/ vise elementer i brukergrensesnittet.
For å oppnå dette må vi først definere hvilke formdata som skal leveres som kontekst til uttrykket.

Eksempel:
```xml {hl_lines=["6-10"]}
...
<bpmn:exclusiveGateway id="Gateway_1">
    <bpmn:incoming>Flow_t1_g1</bpmn:incoming>
    <bpmn:incoming>Flow_g1_t2</bpmn:incoming>
    <bpmn:outgoing>Flow_g1_end</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:gatewayExtension>
            <altinn:connectedDataTypeId>Schema</altinn:connectedDataTypeId>
        </altinn:gatewayExtension>
    </bpmn:extensionElements>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2" />
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent" />
...
```
I eksempelet ovenfor legger gatewayen til formdata som er lagret i datatype _Schema_ som kontekst til uttrykkene. Formdata og datatyper er definert i filen _applicationmetadata.json_.

Når gatewayen er koblet til en datatyper, kan vi dra nytte av uttrykkspråket for å definere om flytene ut av gatewayen er tilgjengelige.

MERK: Det må være bare én flyt tilgjengelig etter filtrering av flyter, med mindre det er en standardflyt, og den er en del av de mulige flytene ut av gatewayen.

Nå må vi definere disse uttrykkene i de utgående flytene fra gatewayen. I eksempelet på gatewayen har vi to utgående flyter: _Flow_g1_t2_ og _Flow_g1_end_

Vi vil sende prosessen for å følge _Flow_g1_t2_ hvis feltet Amount i formdata er større enn eller lik 1000, eller _Flow_g1_end_ hvis det er mindre enn 1000.

For å oppnå dette må vi legge til

# Prosessflyt

## Eksklusive gateways

Eksklusive gateways tillater en annen vei i prosessen basert på direkte brukerinndata, data eller andre aspekter tilgjengelig fra koden.

## Gateways som kontrollerer flyten med uttrykk

### Forutsetninger

* Applikasjonen din bruker versjon 8.0.0 eller nyere av Altinn-pakkene.
* Applikasjon med en prosess som inneholder en eksklusiv gateway.

### Kontrollere flyten ut av en gateway basert på data levert av brukeren ved hjelp av uttrykk

Det er mulig å kontrollere hvilken flyt som velges ut av en gateway basert på data som ble levert av en bruker i en tidligere oppgave ved hjelp av samme uttrykkspråk som brukes til å skjule/vise elementer i brukergrensesnittet.
For å oppnå dette må vi først definere hvilke formdata som skal leveres som kontekst til uttrykket.

Eksempel:
```xml {hl_lines=["6-10"]}
...
<bpmn:exclusiveGateway id="Gateway_1">
    <bpmn:incoming>Flow_t1_g1</bpmn:incoming>
    <bpmn:incoming>Flow_g1_t2</bpmn:incoming>
    <bpmn:outgoing>Flow_g1_end</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:gatewayExtension>
            <altinn:connectedDataTypeId>Schema</altinn:connectedDataTypeId>
        </altinn:gatewayExtension>
    </bpmn:extensionElements>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2" />
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent" />
...
```
I eksempelet ovenfor legger gatewayen til formdata som er lagret i datatypen _Schema_ som kontekst til uttrykkene. Formdata og datatyper er definert i filen _applicationmetadata.json_.

Når gatewayen er koblet til en datatypen, kan vi dra nytte av uttrykkspråket for å definere om flytene ut av gatewayen er tilgjengelige.

MERK: Det må bare være én flyt tilgjengelig etter filtrering av flytene, med mindre det er en standardflyt, og den er en del av de mulige flytene ut av gatewayen.

Nå må vi definere disse uttrykkene i de utgående flytene fra gatewayen. I eksemplet på gatewayen har vi to utgående flyter: _Flow_g1_t2_ og _Flow_g1_end_

Vi ønsker at prosessen skal følge _Flow_g1_t2_ hvis feltet Amount i formdata er større enn eller lik 1000, eller _Flow_g1_end_ hvis det er mindre enn 1000.

For å oppnå dette må vi leg

til betingelsesuttrykkene i de utgående flytene.

```xml {hl_lines=[2,5]}
<bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2">
    <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent">
    <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```
Hvis brukeren har sendt inn en Amount på 1000, vil uttrykkene i sekvensflyten _Flow_g1_end_ evaluere til falsk, og flyten blir fjernet fra de mulige flytene å velge mellom, og den eneste tilgjengelige flyten er _Flow_g1_t2_, og derfor blir den valgt.

For å se flere muligheter med uttrykk, se [Uttrykk](../../../../app/development/logic/expressions/)

### Kontrollere flyten ut av en gateway basert på brukerhandling utført ved hjelp av uttrykk

I tillegg til å bruke uttrykk mot datamodellen er det også mulig å ta beslutninger basert på handlingen utført av brukeren/systemet i oppgaven før gatewayen i et prosessbetingelsesuttrykk.

Hvis en applikasjonsprosess har et bekreftelsessteg der det er mulig å avvise dataene og sende instansen tilbake til forrige steg (Task_1) hvis sluttbrukeren utfører avvisningshandlingen.

```xml
<bpmn:task id="Task_2" name="Person">
    <bpmn:incoming>Flow_t1_t2</bpmn:incoming>
    <bpmn:outgoing>Flow_t2_g1</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>confirmation</altinn:taskType>
            <altinn:actions>
                <altinn:action>confirm</altinn:action>
                <altinn:action>reject</altinn:action>
            </altinn:actions>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
<bpmn:exclusiveGateway id="Gateway_1">
    <bpmn:incoming>Flow_t2_g1</bpmn:incoming>
    <bpmn:incoming>Flow_g1_t1</bpmn:incoming>
    <bpmn:outgoing>Flow_g1_end</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_g1_t1" sourceRef="Gateway_1" targetRef="Task_1" />
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent" />
```

I eksempelet ovenfor er det definert to handlinger i _Task_2_: bekreft og avvis. [Les mer om handlinger](../tasks/)

Det vi ønsker å oppnå

er å få prosessmotoren til å velge _Flow_g1_t1_ hvis brukeren utfører handlingen _avvis_ og _Flow_g1_end_ hvis handlingen som ble utført var _bekreft_...

For å gjøre dette bruker vi uttrykksfunksjonen _gatewayAction_

```xml {hl_lines=[2,5]}
<bpmn:sequenceFlow id="Flow_g1_t1" sourceRef="Gateway_1" targetRef="Task_1">
    <bpmn:conditionExpression>["equals", ["gatewayAction"], "avvis"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent">
    <bpmn:conditionExpression>["lessThan", ["gatewayAction"], "bekreft"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

Uttrykksfunksjonen _gatewayAction_ returnerer handlingen utført i oppgaven som prosessen nettopp forlot. I eksempelet ovenfor er forrige oppgave _Task_2_.

Funksjonen _gatewayAction_ kan kombineres med alle de andre funksjonene i [uttrykk](../../../../app/development/logic/expressions/)

## Komplekse gateways som krever tilpasset kode

Hvis kravene for gatewayen din ikke kan oppfylles gjennom uttrykk, har du muligheten til å skrive tilpasset kode som tar beslutningene for flyten for deg.

### Forutsetninger

* Applikasjonen din bruker versjon 7.1.0 eller nyere av Altinn-pakkene.
* Applikasjon med en prosess som inneholder en eksklusiv gateway.

### Eksempelprosess med eksklusive gateways

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}
```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:altinn="http://altinn.no" id="Altinn_SingleDataTask_Process_Definition" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="10.2.0">
  <bpmn:process id="SingleDataTask" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_s_t1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_s_t1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:task id="Task_1" name="Utfylling" altinn:tasktype="data">
      <bpmn:incoming>Flow_s_t1</bpmn:incoming>
      <bpmn:outgoing>Flow_t1_g1</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_t1_g1" sourceRef="Task_1" targetRef="Gateway_1" />
    <bpmn:exclusiveGateway id="Gateway_1">
      <bpmn:incoming>Flow_t1_g1</bpmn:incoming>
      <bpmn:outgoing>Flow_g1_g2</bpmn:outgoing>
      <bpmn:outgoing>Flow_g1_t2</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_g1_g2" sourceRef="Gateway_1" targetRef="Gateway_2" />
    <bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2" />
    <bpmn:task id="Task_2" name="Bekreftelse" altinn:tasktype="confirmation">
      <bpmn:incoming>Flow_g1_t2</bpmn:incoming>
      <bpmn:outgoing>Flow_t2_g2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_t2_g2" sourceRef="Task_2" targetRef="Gateway_2" />
    <bpmn:exclusiveGateway id="Gateway_2">
      <bpmn:incoming>Flow_g1_g2</bpmn:incoming>
      <bpmn:incoming>Flow_t2_g2</bpmn:incoming>
      <bpmn:outgoing>Flow_g2_end</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_g2_end" sourceRef="Gateway_2" targetRef="EndEvent_1" />
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_g2_end</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
  <!-- BPMN Diagram part is omitted for previty -->
</bpmn:definitions>
```
{{</content-version-container>}}

{{<content-version-container version-label="v8">}}
```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:altinn="http://altinn.no" id="Altinn_SingleDataTask_Process_Definition" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="10.2.0">
  <bpmn:process id="SingleDataTask" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_s_t1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_s_t1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>Flow_s_t1</bpmn:incoming>
      <bpmn:outgoing>Flow_t1_g1</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>data</altinn:taskType>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_t1_g1" sourceRef="Task_1" targetRef="Gateway_1" />
    <bpmn:exclusiveGateway id="Gateway_1">
      <bpmn:incoming>Flow_t1_g1</bpmn:incoming>
      <bpmn:outgoing>Flow_g1_g2</bpmn:outgoing>
      <bpmn:outgoing>Flow_g1_t2</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_g1_g2" sourceRef="Gateway_1" targetRef="Gateway_2" />
    <bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2" />
    <bpmn:task id="Task_2" name="Bekreftelse">
      <bpmn:incoming>Flow_g1_t2</bpmn:incoming>
      <bpmn:outgoing>Flow_t2_g2</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>confirmation</altinn:taskType>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_t2_g2" sourceRef="Task_2" targetRef="Gateway_2" />
    <bpmn:exclusiveGateway id="Gateway_2">
      <bpmn:incoming>Flow_g1_g2</bpmn:incoming>
      <bpmn:incoming>Flow_t2_g2</bpmn:incoming>
      <bpmn:outgoing>Flow_g2_end</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_g2_end" sourceRef="Gateway_2" targetRef="EndEvent_1" />
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_g2_end</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
  <!-- BPMN Diagram part is omitted for previty -->
</bpmn:definitions>
```

{{</content-version-container>}}
{{</content-version-selector>}}

Visuell representasjon av BPMN-definisjonen

![BPMN definisjonsdiagram](process-definition.svg "BPMN definisjonsdiagram")

### Implementering og injisering av tilpasset gateway-kode

For å velge riktig sekvensflyt ut av den eksklusive gatewayen basert på instansdata, må applikasjonen opprette en klasse som implementerer `Altinn.App.Core.Features.IProcessExclusiveGateway` og registrere den som en tjeneste i avhengighetsinjeksjonen.

Grensesnittet har en strengegenskap `GatewayId` og en metode `FilterAsync`.

`GatewayId` brukes til å identifisere gatewayen i prosessdefinisjonen den er tilknyttet.

I vårt eksempel har en implementering for den første gatewayen (Gateway_1) denne egenskapen satt til `Gateway_1`, da dette er verdien for attributtet `id` for den eksklusive gatewayen i prosessdefinisjonen.

Metoden `FilterAsync` er der du implementerer din tilpassede logikk for å filtrere de tilgjengelige sekvensflytene ut av gatewayen basert på instansdataene.

For ytterligere dokumentasjon av grensesnittet, les XML-dokumentasjonen for grensesnittet [her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessExclusiveGateway.cs).

Etter at du har skrevet din tilpassede implementering, registrerer du den i `Program.cs` i `RegisterCustomAppServices`-metoden.

Eksempel:

```csharp
void RegisterCustomAppServices(
    IServiceCollection services, 
    IConfiguration config, 
    IWebHostEnvironment env)
{
    services.AddTransient<IProcessExclusiveGateway, GatewayOne>();
}
```