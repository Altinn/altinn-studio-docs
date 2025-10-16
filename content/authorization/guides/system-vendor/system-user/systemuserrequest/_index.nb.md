---
title: Opprette Systembruker
description: Denne veiledningen viser hvordan du som sluttbrukersystemleverandør oppretter *systembruker for eget system* og *systembruker for klientsystem*.
linktitle: Opprette Systembruker
weight: 2
---

## 1. Opprette Systembruker for eget system

Opprettelse av en systembruker for eget system kan gjøres på to forskjellige måter. Disse er beskrevet under:

### Brukerstyrt Opprettelse

Ved en brukerstyrt opprettelse kan sluttbruker gå inn i Altinn-portalen og velge fra en nedtrekksliste hvilket system de ønsker å knytte en systembruker til. Dersom de trenger veiledning til å finne riktig system på nedtrekkslisten, kontakt systemleverandøren. Etter at de har opprettet systembrukeren kan sluttbrukersystemleverandøren (heretter kalt SBSL) hente ut Systembruker-Token, og bruke det for å integrere mot API fra tjenesteeier på vegne av sluttbruker. 
- En brukerstyrt opprettelse kan være aktuelt dersom de ikke har laget et brukergrensesnitt i eget system for å opprette systembrukeren. 
- I en brukerstyrt opprettelse vil sluttbrukeren direkte godkjenne alle tilgangene som er forhåndsdefinert i det registrerte systemet fra nedtrekksmenyen. Det blir derav ikke opprettet en forespørsel.
- Gjøres det en forespørsel på tilgang sluttbrukeren ikke kan delegere til systembrukeren, vil **ikke** opprettelsen kunne gå gjennom.

### Leverandørstyrt Opprettelse

Ved en leverandørstyrt opprettelse må SBSL sende et kall til vårt API for å opprette en forespørsel (Request). Dette kan initieres av SBSL ved for eksempel:
- Ha kunden sittende innlogget i SBSLs eget program eller webside
- SBSL gjør dette ved å sende et POST kall til vårt API.

Forespørselen inneholder data om deres kunde samt en referanse til SBSL sitt registrerte system og et påkrevet utvalg av de tilganger som var forhånds-definert på det registrerte systemet. 
Merk at det er et **OG**-forhold på alle de påkrevde tilganger som etterspørres i forespørselen. Dette betyr at sluttbrukeren må kunne delegere **alle** tilgangspakkene og enkeltrettighetene til systembrukeren dersom de godkjenner forespørselen. 
*Det anbefales at det ikke etterspørres tilganger som ikke er nødvendige*.

SBSL kan kalle på vårt API for å hente ut ventende forespørsler, eksempelvis dersom sluttbruker lukket den opprinnelige, og kan spørres på nytt. 
Forespørselen venter i vår database inntil sluttbruker følger dyplenken for å godkjenne eller avvise forespørselen. 
Etter 10 dager vil den gå ut på tid, og ikke lenger være gyldig å bruke. 
En godkjent systembruker vil være aktiv inntil den blir slettet av sluttbruker, så den kan opprettes i forveien før systemet trenger den for innleveringer.

Et eksempel på POST forespørsel kallet for *systembruker for eget system*:

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor
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

