---
draft: true
title: Oppgavetyper
linktitle: Oppgavetyper
description: Oversikt over de forskjellige oppgavetypene i Altinn Studio
tags: [needsReview, needsTranslation]

---

## Brukeroppgaver
Brukeroppgaver er oppgaver som krever input fra en bruker, enten sluttbruker eller tjenesteeier.

### Datainnsamling (`data`)

En dataoppgave er der brukeren/systemet som bruker den digitale tjenesten gjennom brukergrensesnittet eller API kan lese, skrive og endre data relatert til en digital tjeneste.

En dataoppgave krever at all data for en gitt prosessoppgave er gyldig og at brukeren/systemet har lagt til all nødvendig data.

Datavalidering er en del av standardlogikken i malen. Applikasjonsutviklere kan legge til egendefinert validering for hvert dataelement og oppgave.

```xml
<bpmn:task id="Task_1" name="Utfylling">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:taskType>data</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

### Bekreftelse (`confirmation`)

En bekreftelsesoppgave er der sluttbrukeren som bruker applikasjonen gjennom nettleseren eller systemet gjennom API kan bekrefte data som er en del av prosessen.

Når en bruker bekrefter en bekreftelsesoppgave oppretter systemet en bekreftelseslogg for instansen som detaljerer at bruker/system X har bekreftet.

Eksempel på en bekreftelsesoppgave:

```xml
<bpmn:task id="Task_2" name="Bekreftelse">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:actions>
            <altinn:action>confirm</altinn:action>
        </altinn:actions>
        <altinn:taskType>confirmation</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

### Signering (`signing`)

En signeringsoppgave er der sluttbrukeren som bruker applikasjonen gjennom nettleseren eller systemet gjennom API kan signere data som er en del av prosessen.

Når en bruker utfører en signering genererer systemet et signaturobjekt som inneholder brukerinformasjonen og en hash av dataelementene du har definert i prosessoppgaven. Samtidig oppretter systemet en hendelseslogg for instansen som detaljerer at bruker/system X har signert.

Eksempel på en signeringsoppgave:

```xml
<bpmn:task id="Task_1">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:actions>
            <altinn:action>sign</altinn:action>
        </altinn:actions>
        <altinn:taskType>signing</altinn:taskType>
        <altinn:signatureConfig>
        <altinn:dataTypesToSign>
            <altinn:dataType>MyDataModel</altinn:dataType>
        </altinn:dataTypesToSign>
        <altinn:signatureDataType>signature2</altinn:signatureDataType>
        <altinn:uniqueFromSignaturesInDataTypes>
            <altinn:dataType>signature1</altinn:dataType>
        </altinn:uniqueFromSignaturesInDataTypes>
        </altinn:signatureConfig>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

Som eksempelet ovenfor viser, krever en signaturoppgave ekstra informasjon. Se [Konfigurering av signering](signing) for detaljer om hvordan du konfigurerer en signaturoppgave og dens effekter.

### Tilbakemelding (`feedback`)

En tilbakemeldingsoppgave lar tjenesteeieren eller andre gi tilbakemeldinger til enheten som rapporterer data. Dette lar brukeren laste opp data og fortsette prosessen.

Eksempel på en tilbakemeldingsoppgave:

```xml
<bpmn:task id="Task_2" name="Bekreftelse">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
    <altinn:taskExtension>
        <altinn:taskType>feedback</altinn:taskType>
    </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

### Betaling (`payment`)

En betalingsoppgave lar brukeren betale for tjenester direkte i app-flyten. Ved inngang til betalingssteget omdirigeres 
brukeren til en ekstern betalingsleverandør, og returneres til tjenesten når betalingen er fullført.

Eksempel på betalingsoppgave:

```xml
<bpmn:task id="Task_2" name="Betaling">
<bpmn:incoming>Flow_t1_t2</bpmn:incoming>
<bpmn:outgoing>Flow_t2_g1</bpmn:outgoing>
<bpmn:extensionElements>
<altinn:taskExtension>
    <altinn:taskType>payment</altinn:taskType>
    <altinn:actions>
    <altinn:action>confirm</altinn:action>
    <altinn:action>pay</altinn:action>
    <altinn:action>reject</altinn:action>
    </altinn:actions>
    <altinn:paymentConfig>
    <altinn:paymentDataType>paymentInformation</altinn:paymentDataType>
    <altinn:paymentReceiptPdfDataType>paymentReceiptPdf</altinn:paymentReceiptPdfDataType>
    </altinn:paymentConfig>
</altinn:taskExtension>
</bpmn:extensionElements>
</bpmn:task>
```

## Systemoppgaver
En systemoppgave er en prosessoppgave som kjører automatisk på serveren. Prosessen går som hovedregel videre til neste 
steg når den har kjørt ferdig, men dette kan systemoppgaven definere selv. 

Tjenesteeiere kan implementere sine egne systemoppgaver og legge de som steg i appens prosess.

### Generere PDF (`pdf`)
Genererer PDF basert på valgt oppsett. Bruker standard oppsett for PDF, eller egendefinert visning.

Eksempel på PDF-systemoppgave:

```xml
<bpmn:serviceTask id="Activity_0amjsu7" name="Altinn pdf task">
    <bpmn:extensionElements>
    <altinn:taskExtension>
      <altinn:taskType>pdf</altinn:taskType>
      <altinn:pdfConfig>
        <altinn:filenameTextResourceKey>pdf-filename-2VsfneCM</altinn:filenameTextResourceKey>
        <altinn:autoPdfTaskIds>
          <altinn:taskId>Task_1</altinn:taskId>
        </altinn:autoPdfTaskIds>
      </altinn:pdfConfig>
    </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>SequenceFlow_1oot28q</bpmn:incoming>
  <bpmn:outgoing>Flow_03hp1dt</bpmn:outgoing>
</bpmn:serviceTask>
```

### Overføre data via eFormidling

{{% notice info %}}
Mer info kommer snart.
{{% /notice %}}

### Overføre data via Fiks Arkiv

{{% notice info %}}
Mer info kommer snart.
{{% /notice %}}