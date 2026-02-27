---
title: Motta data via API
description: I denne veiledningen skal vi sette opp et enkelt mottak for å hente ut data via API.
draft: true
weight: 50
---

To alternative fremgangsmåter er beskrevet under:
- Polle for å hente ut nye instanser siden sist
- Abonnere på hendelser for å få beskjed om nye instanser fortløpende

## Forutsetninger
- Du har satt opp en Altinn-app som kjører i testmiljø (TT02).
- Du har fylt ut og sendt inn noe data i TT02 for tjenesten.
- Du har en maskinportenklient for tjenesteeier, med scope `altinn:serviceowner/instances.read`

## Polle for å hente ut instanser som er klare 
Oversikt over instanser hentes ut fra Storage-komponenten i Altinn plattformen - det er her metadata om alle innsendte lagres.

**Plattform base url**:

Miljø | url 
------|----
tt02 | platform.tt02.altinn.no 
prod | platform.altinn.no 

### 1. Søk etter instanser som er fullført
Gå mot `https://{platformBaseUrl}/storage/api/v1/instances` for å spørre om instanser. Endepunktet støtter en rekke parametre
for å søke på instanser. Parameter `appId` eller `org` må alltid være med.

For eksempel:

```
GET https://{platformBaseUrl}/storage/api/v1/instances?appId={org}/{app}&process.isComplete=true&process.ended=gt:2026-02-27&excludeConfirmedBy=true
```

Eksempelet søker på instanser:
- fra en gitt app, `appId={org}/{app}` - bytt ut `org` og `app` med din app
- som er fullført `process.isComplete=true`
- kun instanser som er fullført etter 27. februar 2026, `process.ended=gt:2026-02-27`
- kun instanser som ikke allerede er markert som bekreftet hentet ut `excludeConfirmedBy=true`
   

[Se oversikt over spørringsparametre som er tilgjengelig, og eksempler på bruk.]({{<relref "/api/storage/instances">}})

Det er lurt å begrense søket så mye som mulig slik at det ikke tar for lang tid, f.eks. ved å sette datobegrensninger.

Sett opp denne spørringen til å gå periodisk for å kontinuerlig hente ut nye elementer.

### 2. Hent ut data fra den enkelte instans
- For hver instans du mottok i spørringen på instanser, hent ut de relevante data-elementene. 
  > Du må vite hvilke(n) datatype(r) du ønsker å hente ut. Dette er noe du har definert i appen. 
  > F.eks. hvis du har en datamodelli appen som heter `modell`, som er datamodellen for de innsendte dataene, er det datatypen 
  > `modell` du skal hente ut.
  > Ønsker du å hente ut generert PDF, bruker du datatypen `ref-data-as-pdf` som automatisk følger med alle apper.

- Søk gjennom `data`-objektet fra instansdokumentet, og hent ut de dataelementene som matcher de datatypene du ønsker å hente ut.
- For hvert dataelement, hent ut endepunktet `selfLinks.app` om du skal gå mot appens api (anbefalt) eller `selfLinks.platform` om du 
  skal gå mot Storage-komponenten direkte. 
- Gjør et GET-kall mot dette endepunktet for å hente ut dataene.

<!-- Gå mot data-endepunktet i Storage, `https://{platformBaseUrl}/storage/api/v1/instances/{instanceOwnerPartyId}/{instanceGuid}/data/{dataGuid}`.

Parametrene finner du i instansdokumentet:
- `instanceOwnerPartyId`: `instanceOwner.partyId` fra instansdokumentet
- `instanceGuid`: `instance.id` fra instansdokumentet
- `dataGuid`: Søk i `data`-objektet fra instansdokumentet etter elementer som matcher ønsket datatype, og bruk dataelementets `id` egenskap. -->

### 3. Bekreft at dataene er mottat
Etter at instansdokument og data er hentet ut må du bekrefte at dataene er mottat. Frem til denne bekreftelsen er sendt kan ikke dataene slettes fra Altinn.
Dette gjøres ved å kalle `complete`-endepunktet på appens API.

```
POST https://{org}.apps.{host}/api/v1/instances/{instanceOwnerPartyId}/{instanceGuid}/complete
```

hvor `host` er enten `tt02.altinn.no` (test) eller `altinn.no` (produksjon). `body` brukes ikke til noe i dette endepunktet, og kan være tom.


## Abonnere på hendelser som varsler om nye instanser som er klare

Følg [denne guiden](<relref "/api/guides/appownerintegration/receivingdata/">) for å komme i gang.