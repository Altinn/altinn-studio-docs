---
draft: true
title: Flytkontroll
description: Kontroller prosessflyt
tags: [altinn-apps, process, bpmn, gateway]
toc: true
---

## Eksklusive gateways

Eksklusive gateways lar deg velge en annen vei i prosessen basert på direkte brukerinndata, data eller andre aspekter tilgjengelig fra koden.

## Gateways som kontrollerer flyten med uttrykk

### Forutsetninger

* Applikasjonen din bruker versjon 8.0.0 eller nyere av Altinn-pakkene.
* Applikasjon med en prosess som inneholder en eksklusiv gateway.

### Kontrollere flyten ut av en gateway basert på data levert av brukeren ved hjelp av uttrykk

Du kan kontrollere hvilken flyt som velges ut av en gateway basert på data som brukeren leverte i en tidligere oppgave. Du bruker samme uttrykkspråk som du bruker til å skjule/vise elementer i brukergrensesnittet.

For å oppnå dette må du først definere hvilke formdata som skal leveres som kontekst til uttrykket.

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
I eksempelet ovenfor legger gatewayen til formdata som er lagret i datatype _Schema_ som kontekst til uttrykkene. Du definerer formdata og datatyper i filen _applicationmetadata.json_.

Når gatewayen er koblet til en datatype, kan du bruke uttrykkspråket for å definere om flytene ut av gatewayen er tilgjengelige.

MERK: Bare én flyt må være tilgjengelig etter filtrering av flyter, med mindre det er en standardflyt som er en del av de mulige flytene ut av gatewayen.

Nå må du definere disse uttrykkene i de utgående flytene fra gatewayen. I gateway-eksempelet har vi to utgående flyter: _Flow_g1_t2_ og _Flow_g1_end_

Prosessen skal følge _Flow_g1_t2_ hvis feltet Amount i formdata er større enn eller lik 1000, eller _Flow_g1_end_ hvis det er mindre enn 1000.

For å oppnå dette må du legge til betingelsesuttrykk (conditionExpressions) til de utgående flytene.

```xml {hl_lines=[2,5]}
<bpmn:sequenceFlow id="Flow_g1_t2" sourceRef="Gateway_1" targetRef="Task_2">
    <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent">
    <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```
Hvis brukeren har sendt inn en Amount på 1000, evaluerer uttrykkene i sekvensflyten _Flow_g1_end_ til falsk. Systemet fjerner da flyten fra de mulige flytene å velge mellom. Den eneste tilgjengelige flyten er _Flow_g1_t2_, og derfor velger systemet den.

For å se flere muligheter med uttrykk, se [Uttrykk](/nb/altinn-studio/v8/reference/logic/expressions/)

### Kontrollere flyten ut av en gateway basert på brukerhandling utført ved hjelp av uttrykk

I tillegg til å bruke uttrykk mot datamodellen kan du også ta beslutninger basert på handlingen som brukeren/systemet utførte i oppgaven før gatewayen i et prosessbetingelsesuttrykk.

Hvis en applikasjonsprosess har et bekreftelsessteg kan du avvise dataene og sende instansen tilbake til forrige steg (Task_1) hvis sluttbrukeren utfører avvisningshandlingen.

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

I eksempelet ovenfor er det definert to handlinger i _Task_2_: `confirm` og `reject`. [Les mer om handlinger](/nb/altinn-studio/v8/reference/process/tasks/)

Prosessmotoren skal velge _Flow_g1_t1_ hvis brukeren utfører handlingen _reject_ og _Flow_g1_end_ hvis handlingen var _confirm_.

For å gjøre dette bruker du uttrykksfunksjonen _gatewayAction_

```xml {hl_lines=[2,5]}
<bpmn:sequenceFlow id="Flow_g1_t1" sourceRef="Gateway_1" targetRef="Task_1">
    <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent">
    <bpmn:conditionExpression>["equals", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

Uttrykksfunksjonen _gatewayAction_ returnerer handlingen som ble utført i oppgaven som prosessen nettopp forlot. I eksempelet ovenfor er forrige oppgave _Task_2_.

Du kan kombinere funksjonen _gatewayAction_ med alle de andre funksjonene i [uttrykk](/nb/altinn-studio/v8/reference/logic/expressions/)

## Komplekse gateways som krever tilpasset kode

Hvis du ikke kan oppfylle kravene for gatewayen din gjennom uttrykk, kan du skrive tilpasset kode som tar beslutningene for flyten.

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
  <!-- BPMN Diagram part is omitted for brevity -->
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
  <!-- BPMN Diagram part is omitted for brevity -->
</bpmn:definitions>
```

{{</content-version-container>}}
{{</content-version-selector>}}

Visuell representasjon av BPMN-definisjonen

![BPMN definisjonsdiagram](process-definition.svg "BPMN definisjonsdiagram")

### Implementering og injisering av tilpasset gateway-kode

For å velge riktig sekvensflyt ut av den eksklusive gatewayen basert på instansdata, må du opprette en klasse som implementerer `Altinn.App.Core.Features.IProcessExclusiveGateway` og registrere den som en tjeneste i avhengighetsinjeksjonen.

Grensesnittet har en strengegenskap `GatewayId` og en metode `FilterAsync`.

Du bruker `GatewayId` til å identifisere gatewayen i prosessdefinisjonen den er tilknyttet.

I vårt eksempel har en implementering for den første gatewayen (Gateway_1) denne egenskapen satt til `Gateway_1`, da dette er verdien for attributtet `id` for den eksklusive gatewayen i prosessdefinisjonen.

I metoden `FilterAsync` implementerer du din tilpassede logikk for å filtrere de tilgjengelige sekvensflytene ut av gatewayen basert på instansdataene.

Les mer om grensesnittet i XML-dokumentasjonen

https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessExclusiveGateway.cs

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
