---
draft: true
title: "ALTINNAPP1009: flere elementer i prosessen har samme id"
description: "Mer enn ett element i process.bpmn bruker samme id"
weight: 109
---

Denne diagnostikken meldes når mer enn ett element i `config/process/process.bpmn` bruker samme
`id`. Regelen teller start events, oppgaver, systemoppgaver, eksklusive gatewayer, end events og
sekvensflyter under ett, så heller ikke en oppgave og en sekvensflyt kan ha samme id. Meldingen
navngir id-en og hvor mange elementer som bruker den, og regelen melder den én gang, på det andre
elementet. Regelen kontrollerer hele prosessen, også elementer ingen instans kan nå.

BPMN krever at id-er er unike. Når Altinn Studio åpner filen, fjerner den alle elementer som
har samme id som et element tidligere i filen. Neste gang du lagrer prosessen i Altinn Studio, er
de elementene borte. Appen kan også sende en instans til feil element, eller finne mer enn ett
neste element og feile.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi hvert element sin egen id, og oppdater referansene til id-en du endrer.
