---
title: Delegere API-tilganger til en leverandør
linktitle: Delegere API-tilganger
description: Beskrivelse av hvordan tjenesteier kan delegere API-tilganger (scopes) til en underleverandør.
toc: true
---

Enkelte tjenesteeiere ønsker at en underleverandør skal kunne agere på vegne av dem, f.eks. leverandører av fagsystemer.
For å få til det, så må disse API-tilgangene delegeres til leverandøren ved bruk av Altinn.

Det er tjenesteeiers ansvar å selv fjerne delegeringene om behovet for tilgang hos leverandør forsvinner.

## Delegering av API-tilganger til leverandør

Som en bruker som er nøkkelrolleinnehaver for tjenesteeier (typisk daglig leder aka DAGL), åpne "Tilgang til Programmeringsgrensesnitt - API".

![Tilgang til Programmeringsgrensesnitt](nb_delegate-scopes-01.png "Tilgang til Programmeringsgrensesnitt - API")

![Legg til leverandør](nb_delegate-scopes-02.png "Legg til leverandørens organisasjon")

![Gå videre](nb_delegate-scopes-03.png "Gå videre til neste steg")

Så må de nødvendige rettighetene gis.

- **Altinn tjenesteeier-API: Appinstanser (full tilgang)** - gir tilgang til [scopes](#scopes) for både read og write.
- **Altinn tjenesteeier-API: Appinstanser (lesetilgang)** - gir kun tilgang til read.

![Gi rettigheter til leverandør](nb_delegate-scopes-04.png "Gi de nødvendige rettighetene til leverandør")

![Gå videre](nb_delegate-scopes-05.png "Gå videre til neste steg")

![Bekreft](nb_delegate-scopes-06.png "Bekreft")

![Til oversikten](nb_delegate-scopes-07.png "Gå tilbake til oversikten")

## Fjerning av delegering

Delegeringer som er gjort kan også fjernes.
Om en leverandør ikke lenger har behov for API-tilganger så er det tjenesteeier sitt ansvar å fjerne disse.

![Fjern rettigheter](nb_revoke-scopes-01.png "Trykk på \"Rediger tilganger\"")

![Velg rettigheter å fjerne](nb_revoke-scopes-02.png "Velg rettigheter å fjerne")

![Lagre endringene](nb_revoke-scopes-03.png "Lagre endringene")

![Angre fjern rettigheter](nb_revoke-scopes-04.png "Det er mulig å angre fjerning av rettigheter")

![Oversiktsiden viser gjenværende delegeringer](nb_revoke-scopes-05.png "Oversiktsiden viser gjenværende delegeringer")

## Scopes

Delegering gir tilgang til disse scopene for leverandør:

```js
altinn:serviceowner/instances.read
altinn:serviceowner/instances.write
```
