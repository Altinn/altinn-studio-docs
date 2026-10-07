---
draft: true
title: "ALTINNAPP0902: automatisk sletting sammen med slettesperre"
description: "applicationmetadata.json har både autoDeleteOnProcessEnd og preventInstanceDeletionForDays"
weight: 92
---

Denne diagnostikken meldes når `applicationmetadata.json` setter `autoDeleteOnProcessEnd` til
`true` og `preventInstanceDeletionForDays` til et antall dager. Meldingen navngir antallet dager.

`autoDeleteOnProcessEnd` sletter instansen når prosessen er avsluttet. `preventInstanceDeletionForDays`
forbyr at instansen slettes så mange dager etter at den er arkivert, og instansen blir arkivert når
prosessen avsluttes. De to innstillingene ber om motsatte ting i samme øyeblikk, så appen kan ikke
følge begge.

Kategori `Metadata`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Fjern én av de to innstillingene: `autoDeleteOnProcessEnd` hvis instansen skal tas vare på, eller
`preventInstanceDeletionForDays` hvis den skal slettes når prosessen avsluttes.
