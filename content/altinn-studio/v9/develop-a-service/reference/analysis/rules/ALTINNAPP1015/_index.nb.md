---
draft: true
title: "ALTINNAPP1015: datatypen kan ikke ta imot det oppgaven lagrer i den"
description: "En innebygd oppgave i process.bpmn lagrer data i en datatype som avviser dem"
weight: 115
---

Denne diagnostikken meldes når en innebygd oppgave i `config/process/process.bpmn` lagrer data
i en datatype som avviser dem. Meldingen navngir oppgaven, hva den lagrer, datatypen, hva som
er galt og hvordan du retter det.

Regelen kontrollerer det disse oppgavene lagrer:

- PDF-ene til en `pdf`- eller `subformPdf`-oppgave, i `ref-data-as-pdf`
- signaturene (`signatureDataType`), signerings-PDF-en (`signingPdfDataType`) og, når oppgaven
  har en `signeeProviderId`, signeringsstatusene (`signeeStatesDataTypeId`) til en
  `signing`-oppgave
- betalingskvitteringen (`paymentReceiptPdfDataType`) til en `payment`-oppgave

En datatype avviser en fil når den har en `appLogic.classRef`, som gjør den til en datamodell
for skjemadata, eller når `allowedContentTypes` ikke er tom og ikke inneholder nøyaktig
innholdstypen til filen: `application/pdf` for PDF-ene og `application/json` for
signeringsstatusene. Altinn Storage godtar dessuten en signatur bare i en datatype der `taskId`
er tom eller er signeringsoppgaven. Da feiler lagringen hver gang oppgaven lagrer de dataene, og
for signaturer betyr det at ingen kan signere i oppgaven.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gjør det meldingen sier: fjern `appLogic.classRef` eller bruk en annen datatype, legg til
innholdstypen i `allowedContentTypes`, eller sett `taskId` på datatypen for signaturene til
signeringsoppgaven eller fjern den.
