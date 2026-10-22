---
draft: true
title: "ALTINNAPP1010: den eksklusive gatewayen blander flyter med og uten betingelse"
description: "Noen av sekvensflytene en eksklusiv gateway lister, har en betingelse, og andre enn standardflyten har det ikke"
weight: 110
---

Denne diagnostikken meldes når noen av sekvensflytene en eksklusiv gateway lister i
`<bpmn:outgoing>`, har en `<bpmn:conditionExpression>`, og andre ikke har det. Flyten gatewayen
peker på i attributtet `default`, trenger ingen betingelse, så regelen ser bort fra den. Meldingen
navngir gatewayen og de andre flytene uten betingelse.

Når en av flytene har en betingelse, sjekker appen betingelsene på alle flytene unntatt
standardflyten, og velger standardflyten bare når ingen av dem er oppfylt. En flyt uten
betingelse regner appen alltid som sann, og appen feiler hvis mer enn én flyt er sann. Er det én
slik flyt, feiler appen når en instans forlater gatewayen og en av betingelsene er oppfylt, og
gatewayen velger aldri en eventuell standardflyt. Er det to eller flere, er de alltid sanne samtidig, og
appen feiler hver gang. Regelen kontrollerer bare gatewayer en instans kan nå fra en
starthendelse, men appen starter ikke hvis noen gateway i prosessen blander flyter på denne måten.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi hver av disse flytene en betingelse. Har gatewayen en standardflyt, velger den standardflyten
når ingen av betingelsene er oppfylt. Ellers må nøyaktig én av dem være oppfylt:

```xml
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

Er det bare én flyt uten betingelse og ingen standardflyt, kan du i stedet gjøre flyten til
standardflyten for gatewayen:

```xml
<bpmn:exclusiveGateway id="Gateway_1" default="Flow_4">
  <bpmn:incoming>Flow_2</bpmn:incoming>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
  <bpmn:outgoing>Flow_4</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```

Se [hvordan du styrer flyten ut av en gateway med uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
