---
title: 'Hendelser'
description: 'Lær om hvordan Dialogporten integreres med Altinn Events'
weight: 30
---

## Introduksjon

Dialogporten tilbyr mekanismer som gjør det mulig for sluttbruker- og tjenesteeiersystemer å oppdage endringer som er gjort i dialoger, og eliminerer behovet for regelmessig polling av dialoglisten for endringer.

_Hendelser_ refererer til tekniske applikasjonshendelser generert av Dialogporten (eller tjenesteleverandøren) og publisert gjennom [Event-komponenten i Altinn](/nb/events/). Hendelser kan konsumeres av autoriserte parter og tjenesteleverandøren, i henhold til autorisasjonsreglene definert av tjenesteleverandøren.

## Hvordan Dialogporten bruker hendelser

Dialogporten vil automatisk publisere hendelser av forhåndsdefinerte typer for alle endringer i Dialogporten, inkludert opprettelsen av og oppdateringer av dialogen og dens forsendelser og aktiviteter. Autorisasjonspolicyen knyttet til [hovedtjenesteressursen](/nb/dialogporten/getting-started/events/../authorization/service-resource/) styrer hvem som har lov til å konsumere disse hendelsene på vegne av organisasjonen eller innbyggeren som "eier" dialogen.

Dialogporten vil også produsere hendelser når en dialog, eller en dialogendring, blir sett for første gang, dvs. når detaljene for en enkelt dialog hentes fra API-et. Sett-hendelser sendes ikke som et resultat av forespørsler til søke- eller liste-API-et.

Alle hendelser refererer til dialogen de er relatert til, og noen hendelser inneholder ytterligere metadata som lar sluttbrukersystemer og tjenesteleverandørsystemer bygge forretningslogikk knyttet til en bestemt tilstandsendring eller aktivitet utført på en dialog.

## Hvordan tjenesteleverandører og sluttbrukersystemleverandører kan bruke hendelser

Altinn Events støtter (og oppfordrer sterkt til) bruken av "abonnementer" når man konsumerer hendelser, som bruker en [webhook/push-basert](https://www.svix.com/resources/faq/webhooks-vs-api-polling/) tilnærming for å distribuere hendelsesvarsler.

En av hovedfordelene ved å bruke hendelser på denne måten er at man kan reagere på ny eller endret informasjon uten behov for hyppig og konstant "polling", dvs. gjentatte forespørsler til et endepunkt med et vanligvis veldig kort intervall for å sjekke om endringer har skjedd. Ved å bruke webhooks elimineres denne sløsende tilnærmingen ved å "reversere API-et"; Dialogporten og Events varsler i stedet alle autoriserte abonnenter så snart en endring skjer.

Eksempler på bruk:
* Sluttbrukersystemer overvåker om nye dialoger av en bestemt type opprettes
* Sluttbrukersystemer overvåker om oppdateringer av en eksisterende dialog er gjort av tjenesteleverandøren
* En tjenesteeier som handler på at brukeren har sett eller åpnet en dialog for å avgjøre behovet for å sende påminnelser
* En annen tjenesteeier, som har fått tilgang til å konsumere hendelser knyttet til at en bestemt tjenesteprosess når en sluttilstand, og bruker disse hendelsene som en utløser for å initiere en relatert forretningsprosess proaktivt uten brukerinteraksjon

## Lav-forsinkelse per-dialog oppdateringsdeteksjon for GUIer

Dialogporten støtter en tilpasset protokoll for oppdateringsabonnement, som bruker GraphQL-abonnementer levert direkte av Dialogporten. Dette er nyttig for nettbaserte, interaktive GUI-er der brukeren er til stede, og gjør det mulig for systemet å overvåke en enkelt dialog for oppdateringer.

Vanligvis brukes dette til å gjøre det mulig for GUIer å varsle sluttbrukeren umiddelbart hvis en dialog som for øyeblikket er åpnet/brukt har blitt endret, noe som er nyttig når man håndterer tilstandsendrende [skrivehandlinger](/nb/dialogporten/getting-started/events/../write-actions/).

**Les mer**
* [Brukerhåndbok for å oppdage endringer](/nb/dialogporten/getting-started/events/../../user-guides/detecting-changes/)
* [Teknisk referanseinformasjon om Dialogporten-hendelser](/nb/dialogporten/getting-started/events/../../reference/events/)

{{<children />}}
