---
title: Exposing service as API
linktitle: Exposing as API
description: Solution for designing service UI, defining workflow, other settings, deploy ++
tags: ["tjenester 3.0"]
weight: 100
---


### Build API

As the 

På samme måte som at tjenester kan ha brukergrensesnitt (UX), så skal også en tjeneste kunne ha ett eller flere API, altså tekniske grensesnitt.
Derfor må det være mulig å bygge og teste API'er, og det skal også være mulig å lage tjenester helt uten UX.

En potensiell fordel ved å kunne ha egne API'er pr. tjeneste er at dokumentasjon og definisjon av API'ene kan spisses og gjøres bedre og enklere
å ta i bruk. Dette i kontrast til de [generelle API'ene](https://altinn.github.io/docs/guides/integrasjon/sluttbrukere/api/),
der payload bare er en tekststreng som vil variere basert på hvilken TUL-tjeneste som benyttes.

:warning: Pga. ønske om bakoverkompatibilitet, så er det en ambisjon at dagens generelle API'er også skal fungere med 3.0-tjenester.

Her er vi litt i tenkeboksen i forhold til hva som er mulig å få til, og hvordan dette kan fungere.
