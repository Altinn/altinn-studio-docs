---
title: "ALTINNAPP0601: gammel eFormidling-konfigurasjon støttes ikke"
tags: [needstranslation]
description: "eFormidling-blokken i applicationmetadata.json er ikke lenger støttet"
weight: 61
---

Denne diagnostikken meldes når `applicationmetadata.json` inneholder en
`eFormidling`-blokk. Blokken er ikke lenger støttet av denne versjonen av app-backend.

Kategori `Deprecation`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Konfigurer eFormidling på en BPMN eFormidling-tjenesteoppgave i stedet.
