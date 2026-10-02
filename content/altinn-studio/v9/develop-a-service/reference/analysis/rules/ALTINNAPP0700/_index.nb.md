---
title: "ALTINNAPP0700: forseglet standardimplementasjon er erstattet"
description: "En klasse erstatter et grensesnittmedlem hvis standardimplementasjon er forseglet"
weight: 70
---

Denne diagnostikken meldes når en klasse implementerer et grensesnittmedlem som
allerede har en standardimplementasjon merket som forseglet, og klassens egen
implementasjon dermed erstatter den.

Et konkret tilfelle: `IServiceTask` har en standardimplementasjon av
`IPipelineServiceTask.Define` som videresender til `Execute`. En klasse som implementerer
`IServiceTask` og selv definerer `Define`, erstatter den videresendingen — og da kjører
`Execute` aldri.

Kategori `Contracts`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Meldingen navngir klassen, medlemmet som erstattes og typen standardimplementasjonen
ligger på, og avsluttes med veiledningsteksten som er knyttet til det aktuelle medlemmet.
For tilfellet over er løsningen å implementere `IPipelineServiceTask` direkte.
