---
title: Texts
description: How to edit and format texts, use variables and add help texts.
toc: true
weight: 40
tags: [translate-to-english]
---


Tekster lagres i ressursfiler i katalogen `App/config/texts`. Tekster kan være fra felles biblioteker, datamodellen eller manuelt lagt inn av utvikler.

Tekstressursene er tilgjengelig når man redigerer UI komponenter i skjemaet via Altinn Studio, og de vises til sluttbruker når skjemaet lastes inn i nettleser.

Tekster lagres i JSON-format og det er én fil pr språk. Format på filnavn for tekster er `resource.[språk].json` f.eks: _resource.nb.json_.

## Formatering av tekster

Alle tekster kan formateres med markdown. Nedenfor er de mest benyttede formateringene beskrevet.

Mer omfattende dokumentasjon og tips til hvordan markdown kan benyttes finnes her:
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

### Uthevede tekster

Det er ekstremt enkelt å gjøre ord eller setninger fet eller kursiv i markdown.

```markdown
Dette er en _kursiv tekst_ laget med understrek.
Dette er også en *kurvis tekst* laget med stjerne.
```

```markdown
Dette er __fet tekst__ laget med understrek.
Dette er også **fet tekst**, men laget med stjerner!
```

### Lenker

```markdown
Trykk [her](https://altinn.no) for å komme til Altinn.
```

### Overskrifter

```markdown
# Dette er en stor heading (H1)
## Dette er en litt mindre heading (H2)
### Og enda litt mindre (H3)
#### Bitteliten heading (H4)
```

## Legge til og endre tekster i en app

Man har to alternativer når man skal endre tekster i en app, enten gjøres det via Altinn Studio eller direkte i repository.

### Tekst editor i Altinn Studio Designer

I den øverste navigerings menyen i Altinn Studio, velg _Språk_ for å kunne redigere tekster. En oversikt over tekstene som allerede er tilgjengelig for applikasjonen listes opp.

På denne siden kan man redigere eksisterende tekster samt legge til nye teksressurser. Nye tekster legges til ved å trykke på _Ny tekst_, og fylle ut tekst og en unik nøkkel.

Lagre endringer i tekstene ved å trykke på _Lagre tekster_.

![Altinn Studio Designer](edit-texts-in-designer.png "Endre tekster i Altinn Studio Designer")

### Legge til og endre tekster i repository

Dersom det er mange tekster som skal endres på en gang kan det være praktisk å redigere tekstene
i JSON-struturen direkte i repoet. Enten via Altinn Studio Repos eller i en lokal klone i selvvalgt kodeeditor.

Tekstene ligger lagret i `App/config/texts`

![Altinn Studio Repos](edit-texts-in-repos.png "Endre tekster i Altinn Studio Repos")

## Variabler i tekster

Variabler i tekster kan inkluderes ved å følge oppsettet nedenfor. Det er viktig at rekkefølgen på variablene er den samme som parameterne i teksten.

```json
{
  "id": "good.text.id",
  "value": "Hello, {0}! Here is a second variable {1}.",
  "variables": [
    {
      "key": "<datamodelField>",
      "dataSource": "dataModel.<dataModelName>"
    },
    {
      "key": "<settings key>",
      "dataSource": "applicationSettings"
    },
    {
      "key": "<instance value key>",
      "dataSource": "instanceContext"
    }
  ]
}
```
### Datakilder

Det er per nå mulig å hente verdier fra 3 ulike datakilder. 

1. Datamodel   
   Ved å angi `dataModel.<dataModelNavn>` som datakilde kan man hente ut verdier fra felter i skjema som brukeren fyller ut. Data kan hentes fra felter uavhengig av om de er synlige eller ikke. Hvis bruker endrer på data i et felt referert i en variabel så vil teksten bli oppdatert når bruker forlater feltet. 
2. Instillinger   
   Ved å angi `applicationSettings` som datakilde kan man hente ut verdier fra en spesiell seksjon i `appsettings.{miljø}.json` filen(e) med navn `FrontEndSettings`. Dette er en dynamisk liste man kan utvide uten å måtte gjøre endringer i kode. Dette gjør det mulig å ha ulike verdier fra miljø til miljø ved å ha andre verdier i de ulike `appsettings.{miljø}.json` filene. Vær obs på ulik bruk av stor bokstav i starten av nøkkel mellom `FrontEndSettings` og `applicationSettings`.
   ```json
   "FrontEndSettings": {
     "HomeBaseUrl": "https://www.testdirektoratet.no"
   },
   ```
