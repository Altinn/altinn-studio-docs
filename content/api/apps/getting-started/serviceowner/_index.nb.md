---
title: Kom i gang - Tjenesteeier
linktitle: Tjenesteeier
---

**API-integrasjon mellom fagsystem og Altinn**

For et tjenesteeiersystem i offentlig sektor.

{{% notice info %}}
Målbilde: Fagsystemet brukes av og opererer på vegne av tjenesteeieren. Det skal motta innsendinger, opprette og forhåndsutfylle skjema, sende meldinger og oppdatere dialoger med sluttbrukeren.
{{% /notice %}}

## Kontekst og konsekvens

| **Avklaring**      | **Svar**                                                                                                                            | **Konsekvens for integrasjonen**                                                                                                        |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Systemrolle        | Fagsystemet skal brukes av tjenesteeieren.                                                                                          | Arkitekturen behandles som et tjenesteeiersystem, ikke som et sluttbrukersystem for eksterne virksomheter.                              |
| Funksjonelt omfang | Motta innsendinger, opprette og forhåndsutfylle skjema og sende meldinger.                                                          | Løsningen trenger App API, Storage API, Events API og ev. Correspondence og Notifications.                                          |
| Representasjon     | Systemet opererer på vegne av tjenesteeieren.                                                                                       | Maskinporten er hovedmekanismen for maskin-til-maskin-autentisering. Systembruker er ikke hovedmønsteret for disse tjenesteeierkallene. |
| Dialogporten       | Altinn Studio-integrasjonen skjer automatisk. Fagsystemet skal i tillegg kunne oppdatere status og legge til nye linjer i dialogen. | Fagsystemet må bruke Dialogportens tjenesteeier-API og skille mellom automatisk appdialog og andre dialoger som fagsystemet eier.       |

### Presisering om «på vegne av tjenesteeier»

I denne artikkelen betyr dette at fagsystemet er en teknisk komponent under tjenesteeierens kontroll og bruker tjenesteeierens maskinidentitet og tilganger. Det betyr ikke at systemet opptrer som sluttbruker eller som en ekstern virksomhet som benytter tjenesten.

## Anbefalt API-portefølje

| **Behov**                               | **Primært API / komponent**            | **Hensikt**                                                                                          |
|-----------------------------------------|----------------------------------------|------------------------------------------------------------------------------------------------------|
| Autentisere fagsystemet                 | Maskinporten                           | Utstede tilgangstoken til tjenesteeierens maskin-til-maskin-kall.                                    |
| Opprette eller forhåndsutfylle skjema   | [Altinn App API](/nb/api/apps)         | Opprette en konkret appinstans, legge inn data, laste opp vedlegg, validere og styre prosess.        |
| Motta beskjed om innsending             | [Altinn Events API](/nb/events)        | Motta eller abonnere på hendelser når appinstanser endres eller fullføres.                           |
| Hente innsending og vedlegg             | [Altinn Storage API ](/nb/api/storage) | Søke etter og laste ned instansmetadata, dataelementer og vedlegg på tvers av tjenesteeierens apper. |
| Sende formelle meldinger                | [Altinn Correspondence API](/nb/api/correspondence) | Opprette meldinger med innhold og eventuelle vedlegg til mottakere.                                  |
| Sende SMS eller e-postvarsel            | [Altinn Notifications API](/nb/notifications/reference/api/)               | Varsle mottakeren om en oppgave, melding eller frist.                                                |
| Oppdatere dialogstatus og dialoginnhold | [Dialogporten tjenesteeier-API](/nb/api/dialogporten)          | Opprette og oppdatere dialoger, status, handlinger, aktiviteter og forsendelsesmetadata.             |
| Definere tjeneste og tilgang            | [Altinn Ressursregister og Autorisasjon](/nb/authorization/getting-started/service-owner/) | Knytte dialog eller tjeneste til en ressurs og tilhørende autorisasjonspolicy.                       |

{{% notice info %}}
Kjernevalg: Events brukes som signal, Storage brukes til uthenting, App API brukes til arbeid med en konkret appinstans, og Dialogportens tjenesteeier-API brukes når fagsystemet skal forvalte dialogmetadata.
{{% /notice %}}

## Dataflyt 1: Motta innsendinger

```
Bruker
-> Altinn Studio-app
-> innsending fullføres
-> Altinn Events
-> integrasjonskomponent
-> Altinn Storage API
-> fagsystem / sak
```

Anbefalt behandlingsmønster:

