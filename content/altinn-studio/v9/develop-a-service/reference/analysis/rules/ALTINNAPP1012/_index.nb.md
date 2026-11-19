---
title: "ALTINNAPP1012: gatewayen lister en sekvensflyt med tom betingelse"
description: "En sekvensflyt ut av en eksklusiv gateway i process.bpmn har en tom betingelse"
weight: 112
---

Denne diagnostikken melder fra når en eksklusiv gateway i `config/process/process.bpmn` lister
en sekvensflyt med en tom `<bpmn:conditionExpression>`, eller en som bare har mellomrom.
Meldingen navngir gatewayen og sekvensflyten.

Appen vurderer betingelsen på hver sekvensflyt gatewayen lister, unntatt standardflyten, og en
tom betingelse kan den ikke lese. Gatewayen feiler derfor hver gang en instans forlater den,
uansett hvilke data instansen har. Regelen sjekker bare gatewayer en instans kan nå.

En tom betingelse på standardflyten melder bygget som
[ALTINNAPP1023]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1023" >}}).

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi sekvensflyten en betingelse. Skal gatewayen ta den når ingen annen betingelse er sann, fjerner
du den tomme `<bpmn:conditionExpression>` og setter sekvensflyten som `default` på gatewayen i
stedet.

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
