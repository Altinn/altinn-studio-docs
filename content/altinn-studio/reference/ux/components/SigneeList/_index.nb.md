---
title: SigneeList
linktitle: SigneeList
description: En komponent som gir oversikt of signeringsprosessen
schemaname: SigneeList 
weight: 10 
toc: true
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under arbeid.
{{% /notice %}}

---

## Bruk

*SigneeList*-komponenten gir instanseeier og signatarer et overblikk over signeringsprosessen. Den viser hvorvidt delegering 
av rettigheter og kommunikasjon har gått bra, og hvorvidt signataren har signert ennå.

Dersom brukerstyrt delegering er brukt til å delegere signeringsrettigheter til en organisasjon, så vil navnet på signataren
populeres etter at en person har vært inne og signert på vegne av organisasjonen.

### Anatomi

![SigneeList anatomi](signeelist-anatomy.png "SigneeList statuser")

1. **Tittel** - Tittel på komponenten.
2. **Hjelp** - Klikk for en pop-up med ekstra informasjon. Valgfritt.
3. **Beskrivelse** - Beskrivelse av komponenten.
4. **SigneeList Tabell** - Table containing the status of the signees.
    * Column 1 - Name of the signee.
    * Column 2 - Name of organization if signing on behalf of a company
    * Column 3 - Status of the signing process for the signee

## Konfigurasjon

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
        }
      },