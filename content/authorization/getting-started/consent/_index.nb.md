---
title: Kom i gang med Samtykke
linktitle: Samtykke
description: For å komme i gang med samtykke må både datakonsument (sluttbrukersystem) og tjenesteeier gjennom noen steg for å sette opp løsningen
---

## Tjenesteeier

Denne delen beskriver hva tjenesteeier må gjøre for å tilgjengeliggjøre data via samtykketjenesten.

1. Opprett en tjeneste som krever samtykke.

   - Lag eller tilpass et API som tilbyr data som skal kunne deles basert på samtykke.
   - API-et må kunne ta imot et gyldig **samtykketoken** (JWT) fra datakonsument som dokumentasjon på at sluttbruker har gitt samtykke.
   - Beskriv tydelig hvilke data som deles, og under hvilke betingelser.

2. Registrer scopes for tjenesten.

   - Tjenesten må tildeles ett eller flere **OAuth2-scopes** i **Maskinporten**.  
     Disse scopes identifiserer hvilke rettigheter (ressurser) som krever samtykke.
   - Hvert scope bør være spesifikt for formålet, for eksempel `altinn:inntekt.read`.

3. Opprett samtykkeressurs i ressursregisteret.  
   Ressursregisteret inneholder beskrivelse av autorisasjonsressursen samt tilgangsregler for denne. Sørg for å informere de som skal bruke tjenesten om nødvendige tilgangspakker (og eventuelle enkeltrettigheter) som kreves for å ta den i bruk.

4. Tilgangslister.  
   Det er mulig å benytte tilgangslister for å styre hvilke datakonsumenter som får tilgang til tjenesten. Dette krever en prosess for å legge til nye datakonsumenter på tilgangslistene ved behov.  
   Beskrivelse av tilgangslister og hvordan disse brukes finner du [her](/nb/authorization/guides/resource-owner/manage-accesslists-resource-admin/).

5. Informasjon og dokumentasjon.  
   Sørg for å dokumentere:

   - hvilke steg datakonsumenten må gjennom,
   - hvilke tilgangspakker og scopes som kreves, og
   - hvem som skal kontaktes for å få tilgang.

6. Valider samtykke.  
   Samtykketokenet er et tykt token som inneholder all informasjon du trenger for å validere samtykket. Dette betyr at all validering kan gjøres uten oppslag mot Altinn Autorisasjon.

## Datakonsument/Sluttbrukersystem

Denne delen beskriver hva datakonsumenten må gjøre for å ta i bruk samtykketjenesten.

1. Datakonsumenten må ha registrert en Maskinporten-klient.

   - Maskinporten er en av grunnsteinene systembrukeren bygger videre på.
   - Maskinporten sikrer autentisitet og lar tjenesteeier gjøre grovkornet tilgangsstyring gjennom scopes.
   - Maskinporten-tokenet fungerer som informasjonsbærer for samtykket og gjør at tjenesteeier kan gjennomføre autorisasjon basert på innholdet i tokenet.

   For å kunne få tilgang til Maskinporten må du ha norsk organisasjonsnummer. For mer informasjon, se [Maskinporten](https://www.digdir.no/felleslosninger/maskinporten/869).

   Gjennom signering av [bruksvilkår for Maskinporten og ID-porten](https://samarbeid.digdir.no/maskinporten/bruksvilkar-private-virksomheter/73#21_generelt) får man tilgang til både testmiljø og produksjonsmiljø hos Digdir.

   1. Oppkobling mot Maskinporten.  
      Følg fremgangsmåten for å koble opp til [Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97).
   2. Opprette en Maskinporten-klient.  
      En Maskinporten-klient kan opprettes enten i Samarbeidsportalen eller ved bruk av API. Opprettelse av en Maskinporten-klient forutsetter oppkobling til Maskinporten. For mer informasjon, se [Maskinporten-klient](https://docs.altinn.studio/nb/correspondence/getting-started/developer-guides/maskinporten/).

2. Datakonsumenten må ha fått delegert scope for samtykke fra Digdir.

   - Signer [bruksvilkår for Altinn sluttbrukersystemleverandører](https://samarbeid.digdir.no/altinn/bruksvilkar-sluttbrukersystemleverandorer-i-altinn/3002) for å få tilgang til test- og produksjonsmiljø.
   - Fyll ut [registreringsskjemaet for sluttbrukersystemleverandør](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5kcdP2Xp78HZOttvolvmHfSJUOFFBMThaOTI1UlVEVU9VM0FaTVZLMzg0Vi4u) og kryss av for samtykke for å få tildelt nødvendige scopes:
     - altinn:consentrequests.read
     - altinn:consentrequests.write

3. Be om tilgang til tjenesteeiers tjenester.

   - Tjenesteeier bestemmer selv hvilke scopes som brukes for tilgangskontroll mot sine tjenester.
   - Scopene for tjenesten er ikke de samme som scopes for samtykke-API-ene, og tildeles av tjenesteeier.
   - Finn nødvendige scopes i tjenesteeiers dokumentasjon eller ved å ta kontakt med tjenesteeier.
   - Dersom tjenesteeier bruker tilgangslister, må organisasjonsnummeret ditt legges til før du får tilgang.

4. Integrasjon.  
   Under [Guider](/nb/authorization/guides/system-vendor/consent/) kan du lese mer om hvordan du integrerer sluttbrukersystemet ditt mot våre API-er for samtykke.
