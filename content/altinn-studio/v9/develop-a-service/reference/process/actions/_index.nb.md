---
draft: true
title: Handlinger
linktitle: Handlinger
description: Slik definerer du hva en bruker kan gjøre i en oppgave.
tags: [altinn-apper, prosess, bpmn, gateway, handling, handlinger, needsReview, needsTranslation]
toc: false
weight: 30
---

Du bruker handlinger til å definere hva en bruker kan gjøre i en oppgave. Du definerer handlinger i prosessen (BPMN) og setter tilgangsregler i tilgangskontrollfilen (XACML) som styrer hvem som kan utføre dem. Vi har to typer handlinger:

1. **Serverhandlinger**
  Vilkårlig kode som du kan kjøre på serveren som en del av prosessen. Du bruker disse handlingene til å hjelpe brukeren med å fylle ut skjemaet ved blant annet å forhåndsutfylle data, utføre beregninger og kalle eksterne API-er. De oppdaterer vanligvis datamodellen, returnerer den oppdaterte modellen til klienten og oppdaterer brukergrensesnittet. Du kan også fortelle klienten hva den skal gjøre etter en vellykket utførelse, for eksempel at den skal gå til neste side.

2. **Prosesshandlinger**
   Prosesshandlinger ligner på serverhandlinger, men de flytter prosessen til neste trinn ved vellykket utførelse. Vi har en rekke forhåndsdefinerte prosesshandlinger, som "skriv", "bekreft", "signer" og "avvis". Du kan også definere dine egne prosesshandlinger.

{{<children />}}
