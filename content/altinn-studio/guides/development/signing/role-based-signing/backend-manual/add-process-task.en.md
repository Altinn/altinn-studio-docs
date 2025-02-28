---
hidden: true
---

### Extend the app process with signing task:

A singing task must be added to `App/config/process/process.bpmn`.

We recommend doing this using the Altinn Studio process editor, so that the BPMN diagram is generated, to show the apps process.

Signing normally uses two user actions. If the Altinn user interface is used by the app, these will be called by button pressen in the signing step. If only the API is used, these must be called manually via the `/actions` endpoint or via process next.
- `sign`: The actual act of singing the data. Performed by the signees.
- `reject`: If the end user sees something wrong with the singing step, the person concerned can press abort in the signing step. All signatures and the signee state is deleted, and runtime delegated access rights are revoked. Which process step the user is taken to after this is specified in a gateway, as exemplified below.

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
      </altinn:signatureConfig>
    </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
  <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
</bpmn:task>
```


### Add data types for storing signing related data

The value of the node `<altinn:signatureDataType>signatures</altinn:signatureDataType>` must match the ID of the data type you configured in the previous step.

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


### Tilgangsstyring

Give `read`, `write` and alternatively `sign` to the instance owner. Others who should sign also need `read` and `write`.