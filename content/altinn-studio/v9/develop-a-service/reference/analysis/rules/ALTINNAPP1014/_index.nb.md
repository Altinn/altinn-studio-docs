---
title: "ALTINNAPP1014: PDF-systemoppgaven har ingen datatype å lagre PDF-ene i"
description: "applicationmetadata.json mangler datatypen ref-data-as-pdf, som pdf- og subformPdf-oppgaver lagrer PDF-ene i"
weight: 114
---

Denne diagnostikken melder fra når prosessen i `config/process/process.bpmn` har en `pdf`- eller
`subformPdf`-oppgave som en instans kan nå, men ingen oppføring i `dataTypes` i
`applicationmetadata.json` har id-en `ref-data-as-pdf`. Meldingen navngir oppgaven og
oppgavetypen.

Oppgavene lagrer alle PDF-ene de lager, i datatypen `ref-data-as-pdf`. Appen oppretter ikke
datatypen selv og sjekker den ikke når den starter. Uten datatypen lager oppgaven PDF-en, men
klarer ikke å lagre den. En `pdf`-oppgave feiler da hver gang den kjører, og en
`subformPdf`-oppgave hver gang en instans har et underskjema å lage PDF av.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Legg til datatypen i `dataTypes`:

{{< code-title >}}
App/config/applicationmetadata.json
{{< /code-title >}}

```json
{
  "id": "ref-data-as-pdf",
  "allowedContentTypes": ["application/pdf"]
}
```

Finnes datatypen, men kan ikke lagre PDF-er, melder bygget
[ALTINNAPP1015]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP1015" >}})
i stedet.

Se [veiledningen for PDF i appen]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
