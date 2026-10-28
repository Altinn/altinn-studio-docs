---
draft: true
title: "ALTINNAPP1026: pdfLayoutName peker på en side som ikke finnes"
description: "pdfLayoutName for en PDF-systemoppgave peker på en side som ikke finnes i UI-mappen til oppgaven"
weight: 126
---

Denne diagnostikken meldes når en PDF-systemoppgave i `config/process/process.bpmn` har en
UI-mappe `ui/<oppgave-id>` der `Settings.json` setter `pdfLayoutName`, men mappen ikke har
noen side `layouts/<pdfLayoutName>.json`. Meldingen navngir oppgaven og verdien i
`pdfLayoutName`.

PDF-en er siden `pdfLayoutName` peker på, og da ser appen bort fra `autoPdfTaskIds`. Finnes ikke
siden, har appen ingenting å lage PDF-en av. Appen leter etter siden med nøyaktig det navnet du
oppgir, så store og små bokstaver må stemme. Appen sjekker det samme når den starter, og starter
ikke med en slik oppgave.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Rett `pdfLayoutName` slik at den peker på en side i `ui/<oppgave-id>/layouts`, eller legg til
siden.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
