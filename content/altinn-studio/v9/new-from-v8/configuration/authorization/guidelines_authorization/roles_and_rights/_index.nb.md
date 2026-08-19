---
title: Roller som Altinn bruker
linktitle: Roller
description: Denne siden inneholder informasjon om hvilke typer roller Altinn har som du kan bruke til å gi tilgang til en applikasjon
toc: true
tags: [needsReview]
---

En rolle er en type fullmakt en bruker har på vegne av [aktøren](/nb/technology/terms/#actor) brukeren skal opptre på vegne av. 
Du kan gi roller til personer eller virksomheter. Disse identifiserer du med fødselsnummer (fra Folkeregisteret) eller organisasjonsnummer (fra Enhetsregisteret). 
Det finnes to hovedtyper roller du kan knytte en autorisasjonsregel til: eksterne roller og Altinn-roller.

## Eksterne roller
Du henter informasjon om eksterne roller fra ulike offentlige og autoritative registre. 
Fullmakten disse rollene gir er regulert gjennom lover og forskrifter som legitimerer at en rolleinnehaver automatisk skal få tilgang til bestemte tjenester eller data på vegne av aktøren. 
Det er den ansvarlige etaten, sammen med Altinns forvaltning, som bestemmer hvilke fullmakter det er naturlig at en ekstern rolle får i Altinn. 

Kun den ansvarlige virksomheten som eier det autoritative registeret, kan endre eksterne roller for en aktør.
Altinn bruker roller fra følgende autoritative registre: 


### Roller fra [Enhetsregisteret](https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/)
Du bruker disse rollene når [aktøren](/nb/technology/terms/#actor) er en virksomhet. 
Du kan lese mer om hvilke roller fra Enhetsregisteret som Altinn bruker [her](/nb/altinn-studio/v9/new-from-v8/configuration/authorization/guidelines_authorization/roles_and_rights/roles_er/)

### Roller fra [Skatteetaten](https://www.skatteetaten.no/)
Du bruker disse rollene når [aktøren](/nb/technology/terms/#actor) er en virksomhet eller person 
Du kan lese mer om hvilke roller fra Skatteetaten som Altinn bruker [her](/nb/altinn-studio/v8/reference/configuration/authorization/guidelines_authorization/roles_and_rights/roles_SKE/)

### Roller fra [Arbeidsgiver- og arbeidstakerregisteret](https://www.nav.no/no/bedrift/tjenester-og-skjemaer/aa-registeret-og-a-meldingen)
Dette er ikke implementert i dag, men ligger i backloggen som en ny kilde til eksterne roller

### Roller om [vergemål fra Statens sivilrettsforvaltning](https://www.sivilrett.no/vergemaalsordninga.556842.no.html) 
Dette er ikke implementert i dag, men ligger i backloggen som en ny kilde til eksterne roller

### Roller om [foreldreansvar](https://www.skatteetaten.no/person/folkeregister/fodsel-og-navnevalg/foreldreansvar/) 
Dette er ikke implementert i dag, men ligger i backloggen som en ny kilde til eksterne roller

### Roller fra [Advokatregisteret hos Tilsynsrådet for Advokater](https://tilsynet.no/register) 
Dette er ikke implementert i dag, men ligger i backloggen som en ny kilde til eksterne roller

## Altinn-roller
Du bruker disse rollene når [aktøren](/nb/technology/terms/#actor) er en virksomhet eller person. 
I motsetning til eksterne roller kan administratoren for [aktøren](/nb/technology/terms/#actor) administrere og endre Altinn-roller via Altinn Profile. 

## API for rolleinformasjon
Det finnes et API der du kan slå opp informasjon om alle roller som er registrert i Altinn 2. 
Du finner dokumentasjon av API-et [her](https://altinn.github.io/docs/api/rest/metadata/) under overskriften «Hente metadata om rolledefinisjoner i Altinn». 
API-et er åpent og tilgjengelig for alle på lenken [https://www.altinn.no/api/metadata/roledefinitions](https://www.altinn.no/api/metadata/roledefinitions).

{{<children />}}
