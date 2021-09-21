---
title: Innstillinger for felt
linktitle: Innstillinger
description: Innstillinger for tekster knyttet til et felt.
toc: false
---

{{%notice warning%}}

Dette er helt ny funksjonalitet. Oppsett må gjøres manuelt direkte i form layout inntil videre.

**MERK:** Denne funksjonaliteten krever app-frontend versjon 3. Se [denne lenken](/nb/community/changelog/app-frontend/v3/breaking-changes/).

{{%/notice%}}

## Indikere at felt er valgfritt

Det er mulig å styre om et felt er markert som valgfritt eller ikke. Normal oppførsel er at felt som er valgfrie blir markert som valgfrie.

![Valgfritt](optional.png "Markering av valgfritt felt.")


Normal oppførsel kan overstyres ved hjelp av innstillinger knyttet til feltbeskrivelsen. Dette gjøres via `labelSettings` på en komponent i form layout.

```json
{
  {
    "id": "input-felt-1",
    "type": "Input",
    ... 
    "labelSettings": {
      "optionalIndicator": false
    }
  }
}
```

Ved å sette `optionalIndicator` til `false` vil teksten, som indikerer at feltet er valgfritt, ikke bli vist.
Det er ikke mulig å tvinge visning av *Valgfri* teksten på et felt som er obligatorisk. Denne innstillingen styrer ikke feltets faktiske egenskaper.
