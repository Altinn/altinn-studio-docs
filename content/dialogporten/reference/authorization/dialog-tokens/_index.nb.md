---
title: 'Dialogtoken'
description: 'Referanseinformasjon om dialogtoken'
slug: 'dialogtoken'
aliases:
  - /nb/dialogporten/reference/authorization/dialog-tokens/
weight: 20
---

## Introduksjon

Se [komme i gang med dialogtoken](../../../getting-started/authorization/dialog-tokens/) for en funksjonell oversikt over dialogtoken og hva de kan brukes til.

Dialogtoken muliggjør frontend-forespørsler uten proxy til endepunkter som krever autentisering og autorisasjon, uten å måtte stole på ID-porten SSO og redirects.

## Bruk for sluttbruker-systemer (OAuth-klienter)

Dialogtoken er innebygd i [single dialog response model](../../entities/dialog/) (se `dialogToken`), og er selvstendige, signerte JWT-er som inneholder claims fra den autentiserte brukeren og selve dialogen, inkludert hvilke handlinger og autorisasjonsattributter brukeren er autorisert for.

Dialogtoken skal overføres som de er som bearer tokens i et `Authorization` HTTP-hode. Innholdet i dialogtokenet bør normalt ikke vurderes av klientene, dvs. at det skal behandles som en ugjennomsiktig streng.

Altinn.no-portalen bruker dialogtoken på alle URL-er knyttet til [skrivehandlinger](../../front-end/write-actions/) og [front channel embeds](../../front-end/write-actions/). Andre sluttbrukersystemer kan også bruke dialogtoken for API-handlinger, underlagt tjenestespesifikke protokoller definert av den respektive tjenesteeieren.

### Dialogtokenets levetid

Et ferskt dialogtoken utstedes for hver henting av dialogaggregatet. Levetiden (`exp` claim) er **10 minutter**, så sluttbrukersystemer bør hente dialogen på nytt for å sikre at endepunktene aksepterer tokenet, og at det samsvarer med gjeldende autorisasjonsdata.

## Motta og verifisere dialogtoken (OAuth ressurs-servere)

Ved hjelp av dialogtoken vil ressursserveren kunne autentisere og autorisere forespørsler fullt ut som ellers er uautentiserte, dvs. uten cookies eller annen tilstand. Dialogtoken skal overføres som bearer tokens ved hjelp av et `Authorization` HTTP-hode.

Merk at ressursserveren også må implementere [CORS-protokollen](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for å håndtere forespørsler fra nettleserbaserte klienter, inkludert Altinn.no-portalen.

### Liste over Dialogporten-spesifikke claims

| Claim            | Description                                                                                                                                                        | Example                                                                           |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| c                | Autentisert som en konsument av Dialogporten. Prefikset for enten enkeltpersoner (vanligvis ID-porten), organisasjoner (vanligvis Maskinporten), eller selvregistrerte brukere. | `"urn:altinn:person:identifier-no::12018212345` `"urn:altinn:organization:identifier-no::991825827"` `"urn:altinn:party-identifier:username::someemail@example.com"` |
| l                | Sikkerhetsnivå for autentisering (4)                                                                                                                                | `4`                                                                               |
| u                | Valgfritt. Hvis en provider token i Maskinporten er blitt brukt, vil den autentiserte leverandørens organisasjonsnummer bli gitt her.                                     | `"urn:altinn:organization:identifier-no::991825827"`                                                                  |
| p                | Hvem konsumenten handler på vegne av (hvis ikke dem selv), dvs. hvem som eier den relevante dialogen.                                                                 | `"urn:altinn:person:identifier-no::12018212345"` `"urn:altinn:organization:identifier-no::991825827"`  `"urn:altinn:party-identifier:username::someemail@example.com"` |
| i                | Unik identifikator for dialogen.                                                                                                                                  | `"e0300961-85fb-4ef2-abff-681d77f9960e"`                                           |
| s                | Tjenesteressursen som dialogen refererer til.                                                                                                                   | `"urn:altinn:resource:super-simple-service"`                                      |
| a                | Autoriserte handlinger/autorisasjonsattributter.                                                                                                                        | `"read;write;sign;elementread,urn:altinn:subresource:authorizationattribute1"`                                    |

#### Eksempel på dekodet token

```json
{
  "alg": "EdDSA",
  "typ": "JWT",
  "kid" : "dp-2023-01" 
}
// .
{
  "c": "urn:altinn:person:identifier-no::12018212345", 
  "l": 4,  
  "u": "urn:altinn:organization:identifier-no::825827991",
  "p": "urn:altinn:organization:identifier-no::991825827", 
  "i": "e0300961-85fb-4ef2-abff-681d77f9960e",
  "s": "urn:altinn:resource:super-simple-service",
  "a": "read;write;sign;elementread,urn:altinn:subresource:autorisasjonsattributt1",
  "exp": 1672772834,
  "iss": "https://dialogporten.no",
  "nbf": 1672771934,
  "iat": 1672771934 
}
 
// .
// <signature>
```
### Token signature cipher

Dialogtoken bruker en [Edwards-Curve Digital Signature Algorithm (EdDSA)](https://datatracker.ietf.org/doc/html/rfc8032) med Ed25519-kurven for å signere dialogtoken, noe som gjør det mulig for konsumenter å verifisere at tokenet er utstedt av Dialogporten og stole på informasjonen i claimene. Se også [RFC 8037](https://datatracker.ietf.org/doc/html/rfc8037) for informasjon om bruk av EdDSA i JOSE-kontekster.

### Well-known endpoints

Dialogporten tilbyr [OAuth 2.0 Authorization Server Metadata (RFC8414)](https://datatracker.ietf.org/doc/html/rfc8414), som muliggjør nøkkeloppdagelse, rotasjon og tokenvalidering ved kjøretid. Se [OpenAPI-spesifikasjonen](../../openapi/) (tag "Metadata") for well-known-URL-ene for det aktuelle miljøet.

### Nøkkelsett og rotasjon
JSON Web Key-settene som publiseres på well-known-endepunktene vil alltid inneholde minst to JWK-er. Alle endepunkter som aksepterer og verifiserer dialogtoken utstedt av Dialogporten, bør tillate token signert med hvilken som helst av nøklene som finnes i nøkkelsettet for det aktuelle miljøet.

Nøkkelsettet bør caches og oppdateres med en frekvens på ikke mer enn 24 timer. Dialogporten kan når som helst introdusere nye nøkler i nøkkelsettet, men vil ikke signere dialogtoken før nøkkelen har vært publisert og tilgjengelig på well-known-endepunktet i minst 48 timer. Dette gir konsumenter tid til å oppdatere cache og verifisere signaturen til alle token utstedt av Dialogporten.

### Anbefalinger for tokenvalidering
Se [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) og RFC-ene nevnt ovenfor for informasjon om beste praksis for validering av JWS-signaturer.


{{<children />}}
