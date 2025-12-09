---
headless: true
hidden: true
---

#### Extend the application process with a signing task
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
        <altinn:signeeStatesDataTypeId>signeeState</altinn:signeeStatesDataTypeId>

        <!-- This ID tells the app which implementation of the C# interface -->
        <!-- ISigneeProvider that should be used for this signing step -->
        <altinn:signeeProviderId>signees</altinn:signeeProviderId>

        <!-- If you want a PDF summary of the signing step, enter a datatype of type application/pdf here -->
        <altinn:signingPdfDataType>signing-step-pdf</altinn:signingPdfDataType> <!-- optional -->

        <!-- The correspondence service is used to communicate with the signees, and is required -->
        <!-- for user delegated signing. Add the correspondence resource here. -->
        <!-- Setup of this resource is documented separately. -->
        <altinn:correspondenceResource>app-correspondence-resource</altinn:correspondenceResource>

        <!-- We have made a default validator that can be enabled here. -->
        <!-- It will validate that the required number of signatures configured is fulfilled. -->
        <!-- (specified by the `minCount` property on the signature data type) -->
        <!-- If default validation is not enabled, custom validation of the signatures should be added. -->
        <altinn:runDefaultValidator>true</altinn:runDefaultValidator>
      </altinn:signatureConfig>
    </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
  <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
</bpmn:task>
```

#### Configure environment-specific correspondence resources
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task-environments.en.md" %}}

#### Add data types for storing signing related data
These data types should be added to `dataTypes` in `App/config/applicationmetadata.json`.

This data type is used during the signing task to store the signatures.

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task-code-01.en.md" %}}

This data type is used to store information about the signers and their status.

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task-code-02.en.md" %}}

It is important to set `allowedContributors`, `actionRequiredToRead` and `actionRequiredToWrite` as illustrated in the examples above. This ensures that these data items cannot be edited via the app's API but only by the app itself.

The IDs of the data types must match the IDs set for `signatureDataType` and `signeeStatesDataTypeId` in the process configuration.

#### Access control for users
Give `read`, `write` and optionally `sign` to the role that should fill out the form.

More information about action attributes can be found [here](/en/altinn-studio/v8/reference/configuration/authorization/#action-attributes).

#### Access control for the app
In order for the service to be able to delegate access rights to the signees, the app itself needs to have the right to delegate the `read` and `sign` actions.

Below is an example of a policy rule that accomplishes this. For the code to work in your own app, please follow these steps:
- Replace `ttd` with the correct org.
- Replace `app_ttd_signering-brukerstyrt` with your own org and app name inserted into this template: `app_{org}_{app-name}`.
- Replace `signering-brukerstyrt` with your app name
- Modify the RuleId attribute to fit nicely into your policy.xml.

<!-- Dummy to force end of list rendering -->
<span></span>

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task-code-03.en.md" %}}

#### Access control for service owners
Give `signature-access` to service owners. This allows bearers of a service owner token to interact with the restricted data in signature objects.

More information about this concept can be found [here](/en/altinn-studio/v8/concepts/data-model/restricted-data/).
