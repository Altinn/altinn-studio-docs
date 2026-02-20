---
title: Definere applikasjonsprosess
linktitle: Prosess
description: Slik definerer du prosessen til en tjeneste.
weight: 200
tags: [needsReview]
---

En tjeneste har en definert prosess som styrer flyten. Prosessen er definert som [BPMN 2.0](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation).

## Støttede oppgavetyper

Applikasjonsmalen støtter disse oppgavetypene

- Data (tilsvarer utfyllingssteg i Altinn II)
- Bekreftelse
- Tilbakemelding

## Fremtidige oppgavetyper (tentativ)

- Signering
- Betaling
- Parallellsignering
- Brukerstyrt signering
- Ekstern validering

## Endre prosessen

Du kan endre prosessen ved å redigere BPMN-filen med en valgfri XML- eller BPMN-editor. Den ligger lagret i app-lageret som `App/config/process/process.bpmn`.

## Eksempler på process-filer

- [Data_Confirmation_Process.bpmn](/nb/altinn-studio/v8/reference/configuration/process/Data_Confirmation_Process.bpmn)
- [Data_Data_Data_Process.bpmn](/nb/altinn-studio/v8/reference/configuration/process/Data_Data_Data_Process.bpmn)
- [Data_Process.bpmn](/nb/altinn-studio/v8/reference/configuration/process/Data_Process.bpmn)

{{<children />}}