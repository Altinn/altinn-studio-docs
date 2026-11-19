---
title: "ALTINNAPP1017: datatypen hører til en oppgave som ikke finnes"
description: "taskIds på en datatype i applicationmetadata.json lister en oppgave som ikke finnes i process.bpmn"
weight: 117
---

Denne diagnostikken melder fra når `taskIds` på en datatype i `applicationmetadata.json` har en
oppføring som ikke er id-en til en oppgave eller systemoppgave i `config/process/process.bpmn`.
Det gjelder også en tom oppføring, `null`, og en oppgave som ligger inne i en underprosess, som
appen ikke kjører. Meldingen navngir datatypen, oppføringen og hvorfor den ikke peker på en
oppgave. En datamodell (en datatype med `classRef`) i en tilstandsløs app kan ha navnet på
UI-mappen appen viser, i `taskIds`, og regelen melder ikke fra om det.

Prosessen stopper aldri i en slik oppgave. Lister `taskIds` også en oppgave som finnes, har
oppføringen ingen virkning. Ellers kan ikke brukerne endre dataene i datatypen gjennom appen, og
`minCount` og valideringen gjelder aldri.

Kategori `Process`, alvorlighetsgrad **advarsel**. Det er en advarsel fordi det kan være riktig
å beholde en datatype for en oppgave du har fjernet: gamle instanser har fortsatt data i den.

Rett oppføringen, eller fjern den fra `taskIds`.
