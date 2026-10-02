---
draft: true
title: "ALTINNAPP0601: gammel eFormidling-konfigurasjon støttes ikke"
description: "eFormidling-blokken i applicationmetadata.json er ikke lenger støttet"
weight: 61
---

Denne diagnostikken meldes når `applicationmetadata.json` inneholder en
`eFormidling`-blokk. Blokken er ikke lenger støttet av denne versjonen av app-backend.

Kategori `Deprecation`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Konfigurer eFormidling på en eFormidling-systemoppgave i stedet.

Apper satt opp før versjon 8.9 må i tillegg fjerne den gamle konfigurasjonen fra
`appsettings.json`, ikke bare fra `applicationmetadata.json`.

Se [veiledningen for eFormidling-systemoppgaven]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}).
