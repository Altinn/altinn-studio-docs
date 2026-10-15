---
draft: true
title: "ALTINNAPP1002: PDF-systemoppgaven tar med en oppgave uten UI-mappe"
description: "autoPdfTaskIds lister en oppgave som ikke har noen UI-mappe"
weight: 102
---

Denne diagnostikken meldes når en PDF-systemoppgave lister en oppgave i `autoPdfTaskIds`, men
appen ikke har noen UI-mappe `ui/<oppgave-id>` for den oppgaven. PDF-en får da ikke noe innhold
fra den oppgaven. Meldingen navngir PDF-oppgaven og oppgaven den lister.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Kontroller at oppgave-id-en er riktig. Den vanligste årsaken er en skrivefeil.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
