
---
hidden: true
---

Disse datatypene legger til i `dataTypes` i `App/config/applicationmetadata.json`.

Den første datatypen benyttes av signeringssteget til å lagre de faktiske signaturene som genereres når brukeren utfører signeringshandlingen.

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

Denne datatypen benyttes for å lagre informasjon om signatarene som skal få deligert rettigheter til å signere og dere status.

```json
{
    "id": "signeeState",
    "allowedContentTypes": [
        "application/pdf"
    ],
    "allowedContributers": [
        "app:owned"
      ]
    "maxCount": 1,
    "minCount": 0,
}
```

Det er viktig å sette allowedContributers til ```"app:owned"```. Det gjør at disse dataene ikke kan redigeres via appens API, men kun av appen selv.

Datatpenes ID-er kan settes til noe annet, men det må matche ID-ene som legges inn i `signatureDataType` og `signeeStatesDataTypeId` i prossessteget, som vist i punktet under.

### Utvid app prossesen med signing task:

Det må legges til et prosessteg `App/config/process/process.bpmn`, som i eksemplet nedenfor. 
Se spesielt på ```<altinn:signatureConfig>```.

Signering benytter to user actions. Dersom Altinn-brukergrensesnittet brukes av appen, så vil disse bli kalt ved knappetrykk i signeringssteget. Om kun API-et benyttes, så må disse kalles manuelt via `/actions`-endepunktet eller process next.
- `sign`: Selve signeringshandlingen.
- `reject`: Dersom det skal være mulig å avbryte signeringssteget, så må det også legges til en gateway for å styre hvor prosessen skal gå videre da. Se eksempelet nedenfor.

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
            <!-- De faktiske dataene som skal signeres. Kan være vedlegg, skjemadata i xml, eller PDF fra tidligere steg. -->
            <altinn:dataTypesToSign>
              <altinn:dataType>ref-data-as-pdf</altinn:dataType>
            </altinn:dataTypesToSign>

            <!-- Denne datatypen brukes for lagre signaturene -->
            <altinn:signatureDataType>signatures</altinn:signatureDataType>

            <!-- Denne datatypen brukes for lagre signatarene og tilhørende informasjon -->
            <altinn:signeeStatesDataTypeId>signeesState</altinn:signeeStatesDataTypeId>

            <!-- Denne ID-en angir hvilken implementasjon av C# interface-et ISigneeProvider som skal benyttes for dette signeringssteget -->
            <altinn:signeeProviderId>signees</altinn:signeeProviderId>

            <!-- Dersom man ønsker at det skal bli generert en PDF av signeringssteget så kan man oppgi en datatype her av type application/pdf -->
            <altinn:signingPdfDataType>signing-step-pdf</altinn:signingPdfDataType> <!-- optional -->

            <!-- Dersom man ønsker at den som signerer skal motta en signeringskvittering i sin innboks så kan man oppgi en correspondence resource her. Egen dokumentasjon for hvordan dette gjøres. -->
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

### Tilgangsstyring

  Gi ```read```, ```write``` og eventuelt ```sign``` til den som fyller ut skjemaet.

  For at appen skal kunne delegere rettigheter til de som skal signere så må appen få delegeringsrettighet for ```read``` og ```sign```.
  Se eksempel nedenfor.

  Bytt ut ```ttd``` med riktig org.
  Bytt ut ```app_ttd_signering-brukerstyrt``` med tilsvarende ```app_{org}_{appnavn}```.
  Bytt ut ```signering-brukerstyrt``` med appnavn.

  ```xml

  <xacml:Rule RuleId="urn:altinn:org:ttd:signering-brukerstyrt:ruleid:7" Effect="Permit">
    <xacml:Description>
        A rule defining all instance delegation rights the App itself is allowed
        to perform for instances of the app ttd/signering-brukerstyrt. In this
        example the app can delegate the Read and Sign actions for task
        SingingTask.
    </xacml:Description>
    <xacml:Target>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match
                    MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue
                        DataType="http://www.w3.org/2001/XMLSchema#string">
                        app_ttd_signering-brukerstyrt
                    </xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:altinn:resource:delegation"
                        Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match
                    MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal"
                >
                    <xacml:AttributeValue
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                    >ttd</xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:altinn:org"
                        Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
                <xacml:Match
                    MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal"
                >
                    <xacml:AttributeValue
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                    >signering-brukerstyrt</xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:altinn:app"
                        Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
                <xacml:Match
                    MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal"
                >
                    <xacml:AttributeValue
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                    >SingingTask</xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:altinn:task"
                        Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
            </xacml:AllOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match
                    MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case"
                >
                    <xacml:AttributeValue
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                    >read</xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
                        Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
            </xacml:AllOf>
            <xacml:AllOf>
                <xacml:Match
                    MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case"
                >
                    <xacml:AttributeValue
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                    >sign</xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
                        Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
    </xacml:Target>
  </xacml:Rule>
  ```