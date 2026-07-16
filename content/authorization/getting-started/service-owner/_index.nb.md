---
title: Beskytt et API med Altinn Autorisasjon
linktitle: For tjenesteeiere
description: Slik registrerer du en ressurs, definerer regler og håndhever en autorisasjonsbeslutning i API-et ditt.
weight: 2
toc: true
---

Denne veiledningen gir tjenesteeiere ett hovedløp for å beskytte et API som kjører utenfor Altinn. Du registrerer det som skal beskyttes, definerer hvem som kan gjøre hva, og lar API-et kontrollere hver forespørsel mot Altinn Autorisasjon.

Detaljsidene inneholder skjermbilder, API-kontrakter og eksempler. Bruk denne siden til å følge riktig rekkefølge.

## Før du starter

Du må kunne svare på følgende:

- Hvilken tjeneste eller hvilket API skal beskyttes?
- Hvilke handlinger skal klientene kunne utføre?
- Gjelder handlingen en person, en virksomhet eller en klient?
- Skal en person være innlogget, eller skal et system kjøre uten en person?
- Skal tilgangen kunne delegeres?
- Trenger tjenesten samtykke, tilgangslister eller støtte for vergemål?

[Bruk valgveiviseren hvis du er usikker på autentisering og representasjon.](../choose-authentication/)

## 1. Avklar ansvar og avtaler

Avklar hvem som

- eier tjenesten og ressursdefinisjonen
- forvalter reglene og tilgangspakkene
- utvikler og drifter API-et
- godkjenner tilgang til test og produksjon
- følger opp endringer etter at tjenesten er tatt i bruk

Du trenger tilgang til Ressursadministrasjon for organisasjonen. Enkelte integrasjoner krever også avtale og scopes i Maskinporten.

[Sett opp tilgangen til Ressursadministrasjon.](../resourceadministration/)

## 2. Beskriv ressursen og handlingene

Gi ressursen en stabil identifikator. Beskriv navnet og formålet på bokmål, nynorsk og engelsk. Velg handlinger som samsvarer med operasjonene API-et faktisk tilbyr, for eksempel `read` eller `write`.

Unngå å bruke ett vidt tilgangskrav for hele API-et hvis operasjonene har forskjellig risiko. Klienten skal bare få tilgang til handlingene den trenger.

## 3. Opprett ressursen og reglene

Opprett ressursen i Altinn Studio Ressursadministrasjon. Definer minst én regel som kobler sammen

- ressursen
- handlingen
- rollen eller tilgangspakken som gir tilgang

Publiser først til testmiljøet. Kontroller ressursdefinisjonen og policyen før du bruker dem i integrasjonstesten.

[Følg veiledningen for å opprette og publisere en ressurs.](../../guides/resource-owner/create-resource-resource-admin/)

## 4. Velg tilleggsmekanismer

Bruk bare mekanismene tjenesten trenger:

- [Systembruker](../../guides/resource-owner/system-user/) når et system skal bruke fullmakter som en virksomhet har godkjent.
- [Samtykke](../../guides/resource-owner/consent/) når en datakonsument trenger tillatelse til å hente bestemte data.
- [Tilgangslister](../../guides/resource-owner/accesslist/) når tjenesten bare skal være tilgjengelig for utvalgte virksomheter.
- [Vergemål](../guardianship/) når en verge skal kunne handle innenfor vergefullmakten.

Tilleggsmekanismene erstatter ikke tjenestens egen kontroll av token og autorisasjon.

## 5. Autentiser klienten

Kontroller tokenet før du gjør autorisasjonsoppslaget.

- Bruk ID-porten når en person er innlogget.
- Bruk Maskinporten når et system kaller API-et.
- Kontroller systembrukerinformasjonen i Maskinporten-tokenet når klienten bruker systembruker.

Kontroller alltid utsteder, mottaker, levetid og relevante claims etter reglene for tokenet. Ikke bruk innholdet i et token som du ikke har validert.

[Se veiledningene for ID-porten og Maskinporten.](../authentication/)

## 6. Finn hvem identiteten kan representere

Når klienten skal velge eller oppgi en part, kan Authorized Parties brukes til å finne personene og virksomhetene identiteten kan representere.

Ikke bruk listen alene som endelig tilgangskontroll. Tilgangen kan avhenge av ressursen, handlingen og andre forhold som først vurderes i PDP.

[Se hvordan du integrerer med Authorized Parties.](../../guides/resource-owner/generic-access-resource/integrating-link-service/#integrasjon-med-api-for-autoriserte-parter-avgivere)

## 7. Be PDP om en beslutning

Bygg en beslutningsforespørsel med riktig

- identitet eller systembruker
- ressurs
- handling
- part som handlingen gjelder for

PDP returnerer blant annet `Permit`, `Deny`, `NotApplicable` eller `Indeterminate`. API-et ditt er Policy Enforcement Point (PEP) og må håndheve resultatet.

[Se forespørsler, svar og integrasjon med PDP.](../../guides/resource-owner/generic-access-resource/integrating-link-service/#integrasjon-med-pdp)

## 8. Håndhev resultatet

Gi bare tilgang når svaret uttrykkelig er `Permit` og alle andre kontroller i API-et er oppfylt.

Behandle

- `Deny` som avvist tilgang
- `NotApplicable` som at ingen relevant regel ga tilgang
- `Indeterminate` som en teknisk feil i evalueringen
- manglende eller ugyldig svar som teknisk feil

Ikke la tekniske feil gi tilgang. Skill samtidig mellom avvist tilgang og driftsfeil i responsen og loggene.

## 9. Test hele løpet

Test minst

- en forventet `Permit`
- en forventet `Deny`
- en bruker eller systembruker uten nødvendig fullmakt
- feil ressurs eller handling
- feil part
- utløpt eller ugyldig token
- utilgjengelig avhengighet
- endret eller trukket tilbake tilgang

Bruk bare godkjente testdata. Ikke legg token, fødselsnummer, nøkler eller personopplysninger i dokumentasjon eller feilrapporter.

## 10. Klargjør produksjon

Før produksjonssetting skal du kontrollere at

- produksjonsressursen og policyen er publisert
- riktige scopes og klienter er godkjent
- API-et avviser alle resultater som ikke er `Permit`
- logger og spor kan følge en forespørsel uten unødvendige personopplysninger
- teamet kan trekke tilbake tilgang og rulle tilbake en endring
- tjenestebeskrivelsen og kontaktinformasjonen er oppdatert

[Kontroller gjeldende status for Altinn Autorisasjon før produksjonssetting.](../../reference/status/)

## Forvalt integrasjonen

Oppdater ressursen og reglene når API-et endrer handlinger eller ansvar. Test alltid eksisterende klienter før du fjerner eller endrer tilganger. Tjenesteeieren har ansvar for at API-et fortsetter å håndheve beslutningen riktig.