---
title: "ALTINNAPP1023: standardflyten på gatewayen har en betingelse"
description: "Sekvensflyten som default på en eksklusiv gateway peker på, har en betingelse"
weight: 123
---

Denne diagnostikken melder fra når sekvensflyten som `default` på en eksklusiv gateway i
`config/process/process.bpmn` peker på, har en `<bpmn:conditionExpression>`, også en tom. Det
gjelder en standardflyt gatewayen lister i `<bpmn:outgoing>`. Meldingen navngir gatewayen og
sekvensflyten.

Gatewayen tar standardflyten bare når ingen av de andre betingelsene er sanne, og vurderer aldri
betingelsen på selve standardflyten. En slik betingelse kan se ut til å virke i en test, men
avgjør ingenting. Appen sjekker det samme når den starter, og starter ikke med en slik gateway.
Regelen sjekker derfor alle gatewayer, også dem ingen instans kan nå.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Fjern `<bpmn:conditionExpression>` fra standardflyten, eller fjern `default` fra gatewayen, slik
at appen vurderer betingelsen. Da kan ikke betingelsen være tom, ellers melder bygget
[ALTINNAPP1012]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1012" >}}).

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
