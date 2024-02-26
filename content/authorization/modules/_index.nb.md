---
title: Komponenter og moduler
linktitle: Komponenter og moduler
description: Autorisasjonskomponentene gir tilgangsstyring og kontrollfunksjonalitet for digitale og analoge tjenester som vert i Altinn-plattformen eller andre steder.
tags: [architecture, solution]
toc: false
weight: 1
---
Altinn skal i 2022-2025 modernisere sin autorisasjonsarkitektur og komponenter. Derfor er beskrivelsen nedenfor en blanding av som den er og skal være.

Altinn bruker [attributt-basert tilgangskontroll (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).

Kort sagt, Altinn autorisasjon kontrollerer tilgang gjennom regler definert i XACML Policies. Hver regel definerer hvilken ressurs regelen beskriver, hvilken operasjon og hvem som kan utføre den.

Når vi definerte autorisasjonskomponentene, brukte vi [XACML-referansearkitekturen](https://en.wikipedia.org/wiki/XACML).

Vi har definert følgende konseptuelle komponenter/funksjonsområder fra referansearkitekturen.

### PDP – Policy Decision Point

Policyavgjørelsespunktet er ansvarlig for å avgjøre om en autorisasjonsforespørsel
er autorisert eller ikke. Den baserer sin beslutning på regler og informasjon den har om ressursen og brukeren/systemet
prøver å få tilgang til og utføre en operasjon på en ressurs.

[Les mer](pdp)

### PAP – Policy Administration Point

Ansvarlig for å definere og administrere autorisasjonspolicyer.

I Altinn Autorisasjon er det følgende komponenter som fungerer som en PAP

- Altinn Studio for å definere regler for apper
- Altinn Access Management for å definere delegerte regler
- Altinn Ressursregister tillater administrasjon av ressurspolicyer.

[Les mer](pap)

### PRP – Policy Retrieval Point

Policyinnhentingspunktet er ansvarlig for å finne riktig policy.

I Altinn er det to kilder til Policies. Altinn Access Management for delegerte policyer
og Altinn Ressursregister

[Les mer](prp)

### Context Handler - I produksjon

Ansvarlig for å berike beslutningsforespørselen slik at autorisasjonen kan evalueres korrekt. [Les mer](../.../konteksthandler)

### PIP - Policyinformasjonspunkt - I produksjon

Ansvarlig for å gi informasjon om emnet og ressursen til kontekstbehandleren. [Les mer](pip)

### PEP – Policy Enforcement Point – In Pro

Ansvarlig for å håndheve vedtaket fra PDP. PEP er komponenten som blokkerer en forespørsel eller slipper den igjennom.

[Les mer](pep)

## Altinn Autorisasjon - Komponenter

Diagrammet nedenfor viser fremtidige komponenter i en ny Altinn-arkitektur.

![Fremtidig løsning Altinn Autorisasjon](authorization_solution_components_future.drawio.svg "Fremtidig løsning Altinn Autorisasjon")

Denne arkitekturen definerer følgende komponenter.

### Altinn Access Management

Denne komponenten vil være den komponenten som er ansvarlig for administrasjon av tilgang til seg selv og organisasjon

- Gi sluttbrukerne en oversikt over hvilke rettigheter de og andre har.
- Administrasjon av AccessGroups
- Mulighet for å delegere og tilbakekalle rettigheter

[Les mer](tilgangsadministrasjon)

### Altinn Ressursregister

Denne komponenten vil gi et register over

- Altinn 3 Apps
- Altinn 2 apper
- Eksterne tjenester vert på andre plattformer, men registrert i Altinn for autorisasjonsformål.

[Les mer](ressursregister)

### Altinn tilgangsgrupper

Altinn Access Groups-komponenten inneholder de Altinn-definerte Access Groups og informasjon om medlemmer av disse gruppene.

Utsetter API for å liste og delegere tilgangsgrupper.

[Les mer](tilgangsgrupper)

### Altinn Tilgangsinformasjon

Altinn Access Information avslører API for Reportee, tilgangsgrupper og rettigheter for eksterne forbrukere. Derfor må den være svært skalerbar.

### Altinn Samtykke

Denne komponenten gir funksjonalitet for å be om samtykke og gi samtykke.

[Github-problem](https://github.com/Altinn/altinn-authorization/issues/22)

### Altinn Policy Decision Point

PDP-komponenten er ansvarlig for å vurdere om brukeren skal få tilgang til en gitt ressurs eller ikke.

Komponenten har en kontekstbehandler, PIP-funksjonalitet, PRP-informasjon og mer.
[Les mer](pdp)

### Altinn ressursrettighetsregister

Et register lar ressurseiere kontrollere hvilke organisasjoner eller personer som har tilgang til en tjenesteressurs.

[Les mer](rrr)