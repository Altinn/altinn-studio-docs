---
title: "Søke etter dialoger"
description: "Hvordan søke etter og filtrere dialoger i Dialogporten"
weight: 20
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Introduksjon

Denne veiledningen viser hvordan et sluttbrukersystem kan søke etter dialoger i Dialogporten ved hjelp av enten REST eller GraphQL API-er. Dialogporten støtter en rekke parametere for filtrering, sortering og fritekstsøk.

Merk at datastrukturen som returneres i søk er forskjellig fra den som returneres på [detaljendepunktet](/nb/dialogporten/user-guides/getting-dialog-details/); mer informasjon om dialogen og hvilken tilgang den autoriserte brukeren har til ulike deler av den er bare tilgjengelig i detaljvisningen.

## Grunnleggende trinn (REST)

1. [Autentiser som en sluttbruker](/nb/dialogporten/user-guides/authenticating#bruk-for-sluttbrukersystemer)
2. [Finn partene](/nb/dialogporten/user-guides/authorized-parties/) som den autentiserte sluttbrukeren er autorisert til å representere
3. Utfør en GET-forespørsel til `/api/v1/enduser/dialogs`, og oppgi spørringsparametere i henhold til tabellen nedenfor:

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialogs">}}

- Alle parametere av forskjellige typer er AND-et, dvs. hvis du oppgir `party` og `status`, vil bare dialogene med den angitte statusen som eies av den angitte parten, bli returnert.
- Når du støtter flere verdier for samme parameter, er disse verdiene OR-et, dvs. hvis du oppgir to `status`-parametere, vil dialoger som har en av disse verdiene, bli returnert.
- `org`-parametere må være tjenesteeierkoder som definert i den globale [altinn-orgs.json](https://altinncdn.no/orgs/altinn-orgs.json), f.eks. `digdir` eller `skd`.
- `party`-parametere må ha ett av følgende formater
  - `urn:altinn:person:identifier-no:<11 digit national identity numner>`
  - `urn:altinn:organization:identifier-no:<9 digit CCR number>`
- `serviceResource`-parametere må referere til en ressurs i [Ressursregisteret](/nb/authorization/what-do-you-get/resourceadministration/) og bruke følgende format:
  - `urn:altinn:resource:<identifier>`

{{<notice warning>}}
Vær oppmerksom på at sluttbruker-søke-APIet krever at minst én [`serviceResource`](/nb/dialogporten/getting-started/authorization/service-resource/) eller [`party`](/nb/dialogporten/getting-started/authorization/parties/) parameter er oppgitt. Opptil 20 distinkte verdier for hver av disse to typene kan leveres.
{{</notice>}}

### Returnert informasjon

Dette vil returnere en [samling av dialoger](/nb/dialogporten/reference/entities/dialog/#søk), som inneholder et delsett av informasjonen som returneres på [dialogdetaljendepunktet](/nb/dialogporten/reference/entities/dialog/). Avhengig av søkeparametere og tilgangen til den autentiserte brukeren, kan denne listen være tom.

Hvis ugyldige søkeparametere oppgis, vil API-et returnere `400 Bad Request` og et svar som forklarer hvilke feil som ble oppdaget. Dette svaret følger standard [ProblemDetails](https://datatracker.ietf.org/doc/html/rfc7807) formatet.

### Paginasjon

Søke-APIet er paginert ved hjelp av fortsettelsestokens, se `limit`-parameteren ovenfor. Hvis det er flere sider som skal hentes, vil egenskapen `hasNextPage` settes til true, og egenskapen `continuationToken` fylles ut med en verdi som skal brukes til å hente neste side. For å hente neste side, oppgi den verdien som en `continuationToken` spørringsparameter. Dette vil opprettholde rekkefølgen og unngå manglende elementer eller å hente dem to ganger. Dette bør gjentas så lenge `hasNextPage` er true.

### Sortering

Sortering kan utføres på følgende kolonner:

- CreatedAt
- UpdatedAt
- ContentUpdatedAt
- DueAt

{{<notice warning>}}
Siden `Id` er primærnøkkelkolonnen, er det også teknisk sett en sorterbar kolonne. Det anbefales imidlertid ikke å sortere etter `Id`, fordi denne kolonnen, selv om den er en leksikografisk sorterbar UUIDv7, kan leveres av tjenesteeieren eller inneholde en tidsstempeldel som indikerer tidspunktet for migrering, ikke opprettelse av dialog. Så for de fleste formål er `CreatedBy` kolonnen du vil ha i stedet for `Id`.
{{</notice>}}

Kolonner kan sorteres i stigende og synkende (standard) rekkefølge, og flere kolonner kan oppgis i `OrderBy`-kolonnen.

#### Eksempler

Dette er eksempelverdier som kan oppgis i `OrderBy`-spørringsparameteren.

- `createdat`
- `createdat_asc`
- `createdat_desc,duedate_asc`
- `contentupdatedat_desc`

Den gjeldende sorteringen finner du i [samlingsmodellen](/nb/dialogporten/user-guides/searching-for-dialogs/../../reference/entities/dialog/#søk), ved siden av feltene `continuationToken` og `hasNextPage`. Sorteringen er også innebygd i `continuationToken`, så når du paginerer, er det tilstrekkelig å oppgi fortsettelsestokenet alene for å bevare sorteringen.

## Grunnleggende trinn (GraphQL)

{{<notyetwritten>}}

{{<children />}}
