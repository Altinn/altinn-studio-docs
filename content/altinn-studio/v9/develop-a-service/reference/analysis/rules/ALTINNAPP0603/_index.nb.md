---
title: "ALTINNAPP0603: taskId støttes ikke"
description: "En datatype i applicationmetadata.json har taskId, som ikke lenger er støttet"
weight: 63
---

Denne diagnostikken melder fra når en datatype i `applicationmetadata.json` har `taskId` med en
verdi, men ingen `taskIds`. Denne versjonen av app-backend støtter ikke lenger `taskId`.
Meldingen navngir datatypen og oppgaven.

Appen leser bare `taskIds`, så datatypen hører ikke til noen oppgave. Appen oppretter den ikke
automatisk i oppgaven og validerer den ikke der, og brukerne kan endre dataene i den i alle
oppgaver.

Kategori `Deprecation`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Erstatt `taskId` med en `taskIds`-liste som har oppgaven: `"taskId": "Task_1"` blir
`"taskIds": ["Task_1"]`. `studioctl app upgrade v9` gjør endringen for deg.

Se [veiledningen for oppgradering fra v8 til v9]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}).
