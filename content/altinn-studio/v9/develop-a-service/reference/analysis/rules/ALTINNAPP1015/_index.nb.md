---
title: "ALTINNAPP1015: datatypen kan ikke lagre det oppgaven lagrer i den"
description: "En datatype som en oppgave lagrer PDF-er, signaturer eller andre data i, tar ikke imot det oppgaven lagrer"
weight: 115
---

Denne diagnostikken melder fra når en oppgave i `config/process/process.bpmn` lagrer noe i en
datatype som ikke tar imot det. Meldingen navngir oppgaven, datatypen, hva som er galt og
hvordan du retter det.

Regelen sjekker disse datatypene, som oppgavene lagrer data i:

- `ref-data-as-pdf`, som `pdf`- og `subformPdf`-oppgaver lagrer PDF-ene i
- `signingPdfDataType` i en signeringsoppgave, som må ta imot `application/pdf`
- `signeeStatesDataTypeId` i en signeringsoppgave med `signeeProviderId`, som må ta imot
  `application/json`
- `paymentReceiptPdfDataType` i en betalingsoppgave, som må ta imot `application/pdf`

En slik datatype tar ikke imot det oppgaven lagrer, når

- den har `appLogic.classRef`, som gjør den til en datamodell for et skjema og ikke en fil
- `allowedContentTypes` har verdier, men ikke innholdstypen oppgaven lagrer

I en signeringsoppgave som har handlingen `sign`, melder regelen også fra når `taskIds` på
datatypen i `signatureDataType` har verdier, men ikke signeringsoppgaven. Storage tar bare imot
en signatur i en datatype som ikke hører til noen oppgave, eller som hører til
signeringsoppgaven. Ellers feiler alle signaturene i oppgaven.

Regelen sjekker bare oppgaver en instans kan nå.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Rett datatypen slik meldingen sier: fjern `appLogic.classRef` eller bruk en datatype uten, legg
til innholdstypen i `allowedContentTypes`, eller legg til signeringsoppgaven i `taskIds`.

Se [referansen for signeringsoppgaven]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}}).
