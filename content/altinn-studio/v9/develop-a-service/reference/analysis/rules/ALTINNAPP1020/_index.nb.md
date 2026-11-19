---
title: "ALTINNAPP1020: oppgaven mangler en påkrevd innstilling eller har en ugyldig verdi"
description: "En oppgave i process.bpmn mangler en innstilling den innebygde oppgavetypen trenger, eller har en verdi appen ikke kan lese"
weight: 120
---

Denne diagnostikken melder fra når en oppgave i `config/process/process.bpmn` mangler en
innstilling den innebygde oppgavetypen trenger, eller har en verdi appen ikke kan lese.
Meldingen navngir oppgaven, hva som mangler eller er ugyldig, hva som skjer og hvordan du retter
det.

Regelen kontrollerer dette:

- En `signing`-oppgave må ha en verdi i `signatureDataType`. `signeeProviderId` og
  `signeeStatesDataTypeId` må enten stå sammen med verdier eller begge mangle. Med
  `signeeProviderId` trenger oppgaven også `correspondenceResource` for Staging og Production.
  Kan en instans nå oppgaven, og har den handlingen `sign`, må `dataTypesToSign` navngi minst én
  datatype.
- En `payment`-oppgave må ha verdier i `paymentDataType` og `paymentReceiptPdfDataType`.
- En `subformPdf`-oppgave må ha `<altinn:subformPdfConfig>` med en verdi i `subformUiFolder`.
- En `eFormidling`-oppgave må ha `<altinn:eFormidlingConfig>`, og `process`, `standard`,
  `typeVersion`, `type` og `securityLevel` må ha en verdi i alle miljøer, også der eFormidling
  er slått av. `securityLevel` må være et heltall, og `disabled` må være `true` eller `false`.
- I alle oppgaver må `runDefaultValidator` i `<altinn:signatureConfig>` være en boolsk verdi,
  som `true` eller `false`, og `type` på en `<altinn:action>` må være `processAction` eller
  `serverAction`.

Uten disse innstillingene starter ikke appen, eller den feiler hver gang oppgaven kjører eller
brukeren signerer. En innstilling som varierer med miljøet, sjekker appen bare for miljøet den
kjører i. Uten regelen viser en manglende verdi for Production seg derfor først når appen kjører
i produksjon. Regelen sjekker hvert miljø for seg: Development, Staging og Production.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Legg til eller rett innstillingen slik meldingen sier.

Se [oppgavetypene og innstillingene deres]({{< relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}).
