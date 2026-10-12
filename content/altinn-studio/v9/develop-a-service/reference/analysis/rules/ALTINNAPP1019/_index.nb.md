---
draft: true
title: "ALTINNAPP1019: den eksklusive gatewayen navngir en ukjent datatype"
description: "connectedDataTypeId på en eksklusiv gateway navngir en datatype som applicationmetadata.json ikke deklarerer"
weight: 119
---

Denne diagnostikken meldes når en eksklusiv gateway i `config/process/process.bpmn` navngir en
datatype i `<altinn:gatewayExtension><altinn:connectedDataTypeId>` som ikke finnes blant
`dataTypes` i `config/applicationmetadata.json`. Meldingen navngir gatewayen og datatypen. En
tom `connectedDataTypeId` meldes også, fordi appen leser den som en id og ikke som manglende.

Den tilknyttede datatypen er dataene som betingelsene på sekvensflytene ut av gatewayen leser.
Med en ukjent id finner de ikke noe dataelement, så en betingelse som leser
`["dataModel", ...]` uten å navngi en datatype, feiler når en instans forlater gatewayen.
Regelen er bare en advarsel, fordi den tilknyttede datatypen bare har betydning for slike
betingelser og for din egen kode for gatewayen.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Rett id-en, eller legg til datatypen.

Se [hvordan du styrer prosessflyten]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/flowcontrol" >}}).
