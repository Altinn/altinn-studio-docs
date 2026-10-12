---
draft: true
title: "ALTINNAPP1010: den eksklusive gatewayen blander flyter med og uten betingelse"
description: "Noen av sekvensflytene en eksklusiv gateway lister, har en betingelse, og andre har det ikke"
weight: 110
---

Denne diagnostikken meldes når noen av sekvensflytene en eksklusiv gateway lister i
`<bpmn:outgoing>`, har en `<bpmn:conditionExpression>`, og andre ikke har det. Meldingen navngir
gatewayen og flytene uten betingelse.

Når en av flytene har en betingelse, sjekker appen betingelsene på alle flytene. En flyt uten
betingelse regner appen alltid som sann, og appen feiler hvis ikke nøyaktig én flyt er sann. Er
det én flyt uten betingelse, feiler appen når en instans forlater gatewayen og en av betingelsene
er oppfylt. Er det to eller flere, er de alltid sanne samtidig, og appen feiler hver gang. Det
hjelper ikke å gjøre flyten uten betingelse til `default` for gatewayen. Regelen kontrollerer
bare gatewayer en instans kan nå fra en starthendelse.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi alle flytene som gatewayen lister, en betingelse, slik at nøyaktig én av dem er oppfylt:

```xml
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["greaterThanEq", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["lessThan", ["dataModel", "Amount"], 1000]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

Se [hvordan du styrer flyten ut av en gateway med uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
