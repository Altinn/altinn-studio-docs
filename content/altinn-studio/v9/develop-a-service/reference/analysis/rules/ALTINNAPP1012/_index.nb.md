---
draft: true
title: "ALTINNAPP1012: den eksklusive gatewayen lister en flyt med tom betingelse"
description: "En sekvensflyt som en eksklusiv gateway lister, har en tom betingelse"
weight: 112
---

Denne diagnostikken meldes når en eksklusiv gateway lister en sekvensflyt i `<bpmn:outgoing>` der
`<bpmn:conditionExpression>` er tom eller bare inneholder mellomrom. Meldingen navngir gatewayen
og flyten. En tom betingelse på standardflyten til gatewayen melder ALTINNAPP1023 i stedet.

Appen sjekker betingelsene på alle flytene gatewayen lister, unntatt standardflyten, og feiler på
en tom betingelse. Appen feiler derfor hver gang en instans forlater gatewayen, uansett hvilke data
instansen har. Regelen kontrollerer bare gatewayer en instans kan nå.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi flyten en betingelse, eller fjern den tomme `<bpmn:conditionExpression>`:

```xml
<!-- Feiler: betingelsen er tom -->
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression />
</bpmn:sequenceFlow>

<!-- Fungerer -->
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

Har de andre flytene fra gatewayen betingelser, blander gatewayen flyter med og uten betingelse
når du fjerner elementet. Det melder ALTINNAPP1010. Har gatewayen ingen standardflyt, kan du i
tillegg gjøre flyten til standardflyten.

Se [hvordan du styrer flyten ut av en gateway med uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
