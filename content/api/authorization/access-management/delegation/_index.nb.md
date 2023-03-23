---
title: Delegations API
linktitle: Delegations
description: Beskrivelse av API for operasjoner knytt til delegering av rettigheter og tilganger i Altinn 3
toc: true
---

## Overordnet beskrivelse

{{<notice warning>}}
Dokumentasjonen er under arbeid
{{</notice>}}
APIet for håndtering av delegeringer i Altinn 3 platformen lar sluttbrukersystem-integrasjoner utføre, hente og trekke delegeringer som en autentisert sluttbruker på vegne av en avgiver brukeren er autorisert for.

## Maskinporten Schema

Maskinporten Schema tilsvarer det som i Altinn 2 løsningen het Delegation Schema. Disse definerer en delegerbar ressurs i Altinnsom dekker ett eller flere scopes fra Maskinporten.
Et Maskinporten Schema kan da delegeres fra en klient-organisasjon (consumer i Maskinporten token) til en leverandør-organisasjon (supplier i Maskinporten token). Når klient-organisasjon henter leverandør-token fra Maskinporten vil Maskinporten gjennom integrasjon med Altinn finne at delegering foreligger og berike utstedt Maskinporten-token med scopene som er dekket av Maskinporten Schemaet (gitt at klient-organisasjonen selv har fått tilgang til disse scopene fra API-eier).

Ressursregisteret er dokumentert [her](https://docs.altinn.studio/technology/solutions/altinn-platform/authorization/resourceregistry/).

Postman eksempel finnes [her](https://docs.altinn.studio/api/authorization/access-management/delegations/am-delegations.postman_collection.json).

Bruk av APIet krever at man har et Altinn- eller IDPorten-token for autentisert bruker. Se ellers API dokumentasjon for autentisering [her](https://docs.altinn.studio/api/authentication/).
