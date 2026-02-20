---
title: Definere egne prosess-hooks
linktitle: Prosess-hooks
description: Slik skriver du kode som skal kjøres før eller etter at en oppgave er startet eller avsluttet.
toc: true
tags: [needsReview]
---

{{%notice info%}}
Funksjonaliteten beskrevet på denne siden krever minimum versjon 7 av Altinn-nugets.
{{%/notice%}}

Du kan skrive egendefinert kode som kjøres når en oppgave i prosessen starter, avsluttes eller forlates. Alle registrerte klasser kjøres for hver oppgave som starter eller avsluttes. Det er derfor viktig at du tar høyde for dette hvis du kun ønsker at koden skal kjøres i forbindelse med spesifikke oppgaver.

## Kjøre egendefinert kode før en oppgave starter

For å få egendefinert kode kjørt når en oppgave i prosessen startes, må du opprette en klasse som bruker `Altinn.App.Core.Features.IProcessTaskStart` og registrere denne som en transient.

Du kan legge til flere klasser som bruker dette grensesnittet. Alle kjøres hver gang en oppgave i prosessen starter.

[Se grensesnittet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskStart.cs)

## Kjøre egendefinert kode når en oppgave avsluttes

For å få egendefinert kode kjørt når en oppgave i prosessen avsluttes, må du opprette en klasse som bruker `Altinn.App.Core.Features.IProcessTaskEnd` og registrere denne som en transient.

Du kan legge til flere klasser som bruker dette grensesnittet. Alle kjøres hver gang en oppgave i prosessen avsluttes (videre til neste steg).

[Se grensesnittet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskEnd.cs)

## Kjøre egendefinert kode når en oppgave avbrytes

For å få egendefinert kode kjørt når en oppgave i prosessen avbrytes, må du opprette en klasse som bruker `Altinn.App.Core.Features.IProcessTaskAbandon` og registrere denne som en transient.

Du kan legge til flere klasser som bruker dette grensesnittet. Alle kjøres hver gang en oppgave i prosessen blir avbrutt.

[Se grensesnittet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskAbandon.cs)
