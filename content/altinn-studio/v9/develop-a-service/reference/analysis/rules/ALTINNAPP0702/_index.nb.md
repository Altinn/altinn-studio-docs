---
draft: true
title: "ALTINNAPP0702: postkassen er besvart to ganger"
description: "Samme postkasse blir besvart av mer enn én behandler"
weight: 72
---

Denne diagnostikken meldes når en systemoppgave med flere arbeidssteg åpner en postkasse, og
den samme `MailboxHandle` blir sendt både til `HandleReplies` og til `ConcludeOnReplies`, eller
til en av dem to ganger. Meldingen navngir variabelen postkassen ble åpnet i.

Hver postkasse skal besvares nøyaktig én gang: med `HandleReplies` for å fortsette etterpå, eller
med `ConcludeOnReplies` for å avslutte der. En behandler nummer to ville aldri kjørt.

Kategori `Contracts`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Fjern den ene behandleren.

Regelen melder bare det den kan bevise: håndtaket ligger i variabelen som `out`-parameteren til
`Stage` deklarerer, og begge svarene kjører helt sikkert. Lagrer du håndtaket et annet sted eller
sender det videre, kontrollerer appen det samme når den starter, og feiler der i stedet.

Se [Få svaret som en melding]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}#få-svaret-som-en-melding).
