---
title: Roller som benyttes i Altinn
linktitle: Roller
description: Denne siden inneholder informajson om hvilke typer roller Altinn har som kan brukes til å gi tilgang til en applikasjon
toc: true
---

En rolle er en type fullmakt en bruker har på vegne av [aktøren](/technology/terms/#actor) som bruker skal opptre på vegne av. 
Roller kan gis til personer eller virksomheter. Disse identifiseres med fødselsnummer (fra Folkeregisteret) eller organisasjonsnummer (fra Enhetsregisteret). 
Det finnes to hovedtyper av roller som man kan knytte en autorisasjonsregel til: Eksterne roller og Altinn roller.

## Eksterne roller
Informasjon om eksterne roller hentes fra ulike offentlige og autorative register. 
Fullmakten som disse rollene gir er regulert gjennom lover og forskrifter som legitimerer at en rolleinnehaver automatisk skal gis tilgang til bestemte tjenester eller data på vegne av aktør. 
Det er ansvarlig etat som sammen med Altinns forvaltning som bestemmer hvilke fullmakter det er naturlig at en ekstern rolle får i Altinn. 

Eksterne roller for en aktør kan bare endres av den ansvarlige virksomheten som eier det autorative registeret.
Altinn benytter roller fra følgende autorative register: 


### Roller fra [Enhetsregisteret](https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/)
Disse rollene benyttes når [aktøren](/technology/terms/#actor) er en virksomhet. 
Du kan lese mer om hvilke roller fra Enhetsregisteret som benyttes i Altinn [her](roles_er)

### Roller fra [Skatteeaten](https://www.skatteetaten.no/)
Disse rollene benyttes når [aktøren](/technology/terms/#actor) er en virksomhet eller person 
Du kan lese mer om hvilke roller fra Skatteetaten som benyttes [her](roles_ske)

### Roller fra [Arbeidsgiver- og arbeidstakerregisteret](https://www.nav.no/no/bedrift/tjenester-og-skjemaer/aa-registeret-og-a-meldingen)
Dette er ikke implementert i dag men ligger i backlogg som ny kilde til eksterne roller

### Roller om [Vergemål fra Statens sivilrettsforvaltning](https://www.sivilrett.no/vergemaalsordninga.556842.no.html) 
Dette er ikke implementert i dag men ligger i backlogg som ny kilde til eksterne roller

### Roller om [Foreldreansvar](https://www.skatteetaten.no/person/folkeregister/fodsel-og-navnevalg/foreldreansvar/) 
Dette er ikke implementert i dag men ligger i backlogg som ny kilde til eksterne roller

### Roller fra [Advokatregisteret hos Tilsynsrådet for Advokater](https://tilsynet.no/register) 
Dette er ikke implementert i dag men ligger i backlogg som ny kilde til eksterne roller

## Altinn roller
Disse rollene benyttes når [aktøren](/technology/terms/#actor) er en virksomhet eller person. 
Altinn-roller kan (i motsetning til eksterne roller) administreres og endres via Altinn Profile av administrator for [aktøren](/technology/terms/#actor). 

## API for rolleinformasjon
Det finnes et API for å slå opp informasjon om aller roller som er registrert i Altinn 2. 
Dokumentasjon av API finnes [her](https://altinn.github.io/docs/api/rest/metadata/) under overskriften "Hente metadata om rolledefinisjoner i Altinn". 
APIet er åpen to tilgjengelig for alle på lenken [https://www.altinn.no/api/metadata/roledefinitions](https://www.altinn.no/api/metadata/roledefinitions).

{{<children />}}
