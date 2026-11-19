---
title: "ALTINNAPP1009: samme id brukes flere ganger i prosessen"
description: "To eller flere elementer eller sekvensflyter i process.bpmn har samme id"
weight: 109
---

Denne diagnostikken melder fra når flere elementer i `config/process/process.bpmn` har samme
`id`. Regelen teller starthendelser, oppgaver, systemoppgaver, eksklusive gatewayer,
slutthendelser og sekvensflyter under ett. Meldingen navngir id-en og hvor mange elementer som
bruker den, og står på det andre elementet med id-en.

BPMN krever at hver id er unik i filen. Appen kan sende en instans feil vei når to elementer har
samme id. Siden **Prosess** i Altinn Studio Designer fjerner dessuten elementer med en id den
allerede har lest, så de forsvinner neste gang du lagrer prosessen derfra. Regelen sjekker hele
prosessen, også elementer ingen instans kan nå.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi hvert element sin egen id, og oppdater sekvensflytene og listene `<bpmn:incoming>` og
`<bpmn:outgoing>` som peker på den.
