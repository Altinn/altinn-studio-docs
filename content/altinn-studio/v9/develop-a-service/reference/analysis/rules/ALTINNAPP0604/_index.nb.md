---
title: "ALTINNAPP0604: appen ser bort fra taskId ved siden av taskIds"
description: "En datatype i applicationmetadata.json har både taskId og taskIds, og appen leser bare taskIds"
weight: 64
---

Denne diagnostikken melder fra når en datatype i `applicationmetadata.json` har både `taskId`
med en verdi og `taskIds`. Denne versjonen av app-backend støtter ikke lenger `taskId` og ser
bort fra den. Meldingen navngir datatypen og verdien i `taskId`.

Datatypen hører bare til oppgavene i `taskIds`, uansett hvilken oppgave `taskId` peker på.

Kategori `Deprecation`, alvorlighetsgrad **advarsel**.

Fjern `taskId`, og list alle oppgavene datatypen hører til, i `taskIds`.

Har datatypen bare `taskId`, melder bygget
[ALTINNAPP0603]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0603" >}})
i stedet.
