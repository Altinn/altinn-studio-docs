
---
hidden: true
---

### Utvid app prossesen med signing task:

Det må legges til et signeringssteg i appens prosess, som er definert i `App/config/process/process.bpmn`.

Det anbefales å dra inn prosessteget via prosessdesigneren i Altinn Studio. Da får man generert BPMN-diagram som viser flyten i appen.
Forløpig vil prosessdesigneren bare delvis konfigurere steget riktig, så det må suppleres med manuell konfigurasjon. 

Signering benytter to burkerhandlinger (user actions):
- `sign`: Selve signeringshandlingen.
- `reject`: Dersom det skal være mulig å avbryte signeringssteget, så må det også legges til en gateway for å styre hvor prosessen skal gå videre når det skjer.

Dersom Altinn-brukergrensesnittet benyttes av appen, så vil handlingene ovenfor bli kalt ved knappetrykk i signeringssteget. 
Om kun API-et benyttes, så må disse kalles manuelt via `/actions`-endepunktet eller process next.

Et signeringssteg kan se omtrent slik ut:
```xml
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

                <!-- Denne datatypen brukes for lagre signaturene. -->
                <altinn:signatureDataType>signatures</altinn:signatureDataType>

                <!-- Denne datatypen brukes for lagre signatarene og tilhørende informasjon. -->
                <altinn:signeeStatesDataTypeId>signeeState</altinn:signeeStatesDataTypeId>

                <!-- Denne ID-en angir hvilken implementasjon av C# interface-et ISigneeProvider som skal benyttes for dette signeringssteget. -->
                <altinn:signeeProviderId>signees</altinn:signeeProviderId>

                <!-- Her oppgis en correspondence resource, som brukes for å si fra til signaterene om at de må inn og signere, samt signeringskvittering. -->
                <altinn:correspondenceResource>app-correspondence-resource</altinn:correspondenceResource>

                <!-- Dersom man ønsker at det skal bli generert en PDF av signeringssteget så kan man oppgi en datatype her av type application/pdf. -->
                <altinn:signingPdfDataType>signing-step-pdf</altinn:signingPdfDataType> <!-- optional -->

            </altinn:signatureConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
    <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
</bpmn:task>
```

### Legg til datatyper for å lagre signeringsdata

Disse datatypene legger til i `dataTypes` i `App/config/applicationmetadata.json`.

Den første datatypen benyttes av signeringssteget til å lagre de faktiske signaturene som genereres når brukeren utfører signeringshandlingen.

```json
{
    "id": "signatures",
    "taskId": "SigningTask",
    "allowedContentTypes": [
        "application/json"
    ],
    "allowedContributers": [
        "app:owned"
    ]
}
```

Denne datatypen benyttes for å lagre informasjon om signatarene som skal få deligert rettigheter til å signere og statusen deres.

```json
{
    "id": "signeeState",
    "taskId": "SigningTask",
    "allowedContentTypes": [
        "application/pdf"
    ],
    "allowedContributers": [
        "app:owned"
    ],
    "maxCount": 1,
    "minCount": 1,
}
```

Det er viktig å sette `allowedContributers` til ```"app:owned"```. Det gjør at disse dataene ikke kan redigeres via appens API, men kun av appen selv.

Datatypenes ID-er kan settes til noe annet, men det må matche ID-ene som legges inn i `signatureDataType` og `signeeStatesDataTypeId` i prossessteget, som vist i punktet under.


### Tilgangsstyring

  Gi ```read```, ```write``` og eventuelt ```sign``` til den som fyller ut skjemaet.

  For at appen skal kunne delegere rettigheter til de som skal signere så må appen få rettigheter til å delegere ```read``` og ```sign```.
  Se eksempel nedenfor.

  - Bytt ut ```ttd``` med riktig org.
  - Bytt ut ```app_ttd_signering-brukerstyrt``` med tilsvarende ```app_{org}_{appnavn}```.
  - Bytt ut ```signering-brukerstyrt``` med appnavn.

  ```xml

  <xacml:Rule RuleId="urn:altinn:org:ttd:signering-brukerstyrt:ruleid:7" Effect="Permit">
    <xacml:Description>
        A rule defining all instance delegation rights the App itself is allowed to perform for instances of the app ttd/signering-brukerstyrt. In this example the app can delegate the Read and Sign actions for task SingingTask.
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
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">ttd</xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:altinn:org"
                        Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">signering-brukerstyrt</xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:altinn:app"
                        Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
                <xacml:Match
                    MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">SingingTask</xacml:AttributeValue>
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
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
                    <xacml:AttributeDesignator
                        AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
                        Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action"
                        DataType="http://www.w3.org/2001/XMLSchema#string"
                        MustBePresent="false"
                    />
                </xacml:Match>
            </xacml:AllOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">sign</xacml:AttributeValue>
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