3. Instans   
   Denne datakilden er basert på Instance og vil inneholde nøkkelverdier fra den aktive instansen. Vi har altså ikke gikk tilgang til hele instanse objektet. Listen med egenskaper så langt er:
   1. `instanceOwnerPartyId` inneholder avgiver sin party id.
   2. `instanceId` inneholder id'en til den aktive instansen. 
   3. `appId` inneholder id'en til appen instansen er knyttet til.

### Komplett eksempel:

```json

{
  "id": "common.submitinfo",
  "value": "Du leverer nå skjema for: {0} med organisasjonsnummer: {1}. Organisasjonens party id er {2}. [Link til oss]({3}).",
  "variables": [
    {
      "key": "skattepliktig.organisasjonsnavn",
      "dataSource": "dataModel.default"
    },
    {
      "key": "skattepliktig.organisasjonsnummer",
        "dataSource": "dataModel.default"
    },
    {
      "key": "instanceOwnerPartyId",
        "dataSource": "instanceContext"
    },
    {
      "key": "homeBaseUrl",
        "dataSource": "applicationSettings"
    }
  ]
}
```

### Variabler i tekst - repeterende grupper
For at variabler i tekst skal fungere med data som ligger i repeterende grupper, må oppsettet vist over endres litt for de aktuelle feltene,
for å spesifisere den repeterende gruppen dataene ligger i. 

Dette gjøres ved å legge til `[{0}]` _etter_ den repeterende gruppen når man spesifiserer felt i datamodellen i `key`-parameteren.
F.eks.:
```json {hl_lines=[6,10]}
{
  "id": "common.submitinfo",
  "value": "Du leverer nå skjema for: {0} med organisasjonsnummer: {1}.",
  "variables": [
      {
        "key": "skattepliktig[{0}].organisasjonsnavn",
        "dataSource": "dataModel.default"
      },
      {
        "key": "skattepliktig[{0}].organisasjonsnummer",
        "dataSource": "dataModel.default"
      }
  ]
}
```

Det er fullt mulig å kombinere variabler fra felter i repeterende gruppe med variabler fra felter _ikke_ i repeterende gruppe. Det anbefales derimot ikke å kombinere variabler fra felter fra _forskjellige_ repeterende grupper, med mindre man er helt sikker på at rekkefølgen på innslag i gruppene vil bli helt like. 

## Legge til hjelpetekst

Hjelpetekster er små tekstsnutter som gir en kort og konsis beskrivelse av hva sluttbrukeren
er forventet å fylle ut i feltet som teksten er tilknyttet.

Språknøklene som peker på hjelpeteksten er definert i `FormLayout.json`.
I app repoet finner du filen under `App/ui/`.

Nedenfor ser du et eksempel på en _FormLayout.json_ uten hjelpetekster.

```json
{
  "data": {
    "layout": [
      {
        "id": "616071dc-90b1-4ce5-8d18-492844828a41",
        "type": "Header",
        "componentType": 0,
        "textResourceBindings": {
          "title": "appName"
        },
        "dataModelBindings": {}
      },
      {
        "id": "08d707a9-2475-4d23-bf76-f209fb434ec2",
        "type": "TextArea",
        "componentType": 7,
        "textResourceBindings": {
          "title": "tilleggsopplysninger.label",
          "description": "tilleggsopplysninger.desc",
        },
        "dataModelBindings": {
          "simpleBinding": "omsetningsoppgaverTilleggsopplysninger.value"
        }
      },
      {
        "id": "bd6589b6-e2ab-49ba-b39a-dd3f8b63e5de",
        "type": "Button",
        "componentType": 9,
        "textResourceBindings": {
          "title": "Send inn"
        },
        "dataModelBindings": {},
        "textResourceId": "Standard.Button.Button",
        "customType": "Standard"
      }
    ]
  }
}
```

Dersom du skulle ønske å legge til hjelpetekst på en av disse skjemakomponentene må du

