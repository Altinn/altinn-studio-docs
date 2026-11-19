---
draft: true
title: "ALTINNAPP1021: oppgaven har et element appen ignorerer"
description: "Et element i oppsettet av en oppgave i process.bpmn har ingen effekt, fordi appen ikke leser det"
weight: 121
---

Denne diagnostikken meldes når oppsettet av en oppgave i `config/process/process.bpmn` har et
element som appen hopper over når den leser prosessen. Meldingen navngir oppgaven, elementet og
hvor det står, hvorfor appen ignorerer det, og hvordan du retter det.

Regelen melder disse elementene:

- et element i Altinn-navnerommet (`http://altinn.no/process`) som appen ikke leser der det
  står: et feilstavet navn, et navn med feil bruk av store og små bokstaver, eller en innstilling
  i feil overordnet element
- en innstilling appen leser, men som står i et annet navnerom, for eksempel uten prefikset
  `altinn:`
- en ekstra forekomst av et element appen bare leser én gang, for eksempel
  `<altinn:signatureConfig>` eller `<altinn:signatureDataType>`

Elementer i andre navnerom med navn appen ikke leser, hører til andre verktøy, og regelen lar dem
være. Lister og innstillinger som varierer mellom miljøer, kan stå flere ganger.

Appen hopper over disse elementene uten å si fra, så innstillingen har ingen effekt.

Kategori `Process`, alvorlighetsgrad **advarsel**.

Rett navnet eller prefikset, flytt elementet eller fjern det. Hvis navnet bare skiller seg fra et
navn appen leser i store og små bokstaver, oppgir meldingen det riktige. Ellers lister den
elementene appen leser der. Står et element som appen bare leser én gang, flere ganger, beholder
du bare ett av dem.

Se [oppgavetypene og innstillingene deres]({{< relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}).
