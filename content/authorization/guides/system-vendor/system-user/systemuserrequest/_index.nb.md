---
title: Opprette Systembruker
description: Gjennomgang av hvordan du oppretter systembruker for eget og klientsystem
linktitle: Opprette Systembruker
weight: 2
---

## Opprette Systembruker for eget system

En SystemBruker for eget system kan opprettes på to forskjellige måter, ved brukerstyrt eller leverandørstyrt opprettelse.

### Brukerstyrt Opprettelse

Ved en brukerstyrt opprettelse kan bruker gå inn i Altinn-portalen og velge fra en nedtrekksliste hvilket system de ønsker å knytte en systembruker til. Sannsynligvis er de allerede kunde hos systemleverandøren, og får veiledning til å finne riktig system på nedtrekkslisten. Etter at de har opprettet systembrukeren kan SluttbrukerSystemLeverandøren (SBSL) hente ut Systembruker-Token fra oss, og bruke det for å integrere mot TjenesteEiere's API på vegne av sluttbruker. En Brukerstyrt opprettelse kan være aktuelt for SBSL som ikke har laget et brukergrensesnitt i sitt system for å opprette SystemBrukeren. I en brukerstyrt opprettelse så blir det ikke opprettet en forespørsel, i stedet for vil sluttbrukeren direkte godkjenne alle tilgangene som er forhåndsdefinert i det registrerte systemet fra nedtrekksmenyen. Dersom det etterspørres en tilgang sluttbrukeren ikke kan delegere til Systembrukeren, så vil ikke opprettelsen kunne gå gjennom.

### Leverandørstyrt Opprettelse

Ved en leverandørstyrt opprettelse må SBSL sende et kall til vårt API for å opprette en Forespørsel (Request). Hvordan det initieres er opp til SBSL selv, for eksempel med Kunden sittende innlogget i SBSL’s eget program eller webside. SBSL gjør dette ved å sende et POST kall til vårt API ( se eksempel under).

Forespørselen inneholder data om deres kunde samt en referanse til SBSL sitt registrerte system og et påkrevet utvalg av de tilganger som var forhånds-definert på det registrerte systemet. Merk at det er et OG-forhold på alle de påkrevde tilganger som etterspørres i Forespørselen. Dette betyr at Sluttbrukeren må kunne delegere alle TilgangsPakkene og EnkeltRettighetene til SystemBrukeren dersom de Godkjenner Forespørselen. Vi oppfordrer til å ikke etterspørre tilganger som ikke trengs.

SBSL kan kalle på vårt API for å hente ut ventende Forespørsler, feks dersom sluttbruker lukket den opprinnelige, og kan spørres på nytt. Forespørselen venter i vår db inntil Sluttbruker følger dyplenken for å Godkjenne eller Avvise Forespørselen. Etter 10 dager vil den gå ut på tid, og ikke lenger være gyldig å bruke. En Godkjent Systembruker vil være aktiv inntil den blir slettet av Sluttbruker, så den kan opprettes i forveien før systemet trenger den for innleveringer.

