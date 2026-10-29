---
title: "ALTINNAPP1002: PDF-systemoppgaven lister noe som ikke gir innhold i PDF-en"
description: "autoPdfTaskIds lister PDF-oppgaven selv, en oppgave uten UI-mappe eller en tom oppføring ved siden av andre"
weight: 102
---

Denne diagnostikken meldes når en PDF-systemoppgave uten `pdfLayoutName` lister noe i
`<altinn:pdfConfig><altinn:autoPdfTaskIds>` som ikke gir innhold i PDF-en. Det gjelder når
oppføringen

- er tom
- er PDF-oppgaven selv
- er en oppgave-ID som ikke har noen UI-mappe `ui/<oppgave-id>` i appen

Meldingen navngir PDF-oppgaven og oppføringen, og sier hvorfor oppføringen ikke gir innhold.

Den automatiske PDF-en viser hver oppgave du lister, fra UI-mappen til den oppgaven, og hopper
over alle andre oppføringer. En tom oppføring peker ikke på noen oppgave. Sidene i `pages.order` i
UI-mappen til PDF-oppgaven er det brukeren ser mens oppgaven kjører, og de blir aldri en del av
PDF-en. En
oppgave uten UI-mappe har ingenting å vise.

Har PDF-oppgaven `pdfLayoutName`, ser appen bort fra `autoPdfTaskIds`, og regelen sjekker
ingenting. Lister `autoPdfTaskIds` bare tomme oppføringer, melder bygget
[ALTINNAPP1000]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1000" >}})
i stedet.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Fjern oppføringen, eller rett oppgave-ID-en. Den vanligste årsaken er en skrivefeil i ID-en. Er
oppføringen den eneste som peker på en oppgave, lister du i stedet en oppgave som har en UI-mappe,
eller du setter `pdfLayoutName`. Uten en oppgave å vise melder bygget ALTINNAPP1000.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
