---
title: Tjenesteeiersystem-integrasjon
description: Slik kommer du i gang med å sende varsler fra et tjenesteeiersystem
weight: 10
---

## 1. Kom i gang som tjenesteeier i Altinn {#get-started-as-service-owner-in-altinn}

For å komme i gang med Altinn Varslinger, må din virksomhet være registrert som tjenesteeier i Altinn.
For en trinn-for-trinn-guide, se [guiden Kom i gang med Altinn](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

Dette trinnet er kun nødvendig for nye virksomheter som ennå ikke har etablert seg som tjenesteeiere på Altinn-plattformen.
Hvis du allerede er en etablert tjenesteeier, kan du gå direkte videre til de neste trinnene for å begynne å bruke Altinn Varslinger.

## 2. Registrer din Maskinporten-klient med riktige scopes

For å kunne ta i bruk Altinn Notifications API, må du ha en Maskinporten-klient med riktig scope.

Scope **altinn:serviceowner/notifications.create** er påkrevd for at klienter skal få tilgang til Varslings-API-et.

Alle registrerte tjenesteeiere har fått delegert dette scopet av Digdir og skal kunne finne det i sin liste over scopes i Samarbeidsportalen.

For en veiledning om hvordan du registrerer en ny Maskinporten-integrasjon i Samarbeidsportalen, se [Altinn Autorisasjon](/nb/authorization/getting-started/maskinportenclient/)

## 3. Se over policy for relevante ressurser i Altinn Ressursregister

{{% insert "content/notifications/shared/getting-started/resource/get-started-resource.nb.md" %}}

## 4. Gjør deg kjent med retningslinjene og beste praksis for sending av varsler

{{% insert "content/notifications/shared/getting-started/guidelines/guidelines.nb.md" %}}

## 5. Integrer mot Varslings-API-et

{{% insert "content/notifications/shared/getting-started/integrate-with-api/get-started-integrate-with-api.nb.md" %}}
