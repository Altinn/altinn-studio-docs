---
title: "ALTINNAPP1021: oppgavekonfigurasjonen har et element appen ser bort fra"
description: "Appen leser ikke et element i altinn:taskExtension, så innstillingen har ingen virkning"
weight: 121
---

Denne diagnostikken melder fra når `<altinn:taskExtension>` på en oppgave i
`config/process/process.bpmn` har et element appen ikke leser. Det gjelder

- et element i Altinn-navnerommet som appen ikke leser på det stedet, for eksempel på grunn av
  en skrivefeil eller feil store og små bokstaver
- et element appen kjenner, men i et annet navnerom enn `http://altinn.no/process`
- en ekstra forekomst av et element appen bare leser én av, fordi appen leser den første

Meldingen navngir oppgaven, elementet og hvor det står, og foreslår en retting.

Appen hopper over elementer den ikke kjenner, uten å si fra, så innstillingen har ingen
virkning. Elementer med andre navn i andre navnerom hører til andre verktøy, og regelen melder ikke
fra om dem. De gamle innstillingene `subformComponentId` og `subformDataTypeId` i
`<altinn:subformPdfConfig>` melder bygget som
[ALTINNAPP0602]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0602" >}})
i stedet. Andre steder melder denne regelen fra om dem.

Kategori `Process`, alvorlighetsgrad **advarsel**. Det er en advarsel fordi ingenting feiler der
elementet står.

Rett navnet eller navnerommet slik meldingen foreslår, eller fjern elementet. Har du to av et
element appen bare leser én av, beholder du bare det ene.

Se [oppgavetypene og innstillingene deres]({{< relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}).
