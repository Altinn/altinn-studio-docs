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
- Verdien til `returnUrl` må være en base64-streng

Eksempel uten base64:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.tt02.altinn.no/foo/foobar

Eksempel med base64:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=aHR0cHM6Ly9mb28uYXBwcy50dDAyLmFsdGlubi5uby9mb28vZm9vYmFy

Her ser man at `returnUrl` er en gyldig URL og at den peker mot samme host navn som appen.

Eksemplene under inneholder ikke base64 for lesbarhet.

Man kan derimot ikke lenke til annet host navn:  
https://foo.apps.tt02.altinn.no/foo/bar?returnUrl=https://foo.apps.altinn.no/foo/foobar

Det er viktig med korrekt rekkefølge i URLen, og her er et eksempel som viser den korrekte rekkefølgen:
https://ttd.apps.at21.altinn.cloud/ttd/level1-app?returnUrl=https%3A%2F%2Fttd.apps.at21.altinn.cloud%2Fttd%2Fapps-test%2F%23%2Finstance%2Finstanceownerid%2Finstanceguid/#/instance/instanceownerid/instanceguid