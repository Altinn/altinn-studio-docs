---
title: Query parametere
description: Tilgjengelige query parameter for en app.
weight: 200
---

## returnUrl

Query parameteret `returnUrl` brukes av appen for å videresende brukeren til den spesifiserte verdien i `returnUrl`, når
brukeren trykker på avslutt-knappen i appen.

Gyldige verdier til `returnUrl` er et gyldig URL-format og at host navnet i URLen er det samme som appen man lenker til.

Eksempel:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.tt02.altinn.no/foo/foobar

Her ser man at `returnUrl` er en gyldig URL og at den peker mot samme host navn som appen.

Man kan derimot ikke lenke til annet host navn:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.altinn.no/foo/foobar

Hvis `returnUrl` inneholder spesialtegnet `#` er det viktig at man escaper det tegnet. Man kan escape det ved å erstatte
alle `#` med `%23`. Hvis man ikke erstatter tegnet, vil app frontend ha utfordringer med å tyde hvilken `#` den skal 
bruke for verdier og navigering.