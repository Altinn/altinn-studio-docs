---
title: Komponentarkitektur - Altinn Autorisasjon
linktitle: Arkitektur
description: Altinn Autorisasjon består av flere komponenter.
tags: [architecture, solution]
weight: 999
toc: false
---

Da vi definerte autorisasjonskomponentene, tok vi utgangspunkt i [XACML-referansearkitekturen](https://en.wikipedia.org/wiki/XACML).

## Konseptuelle komponenter

Vi har definert følgende konseptuelle komponenter/funksjonsområder fra referansearkitekturen.

### PDP - Policy Decision Point

Policy Decision Point har ansvar for å avgjøre om en autorisasjonsforespørsel skal godkjennes eller ikke. Beslutningen baseres på regler og informasjon om ressursen og brukeren/systemet som forsøker å få tilgang og gjennomføre en operasjon på ressursen.

[Les mer](/nb/authorization/reference/architecture/accesscontrol/)

### PAP - Policy Administration Point

Har ansvar for å definere og administrere autorisasjonspolicyer.

I Altinn Autorisasjon finnes følgende komponenter som fungerer som PAP:

- Altinn Studio for å definere regler for apper
- Altinn Access Management for å definere delegerte regler
- Altinn Resource Registry som gjør det mulig å administrere ressurspolicyer

[Les mer](/nb/authorization/what-do-you-get/accessmanagement/pap/)

### PRP - Policy Retrieval Point

Policy Retrieval Point har ansvar for å finne riktig policy.

I Altinn finnes det to kilder til policyer: Altinn Access Management for delegerte policyer og Altinn Resource Registry.

[Les mer](/nb/authorization/reference/architecture/accesscontrol/prp/)

### Context Handler - i produksjon

Har ansvar for å berike beslutningsforespørselen slik at autorisasjon kan evalueres korrekt. [Les mer](/nb/authorization/reference/architecture/accesscontrol/contexthandler/)

### PIP - Policy Information Point - i produksjon

Har ansvar for å gi informasjon om subjektet og ressursen til konteksthandleren.

### PEP - Policy Enforcement Point - i produksjon

Har ansvar for å håndheve beslutningen fra PDP. PEP er komponenten som blokkerer en forespørsel eller slipper den gjennom.

[Les mer](/nb/authorization/reference/architecture/accesscontrol/pep/)

For en funksjonell beskrivelse, se detaljer i [løsningskomponenter for applikasjoner](/nb/authorization/).

## Konstruksjonsdiagram Autorisasjon

![Arkitektur](authorizationbff.drawio.svg "Konstruksjonsdiagram Altinn Autorisasjon")

{{<children />}}
