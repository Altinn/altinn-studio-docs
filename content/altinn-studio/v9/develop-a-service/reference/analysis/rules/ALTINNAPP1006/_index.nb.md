---
draft: true
title: "ALTINNAPP1006: standardflyten til den eksklusive gatewayen er ikke en av flytene den lister"
description: "Standardflyten til en eksklusiv gateway er en sekvensflyt gatewayen ikke lister"
weight: 106
---

Denne diagnostikken meldes når attributtet `default` på en eksklusiv gateway peker på en
sekvensflyt som gatewayen ikke lister i `<bpmn:outgoing>`. Meldingen navngir gatewayen og
standardflyten.

Appen leter bare etter standardflyten blant flytene gatewayen lister, og ser derfor bort fra
denne. Det har betydning når ingenting annet velger én flyt: når ingen av betingelsene på
flytene er oppfylt, når en `IProcessExclusiveGateway` ikke velger noen av dem, eller når
gatewayen lister mer enn én flyt og verken har betingelser eller en slik
`IProcessExclusiveGateway`. Da feiler appen når en instans forlater gatewayen. Regelen
kontrollerer bare gatewayer en instans kan nå fra en starthendelse.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Sett `default` til en av flytene gatewayen lister, eller fjern attributtet. Starter
standardflyten i gatewayen, men mangler i `<bpmn:outgoing>`, melder ALTINNAPP1005 det også. Da
retter du begge ved å liste flyten.
