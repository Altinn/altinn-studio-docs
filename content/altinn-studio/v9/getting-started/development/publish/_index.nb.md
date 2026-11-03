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
I forhåndsvisningen i Altinn Studio kan du se hvordan skjemaet ser ut, og teste enkel logikk som skjuler felter. Vil du teste hele tjenesten, inkludert egen kode og oppslag mot for eksempel Enhetsregisteret og Folkeregisteret, må du publisere den til et miljø der alt tjenesten er avhengig av, er tilgjengelig.

Som tjenesteeier kan du i utgangspunktet publisere til to miljøer: test og produksjon. Testmiljøet heter TT02 i listen over miljøer, og vi bruker begge navnene om hverandre.

### Bygge og publisere tjenesten
Før du kan publisere tjenesten til et miljø, må du bygge den. Det betyr enkelt og greit at Altinn Studio setter sammen alt tjenesten trenger for å kjøre, til én ferdig pakke ut fra det du har laget. Denne pakken kaller vi et bygg, og miljøet vet hvordan det skal håndtere den. Teknisk sett er bygget en webapplikasjon i en Docker-container. [[FIX BEFORE MERGE: setningen som begynte med «Vi gir hvert …» er ikke skrevet ferdig]]

### Teste tjenesten i testmiljø
