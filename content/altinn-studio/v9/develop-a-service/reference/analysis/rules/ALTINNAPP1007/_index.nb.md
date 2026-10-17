---
draft: true
title: "ALTINNAPP1007: elementet har mer enn én utgående sekvensflyt"
description: "En starthendelse, oppgave eller systemoppgave har mer enn én sekvensflyt ut"
weight: 107
---

Denne diagnostikken meldes når en starthendelse, oppgave eller systemoppgave i
`config/process/process.bpmn` har mer enn én utgående sekvensflyt. Meldingen navngir elementet
og flytene.

Bare en eksklusiv gateway kan velge mellom flyter. Ut fra andre elementer følger appen hver flyt
som har elementet som `sourceRef`. Appen vet da ikke hvilken flyt den skal ta, og feiler når en
instans forlater elementet. Regelen teller ikke med en flyt uten mål, eller med et mål appen ikke
kjører, siden appen hopper over den. Regelen kontrollerer bare elementer en instans kan nå fra en
starthendelse.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Send flytene gjennom en eksklusiv gateway: Koble elementet til gatewayen med én flyt, og la de
andre flytene starte i gatewayen.

Se [hvordan du styrer flyten ut av en gateway]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
