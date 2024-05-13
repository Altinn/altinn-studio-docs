---
title: Handlinger
description: 
tags: [altinn-apper, prosess, bpmn, gateway, handling, handlinger]
weight: 30
toc: false
---

Handlinger brukes til å definere hva en bruker kan gjøre i en oppgave. Handlinger er definert i prosessen (BPMN) og har i tillegg tilgangsregler som styrer hvem som kan utføre de definert i tilgangskontrollfilen (XACML). Vi har to typer handlinger:
1. **Serverhandlinger**  
  Vilkårlig kode som kan utføres på serveren som en del av prosessen. Disse handlingene brukes vanligvis til å hjelpe brukeren med å fylle ut skjemaet ved å forhåndsutfylle data, utføre beregninger, kalle eksterne API-er, osv. De vil vanligvis oppdatere datamodellen, returnere den oppdaterte modellen til klienten og oppdatere brukergrensesnittet. Du kan også fortelle klienten hva den skal gjøre etter en vellykket utførelse, for eksempel navigere til neste side.
2. **Prosesshandlinger**  
   Prosesshandlinger ligner på serverhandlinger, men de vil flytte prosessen til neste trinn ved vellykket utførelse. Vi har en rekke forhåndsdefinerte prosesshandlinger, som "skriv", "bekreft", "signer" og "avvis". Du kan også definere dine egne prosesshandlinger.

{{<children />}}
