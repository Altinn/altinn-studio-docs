---
draft: true
title: "ALTINNAPP1001: UI-mappen til PDF-systemoppgaven mangler pdfLayoutName"
description: "En PDF-systemoppgave har en egen UI-mappe uten pdfLayoutName"
weight: 101
---

Denne diagnostikken meldes når en PDF-systemoppgave har en egen UI-mappe `ui/<oppgave-id>`, men
`Settings.json` i mappen ikke har `pdfLayoutName`. Meldingen navngir oppgaven.

Sidene i mappen er det brukerne ser mens prosessen står på oppgaven, og `pdfLayoutName` angir
hvilken layout som blir PDF-en. Når oppgaven har en egen UI-mappe, ser appen bort fra
`autoPdfTaskIds`. Uten `pdfLayoutName` lager appen PDF-en av sidene i mappen, og i mappen
Altinn Studio lager, er det ventesiden. Lister `autoPdfTaskIds` oppgaver, feiler
PDF-genereringen i stedet.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Sett `pdfLayoutName` i `ui/<oppgave-id>/Settings.json`, eller fjern UI-mappen og list oppgavene
som skal være med i PDF-en, i `autoPdfTaskIds`.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
