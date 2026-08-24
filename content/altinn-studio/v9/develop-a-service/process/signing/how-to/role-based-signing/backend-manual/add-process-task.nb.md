---
draft: true
headless: true
hidden: true
tags: [needsReview, translate]
---

#### Utvid app-prosessen med et signeringssteg
Legg til et prosessteg i `App/config/process/process.bpmn`, som i eksemplet nedenfor.

{{% notice info %}}
Vi anbefaler å dra inn prosessteget via prosessdesigneren i Altinn Studio. Da blir det generert et BPMN-diagram som viser flyten i appen. Merk at prosessdesigneren bare konfigurerer deler av steget, så du må legge til noe manuelt etterpå.
{{% /notice %}}

Signering består av to brukerhandlinger (user actions). Hvis appen bruker Altinn-brukergrensesnittet, blir disse kalt automatisk når du er i signeringssteget. Bruker du bare API-et, må du kalle dem manuelt via `/actions`-endepunktet eller `process next`.
- `sign`: Selve signeringshandlingen.
- `reject`: Hvis det skal være mulig å avbryte signeringssteget, må du også legge til en gateway som styrer hvor prosessen skal gå videre.

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

        <!-- Vi har laget en standard validator som kan slås på her. -->
        <!-- Den validerer at påkrevd antall signaturer (minCount på signatur-datatypen) er oppfylt. -->
        <!-- Hvis du ikke slår på denne, bør du skrive egen validering av signaturer. -->
        <altinn:runDefaultValidator>true</altinn:runDefaultValidator>

        <!-- Valgfritt: Hvis du ønsker å sende kvitteringer for utført signatur, -->
        <!-- kan du spesifisere din correspondence-ressurs i feltet under. -->
        <altinn:correspondenceResource>app-correspondence-resource</altinn:correspondenceResource>
      </altinn:signatureConfig>
    </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
  <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
</bpmn:task>
```

Hvis du har valgt å sende signeringskvitteringer ved å spesifisere en correspondence-ressurs, [les om hvordan du konfigurerer miljøspesifikke meldingsressurser](/nb/altinn-studio/v9/develop-a-service/process/signing/how-to/runtime-delegated-signing/#konfigurere-miljøspesifikke-meldingsressurser).

#### Legg til datatype for å lagre signeringsdata
Legg til denne datatypen i `dataTypes` i `App/config/applicationmetadata.json`.

Signeringssteget bruker den til å lagre de faktiske signaturene som blir generert når brukeren utfører signeringshandlingen.

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

Verdien av `id`-feltet _må_ samstemme med verdien som har blitt spesifisert i [signeringssteget](#utvid-app-prosessen-med-et-signeringssteg).

Det er viktig å sette `allowedContributors` til `"app:owned"`, slik at bare appen selv kan redigere disse dataene – ikke via appens API. Før versjon 8.6 var denne konfigurasjonen feilstavet `allowedContributers`.

Vi anbefaler å sette opp [databeskyttelse](/nb/altinn-studio/v9/develop-a-service/data/restricted-data/) for signaturobjektene, ved å spesifisere feltene for `actionRequiredToRead` og `actionRequiredToWrite` i definisjonen ovenfor. Hvis du ikke ønsker å sette opp dette, kan du fjerne disse feltene.

#### Sett opp tilgangsstyring
Gi `read`, `write` og eventuelt `sign` til den som fyller ut skjemaet. Andre som skal signere må også få `read` og `write`.

[Les om action-attributter i tilgangsstyring](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/#action-attributter).
