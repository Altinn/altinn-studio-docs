---
title: Slik sender du kvittering ifm signering
linktitle: Signeringskvittering
description: Følg stegene i denne guiden for å sette opp meldingstjenesten til å sende signeringskvittering
draft: true
---

## Før du starter
### Sett opp en app med signering
Denne guiden tar utgangspunkt i en eksisterende app med signeringsoppgave. 

### Maskinporten-klient
Du trenger en maskinporten-klient med tilgang til følgende scopes:
- `altinn:serviceowner`
- `altinn:correspondence.write`

Er du usikker kan du følge veiledningen for oppsett av meldingstjeneste under, der beskrives også oppsett av maskinporten-klient 
med nødvendige scopes.

## 1. Sett opp en meldingstjeneste
{{% notice info %}}
Hvis du allerede har en meldingstjeneste tilgjengelig, kan du bruke den, og kan hoppe over dette steget.
{{% /notice %}}

Du trenger en meldingstjeneste i [Altinn Melding]({{<relref "/correspondence/about">}}) for å kunne sende 
signeringskvittering. 

Følg **steg 4-6** i [hurtigstartsguiden for Altinn Melding]({{<relref "/correspondence/getting-started/developer-guides/serviceowner/">}})
for å sette opp en meldingstjeneste som kan brukes til å sende kvittering ifm signering.
Stegene 1-3 er kun nødvendig om du ikke allerede har gjort dette i andre sammenhenger.
Du trenger ikke å utføre stegene som omhandler å integrere mot meldingstjenesten, dette gjør appen automatisk i forbindelse
med signeringssteget.

## 2. Registrer maskinporten-klienten i appen
{{% notice info %}}
Hvis du allerede bruker maskinporten i appen trenger du ikke å utføre dette steget. Påse likevel at maskinporten-klienten har fått
tilgang til nødvendige scopes før du går videre.
{{% /notice %}}

Følg [denne guiden](<relref "altinn-studio/v10/develop-a-service/integration/maskinporten/">) for å ta i bruk 
maskinporten-klienten din i appen.

## 3. Legg til en meldingsressurs

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Altinn Studio Designer">}}
1. Naviger til appen din, og gå til **Arbeidsflyt** i toppmenyen.
2. Klikk på signeringsoppgaven i prosess-visningen og se at du får opp konfigurasjonsmuligheter i panelet på høyre side.
3. Klikk på "Oppgi en ressurs for å sende ut meldinger"
4. Legg inn navnet på meldingstjenesten i feltet
5. Klikk på "Del dine endringer" og knappen "Del endringer". 
6. Publiser tjenesten til testmiljø og verifiser at kvitteringen sendes.
{{</content-version-container>}}

{{<content-version-container version-label="Manuelt oppsett">}}
1. Legg inn `altinn:correspondenceResource` under `altinn:signatureConfig` på signeringsoppgaven (i filen `App/config/process/process.bpmn`) Se eksempel under:

    ```xml {hl_lines=[20,21,22]}
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

            <!-- ... ev. annen konfigurasjon knyttet til signering her -->

            <!-- Her oppgis en meldingsressurs, som brukes for å si fra til de som skal signere -->
            <!-- om at de må inn og signere, samt signeringskvittering. Påkrevd. -->
            <altinn:correspondenceResource>app-correspondence-resource</altinn:correspondenceResource>

        </altinn:signatureConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
    <bpmn:outgoing>SequenceFlow_1if1sh9</bpmn:outgoing>
    </bpmn:task>
    ```

2. Konfigurer miljøspesifikke meldingsressurser (valgfritt)
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/how-to/runtime-delegated-signing/backend-manual/add-process-task-environments.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}