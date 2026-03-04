---
title: Tilpasninger i egenutviklet kode
linktitle: Egne tilpasninger
description: Gjør tilpasninger i appen din med egen kode
draft: true
weight: 40
---

## Om bruk av egen kode i en Altinn-app
En Altinn app er en komplett web-applikasjon, og dermed er det fullt mulig å legge inn egne tilpasninger for å støtte mer 
enn standard konfigurasjon støtter. 

### Eksempler på bruksområder
Listen er ikke utfyllende - her kan du i praksis få til hva som helst!

- Validere ved oppstart av f.eks. et skjema med avansert valideringslogikk, oppslag eller lignende.
- Forhåndsutfylle fra egne systemer dynamisk
- Beregninger og annen logikk underveis i utfylling
- Oppslag mot eksterne kilder underveis i utfylling og/eller ved innsending
- Logikk og/eller avansert validering ifm innsending eller overgang til ny oppgave i prosessen
- Lage/hente inn dynamiske kodelister
- Oppsett på funksjonalitet som ikke enda er støttet via konfigurasjon alene, f.eks. betaling.
- Behov for nye konsepter som ikke er støttet ut av boksen i en Altinn-app per i dag

<!-- ## Konsept: Dependency injection
En Altinn-app bruker biblioteker som Digdir utvikler og forvalter. Gjennom disse bibliotekene eksponeres det grensesnitt
for konkret funksjonalitet. Når disse grensesnittene implementeres i din app og registreres der, vil koden som er implementert
kjøres ved definerte tidspunkt/hendelser. -->