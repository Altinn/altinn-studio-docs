---
title: Systembruker
description: For å ta i bruk systembruker må du gå gjennom noen administrative skritt, samt gjøre tilpasninger i ditt system.
tags: [platform, authentication]
toc: false
aliases:
  - /authentication/systemauthentication/
---

Under følger en overordnet sjekkliste over de nødvendige stegene du må gå gjennom som tjenesteeier og sluttbrukersystemleverandør for å ta i bruk systembruker.

## Tjenesteeier

{{< expandsmall header="1 Lag tjeneste" id="lag_tjeneste">}}

{{< /expandsmall >}}
{{< expandsmall header="2 Velg autentisering" id="velg_autentisering">}}
Maskinporten er en av grunnstenene systembruker bygger videre på.
Maskinporten sikrer autentisitet og lar tjenesteeier gjøre en grovkornet tilgangsstyring gjennom scopes.
Maskinporten-token brukes også som informasjonsbærer for systembruker-informasjon, som gjør at tjenesteeier kan utføre tilgangskontroll mot Altinn Autorisasjon.

Maskinporten-tokenet med systembrukerinformasjon inneholder ingen informasjon som peker tilbake på sluttbrukere. Dersom det er behov for å se hvem som har utført en operasjon (sluttbruker), må ID-porten benyttes som autentiseringsmetode på tjenesten.

{{< /expandsmall >}}
{{< expandsmall header="3 Registrer ressurs" id="registrere_ressurs">}}
Ressursregisteret inneholder beskrivelse av autorisasjonsressursen, samt tilgangsregler for denne. Sørg for å informere de som skal benytte tjenesten om nødvendige tilgangspakker (og eventuelle enkeltrettigheter) som kreves for å benytte tjenesten.

{{< /expandsmall >}}
{{< expandsmall header="4 Integrer mot Altinn Autorisasjon" id="integrer_autorisasjon">}}
For tjenester som kjøres utenfor Altinn må du gjøre autorisasjonsoppslag mot Altinn Autorisasjon. Hvordan dette gjøres kan du lese mer om [her](../../guides/resource-owner/).
{{< /expandsmall >}}

## Sluttbrukersystemleverandør

{{< expandsmall header="Maskinporten onboarding" id="maskinporten_onboarding">}}
Maskinporten er en av grunnstenene systembruker bygger videre på.
Maskinporten sikrer autensitet og lar tjensteier gjøre en grovkornet tilgangsstyring gjennom scopes
Maskinporten token brukes også som informasjonsbærer for sytembruker informasjon, som gjør at tjenesteeier kan utføre tilangskontroll mot Altinn Autorisasjon

For å kunne få tilgang til Maskinporten må du ha norsk organisasjonsnummer. For mer informasjon, se [Maskinporten](https://www.digdir.no/felleslosninger/maskinporten/869).

Gjennom signering av [bruksvilkår for Maskinporten og ID-porten](https://samarbeid.digdir.no/maskinporten/bruksvilkar-private-virksomheter/73#21_generelt) får man tilgang til både testmiljø og produksjonsmiljø hos Digdir.

1. Oppkobling mot Maskinporten.  
   Følg fremgangsmåten for å koble opp til [Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97)
2. Opprette en Maskinporten-klient.  
   En Maskinporten-klient kan opprettes enten i Samarbeidsportalen eller ved bruk av API. Opprettelse av en Maskinporten-klient forutsetter oppkobling til Maskinporten. For mer informasjon, se [Maskinporten-klient](https://docs.altinn.studio/nb/correspondence/getting-started/developer-guides/maskinporten/).

{{< /expandsmall >}}
{{< expandsmall header="Få tilgang til systembruker-API" id="oppkobling_til_altinn">}}

Gjennom signering av [bruksvilkår](https://samarbeid.digdir.no/altinn/bruksvilkar-sluttbrukersystemleverandorer-i-altinn/3002) for Altinn får man tilgang til både testmiljø og produksjonsmiljø hos Digdir.

Ved å fylle ut [Registreringsskjema for sluttbrukersystemleverandør](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5kcdP2Xp78HZOttvolvmHfSJUOFFBMThaOTI1UlVEVU9VM0FaTVZLMzg0Vi4u) og krysse av for systembruker får du tilgang til nødvendige scopes for systembruker:

- altinn:authentication/systemuser.request.read
- altinn:authentication/systemuser.request.write
- altinn:authentication/systemregister.write

<!-- altinn:clientdelegations.read for klientdelegering api -->

{{< /expandsmall >}}
{{< expandsmall header="Registrere system i systemregisteret" id="registrere_system_i_systemregisteret">}}

For å ta i bruk tjenester fra sluttbrukersystemet, må systemet registreres i Altinn sitt systemregister.

Dette kan gjøres via [API](https://docs.altinn.studio/nb/api/authentication/systemuserapi/systemregister/create/). Systemet må knyttes til Maskinporten-klienten opprettet i steg 3.

Hvilke tilgangspakker og/eller enkelttjenester som systemet må ha avhenger av den enkelte tjeneste og beskrevet i den enkelte tjenestes dokumentasjon.

> Dagens roller i Altinn skal erstattes av tilgangspakker. For mer informasjon se [tilgangspakker](https://docs.altinn.studio/authorization/what-do-you-get/accessgroups/accessgroups/).

{{< /expandsmall >}}
{{< expandsmall header="Be om tilgang til tjenesteeiers tjenester" id="be_om_tilgang_til_tjenesteeiers_tjenester">}}
Tjenesteeier bestemmer selv hvilke scopes som benyttes for tilgangskontroll mot sine tjenester.
Dette er ikke de samme scopene som benyttes for systembruker, og de må tildeles av tjenesteeier for tjenesten du skal benytte.
For å finne ut hvilke scopes du må be om, se tjenesteeiers dokumentasjon eller ta kontakt med tjenesteeier.
{{< /expandsmall >}}
{{< expandsmall header="Tilpasse systemet for kundene" id="tilpasse_systemet_for_kundene">}}
Erfaringsmessig tar dette punktet noe tid, da det krever involvering av brukere. Vi oppfordrer derfor alle til å sette av nok tid til gjennomføringen av dette punktet.

En systembruker defineres ved at sluttbrukersystemleverandøren angir hvilke tilgangspakker den skal gi tilgang til.
Hvilke tilgangspakker som er mulig å velge er angitt av tilgangspakkene som systemet ble konfigurert med ved registrering av systemet i systemregisteret.
For å vite hvilke tilgangspakker en systembruker skal ha, må du som systemleverandør vite hvilke tjenester dine brukere trenger for å utføre ulike arbeidsoppgaver.

Under [Guider](./../../guides/system-vendor/system-user/) kan du lese hvordan du setter opp systembruker for forkjellige frormål
{{< /expandsmall >}}
{{< expandsmall header="Oppkobling og bruk av tjenesteeiers tjenester" id="oppkobling_og_bruk_av_tjenesteeiers_tjenester">}}

{{< /expandsmall >}}