Et eksempel på POST Forespørsel kallet:

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request
Scope: altinn:authentication/systemuser.write
```

I POST Bodyen så brukes følgende model:

```json
{
  "systemId": "991825827_smartcloud",
  "partyOrgNo": "310904473",
  "externalRef": "bare_i_særtilfeller",
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:kravogutlegg"
    }
  ],
  "redirectUrl": "https://smartcloud/landingpage/after/altinn/approve"
}
```

I eksempelet over er det oppgitt disse verdiene i Post Body:

- systemId : referansen til Systemet som SBSL har forhånds registrert i [Registrer System]
- partyOrgNo : er organisasjonsnummeret til Sluttbruker, slik det er i Enhets Registeret (kun sifrene)
- externalRef : skal normalt ikke brukes. Det er kun i spesielle tilfeller når det er behov for å ha flere SystemBrukere pr System pr Orgno. Det vanlige er å ikke oppgi.
- rights : en liste av de Enkel Rettigheter som er påkrevet for at SystemBrukeren kan integrerere mot TE API (Foretrekk å bruke Tilgangspakker istedet.)
- accessPackages: en liste av de Tilgangspakker som er påkrevet. (Det anbefales at tilgangspakker brukes fremfor Enkelt Rettigheter dersom det lar seg gjøre.)
- redirectUrl : er en valgfri verdi. Kan oppgis dersom det ønskes at Sluttbruker skal redirectes til en intern side hos SBSL, etter godkjenning. MÅ være forhånds registrert på Systemet i så fall.

Merk:

- i url over så står det https://platform.tt02.altinn.no for TT02. For produksjon så vil det være https://platform.altinn.no som er roten.
- scope som er oppgitt settes av Maskinporten i et claim, og blir opprettet i [Samarbeidsportalen](https://samarbeid.digdir.no/maskinporten/maskinporten/25)

### Respons fra POST kall

Etter at vårt API har validert at Forespørselen er korrekt, herunder alle Autorisasjons-Scope, felter i Request, enkelt rettigheter, tilgangspakker, samt sjekket at det ikke allerede er utstedt en tidligere SystemBruker for samme system og orgnr. Så vil vi sende i retur en Respons med en dyplenke til Godkjennings Siden. Den må så SystemLeverandøren gi til Kunden, enten direkte innlogget i deres programvare, eller kommunisert på annen trygg måte.

I responsen som kommer tilbake er det samme struktur som i POST, men i tillegg så kommer denne seksjonen:

```http
{
  "id": "505f8488-3d48-4c15-8e21-35cb9432f815",
  "status": "New",
  "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=505f8488-3d48-4c15-8e21-35cb9432f815"
}
```

- confirmUrl : dette er Dyplenken som SBSL må gi til Sluttbruker på en trygg måte, der Sluttbruker kan Godkjenne opprettelsen av SystemBrukeren. Feks direkte i den innloggede websiden eller system-programmet.
- Id : dette er den unike referansen til selve Forespørselen, som kan brukes ved oppslag i API for hva som er status
- status: den første responsen vil alltid være "New" (Dersom det ikke feiler). Andre mulige verdier er "Accepted", "TimedOut", "Denied" og "Rejected"
  - Accepted er status etter at Sluttbruker har trykket på Godkjenn knappen
  - TimedOut vil skje av seg selv etter 10 dager. Og brukes internt av oss. Da vil ikke lenger Forespørsel være tilgjengelig på eksternt API
  - Rejected er når Sluttbruker trykker på Ikke godkjenn knappen istedetfor Godkjenn
  - Denied er pr nå ikke i bruk

Fortsett på [Godkjenn SystemBruker](/nb/authorization/guides/end-user/system-user/accept-request/)

# Opprette SystemBruker for Klient-Systemer

Sammenlignet med Opprettelse av Vanlig SystemBruker så er det fire forskjeller.

1. Det er kun mulig med LeverandørStyrt Opprettelse
2. Det er kun mulig å angi påkrevde Tilgangspakker, ikke Enkelt Rettigheter
3. Etter at Sluttbruker har godkjent SystemBrukeren, må de inn i Altinn og delegere klienter/kunder/samarbeidspartnere til SystemBrukeren. Det er disse det så vil rapporteres på vegne av.
4. Det er andre endepunkt for Opprettelse og Godkjenning

## Kall for å Opprette SystemBruker for Klient-Systemer

SluttBrukerSystemLeverandøren (SBSL) må sende et kall til vårt API for å opprette en Forespørsel (Request). Hvordan det initieres er opp til SBSL selv, for eksempel med Kunden sittende innlogget i SBSL’s eget program eller webside. SBSL gjør dette ved å sende et POST kall til vårt API ( se eksempel under).

Forespørselen inneholder data om deres kunde samt en referanse til SBSL sitt registrerte system og et påkrevet utvalg av de TilgangsPakkene som var forhånds-definert på det registrerte systemet. Merk at det er et OG-forhold på alle de påkrevde TilgangsPakkene som etterspørres i Forespørselen. Dette betyr at Sluttbrukeren må kunne delegere alle TilgangsPakkene til SystemBrukeren dersom de Godkjenner Forespørselen. Vi oppfordrer til å ikke etterspørre TilgangsPakkene som ikke trengs.

SBSL kan kalle på vårt API for å hente ut ventende Forespørsler, feks dersom sluttbruker lukket den opprinnelige, og kan spørres på nytt. Forespørselen venter inntil Sluttbruker følger dyplenken for å Godkjenne eller Avvise Forespørselen. Etter 10 dager vil den gå ut på tid, og ikke lenger være gyldig å bruke. En Godkjent Systembruker vil være aktiv inntil den blir slettet av kunden, så den kan opprettes i forveien før systemet trenger den for innleveringer.

Et eksempel på POST Forespørsel kallet:

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/agent/request
Scope: altinn:authentication/systemuser.write
```

