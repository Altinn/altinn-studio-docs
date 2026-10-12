---
draft: true
title: "ALTINNAPP1017: datatypen hører til en oppgave som ikke finnes"
description: "taskId på en datatype i applicationmetadata.json navngir ingen oppgave i process.bpmn"
weight: 117
---

Denne diagnostikken meldes når en datatype i `config/applicationmetadata.json` har en `taskId`
som ikke er id-en til en oppgave i `config/process/process.bpmn`. Meldingen navngir datatypen
og `taskId`. Hører id-en til noe annet enn en oppgave, for eksempel en gateway, en hendelse
eller en oppgave inne i en underprosess, som appen ikke kjører, sier meldingen det.

Bare et `<bpmn:task>`- eller `<bpmn:serviceTask>`-element rett i prosessen teller, og id-en må
stemme nøyaktig. En tom `taskId` stemmer ikke med noen oppgave. Prosessen stopper aldri ved
oppgaven, så brukerne kan aldri endre dataene i datatypen gjennom appen, og `minCount` og
valideringen gjelder aldri.

En stateless-app kan finne datamodellen sin gjennom en `taskId` som navngir UI-mappen i
`onEntry.show`. Regelen melder ikke en slik datamodell.

Regelen er bare en advarsel, fordi det kan være bevisst å beholde en datatype for en oppgave du
har fjernet: gamle instanser har fortsatt dataene.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Sett `taskId` til oppgaven dataene hører til, eller fjern den.
