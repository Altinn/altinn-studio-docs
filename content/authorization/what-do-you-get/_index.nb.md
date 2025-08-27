---
title: Hva får du?
linktitle: Hva får du?
description: Altinn Autorisasjon tilbyr komponenter og tjenester som kan benyttes av offentlige virksomheter, systemleverandører/sluttbrukersystemer, virksomheter og innbyggere for å utføre tilgangsstyring og tilgangskontroll i tjenester på og utenfor Altinn, samt fra egne sluttbrukersystemer.
tags: [architecture, solution]
toc: false
weight: 2
---

Altinn Autorisasjon tilbyr komponenter og tjenester som kan benyttes av offentlige virksomheter, systemleverandører/sluttbrukersystemer, virksomheter og innbyggere for å utføre tilgangsstyring og tilgangskontroll i tjenester på og utenfor Altinn, samt fra egne sluttbrukersystemer.

**Ressurseier** kan opprette ressurser i Ressursregisteret for tjenester med behov for tilgangsstyring. I Ressursregisteret kan hen opprette regler som sier hvem som kan benytte en tjeneste, til hva, under hvilke forutsetninger. Dersom det er behov for at en tjeneste kun skal kunne brukes av et bestemt utvalg virksomheter, kan dette styres gjennom tilgangslister.  
Med autorisasjonstjenesten (PDP) kan ressurseier sikre tilgangskontroll på ressursen. Tilgangskontrollen støtter brukere fra både ID-porten og Maskinporten.

**Sluttbrukersystem** kan bruke våre API-er til å autentisere sine brukere mot offentlige tjenester.

**Sluttbruker** kan opptre på vegne av en virksomhet eller seg selv. I Altinns portal eller via sluttbrukersystem kan bruker velge hvem vedkommende opptrer på vegne av. Sluttbruker kan se hvilke fullmakter som finnes, og hvem som har fullmakt på vegne av seg selv. Fullmakter kan gis eller trekkes tilbake via både brukergrensesnitt og API.

**Autentisering** Altinn Autorisasjon tilbyr funksjonalitet for autentisering med ID-porten og Maskinporten mot Altinn. I tillegg tilbyr vi Systembruker som gjør det mulig å gjøre finkornet tilgangsstyring gjennom Maskinporten.
{{<children />}}

<!-- Altinn skal i perioden 2022-2026 [modernisere](functionalareas.drawio.svg) sin autorisasjonsarkitektur og komponenter. Derfor er beskrivelsen nedenfor en blanding av nåværende og fremtidig tilstand.

Altinn bruker [attributt-basert tilgangskontroll (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).

Kort sagt, Altinn autorisasjon kontrollerer tilgang gjennom regler definert i XACML Policies. Hver regel definerer hvilken ressurs regelen beskriver, hvilken operasjon som kan utføres, og hvem som kan utføre den.

## Altinn Autorisasjon - Komponenter

Diagrammet nedenfor viser fremtidige komponenter i en ny Altinn-arkitektur.

![Fremtidig løsning Altinn Autorisasjon](authorization_solution_components_future.drawio.svg "Fremtidig løsning Altinn Autorisasjon")

Denne arkitekturen definerer følgende komponenter:

### Tilgangsadministrasjon

Denne komponenten vil være ansvarlig for å administrere tilgang for både brukere og organisasjoner.

- Gi sluttbrukerne en oversikt over hvilke rettigheter de og andre har.
- Administrasjon av AccessGroups.
- Mulighet for å delegere og tilbakekalle rettigheter.

[Les mer](accessmanagement)

### Ressursregister

Denne komponenten vil gi et register over:

- Altinn 3 Apps.
- Altinn 2 apper.
- Eksterne tjenester vert på andre plattformer, men registrert i Altinn for autorisasjon.

[Les mer](resourceregistry)

### Adgangskontroll

PDP-komponenten er ansvarlig for å vurdere om brukeren skal få tilgang til en gitt ressurs eller ikke.

Komponenten har en kontekstbehandler, PIP-funksjonalitet, PRP-informasjon og mer.

[Les mer](pdp)

### Altinn Samtykke

Denne komponenten gir funksjonalitet for å be om samtykke og gi samtykke.

[Les mer](https://github.com/Altinn/altinn-authorization/issues/22) -->