1. Legge til hjelpeteksten i tekstressursfilen som beskrevet [her](#legge-til-og-endre-tekster-i-en-app).
2. Åpne  `FormLayout.json`-filen.
3. Legg til en binding til den nye hjelpeteksten med nøkkel `"help"` og verdi lik nøkkel til tekstressursen.

Slik ser hele filen ut etter å ha lagt til en hjelpetekst:

```json {linenos=false,hl_lines=[20]}
{
  "data": {
    "layout": [
      {
        "id": "616071dc-90b1-4ce5-8d18-492844828a41",
        "type": "Header",
        "componentType": 0,
        "textResourceBindings": {
          "title": "appName"
        },
        "dataModelBindings": {}
      },
      {
        "id": "08d707a9-2475-4d23-bf76-f209fb434ec2",
        "type": "TextArea",
        "componentType": 7,
        "textResourceBindings": {
          "title": "tilleggsopplysninger.label",
          "description": "tilleggsopplysninger.desc",
          "help": "tilleggsopplysninger.help"
        },
        "dataModelBindings": {
          "simpleBinding": "omsetningsoppgaverTilleggsopplysninger.value"
        }
      },
      {
        "id": "bd6589b6-e2ab-49ba-b39a-dd3f8b63e5de",
        "type": "Button",
        "componentType": 9,
        "textResourceBindings": {
          "title": "Send inn"
        },
        "dataModelBindings": {},
        "textResourceId": "Standard.Button.Button",
        "customType": "Standard"
      }
    ]
  }
}
```

## Endre applikasjonstittel

Når man oppretter en applikasjon vil man ha en tekstressurs med label `appName`. 
Dette er tittelen på applikasjonen som vil gjenspeiles flere steder i løsningen vår.
Blant annet når en sluttbruker fyller ut skjema, og når elementer skal vises i meldingsboksen på altinn.no.

Tittelen på applikasjonen skal ligge to steder i applikasjonsrepoet: 
 1. I tekstressurser med nøkkelen `appName`. 
 Tjenesteeiere oppfordres til å legge inn tittel på bokmål, nynorsk og engelsk. Dersom tittel mangler i tekstressursene vil lagringsnavnet (navnet på repoet) vises til sluttbrukeren.

 2. I `applicationmetadata.json` under property `title`. Denne filen ligger under `App/config/`.


Dersom man gjør endrer `appName` på applikasjonen sin lokalt er det viktig at også legge til den oppdatere tittelen i 
`applicationmetadata.json` også. Dersom tittel på applikasjonen endres i Altinn Studio enten på "Om" eller "Språk"-siden bli applicationmetadata.json oppdatert automatisk.

### Eksempel på korrekt konfigurasjon for applikasjonstittel 

I `App/config/applicationmetadata.json`:

```json
"title": {
    "nb": "Automatisk deploy applikasjonen",
    "nn": "Automatisk deploy applikasjonen",
    "en": "Auto deploy application"
  },
```

I `App/config/texts/resource.nb.json`:

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "appName",
      "value": "Automatisk deploy applikasjonen"
    },
    .
    .
    .
  ]
}
```

I `App/config/texts/resource.nn.json`:

```json
{
  "language": "nn",
  "resources": [
    {
      "id": "appName",
      "value": "Automatisk deploy applikasjonen"
    },
    .
    .
    .
    ]
}
```

I `App/config/texts/resource.en.json`:

```json
{
  "language": "en",
  "resources": [
    {
      "id": "appName",
      "value": "Auto deploy application"
    },
    .
    .
    .
  ]
}
```

## Endre applikasjonseier tekst

I applikasjonen så vises applikasjonsnavn og applikasjonseier-tekstene øverst i skjema.

![Tekster i appen](app-name-app-owner.png "Appnavn og appeier tekster")

Applikasjonsnavn hentes som standard ut fra tekstene som er definert i [altinn-orgs.json](https://github.com/Altinn/altinn-cdn/blob/master/orgs/altinn-orgs.json).
Om det er ønskelig å endre på dette navnet kan det gjøres ved å legge til nøkkelen `appOwner` i tekstressursene. Denne vil da overstyre det som ligger på CDN.

Eksempel:
```json
{
  "language": "en",
  "resources": [
    {
      "id": "appOwner",
      "value": "Test Ministry"
    },
    .
    .
    .
  ]
}
