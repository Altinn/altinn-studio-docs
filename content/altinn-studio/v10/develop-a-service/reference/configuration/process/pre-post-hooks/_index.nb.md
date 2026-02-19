---
title: Definer egendefinerte prosess-hooks
description: Slik definerer du egendefinert kode som skal kjøres før eller etter at en task er startet eller avsluttet.
toc: true
tags: [needsReview]
---

{{%notice info%}}
Funksjonaliteten beskrevet på denne siden krever minimum versjon 7 av Altinn-nugets.
{{%/notice%}}

Det er mulig å skrive egendefinert kode som kjøres når en task i prosessen starter, avsluttes eller forlates. Alle registrerte klasser blir kjørt for hver task som starter eller avsluttes. Det er derfor viktig at du tar høyde for dette hvis du kun ønsker at koden skal kjøres i forbindelse med spesifikke tasker.

## Kjør egendefinert kode før en task starter

For å få egendefinert kode kjørt når en task i prosessen startes, må du opprette en klasse som implementerer `Altinn.App.Core.Features.IProcessTaskStart` og registrere denne som en transient.

Det er mulig å legge til flere klasser som implementerer dette interfacet. Alle blir kjørt hver gang en task i prosessen starter.

[Se interfacet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskStart.cs)

## Kjør egendefinert kode når en task avsluttes

For å få egendefinert kode kjørt når en task i prosessen avsluttes, må du opprette en klasse som implementerer `Altinn.App.Core.Features.IProcessTaskEnd` og registrere denne som en transient.

Det er mulig å legge til flere klasser som implementerer dette interfacet. Alle blir kjørt hver gang en task i prosessen avsluttes (videre til neste steg).

[Se interfacet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskEnd.cs)

## Kjør egendefinert kode når en task avbrytes

For å få egendefinert kode kjørt når en task i prosessen avbrytes, må du opprette en klasse som implementerer `Altinn.App.Core.Features.IProcessTaskAbandon` og registrere denne som en transient.

Det er mulig å legge til flere klasser som implementerer dette interfacet. Alle blir kjørt hver gang en task i prosessen blir avbrutt.

[Se interfacet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskAbandon.cs)
