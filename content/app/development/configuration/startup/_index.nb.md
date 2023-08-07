---
title: Konfigurer appens oppførsel under oppstart
linktitle: Startup
description: Hvordan konfigurere applikasjonens oppførsel under oppstart av app-frontend
toc: true
weight: 500
---

I `applicationmetadata.json` har man mulighet til å styre hva applikasjonen viser i det brukeren går mot en direktelenke.
Dette gjøres under feltet `onEntry.show`, hvor man har mulighet til å sette verdiene `new-instance` (default) eller `select-instance`.
Standard oppførsel om dette feltet ikke er satt er at det lages en ny instans for brukeren som besøker applikasjonen.

## Velge fra aktive instanser

{{%notice warning%}}

**MERK:** for å benytte denne funksjonaliteten må man ha versjon >= 4.15.2 av nugetpakkene `Altinn.App.PlatformServices`, `Altinn.App.Common` og `Altinn.App.Api`.

{{%/notice%}}

Om man setter feltet til `onEntry.show` til `select-instance` vil brukeren bli presentert med en liste av aktive instanser for den valgte avgiver når man navigerer seg til en applikasjon.

### Eksempel
Følgende konfigurasjon legges til i `applicationmetadata.json` for å sette opp valg av aktive instanser.
```json {hl_lines=[8,9,10]}
{
  "id": "ttd/demo-app",
  "org": "ttd",
  "title": {
    "nb": "Starte fra aktiv instans"
  },
  ...
  "onEntry": {
    "show": "select-instance"
  }
}
```

For brukere som ikke har noen aktive instanser vil det automatisk bli opprettet en instans.
Brukere som har aktive instanser vil bli presentert med følgende brukergrensesnitt:

![Brukergrensesnitt for å velge aktiv instans](select-active-instance.png "Brukergrensesnitt for å velge aktiv instans")

## Konfigurer side for instansvalg

{{%notice warning%}}
**MERK:** For å bruke denne funksjonaliteten, må applikasjonen referere til versjon >= 7.12.0 av nuget-pakkene
`Altinn.App.core` og `Altinn.App.Api`.
{{%/notice%}}

Ved hjelp av feltet `onEntry.instanceSelection` kan du tilpasse siden for instansvalg ytterligere. Følgende
alternativer er tilgjengelige:

- `sortDirection`: Velg mellom `asc` eller `desc` for å sortere instansene stigende eller synkende. Standard er `desc`.
- `rowsPerPageOptions`: Velg hvilke alternativer brukeren kan velge mellom når han/hun bestemmer hvor mange instanser
som skal vises per side. Standard er `[10, 25, 50]`.
- `defaultRowsPerPage`: Velg hvilket alternativ som skal være valgt som standard når brukeren åpner siden for
instansvalg. Verdien må være et tall som brukes som index for å velge en verdi i `rowsPerPageOptions`. Standard er `0`.

### Configuration Example

Følgende konfigurasjon legges til i `applicationmetadata.json` for å konfigurere siden for instansvalg.

```json {hl_lines=[10,11,12,13]}
{
  "id": "ttd/demo-app",
  "org": "ttd",
  "title": {
    "nb": "Starte fra aktiv instans"
  },
  ...
  "onEntry": {
    "show": "select-instance",
    "instanceSelection": {
      "sortDirection": "asc",
      "rowsPerPageOptions": [10, 25, 50, 100],
      "defaultRowsPerPage": 1,
    }
  }
}
```

![Konfigurert brukergrensesnitt for valg av aktive instanser](select-active-instance-configured.png "Konfigurert brukergrensesnitt for valg av aktive instanser")
