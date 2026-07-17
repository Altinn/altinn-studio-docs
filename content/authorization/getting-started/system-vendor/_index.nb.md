---
title: Kom i gang som systemleverandør
linktitle: For systemleverandører
description: Finn riktig veiledning for systembruker, aktørvalg, kundetilganger, samtykke og API-kall
weight: 3
toc: true
aliases:
  - /authorization/getting-started/system-integrator/
---

Velg oppgaven som beskriver hva systemet skal gjøre. Siden passer også for virksomheter som utvikler og drifter egne sluttbrukersystemer.

Tjenesteeieren bestemmer hvilke ressurser, handlinger og tilgangspakker API-et krever. Systemleverandøren har ansvar for å bruke riktig identitet, part og tokenkontekst i hvert kall.

## Kalle et API med systembruker for egen virksomhet

**Passer når:** Systemet skal hente eller sende data for virksomheten som bruker systemet, uten at en person er innlogget.

**Du skal ende opp med:** Et registrert system, en godkjent systembruker og et Maskinporten-token med systembrukerinformasjon.

1. [Sett opp en Maskinporten-klient.](../maskinportenclient/)
2. [Registrer systemet med nødvendige ressurser eller tilgangspakker.](../../guides/system-vendor/system-user/systemregistration/)
3. Velg systembruker for eget system.
4. [Send eller legg til rette for en forespørsel.](../../guides/system-vendor/system-user/systemuserrequest/)
5. [Vent på godkjenning og hent systembrukeren.](../../guides/system-vendor/system-user/byquery/)
6. [Hent og bruk systembrukertokenet.](../../guides/system-vendor/system-user/usetoken/)
7. Kall API-et med riktig virksomhet, ressurs og handling.

En sendt forespørsel er ikke det samme som en godkjent systembruker. Håndter avvist, utløpt og slettet forespørsel som egne tilstander.

## Kalle API-er på vegne av kunder

**Passer når:** En regnskapsfører, revisor eller annen tjenestetilbyder bruker systemet til å arbeide for flere kunder.

**Du skal ende opp med:** Et registrert klientsystem, en systembruker for tjenestetilbyderen og kontrollerte klientdelegeringer.

1. [Les forskjellen mellom eget system og klientsystem.](../../guides/system-vendor/system-user/)
2. [Følg sikkerhetskravene for systemer med flere kunder.](../../guides/system-vendor/system-user/access-control/)
3. Registrer systemet med tilgangspakkene kundearbeidet krever.
4. Opprett og få godkjent systembrukeren.
5. [Knytt godkjente kunder til systembrukeren.](../../guides/system-vendor/system-user/client-delegation/)
6. Hent tokenet med riktig klientkontekst og kall API-et.
7. Test feil kunde, manglende klientforhold og manglende pakke.

Ikke bruk én kundes tokenkontekst, mellomlager eller autorisasjonsresultat for en annen kunde.

## Finne aktører en innlogget bruker kan representere

**Passer når:** En bruker logger inn med ID-porten og skal velge hvilken person eller virksomhet handlingen gjelder for.

**Du skal ende opp med:** Et forståelig aktørvalg basert på Authorized Parties, etterfulgt av en egen tilgangskontroll.

1. [Sett opp autentisering med ID-porten.](../authentication/id-porten/)
2. Bruk access-tokenet fra ID-porten i den videre tokenflyten, ikke ID-tokenet.
3. [Hent aktuelle parter med Authorized Parties.](../../guides/resource-owner/generic-access-resource/integrating-link-service/#integrasjon-med-api-for-autoriserte-parter-avgivere)
4. Vis bare opplysningene brukeren trenger for å velge riktig aktør.
5. Kall tjenesten med den valgte parten.
6. Håndter avvist tilgang som et forventet resultat.

Authorized Parties erstatter ikke tjenesteeierens endelige kontroll av ressursen og handlingen.

## Be om og bruke samtykke til å hente data

**Passer når:** Systemet trenger en tidsavgrenset og uttrykkelig godkjenning for å hente bestemte data.

**Du skal ende opp med:** En samtykkeforespørsel og et samtykketoken for riktig API og datasett.

1. Avtal samtykkeressurs, formål og datamodell med tjenesteeieren.
2. [Få oversikt over samtykkeløpet.](../../guides/system-vendor/consent/)
3. [Opprett samtykkeforespørselen.](../../guides/system-vendor/consent/request/)
4. [Følg hendelser og status.](../../guides/system-vendor/consent/events/)
5. [Hent samtykketokenet.](../../guides/system-vendor/consent/retrieve-token/)
6. [Kall API-et på vegne av den som ga samtykket.](../../guides/system-vendor/consent/behalf-of/)

Systemet må håndtere at samtykket blir avvist, utløper eller trekkes tilbake.

## Administrere tilganger for kunder

**Passer når:** Systemet skal hjelpe en tjenestetilbyder med å administrere hvilke ansatte som kan arbeide for hvilke kunder.

**Du skal ende opp med:** En integrasjon som viser og endrer tilganger uten å blande klientene eller gi bredere administrasjonsrett enn brukeren har.

- [Se veiledningen for klientadministrasjon.](../../guides/system-vendor/client-admin/)
- [Se API-ene for tilgangsstyring.](../../guides/system-vendor/access-management/)
- [Se hvordan sluttbrukeren delegerer klienter.](../../guides/end-user/system-user/delegate-clients/)

Kontroller både at brukeren kan administrere tilgangen, og at den ansatte kan bruke den etterpå.

## Kalle et API for systemets egen identitet

**Passer når:** API-et krever Maskinporten-autentisering, men ikke fullmakter gjennom systembruker.

**Du skal ende opp med:** En Maskinporten-klient med riktig scope og et token som representerer klientvirksomheten.

1. Avklar med tjenesteeieren om systembruker er nødvendig.
2. [Sett opp Maskinporten-klienten.](../maskinportenclient/)
3. Be bare om scopene API-et krever.
4. Kontroller mottaker, scope, miljø og levetid.
5. Kall API-et etter kontrakten fra tjenesteeieren.

## Test og forvalt integrasjonen

Test godkjente, avviste og utløpte forespørsler, feil virksomhet eller kunde, manglende tilgang, ugyldige token og utilgjengelige API-er. Ikke logg komplette token, nøkler eller unødvendige personopplysninger.

- [Bruk feilsøkingsveiledningen for systembruker.](../../guides/system-vendor/system-user/troubleshooting/)
- [Endre rettigheter for en systembruker.](../../guides/system-vendor/system-user/changerequest/)
- [Slett en systembruker.](../../guides/system-vendor/system-user/deleterequest/)
- [Kontroller gjeldende status.](../../reference/status/)
