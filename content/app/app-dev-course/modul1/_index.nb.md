---
title: Modul 1
description: Opprette app og lage enkelt skjema
linktitle: Modul 1
tags: [apps, training, datamodel, localtest, texts]
weight: 20
---

I denne modulen skal du opprette selve applikasjonen, legge til datamodell og sette opp et enkelt skjema basert på kravene fra Sogndal kommune.

Hvis du skal utvikle hele eller deler av applikasjonen lokalt må du i tillegg klargjøre for lokal utvikling og testing.

{{% notice info %}}
**MERK**  
Alle stegene i denne modulen kan utføres i Altinn Studios grafiske brukergrensesnitt (Designer).
 Det krever imidlertid lokal utvikling for å gjennomføre de resterende modulene og for å få en fullt fungerende applikasjon.
{{% /notice %}}

**Temaer som dekkes i denne modulen:**

- Opprette ny applikasjon
- Legge til datamodell
- Legge til skjemakomponenter og koble dem til datamodell
- Redigering av tekst
- Utvikle en app i lokalt utviklingsmiljø
- Teste applikasjon i lokalt utviklingsmiljø (LocalTest)

## Klargjøre for lokal utvikling og testing

{{% expandlarge id="lokal-utvikling" header="Lokal utvikling" %}}

