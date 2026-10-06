---
draft: true
title: "ALTINNAPP1003: oppgaven bruker feil BPMN-element"
description: "En oppgave i process.bpmn er et annet BPMN-element enn oppgavetypen krever"
weight: 103
---

Denne diagnostikken meldes når en oppgave i `config/process/process.bpmn` er et annet
BPMN-element enn `<altinn:taskType>` krever. En systemoppgave må være et
`<bpmn:serviceTask>`-element, og alle andre oppgaver et `<bpmn:task>`-element. Meldingen
navngir oppgaven, oppgavetypen, elementet oppgaven er, og elementet den skal være.

Regelen kjenner disse oppgavetypene:

- de innebygde systemoppgavene `pdf`, `subformPdf`, `eFormidling` og `fiksArkiv`
- de innebygde brukeroppgavene `data`, `confirmation`, `feedback`, `signing` og `payment`
- appens egne `IServiceTask`, `IPipelineServiceTask` og `IProcessTask`, når `Type` returnerer
  en konstant

En oppgavetype regelen ikke kan avgjøre ved bygging, for eksempel en som kommer fra en pakke,
melder den ikke noe om. Appen kontrollerer det samme når den starter, og starter ikke hvis en
oppgave bruker feil element.

Kategori `Process`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Endre oppgaven til elementet meldingen oppgir.

Se [oppgavetypene og elementene de bruker]({{< relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}).
