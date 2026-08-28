---
title: "ALTINNAPP0600: enablePdfCreation støttes ikke"
description: "enablePdfCreation på en dataType er ikke lenger støttet"
weight: 60
---

Denne diagnostikken meldes når en `dataType` i `applicationmetadata.json` har
`enablePdfCreation` satt til `true`. Egenskapen er ikke lenger støttet av denne versjonen
av app-backend. Meldingen navngir hvilken `dataType` det gjelder.

Kategori `Deprecation`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Generer PDF med en PDF-tjenesteoppgave i prosessen i stedet.

Se veiledningen for PDF i appen her: 
https://docs.altinn.studio/nb/altinn-studio/v8/guides/development/pdf/
