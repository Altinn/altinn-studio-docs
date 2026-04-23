---
title: 'GraphQL'
description: 'GraphQL-operasjoner Dialogporten støtter'
weight: 11
---

Dialogporten støtter et GraphQL-API for sluttbrukere. Den nåværende implementasjonen inkluderer queries, subscriptions og mutations.

Endepunktene er:

| Miljø      | URL                                                       |
| ---------- | --------------------------------------------------------- |
| Test       | `https://platform.at23.altinn.cloud/dialogporten/graphql` |
| Staging    | `https://platform.tt02.altinn.no/dialogporten/graphql`    |
| Production | `https://platform.altinn.no/dialogporten/graphql`         |

## Lokal utvikling
Ved lokal kjøring er et GraphQL-frontend, [Banana Cake Pop](https://chillicream.com/products/bananacakepop), tilgjengelig på http://localhost:5181/graphql/. Se [README.md](https://github.com/digdir/dialogporten/blob/main/README.md) for mer informasjon om hvordan Dialogporten kjøres lokalt.

## Implementerte operasjoner

Den nåværende GraphQL-implementasjonen eksponerer:

- `getDialogById` for å hente én enkelt dialog
- `searchDialogs` for å søke etter dialoger
- `dialogLookup` for å løse opp en dialog fra en instansreferanse
- `getParties` for å liste autoriserte parter
- `dialogEvents` for abonnementer på en spesifikk dialog
- `setSystemLabel` og `bulkSetSystemLabels` for å oppdatere systemetiketter for sluttbruker

## Merknader om spesifikke operasjoner

### `searchDialogs`

`searchDialogs` returnerer en payload med:

- `items`
- `hasNextPage`
- `continuationToken`
- `orderBy`
- `errors`

Hvis `continuationToken` er oppgitt i forespørselen, må også `orderBy` oppgis.

### `dialogLookup`

`dialogLookup` aksepterer `instanceRef`. Den kan brukes til å oversette mellom en dialog-ID og den kanoniske identifikatoren dialogen representerer. Implementasjonen støtter:

- `urn:altinn:instance-id:{partyId}/{uuid}`
- `urn:altinn:correspondence-id:{uuid}`
- `urn:altinn:dialog-id:{uuid}`

Dialoger som representerer en Altinn app-instans eller en enkelt Altinn Melding bruker den underliggende identifikatoren som sin kanoniske identifikator. Dialoger uten en slik underliggende entitet bruker dialog-ID-en selv.

Feltet returnerer en payload med:

- valgfri `lookup`
- `errors`

De nåværende typede feilene er:

- `DialogLookupNotFound`
- `DialogLookupForbidden`
- `DialogLookupValidationError`

`lookup`-objektet inneholder:

- `dialogId`
- `instanceRef`
- `party`
- `title`
- `serviceResource`
- `serviceOwner`
- `authorizationEvidence`

Hvis oppslaget starter med `urn:altinn:dialog-id:{uuid}`, kan den returnerte `instanceRef` avvike fra input. Den returnerte verdien er den kanoniske identifikatoren Dialogporten knytter til dialogen. Den nåværende implementasjonen foretrekker app-instansreferanser, deretter meldingsreferanser, og deretter dialogreferanser.

`authorizationEvidence` forklarer hvorfor den nåværende sluttbrukeren kan få tilgang til dialogen. Den rapporterer gjeldende autentiseringsnivå og om tilgangen kommer via:

- en rolle
- en tilgangspakke
- ressursdelegering
- instansdelegering

`title` kan løses til dialogens ikke-sensitive tittel når brukerens nåværende autentiseringsnivå er lavere enn minimum autentiseringsnivå for tjenesteressursen.

### `dialogEvents`

`dialogEvents` abonnerer på hendelser for én dialog og krever et dialogtoken i `Authorization`-headeren.

### Mutasjoner for systemetiketter

De nåværende mutasjonene er rettet mot håndtering av sluttbrukerkontekst:

- `setSystemLabel` oppdaterer én dialog
- `bulkSetSystemLabels` oppdaterer flere dialoger

Begge mutasjonene bruker samme modell for å legge til/fjerne etiketter som REST-endepunktene for sluttbruker.

**Les mer**
* [Teknisk informasjon om Dialporten V1-skjemaer](https://github.com/digdir/dialogporten/tree/main/docs/schema/V1)
* {{<link "../../user-guides/authenticating">}}

{{<children />}}
