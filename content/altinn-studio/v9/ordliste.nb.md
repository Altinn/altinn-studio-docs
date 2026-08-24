---
draft: true
title: Ordliste
linktitle: Ordliste
description: Forklaringer av ord og begreper som brukes i dokumentasjonen for Altinn Studio, rettet mot tjenesteeiere.
toc: true
tags: [needsReview]
---

Denne ordlisten inneholder forklaringer av ord og begreper som vi bruker i dokumentasjonen for Altinn Studio. Den er først og fremst rettet mot deg som er tjenesteeier. Ordene er sortert alfabetisk.

## A

### Alarmering
Å reagere automatisk på den overvåkede informasjonen, eller mønstre i dataen. Du kan sette opp regler som varsler deg når noe uvanlig skjer.

**Eksempel:** Du får en e-post eller SMS hvis feilraten i appen din plutselig øker til over 5 % av alle forespørsler.

### App
En tjeneste eller applikasjon utviklet i Altinn Studio. Vi bruker dette begrepet konsekvent i stedet for «applikasjon» i dokumentasjonen.

**Eksempel:** Du kan konfigurere appen til å sende e-postvarslinger.

### Appinstans
En kjørende kopi av en app. Som standard kjøres 2 instanser av hver app for å sikre tilgjengelighet.

**Eksempel:** Hvis den ene kopien av appen slutter å svare, tar den andre over automatisk, slik at brukerne ikke merker noe.

**Ikke å forveksle med:** Instans, som er en enkelt utfylling av et skjema.

### authLevel (autentiseringsnivå)
Hvor høyt sikkerhetsnivå brukeren har logget inn med (nivå 3 eller 4).

**Eksempel:** En tjeneste som håndterer sensitive opplysninger kan kreve et høyere autentiseringsnivå enn en enklere tjeneste.

### Autorisasjonspolicy
Regler som styrer hvem som har tilgang til å gjøre hva i en app.

**Eksempel:** Du må oppdatere autorisasjonspolicyen for å gi tjenesteeier tilgang til beskyttede data.

## B

### Backend
Et system eller en tjeneste som kjører på en server og håndterer databehandling og lagring, i motsetning til frontend som brukeren ser og samhandler med.

**Eksempel:** Når du sender inn et skjema, sendes dataene til en backend som behandler og lagrer dem.

### Bekreftelsesoppgave
Prosessoppgave der brukeren kan bekrefte data. Oppretter en bekreftelseslogg.

**Eksempel:** Du kan bruke en bekreftelsesoppgave til å la brukeren bekrefte at opplysningene stemmer, før tjenesten sendes inn.

### Beskyttede data
Data som krever ekstra tilgangskontroll utover vanlig autorisasjon.

**Eksempel:** Du bør konfigurere personopplysninger og klassifisert informasjon som beskyttede data.

### Betaling
Funksjonalitet for å integrere betalingsløsninger i en app.

**Eksempel:** Du kan sette opp betaling for et gebyr knyttet til søknaden, som brukeren betaler før tjenesten sendes inn.

### BPMN (Business Process Model and Notation)
Standard for å modellere forretningsprosesser. Brukes til å definere prosessflyten i en app.

### Bruker
Person som bruker eller fyller ut en app. Tidligere kalt «sluttbruker», men vi bruker nå det enklere «bruker».

## D

### Dataelement
En del av dataene i en instans, for eksempel selve skjemautfyllingen eller et vedlegg.

**Eksempel:** Skjemadataene, et vedlagt bilde og PDF-kvitteringen er alle egne dataelementer i samme instans.

### Datamodell
Strukturen som definerer hvilke data som kan lagres og behandles i en app.

**Eksempel:** Datamodellen kan definere at feltet «Fødselsdato» skal være en dato, og at feltet «Antall barn» skal være et helt tall.

### Dataoppgave
Prosessoppgave der brukeren kan lese, skrive og endre data i skjemaet.

**Eksempel:** Selve utfyllingsskjemaet brukeren fyller ut, er en dataoppgave.

