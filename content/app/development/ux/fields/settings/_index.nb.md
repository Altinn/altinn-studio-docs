---
title: Innstillinger for felt
linktitle: Innstillinger
description: Innstillinger for tekster knyttet til et felt.
toc: false
---

{{%notice warning%}}

Oppsett av denne funksjonaliteten må gjøres manuelt direkte i form layout inntil videre.

**MERK:** Denne funksjonaliteten krever app-frontend versjon 3. Se [denne lenken](/nb/community/changelog/app-frontend/v3/breaking-changes/).

{{%/notice%}}

## Indikere at felt er valgfritt

Det er mulig å styre om et felt er markert som valgfritt eller ikke. Normal oppførsel er at felt som er påkrevd er markert
med en *, valgfrie felter har ingen markering.

![Optional default](optional-default.png "Normal oppførsel for valgfritt felt (ingen markering).")

![Required default](required.png "Normal oppførsel for påkrevd felt (markert med *).")


Normal oppførsel kan overstyres ved hjelp av innstillinger knyttet til feltbeskrivelsen. Dette gjøres via `labelSettings` 
på en komponent i form layout.

```json
{
  {
    "id": "input-felt-1",
    "type": "Input",
    ... 
    "labelSettings": {
      "optionalIndicator": true
    }
  }
}
```

Ved å sette `optionalIndicator` til `true` vil teksten `(Valgfri)` bli vist bak ledeteksten til feltet.

![Valgfritt](optional.png "Markering av valgfritt felt.")

Det er ikke mulig å tvinge visning av *Valgfri* teksten på et felt som er obligatorisk. 
Denne innstillingen styrer ikke feltets faktiske egenskaper.
