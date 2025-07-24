---
title: Forstå subjekter i Cloud Events
description: "Utforsk rollen til subjekt-feltet i generiske cloud events og dets betydning for hendelsesprosessering og autorisasjon i Altinn."
weight: 20
---

## Subjektet i Cloud Events

I generiske cloud events endrer ikke Altinn hendelsesdataene og krever ikke spesifikk kunnskap om hendelsens detaljer eller entiteter.
Subjekt-feltet i Altinn kan representere ulike entiteter, som parter eller individer. 
For eksempel, hvis en hendelse utløses når en part oppdaterer informasjonen sin, kan subjektet være `/party/{partyId}`. 
Men i forskjellige sammenhenger kan subjektet referere til entiteter som flyplasser eller værstasjoner.

## Velge riktig subjekt

Når du velger et subjekt for hendelsene dine, hold følgende prinsipper i tankene:

- **Relevans**: Subjektet bør være direkte relatert til hendelsesinnholdet. 
  For eksempel, hvis hendelsen angår en part, bør subjektet identifisere den spesifikke parten.

- **Unikhet**: Bruk identifikatorer som `partyId` eller `organizationNumber` for å unikt identifisere entiteten som subjektet refererer til.

- **Konsistens**: Oppretthold et konsistent format for subjekt-felter på tvers av alle hendelser. 
  Denne konsistensen hjelper konsumentene med å forstå og prosessere hendelser effektivt.

## Autorisasjon og subjekthåndtering

Altinn Events muliggjør sømløs publisering og abonnement på tvers av forskjellige sammenhenger, 
ved å utnytte Altinn Authorization for robust tilgangskontroll.

Ved mottak av en hendelse verifiserer systemet vårt senderens tillatelser 
basert på XACML-policyen som er knyttet til Altinn-applikasjonen eller ressursen.

Tilsvarende, når et system ber om hendelsestilgang via abonnement eller spørring, 
valideres systemets rettigheter mot policyen for å sikre samsvar med hendelsens subjekt.

For eksempel, vurder scenarioer hvor systemer konsumerer hendelser relatert til sin egen kontekst.
Hvis et system forsøker å konsumere en hendelse med et ikke-matchende subjekt, feiler autorisasjonen.
XACML-policyen sikrer at bare hendelser relevante for det konsumerende systemet får tilgang, og opprettholder dataintegritet og sikkerhet.

Å velge riktig subjekt er avgjørende ettersom feil subjekter kan føre til hendelsesavvisning på grunn av mislykkede autorisasjonssjekker.

## Typer subjekter støttet av Altinn Authorization

Når et subjekt er inkludert i en publisert cloud event eller abonnementfilter, 
evaluerer Altinn Authorization om publisering eller konsumering er autorisert.

Altinn støtter forhåndsdefinerte subjekttyper som beriker autorisasjonsforespørsler
med detaljert rettighets- og rolleinformasjon, som `partyId` eller `organizationNumber`.

### Standard subjekttyper
Altinn tilbyr flere standard subjekttyper, formatert som streng-konstanter:
- User: Representerer et brukersubjekt. Format: (`/user/{userId}`).
- Org (tjenesteeier): Representerer et Altinn tjenesteeier-subjekt. Format: (`/org/{orgId}`).
- Party: Representerer et part-subjekt. Format: (`/party/{partyId}`).
- Organization: Representerer et organisasjonssubjekt. Format: (`/organisation/{organisationId}`).

### URN subjekttyper
URN (Uniform Resource Name) subjekttyper er også støttet:
- Organization: Representerer en organisasjon. Format: `urn:altinn:organization:identifier-no:{organisasjonsnummer}`
- Person: Representerer en person. Format: `urn:altinn:person:identifier-no:{personnummer}`

### Generisk URN-støtte

Altinn tillater fleksibel definisjon av generiske URN subjekttyper, som imøtekommer tilpassede krav utover forhåndsdefinerte typer.
Sørg for at URNer er i samsvar med syntaksstandardene definert i [RFC 2141](https://datatracker.ietf.org/doc/html/rfc2141).

Det er imidlertid avgjørende å merke seg: Hvis subjektet er sentralt for autorisasjon, må det være en streng 1:1 korrespondanse mellom subjekt-attributtet 
i policyen din og subjektet definert i cloud eventen eller abonnementet. 
Altinn Authorization beriker ikke data for generiske URNer som ikke er forhåndsdefinerte.