### Dataprosessering
Automatisk behandling av data på serveren, for eksempel kalkuleringer eller validering.

**Eksempel:** Du kan bruke dataprosessering til å automatisk beregne en sum basert på andre felter brukeren har fylt ut.

### Datatype
Definerer hvilken type data som kan lagres. Eksempler: skjemadata, vedlegg, PDF, signaturer.

### Deploy
Se **Distribuere**.

### Distribuere (deploy)
Å distribuere en app vil si å sette den i drift i et miljø. Distribueringen styrer levetiden til appen og antall instanser.

**Eksempel:** Når du distribuerer en ny versjon av appen, blir den tilgjengelig for brukerne uten at de merker noe avbrudd.

### Dynamikk
Funksjonalitet som gjør at elementer i et skjema endres basert på brukerens input, for eksempel at felt skjules eller vises.

**Eksempel:** Et felt for «Beskriv årsaken» kan vises bare hvis brukeren har svart «Annet» på et tidligere spørsmål.

## F

### Filtrering
Funksjonalitet for å fjerne eller skjule visse svaralternativer basert på betingelser eller dynamiske uttrykk.

**Eksempel:** Du kan filtrere bort kommuner som ikke ligger i det valgte fylket.

### Forhåndsutfylling
Automatisk utfylling av skjemafelt med data fra registre eller andre kilder før brukeren begynner å fylle ut.

**Eksempel:** Fødselsdato eller adresse kan hentes automatisk fra Folkeregisteret og forhåndsutfylles for brukeren.

**Også kjent som:** Prefill (teknisk term)

### Forhåndsvalg
Et svaralternativ som velges automatisk når komponenten vises for første gang.

**Eksempel:** I en liste med leveringsalternativer kan «Hjemlevering» være forhåndsvalgt.

### Frontend
Den delen av appen som brukeren ser og samhandler med i nettleseren.

**Eksempel:** Utformingen av skjemaet, slik brukeren ser det i nettleseren, er en del av frontend.

## G

### Gateway
Punkt i prosessen der flyten kan gå ulike veier basert på betingelser eller brukervalg.

**Eksempel:** En gateway kan sende søknaden videre til godkjenning hvis beløpet er over en viss grense, og direkte til arkivering hvis ikke.

## H

### Hemmelighet
Sensitiv konfigurasjonsinformasjon (som passord eller API-nøkler) som lagres sikkert i Azure Key Vault.

**Eksempel:** API-nøkler og andre sensitive konfigurasjonsverdier bør lagres som hemmeligheter i Azure Key Vault. For Maskinporten i Altinn-apper bruker du scope-oppsettet i Altinn Studio, med mindre du følger eldre manuelt oppsett.

## I

### Instans
Et konkret eksempel av en app som opprettes for en spesifikk bruker eller organisasjon — en enkelt utfylling av et skjema eller en prosess i Altinn, også kalt et eksemplar av skjemaet. Hver gang en bruker starter en ny utfylling, opprettes en ny instans.

**Eksempel:** Når en bedrift starter en ny søknad, opprettes en ny instans med egen historikk og eget sett med data.

**Ikke å forveksle med:** Appinstans, som er en kjørende kopi av selve appen.

### Instansiere (instansiering)
Å opprette en ny instans av appen – altså å starte en ny utfylling av skjemaet for en bruker.

### Instrumentering
Instrumentering betyr at programvaren din forteller hva den gjør mens den kjører. Dette er som å legge til måleinstrumenter i et system for å kunne se hva som skjer.

**Eksempel:** Når en bruker sender inn et skjema, kan appen registrere hvor lang tid det tok å behandle innsendingen og om det oppstod noen feil underveis.

## K

