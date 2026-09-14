---
title: Scopes for systembruker-API-et
linktitle: Scopes
description: Oversikt over hvilke Maskinporten-scopes de ulike endepunktene i systembruker-API-et krever
toc: true
weight: 1
---

## Scopes du trenger

Som sluttbrukersystemleverandør trenger du tre scopes for å ta i bruk systembruker-API-et.
Du får dem tildelt på Maskinporten-klienten din når du fyller ut
[registreringsskjemaet for sluttbrukersystemleverandør](/nb/authorization/getting-started/systemuser/)
og krysser av for systembruker.

| Scope | Dette bruker du det til |
| ----- | ----------------------- |
| `altinn:authentication/systemregister.write` | Administrere systemene dine i systemregisteret, og hente ut systembrukere knyttet til et av systemene dine |
| `altinn:authentication/systemuser.request.write` | Opprette, endre og slette forespørsler om systembruker, og slå opp en systembruker |
| `altinn:authentication/systemuser.request.read` | Hente status på forespørslene du har sendt |

Skal systemet ditt også gjøre klientdelegering via API, trenger du i tillegg
`altinn:clientdelegations.read` og `altinn:clientdelegations.write`.
Se [Klient delegering](/nb/api/authentication/systemuserapi/clientdelegation/).

Scopene over gjelder bare systembruker-API-et. Tjenesteeieren bestemmer selv hvilke scopes
tjenestene deres krever, og de scopene må tjenesteeieren tildele deg separat.

## altinn:authentication/systemregister.write

| Metode | Endepunkt |
| ------ | --------- |
| POST | `authentication/api/v1/systemregister/vendor` |
| GET | `authentication/api/v1/systemregister/vendor` |
| GET | `authentication/api/v1/systemregister/vendor/{systemId}` |
| PUT | `authentication/api/v1/systemregister/vendor/{systemId}` |
| PUT | `authentication/api/v1/systemregister/vendor/{systemId}/rights` |
| PUT | `authentication/api/v1/systemregister/vendor/{systemId}/accesspackages` |
| DELETE | `authentication/api/v1/systemregister/vendor/{systemId}` |
| GET | `authentication/api/v1/systemregister/vendor/{systemId}/changelog` |
| GET | `authentication/api/v1/systemuser/vendor/bysystem/{systemId}` |

Legg merke til det siste endepunktet: når du henter systembrukerne som hører til et av systemene
dine, krever kallet `systemregister.write` – ikke et av systemuser-scopene.

## altinn:authentication/systemuser.request.write

| Metode | Endepunkt |
| ------ | --------- |
| POST | `authentication/api/v1/systemuser/request/vendor` |
| POST | `authentication/api/v1/systemuser/request/vendor/agent` |
| DELETE | `authentication/api/v1/systemuser/request/vendor/{requestId}` |
| POST | `authentication/api/v1/systemuser/changerequest/vendor` |
| DELETE | `authentication/api/v1/systemuser/changerequest/vendor/{requestId}` |
| GET | `authentication/api/v1/systemuser/vendor/byquery` |

Oppslaget `vendor/byquery` er et GET-kall, men krever likevel skrivescopet.

## altinn:authentication/systemuser.request.read

| Metode | Endepunkt |
| ------ | --------- |
| GET | `authentication/api/v1/systemuser/request/vendor/{requestId}` |
| GET | `authentication/api/v1/systemuser/request/vendor/agent/{requestId}` |
| GET | `authentication/api/v1/systemuser/request/vendor/byexternalref/{systemId}/{orgNo}/{externalRef}` |
| GET | `authentication/api/v1/systemuser/request/vendor/agent/byexternalref/{systemId}/{orgNo}/{externalRef}` |
| GET | `authentication/api/v1/systemuser/request/vendor/bysystem/{systemId}` |
| GET | `authentication/api/v1/systemuser/request/vendor/agent/bysystem/{systemId}` |
| GET | `authentication/api/v1/systemuser/changerequest/vendor/{requestId}` |
| GET | `authentication/api/v1/systemuser/changerequest/vendor/byexternalref/{systemId}/{orgNo}/{externalRef}` |
| GET | `authentication/api/v1/systemuser/changerequest/vendor/bysystem/{systemId}` |

## Slik setter du opp klienten

Alle endepunktene over krever et Maskinporten-token som du sender med som Bearer-token.
Se [Sette opp Maskinporten-klient](/nb/authorization/getting-started/maskinportenclient/) for
hvordan du oppretter klienten og legger til scopene.

Mangler tokenet riktig scope, får du `403 Forbidden` fra API-et.
