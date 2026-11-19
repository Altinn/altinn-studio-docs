---
draft: true
title: "ALTINNAPP1020: oppgaven mangler en påkrevd innstilling eller har en ugyldig verdi"
description: "En innebygd oppgavetype mangler en innstilling den trenger, eller process.bpmn har en verdi appen ikke kan lese"
weight: 120
---

Denne diagnostikken meldes når en oppgave i `config/process/process.bpmn` mangler en innstilling
som oppgavetypen trenger, eller har en verdi appen ikke kan lese. Et tomt element teller som
manglende. Meldingen navngir oppgaven, innstillingen og hva som er galt med den, hva som skjer,
og hvordan du retter det. For en innstilling som kan variere mellom miljøer, navngir den også
miljøene der den feiler.

Regelen kontrollerer disse innstillingene for de innebygde oppgavetypene:

- `signing`: `<altinn:signatureDataType>`, minst én datatype i `<altinn:dataTypesToSign>` når en
  instans kan nå oppgaven og den har handlingen `sign`, både
  `<altinn:signeeProviderId>` og `<altinn:signeeStatesDataTypeId>` eller ingen av dem, og en
  `<altinn:correspondenceResource>` for Staging og Production når `<altinn:signeeProviderId>` er
  satt
- `payment`: `<altinn:paymentDataType>` og `<altinn:paymentReceiptPdfDataType>`
- `subformPdf`: `<altinn:subformPdfConfig>` med `<altinn:subformComponentId>` og
  `<altinn:subformDataTypeId>`
- `eFormidling`: `<altinn:eFormidlingConfig>` med `<altinn:process>`, `<altinn:standard>`,
  `<altinn:typeVersion>`, `<altinn:type>` og `<altinn:securityLevel>` (et heltall) for hvert av
  miljøene Development, Staging og Production, også der eFormidling er slått av, og `true` eller
  `false` i `<altinn:disabled>` hvis elementet finnes

I alle oppgaver, uansett type, melder regelen også to verdier som gjør at appen ikke kan lese
prosessen:

- en `<altinn:runDefaultValidator>` i `<altinn:signatureConfig>` som appen ikke kan lese som sann
  eller usann, for eksempel `True` eller `yes`
- et `type`-attributt på en `<altinn:action>` med en annen verdi enn `processAction` eller
  `serverAction`

Appen kontrollerer de fleste av disse innstillingene når den starter, og starter ikke uten dem.
En innstilling som varierer mellom miljøer, kontrollerer den bare for miljøet den starter i. En
verdi som mangler for Production, oppdager du derfor ellers først når du setter appen i
produksjon. Noen av signeringsinnstillingene kontrollerer appen ikke fullt ut ved oppstart. Da
feiler en tom eller manglende innstilling senere, når oppgaven starter eller noen signerer.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Legg til eller fyll ut innstillingen meldingen navngir, for alle miljøene den nevner. En
innstilling som varierer mellom miljøer, trenger én oppføring uten `env`, eller én for hvert
miljø. Har en verdi feil format, bruker du formatet meldingen oppgir.

Se [oppgavetypene og innstillingene deres]({{< relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}).
