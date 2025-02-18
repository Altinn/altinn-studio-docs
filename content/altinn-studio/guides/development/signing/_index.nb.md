---
title: Hvordan konfigurere signering i din Altinn-app 
linktitle: Signering
description: Nedenfor finner du guider for vanlige oppsett av signering som dekker ulike scenario.
tags: [signering]
weight: 50
aliases:
- /nb/altinn-studio/guides/signing/
---

## Rollebasert
Et scenario hvor personer som skal signere har rettigheter til å lese og signere på grunn av en rolle de innehar, for eksempel daglig leder eller revisor.

[Slik gjør du det](/nb/altinn-studio/guides/development/signing/role-based-signing)

## Brukerstyrt
Et vanlig scenario er at sluttbruker oppgir fødselsnummmer for personer og organisasjonsnummer for virksomheter som skal signere skjemaet.
De som oppgis får delegert rettigheter til å lese skjemadata og til å signere. De vil også kunne motta varsel på E-post eller SMS om at de har en signeringsoppgave i Altinn, basert på konfigurasjon.

[Slik gjør du det](/nb/altinn-studio/guides/development/signing/runtime-delegated-signing)

## Signer og send inn
Et scenario hvor utfyller av skjemaet også skal signere på dataene samtidig som skjemaet sendes inn.

[Slik gjør du det](/nb/altinn-studio/guides/development/signing/sign-and-submit)