---
title: "ALTINNAPP1011: eksklusive gatewayer danner en løkke"
description: "Eksklusive gatewayer i process.bpmn fører tilbake til hverandre uten noen oppgave imellom"
weight: 111
---

Denne diagnostikken melder fra når en eksklusiv gateway i `config/process/process.bpmn` fører
tilbake til seg selv, direkte eller gjennom andre eksklusive gatewayer, uten noen oppgave
imellom. Meldingen navngir gatewayene i løkken.

Appen går rett fra en gateway videre inn i neste uten å stoppe. Følger en instans løkken, går
appen i ring til prosessen krasjer. Regelen sjekker bare gatewayer en instans kan nå.

Kategori `Process`, alvorlighetsgrad **advarsel**. Det er en advarsel fordi betingelsene på
sekvensflytene kan hindre at noen instans følger løkken.

Legg en oppgave inn i løkken, eller fjern en av sekvensflytene i den.

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
