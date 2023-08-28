---
title: Modul 1
description: Opprette app og lage enkelt skjema
linktitle: Modul 1
tags: [apps, training, datamodel, texts]
weight: 20
---

I denne modulen skal du opprette selve applikasjonen, legge til datamodell og sette opp et enkelt skjema basert på kravene fra Sogndal kommune.

Du må utføre de to første oppgavene, opprette applikasjon og legge til datamodell, i Altinn Studios grafiske brukergrensesnitt, [Altinn Studio Designer](/nb/app/getting-started/ui-editor) (Designer).
 Dersom du skal utvikle appen lokalt kan du følge instruksjonene for [klargjøre for lokal utvikling og testing](/nb/app/getting-started/local-dev) etter at du har gjort disse oppgavene.

{{% notice info %}}
**MERK**  
Du kan utføre alle stegene i denne modulen i Designer.
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

Datamodellen definerer type of format for data som kan sendes inn via en app.

Med Altinn Studios [verktøy for datamodellering](/nb/app/development/data/data-modeling/)
 kan du legge til en datamodell ved å [laste opp en _xsd_-fil](/nb/app/development/data/data-modeling/#laste-opp-og-vise-datamodell)
  eller [lage en ny datamodell](/nb/app/development/data/data-modeling/#lage-ny-datamodell) fra bunnen av.
 Du kan også ta utgangspunkt i en eksisterende datamodell og redigere den i et tekstredigeringsprogram eller [direkte i Altinn Studio](/nb/app/development/data/data-modeling/#redigere-datamodell).
  I denne oppgaven skal du kun laste opp en ferdig datamodell.

### Krav fra kommunen

Sogndal kommune har opprettet en [datamodell](datamodel.xsd) som representerer type data de ønsker å samle inn fra fremtidige innbyggere.

### Oppgaver

1. [Last ned xsd-filen](datamodel.xsd). Hvis filen åpnes i nettleseren kan du opprette en ny tekstfil og kopiere over innholdet. Lagre filen som `datamodel.xsd`.
 Alternativt kan du kopiere URLen til filen og kjøre kommandoen `curl <fil-URL> > datamodel.xsd` fra kommandolinjen. Åpne filen i et tekstredigeringsprogram
   og ta en nærmere titt på innholdet.
2. [Last opp datamodellen i Altinn Studio](/nb/app/development/data/data-modeling/#laste-opp-og-vise-datamodell)
3. Klikk "Last opp dine endringer" og følg instruksjonene for å lagre endringene.
4. Åpne repository til appen fra [Altinn Studio Dashboard](/nb/app/getting-started/navigation/dashboard/) og ta en nærmere titt på filene i mappen `App/models`.

{{% notice info %}}
Hvis du skal gjøre hele eller deler av utviklingen lokalt kan du nå [klargjøre for lokal utvikling og testing](/nb/app/getting-started/local-dev).
{{% /notice %}}

### Nyttig dokumentasjon

- [Altinn Studio Datamodellering](/app/development/data/data-modeling/)
- [Beskrivelse av indikatorer i XSD](https://www.w3schools.com/xml/schema_complex_indicators.asp)
- [Installere curl for Windows](https://developer.zendesk.com/documentation/api-basics/getting-started/installing-and-using-curl/#windows)
- [Altinn Studio Repository](/nb/app/getting-started/navigation/repos/)

### Forståelsessjekk

{{% expandbold "Hvilken data er det tjenesteeier ønsker å samle inn her?" %}}
<br>

Datamodellen består av ett hovedelement: innflytter.
Dette elementet består igjen av en del underobjekter som _Fornavn_, _Etternavn_, og _Mellomnavn_. I tillegg er det noen sammensatte elementer som _Adresse_, _Kontaktinformasjon_ og _Arbeidsinformasjon_.
{{% /expandbold %}}

<br>

{{% expandbold "Hvilken effekt har `minOccurs` i datamodellen? Du vil se at feltet har ulik verdi for `Innflytter.Fornavn` og `Innflytter.Mellomnavn`." %}}
<br>

`minOccurs` sier noe om hvor mange ganger objektet minst må være nevnt.

``minOccurs=0`` vil si at feltet ikke er påkrevd.
``minOccurs=1`` vil si at man forventer at det dukker opp minumum én gang i modellen.

{{% /expandbold %}}

<br>

{{% expandbold "Hvilke andre egenskaper er satt på feltet `Innflytter.Mellomnavn`?" %}}
<br>

`nillable=true` er definert på mellomnavn-feltet. Det vil si at det er tillatt med en nullverdi på mellomnavn.
{{% /expandbold %}}

<br>

{{% expandbold "Ved opplasting av datamodellen (`.xsd`-filen) ble følgende modellfiler generert `.C#`-, `.metadata.json` og `.schema.json`. Hva er sammenhengen mellom disse filene og `.xsd`-filen?" %}}
<br>

De nevnte filene er alle generert ut ifra xsd-beskrivelsen av datamodellen. De beskriver all dataen og datafeltenes egenskaper. Alle egenskaper er ikke nødvendigvis overført i alle filene, men summen av dem skal opprettholde det som er beskrevet i xsd-filen.

- C#-modellen benyttes av app backend til å deserialisere data og gjøre den tilgjengelig for prosessering og validering.
- `.metadata.json` benyttes i Altinn Studio for å enkelt kunne koble komponenter og dynamikk til datafeltene.
- `.schema.json`-filen benyttes av altinn-app-frontend for skjemavalidering på klientsiden.
{{% /expandbold %}}

<br>

{{% expandbold "Enkelte restriksjoner fra datamodellen overføres ikke til `C#`-filen, hvilke? Det er og lagt til nye egenskaper, hvilke?" %}}
<br>

- `minOccurs`, `maxOccurs` er ikke overført til modellen.
- `nillable` er kun overført på enkelte typer som f.eks. _decimal_.
- `XmlElement.Order` er innført som en dekorasjon på hver egenskap.
  - Dette sørger for at rekkefølgen på elementene alltid vil bli den samme når dataen serialiseres til xml.
{{% /expandbold %}}

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

{{% expandbold "Hvordan kan du manuelt legge inn engelsk språkstøtte i applikasjonen?" %}}
<br>

For å manuelt legge til støtte for engelsk i en applikasjon må du opprette filen `resources.en.json` i mappen `App/config/texts`:

```json
// Fil: App/config/texts/resources.en.json

{
  "language": "en",
  "resources": []
}
```

  Merk at `language`-egenskapen øverst i filen må settes til `en`.
{{% /expandbold %}}

<br>

{{% expandbold "Hvis vi en dag skal støtte ukrainsk, hvilken språkkode vil du da måtte annotere filen med?" %}}
<br>

Ifølge [listen over ISO 639-1 koder](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) så er koden for ukrainsk `uk`.
{{% /expandbold %}}

{{% expandbold "Hvis en tekstnøkkel refert til i `<page>.json` ikke finnes i tekstressursene, hva vil vises da?" %}}
<br>

Hvis nevnte tekstnøkkel ikke finnes i tekstressursfilen, vil tekstnøkkelen vises i stedet.
{{% /expandbold %}}

{{% /expandlarge %}}

{{% expandlarge id="legge-til-komponenter" header="Legge til komponenter" %}}

Du kan konfigurere komponentene i en applikasjon i det grafiske brukergrensesnittet [Altinn Studio Designer](/nb/app/getting-started/ui-editor/).
 Alternativt kan du gjøre det manuelt ved å redigere filen `<page>.json` som beskriver strukturen til en skjemaside. Du finner filen i `App/ui/layouts`.

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

I applikasjonsrepoet ditt finner du `<page>.json` i mappen `App/ui/layouts`. JSON-filen beskriver skjemasiden du har satt opp i Altinn Studio
gitt at du har lastet opp endringene (`<page>` erstattes av navnet til siden, for eksempel `data.json`).

{{% expandbold "Finner du igjen komponenten som er koblet til epost-feltet?" %}}
<br>

For å finne komponenten som er koblet til epost-feltet kan du søke etter 'epost'.
Navnet på feltet som komponenten er koblet til finner du under `dataModelBindings` (markert).

```json{linenos=false,hl_lines="9"}
// File: App/ui/layouts/<page>.json

{
  ...
  
  "id": "epost",
  "type": "Input",
  "dataModelBindings": {
    "simpleBinding": "Innflytter.Kontaktinformasjon.Epost"
  },
  "required": true,
  "readOnly": false,
  "textResourceBindings": {
    "title": "innflytter.epost"
  }
}
```

{{% /expandbold %}}

<br>

{{% expandbold "Hvilken endring kreves i `<page>.json` dersom e-post-feltet ikke lenger skal være påkrevd?" %}}
<br>

For å gjøre et felt valgfritt, kan man endre `required: true` til `required: false`.
{{% /expandbold %}}

<br>

{{% expandbold "Ved å endre én linje i `<page>.json` er det mulig å endre komponenten knyttet til mellomnavn til et inndatafelt for et langt svar. Hvilken endring kreves?" %}}
<br>

Løsningen er å endre `type`-feltet fra `Input` til `TextArea` (markert).

```json{linenos=false,hl_lines="5"}
// File: App/ui/layouts/<page>.json

{
  "id": "mellomnavn",
  "type": "TextArea",
  "textResourceBindings": {
    "title": "innflytter.mellomnavn"
  },
  "dataModelBindings": {
    "simpleBinding": "Innflytter.Mellomnavn"
  },
  "required": true,
  "readOnly": false
}
```
{{% /expandbold %}}
{{% /expandlarge %}}

## Oppsummering

I denne modulen har du opprettet en applikasjon i Altinn Studio,
lagt til en datamodell og satt opp en skjemaside som kobler komponenter til noen av feltene i datamodellen.

Dersom du har klargjort for lokal utvikling har du i tillegg klonet applikasjonen for å kunne videreutvikle den i ditt lokale utvilkingsmiljø.
Applikasjonen skal kunne kjøres på din lokale maskin med LocalTest og du skal kunne fylle inn feltene.

<br>

{{% expandlarge id="solution" header="Løsningsforslag" %}}

[Kildekode Modul 1](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul1)<br>
[(Kildekode Modul 1 - tidligere versjon)](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/1)<br>

{{% notice info %}}
Løsningsforslag kommer
{{% /notice %}}

{{% /expandlarge %}}

<br><br>

{{% center %}}
[Neste modul >>](../modul2/)
{{% /center %}}
