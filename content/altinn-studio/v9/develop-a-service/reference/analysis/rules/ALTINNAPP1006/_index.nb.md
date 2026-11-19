---
title: "ALTINNAPP1006: standardflyten på gatewayen er ikke en av flytene den lister"
description: "default på en eksklusiv gateway peker på en sekvensflyt gatewayen ikke lister i outgoing"
weight: 106
---

Denne diagnostikken melder fra når `default` på en eksklusiv gateway i
`config/process/process.bpmn` peker på en sekvensflyt gatewayen ikke lister i `<bpmn:outgoing>`.
Meldingen navngir gatewayen og verdien i `default`.

Appen leter bare etter standardflyten blant sekvensflytene gatewayen lister, og ser bort fra
`default` når den ikke finner den der. Det feiler bare når de andre sekvensflytene ikke snevrer
valget inn til én. Regelen sjekker bare gatewayer en instans kan nå.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Sett `default` til en av sekvensflytene i `<bpmn:outgoing>`, eller fjern `default`. Starter
standardflyten i gatewayen uten å stå i listen, melder bygget også
[ALTINNAPP1005]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1005" >}}).
Da legger du den til i `<bpmn:outgoing>`.

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
