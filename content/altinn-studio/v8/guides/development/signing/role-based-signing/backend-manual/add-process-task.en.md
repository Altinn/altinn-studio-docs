---
headless: true
hidden: true
---

#### Extend the app process with a signing task
A signing task must be added to `App/config/process/process.bpmn`, as illustrated below.

{{% notice info %}}
We recommend doing this using the Altinn Studio process editor, so that the BPMN diagram is updated to show the new app flow. Please note that the process editor to date does not handle all aspects of the signing configuration, which means that some manual setup is still required.
{{% /notice %}}

Signing normally uses two user actions. If the Altinn user interface is used by the app, these will be called by button pressen in the signing step. If only the API is used, these must be called manually via the `/actions` endpoint or via process next.
- `sign`: The actual act of signing the data. Performed by the signees.
- `reject`: If the end user sees something wrong with the signing step, they can abort the signing step. All signatures and the signee state is deleted, and runtime delegated access rights are revoked. Which process step the user is taken to after this is specified in a gateway, as exemplified below.

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
        <altinn:dataTypesToSign>
          <altinn:dataType>ref-data-as-pdf</altinn:dataType>
        </altinn:dataTypesToSign>
        <altinn:signatureDataType>signatures</altinn:signatureDataType>

        <!-- We have made a default validator that can be enabled here. -->
        <!-- It will validate that the required number of signatures configured is fulfilled. -->
        <!-- (specified by the `minCount` property on the signature data type) -->
        <!-- If default validation is not enabled, custom validation of the signatures should be added. -->
        <altinn:runDefaultValidator>true</altinn:runDefaultValidator>

        <!-- Optional: If you wish to send signature receipts, -->
        <!-- insert your correspondence resource in the property below. -->
        <altinn:correspondenceResource>app-correspondence-resource</altinn:correspondenceResource>
      </altinn:signatureConfig>
    </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
  <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
</bpmn:task>
```

If you have chosen to send signing receipts by specifying a correspondence resource, you can find additional details regarding that configuration [here](/en/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/#configure-environment-specific-correspondence-resources).

#### Add data types for storing signing related data
The value of the node `<altinn:signatureDataType>signatures</altinn:signatureDataType>` must match the ID of the data type you configured in the previous step.

These data types should be added in the `dataTypes` array in `App/config/applicationmetadata.json`.

This data type is used to store the actual signatures that are generated when a user performs the sign action. 

```json
{
  "id": "signatures",
  "allowedContentTypes": [
      "application/json"
  ],
  "allowedContributors": [
      "app:owned"
  ],
  "minCount": 1,
  "actionRequiredToRead": "signature-access",
  "actionRequiredToWrite": "signature-access"
}
```

The value of the `id` property _must_ match the value specified in the [signing task](#extend-the-app-process-with-a-signing-task) definition.

It is important to set `allowedContributors` to `"app:owned"`. This ensures that these data items cannot be edited via the app’s API but only by the app itself. Before version 8.6, this was misspelled `allowedContributers`.

We recommend placing [access restrictions](/en/altinn-studio/v8/guides/development/restricted-data/) on the signature objects, by specifying the `actionRequiredToRead` and `actionRequiredToWrite` properties on the data type definition. If this is not something you wish to do, those properties can be removed from the configuration.

#### Access control
Give `read`, `write` and alternatively `sign` to the instance owner. Others who should sign also need `read` and `write`.

More information about action attributes can be found [here](/en/altinn-studio/v8/reference/configuration/authorization/#action-attributes).