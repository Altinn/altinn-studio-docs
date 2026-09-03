---
draft: true
title: Oppgavetyper
linktitle: Oppgavetyper
description: Oversikt over de forskjellige oppgavetypene i Altinn Studio
tags: [needsReview]

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

Plattformen kjører systemoppgaven for seg: den prøver på nytt hvis noe utenfor appen svikter, og kan parkere 
prosessen mens oppgaven venter på svar fra et annet system.

Tjenesteeiere kan lage sine egne systemoppgaver og legge dem inn som steg i prosessen til appen. Se 
[Systemoppgaver]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks" >}}).

### Generere PDF (`pdf`)
Genererer PDF basert på valgt oppsett. Bruker standard oppsett for PDF, eller egendefinert visning. Se [Slik setter du opp PDF-generering]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}) for hele oppsettet.

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

### Overføre data via eFormidling (`eFormidling`)
Sender instansdata via eFormidling når prosessen når oppgaven. Oppgaven venter deretter på at integrasjonspunktet bekrefter at meldingen er levert, og prosessen går først videre når bekreftelsen har kommet. Du skal derfor ikke legge en tilbakemeldingsoppgave etter den. All konfigurasjon for meldingen ligger på selve oppgaven, i `<altinn:eFormidlingConfig>`. Plasser oppgaven der du vil at meldingen skal sendes, vanligvis etter oppgaven som produserer dataene du vil sende. Se [Slik setter du opp eFormidling]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}) for hele oppsettet.

Eksempel på eFormidling-systemoppgave:

```xml
<bpmn:serviceTask id="Task_eFormidling" name="eFormidling">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>eFormidling</altinn:taskType>
            <altinn:eFormidlingConfig>
                <altinn:disabled env="development">true</altinn:disabled>
                <altinn:receiver>991825827</altinn:receiver> <!-- Bytt ut med organisasjonsnummeret til mottakeren du faktisk sender til. -->
                <altinn:process>urn:no:difi:profile:arkivmelding:administrasjon:ver1.0</altinn:process>
                <altinn:standard>urn:no:difi:arkivmelding:xsd::arkivmelding</altinn:standard>
                <altinn:typeVersion>2.0</altinn:typeVersion>
                <altinn:type>arkivmelding</altinn:type>
                <altinn:securityLevel>3</altinn:securityLevel>
                <altinn:dpfShipmentType>digital</altinn:dpfShipmentType>
                <altinn:dataTypes>
                    <altinn:dataType>ref-data-as-pdf</altinn:dataType>
                </altinn:dataTypes>
            </altinn:eFormidlingConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1uewkmg</bpmn:incoming>
    <bpmn:outgoing>Flow_0c1ure8</bpmn:outgoing>
</bpmn:serviceTask>
```

### Overføre data via Fiks Arkiv

{{% notice info %}}
Mer info kommer snart.
{{% /notice %}}

### Egendefinert systemoppgave

Trenger du arbeid plattformen ikke har en innebygd oppgave for, lager du en egen systemoppgave. Da velger du selv navnet på 
oppgavetypen. Det samme navnet må stå tre steder: i `Type`-egenskapen på C#-klassen, i `<altinn:taskType>` i prosessen, og 
som handling i tilgangsregelen. Klassenavnet har ingenting å si. Se 
[Lage en egendefinert systemoppgave]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}).

Eksempel på en egendefinert systemoppgave:

```xml
<bpmn:serviceTask id="ExampleServiceTask" name="Example service task">
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>exampleServiceTask</altinn:taskType>
        </altinn:taskExtension>
    </bpmn:extensionElements>
    <bpmn:incoming>Flow_1yq6g64</bpmn:incoming>
    <bpmn:outgoing>Flow_1xowpt0</bpmn:outgoing>
</bpmn:serviceTask>
```