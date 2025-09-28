---
title: "Autentisering"
description: "Hvordan autentisere mot Dialogporten"
weight: 10
toc: true
---

## Introduksjon

Dialogporten API-et er delt inn i et tjenesteeier-API og et sluttbruker-API.

| API          | Støttede autentiseringsmetoder                                          |
| ------------ | ----------------------------------------------------------------------- |
| Sluttbruker  | ID-porten, Maskinporten{{<footnote "Kun ved bruk av systembrukere." >}} |
| Tjenesteeier | Maskinporten{{<footnote "Støtter også leverandørtoken" >}}              |

{{<displayFootnotes>}}

I tillegg støttes token utstedt av [Altinn Token Exchange](/nb/authorization/what-do-you-get/authentication/#bytt-et-jwt-fra-en-ekstern-tokenleverandør), ved bruk av enten ID-porten eller Maskinporten som input.

## Bruk for sluttbrukersystemer

Sluttbrukersystemer kan enten bruke et ID-porten-token, som identifiserer en person, eller et Maskinporten-token som identifiserer en systembruker.

{{<notice warning>}}
Merk at tilgang til Dialogporten _ikke_ i seg selv vil gi tilgang til innholdet som er lenket til og hostet på andre APIer, som Altinn Correspondence og Altinn Apps. Disse APIene vil vanligvis kreve tokens med spesifikke scopes, som "altinn:correspondence.read" eller "altinn:instances.read". Disse scope kan provisioneres til samme klient og plasseres i samme token som den som brukes mot Dialogporten.
{{</notice>}}

### ID-porten-autentisering

ID-porten-autentisering bør brukes av sluttbrukersystemer som ønsker å få tilgang til Dialogporten og relaterte tjenester ved hjelp av identiteten til en enkelt person, og bruke deres autorisasjon for å få tilgang til dialoger som er tilgjengelige på tvers av partene som den autentiserte brukeren har tilgang til. Dette er API-et som brukes av det vanlige GUI-grensesnittet ("arbeidsflate") som er tilgjengelig etter innlogging på altinn.no.

Følgende generelle trinn må utføres for å få tilgang til sluttbruker-API-et som en person:

1. Opprett en ID-porten-integrasjon (OAuth2-klient)
2. Provisiones scope `digdir:dialogporten` på klienten, samt eventuelle tilleggs scope som kreves for tilgang til innholdsdata (dvs. `altinn:correspondence.read`)
3. Omdiriger brukeren til autorisasjonsendepunktet i ID-porten, hvor de autentiserer seg og samtykker til at integrasjonen din får tilgang til å kalle Dialogporten på dine vegne
4. På omdirigeringsendepunktet ditt bruker du autorisasjonskoden som er gitt mot ID-porten token-endepunktet for å få et tilgangstoken
5. Utfør forespørsler til [sluttbruker-API](/nb/dialogporten/reference/openapi/) ved hjelp av tilgangstokenet i en `Authorization: Bearer <token>` header.

ID-porten implementerer en standard OAuth2-protokoll, og utsteder refresh tokens som kan lagres og gjenbrukes for å få nye tilgangstokens på et senere tidspunkt. Autoriseringer (OAuth "samtykker") til `digdir:dialogporten` scope er gyldige i opptil 90 dager.

For detaljerte trinn om hvordan du oppretter en ID-porten-integrasjon og bruker OAuth2-protokollen, se ID-porten-dokumentasjonen som er lenket nedenfor.

**Les mer**

- [Om ID-porten (norsk)](https://samarbeid.digdir.no/id-porten/id-porten/18)
- [Kom i gang med ID-porten](https://docs.digdir.no/docs/idporten/oidc/oidc_guide_english.html)
- [Bruke Altinn Token Exchange](/nb/authorization/what-do-you-get/authentication/#bytt-et-jwt-fra-en-ekstern-tokenleverandør)

### Maskinporten-autentisering med systembrukere

Systembrukere er den nye og foretrukne autentiseringsmetoden der en organisasjon kan opprette en "virtuell bruker", delegere tjenesterettigheter til den og knytte den til et system - enten selveid eller levert av en tredjepart. Dette er etterfølgeren til "virksomhetsbruker" i Altinn 2, og gir en sikrere og mer brukervennlig onboarding-prosess for kunder og sluttbrukere.

Følgende generelle trinn må utføres for å få tilgang til sluttbruker-API-et som systembruker:

1. Logg inn i Altinn, og velg å representere organisasjonen du ønsker å opprette systembrukeren i.
2. Naviger til profilinnstillinger, og seksjonen "Systembrukere"
3. Opprett en ny systembruker, og knytt den enten til et leverandørlevert system, eller velg å opprette din egen Maskinporten-integrasjon
4. Gi tjenesterettigheter til systembrukeren
5. Opprett en JWT grant som identifiserer systembrukeren og `digdir:dialogporten` scope, samt eventuelle tilleggs scope som kreves for tilgang til innholdsdata (dvs. `altinn:correspondence.read`), signer den og send den til Maskinporten token-endepunktet for å få et tilgangstoken.
6. Utfør forespørsler til [sluttbruker-API](/nb/dialogporten/reference/openapi/) ved hjelp av tilgangstokenet i en `Authorization: Bearer <token>` header.

For detaljerte trinn om hvordan du oppretter og bruker en systembruker, se lenken nedenfor.

**Les mer**

- [Autentisering med systembrukere](/nb/authorization/guides/system-vendor/system-user/)

{{<children />}}

## Bruk for tjenesteeiersystemer

Tjenesteeiersystemer må bruke Maskinporten-utstedte tokens, eventuelt utvekslet i Altinn Token Exchange.

Det finnes flere scopes som definerer tilgang til forskjellige deler av tjenesteeier-APIet:

| Scope                                                | Gir tilgang til                                                                                                                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `digdir:dialogporten.serviceprovider`                | Alle tjenesteeier-APIer, unntatt søke/liste-API-et                                                                                                                                                      |
| `digdir:dialogporten.serviceprovider.search`         | Alle tjenesteeier-APIer, inkludert søke/liste-API-et                                                                                                                                                    |
| `digdir:dialogporten.serviceprovider.correspondence` | Opprett og oppdater dialoger som refererer en tjenesteressurs av typen `CorrespondenceService` i [Altinn Resource Registry](/nb/authorization/what-do-you-get/resourceregistry/) (kun intern bruk) |

Bruk av disse scope krever at organisasjonen i `consumer` claim er registrert som en tjenesteeier ("org") i Altinn. Hvis ikke vil alle forespørsler mislykkes.

Følgende generelle trinn må utføres for å få tilgang til Dialogporten tjenesteeier-API:

1. Opprett en Maskinporten-integrasjon (OAuth2-klient)
2. Provisiones scope `digdir:dialogporten.serviceprovider` på klienten
3. Generer en JWT grant som refererer til klient-ID-en din og scope, signer den og send den til Maskinporten token-endepunktet
4. På omdirigeringsendepunktet ditt bruker du autorisasjonskoden som er gitt mot Maskinporten endepunktet for å få et tilgangstoken.
5. Utfør forespørsler til [tjenesteeier API](/nb/dialogporten/reference/openapi/) ved hjelp av tilgangstokenet i en `Authorization: Bearer <token>` header.

For detaljerte trinn om hvordan du bruker Maskinporten, se lenken nedenfor.

**Les mer**

- [Om Maskinporten (norsk)](https://samarbeid.digdir.no/maskinporten/maskinporten/25)
- [Kom i gang med Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_summary)

### Gi tilgang til leverandører

Tjenesteleverandør-scope er delegerbare via Altinn API-delegering. Tjenesteeierorganisasjoner kan bruke leverandører til å bruke Dialogporten tjenesteeier-APIer på sine vegne, ved hjelp av API-delegering i Altinn. API-et heter "Dialogporten Serviceowner API". Følg lenkene nedenfor for en veiledning om hvordan du gjør dette:

**Les mer**

- {{<link "../../../authorization/guides/end-user/create-apischeme-resource-admin/" title>}}
