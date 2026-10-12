---
draft: true
title: "ALTINNAPP1014: PDF-systemoppgaven har ingen datatype for PDF-ene"
description: "En pdf- eller subformPdf-oppgave mangler datatypen ref-data-as-pdf som PDF-ene lagres i"
weight: 114
---

Denne diagnostikken meldes når `config/process/process.bpmn` har en `pdf`- eller
`subformPdf`-systemoppgave, men `config/applicationmetadata.json` ikke har noen datatype med
id-en `ref-data-as-pdf`. Begge oppgavetypene lagrer PDF-ene sine i den datatypen. Meldingen
navngir oppgaven og oppgavetypen.

Appen lager ikke datatypen selv, og kontrollerer ikke at den finnes når den starter. Oppgaven
lager PDF-en og feiler når den skal lagre den. En `pdf`-oppgave feiler hver gang den kjører,
og en `subformPdf`-oppgave hver gang en instans har et underskjema å skrive ut. Regelen
kontrollerer en `subformPdf`-oppgave bare når `subformDataTypeId` navngir en datatype appen
har. En ukjent datatype der meldes av ALTINNAPP1013.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Legg til datatypen i `dataTypes` i `applicationmetadata.json`:

```json
{
  "id": "ref-data-as-pdf",
  "allowedContentTypes": ["application/pdf"]
}
```

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
