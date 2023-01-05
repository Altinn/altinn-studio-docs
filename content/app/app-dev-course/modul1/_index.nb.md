---
title: Modul 1
description: Opprette app i Studio, sette opp lokalt utviklingsmiljø og lokal test
linktitle: Modul 1
tags: [apps, training, datamodel, localtest, texts]
weight: 20
---

I denne modulen skal du basert på kravene fra Sogndal kommune
sette opp førstesiden til applikasjonen for tilflyttere og verifisere at ting ser ut som forventet lokalt.

**Temaer som dekkes i denne modulen:**

- Opprette ny applikasjon
- Legge til datamodell og knytte felter
- Utvikle en app i lokalt utviklingsmiljø
- Redigering av tekstressurser
- Teste applikasjon i lokalt utviklingsmiljø (LocalTest)

## Oppgaver

{{% expandlarge id="opprette-ny-applikasjon" header="Opprette ny applikasjon" %}}

Opprett applikasjonen i Altinn Studio med organisasjonen du har tilgang til som eier.
Alternativt kan du opprette applikasjonen med deg selv som eier dersom du ikke skal teste den i et testmiljø.

### Krav fra kommunen

- Applikasjonen må ha et fornuftig navn som gjør det enkelt å finne den igjen blant det store antallet
repositories Sogndal kommune har i Altinn Studio.

- Det er ingen foreløpige planer om årlige revisjoner av appen,
så man trenger ikke ta hensyn til årstall i navnet.

Det er et ønske om at et eller flere av ordene  "tilflytter" og  "Sogndal" er med i navnet.

### Nyttig dokumentasjon
- [Opprette app i Altinn Studio](/nb/app/getting-started/create-app/)

{{% /expandlarge %}}


{{% expandlarge id="late-opp-datamodel" header="Laste opp datamodell" %}}
Sogndal kommune har opprettet [en datamodell](datamodel.xsd)
som representerer data de ønsker å samle inn fra fremtidige innbyggere.

{{% notice info %}}
Som applikasjonsutvikler vil man i noen tilfeller måtte opprette datamodell
for en tjeneste selv. Da vil man kunne benytte seg av datamodelleringsverktøyet i
Altinn Studio (lanseres våren 2022), eller ta utgangspunkt i en eksisterende datamodell og
redigere den i f.eks. Visual Studio eller et selvvalgt tekstredigeringsprogram.
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
- [Tilgjengelige komponenter i Altinn Studio](/technology/solutions/altinn-studio/designer/build-app/ui-designer/components/)
- [Retningslinjer for bruk av komponenter](/nb/app/design/guidelines/components/)

### Forståelsessjekk

I applikasjonsrepoet ditt finner du _FormLayout.json_ i mappen `App/ui/layouts`. JSON-filen beskriver skjemasiden du har satt opp i Altinn Studio,
gitt at du har pushet endringene dine til master.

- Finner du igjen komponenten som er koblet til e-post-feltet?
- Hvilken endring kreves i denne filen dersom e-post-feltet ikke lenger skal være påkrevd?
- Ved å endre én linje i _FormLayout.json_ er det mulig å endre komponenten knyttet til mellomnavn
  til et inndatafelt for et langt svar. Hvilken endring kreves?
{{% /expandlarge %}}


{{% expandlarge id="laste-ned-app-lokalt" header="Laste ned applikasjonen lokalt" %}}

Enkelte applikasjonsfunksjoner er det ikke støtte for å utvikle i Altinn Studio.
Disse må utvikles i et lokalt utviklingsmiljø.

Selve utviklingen kan gjøres i ditt foretrukne utviklerverktøy,
men trenger du en anbefaling, er [Visual Studio Code](https://code.visualstudio.com/Download) et godt alternativ.


### Nyttig dokumentasjon
- [Hvordan klone applikasjon til lokalt utviklingsmiljø](/nb/app/getting-started/local-dev/#hvordan-klone-applikasjonen-til-et-lokalt-utviklingsmiljø)
- [Hvordan synkronisere endringer i lokalt utviklingsmiljø](/nb/app/getting-started/local-dev/#hvordan-synkronisere-endringer-i-lokalt-utviklingsmiljø)
{{% /expandlarge %}}


{{% expandlarge id="kjore-i-localtest" header="Kjøre appen i localtest" %}}

Ved hjelp av en mock som kan spinnes opp lokalt av Altinn Plattform
er det mulig å gjøre enkel testing og verifikasjon av applikasjonen i det lokale utviklingsmiljøet.

I denne oppgaven skal du få kjørt opp applikasjonen lokalt med støtte fra LocalTest.
Når du har fått appen opp og kjøre og logget inn med en testbruker, bør du ha et resultat som likner dette:

!["Applikasjonen kjørende lokalt"](/app/app-dev-course/modul1/app-running-locally.jpeg "Et bilde av applikasjonen kjørende lokalt")

{{% notice info %}}
Videre vil du ønske å teste endringene dine fortløpende i localtest.
- Ved endringer knyttet til formLayout og andre _json_-filer holder det med en refresh (F5) i nettleser.
- Ved endringer i forhåndsutfylling vil man måtte instansiere applikasjonen på nytt.
- Ved endringer i _cs_-filer må applikasjonen stoppes og startes på nytt.
  Alternativt kan du benytte deg av `dotnet run watch` når du starter applikasjonen for hot reload.

{{% /notice %}}


### Nyttig dokumentasjon
- [Hvordan sette opp LocalTest](https://github.com/Altinn/altinn-studio/blob/master/docs/LOCALAPP.md)
- [Debugging av applikasjon](/nb/app/testing/local/debug/)
- [Tilgjengelig testbrukere i LocalTest](/nb/app/testing/local/testusers/)
{{% /expandlarge %}}


## Oppsummering

I denne modulen har du opprettet en applikasjon i Altinn Studio,
lastet opp en datamodell og satt opp en skjemaside som kobler komponenter til noen av feltene i datamodellen.
Videre har du klonet repoet lokalt for å kunne videre applikasjonen i ditt lokale utvilkingsmiljø.

Tjenesten skal kunne kjøres opp på din lokale maskin med local test og du skal kunne fylle inn feltene.

**Husk å _pushe_ de lokale endringene dine, så de blir tilgjengelige i Altinn Studio når du er fornøyd.**

### Løsningsforslag
Dersom du ikke har fått til alle stegene, har vi et [løsningsforslag](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/1) som du kan hente inspirasjon fra.

![Skjermbilde av datainnsamlingsside](/app/app-dev-course/modul1/data-screenshot.png "Skjermbilde av datainnsamlingsside")
