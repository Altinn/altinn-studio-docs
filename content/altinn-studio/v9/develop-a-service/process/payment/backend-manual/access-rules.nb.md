---
hidden: true
tags: [needsReview]
---

Brukeren som skal betale, må ha rettigheter til handlingene `read`, `write`, `pay`, `confirm` og `reject` på betalingssteget.

Brukeren trenger `write` fordi appen lagrer og oppdaterer betalingsinformasjonen med tilgangene til brukeren, mens betalingssteget pågår. Standardpolicyen som følger med appen, gir rollene Privatperson (PRIV) og Daglig leder (DAGL) `read` og `write` for hele appen. Hvis du gir andre roller eller tilgangspakker tilgang til betalingssteget, må du også gi dem `write` på steget.
