---
title: 'Finne autoriserte parter'
description: 'Hvordan få listen over parter som kan representeres'
weight: 15
toc: true
---

## Introduksjon

Denne veiledningen viser hvordan du bruker Dialogportens proxy-API mot Altinn Access Management for å hente listen over [autoriserte parter](../../getting-started/authorization/parties/#autoriserte-parter) som den autentiserte brukeren har tilgang til.

## Grunnleggende steg (REST)

1. [Autentiser som sluttbruker](../authenticating/#bruk-for-sluttbrukersystemer)
2. Utfør en GET-forespørsel mot `/api/v1/enduser/parties`

### Returnert informasjon

Den returnerte datastrukturen består av alle partene sluttbrukeren kan representere, noe som som et minimum vil inkludere dem selv. Dette inkluderer:
* Navnet på parten, fullt navn for personer eller organisasjonsnavn
* Identifikatoren for parten, som kan brukes når du [søker etter dialoger](../searching-for-dialogs/)
* Om parten er den nåværende brukeren
* Om brukeren har spesielle roller for parten

Merk at organisasjoner kan ha relasjoner mellom forelder og barn, ett nivå. En sluttbruker kan ha tilgang til en underorganisasjon, men ikke dens forelder. Forelderen vil likevel bli inkludert for visningsformål, men markeres som kun til stede for å vise hierarkiet.

Merk også at slettede organisasjoner inkluderes. Se referanselenken nedenfor for fullstendige detaljer.

**Les mer**
* {{<link "../../reference/authorization/parties">}}
* {{<link "../searching-for-dialogs">}}

## Grunnleggende steg (GraphQL)

Den samme funksjonaliteten er tilgjengelig i GraphQL gjennom `getParties`.

Eksempel:

```graphql
query {
  getParties {
    party
    partyUuid
    partyId
    name
    partyType
    isDeleted
    hasKeyRole
    isCurrentEndUser
    isMainAdministrator
    isAccessManager
    hasOnlyAccessToSubParties
    subParties {
      party
      partyUuid
      partyId
      name
      partyType
      isDeleted
      hasKeyRole
      isCurrentEndUser
      isMainAdministrator
      isAccessManager
    }
  }
}
```

Feltet `party` i svaret er parti-URN-en du bruker i [dialogsøk](../searching-for-dialogs/). De øvrige feltene beskriver parten og forholdet den autentiserte brukeren har til den, inkludert om parten er den nåværende sluttbrukeren og om brukeren har viktige administrative roller.

{{<children />}}
