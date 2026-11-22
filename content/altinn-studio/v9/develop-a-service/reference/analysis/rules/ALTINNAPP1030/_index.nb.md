---
title: "ALTINNAPP1030: gatewayen leser gatewayAction rett etter en systemoppgave uten handling"
description: "En eksklusiv gateway rett etter en pdf-, subformPdf- eller eFormidling-oppgave har en betingelse som leser gatewayAction"
weight: 130
---

Denne diagnostikken melder fra når en eksklusiv gateway i `config/process/process.bpmn` kommer
rett etter en systemoppgave av typen `pdf`, `subformPdf` eller `eFormidling`, og en betingelse
på en sekvensflyt gatewayen lister i `<bpmn:outgoing>`, leser `["gatewayAction"]`. Meldingen
navngir gatewayen, sekvensflytene, systemoppgaven og oppgavetypen.

En gateway etter en systemoppgave får handlingen systemoppgaven returnerer, ikke handlingen
brukeren gjorde i oppgaven før. Disse tre systemoppgavene returnerer aldri noen handling, så
`["gatewayAction"]` er alltid `null` der. Den er heller aldri `reject`, fordi en systemoppgave
som feiler, bare kan kjøres på nytt. Gatewayen kan derfor ikke velge vei ut fra handlingen.

Regelen sjekker bare gatewayen rett etter systemoppgaven, og bare systemoppgaver en instans kan
nå. Betingelsen på standardflyten teller ikke, fordi appen aldri vurderer den. `fiksArkiv` og
appens egne systemoppgaver kan returnere en handling, så regelen melder ikke fra om dem.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Du retter feilen på en av to måter:

- Flytt systemoppgaven til etter gatewayen, inn på grenen som trenger den.
- Fjern gatewayen hvis den bare sendte brukeren tilbake når systemoppgaven feilet.

I eksempelet under leser gatewayen handlingen fra bekreftelsesoppgaven, og PDF-oppgaven ligger
på grenen der brukeren har bekreftet. Eksempelet viser bare sekvensflytene. Husk å oppdatere
`<bpmn:incoming>` og `<bpmn:outgoing>` på elementene også.

Feil:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:sequenceFlow id="Flow_1" sourceRef="Task_Confirm" targetRef="Task_Pdf" />
<bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Pdf" targetRef="Gateway_1" />
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="EndEvent_1">
  <bpmn:conditionExpression>["equals", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="Task_Data">
  <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

Riktig:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:sequenceFlow id="Flow_1" sourceRef="Task_Confirm" targetRef="Gateway_1" />
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_Pdf">
  <bpmn:conditionExpression>["equals", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="Task_Data">
  <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Pdf" targetRef="EndEvent_1" />
```

Se [hvordan du styrer flyten ut av en gateway med brukerhandlingen]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}#slik-styrer-du-flyten-ut-av-en-gateway-med-brukerhandlingen).