{{% notice info %}}
Kloning av applikasjonen krever at du først har opprettet en applikasjon i Altinn Studio som beskrevet i [første oppgave](/nb/app/app-dev-course/modul1/#opprette-ny-applikasjon).
{{% /notice %}}

Dersom du vil utvikle hele eller deler av applikasjonen lokalt kan du [klone applikasjonen](/nb/app/getting-started/local-dev/#hvordan-klone-applikasjonen-til-et-lokalt-utviklingsmiljø) du har opprettet i Studio til ditt lokale miljø.

Selve utviklingen kan gjøres i ditt foretrukne utviklerverktøy.
Trenger du en anbefaling, er [Visual Studio Code](https://code.visualstudio.com/Download) et godt alternativ.

**Husk å synkronisere (_pushe_) de lokale endringene dine så de blir tilgjengelige i Altinn Studio.**

### Nyttig dokumentasjon

- [Hvordan klone applikasjon til lokalt utviklingsmiljø](/nb/app/getting-started/local-dev/#hvordan-klone-applikasjonen-til-et-lokalt-utviklingsmiljø)
- [Hvordan synkronisere endringer i lokalt utviklingsmiljø](/nb/app/getting-started/local-dev/#hvordan-synkronisere-endringer-i-lokalt-utviklingsmiljø)

{{% /expandlarge %}}

{{% expandlarge id="lokal-testing-localtest" header="Lokal testing med LocalTest" %}}

Hvis du jobber lokalt kan det være nyttig med forhåndsvisning av endringene du gjør.
  _LocalTest_ er et program som spinner opp en lokal mockup av Altinn Plattform som gir deg mulighet til å teste og verifisere lokale endringer uten å måtte synkronisere med Altinn Studio.

{{% notice info %}}
**MERK**  
For å kunne kjøre appen i LocalTest må applikasjonen ha en tilknyttet datamodell. Dette er beskrevet under [Legge til datamodell](/nb/app/app-dev-course/modul1/#legge-til-datamodell).
{{% /notice %}}

1. [Start LocalTest](https://github.com/Altinn/app-localtest/blob/master/README.md) (inkluderer start av app som også er forklart under).
2. **Start applikasjonen**: Åpne et nytt terminalvindu og naviger til undermappen _App_ i din applikasjon (e.g. `../tilflyttere-sogndal/App`). Start appen med kommandoen `dotnet run` og vent på bekreftelse i terminalen.
 Når appen kjører kan du åpne den på http://local.altinn.cloud og logge inn med en [testbruker](/nb/app/testing/local/testusers/).

Etter innlogging bør du ha et resultat som likner dette:

!["Applikasjonen kjørende lokalt"](/app/app-dev-course/modul1/app-running-locally.jpeg "Applikasjonen kjørende lokalt i nettleseren")

#### Se endringer fortløpende

- Ved endringer knyttet til formLayout og andre _json_-filer holder det å laste inn siden på nytt.
- Ved endringer i forhåndsutfylling må applikasjonen instansieres på nytt (gå til http://local.altinn.cloud og logg inn igjen).
- Ved endringer i _cs_-filer må applikasjonen stoppes (`ctrl+C`) og startes på nytt (`dotnet run`).  
  
  For å oppdatere automatisk ved endring i _cs_-filer, start applikasjonen med `dotnet watch`.
  Denne kommandoen vil enten starte applikasjonen eller laste den inn på nytt ([hot reload](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-watch#hot-reload)) ved endringer i kildekoden.

#### Stoppe applikasjon og LocalTest

Applikasjonen stoppes ved å trykke `ctrl+C` i terminalvinduet der du startet den.  

LocalTest stoppes ved å navigere til mappen `app-localtest` i terminalen og kjøre kommandoen `docker compose down`.

### Nyttig dokumentasjon

- [Hvordan sette opp LocalTest](https://github.com/Altinn/app-localtest/blob/master/README.md)
- [Debugging av applikasjon](/nb/app/testing/local/debug/)
- [Tilgjengelig testbrukere i LocalTest](/nb/app/testing/local/testusers/)

{{% /expandlarge %}}

## Oppgaver

{{% expandlarge id="opprette-ny-applikasjon" header="Opprette ny applikasjon" %}}

Opprett applikasjonen i Altinn Studio med organisasjonen du har tilgang til som eier.
Alternativt kan du opprette applikasjonen med deg selv som eier dersom du ikke skal teste den i et testmiljø (beskrevet i [Modul 3](/nb/app/app-dev-course/modul3/)).

### Krav fra kommunen

Applikasjonen må ha et beskrivende navn (ID) som gjør det enkelt å finne den igjen blant det store antallet
applikasjoner Sogndal kommune har i Altinn Studio.

### Nyttig dokumentasjon

- [Opprette app i Altinn Studio](/nb/app/getting-started/create-app/)

{{% /expandlarge %}}

{{% expandlarge id="legge-til-datamodell" header="Legge til datamodell" %}}
Sogndal kommune har opprettet [en datamodell](datamodel.xsd)
som representerer type data de ønsker å samle inn fra fremtidige innbyggere.

{{% notice info %}}
Som applikasjonsutvikler vil man i noen tilfeller måtte opprette datamodell
for en tjeneste selv. Da vil man kunne benytte seg av datamodelleringsverktøyet i
Altinn Studio eller ta utgangspunkt i en eksisterende datamodell og
redigere den i f.eks. Visual Studio Code eller et selvvalgt tekstredigeringsprogram.
{{% /notice %}}

1. [Last ned xsd-filen](datamodel.xsd), åpne den i et tekstredigeringsprogram
   og ta en nærmere titt på innholdet.
2. [Last opp datamodellen i Altinn Studio](/app/development/data/data-model/data-models-tool/#laste-opp--vise-datamodell)
3. Push endringene master og ta en nærmere titt på filene i mappen `App/models`

### Forståelsessjekk

- Hvilken data er det tjenesteeier ønsker å samle inn her?
- Hvilken effekt har **\<minOccurs\>** i datamodellen? Du vil se at feltet har ulik verdi for _Innflytter.Fornavn_ og _Innflytter.Mellomnavn_.
- Hvilke andre egenskaper er satt på feltet _Innflytter.Mellomnavn_?
- Det er blitt generert en _.C#_, _.metadata.json_ og _.schema.json_ fil i tillegg til _.xsd_ filen som du lastet opp. Hva er sammenhengen mellom disse filene?
- Enkelte restriksjoner fra datamodellen overføres ikke til _C#_-filen, hvilke? Det er og lagt til nye egenskaper, hvilke?

### Nyttig dokumentasjon

- [Laste opp datamodell i Altinn Studio](/nb/app/development/data/data-model/data-models-tool/#laste-opp--vise-datamodell)
- [Beskrivelse av indikatorer i XSD](https://www.w3schools.com/xml/schema_complex_indicators.asp)
  
{{% /expandlarge %}}

{{% expandlarge id="redigere-tekster" header="Redigere tekster" %}}

For at tjenesten skal være brukervennlig og mulig å benytte for de som sitter med synshemninger er det viktig at alle komponenter har gode og beskrivende
overskrifter og beskrivelser. Vi ønsker nå at dere legger til tekster som skal brukes for hvert datafelt.

Det er mulig å koble tekster til komponenter både i Altinn Studio og lokalt.

{{% notice warning %}}
**MERK**: Visningsnavn for applikasjonen må endres både i `App/config/applicationMetadata.json` og i tekstressursene.
{{% /notice %}}

### Krav fra kommunen

- Alle inputfelter skal ha forklarende labels som beskriver hva som skal fylles inn.
- Applikasjonen må være tilgjengelig både på bokmål, nynorsk og engelsk.
  I en første versjon er det tilstrekkelig at kun ett av disse språkene støttes.
- Det er viktig at applikasjonens visningsnavn klinger godt og er beskrivende for tjenesten.

### Nyttig dokumentasjon

- [Redigere applikasjonstekster](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app)
- [Formatering av tekster](/nb/app/development/ux/texts/#formatering-av-tekster)
- [ISO 639-1 standard](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

### Forståelsessjekk

I Altinn i dag støtter vi tre skriftspråk: Bokmål, nynorsk og engelsk.

- Hvordan får du inn engelsk språkstøtte i applikasjonen?
- Hvis vi en dag skal støtte ukrainsk, hvilken språkkode vil du da måtte annotere filen med?
- Hvis en tekstnøkkel refert til i FormLayout.json ikke finnes i tekstressursene, hva vil vises da?

{{% /expandlarge %}}

{{% expandlarge id="sette-opp-komponenter" header="Sette opp komponenter" %}}

Feltene som skal fylles ut på en skjemaside kan settes opp ved hjelp av "drag and drop" i Altinn Studio
eller manuelt i json-filen som beskriver utseendet til en skjemaside _FormLayout.json_.

Basert på kravene fra kommunen klarer du å sette opp den første skjemasiden i Altinn Studio?

### Krav fra kommunen

- Vil ha navn og alder på personen som er tilflytter
  - Fornavn
  - Mellomnavn (valgfritt)
  - Etternavn
  - Alder
- Vil ha adressen på personen som er tilflytter
  - Gateadresse
  - Postnummer
  - Poststed
- Vil ha kontaktinformasjon på personen som er tilflytter
  - Epost
  - Telefon

### Nyttig dokumentasjon

- [Hvordan bygge et skjema med UI editor i Altinn Studio](/nb/app/getting-started/navigation/designer/ui-editor/)
- [Tilgjengelige komponenter i Altinn Studio](/altinn-studio/designer/build-app/ui-designer/components/)
- [Retningslinjer for bruk av komponenter](/nb/app/design/guidelines/components/)

### Forståelsessjekk

I applikasjonsrepoet ditt finner du _FormLayout.json_ i mappen `App/ui/layouts`. JSON-filen beskriver skjemasiden du har satt opp i Altinn Studio,
gitt at du har pushet endringene dine til master.

- Finner du igjen komponenten som er koblet til e-post-feltet?
- Hvilken endring kreves i denne filen dersom e-post-feltet ikke lenger skal være påkrevd?
- Ved å endre én linje i _FormLayout.json_ er det mulig å endre komponenten knyttet til mellomnavn
  til et inndatafelt for et langt svar. Hvilken endring kreves?
{{% /expandlarge %}}

## Oppsummering

I denne modulen har du opprettet en applikasjon i Altinn Studio,
lagt til en datamodell og satt opp en skjemaside som kobler komponenter til noen av feltene i datamodellen.

Dersom du har klargjort for lokal utvikling har du i tillegg klonet applikasjonen for å kunne videreutvikle den i ditt lokale utvilkingsmiljø.
Applikasjonen skal kunne kjøres opp på din lokale maskin med LocalTest og du skal kunne fylle inn feltene.

## Løsningsforslag

Dersom du ikke har fått til alle stegene har vi et [løsningsforslag](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/1) som du kan hente inspirasjon fra.

![Skjermbilde av datainnsamlingsside](/app/app-dev-course/modul1/data-screenshot.png "Skjermbilde av datainnsamlingsside")
