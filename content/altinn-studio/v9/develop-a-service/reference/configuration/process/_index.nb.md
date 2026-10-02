---
draft: true
title: Definere applikasjonsprosess
linktitle: Prosess
description: Slik definerer du prosessen til en tjeneste.
weight: 200
tags: [needsReview]
---

En tjeneste har en definert prosess som styrer flyten. Prosessen er definert som [BPMN 2.0](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation).

## Støttede oppgavetyper

Du angir typen til en oppgave i `<altinn:taskType>` inne i `<altinn:taskExtension>` på oppgaven i `process.bpmn`.

Oppgaver som brukeren utfører:

- `data`: Brukeren fyller ut et skjema (tilsvarer utfyllingssteg i Altinn II).
- `confirmation`: Brukeren bekrefter før prosessen går videre.
- `feedback`: Appen venter på at et system hos tjenesteeieren oppdaterer instansen.
- `signing`: Brukeren signerer. Se [signering]({{< relref "/altinn-studio/v9/develop-a-service/process/signing" >}}).
- `payment`: Brukeren betaler. Se [betaling]({{< relref "/altinn-studio/v9/develop-a-service/process/payment" >}}).

[Systemoppgaver]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks" >}}) som appen utfører uten at brukeren gjør noe:

- `pdf`: Appen lager en PDF. Se [PDF]({{< relref "/altinn-studio/v9/develop-a-service/process/pdf" >}}).
- `subformPdf`: Appen lager en PDF for hvert underskjema.
- `eFormidling`: Appen sender data videre med [eFormidling]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}).
- `fiksArkiv`: Appen sender data til arkivet med [Fiks Arkiv]({{< relref "/altinn-studio/v9/receive-data/fiks-arkiv" >}}).

## Endre prosessen

Du kan endre prosessen i Altinn Studio Designer, eller ved å redigere BPMN-filen med en valgfri XML- eller BPMN-editor. Den ligger lagret i app-repoet som `App/config/process/process.bpmn`.

## Eksempel på prosessfil

Se [prosessfilen i app-malen for v9](https://github.com/Altinn/altinn-studio/blob/main/src/App/template/v9/src/App/config/process/process.bpmn). Den har en utfyllingsoppgave (`data`) og en systemoppgave som lager PDF (`pdf`).

{{<children />}}