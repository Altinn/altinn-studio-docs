---
title: "ALTINNAPP1019: gatewayen peker på en ukjent datatype"
description: "connectedDataTypeId på en eksklusiv gateway i process.bpmn er ikke en datatype i applicationmetadata.json"
weight: 119
---

Denne diagnostikken melder fra når `<altinn:connectedDataTypeId>` i `<altinn:gatewayExtension>`
på en eksklusiv gateway i `config/process/process.bpmn` ikke er id-en til en datatype i
`applicationmetadata.json`. En tom id gjelder også. Meldingen navngir gatewayen og datatypen.

Betingelsene på gatewayen finner da ikke noe dataelement. En betingelse som leser
`["dataModel", ...]` uten å navngi en datatype, feiler når en instans forlater gatewayen.
Regelen sjekker bare gatewayer en instans kan nå.

Kategori `Process`, alvorlighetsgrad **advarsel**. Det er en advarsel fordi datatypen bare betyr
noe for slike betingelser, og for appens egen kode for gatewayen.

Rett id-en, eller legg til datatypen i `applicationmetadata.json`.

Se [veiledningen for flytkontroll]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