- Abonner på relevante hendelser for appene og hendelsestypene dere eier.
- La hendelsen starte behandlingen, men ikke behandle hendelsesmeldingen som selve forretningsdataene.
- Bruk instansidentifikatoren til å hente metadata, skjemadata og vedlegg fra Storage API.
- Gjør behandlingen idempotent, slik at samme hendelse eller instans kan håndteres flere ganger uten doble saker eller doble oppdateringer.
- Kjør periodisk avstemming mot Storage for å finne innsendinger som ikke ble behandlet på grunn av midlertidige feil.
- Lagre korrelasjon mellom Altinn-instans, dialog-ID og intern saks- eller prosess-ID.

## Dataflyt 2: Opprette og forhåndsutfylle skjema

```
Fagsystem
-> Maskinporten-token
-> App API
-> opprett instans
-> legg inn datamodell og eventuelle vedlegg
-> bruker eller system fullfører prosessen
```

App API-et brukes for en konkret app og instans. Den appspesifikke OpenAPI-beskrivelsen skal være styrende:

```
https://<org>.apps.<miljo>.altinn.no/<org>/<app>/swagger 
```

- Opprett instansen med korrekt instanseier.
- Bruk appens faktiske datamodell og tillatte innholdsformater.
- Last opp vedlegg med riktig datatype og metadata.
- Kall validering og prosessendepunkter i riktig rekkefølge for den konkrete appen.
- Ikke anta at alle apper har identisk oppførsel. Appeier kan ha utvidet standard-API-et.

## Dataflyt 3: Meldinger og varsling

### Correspondence

Bruk Correspondence når fagsystemet skal sende en formell melding med innhold og eventuelle vedlegg. Meldingen blir tilgjengelig gjennom Altinns meldingstjeneste og representeres i Dialogporten.

### Notifications

Bruk Notifications for korte SMS- eller e-postvarsler, for eksempel om at en ny oppgave eller melding er tilgjengelig. Et varsel er ikke en erstatning for selve meldingen eller dialogen.

| **Komponent**  | **Inneholder**                                                  | **Brukes til**                                        |
|----------------|-----------------------------------------------------------------|-------------------------------------------------------|
| Correspondence | Meldingsinnhold og vedlegg                                      | Formell kommunikasjon til mottakeren.                 |
| Notifications  | Kort SMS eller e-post                                           | Varsle om at noe krever oppmerksomhet.                |
| Dialogporten   | Dialogmetadata, status, aktiviteter, forsendelser og handlinger | Samlet oversikt og inngang til innhold og handlinger. |

## Dialogporten i dette målbildet

{{% notice info %}}
Altinn-plattformen gjør appinstanser tilgjengelige i Dialogporten automatisk og oppdaterer representasjonen når appinstansen endres. Det er derfor viktig å avklare hvem som eier hver oppdatering, slik at fagsystemet ikke konkurrerer med eller overskriver den automatiske appintegrasjonen. 
{{% /notice %}}

### To ulike integrasjonsmønstre

| **Mønster**                                        | **Hvem skriver dialogen**                                         | **Anbefaling**                                                                                                                                       |
|----------------------------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Altinn Studio-appens dialog                        | Altinn-plattformen skriver automatisk på vegne av tjenesteeieren. | La app- og prosessendringer drive standardstatus og standardhandlinger. Avklar eventuelle behov for berikelse mot gjeldende Altinn Apps-integrasjon. |
| Dialog for en tjenesteprosess som fagsystemet eier | Fagsystemet bruker Dialogportens tjenesteeier-API.                | Fagsystemet kan opprette dialogen og oppdatere status, extendedStatus, innhold, handlinger og andre støttede metadata.                               |

### Oppdatere status

Dialogportens tjenesteeier-API støtter oppdatering av dialoger. Bruk PUT når hele oppdateringsrepresentasjonen sendes, eller JSON Patch når bestemte støttede felter skal endres. Dialogens overordnede status kan blant annet uttrykke at prosessen pågår, avventer, krever oppmerksomhet eller er fullført. Den konkrete OpenAPI-spesifikasjonen i valgt miljø er fasit for tillatte felter og verdier.

### Legge inn «nye linjer» i dialogen

Begrepet må knyttes til riktig Dialogporten-entitet:

- Aktivitet: en kronologisk hendelse eller handling i dialogens historikk.
- Forsendelse: én kommunikasjon mellom tjenesteeieren og parten, for eksempel en melding, kvittering, forhåndsutfylt skjema eller innsending.
- Innhold eller additionalInfo: tekstlig metadata som beskriver dialogen, ikke selve fagsysteminnholdet.
- Handling: en lenke eller API-handling brukeren eller et sluttbrukersystem kan utføre.

