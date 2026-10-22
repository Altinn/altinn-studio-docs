---
draft: true
title: "ALTINNAPP1004: sekvensflyten fører til et element appen ikke kan gå til"
description: "En sekvensflyt mangler mål eller fører til et element en instans ikke kan gå til"
weight: 104
---

Denne diagnostikken meldes når en sekvensflyt i `config/process/process.bpmn` fører et sted en
instans ikke kan gå. Meldingen navngir flyten og hva som er galt med den:

- flyten har ingen `targetRef`, eller `targetRef` peker ikke på noe element i prosessen
- flyten fører til et element appen ikke kjører, for eksempel `<bpmn:parallelGateway>`,
  `<bpmn:subProcess>` eller et element uten BPMN-navnerommet
- flyten fører til en start event

En instans kan bare gå til en oppgave, en systemoppgave, en eksklusiv gateway eller en end event.
Appen feiler når en instans forlater et element langs en flyt av de to første typene, og en instans
som havner på en start event, blir stående uten gjeldende oppgave.

Regelen kontrollerer bare flytene appen følger ut fra elementer en instans kan nå. Ut fra en start
event, oppgave eller systemoppgave hopper appen over en flyt av de to første typene så lenge en
annen flyt fra elementet fører videre. Regelen melder derfor slike flyter bare når ingen av flytene
fører videre. Ut fra en eksklusiv gateway melder regelen alle slike flyter som gatewayen lister i
`<bpmn:outgoing>`.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

La flyten føre til en oppgave, systemoppgave, eksklusiv gateway eller end event, eller fjern den.
