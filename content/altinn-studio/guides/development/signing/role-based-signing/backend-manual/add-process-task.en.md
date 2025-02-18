---
hidden: true
---

These data types should be added in the `dataTypes` array in `App/config/applicationmetadata.json`.

This data type is used to store the actual signatures that are generated when a user performs the sign action. 

```json
{
    "id": "signatures",
    "allowedContentTypes": [
        "application/json"
    ]
}
```

 The IDs can be set to something else, but they must match the IDs entered in `signatureDataType` in the process step, as shown in the process task step.

### Extend the app process with signing task:

A process step and a gateway must be added to `App/config/process/process.bpmn`, as in the example below.

Signing normaly uses two user actions. If the Altinn user interface is used by the app, these will be called by button pressen in the signing step. If only the API is used, these must be called manually via the `/actions` endpoint or via process next.
- `sign`: The actual act of singing the data. Performed by the signees.
- `reject`: If the end user sees something wrong with the singing step, the person concerned can press abort in the signing step. All signatures and the signee state is deleted, and runtime delegated access rights are revoked. Which process step the user is taken to after this is specified in a gateway, as exemplified below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:altinn="http://altinn.no/process" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Altinn_SingleDataTask_Process_Definition" targetNamespace="http://bpmn.io/schema/bpmn">
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
            <altinn:dataTypesToSign>
              <altinn:dataType>ref-data-as-pdf</altinn:dataType>
            </altinn:dataTypesToSign>
            <altinn:signatureDataType>signatures</altinn:signatureDataType>
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
    <bpmn:sequenceFlow id="SequenceFlow_1if1sh9" sourceRef="SigningTask" targetRef="Gateway_SigningTask_Founders_Reject" />
    <bpmn:exclusiveGateway id="Gateway_SigningTask_Founders_Reject">
      <bpmn:incoming>SequenceFlow_1if1sh9</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0wscak8</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0rmsrs6</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_0wscak8" sourceRef="Gateway_SigningTask_Founders_Reject" targetRef="Task_1">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">["equals",["gatewayAction"],"reject"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="SequenceFlow_0rmsrs6" sourceRef="Gateway_SigningTask_Founders_Reject" targetRef="EndEvent_1">
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
      <bpmndi:BPMNShape id="SigningTask_Founders_di" bpmnElement="SigningTask_Founders">
        <dc:Bounds x="550" y="59" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="962" y="81" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Founders_Reject_di" bpmnElement="Gateway_SigningTask_Founders_Reject" isMarkerVisible="true">
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
The value of the node `<altinn:signatureDataType>signatures</altinn:signatureDataType>` must match the ID of the data type you configured in the previous step.