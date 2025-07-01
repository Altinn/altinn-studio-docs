---
title: Forhåndsutfyll data automatisk - konfigurasjonsfil
linktitle: Konfigurasjon
description: Hvordan sette opp automatisk forhåndsutfylling av data via konfigurasjonsfil.
toc: false
weight: 200
---

Slik setter du opp automatisk utfylling av skjemadata med konfigurasjonsfil.

## Hva gjør denne funksjonen?
Altinn-appen din kan automatisk fylle ut deler av skjemaet før brukeren begynner. Dataene kan hentes fra:
- Enhetsregisteret (for bedriftsinfo)
- Folkeregisteret (for personinfo)
- Brukerens Altinn-profil.

Når noen starter skjemaet, blir feltene du velger fylt ut automatisk med riktige data.

## Slik setter du det opp

### 1. Opprett en ny fil

Gå til mappen  `App/models` i appen din og opprett en ny fil.
**Viktig:** Filen må hete `[datamodellnavn].prefill.json`
Eksempel: Hvis datamodellen din heter _appModel_ skal du ha disse filene:
- `appModel.cs` 
- `appModel.schema.json` 
- `appModel.prefill.json`  &larr; *den nye filen*

### 2. Legg inn grunnkonfigurasjon

Kopier denne konfigurasjonskoden inn i den nye filen:

```json
{
    "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
    "allowOverwrite": true,
    "ER": {
    },
    "DSF": {
    },
    "UserProfile": {
    }
}
```

### 3. Konfigurer hvilke data som skal fylles ut automatisk

De tre gruppene i koden speiler de tre kildene som er tilgjengelige:
- `ER` - Enhetsregisteret
- `DSF` - Folkeregisteret
- `UserProfile` - Brukerens Altinn-profil

Du velger hvilke av kildene du ønsker å bruke. Om en (eller flere) av kildene ikke skal brukes, lar du de stå tomme.

Inne i gruppen for den aktuelle kilden legger du til linjer som forteller:
- Hvilket felt (fra kilden) du vil hente data fra
- Hvilket felt i skjemaet som skal fylles ut

Formatet er `"datafelt": "skjemafelt"`, der:
- `datafelt` er navnet på feltet _fra kilden_
- `skjemafelt` er navnet på feltet i skjemaets datamodell.

Se [fullstendig liste over tilgjengelige datafelt for alle kildene](../../../../reference/data/prefill).

## Eksempler

Alle eksemplene tar utgangspunkt i datamodellen vist under:

![Datamodell for skjema](exampleModel.png "Datamodell for skjema")

### Hent organisasjonsnummer fra Enhetsregisteret (ER)

Dette fyller ut feltet `Organisasjon.Orgnr` med organisasjonsnummeret 
Enhetsregisteret:

```json
"ER": {
    "OrgNumber":"Organisasjon.Orgnr"
}
```

### Eksempel: Hent personnummer fra Folkeregisteret (DSF)

Dette fyller ut feltet `Person.Personnr` med personnummer fra Folkeregistret.

 ```json
"DSF": {
    "SSN":"Person.Personnr"
}
```

### Eksempel: Hent e-post fra brukerens Altinn-profil

Dette fyller ut feltet `Bruker.Epost` med e-post hentet fra brukerens Altinn-profil.

```json
"UserProfile": {
    "Email":"Bruker.Epost"
}
```