{{% notice warning %}}
Aktiviteter og forsendelser er append-only. Nye elementer kan legges til, men eksisterende elementer i listene skal ikke erstattes eller fjernes gjennom PUT/PATCH. Selve forretningsinnholdet skal normalt ligge i tjenesteplattformen eller fagsystemet og refereres med URL-er.
{{% /notice %}}

### Ressurskrav

En dialog må referere til en tjenesteressurs i Altinn Ressursregister. For opprettelse gjennom tjenesteeier-API-et må ressursens kompetente myndighet samsvare med den autentiserte organisasjonen. Ressursen og autorisasjonspolicyen bestemmer hvem som kan se dialogen og hvilke handlinger som er tillatt.

## Anbefalt målarkitektur

En integrasjonskomponent som sitter mellom Altinns API'er og fagsystemet.
Integrasjonskomponenten bør håndtere:

- Maskinporten-klient, tokeninnhenting og tokenfornyelse
- separat konfigurasjon for test og produksjon
- API-klienter generert eller implementert mot gjeldende OpenAPI
- kø, retry med backoff og dead-letter-håndtering
- idempotens og deduplisering
- korrelasjons-ID mellom instans, dialog, melding og intern sak
- mapping mellom Altinns datamodeller og fagsystemets domenemodell
- teknisk logging uten unødvendige personopplysninger
- periodisk avstemming og gjenkjøring
- nøkkelrotasjon, overvåking og beredskap

## Autentisering og autorisasjon

### Maskinporten er hovedmønsteret

Fagsystemet opererer som tjenesteeierens system. Maskinporten brukes derfor som hovedmekanisme for maskin-til-maskin-autentisering mot API-er som støtter tjenesteeierkall. Klienten må få de scopene det konkrete API-et krever.

### Systembruker er ikke hovedmønsteret her

Systembruker er primært relevant når et sluttbrukersystem skal handle på vegne av en annen virksomhet med delegerte rettigheter. Det er ikke det beskrevne hovedscenarioet. Systembruker kan bli relevant senere dersom fagsystemet også skal støtte handlinger på vegne av eksterne virksomheter eller kunder.

### ID-porten brukes ved personhandling

Hvis en konkret handling må knyttes til en navngitt, innlogget person, skal personens identitet og representasjonsforhold håndteres gjennom ID-porten og autorisasjonskontroll. Dette må holdes adskilt fra bakgrunnsprosesser som kjører med tjenesteeierens maskinidentitet.

### Tilgangskontroll må være ressursbasert

- Kontroller at tokenet er utstedt til riktig klient og miljø.
- Kontroller nødvendige scopes for API-et.
- Kontroller at tjenesteeieren er kompetent myndighet eller eier for aktuell ressurs.
- Bruk ressursens autorisasjonspolicy når data eller handlinger eksponeres for sluttbrukere.
- Bruk separate klienter eller tydelig separerte rettigheter der risiko og driftsmodell tilsier det.

## Konkret integrasjonsmatrise

| **Flyt**                      | **API**                                           | **Identitet**                         | **Trigger**                            | **Resultat**                                                   |
|-------------------------------|---------------------------------------------------|---------------------------------------|----------------------------------------|----------------------------------------------------------------|
| Motta innsending              | Events + Storage                                  | Maskinporten som tjenesteeier         | Instans- eller prosesshendelse         | Skjemadata og vedlegg importeres til fagsystemet.              |
| Opprette skjema               | App API                                           | Maskinporten som tjenesteeier         | Hendelse i fagsystemet                 | Ny instans med forhåndsutfylte data og eventuelle vedlegg.     |
| Oppdatere aktiv instans       | App API                                           | Maskinporten som tjenesteeier         | Faglig endring før innsending          | Data, vedlegg eller prosess oppdateres innenfor appens regler. |
| Sende melding                 | Correspondence                                    | Maskinporten som tjenesteeier         | Vedtak, svar eller annen kommunikasjon | Formell melding opprettes for mottakeren.                      |
| Sende varsel                  | Notifications                                     | Maskinporten og API-spesifikke scopes | Oppgave, melding eller frist           | SMS eller e-post sendes.                                       |
| Oppdatere fagsystemeid dialog | Dialogporten service owner API                    | Maskinporten som tjenesteeier         | Statusendring i fagsystemet            | Dialogstatus, innhold eller handlinger oppdateres.             |
| Legge til dialoglinje         | Dialogporten activity eller transmission endpoint | Maskinporten som tjenesteeier         | Ny hendelse eller kommunikasjon        | Nytt append-only element legges til dialoghistorikken.         |
| Avstemming                    | Storage + Dialogporten service owner search       | Maskinporten som tjenesteeier         | Planlagt jobb                          | Manglende eller avvikende behandling oppdages og håndteres.    |

