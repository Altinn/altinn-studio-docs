---
title: Oppsett av Maskinporten-klient
linktitle: Maskinporten
description: Her finner du informasjon om hvordan du setter opp Maskinporten-integrasjon
toc: false
weight: 3
---

For å bruke Altinn API, krever flere scenarier en Maskinporten-klient:
- Kalle Altinn API som en organisasjon
- Autentisering som en bedriftsbruker
- Autentisering som systembruker

## Sette opp en Maskinporten-integrasjon
{{% insert "content/shared/maskinporten/maskinporten-client-create.nb.md" %}}

## Liste over scopes
Avhengig av din bruk må du velge de scopene som er relevant for deg. I tabellen under finner du en samling med de vanligste scopene:

| Scope                                | Bruk                         | Beskrivelse                                                                   |
| ------------------------------------ | ---------------------------- | ----------------------------------------------------------------------------- |
| altinn:instances.read                | Altinn Apps API les          |                                                                               |
| altinn:instances.write               | Altinn Apps API skriv        |                                                                               |
| altinn:authentication/systemregister | Tilgang til systemregisteret | For systemtilbydere som trenger å administrere oppføringer i systemregisteret |
| altinn:authorization/authorize       | Access to PDP endepunkt      | For organisasajoner som trenger tilgang til autorisasjon                      |

For en liste over eldre scopes kan du referere til [Altinn 2 dokumentasjonen](https://altinn.github.io/docs/api/rest/kom-i-gang/scopes/).

## Autentisering
En detaljert beskrivelse av hvordan du autentiserer klienten din med et JWT Grant, finner du [her](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

{{% insert "content/shared/maskinporten/maskinporten-authentication-methods.nb.md" %}}