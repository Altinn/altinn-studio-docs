---
hidden: true
---

### Utvid app prossesen med signing task:

Det må legges til et prosessteg og en gateway i `App/config/process/process.bpmn`, som i eksemplet nedenfor.

Signering benytter to user actions. Dersom Altinn-brukergrensesnittet brukes av appen, så vil disse bli kalt automatisk når man står i signeringssteget. Om kun API-et benyttes, så må disse kalles manuelt via `/actions`-endepunktet eller process next.
- `sign`: Selve signeringshandlingen.
- `reject`: Dersom det skal være mulig å avbryte signeringssteget, så må det også legges til en gateway for å styre hvor prosessen skal gå videre da.

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


### Legg til datatyper for å lagre signeringsdata

Denne datatypen legges til i `dataTypes` i `App/config/applicationmetadata.json`.

Den benyttes av signeringssteget til å lagre de faktiske signaturene som genereres når brukeren utfører signeringshandlingen.

```json
{
    "id": "signatures",
    "allowedContentTypes": [
        "application/json"
    ]
}
```

ID-en kan settes til noe annet, men det må matche ID-en som legges inn i `signatureDataType` i prossessteget.


### Tilgangsstyring

Gi ```read```, ```write``` og eventuelt ```sign``` til den som fyller ut skjemaet. Andre som skal signere må også få `read` og `write`.