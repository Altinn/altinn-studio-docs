---
title: Tilgangsstyring
linktitle: Tilgangsstyring-melding
description: Oversikt over tilgangsstyring for Altinn Melding.
tags: []
toc: true
weight: 14
---

## Tilgangsstyring for melding

Tilgangsstyring for en melding defineres av ressursen som er knyttet til meldingen.
Ressurser tilhører en organisasjon og kan opprettes og forvaltes i [Altinn Studio](https://altinn.studio/).

På ressursen kan du definere hvilke tilgangspakker og roller en bruker må ha for å kunne lese meldingen, og mer.
Ressurser som brukes for meldinger bør ha ressurstypen `correspondence service`.
Du kan lese om ressurser og tilgangsstyring [her](https://docs.altinn.studio/nb/authorization/).

## Tilgangsstyring for vedlegg

Vår løsning gir deg muligheten til å styre tilgang til vedlegg på en melding. I noen tilfeller kan det være at den som fordeler post for virksomheten ikke skal kunne se vedlegget. Dette kan for eksempel være Politiets utsending av meldingen: Straffesak.
Virksomheter tildeler tilgang til meldingen til den som skal fordele meldingen til saksbehandlere, men de får ikke tilgang til å lese vedlegget. 

### Slik setter du tilgangsstyring for et vedlegg

Tilgangsstyring for et vedlegg styres av ressursen som er knyttet til vedlegget.
Når en melding med vedlegg initialiseres samlet via initialize and upload-endepunktet, vil vedleggene som opprettes bli knyttet til samme ressurs som meldingen.

For å få ulik tilgangsstyring på meldingen og vedleggene må de initialiseres separat med ulike ressurser:

- Initialiser vedleggene med sin egen ressurs som definerer hvem som har lov til å se og laste ned vedleggene.
- Initialiser meldingen med vedleggene som *existing attachments*, og med en ressurs som definerer hvem som har lov til å lese meldingen.

#### Kontaktinformasjon
Vi hører gjerne fra dere! Send oss en e-post: [servicedesk@altinn.no](mailto:servicedesk@altinn.no)