## Anbefalt implementeringsrekkefølge

1.  Registrer Maskinporten-klienter og avklar scopes for hvert API og miljø.
2.  Dokumenter app-ID-er, datamodeller, datatyper, prosess-steg og appspesifikke OpenAPI-beskrivelser.
3.  Implementer Events + Storage for en fullført innsending, inkludert idempotens og avstemming.
4.  Implementer App API for opprettelse, forhåndsutfylling, vedlegg og prosess.
5.  Implementer Correspondence og eventuelt Notifications for utgående kommunikasjon.
6.  Avklar eierskap til hver Dialogporten-dialog: automatisk appdialog eller fagsystemeid dialog.
7.  Implementer statusoppdateringer og append-only aktiviteter eller forsendelser i Dialogporten.
8.  Utfør ende-til-ende-tester i TT02 med både positive og negative autorisasjonsscenarier.
9.  Etabler produksjonskonfigurasjon, nøkkelrotasjon, overvåking, alarmer og beredskap.

## Akseptansekriterier før produksjon

| **Område**         | **Akseptansekriterium**                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------|
| Sikkerhet          | Riktig klient, scope, ressurs og part kontrolleres for alle kall.                                 |
| Idempotens         | Samme hendelse eller forespørsel skaper ikke duplikater.                                          |
| Avstemming         | Det finnes en planlagt jobb som oppdager tapte eller avvikende behandlinger.                      |
| Sporbarhet         | Instans-ID, dialog-ID, correspondence-ID og intern saks-ID kan korreleres.                        |
| Personvern         | Logger og feilmeldinger inneholder ikke mer personinformasjon enn nødvendig.                      |
| Feilhåndtering     | Timeout, 401, 403, 404, 409, 422, 429 og 5xx håndteres kontrollert.                               |
| Dialogeierskap     | Det er dokumentert hvilke felter som oppdateres automatisk av Altinn, og hvilke fagsystemet eier. |
| Endringshåndtering | OpenAPI-versjoner og endringer i Altinn-komponenter overvåkes og testes.                          |
| Drift              | Nøkler, sertifikater, secrets, alarmer, kontaktpunkter og beredskapsrutiner er etablert.          |

## Avklaringer som fortsatt må gjøres per tjeneste

Følgende kan ikke fastsettes generelt og må hentes fra den konkrete appen, tjenesten eller API-spesifikasjonen:

- eksakte Maskinporten-scopes
- eksakte App API-endepunkter som er tilgjengelige og tillatt for den aktuelle appen
- datamodell, datatyper, vedleggsregler og prosess-steg
- hvilke hendelsestyper og abonnementer som skal brukes
- hvilken Dialogporten-entitet «nye linjer» skal representere i hvert brukstilfelle
- om fagsystemet skal berike en automatisk appdialog, eller opprette og forvalte en separat dialog
- hvilke ressurser og autorisasjonspolicyer som skal registreres i Ressursregisteret
- retensjon, arkivering og behandlingsansvar for data i fagsystemet

## Kilder

**Altinn 3 API:** https://docs.altinn.studio/nb/api/

**API-integrasjon for sluttbrukersystemer og app-API:** https://docs.altinn.studio/nb/altinn-studio/v8/guides/integration/sbs/apis/

**App API: instanser:** https://docs.altinn.studio/nb/api/apps/instances/

**Dialogporten: om løsningen:** https://docs.altinn.studio/nb/dialogporten/about-dialogporten/

**Dialogporten: tjenesteeierguider:** https://docs.altinn.studio/nb/dialogporten/user-guides/service-owners/

**Dialogporten: opprette dialoger:** https://docs.altinn.studio/nb/dialogporten/user-guides/service-owners/creating-dialogs/

**Dialogporten: dialogmodell:** https://docs.altinn.studio/nb/dialogporten/getting-started/dialogs/

**Dialogporten: dialogentitet og oppdatering:** https://docs.altinn.studio/nb/dialogporten/reference/entities/dialog/

**Altinn Autorisasjon: systembruker:** https://docs.altinn.studio/nb/authorization/what-do-you-get/systemuser/

**Altinn Authorization API:** https://docs.altinn.studio/nb/api/authorization/

**Autentisering mot Altinn API-er:** https://docs.altinn.studio/nb/api/scenarios/authentication/
