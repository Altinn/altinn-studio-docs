---
draft: true
title: "ALTINNAPP1008: elementet har ingen utgående sekvensflyt"
description: "En start event, oppgave, systemoppgave eller eksklusiv gateway har ingen sekvensflyt ut"
weight: 108
---

Denne diagnostikken meldes når en start event, oppgave, systemoppgave eller eksklusiv gateway i
`config/process/process.bpmn` ikke har noen utgående sekvensflyt. Meldingen navngir elementet.

En instans som kommer til elementet, kan aldri gå videre. For en start event, oppgave eller
systemoppgave finner appen de utgående flytene via `sourceRef`, ikke via `<bpmn:outgoing>`. En flyt
med manglende eller feil `sourceRef` teller derfor ikke. En eksklusiv gateway har ingen utgående
flyt når den ikke lister noen flyt i `<bpmn:outgoing>`, og ingen flyt har den som `sourceRef`.
Regelen kontrollerer bare elementer en instans kan nå, så en oppgave du ikke har koblet til ennå,
melder den ikke.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Koble elementet til neste element i prosessen.
