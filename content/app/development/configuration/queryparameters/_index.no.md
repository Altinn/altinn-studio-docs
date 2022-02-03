---
title: Query parametere
description: Tilgjengelige query parametere for en app.
weight: 200
---

## returnUrl

Query parameteret `returnUrl` brukes av appen for å videresende brukeren til den spesifiserte verdien i `returnUrl`, når
brukeren trykker på avslutt-knappen i appen.

**Regler:**
- `returnUrl` må ha et gyldig URL-format
- Host navnet definert i `returnUrl` må være det samme som appen man lenker til (se eksempelet nedenfor).

Eksempel:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.tt02.altinn.no/foo/foobar

Her ser man at `returnUrl` er en gyldig URL og at den peker mot samme host navn som appen.

Man kan derimot ikke lenke til annet host navn:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.altinn.no/foo/foobar

Det er viktig med korrekt rekkefølge i URLen, og her er et eksempel som viser den korrekte rekkefølgen:
https://ttd.apps.at21.altinn.cloud/ttd/level1-app?returnUrl=https%3A%2F%2Fttd.apps.at21.altinn.cloud%2Fttd%2Fapps-test%2F%23%2Finstance%2Finstanceownerid%2Finstanceguid/#/instance/instanceownerid/instanceguid

Merk at returnURL verdien har escaped alle spesialtegn. Det er hovedsakelig kun nødvendig kun på tegnet `#` som beskrevet
nedenfor. 

Hvis `returnUrl` inneholder spesialtegnet `#` er det viktig at man escaper det tegnet. Man kan escape det ved å erstatte
alle `#` med `%23`. Hvis man ikke erstatter tegnet, vil app frontend ha utfordringer med å tyde hvilken `#` den skal 
bruke for verdier og navigering.
