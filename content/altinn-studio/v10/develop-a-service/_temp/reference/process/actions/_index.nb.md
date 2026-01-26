---
draft: true
title: Handlinger
description: 
tags: [altinn-apper, prosess, bpmn, gateway, handling, handlinger]
weight: 30
toc: false
---

Du bruker handlinger til å definere hva en bruker kan gjøre i en oppgave. Du definerer handlinger i prosessen (BPMN) og setter tilgangsregler i tilgangskontrollfilen (XACML) som styrer hvem som kan utføre dem. Vi har to typer handlinger:

1. **Serverhandlinger**
  Vilkårlig kode som du kan kjøre på serveren som en del av prosessen. Du bruker disse handlingene vanligvis til å hjelpe brukeren med å fylle ut skjemaet ved å forhåndsutfylle data, utføre beregninger, kalle eksterne API-er og så videre. De oppdaterer vanligvis datamodellen, returnerer den oppdaterte modellen til klienten og oppdaterer brukergrensesnittet. Du kan også fortelle klienten hva den skal gjøre etter en vellykket utførelse, for eksempel gå til neste side.

2. **Prosesshandlinger**
   Prosesshandlinger ligner på serverhandlinger, men de flytter prosessen til neste trinn ved vellykket utførelse. Vi har en rekke forhåndsdefinerte prosesshandlinger, som "skriv", "bekreft", "signer" og "avvis". Du kan også definere dine egne prosesshandlinger.

{{<children />}}
