---
draft: true
title: "ALTINNAPP1011: eksklusive gatewayer danner en løkke"
description: "Eksklusive gatewayer fører tilbake til hverandre, eller en gateway til seg selv, uten noen oppgave imellom"
weight: 111
---

Denne diagnostikken meldes når eksklusive gatewayer i `config/process/process.bpmn` fører tilbake
til hverandre uten noen oppgave imellom, eller når en gateway fører tilbake til seg selv.
Meldingen navngir gatewayene i løkken, og regelen melder hver løkke én gang.

Når appen flytter en instans, følger den flytene gjennom gatewayer til den kommer til en oppgave
eller en end event. Appen merker ikke når gatewayene går i ring, så en instans som følger løkken,
får appen til å gå i ring helt til appen krasjer. Regelen teller bare flytene hver gateway lister i
`<bpmn:outgoing>`, og kontrollerer bare gatewayer en instans kan nå. Regelen er bare en advarsel,
siden betingelsene på flytene kan holde alle instanser utenfor løkken.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Legg en oppgave inn i løkken, eller fjern en av sekvensflytene i den.
