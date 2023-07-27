---
title: Modul 1
description: Opprette app og lage enkelt skjema
linktitle: Modul 1
tags: [apps, training, datamodel, texts]
weight: 20
---

I denne modulen skal du opprette selve applikasjonen, legge til datamodell og sette opp et enkelt skjema basert på kravene fra Sogndal kommune.

De to første oppgavene (opprette applikasjon og legge til datamodell) må utføres i Altinn Studio.
 Dersom du skal utvikle appen lokalt kan du følge instruksjonene for [klargjøre for lokal utvikling og testing](/nb/app/getting-started/local-dev) etter at du har gjort disse oppgavene.

{{% notice info %}}
**MERK**  
Alle stegene i denne modulen kan utføres i Altinn Studios grafiske brukergrensesnitt, [Altinn Studio Designer](/nb/app/getting-started/ui-editor).
 Det krever imidlertid lokal utvikling å gjennomføre de resterende modulene og for å få en fullt fungerende applikasjon.
{{% /notice %}}

**Temaer som dekkes i denne modulen:**

- Opprette ny applikasjon
- Legge til datamodell
- Legge til skjemakomponenter og koble dem til datamodell
- Redigering av tekst

## Oppgaver

{{% expandlarge id="opprette-ny-applikasjon" header="Opprette ny applikasjon" %}}

Applikasjoner opprettes fra [Altinn Studio Dashboard](/nb/app/getting-started/navigation/dashboard/).

### Krav fra kommunen

Applikasjonen må ha et beskrivende navn (ID) som gjør det enkelt å finne den igjen blant det store antallet
applikasjoner Sogndal kommune har i Altinn Studio.

