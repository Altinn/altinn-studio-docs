---
draft: true
title: "ALTINNAPP0602: subformComponentId og subformDataTypeId støttes ikke"
description: "En subformPdf-oppgave har innstillinger som ikke lenger er støttet"
weight: 62
---

Denne diagnostikken meldes når en `subformPdf`-oppgave i `config/process/process.bpmn` har
`<altinn:subformComponentId>` eller `<altinn:subformDataTypeId>` i `<altinn:subformPdfConfig>`.
Denne versjonen av app-backend støtter ikke lenger innstillingene. Meldingen navngir
oppgaven og elementet.

Kategori `Deprecation`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Oppgi UI-mappen til underskjemaet i `<altinn:subformUiFolder>` i stedet. Appen lager PDF-ene fra
den mappen og henter datatypen fra `defaultDataType` i mappen. `studioctl app upgrade v9` gjør
endringen for deg. Finner oppgraderingen ikke underskjemaet, lar den oppgaven stå uendret og
lister den som en oppgave du må gjøre selv. Da gjør du endringen for hånd.

Se [veiledningen for PDF-generering for underskjema]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/subform/subform-pdf" >}}).
