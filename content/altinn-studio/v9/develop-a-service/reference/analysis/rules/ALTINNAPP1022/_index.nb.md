---
title: "ALTINNAPP1022: oppgavekonfigurasjonen har et env-attributt appen ikke kan bruke"
description: "Et env-attributt i oppgavekonfigurasjonen har et miljønavn appen ikke kjenner, eller appen leser det ikke"
weight: 122
---

Denne diagnostikken melder fra når et `env`-attributt i `<altinn:taskExtension>` på en oppgave i
`config/process/process.bpmn` ikke gjør det det ser ut til. Det gjelder når

- `env` har et navn appen ikke kjenner igjen som miljø, og oppføringen derfor ikke gjelder i noe
  miljø
- attributtet ikke heter nøyaktig `env` med små bokstaver og uten navneromsprefiks, for eksempel
  `Env` eller `altinn:env`, og appen derfor ikke leser det og lar oppføringen gjelde i alle
  miljøer
- elementet ikke tar imot et `env`-attributt, og innstillingen derfor gjelder i alle miljøer

Meldingen navngir oppgaven, attributtet, elementet og hvordan du retter det. De to første
tilfellene sjekker regelen for `correspondenceResource` i en `signing`-oppgave og for
innstillingene i `<altinn:eFormidlingConfig>` i en `eFormidling`-oppgave. Det siste sjekker den
i alle oppgaver.

Et vanlig eksempel på det siste er `env` på `<altinn:dataType>` i stedet for på listen
`<altinn:dataTypes>` i `<altinn:eFormidlingConfig>`.

Appen kjenner igjen disse navnene, uansett store og små bokstaver, men uten mellomrom rundt:

- Development: `development`, `dev`, `local` og `localtest`
- Staging: `staging`, `test`, `at22`, `at23`, `at24`, `tt02` og `yt01`
- Production: `production`, `prod` og `produksjon`

Kategori `Process`, alvorlighetsgrad **advarsel**. Det er en advarsel fordi oppføringen kan være
ment for et miljønavn appen heller ikke kjenner igjen.

Bruk et miljønavn fra listen, skriv attributtet som `env`, eller flytt det til elementet som tar
imot det.

Se [oppgavetypene og innstillingene deres]({{< relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}).