{{% notice info %}}
Dersom du skal teste appen i et [testmiljø](/nb/app/testing/deploy/) (beskrevet i [Modul 3](/nb/app/app-dev-course/modul3/)) må du velge en organisasjon som eier.
 Du må ha [tilgang til organisasjonen](/nb/app/getting-started/create-user/#bli-del-av-en-organisasjon) og organisasjonen må ha tilgang til et testmiljø.
 {{% /notice %}}

### Oppgaver

1. [Opprett applikasjon i Altinn Studio](/nb/app/getting-started/create-app/)

### Nyttig dokumentasjon

- [Navigere Altinn Studio](/nb/app/getting-started/navigation)
- [Altinn Studio Dashboard](/nb/app/getting-started/navigation/dashboard/)

{{% /expandlarge %}}

{{% expandlarge id="legge-til-datamodell" header="Legge til datamodell" %}}

Datamodellen definerer hvilke data som kan sendes inn via en app og hvilket format det skal sendes på.

Med Altinn Studios [verktøy for datamodellering](/nb/app/development/data/data-modeling/)
 kan du legge til en datamodell ved å [laste opp en _xsd_-fil](/nb/app/development/data/data-modeling/#laste-opp-og-vise-datamodell)
  eller [lage en ny datamodell](/nb/app/development/data/data-modeling/#lage-ny-datamodell) fra bunnen av.
 Du kan også ta utgangspunkt i en eksisterende datamodell og redigere den i et tekstredigeringsprogram eller [direkte i Altinn Studio](/nb/app/development/data/data-modeling/#redigere-datamodell).
  I denne oppgaven skal du kun laste opp en ferdig datamodell.

### Krav fra kommunen

Sogndal kommune har opprettet en [datamodell](datamodel.xsd)
som representerer type data de ønsker å samle inn fra fremtidige innbyggere.

### Oppgaver

1. [Last ned xsd-filen](datamodel.xsd). Hvis filen åpnes i nettleseren kan du opprette en ny tekstfil og kopiere over innholdet. Lagre filen som `datamodel.xsd`.
 Alternativt kan du kopiere URLen til filen og kjøre kommandoen `curl <fil-URL> > datamodel.xsd` fra kommandolinjen. Åpne filen i et tekstredigeringsprogram
   og ta en nærmere titt på innholdet.
2. [Last opp datamodellen i Altinn Studio](/nb/app/development/data/data-modeling/#laste-opp-og-vise-datamodell)
3. Klikk "Last opp dine endringer" og følg instruksjonene for å lagre endringene.
4. Åpne repository til appen fra [Altinn Studio Dashboard](/nb/app/getting-started/navigation/dashboard/) og ta en nærmere titt på filene i mappen `App/models`.

### Forståelsessjekk

- Hvilken data er det tjenesteeier ønsker å samle inn her?
- Hvilken effekt har **\<minOccurs\>** i datamodellen? Du vil se at feltet har ulik verdi for _Innflytter.Fornavn_ og _Innflytter.Mellomnavn_.
- Hvilke andre egenskaper er satt på feltet _Innflytter.Mellomnavn_?
- Det er blitt generert en _.C#_, _.metadata.json_ og _.schema.json_ fil i tillegg til _.xsd_ filen som du lastet opp. Hva er sammenhengen mellom disse filene?
- Enkelte restriksjoner fra datamodellen overføres ikke til _C#_-filen, hvilke? Det er og lagt til nye egenskaper, hvilke?

{{% notice info %}}
Hvis du skal gjøre hele eller deler av utviklingen lokalt kan du [klargjøre for lokal utvikling og testing](/nb/app/getting-started/local-dev) etter at du har opprettet applikasjonen og lagt til datamodell.
{{% /notice %}}

### Nyttig dokumentasjon

- [Altinn Studio Datamodellering](/app/development/data/data-modeling/)
- [Beskrivelse av indikatorer i XSD](https://www.w3schools.com/xml/schema_complex_indicators.asp)
- [Installere curl for Windows](https://developer.zendesk.com/documentation/api-basics/getting-started/installing-and-using-curl/#windows)
- [Altinn Studio Repository](/nb/app/getting-started/navigation/repos/)
  
{{% /expandlarge %}}

{{% expandlarge id="redigere-tekster" header="Opprette og redigere tekster" %}}
[Tekster i Altinn Studio](/nb/app/development/ux/texts/) lagres i en egne språkfiler (også kalt tekstressurser) og kan knyttes til skjema-komponenter via en tekstnøkkel.
Tekstene kan [opprettes og redigeres i Altinn Studio Designer](/nb/app/development/ux/texts/#altinn-studio-designer) eller [direkte i filen](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-repository).

{{% notice warning %}}
**MERK**: Visningsnavn for applikasjonen må endres både i `App/config/applicationMetadata.json` og i språkfilene.
{{% /notice %}}

### Krav fra kommunen
For at tjenesten skal være brukervennlig og mulig å benytte for de som sitter med synshemninger er det viktig at alle komponenter har gode og beskrivende
overskrifter (labels).

### Oppgaver

1. [Opprett tekstressurser](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app) for komponentene til det første skjemaet. Tekstene skal beskrive hva som beskriver hva som skal fylles inn og vil vises over feltene. Ta en titt på neste oppgave for å se hvilke komponenter du trenger tekst til.
2. [Endre visningsnavn for applikasjonen](/nb/app/development/ux/texts/#endre-applikasjonstittel). Det er viktig at applikasjonens visningsnavn klinger godt og er beskrivende for tjenesten.
3. [Legg til oversettelse(r) for tekstene](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app). Applikasjonen må være tilgjengelig både på bokmål, nynorsk og engelsk. I en første versjon er det tilstrekkelig at kun ett av disse språkene støttes.

Husk å laste opp endringer når du jobber i Designer så de reflekteres i repoet.
I neste steg skal du opprette komponenter og knytte tekstene du har opprettet til disse.

### Nyttig dokumentasjon

- [Tekster i Altinn Studio](/nb/app/development/ux/texts/)
- [Redigere applikasjonstekster](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app)
- [Formatering av tekster](/nb/app/development/ux/texts/#formatering-av-tekster)
- [ISO 639-1 standard](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

### Forståelsessjekk

I Altinn i dag støtter vi tre skriftspråk: Bokmål, nynorsk og engelsk.

- Hvordan får du inn engelsk språkstøtte i applikasjonen?
- Hvis vi en dag skal støtte ukrainsk, hvilken språkkode vil du da måtte annotere filen med?

{{% /expandlarge %}}

{{% expandlarge id="legge-til-komponenter" header="Legge til komponenter" %}}

Komponentene i en applikasjon kan settes opp ved hjelp av "drag and drop" i [Altinn Studio Designer](/nb/app/getting-started/ui-editor/)
eller manuelt i filen `<pageName>.json` som beskriver strukturen til en skjemaside (du finner filen i `App/ui/layouts`).

### Krav fra kommunen

Første skjemaside innhenter personlig informasjon om tilflytteren og skal ha følgende komponenter:
- Navn
  - Fornavn
  - Mellomnavn (valgfritt)
  - Etternavn
- Alder
- Adresse
  - Gateadresse
  - Postnummer
  - Poststed
- Kontaktinformasjon
  - Epost
  - Telefon

Feltene skal være obligatoriske med mindre noe annet er indikert.

### Oppgaver

1. Sett opp den første skjemasiden med komponenter basert på kravene fra kommunen.
2. Koble tekst til hver av komponentene.

Husk å laste opp endringer når du jobber i Designer så de reflekteres i repoet.

### Nyttig dokumentasjon

- [Hvordan bygge et skjema med UI editor i Altinn Studio](/nb/app/getting-started/ui-editor/)
- [Tilgjengelige komponenter i Altinn Studio](/altinn-studio/designer/build-app/ui-designer/components/)
- [Retningslinjer for bruk av komponenter](/nb/app/guides/design/guidelines/components/)

### Forståelsessjekk

I applikasjonsrepoet ditt finner du `<pageName>.json` i mappen `App/ui/layouts`. JSON-filen beskriver skjemasiden du har satt opp i Altinn Studio
gitt at du har lastet opp endringene.

- Finner du igjen komponenten som er koblet til e-post-feltet?
- Hvilken endring kreves i denne filen dersom e-post-feltet ikke lenger skal være påkrevd?
- Ved å endre én linje i `<pageName>.json` er det mulig å endre komponenten knyttet til mellomnavn
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

[Neste modul >>](../modul2/)
