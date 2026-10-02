---
title: "ALTINNAPP0601: gammel eFormidling-konfigurasjon støttes ikke"
description: "eFormidling-blokken i applicationmetadata.json er ikke lenger støttet"
weight: 61
---

Denne diagnostikken meldes når `applicationmetadata.json` inneholder en
`eFormidling`-blokk. Blokken er ikke lenger støttet av denne versjonen av app-backend.

Kategori `Deprecation`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Konfigurer eFormidling på en BPMN eFormidling-tjenesteoppgave i stedet.

Apper satt opp før versjon 8.9 må i tillegg fjerne den gamle konfigurasjonen fra
`appsettings.json`, ikke bare fra `applicationmetadata.json`.

Se veiledningen for eFormidling-tjenesteoppgaven her: 
https://docs.altinn.studio/nb/altinn-studio/v8/guides/development/eformidling/service-task/
