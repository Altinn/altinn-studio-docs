---
title: "ALTINNAPP1005: listen over utgående sekvensflyter på gatewayen stemmer ikke"
description: "En eksklusiv gateway lister ikke en sekvensflyt som starter i den, eller lister en som starter et annet sted"
weight: 105
---

Denne diagnostikken melder fra når `<bpmn:outgoing>` på en eksklusiv gateway i
`config/process/process.bpmn` ikke stemmer med sekvensflytene som starter i gatewayen. Det
gjelder når

- gatewayen er `sourceRef` for en sekvensflyt, men ikke lister den i `<bpmn:outgoing>`
- gatewayen lister en sekvensflyt som starter et annet sted, eller som ikke har noen `sourceRef`

Meldingen navngir gatewayen og sekvensflyten.

Appen forlater en gateway bare gjennom sekvensflytene gatewayen lister i `<bpmn:outgoing>`,
uansett hva `sourceRef` på sekvensflyten sier. En sekvensflyt gatewayen ikke lister, tar appen
aldri, selv om prosessdiagrammet viser den som en vei ut av gatewayen. Regelen sjekker bare
gatewayer en instans kan nå.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

List nøyaktig de sekvensflytene som starter i gatewayen, i `<bpmn:outgoing>`:

{{< code-title >}}
App/config/process/process.bpmn
{{< /code-title >}}

```xml
<bpmn:exclusiveGateway id="Gateway_1">
  <bpmn:incoming>Flow_1</bpmn:incoming>
  <bpmn:outgoing>Flow_2</bpmn:outgoing>
  <bpmn:outgoing>Flow_3</bpmn:outgoing>
</bpmn:exclusiveGateway>
<bpmn:sequenceFlow id="Flow_2" sourceRef="Gateway_1" targetRef="Task_2" />
<bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="EndEvent_1" />
```

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
