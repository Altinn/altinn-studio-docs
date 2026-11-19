---
draft: true
title: "ALTINNAPP1013: prosessen navngir en ukjent datatype"
description: "En oppgave i process.bpmn navngir en datatype som applicationmetadata.json ikke deklarerer, i en innstilling appen feiler på"
weight: 113
---

Denne diagnostikken meldes når en oppgave i `config/process/process.bpmn` navngir en datatype
som ikke finnes blant `dataTypes` i `config/applicationmetadata.json`, i en innstilling der
appen feiler på en ukjent id. Meldingen navngir oppgaven, datatypen og elementet som navngir
den. Er elementet tomt, sier meldingen det.

Regelen kontrollerer disse innstillingene:

- `signatureDataType`, `signeeStatesDataTypeId` og `signingPdfDataType` i
  `<altinn:signatureConfig>`
- `dataTypesToSign` i `<altinn:signatureConfig>`, når ingen av datatypene i listen finnes
- `paymentDataType` og `paymentReceiptPdfDataType` i `<altinn:paymentConfig>`
- alle `dataTypes`-lister i `<altinn:eFormidlingConfig>`, uansett `env`
- `subformDataTypeId` i `<altinn:subformPdfConfig>` på en `subformPdf`-oppgave

Innstillingene for signering, betaling og eFormidling kontrolleres på alle oppgaver, uansett
oppgavetype, fordi appens egne oppgavetyper også kan lese dem.

Appen finner en datatype på den nøyaktige id-en, så store og små bokstaver må også stemme. Bare
signeringshandlingen ser bort fra store og små bokstaver når den leser `dataTypesToSign`.
Avhengig av innstillingen starter ikke appen, signerings- eller betalingshandlingen feiler,
eller oppgaven feiler når en instans kommer dit, ofte etter at brukeren har signert eller
betalt.

Regelen kontrollerer bare oppgaver en instans kan nå. Unntakene er `dataTypes` i
`<altinn:eFormidlingConfig>` på en `eFormidling`-oppgave og `subformDataTypeId` på en
`subformPdf`-oppgave, som appen kontrollerer når den starter. `dataTypesToSign` kontrollerer
regelen bare når oppgaven har handlingen `sign` i `<altinn:actions>`.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Rett id-en, eller legg til datatypen i `applicationmetadata.json`. Innstillinger der appen
hopper over en ukjent id i stedet for å feile, meldes av ALTINNAPP1018.

Se hvordan du setter opp
[signering]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}),
[betaling]({{< relref "/altinn-studio/v9/develop-a-service/process/payment" >}}) og
[eFormidling]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}).
