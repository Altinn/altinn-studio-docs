---
title: Sortering
description: Sortere valgene i listen
weight: 300
---

Svaralternativer vises vanligvis i rekkefølgen de er definert i, men det er også mulig å sortere dem alfabetisk etter
ledetekst (`label`). Dette kan være nyttig for å gjøre det enklere for brukeren å finne det alternativet de leter etter
når listen ikke må være i en spesifikk rekkefølge.

Verdt å vite:

1. Sorteringen kan endre seg underveis dersom brukeren endrer språk i skjemaet.
2. Selve sorteringen gjøres etter [forhåndsvalgt verdi](../preselection) har blitt funnet. Det betyr at
   sorteringsrekkefølgen ikke skal påvirke hvilket svaralternativ som er forhåndsvalgt.

### Konfigurasjon

Egenskapen `sortOrder` er valgfri, og kan settes til en av følgende verdier:

- `asc` (ascending) - sorterer i stigende rekkefølge. Tekster sorteres alfabetisk fra A til Å.
- `desc` (descending) - sorterer i synkende rekkefølge. Tekster sorteres alfabetisk fra Å til A.

Eksempel-konfigurasjon:

```json {hl_lines=[10]}
{
  "id": "sort-example",
  "type": "RadioButtons",
  "options": [
    { "value": "1", "label": "Ku" },
    { "value": "2", "label": "Hest" },
    { "value": "3", "label": "Katt" },
    { "value": "4", "label": "Hund" }
  ],
  "sortOrder": "asc",
  "preselectedOptionIndex": 0
}
```

I konfigurasjonen over vil svaralternativene sorteres alfabetisk i stigende rekkefølge, og "Ku" vil være forhåndsvalgt
selv om det ikke er det første alternativet som vises for brukeren.