- systemId : referansen til Systemet som SBSL har forhånds registrert i [Registrer System](/nb/authorization/guides/system-vendor/system-user/systemregistration/)
- partyOrgNo : er organisasjonsnummeret til sluttbruker, slik det er i enhetsregisteret (kun sifrene)
- externalRef : skal normalt ikke brukes. Det er kun i spesielle tilfeller når det er behov for å ha flere systembrukere pr system pr Orgno. Det vanlige er å ikke oppgi.
- rights : en liste av de enkelrettigheter som er påkrevet for at systembrukeren kan integrerere mot tjenesteeier`s API (foretrekkes å bruke tilgangspakker)
- accessPackages: en liste av de Tilgangspakker som er påkrevet. (Det anbefales at tilgangspakker brukes fremfor enkeltrettigheter dersom det lar seg gjøre.)
- redirectUrl : er en valgfri verdi. Kan oppgis dersom det ønskes at sluttbruker skal redirectes til en intern side hos SBSL, etter godkjenning. MÅ være forhånds registrert på systemet.

*Merk*:
- I urlèn over så står det https://platform.tt02.altinn.no for **TT02**.
- For **produksjon** så vil det være https://platform.altinn.no som er roten.
- Scope som er oppgitt settes av Maskinporten i et claim, og blir opprettet i [Samarbeidsportalen](https://samarbeid.digdir.no/maskinporten/maskinporten/25)

### Respons fra POST kall

Det vil sendes i retur en respons med en dyplenke til godkjenningssiden etter at vårt API har validert at forespørselen er korrekt, herunder:
- alle autorisasjons-scope
- felter i request
- enkeltrettigheter
- tilgangspakker, samt
- sjekket at det ikke allerede er utstedt en tidligere systembruker for samme system og orgnr.
   
Denne dyplenken må så systemleverandøren gi til kunden, enten direkte innlogget i deres programvare, eller kommunisert på annen trygg måte.

I responsen som kommer tilbake er det samme struktur som i POST, men i tillegg så kommer denne seksjonen:

```http
{
  "id": "505f8488-3d48-4c15-8e21-35cb9432f815",
  "status": "New",
  "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=505f8488-3d48-4c15-8e21-35cb9432f815"
}
```
- id: unik referanse til forespørselen, kan brukes ved oppslag i API for status.
- status: første respons er alltid "New" (dersom det ikke feiler). Andre mulige verdier: "Accepted", "TimedOut", "Denied" og "Rejected".
  - Accepted: status etter at sluttbruker har trykket «Godkjenn».
  - TimedOut: skjer automatisk etter 10 dager; forespørselen er ikke lenger tilgjengelig via eksternt API.
  - Rejected: når sluttbruker trykker «Ikke godkjenn».
  - Denied: ikke i bruk for øyeblikket.
- confirmUrl: dyplenken SBSL må gi til sluttbruker på en trygg måte, der opprettelsen kan godkjennes (f.eks. direkte i innlogget webside/system).



Fortsett på [Godkjenn SystemBruker]: (/nb/authorization/guides/end-user/system-user/accept-request/)

## 2. Opprette systembruker for Klientsystem

Sammenlignet med systembruker for eget system så er det fire forskjeller:

- Det er kun mulig med **leverandørstyrt opprettelse**
- Det er kun mulig å angi påkrevde tilgangspakker, **ikke** enkeltrettigheter
- Etter at sluttbruker har godkjent systembrukeren, må de inn i Altinn og delegere klienter til systembrukeren. Det er disse det vil rapporteres på vegne av
- Det er andre endepunkt for *Opprettelse* og *Godkjenning*.

### Kall for å opprette systembruker for klientsystem

Ved en opprettelse må SBSL sende et kall til vårt API for å opprette en forespørsel (Request). Dette kan initieres av SBSL ved for eksempel:
- Ha kunden sittende innlogget i SBSLs eget program eller webside
- SBSL gjør dette ved å sende et POST kall til vårt API ( se eksempel under).

Forespørselen inneholder data om deres kunde samt en referanse til SBSL sitt registrerte system og et påkrevet utvalg av de tilganger som var forhånds-definert på det registrerte systemet. 
Merk at det er et **OG**-forhold på alle de påkrevde tilganger som etterspørres i forespørselen. Dette betyr at sluttbrukeren må kunne delegere **alle** tilgangspakkene og enkeltrettighetene til systembrukeren dersom de godkjenner forespørselen. 
Det anbefales at det ikke etterspørres tilganger som ikke er nødvendige.

SBSL kan kalle på vårt API for å hente ut ventende forespørsler, eksempelvis dersom sluttbruker lukket den opprinnelige, og kan spørres på nytt. 
Forespørselen venter i vår database inntil sluttbruker følger dyplenken for å godkjenne eller avvise forespørselen. 
Etter 10 dager vil den gå ut på tid, og ikke lenger være gyldig å bruke. 
En godkjent systembruker vil være aktiv inntil den blir slettet av sluttbruker, så den kan opprettes i forveien før systemet trenger den for innleveringer.


Et eksempel på POST forespørsel kallet for *systembruker for klientsystem*:

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

- systemId : referansen til Systemet som SBSL har forhånds registrert i [Registrer System](/nb/authorization/guides/system-vendor/system-user/systemregistration/)
- partyOrgNo : er organisasjonsnummeret til Sluttbruker, slik det er i Enhets Registeret (kun sifrene)
- externalRef : skal normalt ikke brukes. Det er kun i spesielle tilfeller når det er behov for å ha flere SystemBrukere pr System pr Orgno. Det vanlige er å ikke oppgi.
- accessPackages: en liste av de Tilgangspakker som er påkrevet. (Det anbefales at tilgangspakker brukes fremfor Enkelt Rettigheter dersom det lar seg gjøre.)
- redirectUrl : er en valgfri verdi. Kan oppgis dersom det ønskes at Sluttbruker skal redirectes til en intern side hos SBSL, etter godkjenning. MÅ være forhånds registrert på Systemet i så fall.

*Merk*:
- I url over så står det https://platform.tt02.altinn.no for TT02.
- For produksjon så vil det være https://platform.altinn.no som er roten.
- Scope settes av Maskinporten (claim), og opprettes i [Samarbeidsportalen](https://samarbeid.digdir.no/maskinporten/maskinporten/25).

### Respons fra POST kall

Det vil sendes i retur en respons med en dyplenke til godkjenningssiden etter at vårt API har validert at forespørselen er korrekt, herunder:
- alle autorisasjons-scope
- felter i request
- tilgangspakker, samt
- sjekket at det ikke allerede er utstedt en tidligere systembruker for samme system og orgnr.

I responsen som kommer tilbake er det samme struktur som i POST, men i tillegg så kommer denne seksjonen:

```json
{
  "id": "505f8488-3d48-4c15-8e21-35cb9432f815",
  "status": "New",
  "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=505f8488-3d48-4c15-8e21-35cb9432f815"
}
```
- id: unik referanse til forespørselen, kan brukes ved oppslag i API for status.
- status: første respons er alltid "New" (dersom det ikke feiler). Andre mulige verdier er "Accepted", "TimedOut", "Denied" og "Rejected".
  - Accepted: etter at sluttbruker har trykket «Godkjenn».
  - TimedOut: etter 10 dager er forespørselen ikke lenger tilgjengelig via eksternt API.
  - Rejected: når sluttbruker trykker «Ikke godkjenn».
  - Denied: ikke i bruk.
- confirmUrl: dyplenken som SBSL må gi til sluttbruker på en trygg måte, der opprettelsen kan godkjennes.


Fortsett på [Godkjenn SystemBruker]: (/nb/authorization/guides/end-user/system-user/accept-request/)
Etter at systembrukeren er godkjent så må det [Delegeres Klienter]: (/nb/authorization/guides/end-user/system-user/delegate-clients/).

Etter at en systembruker er godkjent kan SBSL enten: 
- sjekke om Request Status = Accepted, eller
- prøve på dette endepunktet for å se om det har blitt opprettet en systembruker:
{{API_BASE_URL}}/authentication/api/v1/systemuser/vendor/byquery?system-id={system Id}&orgno={orngo for Sluttbruker}&external-ref={bare dersom brukt ved opprettelse}

Som en respons vil de motta informasjon slik:

```json
{
  "id": "{en UUID som er SystemBrukers permanente Id}",
  "systemId": "System Navnet",
  "reporteeOrgNo": "{organisasjons nummer på 9 siffer for Sluttbruker}",
  "created": "2025-10-01T09:50:41.059107Z",
  "supplierOrgno": "{organisasjons nummer på 9 siffer for SBSL}",
  "externalRef": "{bare dersom brukt}",
  "userType": "agent"
}
```
