---
draft: true
title: "ALTINNAPP1024: subformPdf-oppgaven peker på en UI-mappe den ikke kan vise"
description: "subformUiFolder er ikke en UI-mappe med en defaultDataType appen kjenner"
weight: 124
---

Denne diagnostikken meldes når `<altinn:subformPdfConfig><altinn:subformUiFolder>` på en
`subformPdf`-oppgave i `config/process/process.bpmn` peker på en mappe appen ikke kan lage
PDF-er fra. Det gjelder når

- appen ikke har noen UI-mappe `ui/<mappe>` med en `Settings.json`
- `Settings.json` i mappen ikke har noen `defaultDataType`
- `defaultDataType` ikke er en datatype i `applicationmetadata.json`

Meldingen navngir oppgaven, mappen og hva som er galt.

Oppgaven lager én PDF for hver oppføring av datatypen i `defaultDataType`, fra sidene i mappen.
Appen sjekker det samme når den starter, og starter ikke med en slik oppgave.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Oppgi UI-mappen til underskjemaet i `subformUiFolder`, og sett `defaultDataType` i
`Settings.json` for mappen til datatypen underskjemaet lagrer oppføringene i.

Se [veiledningen for PDF-generering for underskjema]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/subform/subform-pdf" >}}).
