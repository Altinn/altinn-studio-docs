---
draft: true
title: "ALTINNAPP1025: PDF-systemoppgaven lister noe som ikke gir innhold i PDF-en"
description: "autoPdfTaskIds lister PDF-oppgaven selv eller en tom oppføring"
weight: 125
---

Denne diagnostikken meldes når en PDF-systemoppgave uten `pdfLayoutName` lister seg selv eller
en tom oppføring i `<altinn:pdfConfig><altinn:autoPdfTaskIds>`. Meldingen navngir PDF-oppgaven
og sier om oppføringen er oppgaven selv eller tom.

Ingen av oppføringene gir innhold i PDF-en, og den automatiske PDF-en hopper over dem. Sidene i
UI-mappen til PDF-oppgaven er det brukeren ser mens oppgaven kjører, og de blir aldri en del av
PDF-en. En tom oppføring peker ikke på noen oppgave.

Har PDF-oppgaven `pdfLayoutName`, ser appen bort fra `autoPdfTaskIds`, og regelen sjekker
ingenting. Lister `autoPdfTaskIds` bare tomme oppføringer, melder bygget
[ALTINNAPP1000]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1000" >}})
i stedet.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Fjern oppføringen fra `autoPdfTaskIds`.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
