---
title: Hva får du?
linktitle: Hva får du?
description: Autorisasjonskomponentene gir tilgangsstyring og kontrollfunksjonalitet for digitale og analoge tjenester som vert i Altinn-plattformen eller andre steder.
tags: [architecture, solution]
toc: false
weight: 1
---
Altinn skal i 2022-2026 modernisere sin autorisasjonsarkitektur og komponenter. Derfor er beskrivelsen nedenfor en blanding av som den er og skal være.

Altinn bruker [attributt-basert tilgangskontroll (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).

Kort sagt, Altinn autorisasjon kontrollerer tilgang gjennom regler definert i XACML Policies. Hver regel definerer hvilken ressurs regelen beskriver, hvilken operasjon og hvem som kan utføre den.

## Altinn Autorisasjon - Komponenter

Diagrammet nedenfor viser fremtidige komponenter i en ny Altinn-arkitektur.

![Fremtidig løsning Altinn Autorisasjon](authorization_solution_components_future.drawio.svg "Fremtidig løsning Altinn Autorisasjon")

Denne arkitekturen definerer følgende komponenter.

### Tilgangsadministrasjon

Denne komponenten vil være ansvarlig for å administrere tilgang til seg selv og organisasjonen.

- Gi sluttbrukerne en oversikt over hvilke rettigheter de og andre har.
- Administrasjon av AccessGroups
- Mulighet for å delegere og tilbakekalle rettigheter

[Les mer](accessmanagement)

### Ressursregister

Denne komponenten vil gi et register over

- Altinn 3 Apps
- Altinn 2 apper
– Eksterne tjenester vert på andre plattformer, men registrert i Altinn for autorisasjon.

[Les mer](resourceregistry)

### Adgangskontroll

PDP-komponenten er ansvarlig for å vurdere om brukeren skal få tilgang til en gitt ressurs eller ikke.

Komponenten har en kontekstbehandler, PIP-funksjonalitet, PRP-informasjon og mer.
[Les mer](pdp)


### Altinn Samtykke

Denne komponenten gir funksjonalitet for å be om samtykke og gi samtykke.

[Github-problem](https://github.com/Altinn/altinn-authorization/issues/22)