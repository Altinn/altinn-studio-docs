---
title: 'Impersonering av brukere'
description: 'Hvordan man kan imitere en bruker i tjenesteeier-API-et for leseoperasjoner'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}} 

## Introduksjon

Tjenesteeiere ønsker kanskje å tilby tilpassede visninger for Dialogporten-data i sine egne portaler. Selv om det er mulig for en tjenesteeier å [autentisere som et sluttbrukersystem](/nb/dialogporten/user-guides/service-owners/impersonating-users/../../authenticating/#id-porten-autentisering), har dette både brukervennlighets- og GDPR-ulemper, da det 1) krever at brukeren håndterer en samtykkedialog i ID-porten for å gi systemet tilgang, og 2) gir tjenesteeieren tilgang til brukerdialoger som tilhører andre tjenesteeiere.

For å avhjelpe dette tilbyr Dialogporten en måte å bruke den (allerede brukte) [tjenesteeierautentiseringen](/nb/dialogporten/user-guides/service-owners/impersonating-users/../../authenticating/#bruk-for-tjenesteeiersystemer) og i tillegg oppgi en sluttbruker-ID for å filtrere de tilgjengelige dialogene ytterligere. Dette resulterer i en liste over dialoger opprettet av tjenesteeieren som sluttbrukeren har tilgang til, noe som eliminerer behovet for et ID-porten-samtykke og unngår at tjenesteeieren får tilgang til andre dialoger som brukeren måtte ha tilgang til.

## Grunnleggende trinn

1. Autentiser mot Dialogporten som et [tjenesteeiersystem](/nb/dialogporten/user-guides/service-owners/impersonating-users/../../authenticating/#bruk-for-tjenesteeiersystemer)
2. Autentiser sluttbrukeren i tjenesteeierportalen (via ID-porten eller andre midler)
3. Konstruer en sluttbruker-ID (vanligvis `urn:altinn:person:identifier-no:<11 digit norwegian identifier number>`)
4. Utfør et kall til `/api/v1/serviceowner/dialogs/?endUserId=urn:altinn:person:identifier-no:<11 digit norwegian identifier number>&Party=...&ServiceResource=...&<other filter parameters>`

## Søke etter dialoger

Merk at når man imiterer brukere, gjelder også restriksjonene for sluttbruker-API-et her - spesielt at `serviceResource` og/eller `party` må oppgis.

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs">}}

### Returnert informasjon

Se [dialogsøk DTO](/nb/dialogporten/user-guides/service-owners/impersonating-users/../../../reference/entities/dialog#søk-1) for full informasjon.

## Hente dialogdetaljer

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs/{dialogId}">}}

### Returnert informasjon

Se [dialogdetaljer DTO](/nb/dialogporten/user-guides/service-owners/impersonating-users/../../../reference/entities/dialog#detaljer-1) for tjenesteeier for full informasjon.

{{<children />}}