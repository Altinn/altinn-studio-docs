---
draft: true
title: Sortering
description: Slik sorterer du valgene i listen
weight: 300
tags: [needsReview, translate]
---

Systemet viser svaralternativer vanligvis i rekkefølgen de er definert i, men det er også mulig å sortere dem alfabetisk etter ledetekst (`label`). Dette kan være nyttig for å gjøre det enklere for brukeren å finne det alternativet de leter etter når listen ikke må være i en spesifikk rekkefølge.

Verdt å vite:

- Sorteringen kan endre seg underveis dersom brukeren endrer språk i skjemaet.
- Systemet sorterer etter at det har funnet [forhåndsvalgt verdi](../preselection/). Det betyr at sorteringsrekkefølgen ikke skal påvirke hvilket svaralternativ som er forhåndsvalgt.

## Konfigurasjon

Egenskapen `sortOrder` er valgfri, og du kan sette den til en av følgende verdier:

- `asc` (ascending) - sorterer i stigende rekkefølge. Systemet sorterer tekster alfabetisk fra A til Å.
- `desc` (descending) - sorterer i synkende rekkefølge. Systemet sorterer tekster alfabetisk fra Å til A.

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

I konfigurasjonen over vil systemet sortere svaralternativene alfabetisk i stigende rekkefølge, og "Ku" vil være forhåndsvalgt selv om det ikke er det første alternativet systemet viser for brukeren.
