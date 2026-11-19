---
title: "ALTINNAPP1013: prosessen peker på en ukjent datatype"
description: "En oppgave i process.bpmn navngir en datatype som ikke finnes i applicationmetadata.json"
weight: 113
---

Denne diagnostikken melder fra når en oppgave i `config/process/process.bpmn` navngir en
datatype som ingen oppføring i `dataTypes` i `applicationmetadata.json` har som id, og appen
feiler der den bruker id-en. Det gjelder disse innstillingene i `<altinn:taskExtension>`:

- `signatureDataType`, `signeeStatesDataTypeId` og `signingPdfDataType` i
  `<altinn:signatureConfig>`
- oppføringene i `<altinn:dataTypesToSign>`, når ingen av dem finnes og oppgaven har handlingen
  `sign`
- `paymentDataType` og `paymentReceiptPdfDataType` i `<altinn:paymentConfig>`
- oppføringene i `<altinn:dataTypes>` i `<altinn:eFormidlingConfig>`, for alle miljøer

Meldingen navngir oppgaven, datatypen og innstillingen. Appen finner datatypen på nøyaktig id,
så store og små bokstaver må stemme. Bare handlingen `sign` ser bort fra dem.

Appen sjekker få av disse id-ene når den starter. Uten regelen viser feilen seg ofte først når
en instans kommer til oppgaven, kanskje etter at brukeren har signert eller betalt. Regelen
sjekker bare oppgaver en instans kan nå, men id-ene for eFormidling sjekker den i alle
`eFormidling`-oppgaver, slik appen gjør når den starter.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Rett id-en slik at den stemmer nøyaktig med en datatype, eller legg til datatypen i
`applicationmetadata.json`.

En ukjent id som appen bare hopper over, melder bygget som advarselen
[ALTINNAPP1018]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1018" >}}).

Se [referansen for signeringsoppgaven]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}).
