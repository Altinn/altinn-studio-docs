---
draft: true
title: "ALTINNAPP1005: den eksklusive gatewayen lister andre sekvensflyter enn dem som starter i den"
description: "Sekvensflytene en eksklusiv gateway lister, er ikke de samme som flytene som starter i gatewayen"
weight: 105
---

Denne diagnostikken meldes når sekvensflytene en eksklusiv gateway lister i `<bpmn:outgoing>`,
ikke er de samme som sekvensflytene som har gatewayen som `sourceRef`. Meldingen navngir
gatewayen og flyten, og sier hvilket av disse tilfellene det gjelder:

- gatewayen lister en flyt som starter i et annet element eller ikke har noen `sourceRef`
- en flyt starter i gatewayen, men gatewayen lister den ikke

Appen forlater en gateway bare langs flytene gatewayen lister, uansett hva `sourceRef` er. I det
første tilfellet kan en instans forlate gatewayen langs en flyt som starter et annet sted i
diagrammet. I det andre tilfellet viser diagrammet flyten som en av grenene ut fra gatewayen, men
appen tar den aldri. En id i `<bpmn:outgoing>` som ikke peker på noen sekvensflyt, melder regelen
ikke, siden appen ser bort fra den. Regelen kontrollerer bare gatewayer en instans kan nå fra en
starthendelse.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

List nøyaktig de flytene som starter i gatewayen, og ingen andre:

```xml
<bpmn:exclusiveGateway id="Gateway_1">
  <bpmn:incoming>Flow_2</bpmn:incoming>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
  <bpmn:outgoing>Flow_4</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2" />
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```
