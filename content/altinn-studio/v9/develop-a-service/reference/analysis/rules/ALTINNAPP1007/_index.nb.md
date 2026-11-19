---
title: "ALTINNAPP1007: elementet har mer enn én utgående sekvensflyt"
description: "En starthendelse, oppgave eller systemoppgave i process.bpmn har flere utgående sekvensflyter"
weight: 107
---

Denne diagnostikken melder fra når en starthendelse, en oppgave eller en systemoppgave i
`config/process/process.bpmn` er `sourceRef` for mer enn én sekvensflyt som fører til en
starthendelse, en oppgave, en systemoppgave, en eksklusiv gateway eller en slutthendelse.
Meldingen navngir elementet og sekvensflytene.

Appen kan ikke velge mellom flere sekvensflyter ut av et slikt element, og feiler når en instans
forlater det. Bare en eksklusiv gateway kan velge vei. Regelen sjekker bare elementer en instans
kan nå.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

La elementet ha én utgående sekvensflyt til en eksklusiv gateway, og la gatewayen velge mellom
veiene videre.

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
