---
title: Hva får du?
linktitle: Hva får du?
description: Altinn Autorisasjon tilbyr komponenter og tjenester som kan benyttes av offentlige virksomheter, systemleverandører/sluttbrukersystemer, virksomheter og innbyggere for å utføre tilgangsstyring og tilgangskontroll i tjenester på og utenfor Altinn, samt fra egne sluttbrukersystemer.
tags: [architecture, solution]
toc: false
weight: 2
---

Altinn Autoriasjon tilbyr komponenter og tjenster som kan benyttes av offentlig virksomhet, systemleverandører/sluttbrukersystem, virksomheter og innbyggere for å utføre tilgangstyring og tilganskontorll i tjenster på og utenfor Altinn, samt fra egne sluttbrukersystemer.

**Ressurseier** kan opprette ressurser i ressursregisteret for tjenester med behov for tilgangsstyring. I ressursegisteret kan hen opprette regler som sier hvem som kan benytte en tjenste, til hva, umder hvilke forutsettninger. Dersom det er behov vor at en tjeneste kun skal kunne brukes av ett bestemt utvalg virksomheter kan dette styres gjennom tilgangslister
Ved hjelp av vår autorisasjonstjenste (PDP) kan ressurseier sikre tilgangskontroll på ressursen. Tilgangskontrollen støtter brukere fra både ID-porten og maskinporten

**Sluttbrukersystem** kan bruke våre APIer til å autentisere sine brukere mot offentlige tjenster.

**Sluttbruker** kan både opptre på vegne av en virksomhet eller seg selv. I Altinns portal eller via sluttbrukersystem kan bruker velge hvem hen opptrer på vegne av. Sluttbruker kan se hva han har fullmakt til på vegne av hvem, samt hvem som har fullmakt på vegne av seg selv. Dersom det er behov for å gi eller trekke tilbake fullmakter kan dette gjøres både via brukergransesnitt og API

**Autentisering** Altinn autorisasjon tilbyr funsjonalitet for autentisering med Id-porten og maskinporten mot Altinn. I tillegg tilbyr vi [Systembruker]() som gjør det mulig å gjøre finkornet tilgangsstyring gjennom maskinporten.

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