### Kodeliste
En liste med koder og tilhørende verdier som du bruker som kilde til svaralternativer. Kan være statiske (fra JSON-fil), dynamiske (genereres fra C#-kode), fra repeterende strukturer i datamodellen, eller felles standard kodelister (som land, fylker, kommuner).

**Eksempel:** Du kan hente kommunekodelisten fra SSB og bruke den i en nedtrekksliste.

**Se også:** Svaralternativer

### Komponent
En byggekloss du setter sammen for å lage et skjema, for eksempel et tekstfelt, en nedtrekksliste eller en knapp.

**Eksempel:** Et tekstfelt for «Fornavn» og en nedtrekksliste for «Fylke» er begge komponenter.

## L

### Layout
Visningen og plasseringen av komponenter på en side i appen.

### Layoutsett
En samling layoutfiler og tilhørende konfigurasjon som definerer hvordan en side eller en gruppe sider skal presenteres for brukeren, for eksempel selve skjemaet eller kvitteringen.

**Eksempel:** Hovedskjemaet og en eventuell kvitteringsside kan hver ha sitt eget layoutsett.

### Ledetekst
Teksten som du viser til brukeren for et felt, en komponent eller et svaralternativ. Også kalt «label» i kode og konfigurasjon.

**Eksempel:** For et svaralternativ med verdi «NO» kan ledeteksten være «Norge».

### Logger (logs)
Tekstmeldinger som programmet skriver ut mens det kjører, for å dokumentere hva som skjer. Nyttig for feilsøking og forståelse av appens oppførsel.

**Eksempel:** Hvis en bruker melder om en feil, kan utviklerne se i loggene hva som skjedde da feilen oppstod.

## M

### Maskinporten
Digdirs autentiseringstjeneste for maskin-til-maskin-kommunikasjon.

**Eksempel:** Du må konfigurere Maskinporten for at appen skal kunne utføre handlinger på vegne av tjenesteeier.

### Målinger (metrics)
Tall og statistikk som automatisk samles inn mens appen kjører. De gir deg oversikt over hva som skjer i appen din.

**Eksempel:** I stedet for å måtte lese gjennom tusenvis av loggmeldinger, kan du se en enkel måling som viser at 150 instanser ble opprettet i dag, og at 5 av dem feilet.

## O

### Oppsummering
En oversiktsside som viser all informasjon brukeren har fylt ut før innsending.

**Eksempel:** Før brukeren sender inn søknaden, får de se en oppsummering av alt de har fylt ut.

### Overvåking (monitorering)
Å motta telemetri fra instrumenteringen og gjøre den synlig, for eksempel gjennom grafer, tabeller eller dashbord.

**Eksempel:** I et overvåkingsverktøy kan du se en graf som viser hvor mange brukere som har logget inn i løpet av den siste uken.

## P

### Prosess
Hele flyten fra start til slutt for en instans, inkludert alle stegene brukeren må gjennom.

**Eksempel:** En søknadsprosess kan bestå av et utfyllingssteg, en signeringsoppgave og til slutt en bekreftelse.

### Prosessoppgave
Et steg i applikasjonsflyten. Typer: dataoppgave, bekreftelsesoppgave, signeringsoppgave, tilbakemeldingsoppgave, systemoppgave.

## R

### Repeterende gruppe
En gruppe felt som du kan gjenta flere ganger i et skjema, for eksempel for å legge til flere familiemedlemmer. Du kan også bruke den repeterende strukturen i datamodellen som kilde til svaralternativer.

**Eksempel:** Du kan bruke en repeterende gruppe til å la brukeren legge til flere familiemedlemmer, hver med sin egen adresse.

### Responskode
Et tall som serveren sender tilbake for å indikere om forespørselen var vellykket eller ikke. For eksempel betyr 200 «OK», mens 404 betyr «ikke funnet» og 500 betyr «serverfeil».

## S

### Sampling
Se **Utvalgsmetode**.

### Signering
Funksjonalitet for elektronisk signering av data i en app.

**Eksempel:** Du kan kreve at en søknad signeres av daglig leder før den sendes inn.

### Signeringsoppgave
Prosessoppgave der brukeren kan signere data. Genererer et signaturobjekt.

### Spørringsparametre
Verdier som du sender med når appen henter en kodeliste. Du bruker dem for å filtrere eller tilpasse innholdet i kodelisten basert på kontekst eller brukerens valg.

**Eksempel:** Du kan sende fylkesnummer som spørringsparameter for å få bare kommunene i det valgte fylket.

### Stateless app
En app som ikke lagrer data permanent, typisk brukt for innsynstjenester.

**Eksempel:** En tjeneste der brukeren bare skal slå opp og se informasjon, uten å lagre noe, kan bygges som en stateless app.

**Også kjent som:** Tilstandsløs app, innsynstjeneste

### Svaralternativer
Valgmuligheter brukeren kan velge fra, for eksempel i en nedtrekksliste eller radioknapper. Du kan sette dem direkte i komponentkonfigurasjonen eller hente dem fra en kodeliste. Hvert svaralternativ består av en verdi (som du lagrer i datamodellen) og en ledetekst (som du viser til brukeren).

**Eksempel:** En nedtrekksliste med fylker har svaralternativer der hver verdi er fylkesnummeret og ledeteksten er fylkesnavnet.

**Se også:** Kodeliste

### Systemoppgave
En prosessoppgave som kjøres automatisk på serveren, uten at brukeren gjør noe. Brukes for eksempel til PDF-generering og eFormidling.

## T

### Tekstressurs
En tekst som er lagret i en tekstressursfil, slik at den kan gjenbrukes og oversettes til flere språk i appen.

**Eksempel:** Teksten på en knapp, eller feilmeldingen som vises hvis et felt er tomt, er begge tekstressurser.

### Telemetri
Informasjonen som samles inn fra instrumenteringen i appen.

**Eksempel:** Appen din kan sende løpende informasjon om antall innlogginger per time til et overvåkingsverktøy.

### Testbruker
Fiktiv bruker som kan brukes til testing i testmiljøene TT02 og produksjon.

**Eksempel:** Du kan bruke en testbruker for å prøve ut tjenesten i TT02 uten å bruke ditt eget fødselsnummer eller organisasjonsnummer.

### Tilbakemeldingsoppgave
Prosessoppgave som lar tjenesteeieren gi tilbakemeldinger til rapporterende enhet.

**Eksempel:** Hvis en søknad mangler informasjon, kan tjenesteeieren bruke en tilbakemeldingsoppgave til å sende den tilbake til brukeren med en kommentar.

### Tillateliste
Liste over IP-adresser som har tilgang til en ressurs. Tidligere kalt hviteliste.

**Eksempel:** Du kan sette opp en tillateliste slik at bare kjente IP-adresser fra en samarbeidspartner får kalle et API.

### Tjenesteeier
Organisasjonen som eier og drifter en app i Altinn.

**Eksempel:** Tjenesteeier kan gi tilgang til logger og hemmeligheter for sine ansatte.

### TT02
Altinns testmiljø for testing av apper før produksjonssetting.

**Eksempel:** Før du setter tjenesten i produksjon, bør du teste den grundig i TT02.

## U

### Underskjema
Et mindre skjema som du kan gjenbruke i flere apper eller flere steder i samme app.

**Eksempel:** Et underskjema for «Legg til en ansatt» kan gjenbrukes flere steder i samme tjeneste eller i flere tjenester.

### Unntak (exception)
En feil som oppstår når programmet kjører, for eksempel når det prøver å dele på null eller lese en fil som ikke finnes.

### Utforming
GUI-fanen i Altinn Studio der du designer og konfigurerer skjemaet.

**Tidligere kjent som:** «Lage»-fanen

### Utvalgsmetode (sampling)
Å velge ut bare en del av telemetrien som skal samles inn. Dette kan redusere kostnader og datamengde.

**Eksempel:** I stedet for å lagre informasjon om hver eneste forespørsel, lagrer du kun hver tiende forespørsel, eller bare forespørsler som tar over 1 sekund.

## V

### Validering
Kontroll av at data brukeren har fylt inn er korrekte og følger reglene du har satt opp.

**Eksempel:** Du kan sette opp validering som krever at et fødselsnummer består av 11 siffer før brukeren kan gå videre.
