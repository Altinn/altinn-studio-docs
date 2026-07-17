---
title: Integrer et system med Altinn Autorisasjon
linktitle: For systemleverandører
description: Slik velger du identitet, setter opp systembruker og kaller en tjeneste på vegne av personer eller virksomheter.
weight: 3
toc: true
aliases:
  - /authorization/getting-started/system-integrator/
---

Denne veiledningen gir systemleverandører ett hovedløp fra valg av identitet til produksjonsklart kall. Den passer også for virksomheter som utvikler og drifter egne sluttbrukersystemer.

Detaljsidene inneholder API-kontrakter og komplette eksempler. Bruk denne siden til å velge riktig løp og rekkefølge.

## Før du starter

Avklar

- om en person er innlogget når systemet kaller tjenesten
- om systemet handler for egen virksomhet eller for kunder
- hvilken tjenesteeier og hvilket API dere skal integrere med
- hvilke ressurser, handlinger, scopes og tilgangspakker API-et krever
- hvem som kan godkjenne tilgangen
- hvilke testdata og miljøer dere kan bruke

Tjenesteeieren må bekrefte hvilke tilganger API-et krever. Ikke utled kravene bare fra navnet på en tilgangspakke eller et scope.

[Bruk valgveiviseren hvis du er usikker på integrasjonsmåten.](../choose-authentication/)

## Velg hovedløp

### En person er innlogget

Bruk ID-porten når en person er til stede og systemet skal handle på vegne av personen.

1. Registrer klienten etter kravene fra ID-porten.
2. Be bare om scopene systemet trenger.
3. La personen logge inn og godkjenne scopene.
4. Bruk access-tokenet, ikke ID-tokenet, i den videre tokenflyten.
5. Veksle tokenet hvis Altinn-API-et krever Altinn-token.
6. Finn aktuelle parter når brukeren skal velge hvem handlingen gjelder for.
7. Kall API-et med riktig part og ressurs.
8. Håndter avvist tilgang uten å skjule den som en teknisk feil.

[Følg veiledningen for autentisering med ID-porten.](../authentication/id-porten/)

### Systemet handler for egen virksomhet

Bruk Maskinporten når systemet kjører uten en innlogget person. Bruk systembruker i tillegg når API-et krever tilganger som virksomheten har godkjent.

Følg systembrukerløpet nedenfor og velg **systembruker for eget system**.

### Systemet handler for kunder

Bruk systembruker for klientsystem når en regnskapsfører, revisor eller annen tjenestetilbyder skal bruke systemet på vegne av kunder.

Dette løpet krever tilgangspakker og klientforhold. Systemet må skille kundene og kontrollere at en innlogget bruker bare kan bruke riktig systembruker for kunder vedkommende kan arbeide for.

[Se sikkerhetskravene for delte systemer.](../../guides/system-vendor/system-user/access-control/)

## Sett opp systembruker

### 1. Opprett Maskinporten-klient

Opprett en Maskinporten-klient for systemintegrasjonen. Skaff scopene som trengs for å registrere systemet, administrere systembrukere og kalle tjenesteeierens API.

[Sett opp en Maskinporten-klient.](../maskinportenclient/)

### 2. Registrer systemet

Registrer systemet i Altinns systemregister. Systemdefinisjonen angir blant annet

- system-ID og leverandør
- navn og beskrivelse
- ressurser eller tilgangspakker
- Maskinporten-klienter
- tillatte omdirigeringsadresser
- om systemet skal være synlig for brukerstyrt opprettelse

Be bare om tilganger som systemet faktisk trenger.

[Følg veiledningen for å registrere systemet.](../../guides/system-vendor/system-user/systemregistration/)

### 3. Velg eget system eller klientsystem

**Eget system** brukes når virksomheten skal hente eller sende data for seg selv. Det kan bruke enkeltrettigheter eller tilgangspakker som ressursen støtter.

**Klientsystem** brukes når tjenestetilbyderen handler for kunder. Dette løpet bruker tilgangspakker og krever at klientforholdet og videredelegeringen er på plass.

