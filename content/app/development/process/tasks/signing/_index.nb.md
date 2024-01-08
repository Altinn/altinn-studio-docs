---
title: Signerings task
description: Definer signerings prosess tasks
tags: [altinn-apps, process, bpmn, task, sign, signing]
hidden: true
toc: true
---

{{% panel theme="warning" %}}
⚠️ Signing task krever versjon 8.0.0 eller nyere av app-libs
{{% /panel %}}

Oppsett av en signeringoppgave i prosessfilen krever litt mer arbeid enn en vanlig data-, bekreftelses- eller tilbakemeldingsoppgave.

Denne siden vil veilede deg gjennom hva du trenger å konfigurere og hvordan det er koblet til andre deler av konfigurasjonen.

Definere og konfigurere en signeringoppgave
En signeringoppgave i sin enkleste form ser omtrent slik ut:

xml
Copy code
<bpmn:task id="Task_2" name="Signering">
    <bpmn:incoming>Flow_1enq1lu</bpmn:incoming>
    <bpmn:outgoing>Flow_0ybpfuh</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>signering</altinn:taskType>
            <altinn:actions>
                <altinn:action>signer</altinn:action>
            </altinn:actions>
            <altinn:signatureConfig>
                <altinn:dataTypesToSign>
                    <altinn:dataType>Modell</altinn:dataType>
                </altinn:dataTypesToSign>
                <altinn:signatureDataType>signatur</altinn:signatureDataType>
            </altinn:signatureConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
Gjøre signering tilgjengelig som handling
Som med bekreftelsesoppgaver må vi definere de tilgjengelige handlingene. For å generere et signeringobjekt må brukeren kunne utføre handlingen "signer":

xml
Copy code
<altinn:actions>
    <altinn:action>signer</altinn:action>
</altinn:actions>
"Signer" kan være det eneste alternativet eller kombinert med andre handlinger som "bekreft" og/eller "avvis", avhengig av behovene til hver applikasjon.

Konfigurere hvilke dataelementer som skal signeres
Når en bruker utfører handlingen "signer", vil konfigurasjonen fra <altinn:signatureConfig> bli brukt til å opprette et signeringobjekt.

For øyeblikket definerer apputvikleren hvilke dataelementer som skal være en del av signeringobjektet ved å definere en liste over datatyper. Dette kan være skjemadata, vedlegg eller PDF-er.

Datatypene er definert i filen App/config/applicationmetadata.json.

I eksemplet med signeringoppgaven ovenfor definerer den at alle dataelementer som er tilknyttet datatypen "Modell", skal være en del av signaturen.

Hvis applikasjonen også har en datatypen "vedlegg", der brukeren legger ved ekstra filer som utvikleren ønsker å være en del av signeringobjektet, bør <altinn:signatureConfig> se slik ut:

```xml
<altinn:signatureConfig>
    <altinn:dataTypesToSign>
        <altinn:dataType>Model</altinn:dataType>
        <altinn:dataType>attachmetns</altinn:dataType>
    </altinn:dataTypesToSign>
    <altinn:signatureDataType>signature</altinn:signatureDataType>
</altinn:signatureConfig>
```

#### Konfigurere hvor signaturobjektet skal lagres

Et signaturobjekt krever også en datatypen der det skal lagres når det er generert. Dette er definert i `<altinn:signatureDataTyep>`, og må også være definert i `App/config/applicationmetadata.json`.

Eksempel på en applicationmetadata.json-fil med en signaturdatatypen kalt "signatur":

```json
{
  "id": "ttd/vga-dev-v8",
  "org": "ttd",
  "title": {
    "nb": "vga-dev-v8",
    "en": "vga-dev-v8"
  },
  "dataTypes": [
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": [
        "application/pdf"
      ],
      "maxCount": 0,
      "minCount": 0,
      "enablePdfCreation": true
    },
    {
      "id": "Modell",
      "allowedContentTypes": [
        "application/xml"
      ],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.Model",
        "allowAnonymousOnStateless": false,
        "autoDeleteOnProcessEnd": false
      },
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 1,
      "enablePdfCreation": true
    },
    {
      "id": "signatur",
      "allowedContentTypes": [
        "application/json"
      ],
      "taskId": "Task_2",
      "maxSize": 25,
      "maxCount": 1,
      "minCount": 0,
      "enablePdfCreation": false
    }
  ],
  "partyTypesAllowed": {
    "bankruptcyEstate": false,
    "organisation": false,
    "person": false,
    "subUnit": false
  },
  "autoDeleteOnProcessEnd": false,
  "created": "2022-10-21T07:30:47.2710111Z",
  "createdBy": "appdeveloper",
  "lastChanged": "2022-10-21T07:30:47.2710121Z",
  "lastChangedBy": "appdeveloper"
}
```

