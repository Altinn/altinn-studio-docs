---
title: Oppsett av Maskinporten-klient
linktitle: Maskinporten
description: Her finner du informasjon om hvordan du setter opp Maskinporten-klient
toc: false
---

For å bruke Altinn API-er, krever flere scenarier en Maskinporten-klient:

- Kalle Altinn API som en organisasjon
- Autentisering som en bedriftsbruker
- Autentisering som systembruker

## Sette opp en Maskinporten-klient

{{% insert "content/shared/maskinporten/maskinporten-client-create.nb.md" %}}

## Liste over scopes

Avhengig av din bruk må du velge de scopene som er relevant for deg. I tabellen under finner du en samling med de vanligste scopene:

| Scope                                | Bruk                         | Beskrivelse                                                                   |
| ------------------------------------ | ---------------------------- | ----------------------------------------------------------------------------- |
| altinn:instances.read                | Altinn Apps API les          |                                                                               |
| altinn:instances.write               | Altinn Apps API skriv        |                                                                               |
| altinn:authentication/systemregister.write | Tilgang til systemregisteret | For systemleverandører som trenger å administrere systemene sine i systemregisteret |
| altinn:authentication/systemuser.request.write | Opprette systembrukerforespørsler | For systemleverandører som oppretter, endrer eller sletter forespørsler om systembruker |
| altinn:authentication/systemuser.request.read | Lese systembrukerforespørsler | For systemleverandører som henter status på forespørslene sine |
| altinn:authorization/authorize       | Access to PDP endepunkt      | For organisasajoner som trenger tilgang til autorisasjon                      |

Trenger du en fullstendig oversikt over hvilke endepunkter i systembruker-API-et som krever hvilke scopes, se [Scopes for systembruker-API-et](/nb/api/authentication/systemuserapi/scopes/).

## Autentisering

En detaljert beskrivelse av hvordan du autentiserer klienten din med et JWT Grant, finner du [her](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

{{% insert "content/shared/maskinporten/maskinporten-authentication-methods.nb.md" %}}
