---
title: 'Front channel embeds'
description: 'Lær hvordan front channel embeds kan gi en mer dynamisk og sikker levering av brukerinnhold'
weight: 40
---

## Introduksjon
En front channel embed er en spesiell type innhold som kan defineres, hvor det i stedet for en bokstavelig tekst for hver lokalisering er en URL som refererer til det faktiske innholdet/nyttelasten, som skal hentes og bygges direkte inn i det grafiske brukergrensesnittet.

Front channel embeds muliggjør en mer sammenhengende brukeropplevelse, ved å unngå å måtte gjøre en fullstendig sidenavigering eller bruke vedlegg/eksterne lenker for å få tilgang til innholdet.

{{<figure class="mx-xl-4" src="../../media/frontchannel-embeds-gui.png" alt="Figur som viser en dialog med statisk innhold og en med en front channel embedded side om side" caption="Dialog uten front channel embed til venstre, som viser en lenke. Front channel embed til høyre, som viser det faktiske innholdet">}}

## Bruk
I likhet med visning av en enkel lenke, blir innhold som vises via front channel embeds **ikke lagret i Dialogporten, eller hentet via eller sendt gjennom den**. "Front channel", som vanligvis refererer til den delen av sluttbrukersystemet som kjører i brukerens nettleser (vanligvis en javascript-applikasjon), håndterer henting av innholdet og gjengivelse av innholdet. Ved å levere [dialogtoken](/nb/dialogporten/getting-started/front-channel-embeds/../authorization/dialog-tokens/), er det mulig å gjøre en enkelt, direkte forespørsel til et eksternt endepunkt, som deretter kan autentisere og autorisere forespørselen, og returnere innholdet direkte tilbake til frontend for å gjengi og bygge inn i brukergrensesnittet.

Tjenesteeiers system må implementere støtte for front channel embeds for å håndtere front channel embeds og nettlesers sikkerhetsmekanismer ([CORS protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)). Mer informasjon om dette i referanseseksjonen.


**Les mer**
* [Håndtering av front channel embeds i dialogdetaljer](/nb/dialogporten/getting-started/front-channel-embeds/../../user-guides/getting-dialog-details/#håndtering-av-front-channel-embeds)
* {{<link "../../reference/front-end/front-channel-embeds">}}

{{<children />}}