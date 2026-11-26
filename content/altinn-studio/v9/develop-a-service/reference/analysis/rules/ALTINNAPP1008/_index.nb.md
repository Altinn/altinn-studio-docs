---
title: "ALTINNAPP1008: elementet har ingen utgående sekvensflyt"
description: "En starthendelse, oppgave, systemoppgave eller eksklusiv gateway i process.bpmn har ingen vei videre"
weight: 108
---

Denne diagnostikken melder fra når et element i `config/process/process.bpmn` ikke har noen vei
videre. Det gjelder når

- en starthendelse, en oppgave eller en systemoppgave ikke er `sourceRef` for noen sekvensflyt
- en eksklusiv gateway verken lister noen sekvensflyt i `<bpmn:outgoing>` eller er `sourceRef`
  for noen

Meldingen navngir elementet.

En instans som når elementet, kommer aldri videre. Regelen sjekker bare elementer en instans kan
nå fra en starthendelse, så et element du har lagt inn, men ikke koblet til ennå, melder den
ikke.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Koble elementet til neste element i prosessen med en sekvensflyt.

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
