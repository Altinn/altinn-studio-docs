---
title: 'Hendelser'
description: 'Lær om hvordan Dialogporten integreres med Altinn Events'
weight: 30
---

## Introduksjon

Dialogporten tilbyr mekanismer for å gjøre det mulig for sluttbruker- og tjenesteeier-systemer å oppdage endringer som er gjort i dialoger, og eliminerer behovet for regelmessig polling av dialoglisten for endringer.

_Hendelser_ refererer til tekniske applikasjonshendelser generert av Dialogporten (eller tjenesteleverandøren) og publisert gjennom [Event-komponenten i Altinn]("../../../events/"). Hendelser kan konsumeres av autoriserte parter og tjenesteleverandøren, i henhold til autorisasjonsreglene definert av tjenesteleverandøren.

## Hvordan Dialogporten bruker hendelser

Dialogporten vil automatisk publisere hendelser av forhåndsdefinerte typer for alle endringer i Dialogporten, inkludert opprettelsen og oppdateringer utført på dialogen og dens overføringer og aktiviteter. Autorisasjonspolicyen knyttet til [hovedtjenesteressursen]({{<relref "../authorization/service-resource">}}) styrer hvem som har lov til å konsumere disse hendelsene på vegne av organisasjonen/innbyggeren som "eier" dialogen.

Dialogporten vil også produsere hendelser når en dialog (eller en dialogendring) først blir sett, dvs. når en enkelt dialogs detaljer hentes fra API-et (sette hendelser sendes ikke som et resultat av forespørsler til søke-/liste-API-et).

Alle hendelser refererer til dialogen hendelsen er relatert til, og noen hendelser vil inneholde ytterligere metadata som lar sluttbrukersystemer og tjenesteleverandørsystemer bygge forretningslogikk knyttet til en bestemt tilstandsendring eller aktivitet utført på en dialog.

## Hvordan tjenesteleverandører og sluttbrukersystemleverandører kan bruke hendelser

Altinn Events støtter (og oppfordrer sterkt til) bruken av "abonnementer" når man konsumerer hendelser, som bruker en [webhook/push-basert](https://www.svix.com/resources/faq/webhooks-vs-api-polling/) tilnærming for å distribuere hendelsesvarsler.

En av hovedfordelene ved å bruke hendelser på denne måten er å kunne reagere på ny/endret informasjon uten behov for hyppig og konstant "polling", som er å gjøre gjentatte forespørsler til endepunktet med et (vanligvis veldig kort) intervall for å sjekke om endringer har skjedd. På den annen side eliminerer bruk av webhooks denne sløsende tilnærmingen ved å "reversere API-et"; Dialogporten/hendelser vil i stedet varsle alle autoriserte abonnenter så snart en endring skjer.

Eksempler på bruk:
* Sluttbrukersystemer overvåker om nye dialoger av en bestemt type opprettes
* Sluttbrukersystemer overvåker om oppdateringer av en eksisterende dialog er gjort av tjenesteleverandøren
* Tjenesteeier som handler på at brukeren har sett en dialog eller åpnet en dialog for å avgjøre behovet for å sende påminnelser
* En annen tjenesteeier, som har fått tilgang til å konsumere hendelser knyttet til en bestemt tjenesteprosess som når en sluttilstand, bruker disse hendelsene som en utløser for å initiere en relatert forretningsprosess proaktivt uten brukerinteraksjon.

## Lav latens per-dialog oppdateringsdeteksjon for GUIer

Dialogporten støtter en tilpasset protokoll for oppdateringsabonnement, som bruker GraphQL-abonnementer levert direkte av Dialogporten. Dette er nyttig for online, interaktive GUIer der brukeren er til stede, noe som gjør at systemet kan overvåke en enkelt dialog for oppdateringer.

Vanligvis brukes dette til å gjøre det mulig for GUIer å varsle sluttbrukeren umiddelbart hvis en dialog som for øyeblikket er åpnet/brukt har blitt endret, noe som er nyttig når man håndterer tilstandsendrende [skrivehandlinger]({{<relref "../write-actions">}}).

**Les mer**
* [Brukerhåndbok for å oppdage endringer]({{<relref "../../user-guides/detecting-changes">}})
* [Teknisk referanseinformasjon om Dialogporten-hendelser]({{<relref "../../reference/events">}})

{{<children />}}