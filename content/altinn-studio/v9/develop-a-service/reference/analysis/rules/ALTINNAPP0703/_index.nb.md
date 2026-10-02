---
draft: true
title: "ALTINNAPP0703: postkassen blir aldri besvart"
description: "En postkasse blir åpnet, men ingen behandler tar imot svarene"
weight: 73
---

Denne diagnostikken meldes når et arbeidssteg åpner en postkasse med
`Stage(..., out MailboxHandle svar)`, men håndtaket ikke blir brukt noe sted. Meldingene som
kommer tilbake, ville da ikke hatt noen behandler. Meldingen navngir variabelen postkassen ble
åpnet i.

Kategori `Contracts`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Besvar postkassen før sammensetningen slutter: med `HandleReplies` for å fortsette etterpå, eller
med `ConcludeOnReplies` for å avslutte der.

Regelen melder bare et håndtak som ikke er brukt i det hele tatt. Forkaster du håndtaket med
`out _`, eller bruker du det uten å besvare postkassen, melder ikke regelen noe, men appen feiler
når den starter.

Se [Få svaret som en melding]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}#få-svaret-som-en-melding).
