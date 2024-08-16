---
hidden: true
---

> This is a description of how to set up a payment task in the app process. This involves several manual steps in multiple
> configuration files.
> If you use Altinn Studio Designer to add the payment task to the process, all the manual configuration outlined below
> will be set up automatically. 

### Create two data types to store payment information:

This data type is used to store information and status about the payment. Put it in the `dataTypes` array in `App/config/applicationmetadata.json`.

```json
{
    "id": "paymentInformation",
    "allowedContentTypes": [
        "application/json"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

This data type is used to store the PDF-receipt for the payment. Configure it next to the other data type.

```json
{
    "id": "paymentReceiptPdf",
    "allowedContentTypes": [
        "application/pdf"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

 The IDs can be set to something else, but they must match the IDs entered in `paymentDataType` and `paymentReceiptPdfDataType` in the process step, as shown in step 2.

### Extend the app process with payment task:

A process step and a gateway must be added to `App/config/process/process.bpmn`, as in the example below.

Payment uses three user actions. If the Altinn user interface is used by the app, these will be called automatically when you are in the payment step. If only the API is used, these must be called manually via the `/actions` endpoint.
- `pay`: Initiates the payment, often by making API calls to the payment processor. Information and status about the initiated payment is stored in a JSON data type specified in the payment process step.
- `confirm`: Called when payment has been completed to drive the process to the next step.
- `reject`: If the end user sees something wrong with the order, the person concerned can press "Back" in the payment step. The payment is then canceled and information about the interrupted payment is deleted. Which process step you are then directed to is specified in a gateway, as exemplified below.

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
The value of this node: `<altinn:paymentDataType>paymentInformation</altinn:paymentDataType>` must match the ID of the data type you configured in the previous step. Same for the pdf-receipt data type.

### Add Payment layoutSet

Add a new layoutSet folder for your payment task, and update your layout-sets.json.

Your layout-sets.json may look something like this:

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

In your payment layoutSet folder, add a new file, payment.json, with the following layout:

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

This is required for payment to work, without it, your payment step will just render a white page.