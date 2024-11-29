---
title: Teknisk oversikt
linktitle: Teknisk oversikt
description: Altinn 3 Formidling overgangsløsningen gjør det mulig for serviceeiere som eier formidlingstjenester i Altinn 2 å peke disse tjenestene mot Altinn 3 ved hjelp av en intern Altinn 2 bro.
tags: [arkitektur, løsning, formidling, overgang]
toc: false
weight: 1
---

## Om

"*Altinn 3 Broker Transition Service Bridge*" er en intern komponent i Altinn 2 som overfører Formidlings-forespørsler fra Altinn 2 til Altinn 3 for en gitt forespørsel, basert på "*ServiceCode*"/"*ServiceEdition*" kombinasjon av forespørselen.
Dette er en implementering av den myke overgangen beskrevet [her](../../reference/solution-architecture/#myk-overgang-fra-altinn-2-til-altinn-3).

## Teknisk oversikt

Altinn 2 lar sluttbrukere gjøre kall for spesifikke formidlingstjenester og overføre disse forespørslene til Altinn 3 basert på "*ServiceCode*"/"*ServiceEdition*" verdier i forespørselen.
Filer overført på denne måten vil være tilgjengelige for både Altinn 3 og Altinn 2 brukere.

Autentisering og autorisasjon utføres primært i det API-endepunktet man kaller (Altinn 2 eller 3). For Altinn 2 så utføres autentisering/autorisasjon på tjenestenivå, før man ruter tjenestekallene over til Altinn 3 gjennom et dedikert endepunkt som kan anta at autentisering og autorisasjon på tjenestenivå er OK. For Altinn 3 skjer alt internt i det miljøet.
Det medfører at man må ha både en Altinn 2 tjeneste(med tilhørende autorisasjonsregler og oppsett i SRR), samt en Altinn 3 Broker Resource med tilganger definert i Ressursregisteret.
Dette er et naturlig mønster dersom man skal sette opp overgangsløsning for en eksisterende tjeneste, men er verdt å være OBS på dersom man vil sette opp dedikerte test-tjenester.

1. Forespørsler som har muligheten til å spesifisere "*ServiceCode*"/"*ServiceEdition*".
I dette tilfellet vil Altinn umiddelbart avgjøre at forespørselen skal overføres til Altinn 3 via "*Altinn 3 Broker Bridge*".
I tilfeller der "*ServiceCode*/"*ServiceEdition"* kan spesifiseres, men ikke er spesifisert, vil ikke forespørsler bli overført til Altinn 3.
2. Forespørsler som ikke har muligheten til å spesifisere "*ServiceCode*"/"*ServiceEdition*".
I dette tilfellet vil det først bli bli gjort oppslag i Altinn 2 Formidlings datalager. Dersom ingenting blir funnet i Altinn 2, blir forespørsel overført til Altinn 3.
3. Filer i Altinn 3 kan ikke være større enn 1 GB, da dette er den maksimale fil størrelsen i Altinn 2. Tjenesten i Altinn 3 skal konfigureres med denne MaxFileSize begrensningen.
4. Fil data og metadata vil bli lagret i Altinn 3 datalager, mens Altinn 2 Formidlingstjeneste kall blir overført til Altinn 3.
5. Kvitteringer vil ikke lenger bli lagret i Altinn 2, i stedet vil en pseudokvittering bli generert fra Altinn 3 metadata. Kvitterings-tjeneste i Altinn 2 vil ikke lenger brukes for overførte formidlingstjenester. Hvis du er avhengig av å bruke kvitteringer i sammenheng med formidlingstjeneste, kan du sende inn en funksjonsforespørsel.
6. Bruk av manifestfilen i innsendt fil data er ikke lenger støttet i Altinn 3. Men det er mulig å skru på funksjonalitet for manifest-filer i overgangsløsningen. Se [beskrivelse under](#manifest-fil) for detaljer.

<img src="altinn3-broker-transition-flowchart.svg" alt="Formidlingstjeneste Overgangsløsning flytdiagram"/>

## Overførte formidlingstjenester - hva du kan forvente

Når Altinn 3 Overgangsløsning for formidlingstjeneste funksjonalitet er aktivert i Altinn 2, kan du forvente følgende:

1. Tjenesteeiere kan be om at Altinn 2 Formidlingstjenester blir overført til Altinn 3 tjenester.
2. Sluttbrukere som bruker disse tjenestene vil deretter overføre data til Altinn 3 i stedet for Altinn 2 datalager.
3. Filer som var tilgjengelige i Altinn 2 for formidlingstjenesten vil ikke lenger være tilgjengelige.
4. Alle nye filer og statusendringer vil skje i Altinn 3 løsningen.
5. Tjenesteeiere med overførte formidlingstjenester må administrere tilgangsrettigheter i både Altinn 3 og Altinn 2 samtidig, da disse ikke automatisk blir synkronisert.

### Manifest fil

Siden manifestfiler er blitt avviklet i Altinn 3 Formidlingstjeneste, har vi lagt til en funksjon for å muliggjøre oppretting/oppdatering av manifestfiler for overgangsløsningen.
Funksjonen er implementert som en del av nedlastingsoperasjonen fra Altinn 2-siden, og på grunn av større påvirkning på ytelsen, er den som standard deaktivert.
For å aktivere denne funksjonen må du [konfigurere Altinn 3-resursen](../getting-started/#konfigurer-ressurs-til-bruk-i-overgangsløsningen) med følgende egenskaper:

- UseManifestFileShim = true
- ExternalServiceCodeLegacy = den eksterne tjenestekoden til Altinn 2-tjenesten.
- ExternalServiceEditionCodeLegacy = den eksterne tjenesteutgavekoden til Altinn 2-tjenesten.

Manifestfilen opprettes basert på PropertyList spesifisert ved initialisering av en filoverføring, samt ExternalServiceCodeLegacy og ExternalServiceEditionCodeLegacy spesifisert på ressursen.
Den valgfrie listen "FileList" vil ikke lenger lages i manifestet.

**Eksempel på manifestfil:**

```xml
<?xml version="1.0" encoding="utf-16"?>
<BrokerServiceManifest xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schema.altinn.no/services/ServiceEngine/Broker/2015/06">
  <ExternalServiceCode>4752</ExternalServiceCode>
  <ExternalServiceEditionCode>1</ExternalServiceEditionCode>
  <SendersReference>ref:1245</SendersReference>
  <Reportee>837884942</Reportee>
  <SentDate>2024-10-18T08:43:48.453</SentDate>
  <FileList />
  <PropertyList>
    <Property>
      <PropertyKey>senderPhone</PropertyKey>
      <PropertyValue>12345678</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>senderName</PropertyKey>
      <PropertyValue>Ola Normann</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>messageType</PropertyKey>
      <PropertyValue>SignedMortgageDeed</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>notificationMode</PropertyKey>
      <PropertyValue>AltinnNotification</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>senderEmail</PropertyKey>
      <PropertyValue>ola.normann@norge.no</PropertyValue>
    </Property>
    <Property>
      <PropertyKey>coverLetter</PropertyKey>
      <PropertyValue>XmlAttached</PropertyValue>
    </Property>
  </PropertyList>
</BrokerServiceManifest>
```

{{<children />}}
