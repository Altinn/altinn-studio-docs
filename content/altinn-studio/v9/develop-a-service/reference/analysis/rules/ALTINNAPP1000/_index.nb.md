---
draft: true
title: "ALTINNAPP1000: PDF-systemoppgaven har ingenting å vise"
description: "En PDF-systemoppgave har verken pdfLayoutName eller autoPdfTaskIds"
weight: 100
aliases:
  - /altinn-studio/v9/develop-a-service/reference/analysis/rules/altinnapp1001/
---

Denne diagnostikken meldes når en PDF-systemoppgave i `config/process/process.bpmn` ikke sier
hva PDF-en skal inneholde. Oppgaven lister ingen oppgaver i
`<altinn:pdfConfig><altinn:autoPdfTaskIds>`, og den har ingen UI-mappe `ui/<oppgave-id>` der
`Settings.json` setter `pdfLayoutName`. Tomme oppføringer i `autoPdfTaskIds` teller ikke.
Meldingen navngir oppgaven.

PDF-en er siden `pdfLayoutName` peker på. Uten `pdfLayoutName` lager appen en automatisk PDF av
oppgavene i `autoPdfTaskIds`. Sidene i `pages.order` er det brukeren ser mens oppgaven kjører, og
de blir aldri en del av PDF-en. Appen sjekker det samme når den starter, og starter ikke med en
slik oppgave.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

List oppgavene som skal være med i PDF-en, i `autoPdfTaskIds`, eller sett `pdfLayoutName` i
`ui/<oppgave-id>/Settings.json` og utform PDF-en selv.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
