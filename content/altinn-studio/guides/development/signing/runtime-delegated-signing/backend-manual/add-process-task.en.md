---
hidden: true
---

### Extend the Application Process with a Signing Task

A signing task must be added to `App/config/process/process.bpmn`, as shown in the example below.

We recommend doing this using the Altinn Studio process editor, so that the BPMN diagram is generated, to show the apps process.
However, as of now, the process editor will only partially configure this task correctly, so some manual adjustments are required.

Signing uses two user actions.
- `sign`: The actual signing action.
- `reject`: If the signing step should be cancellable, a gateway must also be added to control where the process should continue. See the example below.

If the Altinn user interface is used by the application, these actions will be triggered by button clicks in the signing stage. If only the API is used, they must be triggered manually via the `/actions` endpoint or the process next endpoint.

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

        <!-- We have made a default validator that can be enabled here. It checks that all signees have signed and that minCount on the signature datatype is fulfilled. If default validation is not enabled, custom validation of the signatures should be added. -->
        <altinn:runDefaultValidator>true</altinn:runDefaultValidator>

      </altinn:signatureConfig>
    </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
  <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
</bpmn:task>
```


### Add data types for storing signing related data

These data types should be added to `dataTypes` in `App/config/applicationmetadata.json`.

The first data type is used by the signing stage to store the actual signatures generated when a user completes the signing action.

```json
{
    "id": "signatures",
    "allowedContentTypes": [
        "application/json"
    ],
    "allowedContributors": [
        "app:owned"
    ],
    "minCount": 1
}
```

This data type is used to store information about the signers who should be delegated signing rights and their status.

```json
{
    "id": "signeeState",
    "allowedContentTypes": [
        "application/json"
    ],
    "allowedContributors": [
        "app:owned"
    ],
    "maxCount": 1,
    "minCount": 1
}
```

It is important to set `allowedContributors` to `"app:owned"`. This ensures that these data items cannot be edited via the app’s API but only by the app itself. Before version 8.6, this was misspelled `allowedContributers`.

The IDs of the data types can be changed, but they must match the IDs set in `signatureDataType` and `signeeStatesDataTypeId` in the process step, as shown in the next section.


### Access control

  Give `read`m `write` and optionally `sign` to the role that should fill out the form.

  In order for the service to be able to delegate access rights to the signees, the app needs to have the right to delegate the `read` and `sign` actions.
  Below is an example which you can use in your policy.xml file.

  - Replace `ttd` with the correct org.
  - Replace `app_ttd_signering-brukerstyrt` with your own org and app name inserted into this template: `app_{org}_{app-name}`.
  - Replace `signering-brukerstyrt` with your app name
  - Modify the RuleId attribute to fit nicely into your policy.xml.

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