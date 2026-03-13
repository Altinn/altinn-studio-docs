---
draft: true
hidden: true
tags: [needsReview, needsTranslation]
---

> Her beskrives hvordan du setter opp en betalingsoppgave i prosessen. Dette involverer flere steg i flere konfigurasjonsfiler.
> Hvis du bruker Altinn Studio Designer, setter systemet opp all denne konfigurasjonen automatisk når du legger til betalingsoppgaven i prosessen.

### Opprette to datatyper for å lagre betalingsinformasjon

Betalingssteget bruker den første datatypen for å lagre informasjon og status om betalingen. Legg den i `dataTypes`-arrayen i `App/config/applicationmetadata.json`. 

```json
{
    "id": "paymentInformation",
    "allowedContentTypes": [
      "application/json"
    ],
    "allowedContributors": [
      "app:owned"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

Systemet bruker den andre datatypen for å lagre PDF-kvittering for betalingen. Legg den inn på samme sted.

```json
{
    "id": "paymentReceiptPdf",
    "allowedContentTypes": [
        "application/pdf"
    ],
    "allowedContributors": [
      "app:owned"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

Det er viktig å sette `allowedContributors` til `"app:owned"`. Det gjør at du ikke kan redigere disse dataene via appens API, men bare via appen selv. Før versjon 8.6 var denne konfigurasjonen feilstavet `allowedContributers`.

ID-ene kan settes til noe annet, men de må være de samme som ID-ene du legger inn i `paymentDataType` og `paymentReceiptPdfDataType` i prosessteget, som vist i punktet under.

### Utvide app-prosessen med payment task

Du må legge til et prosessteg og en gateway i `App/config/process/process.bpmn`, som i eksemplet nedenfor.

Betaling bruker tre user actions. Hvis appen bruker Altinn-brukergrensesnittet, kaller systemet disse automatisk når du står i betalingssteget. Hvis du bare bruker API-et, må du kalle disse manuelt via `/actions`-endepunktet.
- `pay`: Setter i gang betalingen, ofte ved å gjøre API-kall til betalingsbehandler. Systemet lagrer informasjon og status om den igangsatte betalingen i en JSON-datatype som du angir i prosesssteget for betaling.
- `confirm`: Du kaller denne når betalingen er ferdig gjennomført, for å drive prosessen videre til neste steg.
- `reject`: Hvis sluttbrukeren ser noe feil med ordren, kan vedkommende trykke **Tilbake** i betalingssteget. Da kansellerer systemet betalingen og sletter informasjon om den avbrutte betalingen. En gateway angir hvilket prosessteg du deretter går til, som eksemplifisert nedenfor.

```xml
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_start_t1</bpmn:outgoing>
    </bpmn:startEvent>

    <bpmn:sequenceFlow id="Flow_start_t1" sourceRef="StartEvent_1" targetRef="Task_1" />

    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>Flow_start_t1</bpmn:incoming>
      <bpmn:incoming>Flow_g1_t1</bpmn:incoming>
      <bpmn:outgoing>Flow_t1_t2</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>

    <bpmn:sequenceFlow id="Flow_t1_t2" sourceRef="Task_1" targetRef="Task_2" />

    <bpmn:task id="Task_2" name="Betaling">
      <bpmn:incoming>Flow_t1_t2</bpmn:incoming>
      <bpmn:outgoing>Flow_t2_g1</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>payment</altinn:taskType>
          <altinn:actions>
            <altinn:action>confirm</altinn:action>
            <altinn:action>pay</altinn:action>
            <altinn:action>reject</altinn:action>
          </altinn:actions>
          <altinn:paymentConfig>
            <altinn:paymentDataType>paymentInformation</altinn:paymentDataType>
            <altinn:paymentReceiptPdfDataType>paymentReceiptPdf</altinn:paymentReceiptPdfDataType>
          </altinn:paymentConfig>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>

    <bpmn:sequenceFlow id="Flow_t2_g1" sourceRef="Task_2" targetRef="Gateway_1" />

    <bpmn:exclusiveGateway id="Gateway_1">
      <bpmn:incoming>Flow_t2_g1</bpmn:incoming>
      <bpmn:outgoing>Flow_g1_t1</bpmn:outgoing>
      <bpmn:outgoing>Flow_g1_end</bpmn:outgoing>
    </bpmn:exclusiveGateway>

    <bpmn:sequenceFlow id="Flow_g1_t1" sourceRef="Gateway_1" targetRef="Task_1">
      <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent_1">
      <bpmn:conditionExpression>["equals", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>

    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_g1_end</bpmn:incoming>
    </bpmn:endEvent>
```
NB: Verdien til noden `<altinn:paymentDataType>paymentInformation</altinn:paymentDataType>` må være den samme som ID-en til datatypen du konfigurerte i forrige steg. Det samme gjelder datatypen for PDF-kvittering.

### Legge til sidegruppe for betaling

- Legg til en ny mappe under `App/ui` for betalingsoppgaven din. Kall den for eksempel "payment".
- Oppdater filen `App/ui/layout-sets.json` med en ny sidegruppe som har samme `id` som mappen du nettopp opprettet.
  Din oppdaterte `layout-sets.json` kan se slik ut:

  ```json
  {
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout-sets.schema.v1.json",
    "sets": [
      {
        "id": "form",
        "dataType": "model",
        "tasks": [
          "Task_1"
        ]
      },
      {
        "id": "payment",
        "dataType": "model",
        "tasks": [
          "Task_2"
        ]
      }
    ]
  }
  ``` 

- I din payment layoutSet-mappe legger du til en ny fil, `payment.json`, med følgende layout:

  ```json
  {
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
    "data": {
      "layout": [
        {
          "id": "payment-test-component",
          "type": "Payment",
          "textResourceBindings": {
            "title": "Oppsummering"
          }
        }
      ]
    }
  }
  ```

  Dette er nødvendig for at betaling skal fungere. Uten dette viser betalingssteget ditt bare en hvit side.
