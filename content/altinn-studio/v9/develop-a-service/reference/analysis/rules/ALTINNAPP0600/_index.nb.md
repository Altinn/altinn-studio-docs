---
draft: true
title: "ALTINNAPP0600: enablePdfCreation støttes ikke"
description: "enablePdfCreation på en dataType er ikke lenger støttet"
weight: 60
---

Denne diagnostikken meldes når en `dataType` i `applicationmetadata.json` har
`enablePdfCreation` satt til `true`. Egenskapen er ikke lenger støttet av denne versjonen
av app-backend. Meldingen navngir hvilken `dataType` det gjelder.

Kategori `Deprecation`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Generer PDF med en PDF-systemoppgave i prosessen i stedet.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
