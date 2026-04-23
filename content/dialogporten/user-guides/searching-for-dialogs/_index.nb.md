---
title: "Søke etter dialoger"
description: "Hvordan søke etter og filtrere dialoger i Dialogporten"
weight: 20
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Introduksjon

Denne veiledningen viser hvordan du søker etter dialoger i Dialogporten. Sluttbruker-API-et støtter både REST og GraphQL. Tjenesteeier-API-et støtter REST-søk med ekstra filtre som er nyttige når du administrerer dialoger og sluttbrukerkontekst.

Merk at datastrukturen som returneres i søk er forskjellig fra den som returneres fra [detaljendepunktet](/nb/dialogporten/user-guides/getting-dialog-details/); mer informasjon om dialogen og hvilken tilgang den autoriserte brukeren har til ulike deler av den er bare tilgjengelig i detaljvisningen.

## Grunnleggende steg (REST, sluttbruker)

1. [Autentiser som sluttbruker](/nb/dialogporten/user-guides/authenticating#usage-for-end-user-systems)
2. [Finn partene](/nb/dialogporten/user-guides/authorized-parties/) som den autentiserte sluttbrukeren er autorisert til å representere
3. Utfør en GET-forespørsel til `/api/v1/enduser/dialogs`, og oppgi query-parametere i henhold til tabellen nedenfor:

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialogs">}}

- Alle parametere av ulike typer kombineres med OG, dvs. hvis du oppgir `party` og `status`, returneres bare dialoger med den oppgitte statusen som eies av den oppgitte parten.
- Når flere verdier støttes for samme parameter, kombineres disse med ELLER, dvs. hvis du oppgir to `status`-parametere, returneres dialoger som har en av disse verdiene.
- `org`-parametere må være tjenesteeierkoder slik de er definert i den globale [altinn-orgs.json](https://altinncdn.no/orgs/altinn-orgs.json), f.eks. `digdir` eller `skd`.
- `party`-parametere må ha ett av følgende formater
  - `urn:altinn:person:identifier-no:<11 siffer fødselsnummer>`
  - `urn:altinn:organization:identifier-no:<9 siffer organisasjonsnummer>`
- `serviceResource`-parametere må referere til en ressurs i [Resource Registry](/nb/authorization/what-do-you-get/resourceadministration/) og bruke følgende format:
  - `urn:altinn:resource:<identifier>`

{{<notice warning>}}
Merk at søke-API-et for sluttbruker krever at minst én [`serviceResource`](/nb/dialogporten/getting-started/authorization/service-resource/) eller [`party`](/nb/dialogporten/getting-started/authorization/parties/) er oppgitt.
{{</notice>}}

### Returnert informasjon

Dette vil returnere en [samling av dialoger](/nb/dialogporten/reference/entities/dialog/#søk), som inneholder et delsett av informasjonen som returneres fra [endepunktet for dialogdetaljer](/nb/dialogporten/reference/entities/dialog/). Avhengig av søkeparametere og tilgangen til den autentiserte brukeren kan denne listen være tom.

Hvis ugyldige søkeparametere oppgis, returnerer API-et `400 Bad Request` og et svar som forklarer hvilke feil som ble funnet. Dette svaret følger standardformatet [ProblemDetails](https://datatracker.ietf.org/doc/html/rfc7807).

### Paginering

Søke-API-et er paginert ved hjelp av fortsettelsestoken, se parameteren `limit` ovenfor. Hvis det finnes flere sider som kan hentes, vil egenskapen `hasNextPage` være satt til true, og egenskapen `continuationToken` vil være satt til en verdi som skal brukes for å hente neste side. For å hente neste side oppgir du denne verdien som query-parameteren `continuationToken`. Dette bevarer sorteringen og unngår å miste elementer eller hente dem to ganger. Dette bør gjentas så lenge `hasNextPage` er true.

### Sortering

Sortering kan utføres på følgende kolonner:

- ContentUpdatedAt
- CreatedAt
- UpdatedAt
- DueAt

`contentupdatedat` er den anbefalte kolonnen når du sorterer dialoger for innboks-lignende visninger og for best ytelse.

Hvis ingen eksplisitt sortering oppgis, er standardrekkefølgen `contentupdatedat_desc`.

#### Eksempler

Dette er eksempelverdier som kan oppgis i query-parameteren `OrderBy`.

- `contentupdatedat_desc`
- `createdat`
- `createdat_asc`
- `dueat_asc`

Gjeldende sortering finner du i [samlingsmodellen](/nb/dialogporten/reference/entities/dialog/#søk), ved siden av feltene `continuationToken` og `hasNextPage`. I REST er sorteringen også bygget inn i `continuationToken`, så det er tilstrekkelig å oppgi fortsettelsestokenet alene for å bevare sorteringen.

## Grunnleggende steg (REST, tjenesteeier)

1. [Autentiser som tjenesteeier](/nb/dialogporten/user-guides/authenticating#usage-for-service-owner-systems)
2. Utfør en GET-forespørsel til `/api/v1/serviceowner/dialogs`, og oppgi query-parametere i henhold til tabellen nedenfor:

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs">}}

Søkeendepunktet for tjenesteeier støtter de samme grunnleggende dialogfiltrene som sluttbrukerendepunktet, og eksponerer i tillegg filtre for:

- `serviceOwnerLabels`, der alle oppgitte etiketter må matche
- `serviceOwnerLabels` med `*`-suffiks for prefikssøk, for eksempel `finance*`
- `visibleAfter` og `visibleBefore`

{{<notice info>}}
Fritekstsøk i tjenesteeierendepunktet krever `endUserId`. Hvis `endUserId` er oppgitt, må minst én av `serviceResource` eller `party` også være oppgitt.
{{</notice>}}

Hvis du trenger å hente revisjoner og systemetiketter for sluttbrukerkontekst uten hele dialogsøkeresultatet, se [referansen for systemetiketter](/nb/dialogporten/reference/entities/systemlabel/), som dokumenterer det dedikerte endepunktet `/api/v1/serviceowner/dialogs/endusercontext`.

## Grunnleggende steg (GraphQL, sluttbruker)

GraphQL eksponerer søkeoperasjonen for sluttbruker som `searchDialogs`. En typisk flyt er:

1. [Autentiser som sluttbruker](/nb/dialogporten/user-guides/authenticating#usage-for-end-user-systems)
2. Bruk `getParties` for å finne parti-URN-ene du kan søke på
3. Kall `searchDialogs`

Eksempel:

```graphql
query SearchDialogs($party: [String!]) {
  searchDialogs(
    input: {
      party: $party
      limit: 20
      orderBy: [{ contentUpdatedAt: DESC }]
    }
  ) {
    items {
      id
      party
      status
      process
      createdAt
      updatedAt
      contentUpdatedAt
      endUserContext {
        revision
        systemLabels
      }
    }
    hasNextPage
    continuationToken
    orderBy {
      createdAt
      updatedAt
      dueAt
      contentUpdatedAt
    }
    errors {
      message
    }
  }
}
```

GraphQL-input støtter de samme implementerte filtrene for sluttbruker som REST-endepunktet, inkludert:

- `serviceResource`
- `party`
- `status`
- `process`
- `systemLabel`
- `excludeApiOnly`
- `isContentSeen`
- `search`
- `searchLanguageCode`

De samme underliggende valideringsreglene gjelder som i REST. Spesielt må minst én av `party` eller `serviceResource` oppgis.

### Aksepterte språk

GraphQL bruker den samme `Accept-Language`-headeren som REST-API-et. Hvis den er oppgitt, bruker Dialogporten den headeren når lokaliserte innholdsverdier velges og sorteres i svaret.

### Paginering

Paginering i GraphQL bruker feltene `continuationToken`, `hasNextPage` og `orderBy` i payloaden.

- Bruk det returnerte `continuationToken` for å hente neste side
- Bruk den samme `orderBy` på nytt når du sender neste forespørsel
- Hvis `continuationToken` er satt, må også `orderBy` være satt

{{<children />}}
