---
title: eFormidling
description: Hvordan sette opp integrasjon med eFormidling for en app
tags: [eFormidling, integrasjon]
toc: false
weight: 15
---

Det finnes to måter å konfigurere eFormidling-integrasjon i en Altinn 3-applikasjon:

## eFormidling som systemoppgave (anbefalt)

For applikasjoner som bruker **versjon 8.9 eller nyere**. Konfigurasjon legges direkte i BPMN-prosessdefinisjonen.

[Les mer om oppsett med systemoppgave →](service-task/)

## eFormidling legacy-oppsett

Den opprinnelige metoden med konfigurasjon i `applicationmetadata.json` og `appsettings.json`. Fungerer for v8.0+, men forsvinner sannsynligvis i v9.0.

[Les mer om legacy-oppsett →](legacy/)
