---
draft: true
title: "ALTINNAPP1016: datatypen må eies av appen"
description: "En datatype for signaturer, signeringsstatuser eller betalingsinformasjon er ikke begrenset til app:owned"
weight: 116
---

Denne diagnostikken meldes når en `signing`-oppgave lagrer signaturene (`signatureDataType`)
eller signeringsstatusene (`signeeStatesDataTypeId`), eller en `payment`-oppgave lagrer
betalingsinformasjonen (`paymentDataType`), i en datatype der `allowedContributors` ikke er
nøyaktig `["app:owned"]`. Meldingen navngir oppgaven, hva den lagrer der, og datatypen.

I Development-miljøet kontrollerer appen dette når den starter, og starter ikke. I andre miljøer
kjører den, men andre enn appen kan kanskje endre dataene gjennom API-et til appen: alle, hvis
listen mangler eller er tom, og ellers tjenesteeierne listen navngir.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Sett `allowedContributors` til `["app:owned"]`. Har datatypen også den gamle skrivemåten
`allowedContributers`, leser appen den først, så rett eller fjern den også.

Se hvordan du setter opp
[signering]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}})
og [betaling]({{< relref "/altinn-studio/v9/develop-a-service/process/payment" >}}).
