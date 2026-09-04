---
title: 'Dialogtoken'
description: 'Referanseinformasjon om dialogtoken'
slug: 'dialogtoken'
aliases:
  - /nb/dialogporten/reference/authorization/dialog-tokens/
weight: 20
---

## Introduksjon

Se [komme i gang med dialogtoken]({{< relref "../../../getting-started/authorization/dialog-tokens/" >}}) for en funksjonell oversikt over dialogtoken og hva de kan brukes til.

Dialogtoken muliggjør frontend-forespørsler uten proxy til endepunkter som krever autentisering og autorisasjon, uten å måtte stole på ID-porten SSO og redirects.

## Bruk for sluttbruker-systemer (OAuth-klienter)

Dialogtoken er innebygd i [single dialog response model]({{< relref "../../entities/dialog/" >}}) (se `dialogToken`), og er selvstendige, signerte JWT-er som inneholder claims fra den autentiserte brukeren og selve dialogen, inkludert hvilke handlinger og autorisasjonsattributter brukeren er autorisert for.

Dialogtoken skal overføres som de er som bearer tokens i et `Authorization` HTTP-hode. Innholdet i dialogtokenet bør normalt ikke vurderes av klientene, dvs. at det skal behandles som en ugjennomsiktig streng.

Altinn.no-portalen bruker dialogtoken på alle URL-er knyttet til [skrivehandlinger]({{< relref "../../front-end/write-actions/" >}}) og [front channel embeds]({{< relref "../../front-end/write-actions/" >}}). Andre sluttbrukersystemer kan også bruke dialogtoken for API-handlinger, underlagt tjenestespesifikke protokoller definert av den respektive tjenesteeieren.

### Dialogtokenets levetid

Et ferskt dialogtoken utstedes for hver henting av dialogaggregatet. Levetiden (`exp` claim) er **10 minutter**, så sluttbrukersystemer bør hente dialogen på nytt for å sikre at endepunktene aksepterer tokenet, og at det samsvarer med gjeldende autorisasjonsdata.

## Motta og verifisere dialogtoken (OAuth ressurs-servere)

Ved hjelp av dialogtoken vil ressursserveren kunne autentisere og autorisere forespørsler fullt ut som ellers er uautentiserte, dvs. uten cookies eller annen tilstand. Dialogtoken skal overføres som bearer tokens ved hjelp av et `Authorization` HTTP-hode.

Merk at ressursserveren også må implementere [CORS-protokollen](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for å håndtere forespørsler fra nettleserbaserte klienter, inkludert Altinn.no-portalen.

Entiteter med en [autorisasjonskontekst]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) bruker det samme dialogtokenet. Rettighetene deres uttrykkes ikke gjennom `a`-claimet, men ved at entiteten listes opp i [`e`-claimet](#e-claimet-autoriserte-entiteter) - se nedenfor.

### Tokentype

Dialogtokenets JOSE-header `typ` er `JWT`. Det er ikke planlagt å endre dette for den nåværende hovedversjonen.

### Liste over Dialogporten-spesifikke claims

| Claim            | Description                                                                                                                                                        | Example                                                                           |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| jti              | Unik identifikator for dette tokenet (en fersk verdi for hvert utstedte token).                                                                                     | `"8e1f2c3d-4b5a-6978-8a9b-0c1d2e3f4a5b"`                                          |
| c                | Autentisert som en konsument av Dialogporten. Prefikset for enten enkeltpersoner (vanligvis ID-porten), organisasjoner (vanligvis Maskinporten), eller selvregistrerte brukere. | `"urn:altinn:person:identifier-no:12018212345"` `"urn:altinn:organization:identifier-no:991825827"` `"urn:altinn:party-identifier:username:someemail@example.com"` |
| y                | Valgfritt. Til stede når en systembruker er autentisert - systembrukerens identifikator. Se `o` for organisasjonen systembrukeren opptrer for.                       | `"urn:altinn:systemuser:uuid:0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b"`               |
| o                | Valgfritt. Til stede sammen med `y` - organisasjonen systembrukeren opptrer for.                                                                                     | `"urn:altinn:organization:identifier-no:991825827"`                              |
| l                | Sikkerhetsnivå for autentisering (4)                                                                                                                                | `4`                                                                               |
| u                | Valgfritt. Hvis en provider token i Maskinporten er blitt brukt, vil den autentiserte leverandørens organisasjonsnummer bli gitt her.                                     | `"urn:altinn:organization:identifier-no:991825827"`                                                                  |
| p                | Hvem konsumenten handler på vegne av (hvis ikke dem selv), dvs. hvem som eier den relevante dialogen.                                                                 | `"urn:altinn:person:identifier-no:12018212345"` `"urn:altinn:organization:identifier-no:991825827"`  `"urn:altinn:party-identifier:username:someemail@example.com"` |
| i                | Unik identifikator for dialogen.                                                                                                                                  | `"e0300961-85fb-4ef2-abff-681d77f9960e"`                                           |
| s                | Tjenesteressursen som dialogen refererer til.                                                                                                                   | `"urn:altinn:resource:super-simple-service"`                                      |
| a                | Autoriserte handlinger/autorisasjonsattributter.                                                                                                                        | `"read;write;sign;elementread,urn:altinn:subresource:authorizationattribute1"`                                    |
| e                | Valgfritt. Autoriserte entiteter: for hver entitet med en autorisasjonskontekst som brukeren er autorisert for, entitetens ID eller tjenesteeierens `tokenRef`. Utelates når det ikke er noen. Se nedenfor. | `["0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b", "my-own-reference"]`                    |

#### `e`-claimet: autoriserte entiteter

En entitet med en [autorisasjonskontekst]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) kan ha fått tilgang gjennom en annen part eller ressurs enn dialogens egen, noe et handlingsnavn i `a` ikke kan uttrykke på en trygg måte. Rettigheter avledet fra autorisasjonskontekster holdes derfor helt utenfor `a`, og uttrykkes i stedet per entitet i `e`: en flat liste med én oppføring for hver kontekstbærende entitet (API-handling, GUI-handling, forsendelse, dialogvedlegg, forsendelsesvedlegg eller navigasjonshandling på en forsendelse) som brukeren er autorisert for.

