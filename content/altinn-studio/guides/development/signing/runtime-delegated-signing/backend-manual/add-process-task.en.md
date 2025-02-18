---
hidden: true
---

These data types should be added to `dataTypes` in `App/config/applicationmetadata.json`.

The first data type is used by the signing stage to store the actual signatures generated when a user completes the signing action.

```json
{
    "id": "signatures",
    "allowedContentTypes": [
        "application/json"
    ],
    "allowedContributers": [
        "app:owned"
    ]
}
```

This data type is used to store information about the signers who should be delegated signing rights and their status.

```json
{
    "id": "signeeState",
    "allowedContentTypes": [
        "application/pdf"
    ],
    "allowedContributers": [
        "app:owned"
    ],
    "maxCount": 1,
    "minCount": 0
}
```

It is important to set `allowedContributers` to `"app:owned"`. This ensures that these data items cannot be edited via the app’s API but only by the app itself.

The IDs of the data types can be changed, but they must match the IDs set in `signatureDataType` and `signeeStatesDataTypeId` in the process step, as shown in the next section.

---

## Extend the Application Process with a Signing Task

A process step must be added to `App/config/process/process.bpmn`, as shown in the example below. Pay special attention to the `<altinn:signatureConfig>` section.

Signing uses two user actions. If the Altinn user interface is used by the application, these actions will be triggered by button clicks in the signing stage. If only the API is used, they must be triggered manually via the `/actions` endpoint or the process next function.
- **`sign`**: The actual signing action.
- **`reject`**: If the signing step should be cancellable, a gateway must also be added to control where the process should continue. See the example below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:altinn="http://altinn.no/process" 
xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
id="Altinn_SingleDataTask_Process_Definition" targetNamespace="http://bpmn.io/schema/bpmn">

  <bpmn:process id="SingleDataTask" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>SequenceFlow_1n56yn5</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
        </altinn:taskExtension>
      </bpmn:extensionElements>
      <bpmn:incoming>SequenceFlow_1n56yn5</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_0wscak8</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1oot28q</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="SigningTask" name="Signering">
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>signing</altinn:taskType>
          <altinn:actions>
            <altinn:action>sign</altinn:action>
            <altinn:action>reject</altinn:action>
          </altinn:actions>
          <altinn:signatureConfig>
            <!-- The actual data that should be signed. Can be attachments, the form data in xml or PDF from earlier step. -->
            <altinn:dataTypesToSign>
              <altinn:dataType>ref-data-as-pdf</altinn:dataType>
            </altinn:dataTypesToSign>

            <!-- This data type is used to store the signatures -->
            <altinn:signatureDataType>signatures</altinn:signatureDataType>

            <!-- This data type is used to store the signees and related information -->
            <altinn:signeeStatesDataTypeId>signeesState</altinn:signeeStatesDataTypeId>

            <!-- This ID tells the app which implementation of the C# interface ISigneeProvider that should be used for this singing step -->
            <altinn:signeeProviderId>signees</altinn:signeeProviderId>

            <!-- If you want a PDF summary of the singing step, enter a datatype of type application/pdf here -->
            <altinn:signingPdfDataType>signing-step-pdf</altinn:signingPdfDataType> <!-- optional -->

            <!-- If the signee should receive a receipt with the documents that were signed in their Altinn inbox, enter a correspondence resource her. Setup of this is documented separately. -->
            <altinn:correspondenceResource>app-correspondence-resource</altinn:correspondenceResource> <!-- optional -->

          </altinn:signatureConfig>
        </altinn:taskExtension>
      </bpmn:extensionElements>
      <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>SequenceFlow_0rmsrs6</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_1n56yn5" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:sequenceFlow id="SequenceFlow_1oot28q" sourceRef="Task_1" targetRef="SigningTask" />
    <bpmn:sequenceFlow id="SequenceFlow_1if1sh9" sourceRef="SigningTask" targetRef="Gateway_SingingTask_Reject" />
    <bpmn:exclusiveGateway id="Gateway_SingingTask_Reject">
      <bpmn:incoming>SequenceFlow_1if1sh9</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0wscak8</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0rmsrs6</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_0wscak8" sourceRef="Gateway_SingingTask_Reject" targetRef="Task_1">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">["equals",["gatewayAction"],"reject"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="SequenceFlow_0rmsrs6" sourceRef="Gateway_SingingTask_Reject" targetRef="EndEvent_1">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">["notEquals",["gatewayAction"],"reject"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="SingleDataTask">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="156" y="81" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="300" y="59" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="SingingTask_di" bpmnElement="SingingTask">
        <dc:Bounds x="550" y="59" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="962" y="81" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Founders_Reject_di" bpmnElement="Gateway_SingingTask_Reject" isMarkerVisible="true">
        <dc:Bounds x="785" y="74" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1n56yn5_di" bpmnElement="SequenceFlow_1n56yn5">
        <di:waypoint x="192" y="99" />
        <di:waypoint x="300" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1oot28q_di" bpmnElement="SequenceFlow_1oot28q">
        <di:waypoint x="400" y="99" />
        <di:waypoint x="550" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1if1sh9_di" bpmnElement="SequenceFlow_1if1sh9">
        <di:waypoint x="650" y="99" />
        <di:waypoint x="785" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0wscak8_di" bpmnElement="SequenceFlow_0wscak8">
        <di:waypoint x="810" y="124" />
        <di:waypoint x="810" y="190" />
        <di:waypoint x="350" y="190" />
        <di:waypoint x="350" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0rmsrs6_di" bpmnElement="SequenceFlow_0rmsrs6">
        <di:waypoint x="835" y="99" />
        <di:waypoint x="962" y="99" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
```
