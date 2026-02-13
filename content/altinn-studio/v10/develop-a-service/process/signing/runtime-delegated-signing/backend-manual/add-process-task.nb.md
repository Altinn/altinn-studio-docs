---
draft: true
headless: true
hidden: true
tags: [needsReview, translate]
---

#### Legg til et signeringssteg i app-prosessen

Du må legge til et signeringssteg i prosessen til appen. Prosessen er definert i `App/config/process/process.bpmn`.

Vi anbefaler at du bruker prosessdesigneren i Altinn Studio til å dra inn prosesssteget. Da får du generert et BPMN-diagram som viser flyten i appen. Prosessdesigneren konfigurerer bare steget delvis, så du må supplere med manuell konfigurasjon.

Signering bruker to brukerhandlinger (user actions):

- `sign`: Selve signeringshandlingen.
- `reject`: Hvis det skal være mulig å avbryte signeringssteget, må du også legge til en gateway for å styre hvor prosessen skal gå videre når det skjer.

Hvis appen bruker Altinn-brukergrensesnittet, vil handlingene ovenfor bli kalt ved knappetrykk i signeringssteget. Hvis appen bare bruker API-et, må du kalle disse manuelt via `/actions`-endepunktet eller process next.

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

        <!-- Signature-datatypen brukes for å lagre signaturene. -->
        <altinn:signatureDataType>signatures</altinn:signatureDataType>

        <!-- SigneeStates-datatypen brukes for å lagre de som skal signere og tilhørende informasjon. -->
        <altinn:signeeStatesDataTypeId>signeeState</altinn:signeeStatesDataTypeId>

        <!-- Denne ID-en angir hvilken implementasjon av C# interface-et -->
        <!-- ISigneeProvider som skal benyttes for dette signeringssteget. -->
        <altinn:signeeProviderId>signees</altinn:signeeProviderId>

        <!-- Her oppgis en meldingsressurs, som brukes for å si fra til de som skal signere -->
        <!-- om at de må inn og signere, samt signeringskvittering. Påkrevd. -->
        <altinn:correspondenceResource>app-correspondence-resource</altinn:correspondenceResource>

        <!-- Dersom man ønsker at det skal bli generert en PDF av signeringssteget -->
        <!-- så kan man oppgi en datatype her av type application/pdf. -->
        <altinn:signingPdfDataType>signing-step-pdf</altinn:signingPdfDataType> <!-- optional -->

        <!-- Vi har laget en standard validator som kan slås på her. -->
        <!-- Den validerer at påkrevd antall signaturer (minCount på signatur-datatypen) er oppfylt. -->
        <!-- Om denne ikke slås på, bør man skrive egen validering av signaturer. -->
        <altinn:runDefaultValidator>true</altinn:runDefaultValidator>
      </altinn:signatureConfig>
    </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
  <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
</bpmn:task>
```

#### Konfigurere miljøspesifikke meldingsressurser
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/add-process-task-environments.nb.md" %}}

#### Legg til datatyper for å lagre signeringsdata

Du må legge til disse datatypene i `dataTypes` i `App/config/applicationmetadata.json`.

Signature-datatypen brukes i signeringssteget til å lagre signaturene.

{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/add-process-task-code-01.en.md" %}}

SigneeStates-datatypen brukes for å lagre informasjon om de som skal signere og statusen deres.

{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/add-process-task-code-02.en.md" %}}

Det er viktig å sette `allowedContributors`, `actionRequiredToRead` og `actionRequiredToWrite` som beskrevet i eksemplene over. Dette gjør at disse dataene ikke kan redigeres via API-et til appen, men kun av appen selv.

Datatypenes ID-er må matche ID-ene som du legger inn i `signatureDataType` og `signeeStatesDataTypeId` i prosesskonfigurasjonen.


#### Tilgangsstyring for brukere

Gi `read`, `write` og eventuelt `sign` til brukeren som fyller ut skjemaet.

[Les om action-attributter i tilgangsstyring](/nb/altinn-studio/v10/develop-a-service/reference/configuration/authorization/#action-attributter).

#### Tilgangsstyring for appen

For at appen skal kunne delegere rettigheter til de som skal signere, må appen få rettigheter til å delegere `read` og `sign`.

Nedenfor finner du et eksempel på en slik policy. For at denne koden skal fungere i appen din, må du gjøre følgende:

- Bytt ut `ttd` med riktig org.
- Bytt ut `app_ttd_signering-brukerstyrt` med tilsvarende `app_{org}_{appnavn}`.
- Bytt ut `signering-brukerstyrt` med appnavn.

<!-- Dummy to force end of list rendering -->
<span></span>

{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/add-process-task-code-03.en.md" %}}

#### Tilgangsstyring for tjenesteeiere

Gi `signature-access` til tjenesteeier. Dette gjør at appen (via Maskinporten) kan skrive og lese data i signaturdokumentene. Du kan også lese og sjekke signaturer når du måtte ønske det.

[Les om begrenset tilgang til data](/nb/altinn-studio/v10/this-is-as/explanations/data-model/restricted-data/).
