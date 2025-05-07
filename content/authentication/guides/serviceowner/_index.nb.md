---
title: API-leverandør sitt rolle i systembruker Integrasjon
linktitle: API-leverandør
toc: true
weight: 1
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

## Forutsetninger for API-leverandøren

For å bruke systembruker som API-leverandør, må følgende forutsetninger være oppfylt:

- Avtale med Maskinporten AS som [API-leverandøren](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder)
- Avtale med Digdir for tilgang til ressursregisteret for å opprette ressurser.
- Oppretting av [nødvendige ressurser] (/authorization/guides/create-resource-resource-admin/) som må autoriseres
- Tildelt omfang for PDP-integrasjon
- Integrasjon med Altinn PDP

#### Forberedelse av API-leverandør (Skatteetaten)
   1. Utvikling av tjenesten/API
      - API-leverandør (Skatteetaten) må først utvikle API-et som skal brukes av eksterne parter, i dette tilfellet tjenesten 'Krav og betalinger'
      - Dette API-et gjør det mulig for brukere å hente utestående skatte og avgiftskrav fra Skatteetaten.
   2. Konfigurere tilgang i Maskinporten"
       - Skatteetaten oppretter deretter et scope i Maskinporten (f.eks. skatteetaten:kravogbetalinger).
       - Dette scopet er knyttet til de relevante tilgangene og tildeles organisasjoner som trenger tilgang til denne tjenesten, som for eksempel SmartCloud AS (systemleverandøren).
   3. Registrering av ressurser i ressursregisteret
       - Den siste steg for Skatteetaten er å registrere en ressurs i [ressursregisteret](../../../../api/resourceregistry/), knytte den til scopet og definere tilgangsreglene for eksterne brukere. Dette kan være en app i Altinn Studio eller et API på API-leverandørens egen plattform.
         
         se [api dokumentasjon](../../../api/authentication/systemuserapi/) for mer informasjon om tilgjengleige endepunkter.

#### Etter opprettelse av systembruker
1. [Valider Maskinporten-token](systemauthentication-for-apiproviders/#validering-av-maskinporten-token)
2. [Autorisering av systembruker](systemauthentication-for-apiproviders/#autorisasjon-av-systembruker)