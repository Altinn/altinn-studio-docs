---
title: 'Dialog Tokens'
description: 'Referanseinformasjon om dialog tokens'
weight: 20
---

## Introduksjon

Se [komme i gang med dialog tokens](/nb/dialogporten/reference/authorization/dialog-tokens/../../../getting-started/authorization/dialog-tokens/) for en funksjonell oversikt over dialog tokens og hva de kan brukes til.

Dialog tokens muliggjør u-proxyede frontend-forespørsler til endepunkter som krever autentisering og autorisasjon, uten å måtte stole på ID-porten SSO og redirects.

## Bruk for sluttbruker-systemer (OAuth-klienter)

Dialog tokens er innebygd i [single dialog response model](/nb/dialogporten/reference/authorization/dialog-tokens/../../entities/dialog/) (se `dialogToken`), og er en selvstendig, signert JWT som inneholder claims fra den autentiserte brukeren og selve dialogen, inkludert hvilke handlinger og autorisasjonsattributter brukeren er autorisert for.

Dialog tokens skal overføres som de er som en bearer token i et `Authorization` HTTP-hode. Innholdet i dialog token bør normalt ikke vurderes av klientene, dvs. at tokenet skal behandles som en ugjennomsiktig streng.

Altinn.no-portalen vil bruke dialog tokens på alle URLer knyttet til [skrivehandlinger](/nb/dialogporten/reference/authorization/dialog-tokens/../../front-end/write-actions/) og [front channel embeds](/nb/dialogporten/reference/authorization/dialog-tokens/../../front-end/write-actions/). Andre sluttbruker-systemer kan også bruke dialog token for API-handlinger, underlagt tjenestespesifikke protokoller definert av den respektive tjenesteeier.

### Dialog token levetid

Et ferskt dialog token utstedes for hver henting av dialog-aggregatet. Levetiden (`exp` claim) er **10 minutter**, så sluttbruker-systemer bør hente dialogen på nytt for å sikre at endepunktene aksepterer tokenet, og at det samsvarer med gjeldende autorisasjonsdata.

## Motta og verifisere dialog tokens (OAuth ressurs-servere)

Ressurs-serveren vil ved hjelp av dialog tokens være i stand til fullt ut å autentisere og autorisere forespørsler som ellers er uautentiserte (dvs. uten cookies eller annen tilstand). Dialog tokens skal overføres som en bearer token ved hjelp av et `Authorization` HTTP-hode.

Merk at for klienter som er nettleserbaserte, inkludert Altinn.no-portalen, må ressurs-serveren også implementere [CORS-protokollen](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for å håndtere forespørsler.

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

Dialog tokens benytter en [Edwards-Curve Digital Signature Algorithm (EdDSA)](https://datatracker.ietf.org/doc/html/rfc8032) ved hjelp av Ed25519-kurven for å signere dialog tokens, noe som gjør det mulig for konsumenter å verifisere at tokenet er utstedt av Dialogporten og stole på informasjonen i claimene. Se også [RFC 8037](https://datatracker.ietf.org/doc/html/rfc8037) for informasjon om bruk av EdDSA i JOSE-kontekster.

### Well-known endpoints

Dialogporten tilbyr [OAuth 2.0 Authorization Server Metadata (RFC8414)](https://datatracker.ietf.org/doc/html/rfc8414) som muliggjør runtime nøkkeloppdagelse, rotasjon og tokenvalidering. Se [OpenAPI spesifikasjonen](/nb/dialogporten/reference/authorization/dialog-tokens/../../openapi/) (tag "Metadata") for de well-known URLene for det gitte miljøet.

### Key sets and rotations
The JSON Web Key sets published on the well-known-endpoints will always contain at least two JWKs. All endpoints that accepts and verifies dialog tokens issued by Dialogporten, should allow tokens signed by any of the keys present in the key set for the given environment. 

The key set should be cached and refreshed with a frequency no more than 24 hours. Dialogporten may at any point introduce new keys into the key set, but will not sign any dialog tokens until the key has been published and available at the well-known endpoint for at least 48 hours. This will allow for consumers to refresh their caches and verify the signature of any token issued by Dialogporten.

### Token validation recommendations
Please consult [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) and the aforementioned RFCs for information about best practices for JWS signature validation.


{{<children />}}