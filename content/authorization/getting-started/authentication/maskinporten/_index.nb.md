---
title: Autentisering med Maskinporten
linktitle: Maskinporten
description: Altinn støtter bruk av Maskinporten-token i flere API-er
toc: true
weight: 100
aliases:
  - /nb/api/authentication/maskinporten/
---

- API for tjenesteeiere i sammenheng med data for Altinn Apps
- API for systemleverandører i sammenheng med systembruker

## Forutsetninger

For å ta i bruk autentisering med Maskinporten må man først ha tilgang til en Maskinporten-klient. Du finner en detaljert guide som omhandler denne registreringen i lenken under.

{{% expandlarge id="guide-mp-int-samarbeid" header="Veiledning om hvordan du registrerer en ny Maskinporten-integrasjon i Samarbeidsportalen" %}}
{{% insert "content/shared/maskinporten/maskinporten-client-create.nb.md" %}}
{{% /expandlarge %}}

## Tilgang som tjenesteeier

For å kunne hente data fra Storage i Altinn 3 via API som tjenesteeier, må du opprette en integrasjon (klient) i Maskinporten med nødvendige scopes.

Følgende scopes er opprettet av Altinn og delegert til tjenesteeier. Disse scopene er nødvendige for å benytte API-ene relatert til instanser som tjenesteeier:

- `altinn:serviceowner/instances.read`
- `altinn:serviceowner/instances.write`
{.correspondence-custom-list}

Klienter med `write` scope kan blant annet instansiere apper på vegne av brukere via appens eget API, laste opp data, oppdatere metadata og prosess-status.
Klienter med `read` scope kan kun lese data, metadata og hendelser.

I de fleste tilfeller vil en klient for tjenesteeier ha behov for begge scopene.

## Veksle til Altinn-token

Altinn godtar ikke Maskinporten-token direkte. Disse må veksles inn i Altinn-token. Se detaljer i scenarioet under.

## Mer informasjon

- For mer informasjon, se [dokumentasjon for API-konsument](https://docs.digdir.no/maskinporten_guide_apikonsument.html#prosedyre-for-api-konsument) fra Maskinporten.
- Se også [scenario for autentisering]({{< relref "/api/scenarios/authentication/" >}}) for flere detaljer (på engelsk).