#### Konfigurere unike signaturer

Hvis en applikasjon har flere signeringstrinn, kan du sørge for at én person ikke kan signere begge trinnene selv om de har nødvendige roller.

For eksempel, hvis to styremedlemmer skal signere, men samme person ikke kan utføre begge signeringstrinnene.

For å konfigurere dette må vi legge til det første signaturdataobjektet i listen `<altinn:uniqueFromSignaturesInDataTypes>` for signeringoppgave to:

```xml
<bpmn:task id="Task_2" name="Signing">
    <bpmn:incoming>Flow_1enq1lu</bpmn:incoming>
    <bpmn:outgoing>Flow_0ybpfuh</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>signing</altinn:taskType>
            <altinn:actions>
                <altinn:action>sign</altinn:action>
            </altinn:actions>
            <altinn:signatureConfig>
                <altinn:dataTypesToSign>
                    <altinn:dataType>Model</altinn:dataType>
                </altinn:dataTypesToSign>
                <altinn:signatureDataType>signature</altinn:signatureDataType>
            </altinn:signatureConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
<bpmn:task id="Task_3" name="Second Signing">
    <bpmn:incoming>Flow_1enadsf</bpmn:incoming>
    <bpmn:outgoing>Flow_0yadsfh</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>signing</altinn:taskType>
            <altinn:actions>
                <altinn:action>sign</altinn:action>
            </altinn:actions>
            <altinn:signatureConfig>
                <altinn:dataTypesToSign>
                    <altinn:dataType>Model</altinn:dataType>
                </altinn:dataTypesToSign>
                <altinn:signatureDataType>signature2</altinn:signatureDataType>
                <altinn:uniqueFromSignaturesInDataTypes>
                    <altinn:dataType>signature</altinn:dataType>
                </altinn:uniqueFromSignaturesInDataTypes>
            </altinn:signatureConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

I eksempelet blir signeringobjektet for oppgave Task_2 lagret i datatypen "signature", og i "signature2" for oppgave Task_3.

I tillegg har Task_3s `<altinn:signatureConfig>` definert at den skal være unik blant alle signaturobjekter som er lagret i datatypen "signatur".

```xml
<altinn:uniqueFromSignaturesInDataTypes>
    <altinn:dataType>signatur</altinn:dataType>
</altinn:uniqueFromSignaturesInDataTypes>
```

### Lagring av signeringobjekt når brukeren signerer

Når brukeren utfører signeringen, vil et signeringobjekt bli lagret som datatypen "signatur". Signeringobjektet vil se omtrent slik ut:

```json
{
    "id": "ab5b8d43-64a5-482d-bfab-99e5ae6b2f55",
    "instanceGuid": "5267dc93-aa7d-4af9-934b-b0cf5b97d86e",
    "signedTime": "2023-06-16T12:16:36.6250698Z",
    "signeeInfo": {
        "userId": "1337",
        "personNumber": "01039012345",
        "organisationNumber": null
    },
    "dataElementSignatures": [
        {
            "dataElementId": "c71177df-e74d-44a2-976c-0443c98756ba",
            "sha256Hash": "cee2a288ccc273e85f9bdbbc2de52b02d0f0caac80a62e0352bd72689b283286",
            "signed": true
        }
    ]
}
```

Hvis flere dataelementer er signert, vil de bli lagt til i listen `dataElementSignatures`.

Feltet `sha256Hash` inneholder en base64-kodet SHA256-hash generert fra dataene som er lagret i Altinn på tidspunktet for signeringen.
Objektet `signeeInfo` inneholder informasjonen om hvem som utførte signeringen.