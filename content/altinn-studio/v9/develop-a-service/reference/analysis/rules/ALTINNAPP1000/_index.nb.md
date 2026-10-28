---
draft: true
title: "ALTINNAPP1000: PDF-systemoppgaven har ingenting å vise"
description: "En PDF-systemoppgave har verken autoPdfTaskIds eller en egen UI-mappe"
weight: 100
---

Denne diagnostikken meldes når en PDF-systemoppgave i `config/process/process.bpmn` ikke sier
hva PDF-en skal inneholde. Oppgaven lister ingen oppgaver i
`<altinn:pdfConfig><altinn:autoPdfTaskIds>`, og appen har ingen UI-mappe `ui/<oppgave-id>` med
en `Settings.json`. Meldingen navngir oppgaven.

Uten regelen feiler PDF-genereringen først når en instans kommer til oppgaven, og årsaken står
bare i loggen til PDF-generatoren.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

List oppgavene som skal være med i PDF-en, i `autoPdfTaskIds`, eller lag en UI-mappe
`ui/<oppgave-id>` med en `Settings.json` og design PDF-en selv.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