[Se forskjellen mellom de to typene systembruker.](../../guides/system-vendor/system-user/#systembruker-for-eget-system)

### 4. Velg hvem som starter opprettelsen

Ved **leverandørstyrt opprettelse** sender systemleverandøren en forespørsel og gir kunden en sikker lenke til godkjenning.

Ved **brukerstyrt opprettelse** finner og oppretter kunden systembrukeren fra Altinn. Systemet må være registrert som synlig og støtte denne flyten.

[Følg veiledningen for å opprette en systembruker.](../../guides/system-vendor/system-user/systemuserrequest/)

### 5. Vent på godkjenning

Ikke behandle en sendt forespørsel som en opprettet systembruker. Følg statusen til forespørselen er godkjent og systembrukeren finnes.

Håndter avvist, utløpt og slettet forespørsel som egne tilstander. Ikke gjenta opprettelsen ukontrollert hvis svaret er uklart.

[Se hvordan du henter en eksisterende systembruker.](../../guides/system-vendor/system-user/byquery/)

### 6. Knytt til kunder når det er nødvendig

For et klientsystem må tjenestetilbyderen ha fullmakten fra kunden, og klienten må knyttes til systembrukeren. Hvilke klienter som kan knyttes til, avhenger av klientforholdet og tilgangspakkene.

[Se hvordan klientdelegering fungerer for systemleverandører.](../../guides/system-vendor/system-user/client-delegation/)

### 7. Hent og kontroller tokenet

Hent systembrukertokenet gjennom Maskinporten. Kontroller at tokenet gjelder riktig

- system
- systembruker
- virksomhet
- klient
- scope
- miljø

Ikke bruk én kundes identitet eller tokenkontekst til å utføre handlinger for en annen kunde.

[Se hvordan du henter og bruker systembrukertokenet.](../../guides/system-vendor/system-user/usetoken/)

### 8. Kall tjenesteeierens API

Følg kontrakten og sikkerhetskravene fra tjenesteeieren. Oppgi riktig part, ressurs og handling. Et gyldig systembrukertoken betyr ikke at alle operasjoner er tillatt; tjenesteeierens API gjør den endelige tilgangskontrollen.

Logg tekniske identifikatorer og korrelasjons-ID-er som gjør feilsøking mulig, men ikke komplette token eller unødvendige personopplysninger.

## Test integrasjonen

Test minst

- opprettelse og godkjenning
- avvist og utløpt forespørsel
- eget system og klientsystem der begge støttes
- kunde uten nødvendig fullmakt
- feil kunde eller systembruker
- trukket tilbake tilgang
- utløpt eller ugyldig token
- gjentatt forespørsel og usikkert svar
- utilgjengelig Altinn- eller tjenesteeier-API

[Bruk feilsøkingsveiledningen for Systembruker.](../../guides/system-vendor/system-user/troubleshooting/)

## Klargjør produksjon

Før produksjonssetting skal du kontrollere at

- produksjonsklienten har riktige scopes
- systemet er registrert med riktige produksjonsverdier
- omdirigeringsadressene er eksakte og godkjente
- systemet skiller virksomheter og kunder i alle lag
- hemmeligheter og nøkler kan roteres
- integrasjonen håndterer avvist, utløpt og trukket tilbake tilgang
- logger og spor ikke inneholder komplette token eller unødvendige personopplysninger
- brukeren får forståelig beskjed når en godkjenning eller fullmakt mangler

[Kontroller gjeldende status for Altinn Autorisasjon før produksjonssetting.](../../reference/status/)

## Forvalt integrasjonen

Oppdater systemregistreringen når systemet trenger andre ressurser eller tilgangspakker. Bruk endringsløpet som dokumentasjonen støtter, og test eksisterende kunder før du erstatter en systembruker.

- [Endre rettigheter for en systembruker.](../../guides/system-vendor/system-user/changerequest/)
- [Slette en systembruker.](../../guides/system-vendor/system-user/deleterequest/)
- [Se aktuelle brukerscenarioer.](../../guides/system-vendor/system-user/userscenarios/)