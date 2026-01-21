---
title: Signing (Signering)
linktitle: Signing (Signering)
description: Komponenter relatert til signeringsprosessen
schemaname: Signing # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under arbeid.
{{% /notice %}}

---

## SigneeList

*SigneeList*-komponenten gir instanseeier og signatarer et overblikk over signeringsprosessen. Den viser hvorvidt delegering 
av rettigheter og kommunikasjon har gått bra, og hvorvidt signataren har signert ennå.

Dersom brukerstyrt delegering er brukt til å delegere signeringsrettigheter til en organisasjon, så vil navnet på signataren
populeres etter at en person har vært inne og signert på vegne av organisasjonen.

### Anatomi

![SigneeList anatomi](signeelist-anatomy.png "SigneeList statuser")

1. **Tittel** - Tittel på komponenten.
2. **Hjelp** - Klikk for en pop-up med ekstra informasjon. Valgfritt.
3. **Beskrivelse** - Beskrivelse av komponenten.
4. **SigneeList-tabell** – Tabell som viser status for signatarene.
    * Kolonne 1 – Navn på signatar.
    * Kolonne 2 – Navn på organisasjon ved signering på vegne av selskap.
    * Kolonne 3 – Status for signeringsprosessen for signataren.

## SigneeList Konfigurasjon

### Legg til komponenten / Eksempel

      {
        //Komponenten sin ID
        "id": "signee-list", 
        //Komponent-type, må være ´SigneeList´
        "type": "SigneeList",
        //Egendefinerte tekster
        "textResourceBindings": {
          //Tittel
          "title": "Personer som skal signere",
          //Beskrivelse
          "description": "Personer som skal signere beskrivelse",
          //Hjelpetekst pop-up - valgfritt
          "help": "Dette er personer som skal signere"
          //Tittl på oppsummering av komponenten. Brukes i pdf - valgfritt
          "summaryTitle": "Følgende har signert"
        }
      },

---

## SigningActions

**SigningActions**-komponenten tar hensyn til den påloggede brukeren og tilstanden til signeringstrinnet for å vise handlinger som brukeren kan utføre.
Komponenten kan kun brukes på et signeringssteg.

### Anatomi

![SigningActions anatomi](signing-actions.svg "De ulike visningene av SigningActions")

1. Brukeren er en signatar, og har ikke signert ennå. Siden avkrysningsboksen ikke er krysset av, er signeringsknappen grået ut.
2. Brukeren er en signatar, og har ikke signert ennå. Avkrysningsboksen er krysset av, så signeringsknappen er aktiv.
3. Brukeren er instanseieren. Ikke alle signatarer har signert, så innleveringsknappen er grået ut. Instanseieren kan avbryte signeringsprosessen med avbryt-knappen.
4. Brukeren er en signatar, og har ikke signert ennå. Noe har gått galt ved forsøk på signering, en feilmelding vises.
5. Brukeren er en signatar, og har signert. Komponenten viser en tittel og sammendrag som bekrefter dette, og en knapp for å navigere til innboksen vises.
6. Brukeren er instanseieren. Alle obligatoriske signaturer er fullført, så de kan nå sende inn skjemaet. De kan også avbryte.
7. Brukeren er instanseieren og har signert selv. Ikke alle obligatoriske signaturer er fullført, så de kan ikke sende inn skjemaet. De kan avbryte.
8. Brukeren er instanseieren og har sendt inn skjemaet. En knapp vises som lar dem navigere til innboksen.
9. Brukeren er instanseieren. En av signaturene er ikke gyldig. De må avbryte og fikse problemet for å fortsette.
10. Brukeren er en hvilken som helst bruker. Signeringsstatus kunne ikke hentes. Dette kan skyldes manglende internettforbindelse.

## SigningActions Konfigurasjon

Legg til følgende i sidelayouten for å inkludere komponenten:

      {
        "id": "my-id-here",
        "type": "SigningActions"
      }

---

## SigningDocumentList

**SigningDocumentList**-komponenten viser signeringspakken. Skjemadataene og eventuelle andre dokumenter som skal signeres i 
det gjeldende signeringsteget vil vises her. Komponenten kan kun brukes på et signeringsteg.

### Anatomi

![SigningDocumentList anatomi](signingdocumentlist-anatomy.png "SigningDocumentList")

Komponenten består av:

1. **Tittel** - Komponenttittel.
2. **Hjelp** - Klikk for hjelp-popup. Valgfritt.
3. **Beskrivelse** - Beskrivelse.
4. **Innhold** - En tabell som viser signeringspakken. Dette inkluderer navn, vedleggstype, størrelse og en nedlastingsknapp for hver oppføring.

## SigningDocumentList Konfigurasjon - Eksempel

En datamodell må opprettes for å lagre eventuelle tilleggsdokumenter for signeringspakken:

    {
    "id": "extra-documents-to-sign",
    "allowedContentTypes": [
        "application/pdf",
        "image/png",
        "text/plain",
        ...
    ],
    "taskId": "task-where-instance-owner-adds-documents",
    ...  
    },

Signeringspakken må defineres i process.bpmn-filen:

    <altinn:signatureConfig>
      <altinn:dataTypesToSign>
        //Skjemadataene er en del av signeringspakken
        <altinn:dataType>ref-data-as-pdf</altinn:dataType>
        //De ekstra dokumentene er en del av signeringspakken
        <altinn:dataType>extra-documents-to-sign</altinn:dataType>
      </altinn:dataTypesToSign>
    </altinn:signatureConfig>
Komponenten legges til i et side-layout slik:

    {
        //ID-en til komponenten
        "id": "signing-documents",
        //Typen, må settes til SigningDocumentList
        "type": "SigningDocumentList",
        "textResourceBindings": {
        //Tittelen
        "title": "Dokumenter som skal signeres",
        //Beskrivelsen
        "description": "Dokumenter som skal signeres beskrivelse"
        }
    },

Vedleggstypen til et dokument kan endres ved å legge til en eller flere tags.
