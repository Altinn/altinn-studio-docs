---
title: "ALTINNAPP0901: feltet peker på en ukjent datatype"
description: "En oppføring i presentationFields eller dataFields har en dataTypeId appen ikke har deklarert"
weight: 91
---

Denne diagnostikken meldes når en oppføring i `presentationFields` eller `dataFields` i
`applicationmetadata.json` har en `dataTypeId` som ikke finnes blant `dataTypes` i samme
fil. Meldingen navngir egenskapen, id-en til oppføringen og datatypen den peker på.

Appen regner bare ut feltet for datatypen oppføringen navngir. Peker den på en datatype som
ikke finnes, blir verdien aldri regnet ut, og feltet står tomt på instansen uten at noe
feiler. Den vanligste årsaken er en skrivefeil i `dataTypeId`.

Kategori `Metadata`, alvorlighetsgrad **advarsel**.

Rett `dataTypeId` til en datatype appen deklarerer, eller fjern oppføringen.
