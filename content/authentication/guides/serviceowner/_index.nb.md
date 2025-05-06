---
title: API-leverandør sitt rolle i systembruker Integrasjon
linktitle: API-leverandør
toc: true
weight: 1
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

#### Forberedelse av API-leverandør (Skatteetaten)
   1. Utvikling av tjenesten/API
      - API-leverandør (Skatteetaten) må først utvikle API-et som skal brukes av eksterne parter, i dette tilfellet tjenesten 'Krav og betalinger'
      - Dette API-et gjør det mulig for brukere å hente utestående skatte og avgiftskrav fra Skatteetaten.
   2. Konfigurere tilgang i Maskinporten"
       - Skatteetaten oppretter deretter et scope i Maskinporten (f.eks. skatteetaten:kravogbetalinger).
       - Dette scopet er knyttet til de relevante tilgangene og tildeles organisasjoner som trenger tilgang til denne tjenesten, som for eksempel SmartCloud AS (systemleverandøren).
   3. Registrering av ressurser i ressursregisteret
       - Den siste steg for Skatteetaten er å registrere en ressurs i [ressursregisteret](../../../../api/resourceregistry/), knytte den til scopet og definere tilgangsreglene for eksterne brukere. Dette kan være en app i Altinn Studio eller et API på API-leverandørens egen plattform.

#### Ta i bruk systembruker
Når de ovennevnte forutsetningene er på plass, følg denne guiden for å forstå [hvordan ta i bruk systembrukeren](systemauthentication-for-apiproviders/)