I POST Bodyen så brukes følgende model:

```json
{
  "systemId": "991825827_smartcloud",
  "partyOrgNo": "310904473",
  "rights": [],
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:kravogutlegg"
    }
  ],
  "redirectUrl": "https://smartcloud/landingpage/after/altinn/approve"
}
```

I eksempelet over er det oppgitt disse verdiene:

- systemId : referansen til Systemet som SBSL har forhånds registrert i [Registrer System]
- partyOrgNo : er organisasjonsnummeret til Sluttbruker, slik det er i Enhets Registeret (kun sifrene)
- externalRef : skal normalt ikke brukes. Det er kun i spesielle tilfeller når det er behov for å ha flere SystemBrukere pr System pr Orgno. Det vanlige er å ikke oppgi.
- accessPackages: en liste av de Tilgangspakker som er påkrevet. (Det anbefales at tilgangspakker brukes fremfor Enkelt Rettigheter dersom det lar seg gjøre.)
- redirectUrl : er en valgfri verdi. Kan oppgis dersom det ønskes at Sluttbruker skal redirectes til en intern side hos SBSL, etter godkjenning. MÅ være forhånds registrert på Systemet i så fall.

Merk:

- i url over så står det https://platform.tt02.altinn.no for TT02. For produksjon så vil det være https://platform.altinn.no som er roten.
- scope som er oppgitt settes av Maskinporten et claim, og blir opprettet i [Samarbeidsportalen](https://samarbeid.digdir.no/maskinporten/maskinporten/25)

### Respons fra POST kall

Etter at vårt API har validert at Forespørselen er korrekt, herunder alle Autorisasjons-Scope, felter i Request, tilgangspakker, samt sjekket at det ikke allerede er utstedt en tidligere SystemBruker for samme system og orgnr. Så vil vi sende i retur en Respons med en dyplenke til Godkjennings Siden. Den må så SystemLeverandøren gi til Kunden, enten direkte innlogget i deres programvare, eller kommunisert på annen trygg måte.

I responsen som kommer tilbake er det samme struktur som i POST, men i tillegg så kommer denne seksjonen:

```json
{
  "id": "505f8488-3d48-4c15-8e21-35cb9432f815",
  "status": "New",
  "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=505f8488-3d48-4c15-8e21-35cb9432f815"
}
```

- confirmUrl : dette er Dyplenken som SBSL må gi til Sluttbruker på en trygg måte, der Sluttbruker kan Godkjenne opprettelsen av SystemBrukeren
- Id : dette er den unike referansen til selve Forespørselen, som kan brukes ved oppslag i API for hva som er status
- status: den første responsen vil alltid være "New" (Dersom det ikke feiler). Andre mulige verdier er "Accepted", "TimedOut", "Denied" og "Rejected"
  - Accepted er status etter at Sluttbruker har trykket på Godkjenn knappen
  - TimedOut vil skje av seg selv etter 10 dager. Og brukes internt av oss. Da vil ikke lenger Forespørsel være tilgjengelig på eksternt API
  - Rejected er når Sluttbruker trykker på Ikke godkjenn knappen istedetfor Godkjenn
  - Denied er pr nå ikke i bruk

Fortsett på [Godkjenn SystemBruker](/nb/authorization/guides/end-user/system-user/accept-request/)
Etter at SystemBrukeren er Godkjent så må det [Delegeres Klienter](/nb/authorization/guides/end-user/system-user/delegate-clients/).
