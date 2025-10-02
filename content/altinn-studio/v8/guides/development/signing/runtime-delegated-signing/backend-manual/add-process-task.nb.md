---
headless: true
hidden: true
---

#### Utvid app-prosessen med et signeringssteg

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

        <!-- Denne ID-en angir hvilken implementasjon av C# interface-et -->
        <!-- ISigneeProvider som skal benyttes for dette signeringssteget. -->
        <altinn:signeeProviderId>signees</altinn:signeeProviderId>

        <!-- Her oppgis en correspondence resource, som brukes for å si fra til signatarene -->
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

#### Konfigurere miljø-spesifikke correspondence ressurser
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task-environments.nb.md" %}}

#### Legg til datatyper for å lagre signeringsdata
Disse datatypene legges til i `dataTypes` i `App/config/applicationmetadata.json`.

Den første datatypen benyttes i signeringssteget til å lagre signaturene.

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task-code-01.en.md" %}}

Denne datatypen benyttes for å lagre informasjon om signatarene og statusen deres.

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task-code-02.en.md" %}}

Det er viktig å sette `allowedContributors`, `actionRequiredToRead` og `actionRequiredToWrite` som beskrevet i eksemplene over. Dette gjør at disse dataene ikke kan redigeres via appens API, men kun av appen selv.

Datatypenes ID-er må matche ID-ene som legges inn i `signatureDataType` og `signeeStatesDataTypeId` i prosesskonfigurasjonen.


#### Tilgangsstyring for brukere
Gi `read`, `write` og eventuelt `sign` til den som fyller ut skjemaet.

Mer informasjon om action-attributter finner du [her](/nb/altinn-studio/v8/reference/configuration/authorization/#action-attributter).

#### Tilgangsstyring for appen
For at appen skal kunne delegere rettigheter til de som skal signere så må appen få rettigheter til å delegere `read` og `sign`.

Nedenfor finner du et eksempel på en slik policy. For at denne koden skal fungere i din egen app, må du gjøre følgende:
- Bytt ut `ttd` med riktig org.
- Bytt ut `app_ttd_signering-brukerstyrt` med tilsvarende `app_{org}_{appnavn}`.
- Bytt ut `signering-brukerstyrt` med appnavn.

<!-- Dummy to force end of list rendering -->
<span></span>

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task-code-03.en.md" %}}

#### Tilgangsstyring for tjenesteeiere
Gi `signature-access` til tjenesteeiere. Dette gjør at appen (via Maskinporten) kan skrive og lese data i signaturdokumentene, samtidig som tjenesteeiere kan lese og verifisere signaturer når de måtte ønske det.

Mer informasjon rundt dette konseptet finner du [her](/nb/altinn-studio/v8/concepts/data-model/restricted-data/).
