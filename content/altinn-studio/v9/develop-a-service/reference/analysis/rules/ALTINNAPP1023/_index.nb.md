---
draft: true
title: "ALTINNAPP1023: standardflyten til den eksklusive gatewayen har en betingelse"
description: "Standardflyten til en eksklusiv gateway har en betingelse, som appen aldri sjekker"
weight: 123
---

Denne diagnostikken meldes når sekvensflyten som en eksklusiv gateway peker på i attributtet
`default`, har en `<bpmn:conditionExpression>`, også når den er tom. Meldingen navngir gatewayen
og flyten.

Gatewayen velger standardflyten bare når ingen av betingelsene på de andre flytene er oppfylt, og
den sjekker aldri betingelsen på selve standardflyten. Betingelsen avgjør derfor ingenting, selv
om den ser ut til å virke i en test, og appen starter ikke med den. Regelen kontrollerer bare
gatewayer en instans kan nå fra en starthendelse, men appen starter ikke med en slik betingelse
på noen gateway.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Fjern betingelsen fra standardflyten:

```xml
<bpmn:exclusiveGateway id="Gateway_1" default="Flow_4">
  <bpmn:incoming>Flow_2</bpmn:incoming>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
  <bpmn:outgoing>Flow_4</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>

<!-- Feiler: standardflyten har en betingelse -->
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>

<!-- Fungerer -->
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```

Trenger du betingelsen, fjerner du heller `default` fra gatewayen. Da sjekker appen betingelsen
på samme måte som betingelsene på de andre flytene. Nøyaktig én av betingelsene må da være
oppfylt, ellers feiler appen når en instans forlater gatewayen.

Se [hvordan du styrer flyten ut av en gateway med uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
