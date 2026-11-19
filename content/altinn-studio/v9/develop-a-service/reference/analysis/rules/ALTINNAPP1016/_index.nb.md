---
title: "ALTINNAPP1016: appen må eie datatypen"
description: "En datatype for signaturer, signeringsstatus eller betalingsinformasjon har ikke allowedContributors satt til app:owned"
weight: 116
---

Denne diagnostikken melder fra når en signeringsoppgave eller en betalingsoppgave i
`config/process/process.bpmn` lagrer data i en datatype der `allowedContributors` ikke er
nøyaktig `["app:owned"]`. Det gjelder datatypene i

- `signatureDataType` og `signeeStatesDataTypeId` i `<altinn:signatureConfig>`
- `paymentDataType` i `<altinn:paymentConfig>`

Meldingen navngir oppgaven og datatypen.

Appen sjekker dette når den starter i Development-miljøet, og starter ikke der. I andre miljøer
starter appen, men da kan andre enn appen kanskje endre dataene gjennom API-et til appen: alle
hvis listen er tom, ellers tjenesteeierne den navngir.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Sett `allowedContributors` til `["app:owned"]`. Har datatypen også det gamle feltet
`allowedContributers` med verdier, fjerner du det eller setter det til `["app:owned"]` også.

Se [referansen for signeringsoppgaven]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/tasks/signing" >}})
og [veiledningen for betaling i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/payment" >}}).
