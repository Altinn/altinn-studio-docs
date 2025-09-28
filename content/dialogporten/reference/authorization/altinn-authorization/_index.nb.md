---
title: "Altinn Autorisering"
description: "Teknisk oversikt over hvordan Dialogporten integrerer med Altinn Autorisering"
weight: 1
---

## Introduksjon

Dialogporten er fullt integrert med Altinn Autorisering, som brukes for alle autorisasjonsbeslutninger som tas i Dialogporten.

Av ytelsesmessige årsaker er det to forskjellige måter Altinn Autorisering brukes på.

## Autentisering og grovkornet autorisering

Dialogporten utfører grunnleggende autentisering og omfangsbasert autorisering via selvstendige tilgangstokener utstedt av Maskinporten og ID-porten, og eventuelt utvekslet ved Altinn Token Exchange.

**Se også**

- {{<link "../../../user-guides/authenticating">}}

## Dialogliste autorisering

Alle listevisninger i Dialogporten benytter [Authorized Parties API](/nb/authorization/guides/resource-owner/integrating-link-service/#integrasjon-med-api-for-autoriserte-parter-avgivere), som gir en liste over alle parter den autentiserte brukeren kan representere sammen med alle roller/tilgangspakker og tjeneste-/instansrettigheter som brukeren har fått for hver part.

Dialogporten vedlikeholder en oversikt over hvilke roller/tilgangspakker som gir rettigheter til hver ressurs i ressursregisteret, og bruker det til å hente bare dialoger som refererer til tjenesteressurser som brukeren har en eller annen form for tilgang til. Hvilke handlinger (lese, skrive osv.) som ikke vurderes - enhver rettighet for den gitte parten for den gitte ressursen er tilstrekkelig for å se dialogen i dialoglisten.

Siden bare én forespørsel (for en gitt part/tjenesteressurs-tuppel) vil måtte utføres innenfor et cache TTL-vindu, krever ikke omsortering/filtrering og paginering ytterligere forespørsler til Altinn Autorisering, og kan derfor utføres raskt.

## Dialogdetaljer autorisering

For dialogdetaljer benyttes [PDP API](/nb/authorization/guides/resource-owner/integrating-link-service/#integrasjon-med-pdp), som gir mulighet for finkornet autorisering av de forskjellige handlingene og overføringene som er definert i dialogen.

Alle handlinger og overføringer er dekorert med et `IsAuthorized`-flagg, som indikerer til sluttbrukersystemet om brukeren har tilgang eller ikke. Hvis ikke, fjernes alle URL-er.

{{<notice warning>}}
Selv om Dialogporten indikerer at handlingen er uautorisert, og fjerner URL-ene, bør endepunktet fortsatt alltid utføre autentisering/autorisering på innkommende forespørsler og ikke stole på at Dialogporten bare skjuler tilgangen til endepunktene
{{</notice>}}

{{<children />}}
