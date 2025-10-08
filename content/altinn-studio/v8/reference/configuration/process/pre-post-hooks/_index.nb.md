---
title: Definer egendefinerte prosess hooks
description: Definer egendefinert kode som skal kjøres før eller etter en task er startet eller avsluttet
toc: true
---

{{%notice info%}}
Funksjonaliteten beskrevet på denne siden krever minimum version 7 av Altinn nugets.
{{%/notice%}}

Det er mulig å skrive egendefinert kode som eksekveres når en task i prosessen starter, avsluttes eller forlates.
Alle registrerte klasser vil bli eksekvert for hver task som starter eller avsluttes, det er derfor viktig at du tar høyde for dette hvis du kun øsnker at koden skal kjøres i forbindelse med spesifike tasker.

## Kjør egendefinert kode før en task starter

For å få egendefinert kode eksekvert når en task i prosessen startes må du opprette en klasse som implementerer `Altinn.App.Core.Features.IProcessTaskStart` og registrere denne som en transient.

Det er mulig å legge til flere klasser som implementerer dette interfacet, alle vil ble kjørt for hver gang en task i prosessen starter.

[Se interfacet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskStart.cs)

## Execute custom code when tasks is ended

For å få egendefinert kode eksekvert når en task i prosessen avsluttes må du opprette en klasse som implementerer `Altinn.App.Core.Features.IProcessTaskEnd` og registrere denne som en transient.

Det er mulig å legge til flere klasser som implementerer dette interfacet, alle vil ble kjørt for hver gang en task i prosessen avsluttes (videre til neste steg).

[Se interfacet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskEnd.cs)

## Execute custom code when tasks are abandoned

For å få egendefinert kode eksekvert når en task i prosessen avbrytes må du opprette en klasse som implementerer `Altinn.App.Core.Features.IProcessTaskAbandon` og registrere denne som en transient.

Det er mulig å legge til flere klasser som implementerer dette interfacet, alle vil ble kjørt for hver gang en task i prosessen blir avbrutt.

[Se interfacet her](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskAbandon.cs)
