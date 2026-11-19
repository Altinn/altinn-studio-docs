---
title: "ALTINNAPP1004: sekvensflyten fører til et element appen ikke kan gå til"
description: "En sekvensflyt i process.bpmn mangler mål, eller fører til et element appen ikke kjører"
weight: 104
---

Denne diagnostikken melder fra når en sekvensflyt i `config/process/process.bpmn` som appen
følger, ikke fører til et element appen kan flytte instansen til. Det gjelder når sekvensflyten

- ikke har noen `targetRef`
- har en `targetRef` som ingen elementer i prosessen har som id
- fører til et element appen ikke kjører, for eksempel en parallell gateway, en underprosess
  eller et element uten BPMN-navnerommet
- fører til en starthendelse

Meldingen navngir sekvensflyten og hva som er galt.

En instans kan bare flytte til oppgavene, systemoppgavene, de eksklusive gatewayene og
slutthendelsene i prosessen. Appen leser bare elementene som ligger rett under `<bpmn:process>`.
Uten regelen feiler appen først når en instans prøver å forlate elementet der sekvensflyten
starter.

Regelen sjekker bare sekvensflyter appen faktisk følger, fra elementer en instans kan nå fra en
starthendelse. Fra en eksklusiv gateway følger appen sekvensflytene gatewayen lister i
`<bpmn:outgoing>`. Fører en annen sekvensflyt fra samme oppgave eller starthendelse til et
element appen kan gå til, hopper appen over en sekvensflyt uten gyldig mål, og regelen melder
den ikke. En sekvensflyt til en starthendelse melder regelen alltid.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Pek sekvensflyten mot en oppgave, en systemoppgave, en eksklusiv gateway eller en slutthendelse,
eller fjern den.

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
