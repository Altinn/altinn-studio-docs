---
title: Publiser og test en tjeneste
linktitle: Publiser og test en tjeneste
description: Du skal publisere en tjeneste til et miljø 
weight: 3
draft: true
marp: true
headingDivider: 4
style: |
  section {
    color: #393b51
  }
header: 'Publiser og test en tjeneste'
footer: 'Altinn Studio - kom i gang'
---
## Publiser og test
Forhåndsvisning av tjenesten i Altinn Studio gir deg en mulighet til å se hvordan skjemaet ser ut samt teste enkel visninglogikk for skjuling av felter. Men ønsker du å teste hele tjenesten inkludert egen kode, API-oppslag mot enhetsregisteret, folkeregisteret osv. må du publisere tjenesten til et miljø hvor du får med alle avhengigheter. 

Som tjenesteeier har du i utgangspunktet tilgang til å publisere til to miljøer - produksjon og test. NB! Test kalles for TT02 i listen over miljøer, og vi bruker test og TT02 om hverandre.
### Bygge og publisere tjenesten
For å få tjenesten ut i et miljø må du bygge den først. Det betyr enkelt å greit å sette sammen en ferdig pakke sammen alt tjenesten trenger for å kjøre basert på det du har gjort i Altinn Studio. En ferdig sammensatt pakke som miljøet skjønner hvordan den skal håndtere kalles et bygg. For de tekniske betyr dette en web applikasjon i en Docker container. Vi gir hvert 



### Teste tjenesten i testmiljø