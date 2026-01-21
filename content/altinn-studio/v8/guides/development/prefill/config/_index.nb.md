---
title: Forhåndsutfyll data automatisk - konfigurasjonsfil
linktitle: Konfigurasjon
description: Slik setter du opp automatisk utfylling av skjemadata med konfigurasjonsfil.
toc: false
weight: 200
---

## Hva gjør denne funksjonen?
Altinn-appen din kan automatisk fylle ut deler av skjemaet før brukeren begynner. Dataene kan hentes fra:
- Enhetsregisteret (for bedriftsinfo)
- Folkeregisteret (for personinfo)
- Brukerens Altinn-profil.

Når noen starter skjemaet, blir feltene du velger fylt ut automatisk med riktige data.

## Når bør jeg bruke dette?
Hvis du skal forhåndsutfylle data fra en av kildene listet over. Det er et begrenset sett med felter som er tilgjengelige,
se [fullstendig liste over tilgjengelige datafelt for alle kildene](/nb/altinn-studio/v8/reference/data/prefill/).

Trenger du data fra andre kilder? Gå til [forhåndsutfylling med egendefinert kode](/nb/altinn-studio/v8/guides/development/prefill/custom/).

## Slik setter du det opp
{.floating-bullet-numbers-sibling-ol}

1. **Opprett en ny fil**

   Gå til mappen  `App/models` i appen din og opprett en ny fil med navn `[datamodellnavn].prefill.json`

   Hvis datamodellen din heter _appModel_ skal du ha disse filene:
   - `appModel.cs` 
   - `appModel.schema.json` 
   - `appModel.prefill.json`  &larr; *den nye filen*

2. **Legg inn grunnkonfigurasjon**

   Kopier denne konfigurasjonskoden inn i den nye filen:

   ```json
   {
      "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
      "allowOverwrite": true,
      "ER": {},
      "DSF": {},
      "UserProfile": {},
      "DAN": {}
   }
   ```

3. **Konfigurer hvilke data som skal fylles ut automatisk**

   De tre gruppene i koden speiler de tre kildene som er tilgjengelige:
   - `ER` - Enhetsregisteret
   - `DSF` - Folkeregisteret
   - `UserProfile` - Brukerens Altinn-profil
   - `DAN` - Datasett fra data.altinn.no

   Du velger hvilke av kildene du ønsker å bruke. Om en (eller flere) av kildene ikke skal brukes, lar du de stå tomme.

   Inne i gruppen for den aktuelle kilden legger du til linjer som forteller:
   - Hvilket felt (fra kilden) du vil hente data fra
   - Hvilket felt i skjemaet som skal fylles ut

   Formatet er `"datafelt": "skjemafelt"`, der:
   - `datafelt` er navnet på feltet _fra kilden_
   - `skjemafelt` er navnet på feltet i skjemaets datamodell.

   Se [fullstendig liste over tilgjengelige datafelt for alle kildene](/nb/altinn-studio/v8/reference/data/prefill/).

## Eksempler

Alle eksemplene tar utgangspunkt i datamodellen vist under:

![Datamodell for skjema](exampleModel.png "Datamodell for skjema")

### Hent organisasjonsnummer fra Enhetsregisteret (ER)

Dette fyller ut feltet `Organisasjon.Orgnr` med organisasjonsnummeret 
Enhetsregisteret:

```json
"ER": {
  "OrgNumber": "Organisasjon.Orgnr"
}
```

### Eksempel: Hent personnummer fra Folkeregisteret (DSF)

Dette fyller ut feltet `Person.Personnr` med personnummer fra Folkeregistret.

 ```json
"DSF": {
  "SSN": "Person.Personnr"
}
```

### Eksempel: Hent e-post fra brukerens Altinn-profil

Dette fyller ut feltet `Bruker.Epost` med e-post hentet fra brukerens Altinn-profil.

```json
"UserProfile": {
  "Email": "Bruker.Epost"
}
```

### Eksempel: Hente ut datasett fra data.altinn.no

Dette fyller ut feltet `Organization.OrgNo` med organisasjonsnummer fra UnitBasicInformation datasettet fra DAN.

````json
"DAN": {
    "datasets": [
      {
        "name": "UnitBasicInformation",
        "mappings": 
        [
          { "OrganizationNumber": "Organization.OrgNo" }
        ]
      }
    ]
  }
````
DAN kan bruke flere datasett samtidig. Hvis du vil bruke flere datasett, kan du gjøre dette slik.

````json
"DAN": {
    "datasets": [
      {
        "name": "UnitBasicInformation",
        "mappings": [
          { "OrganizationNumber": "Organization.OrgNo" }
        ]
      },
      {
        "name": "nameOfAnotherDataset",
        "mappings":[
          {"SSN": "Person.PersonNr"},
          {"Email": "User.Email"}
        ]
      }
    ]
  }
````
