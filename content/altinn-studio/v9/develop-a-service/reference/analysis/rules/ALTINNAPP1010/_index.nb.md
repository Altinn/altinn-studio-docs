---
title: "ALTINNAPP1010: gatewayen blander sekvensflyter med og uten betingelse"
description: "En eksklusiv gateway har betingelse på noen sekvensflyter, men ikke på alle de andre enn standardflyten"
weight: 110
---

Denne diagnostikken melder fra når en eksklusiv gateway i `config/process/process.bpmn` har
`<bpmn:conditionExpression>` på noen av sekvensflytene den lister utenom standardflyten, men
ikke på alle. Meldingen navngir gatewayen og sekvensflytene uten betingelse.

Så snart én sekvensflyt har en betingelse, vurderer appen betingelsene på alle sekvensflytene
gatewayen lister, unntatt standardflyten. En sekvensflyt uten betingelse regner appen som sann,
og appen feiler når mer enn én sekvensflyt er sann. Med én sekvensflyt uten betingelse feiler
gatewayen hver gang en annen betingelse er sann. Med to eller flere feiler den alltid.
Standardflyten tar appen bare når ingen annen betingelse er sann, så den er den eneste som kan
stå uten betingelse.

Appen sjekker det samme når den starter, og starter ikke med en slik gateway. Regelen sjekker
derfor alle gatewayer, også dem ingen instans kan nå.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi hver sekvensflyt utenom standardflyten en betingelse. Har gatewayen ingen standardflyt, og
mangler bare én sekvensflyt betingelse, kan du i stedet gjøre den til standardflyten med
`default` på gatewayen:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:exclusiveGateway id="Gateway_1" default="Flow_3">
  <bpmn:incoming>Flow_1</bpmn:incoming>
  <bpmn:outgoing>Flow_2</bpmn:outgoing>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_2" sourceRef="Gateway_1" targetRef="Task_2">
  <bpmn:conditionExpression>["equals", ["dataModel", "approved"], true]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
