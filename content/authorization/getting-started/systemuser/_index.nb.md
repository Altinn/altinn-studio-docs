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

{{< stepcard step="1" title="Utvikle tjeneste">}}
Tjenesteeier utvikler og dokumenterer tjenste som skal bruke Altinn Autorisasjon for tilgangskontroll
{{< /stepcard >}}
{{< stepcard step="2" title="Maskinporten og scopes" >}}
Systembruker bygger videre på [Maskinporten](https://samarbeid.digdir.no/maskinporten/dette-er-maskinporten/96) som lar tjenesteeier sikre autentisitet og tilgang til tjenesten gjennom scopes.
Maskinporten token brukes som informasjonsbærer for Systembruker-informasjon, som gjør at tjenesteeier kan utføre tilangskontroll mot Altinn Autorisasjon.

Det vil derfor være behov for at tjenesten støtter Maskinporten samt at det er satt minimum ett scopes på tjenesten.

Følg fremgangsmåten på [Samarbeidsportalen](https://samarbeid.digdir.no/maskinporten/tilbydar/141) for å etablere støtte for Maskinporten

> Maskinporten-tokenet med systembrukerinformasjon inneholder ingen informasjon som peker tilbake på sluttbrukere. Dersom det er behov for å se hvem som har utført en operasjon (sluttbruker), må ID-porten benyttes som autentiseringsmetode på tjenesten.

{{< /stepcard >}}
{{< stepcard step="3" title="Registrer ressurs" >}}
Ressursregisteret inneholder beskrivelse av autorisasjonsressursen, samt tilgangsregler for denne. Sørg for å informere de som skal benytte tjenesten om nødvendige tilgangspakker (og eventuelle enkeltrettigheter) som kreves for å benytte tjenesten.  
Veiledning for opprettelse av ressurs finnes [her](/nb/authorization/guides/resource-owner/create-resource-resource-admin/)
{{< /stepcard >}}
{{< stepcard step="4" title="Integrer mot Altinn Autorisasjon" >}}
For tjenester som kjøres utenfor Altinn må du gjøre autorisasjonsoppslag mot Altinn Autorisasjon. Hvordan dette gjøres kan du lese mer om [her](/nb/authorization/guides/resource-owner/).
{{< /stepcard >}}

## Sluttbrukersystemleverandør

{{< stepcard step="1" title="Maskinporten onboarding" >}}
Systemembruker bygger videre på Maskinporten som lar tjenesteeier sikre autensitet og tilgang til tjenesten gjennom scopes.
Maskinporten token brukes som informasjonsbærer for sytembruker informasjon, som gjør at tjenesteeier kan utføre tilangskontroll mot Altinn Autorisasjon

For å kunne få tilgang til Maskinporten må du ha norsk organisasjonsnummer. For mer informasjon, se [Maskinporten](https://www.digdir.no/felleslosninger/maskinporten/869).

Gjennom signering av [bruksvilkår for Maskinporten og ID-porten](https://samarbeid.digdir.no/maskinporten/bruksvilkar-private-virksomheter/73#21_generelt) får man tilgang til både testmiljø og produksjonsmiljø hos Digdir.

1. Oppkobling mot Maskinporten.  
   Følg fremgangsmåten for å koble opp til [Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97)
2. Opprette en Maskinporten-klient.  
    En Maskinporten-klient kan opprettes enten i Samarbeidsportalen eller ved bruk av API. Opprettelse av en Maskinporten-klient forutsetter oppkobling til Maskinporten. For mer informasjon, se [Maskinporten-klient](https://docs.altinn.studio/nb/correspondence/getting-started/developer-guides/maskinporten/).
   {{< /stepcard >}}
   {{< stepcard step="2" title="Få tilgang til systembruker-API" >}}
   Gjennom signering av [bruksvilkår](https://samarbeid.digdir.no/altinn/bruksvilkar-sluttbrukersystemleverandorer-i-altinn/3002) for Altinn får man tilgang til både testmiljø og produksjonsmiljø hos Digdir.

Ved å fylle ut [Registreringsskjema for sluttbrukersystemleverandør](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5kcdP2Xp78HZOttvolvmHfSJUOFFBMThaOTI1UlVEVU9VM0FaTVZLMzg0Vi4u) og krysse av for systembruker får du tilgang til nødvendige scopes for systembruker:

- altinn:authentication/systemuser.request.read
- altinn:authentication/systemuser.request.write
- altinn:authentication/systemregister.write

Dersom sluttbrukersystemet skal gjøre klientdelegering via API

- altinn:clientdelegations.read
- altinn:clientdelegations.write

{{< /stepcard >}}
{{< stepcard step="3" title="Registrere system i systemregisteret" >}}
For å ta i bruk tjenester fra sluttbrukersystemet, må systemet registreres i Altinn sitt systemregister.

Dette kan gjøres via [API](https://docs.altinn.studio/nb/api/authentication/systemuserapi/systemregister/create/). Systemet må knyttes til Maskinporten-klienten opprettet i steg 1.

Hvilke tilgangspakker og/eller enkelttjenester som systemet må ha avhenger av den enkelte tjeneste og beskrevet i den enkelte tjenestes dokumentasjon.

> Dagens roller i Altinn skal erstattes av tilgangspakker. For mer informasjon se [tilgangspakker](/nb/authorization/what-do-you-get/accessgroups/).

{{< /stepcard >}}
{{< stepcard step="4" title="Be om tilgang til tjenesteeiers tjenester" >}}
Tjenesteeier bestemmer selv hvilke scopes som benyttes for tilgangskontroll mot sine tjenester.
Dette er ikke de samme scopene som benyttes for systembruker, og de må tildeles av tjenesteeier for tjenesten du skal benytte.
For å finne ut hvilke scopes du må be om, se tjenesteeiers dokumentasjon eller ta kontakt med tjenesteeier.
{{< /stepcard >}}
{{< stepcard step="5" title="Tilpasse systemet for kundene" >}}
Erfaringsmessig tar dette punktet noe tid, da det krever involvering av brukere. Vi oppfordrer derfor alle til å sette av nok tid til gjennomføringen av dette punktet.

En systembruker defineres ved at sluttbrukersystemleverandøren angir hvilke tilgangspakker den skal gi tilgang til.
Hvilke tilgangspakker som er mulig å velge er angitt av tilgangspakkene som systemet ble konfigurert med ved registrering av systemet i systemregisteret.
For å vite hvilke tilgangspakker en systembruker skal ha, må du som systemleverandør vite hvilke tjenester dine brukere trenger for å utføre ulike arbeidsoppgaver.

Se [guider](/nb/authorization/guides/system-vendor/system-user/) for hvordan du setter opp systembruker for forkjellige formål.
{{< /stepcard >}}
{{< stepcard step="6" title="Oppkobling og bruk av tjenesteeiers tjenester" >}}

{{< /stepcard >}}
