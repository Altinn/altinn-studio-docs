---
title: Altinn Tjeneste-integrasjon
description: Slik kommer du i gang med å sende varsler fra en Altinn-tjeneste
weight: 10
---

## 1. Registrer din Maskinporten-klient med riktige scopes

For å kunne ta i bruk Altinn Notifications API, må du ha en Maskinporten-klient med riktig scope.

Scope **altinn:serviceowner/notifications.create** er påkrevd for at klienter skal få tilgang til Varslings-API-et.

Alle registrerte tjenesteeiere har fått delegert dette scopet av Digdir og skal kunne finne det i sin liste over scopes i Samarbeidsportalen.

Du kan finne en generell veiledning for hvordan du setter opp en ny Maskinporten-klient og tildeler scopes her:
[Veiledning for Maskinporten-integrasjon via Samarbeidsportalen](/altinn-studio/guides/shared/maskinporten-integration/maskinporten-integration-samarbeidsportal/)

Når du setter opp klienten, sørg for å inkludere scopet **altinn:serviceowner/notifications.create**.

## 2. Integrer mot Varslings-API

{{% insert "content/notifications/shared/getting-started/integrate-with-api/get-started-integrate-with-api.nb.md" %}}