Hver oppføring er entitetens `id`, eller - når tjenesteeieren har satt en `tokenRef` på autorisasjonskonteksten - denne referansen ordrett. Like referanser slås sammen til én oppføring. Claimet utelates når det ikke er noe å liste opp, slik at en dialog uten autorisasjonskontekster utsteder et token med nøyaktig den formen det alltid har hatt.

En mottakende tjeneste som håndterer en forespørsel rettet mot en kontekstbærende entitet, må sjekke at entiteten står i `e` - ved ID-en sin, eller ved den `tokenRef` tjenesteeieren valgte - i stedet for å se etter en handling i `a`. Regelen om at forelderen vurderes først gjelder også her: en underliggende del av en nektet forsendelse listes aldri opp, uansett hva dens egen kontekst ville tillatt.

[.NET-SDK-et]({{< relref "/dialogporten/user-guides/service-owners/api-client" >}}) eksponerer dette som den valgfrie parameteren `requiredEntityReference` på `IDialogTokenValidator.Validate`, som lar valideringen feile med mindre den oppgitte referansen er listet opp, og som utvidelsesmetoden `GetAuthorizedEntityReferences()` på det validerte `ClaimsPrincipal`-objektet.

#### Eksempel på dekodet token

```json
{
  "alg": "EdDSA",
  "typ": "JWT",
  "kid" : "dp-2023-01" 
}
// .
{
  "c": "urn:altinn:person:identifier-no:12018212345", 
  "l": 4,  
  "u": "urn:altinn:organization:identifier-no:825827991",
  "p": "urn:altinn:organization:identifier-no:991825827", 
  "i": "e0300961-85fb-4ef2-abff-681d77f9960e",
  "s": "urn:altinn:resource:super-simple-service",
  "a": "read;write;sign;elementread,urn:altinn:subresource:autorisasjonsattributt1",
  "e": ["0194a1b2-3c4d-7e5f-8a9b-0c1d2e3f4a5b", "my-own-reference"],
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

Dialogporten tilbyr [OAuth 2.0 Authorization Server Metadata (RFC8414)](https://datatracker.ietf.org/doc/html/rfc8414), som muliggjør nøkkeloppdagelse, rotasjon og tokenvalidering ved kjøretid, på `{base}/api/v1/.well-known/oauth-authorization-server` og `{base}/api/v1/.well-known/jwks.json`. `{base}` er Dialogportens grunn-URI for miljøet:

| Miljø | Grunn-URI |
|---|---|
| Produksjon | `https://platform.altinn.no/dialogporten` |
| Staging (TT02) | `https://platform.tt02.altinn.no/dialogporten` |
| Test (at23) | `https://platform.at23.altinn.cloud/dialogporten` |

Begge operasjonene er også beskrevet i [OpenAPI-spesifikasjonen]({{< relref "../../openapi/" >}}), under taggen «Metadata».

### Nøkkelsett og rotasjon
JSON Web Key-settene som publiseres på well-known-endepunktene vil alltid inneholde minst to JWK-er. Alle endepunkter som aksepterer og verifiserer dialogtoken utstedt av Dialogporten, bør tillate token signert med hvilken som helst av nøklene som finnes i nøkkelsettet for det aktuelle miljøet.

Nøkkelsettet bør caches og oppdateres med en frekvens på ikke mer enn 24 timer. Dialogporten kan når som helst introdusere nye nøkler i nøkkelsettet, men vil ikke signere dialogtoken før nøkkelen har vært publisert og tilgjengelig på well-known-endepunktet i minst 48 timer. Dette gir konsumenter tid til å oppdatere cache og verifisere signaturen til alle token utstedt av Dialogporten.

### Anbefalinger for tokenvalidering

1. Verifiser signaturen mot JWKS-et, og velg nøkkel etter `kid`.
2. Verifiser at `typ == "JWT"`.
3. Verifiser at `iss` er den forventede Dialogporten-utstederen for miljøet.
4. Verifiser `exp`/`nbf` med minimal klokkeslakk, gitt levetiden på 10 minutter.
5. Verifiser at `i` (dialog-ID) er dialogen du forventer, hvis du kjenner den.
6. For en forespørsel mot selve dialogen eller mot en entitet uten autorisasjonskontekst: verifiser at `a` inneholder handlingen du er i ferd med å utføre. For en forespørsel mot en entitet med en autorisasjonskontekst: verifiser i stedet at entitetens ID eller `tokenRef` står i `e`.
7. Verifiser at `l` oppfyller ditt minstekrav til autentiseringsnivå.
8. Avvis alt du ikke kjenner igjen.

Se [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) og RFC-ene nevnt ovenfor for informasjon om beste praksis for validering av JWS-signaturer.


{{<children />}}
