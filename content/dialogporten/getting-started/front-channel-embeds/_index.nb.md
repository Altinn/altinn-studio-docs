---
title: 'Frontkanal-innbygginger'
description: 'Lær hvordan frontkanal-innbygginger kan gi en mer dynamisk og sikker levering av brukerinnhold'
weight: 40
---

## Introduksjon
En frontkanal-innbygging er en spesiell type innhold som kan defineres, hvor det istedenfor en bokstavelig tekst for hver lokalisering er en URL som refererer til det faktiske innholdet/nyttelasten, som skal hentes og bygges direkte inn i det grafiske brukergrensesnittet.

Frontkanal-innbygginger muliggjør en mer sammenhengende brukeropplevelse, ved å unngå å måtte gjøre en fullstendig sidenavigering eller bruke vedlegg/eksterne lenker for å få tilgang til innholdet.

{{<figure class="mx-xl-4" src="../../media/frontchannel-embeds-gui.png" alt="Figur som viser en dialog med statisk innhold og en med en frontkanal-innebygd side ved side" caption="Dialog uten frontkanal-innbygging til venstre, som viser en lenke. Frontkanal-innbygging til høyre, som viser det faktiske innholdet">}}

## Bruk
På samme måte som å vise en enkel lenke, blir innhold som vises via frontkanal-innbygginger **ikke lagret i Dialogporten, eller hentet via eller sendt gjennom den**. "Frontkanalen", som vanligvis refererer til den delen av sluttbruker-systemet som kjører i brukerens nettleser (vanligvis en javascript-applikasjon), håndterer hentingen av innholdet og gjengivelsen av innholdet. Ved å levere [dialog token]({{<relref "../authorization/dialog-tokens">}}), er det mulig å gjøre en enkelt, direkte forespørsel til et eksternt endepunkt, som deretter kan autentisere og autorisere forespørselen, og returnere innholdet direkte tilbake til frontend for å gjengi og bygge inn i brukergrensesnittet.

Tjenesteeier-systemet må implementere støtte for frontkanal-innbygginger for å håndtere frontkanal-innbygginger og nettlesersikkerhetsmekanismer ([CORS protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)). Mer informasjon om dette i referanseseksjonen.


**Les mer**
* [Håndtering av frontkanal-innbygginger i dialogdetaljer]({{<relref "../../user-guides/getting-dialog-details/#handling-front-channel-embeds">}})
* {{<link "../../reference/front-end/front-channel-embeds">}}

{{<children />}}