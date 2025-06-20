---
title: Dynamiske uttrykk
linktitle: Uttrykk
description: Oversikt over dynamiske uttrykk definert i JSON
tags: [dynamics]
toc: true
---

{{% panel theme="warning" %}}
⚠️ Dynamikk er et område under aktiv utvikling. Denne funksjonaliteten er for øyeblikket tilgjengelig som en betaversjon
i Altinn Studio og tilbyr begrensede konfigurasjonsalternativer. Grensesnittet tillater bare å bygge uttrykk med ett
nivå av nøsting, noe som betyr at et ubegrenset antall ikke-nøstede uttrykk kan kombineres ved å bruke enten *ELLER*
eller *OG*-operatoren. Imidlertid tillater verktøyet å redigere mer kompliserte uttrykk ved å skrive fritt. For
øyeblikket er verktøyet også begrenset til å koble uttrykk til boolske komponentfelt.
Les [Uttrykk i Altinn Studio](../../../../altinn-studio/designer/build-app/expressions) om hvordan uttrykk lages i
Altinn Studio.
{{% /panel %}}

## Introduksjon

Dynamikk via uttrykk gjør det mulig å definere enkel dynamisk oppførsel i en Altinn 3 app, som for eksempel ved å
definere om et skjemafelt skal vises eller skjules, om feltet skal være påkrevd eller skrivebeskyttet.

Uttrykkene er tilgjengelige i alle Altinn 3-apper som bruker frontend-versjon
[3.54.0](https://github.com/Altinn/app-frontend-react/releases/tag/v3.54.0) eller nyere. Bruker man denne versjonen
(eller siste hovedversjon) har man mulighet til å benytte dynamiske uttrykk til [flere bruksområder](#bruksområder).

Fra versjon `7.2.0` av [nuget-pakkene](../../../guides/administration/maintainance/dependencies/#nuget) er også uttrykkene støttet i backend.
Det gjør at serveren vil kunne evaluere uttrykkene og fjerne data ved innsending som potensielt er lagret
i [datamodellen](../../data/data-model) og er knyttet til felter/komponenter som i ettertid er skjult.
Merk at dette bare gjelder data i datamodellen som er knyttet til skjulte komponenter - data i datamodellen som ikke
er knyttet til komponenter (og dermed implisitt skjult for brukeren) vil ikke fjernes automatisk.

Det gjør det også mulig å unnlate å sende inn data som ellers er tilknyttet påkrevde felter - dersom disse påkrevde
feltene er skjult i skjemaet ved hjelp av dynamiske uttrykk. Dette gjelder også ved innsending direkte fra API.

**NB:** Automatisk fjerning av skjult data må foreløpig aktiveres manuelt (_opt-in_) ved at man legger til følgende
linje i `App/appsettings.json` etter at man har oppgradert [nuget-pakkene](../../../guides/administration/maintainance/dependencies#nuget)
til `7.2.0` eller nyere:

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v8">}}

```json {linenos=false,hl_lines=[5]}
  "AppSettings": {
    "OpenIdWellKnownEndpoint": "http://localhost:5101/authentication/api/v1/openid/",
    "RuntimeCookieName": "AltinnStudioRuntime",
    "RegisterEventsWithEventsComponent": false,
    "RemoveHiddenData": true
  },
```

{{</content-version-container>}}

{{<content-version-container version-label="v7">}}

```json {linenos=false,hl_lines=[5]}
  "AppSettings": {
    "OpenIdWellKnownEndpoint": "http://localhost:5101/authentication/api/v1/openid/",
    "RuntimeCookieName": "AltinnStudioRuntime",
    "RegisterEventsWithEventsComponent": false,
    "RemoveHiddenDataPreview": true
  },
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Oppbygging og syntaks

Uttrykkene er bygget opp som et slags mini-programmeringsspråk, hvor alt er definert i JSON. Selve uttrykkene er alltid
en liste (array) med verdier, hvor den første verdien i hver liste alltid er et [funksjonsnavn](#funksjoner). Resten
av verdiene sendes som inndata/argumenter til funksjonen.

```json
["equals", "foo", "bar"]
```

I eksempelet over blir strengene "foo" og "bar" sammenlignet. De er ulike, så resultatet av dette uttrykket blir en
boolsk verdi; false.

Denne funksjonen, [equals](#func-equals), forventer å få inn to [strenger](#strenger) som inndata/argumenter. Det
er også mulig å gi den andre uttrykk. Gjør man dette vil uttrykket bli tolket slik at de innerste funksjonene blir kjørt
først, og de ytterste kjørt sist.

```json
["equals", ["component", "firstName"], "John"]
```

I dette eksempelet blir det innerste uttrykket/funksjonskallet `["component", "firstName"]` kjørt først. Om verdien til
komponenten "firstName" er lik strengen "John", gir funksjonen resultatet den boolske verdien "true".

Dersom man da bruker dette uttrykket for `hidden`-egenskapen til en komponent, vil komponenten bli skjult dersom man
skriver inn "John" i "firstName"-komponenten et annet sted i applikasjonen:

```json
{
  "id": "lastName",
  "type": "Input",
  ...
  "hidden": ["equals", ["component", "firstName"], "John"]
}
```

Det er ingen begrensninger rundt hvor store/dype uttrykkene kan være. Som en øvelse, se om du klarer å lese hva dette
uttrykket gjør, og hvilke mulige verdier det kan returnere:

```json
[
  "if",
  ["greaterThanEq", ["component", "age"], 16],
  [
    "if",
    ["lessThan", ["component", "age"], 62],
    "Please consider applying for our open position!",
    "else",
    ["concat", "At ", ["component", "age"], ", you are eligible for retirement"]
  ],
  "else",
  ["concat", "At ", ["component", "age"], ", you should stay in (pre)school"]
]
```

{{% expandlarge id="answer-expandable" header="Røpealarm: Klikk her for en tolkning av uttrykket over" %}}
Uttrykket sjekker verdien til en tenkt komponent med ID "alder". Dersom personen er 16 år eller mer,
for eksempel 45 år gammel, returneres teksten:

**Please consider applying for our open position!**

For en person som er 62 år returneres teksten:

**At 62, your are eligible for retirement**

Og for en person som er 15 år (eller yngre, som f.eks. en 4-åring), returneres teksten:

**At 4, you should stay in (pre)school**
{{% /expandlarge %}}

### Bruksområder

Dynamiske uttrykk er foreløpig tilgjengelig for bruk i disse egenskapene, som definert i [layout-filer](../../ux/pages).

| Komponenter                                                                                                     | Egenskap                      | Forventet verdi            | Frontend | Backend |
|-----------------------------------------------------------------------------------------------------------------|-------------------------------|----------------------------|----------|---------|
| [Sider/layouts](#viseskjule-hele-sider)                                                                         | `hidden`                      | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Alle                                                                                                            | `hidden`                      | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Skjemakomponenter                                                                                               | `required`                    | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Skjemakomponenter                                                                                               | `readOnly`                    | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating)                                                       | `hiddenRow`                   | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating)                                                       | `edit.addButton`              | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating)                                                       | `edit.saveButton`             | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating)                                                       | `edit.deleteButton`           | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating)                                                       | `edit.alertOnDelete`          | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating)                                                       | `edit.saveAndNextButton`      | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Kodelistebaserte komponenter](../../../guides/development/options/sources/from-data-model/#støtte-for-uttrykk) | `source.label`                | [Streng](#strenger)        | ✅        | ❌       |
| [Kodelistebaserte komponenter](../../../guides/development/options/sources/from-data-model/#støtte-for-uttrykk) | `source.description`          | [Streng](#strenger)        | ✅        | ❌       |
| [Kodelistebaserte komponenter](../../../guides/development/options/sources/from-data-model/#støtte-for-uttrykk) | `source.helpText`             | [Streng](#strenger)        | ✅        | ❌       |
| [Kodelistebaserte komponenter](../../../guides/development/options/sources/dynamic/#basert-på-uttrykk)          | `queryParameters.[*]`         | [Streng](#strenger)        | ✅        | ❌       |
| [Kodelistebaserte komponenter](../../../guides/development/options/functionality/filtering)                     | `optionFilter`                | [Streng](#strenger)        | ✅        | ❌       |
| Alle                                                                                                            | `textResourceBindings.[*]` \* | [Streng](#strenger)        | ✅        | ❌       |

\* = Hvilke verdier man kan overstyre med textResourceBindings varierer fra komponent til komponent, men vil fungere på
alle steder der det brukes. TextResourceBindings for repeterende grupper finner
du [mer informasjon om her](../../ux/fields/grouping/repeating#textresourcebindings)

{{% expandlarge id="rep-group-edit-button-text" header="Eksempel: Styre redigeringsknapp-tekst i repeterende gruppe" %}}

Her endrer vi teksten til redigeringsknappen i en repeterende gruppe basert på om `IsPrefill` er satt til `true` i
en gitt adresse i datamodellen. Dersom `IsPrefill` er `true` for en adresse, vil raden som viser frem den adressen ha en
redigerings-knapp med teksten `"View"`. Hvis `IsPrefill` er `false` blir teksten på knappen til den spesifikke raden
`"Edit"`.

Det er verdt å merke seg at dersom et oppslag på `IsPrefill` gir resultatet `null`(ikke funnet) så konverteres
resultatet til `false` når det blir brukt i en `if`. Les mer detaljert om dette i seksjonene [if](#func-if) og [datatyper](#datatyper)

```json
{
  "id": "repeatingAddressGroup",
  "type": "Group",
  "children": ["field-id-one", "field-id-two"],
  "dataModelBindings": {
    "group": "Citizen.FormerAdresses"
  },
  "maxCount": 10,
  "textResourceBindings": {
    "edit_button_open": [
      "if",
      ["dataModel", "Citizen.FormerAdresses.IsPrefill"],
      "View",
      "else",
      "Edit"
    ]
  }
}
```

{{% /expandlarge %}}

### Testing, feilsøking og utvikling av uttrykk

Når man skal skrive et uttrykk er det greit å vite noenlunde hva resultatet kommer til å bli, og om uttrykket er gyldig.
Ugyldige uttrykk gir en advarsel i JavaScript-konsollet i nettleseren når siden lastes, så det kan være lurt å ha
dette konsollet åpent når man utvikler en applikasjon og tester uttrykkene lokalt.

Det er også mulig å teste ut kjøring av et uttrykk rett i utviklerverktøyene. Det gjøres ved å trykke `Ctrl + Shift + K`
(eller `Cmd + Shift + K` på Mac) og navigere til fanen for uttrykk. Uttrykk vil kunne oppføre seg annerledes alt etter
hvilken komponent de evalueres i nærheten av. Derfor kan man også velge en komponent som skal brukes som kontekst når
uttrykket evalueres i utviklerverktøyene.

{{% expandlarge id="rep-group-expandable" header="Eksempel på ID-er og evaluering i repterende grupper" %}}

**NB:** Her beskrives noen implementasjonsdetaljer i [app-frontend-react](https://github.com/Altinn/app-frontend-react/),
og er kun relevant når du skal prøve et uttrykk i utviklerverktøyene som er avhengig av en kjent posisjon i en
repeterende gruppe. Dette kan endres i fremtiden, og slike endringer vil ikke påvirke uttrykk som man har definert i en
applikasjon. Der hentes konteksten ut fra hvor uttrykket er definert i layout-filen.

Se for deg en [repeterende gruppe](../../ux/fields/grouping/repeating) for personer med to felt; `navn` og `alder`.
Gitt dette uttrykket:

`["component", "alder"]`

Hva vil alderen være? Det vil kunne variere etter hvilken gruppe som evaluerer
uttrykket. Har man har to grupper/rader vil både `navn`- og `alder`-komponentene finnes to ganger hver. Disse vil få
ID-ene `navn-0` og `alder-0` (for den første raden) og `navn-1` og `alder-1` (for den andre raden).

Tenk deg at følgende data er fyllt inn i en repeterende gruppe:

| Navn | Komponent-ID | Alder | Komponent-ID |
| ---- | ------------ | ----- | ------------ |
| Per  | `navn-0`     | 24    | `alder-0`    |
| Kari | `navn-1`     | 36    | `alder-1`    |
| Ola  | `navn-2`     | 18    | `alder-2`    |

Gitt følgende uttrykk:

```json
["component", "alder"]
```

Og med disse forutsetningene:

1. Man har ikke gitt noen kontekst (eventuelt, uttrykket plasseres på en komponent som ikke er i nærheten av
   en `alder`-komponent)
2. Man evaluerer uttrykket i kontekst av `navn-0`
3. Man evaluerer uttrykket i kontekst av `navn-1`

Hva vil resultatet bli i de forskjellige eksemplene? Her er svarene:

1. Denne vil finne "første og beste" `alder`-komponent, og finner dermed `alder-0`. Den returnerer
   derfor _24_, Per sin alder.
2. Her prøver vi å lete i kontekst av `navn`-komponenten på første rad, og igjen finner vi _24_, Per sin alder.
3. siste eksempel har vi spesifisert andre rad i den repeterende gruppen ved å evaluere i kontekst av `navn-1`.
   Her finner vi den nærmeste `alder`-komponenten `alder-1`, som er _36_, Kari sin alder.

{{% /expandlarge %}}

## Funksjoner

Disse funksjonene er tilgjengelige for bruk i uttrykk:

### Sammenligning av verdier

| Funksjonsnavn                                | Parametre                                 | Returverdi                 | Frontend | Backend |
|----------------------------------------------|-------------------------------------------|----------------------------|----------|---------|
| [`compare`](#func-compare)                   | [Se detaljert beskrivelse](#func-compare) | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`equals`](#func-equals)                     | [Streng](#strenger), [Streng](#strenger)  | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`notEquals`](#func-equals)                  | [Streng](#strenger), [Streng](#strenger)  | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`not`](#func-not)                           | [Boolsk](#boolske-verdier)                | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`greaterThan`](#func-gt)                    | [Tall](#tall), [Tall](#tall)              | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`greaterThanEq`](#func-gt)                  | [Tall](#tall), [Tall](#tall)              | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`lessThan`](#func-gt)                       | [Tall](#tall), [Tall](#tall)              | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`lessThanEq`](#func-gt)                     | [Tall](#tall), [Tall](#tall)              | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`concat`](#func-concat)                     | Ingen eller flere [strenger](#strenger)   | [Streng](#strenger)        | ✅        | ✅       |
| [`contains`](#func-contains-not-contains)    | [Streng](#strenger), [Streng](#strenger)  | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`notContains`](#func-contains-not-contains) | [Streng](#strenger), [Streng](#strenger)  | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`commaContains`](#func-commaContains)       | [Streng](#strenger), [Streng](#strenger)  | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`startsWith`](#func-starts-ends-with)       | [Streng](#strenger), [Streng](#strenger)  | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| [`endsWith`](#func-starts-ends-with)         | [Streng](#strenger), [Streng](#strenger)  | [Boolsk](#boolske-verdier) | ✅        | ✅       |


### Logikk

| Funksjonsnavn      | Parametre                                          | Returverdi                           | Frontend | Backend |
|--------------------|----------------------------------------------------|--------------------------------------|----------|---------|
| [`and`](#func-and) | En eller flere [boolske verdier](#boolske-verdier) | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`or`](#func-and)  | En eller flere [boolske verdier](#boolske-verdier) | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`if`](#func-if)   | [Se detaljert beskrivelse](#func-if)               | [Se detaljert beskrivelse](#func-if) | ✅        | ✅       |

### Strenger og tall

| Funksjonsnavn                             | Parametre                                                     | Returverdi          | Frontend | Backend |
|-------------------------------------------|---------------------------------------------------------------|---------------------|----------|---------|
| [`lowerCase`](#func-lowerCase-upperCase)  | [Streng](#strenger)                                           | [Streng](#strenger) | ✅        | ✅       |
| [`upperCase`](#func-lowerCase-upperCase)  | [Streng](#strenger)                                           | [Streng](#strenger) | ✅        | ✅       |
| [`lowerCaseFirst`](#func-lcFirst-ucFirst) | [Streng](#strenger)                                           | [Streng](#strenger) | ✅        | ✅       |  
| [`upperCaseFirst`](#func-lcFirst-ucFirst) | [Streng](#strenger)                                           | [Streng](#strenger) | ✅        | ✅       |  
| [`stringLength`](#func-stringLength)      | [Streng](#strenger)                                           | [Tall](#tall)       | ✅        | ✅       |
| [`stringIndexOf`](#func-stringIndexOf)    | [Streng](#strenger), [Streng](#strenger)                      | [Tall](#tall)       | ✅        | ✅       |  
| [`stringSlice`](#func-stringSlice)        | [Streng](#strenger), [Tall](#tall), valgfritt [Tall](#tall)   | [Streng](#strenger) | ✅        | ✅       |  
| [`stringReplace`](#func-stringReplace)    | [Streng](#strenger), [Streng](#strenger), [Streng](#strenger) | [Streng](#strenger) | ✅        | ✅       |  
| [`text`](#func-text)                      | [Streng](#strenger)                                           | [Streng](#strenger) | ✅        | ❌       |
| [`language`](#func-language)              | Ingenting                                                     | [Streng](#strenger) | ✅        | ❌       |
| [`displayValue`](#func-displayValue)      | [Streng](#strenger)                                           | [Streng](#strenger) | ✅        | ❌       |
| [`round`](#func-round)                    | [Tall](#tall), valgfritt [Tall](#tall)                        | [Streng](#strenger) | ✅        | ✅       |
| [`formatDate`](#func-formatDate)          | [Dato/tid](#datoer), valgfri [Streng](#strenger)              | [Streng](#strenger) | ✅        | ✅       |

### Oppslag, komponenter og data

| Funksjonsnavn                                  | Parametre                                | Returverdi          | Frontend | Backend |
|------------------------------------------------|------------------------------------------|---------------------|----------|---------|
| [`instanceContext`](#func-instancecontext)     | [Streng](#strenger)                      | [Streng](#strenger) | ✅        | ✅       |
| [`frontendSettings`](#func-frontendsettings)   | [Streng](#strenger)                      | [Streng](#strenger) | ✅        | ✅       |
| [`countDataElements`](#func-countDataElements) | [Streng](#strenger)                      | [Tall](#tall)       | ✅        | ✅       |
| [`dataModel`](#func-datamodel)                 | [Streng](#strenger)                      | [Streng](#strenger) | ✅        | ✅       |
| [`component`](#func-component)                 | [Streng](#strenger)                      | [Streng](#strenger) | ✅        | ✅       |
| [`linkToPage`](#func-linkToPage)               | [Streng](#strenger), [Streng](#strenger) | [Streng](#strenger) | ✅        | ❌       |
| [`linkToComponent`](#func-linkToComponent)     | [Streng](#strenger), [Streng](#strenger) | [Streng](#strenger) | ✅        | ❌       |
| [`optionLabel`](#func-optionLabel)             | [Streng](#strenger), [Streng](#strenger) | [Streng](#strenger) | ✅        | ❌       |

### Spesialfunksjoner

| Funksjonsnavn          | Parametre                   | Returverdi          | Frontend | Backend |
|------------------------|-----------------------------|---------------------|----------|---------|
| [`argv`](#func-argv)   | [Tall](#tall)               | [Streng](#strenger) | ✅        | ✅       |
| [`value`](#func-value) | valgfri [Streng](#strenger) | [Streng](#strenger) | ✅        | ❌       |

Detaljerte beskrivelser og eksempler

{{% expandlarge id="func-compare" header="compare" %}}
{{% notice info %}}
Denne funksjonen er kun tilgjengelig på backend med [nuget-pakker](../../../guides/administration/maintainance/dependencies#nuget)
versjon 8.6.0-preview.3 eller nyere. I frontend er denne funksjonen tilgjengelige i versjon 4.17.0 og nyere, inkludert den siste
rullerende versjonen av v4.
{{% /notice %}}

Funksjonen `compare` er en generisk sammenligningsfunksjon som kan brukes til å sammenligne to verdier. Funksjonen tar
tre eller fire argumenter. Den første og siste argumentene er alltid verdiene som skal sammenlignes. Argumentene i
midten må være en gyldig operator, potensielt med et `not` foran for å invertere sammenligningen.

Noen eksempler:

```json
["compare", 5, "greaterThan", 3]
```

```json
["compare", "foo", "equals", "bar"]
```

```json
["compare", 5, "not", "equals", 3]
```

Funksjonen returnerer en boolsk verdi basert på sammenligningen. De aksepterte datatypene for sammenligning avhenger av
operatoren som brukes. For eksempel kan operatoren `equals` sammenligne strenger, tall og boolske verdier, mens
`greaterThan` og `lessThan` kun kan sammenligne tall.

| Operator        | Parametre              | Beskrivelse                                                                                          |
|-----------------|------------------------|------------------------------------------------------------------------------------------------------|
| `equals`        | [Alle typer](#datatyper) | Returnerer `true` om de to verdiene er like, `false` ellers.                                       |
| `greaterThan`   | [Tall](#tall)          | Returnerer `true` om det første tallet er større enn det andre tallet, `false` ellers.             |
| `greaterThanEq` | [Tall](#tall)          | Returnerer `true` om det første tallet er større enn eller lik det andre tallet, `false` ellers.   |
| `lessThan`      | [Tall](#tall)          | Returnerer `true` om det første tallet er mindre enn det andre tallet, `false` ellers.             |
| `lessThanEq`    | [Tall](#tall)          | Returnerer `true` om det første tallet er mindre enn eller lik det andre tallet, `false` ellers.   |
| `isBefore`      | [Dato/tid](#datoer)    | Returnerer `true` om den første datoen er før den andre datoen, `false` ellers.                    |
| `isBeforeEq`    | [Dato/tid](#datoer)    | Returnerer `true` om den første datoen er før eller lik den andre datoen, `false` ellers.          |
| `isAfter`       | [Dato/tid](#datoer)    | Returnerer `true` om den første datoen er etter den andre datoen, `false` ellers.                   |
| `isAfterEq`     | [Dato/tid](#datoer)    | Returnerer `true` om den første datoen er etter eller lik den andre datoen, `false` ellers.         |
| `isSameDay`     | [Dato/tid](#datoer)    | Returnerer `true` om de to datoene er på samme dag, `false` ellers.                                |

{{% /expandlarge %}}

{{% expandlarge id="func-equals" header="equals / notEquals" %}}
Disse to funksjonene sammenligner to strenger for å sjekke om de er like (`equals`) eller ulike (`notEquals`). Om
du sender inn andre verdier enn strenger, blir verdiene konvertert og sammenlignet som strenger
([les mer om konvertering her](#strenger)).

Eksempler:

```json
{
  "id": "lastName",
  "type": "Input",
  ...
  "hidden": ["equals",
    ["dataModel", "My.Model.FirstName"],
    "John"
  ],
  "readOnly": ["notEquals",
    ["frontendSettings", "FormIsEditable"],
    true
  ]
}
```

`notEquals` er i prinsippet det samme som, og en snarvei til, `["not", ["equals", ...]]`.

Se også tips og triks under [_Streng eller mindre streng sammenligning?_](#streng-eller-mindre-streng-sammenligning)
{{% /expandlarge %}}

{{% expandlarge id="func-not" header="not" %}}
Denne funksjonen tar inn en [boolsk verdi](#boolske-verdier) eller noe som kan konverteres til en boolsk verdi, og
returnerer den motsatte boolske verdien. Sann blir til usann, usann blir til sann.

Funksjonen kan være nyttig om du ønsker å _snu_ et uttrykk. Istedenfor å tenke at du skal skrive et uttrykk som
_skjuler_ en komponent gitt noen forutsetninger, kan du pakke uttrykket inn i `not` og skrive uttrykket ut fra
hva som skal til for å _vise_ komponenten:

```json
{
  "id": "lastName",
  "type": "Input",
  "hidden": [
    "not",
    ["or", ["dataModel", "ShowLastName"], ["frontendSettings", "ShowAllFields"]]
  ]
}
```

{{% /expandlarge %}}

{{% expandlarge id="func-gt" header="greaterThan / greaterThanEq / lessThan / lessThanEq" %}}
Disse 4 funksjonene forventer to tall inn, og sammenligner om _det første_ med _det andre_. Det vil si, for funksjonen
`greaterThan` er uttrykket sant dersom det første tallet er _større enn_ det andre.

| Funksjon        | Beskrivelse                                                   | Symbol |
| --------------- | ------------------------------------------------------------- | ------ |
| `greaterThan`   | Er det første tallet _større enn_ det andre tallet?           | \>     |
| `greaterThanEq` | Er det første tallet _større enn eller lik_ det andre tallet? | ≥      |
| `lessThan`      | Er det første tallet _mindre enn_ det andre tallet?           | \<     |
| `lessThanEq`    | Er det første tallet _mindre enn eller lik_ det andre tallet? | ≤      |

Dersom noen av argumentene til disse funksjonene er [`null`](#null) blir resultatet `false` (uavhengig av om det er det
første eller andre argumentet).

Eksempel som sjekker om alder er over (eller lik) 18:

```json
["greaterThanEq", ["component", "alder"], 18]
```

{{% /expandlarge %}}

{{% expandlarge id="func-concat" header="concat" %}}
Denne funksjonen tar inn 0 eller flere strenger som argumenter, og returnerer en streng hvor alle strengene i
argumentene er slått sammen. Kalles funksjonen uten noen argumenter gis det en tom streng.

Legg merke til at funksjonen ikke automatisk legger til mellomrom eller komma når den slår sammen strenger. For å gi
et mer lesbart resultat anbefales det å legge inn bindetegn hvor nødvendig:

```json
["concat", "Gratulerer med ", ["component", "alder"], "-årsdagen!"]
```

Uttrykket over gir teksten `Gratulerer med 18-årsdagen!` dersom verdien i alder-komponenten var `18`.

I `concat`-funksjonen tolkes [`null`](#null)-verdier som tomme strenger. [Boolske verdier](#boolske-verdier) skrives
ut som strengene `"true"` og `"false"`.
{{% /expandlarge %}}

{{% expandlarge id="func-and" header="and / or" %}}
Funksjonene `and` og `or` forventer 1 eller flere boolske verdier, og gir et resultat ut fra om henholdsvis _alle_ eller
_minst en_ av verdiene var sanne (`true`).

| Funksjon | Beskrivelse                                     |
| -------- | ----------------------------------------------- |
| `and`    | Er **alle** argumentene sanne? (`true`)         |
| `or`     | Er **minst ett** av argumentene sanne? (`true`) |

Gir man [`null`](#null)-verdier tolkes disse som usann (`false`). Eksempler på bruk finnes
under [_Streng eller mindre streng sammenligning?_](#streng-eller-mindre-streng-sammenligning)
{{% /expandlarge %}}

{{% expandlarge id="func-if" header="if" %}}
`if`-funksjonen kan brukes for å forgrene et uttrykk slik at returverdien styres av resultatet av et annet
boolsk uttrykk. Funksjonen kan kalles på to forskjellige måter; med 2 eller 4 argumenter:

| Argument        | Alternativ 1                 | Alternativ 2                 |
| --------------- | ---------------------------- | ---------------------------- |
| Første argument | [Boolsk](#boolske-verdier)   | [Boolsk](#boolske-verdier)   |
| Andre argument  | [Vilkårlig type](#datatyper) | [Vilkårlig type](#datatyper) |
| Tredje argument |                              | Strengen `"else"`            |
| Fjerde argument |                              | [Vilkårlig type](#datatyper) |

I **alternativ 1** vil returverdien til funksjonen bli verdien gitt som andre argument _dersom første argument er sant
(`true`)_. Om ikke returneres verdien `null`.

I **alternativ 2** vil returverdien til funksjonen bli verdien gitt som andre argument _dersom første argument er sant
(`true`)_. Om ikke returneres verdien gitt i fjerde argument. Man må _alltid_ gi strengen `"else"` som tredje argument
om man vil kalle funksjonen med 4 argumenter. Det tredje argumentet er bare til for å gjøre uttrykket mer lesbart, og
har ingen funksjon ellers.

Om man ønsker flere betingelser og mulige returverdier kan man nøste flere kall til `if` inne i andre eller fjerde
argument:

```json
[
  "if",
  ["greaterThan", ["component", "birthYear"], 1945],
  "Du ble født etter verdenskrigene",
  "else",
  [
    "if",
    ["greaterThanEq", ["component", "birthYear"], 1939],
    "Du ble født under andre verdenskrig",
    "else",
    "Du ble født før andre verdenskrig"
  ]
]
```

{{% /expandlarge %}}

{{% expandlarge id="func-language" header="language" %}}
Funksjonen `language` returnerer brukerens valgte språkkode.

Eksempel:

```json
{
   "id": "lastName",
   "type": "Input",
   ...
   "readOnly": ["equal", ["language"], "en"],
}
```

Om gjeldende språk er ukjent, vil `nb` returneres, som er standardspråket for Altinn 3-apper. Dermed kan man være trygg
på at denne funksjonen alltid returnerer et gyldig språk.

**Bemerk:** Denne funksjonen er ikke tigjengelig i backend-kode enda, og vil derfor gi en feilmelding dersom den blir
brukt noen steder [hvor uttrykk kjøres på backend](#bruksområder), og om man har slått på funksjonaliteten for å
automatisk slette skjulte data (`RemoveHiddenDataPreview`).

{{% /expandlarge %}}

{{% expandlarge id="func-starts-ends-with" header="startsWith/endsWith" %}}
Funksjonen `startsWith` sjekker om strengen gitt som første argument starter med strengen gitt i andre argument, og
på samme vis vil funksjonen `endsWith` sjekke om første streng slutter med den andre strengen.

```json
["startsWith", ["dataModel", "My.Model.FirstName"], "Jo"]
```

```json
["endsWith", ["dataModel", "My.Model.FirstName"], "hn"]
```

Noen detaljer som er verdt å nevne om disse funksjonene:

- Alle funksjoner starter og slutter med en tom streng, så `startsWith` og `endsWith` vil alltid returnere `true`
  dersom man bruker et uttrykk `["startsWith", "...", ""]`. Dette er viktig å passe på om man bruker verdien til
  en komponent eller et oppslag i datamodellen som andre argument.
- Ingen strenger starter eller slutter med en `null`-verdi. Bruker man et uttrykk som dette:
  ```json
  [
    "startsWith",
    ["dataModel", "My.Model.FullName"],
    ["dataModel", "My.Model.FirstName"]
  ]
  ```
  vil alltid resultatet bli
  `false` så lenge fornavnet ikke er gitt. Men som nevnt over, dersom fornavnet er satt til en tom streng (for eksempel
  dersom brukeren har visket ut fornavnet sitt), vil uttrykket gi `true` dersom et fullt navn er satt. Dersom man vil
  unngå noe av denne oppførselen kan man bruke `if`-funksjonen sammen med `equals` til å sjekke om noe er satt til
  en tom streng.
- `["startsWith", null, null]` gir alltid `false`.

{{% /expandlarge %}}

{{% expandlarge id="func-stringLength" header="stringLength" %}}
Funksjonen `stringLength` returnerer lengden på en streng (gitt i antall bokstaver/tegn), inkludert mellomrom.

Eksempel:

```json
["stringLength", ["dataModel", "My.Model.FirstName"]]
```

Dersom strengen er `null` vil `stringLength` returnere `0`.

{{% /expandlarge %}}

{{% expandlarge id="func-stringIndexOf" header="stringIndexOf" %}}
{{% notice info %}}
Denne funksjonen er kun tilgjengelig på backend med [nuget-pakker](../../../guides/administration/maintainance/dependencies#nuget)
versjon 8.6.0-preview.3 eller nyere. I frontend er denne funksjonen tilgjengelige i versjon 4.17.0 og nyere, inkludert den siste
rullerende versjonen av v4.
{{% /notice %}}

Funksjonen `stringIndexOf` tar imot to argumenter: en streng og en delstreng. Den returnerer indeksen til første
forekomst av delstrengen i strengen. Dersom delstrengen ikke finnes i strengen, vil funksjonen returnere `null`.

Eksempel:

```json
["stringIndexOf", ["dataModel", "My.Model.FullName"], " "]
```

Dette eksempelet returnerer indeksen til det første mellomrommet i fullt navn. Om fullt navn er "John Doe", vil
funksjonen returnere 4.

{{% /expandlarge %}}

{{% expandlarge id="func-stringSlice" header="stringSlice" %}}
{{% notice info %}}
Denne funksjonen er kun tilgjengelig på backend med [nuget-pakker](../../../guides/administration/maintainance/dependencies#nuget)
versjon 8.6.0-preview.3 eller nyere. I frontend er denne funksjonen tilgjengelige i versjon 4.17.0 og nyere, inkludert den siste
rullerende versjonen av v4.
{{% /notice %}}

Funksjonen `stringSlice` tar imot en streng som første argument (den originale strengen) og ett eller to tall som andre
og tredje argument (startindeksen og valgfri lengde). Den returnerer en delstreng av den originale strengen som
starter på indeksen gitt i andre argument. Om et tredje argument er gitt, vil delstrengen være av lengden gitt i
tredje argument.

Eksempel:

```json
["stringSlice", ["dataModel", "My.Model.FullName"], 5, 3]
```

Dette eksempelet returnerer en delstreng av fullt navn som starter på den 5. bokstaven og med en lengde på 3. Om fullt
navn er "John Doe", vil funksjonen returnere "Doe".

{{% /expandlarge %}}

{{% expandlarge id="func-stringReplace" header="stringReplace" %}}
{{% notice info %}}
Denne funksjonen er kun tilgjengelig på backend med [nuget-pakker](../../../guides/administration/maintainance/dependencies#nuget)
versjon 8.6.0-preview.3 eller nyere. I frontend er denne funksjonen tilgjengelige i versjon 4.17.0 og nyere, inkludert den siste
rullerende versjonen av v4.
{{% /notice %}}

Funksjonen `stringReplace` tar imot tre argumenter: en streng, en delstreng som skal erstattes, og en erstatningsstreng.
Den returnerer en ny streng hvor alle forekomster av delstrengen i strengen er erstattet med erstatningsstrengen.

Eksempel:

```json
["stringReplace", ["dataModel", "My.Model.FullName"], " ", "-"]
```

Dette eksempelet erstatter alle mellomrom i fullt navn med bindestreker. Om fullt navn er "John Doe", vil funksjonen
returnere "John-Doe".

{{% /expandlarge %}}

{{% expandlarge id="func-contains-not-contains" header="contains / notContains" %}}
Disse to funksjonene sjekker om streng A inkluderer eller ikke inkluderer streng B.
Både `contains` og `notContains` skiller mellom store og små bokstaver.
Det betyr at strengen "Hei" ikke inkluderer "hei". Ønsker du å sammenligne uavhengig av store og små bokstaver kan du
bruke funksjonene [`lowerCase` eller `upperCase`](#func-lowerCase-upperCase) sammen med `contains` eller `notContains`.

Eksempel:

```json
{
   "id": "lastName",
   "type": "Input",
   ...
   "hidden": [
      "contains",
      ["dataModel", "My.Model.FirstName"],
      "J"
   ],
   "readOnly": [
      "notContains",
      ["dataModel", "My.Model.FirstName"],
      "D"
   ]
}
```

Ønsker du å sjekke om verdier finnes i en kommaseparert liste kan du bruke funksjonen [`commaContains`](#func-commaContains).

{{% /expandlarge %}}

{{% expandlarge id="func-commaContains" header="commaContains" %}}
Funksjonen commaContains tar imot to argumenter. Det første argumentet er en kommaseparert streng, og det andre
argumentet er strengen du ønsker å sjekke om er blant de kommaseparerte verdiene i første argument.

Eksempel:

```json
{
   "id": "addName",
   "type": "Input",
   ...
   "readOnly": ["commaContains", ["dataModel", "My.Model.Names"], "John"]
}
```

Legg merke til at eventuelle mellomrom før/etter komma, eller før/etter første verdi blir ignorert. Denne funksjonen
er spesielt nyttig i tilfeller hvor man bruker en komponent som lagrer flere verdier i en kommaseparert streng, som
`Checkboxes` og `MultipleSelect`.

{{% /expandlarge %}}

{{% expandlarge id="func-lowerCase-upperCase" header="lowerCase/upperCase" %}}
Funksjonene `lowerCase` og `upperCase` tar imot en streng som input og returnerer en ny streng der alle tegnene er
konvertert til henholdsvis små eller store bokstaver.

```json
["lowerCase", ["dataModel", "My.Model.LastName"]]
```

Disse funksjonene gir deg en enkel måte å konvertere mellom små og store bokstaver i en streng.
Et bruksområde kan være å kombinere en av disse funksjonene med andre sammenligningsfunksjoner slik at sammenligningene
gjøres uavhengig av om det ble brukt store eller små bokstaver i input-verdien.

```json
["equals", ["upperCase", ["dataModel", "My.Model.LastName"]], "SMITH"]
```

{{% /expandlarge %}}

{{% expandlarge id="func-lcFirst-ucFirst" header="lowerCaseFirst/upperCaseFirst" %}}
{{% notice info %}}
Disse funksjonene er kun tilgjengelige på backend med [nuget-pakker](../../../guides/administration/maintainance/dependencies#nuget)
versjon 8.6.0-preview.3 eller nyere. I frontend er disse funksjonene tilgjengelige i versjon 4.17.0 og nyere, inkludert den siste
rullerende versjonen av v4.
{{% /notice %}}

Funksjonene `lowerCaseFirst` og `upperCaseFirst` tar en streng som input og returnerer en ny streng der den første
bokstaven er konvertert til henholdsvis liten eller stor bokstav.

```json
["upperCaseFirst", ["dataModel", "My.Model.LastName"]]
```

I dette eksempelet, gitt et etternavn "smith", vil funksjonen returnere "Smith".

{{% /expandlarge %}}

{{% expandlarge id="func-round" header="round" %}}
Funksjonen `round` avrunder et tall til et heltall, eller valgfritt til et desimaltall med et konfigurerbart antall desimalpunkter.

Eksempel med avrunding med 2 desimalpunkter:

```json
["round", "122.99843", "2"]
```

Eksempel med avrunding til nærmeste heltall:

```json
["round", "3.4999"]
```

Returverdien fra denne funksjonen er en streng, slik at returverdien kan brukes for
fremvisning (merk at desimalskilletegnet alltid er punktum). Selv om returverdien er en streng kan denne også brukes
videre i uttrykk som forventer tall som inn-verdi.

{{% /expandlarge %}}

{{% expandlarge id="func-text" header="text" %}}
Funksjonen `text` tar imot en nøkkel som argument og bruker denne nøkkelen til å hente ut den tilsvarende teksten fra en tekst-ressurs. Funksjonen returnerer verdien som er knyttet til den angitte nøkkelen.
Eksempel:

```json
["text", "min-nøkkel-id"]
```

**Bemerk:** Husk å teste manuelt med tekstnøkler som inneholder variabler. Det er ikke sikkert disse vil fungere som
forventet.

**Bemerk:** Denne funksjonen er ikke tilgjengelig i backend-kode enda, og vil derfor gi en feilmelding dersom den blir
brukt noen steder [hvor uttrykk kjøres på backend](#bruksområder), og om man har slått på funksjonaliteten for å
automatisk slette skjulte data (`RemoveHiddenDataPreview`).

{{% /expandlarge %}}

{{% expandlarge id="func-displayValue" header="displayValue" %}}
Funksjonen `displayValue` gjør et oppslag på en komponent og returnerer en formattert tekststreng som representerer verdien i datamodellen.
Dette er til forskjell fra [component](#func-component)-funksjonen som returnerer rå-verdien som ligger i datamodellen.
Denne funksjonen egner seg best til visning av en komponent sin verdi for brukeren, og mindre til videre logikk basert på verdien som returneres.
Dette er spesielt relevant for Input-felter med [tallformattering](/nb/altinn-studio/reference/ux/styling/#formatering-av-tall), datofelter, radioknapper (og andre komponenter med kodelister), osv.

Eksempel:

```json
["displayValue", "component-id"]
```

**Bemerk:** Denne funksjonen er ikke tilgjengelig i backend-kode enda, og vil derfor gi en feilmelding dersom den blir
brukt noen steder [hvor uttrykk kjøres på backend](#bruksområder), og om man har slått på funksjonaliteten for å
automatisk slette skjulte data (`RemoveHiddenDataPreview`).

{{% /expandlarge %}}

{{% expandlarge id="func-instancecontext" header="instanceContext (oppslag)" %}}
Denne funksjonen gjør det mulig å hente ut informasjon om gjeldende instans. Følgende nøkler kan brukes fom første
argument:

| Nøkkel                   | Verdi                          | Eksempelverdi                                       |
| ------------------------ | ------------------------------ | --------------------------------------------------- |
| `instanceId`             | Gjeldende instans-ID           | `512345/48c31ffc-dcdd-416d-8bc7-194bec3b7bf0`       |
| `instanceOwnerPartyId`   | Gjeldende aktør-ID             | `512345`                                            |
| `instanceOwnerPartyType` | Hva slags aktør eier instansen | `"org", "person", "selfIdentified" eller "unknown"` |
| `instanceOwnerName`      | Navnet på instans-eier         | `"Fornavn Etternavn", "Mitt Selskap AS"`            |
| `appId`                  | Den aktive appen sin ID        | `org/app-name`                                      |

Alle disse oppslagene vil gi verdien `null` om man jobber i en [tiltandsløs kontekst](../../configuration/stateless).
Om man gir andre nøkler enn de over, vil oppslaget resultere i en feilmelding. Denne oppførselen er unik blant
oppslagsfunksjonene, og gjøres for å sikre at man ikke prøver å hente informasjon som finnes i instansen men som ikke
(enda) er eksponert via en nøkkel her. [Gi oss en tilbakemelding](https://github.com/Altinn/app-frontend-react/issues/new?assignees=&labels=kind%2Ffeature-request%2Cstatus%2Ftriage&template=feature_request.yml) om du har ønsker om å hente ut
instansdata som ikke er tilgjengelig i denne funksjonen.

Oppslaget gjøres i samme datakilde som er tilgjengelig for [språk/tekster](../../ux/texts#datakilder).
{{% /expandlarge %}}

{{% expandlarge id="func-frontendsettings" header="frontendSettings (oppslag)" %}}
Dette oppslaget gjør det mulig å hente informasjon fra en datakilde som kan styres ulikt for hvert kjøretidsmiljø.

Oppslaget gjøres i samme datakilde som er tilgjengelig for [språk/tekster, og oppsettet er beskrevet
i detalj der](../../ux/texts#datakilder).

**Merk**: Datakilden heter `applicationSettings` når brukt i språk/tekster, men verdiene må alltid lagres under
nøkkelen `FrontEndSettings` i `appsettings.{miljø}.json`). Av den grunn har funksjonen fått navnet `frontendSettings`
her, for å indikere at oppslag ikke kan gjøres i resten av `appsettings.{miljø}.json`.
{{% /expandlarge %}}

{{% expandlarge id="func-countDataElements" header="countDataElements (oppslag)" %}}
{{% notice info %}}
Denne funksjonen er kun tilgjengelig på backend med [nuget-pakker](../../../guides/administration/maintainance/dependencies#nuget)
versjon 8.6.0-preview.3 eller nyere. I frontend er denne funksjonen tilgjengelige i versjon 4.17.0 og nyere, inkludert den siste
rullerende versjonen av v4.
{{% /notice %}}

Denne funksjonen gjør det mulig å telle antall elementer av en gitt datatype i gjeldende instans. Første argument
må være en streng som er definert som en datatype i `applicationmetadata.json`. Funksjonen vil returnere antallet
elementer av den gitte datatypen i gjeldende instans.

For eksempel, om du har en `FileUpload`-komponent som laster opp filer til datatypen `Attachment`, kan du bruke denne
funksjonen til å telle antall vedlegg som er lastet opp. På samme måte kan du telle antall [underskjema-elementer](../../../guides/development/subform)
ved å referere til datamodell-ID-en til underskjemaet.

Eksempel:

```json
["countDataElements", "Attachment"]
```

{{% /expandlarge %}}

{{% expandlarge id="func-datamodel" header="dataModel (oppslag)" %}}
Denne oppslagsfunksjonen gjør det mulig å hente verdier direkte fra gjeldende datamodell. Første og eneste argument
må peke et sted i datamodellen, og bruker det samme punktum-separerte formatet som brukt i `dataModelBindings`. Ved
bruk inne i [repeterende grupper](../../ux/fields/grouping/repeating) trenger man _ikke_ bruke plassholdere for
indekser til gruppen - uttrykket finner selv den relative plasseringen i kontekst av en repeterende gruppe.

Legg merke til at oppslag bare fungerer mot [datatyper](#datatyper) som allerede er støttet i uttrykkene. Dersom man
slår opp et objekt eller en liste/array i datamodellen med `dataModel`-funksjonen får man alltid resultatet `null`.
Denne funksjonaliteten kan endres, da det er planlagt støtte for objekter og lister i uttrykkene i fremtiden.

Eksempel på oppslag i repeterende gruppe:

```json {linenos=false,hl_lines=[11,21,23,24,25,34,36,37,38]}
[
   {
      "id": "ansatte",
      "type": "Group",
      "textResourceBindings": {
         "title": "Ansatte i selskapet"
      },
      "maxCount": 99999,
      "children": ["ansatt-navn", "ansatt-alder"],
      "dataModelBindings": {
         "group": "Ansatte"
      }
   },
   {
      "id": "ansatt-navn",
      "type": "Input",
      "textResourceBindings": {
         "title": "Fullt navn"
      },
      "dataModelBindings": {
         "simpleBinding": "Ansatte.Navn"
      },
      "hidden": ["lessThan",
        ["dataModel", "Ansatte.Alder"],
        18]
   },
   {
      "id": "ansatt-alder",
      "type": "Input",
      "textResourceBindings": {
         "title": "Alder"
      },
      "dataModelBindings": {
         "simpleBinding": "Ansatte.Alder"
      }
      "hidden": ["equals",
        ["dataModel", "Ansatte[0].Navn"],
        "Ola Nordmann"]
   }
]
```

Følgende kan observeres:

1. Det første oppslaget (for å styre `hidden` på komponenten `ansatt-navn`) styres ut fra alderen til hver ansatt. Om
   den ansatte er under 18 år skjules `ansatt-navn`. Legg merke til at samme sti i datamodellen blir brukt som
   `simpleBinding` på `ansatt-alder`.
2. Det andre oppslaget (for å styre `hidden` på komponenten `ansatt-alder`) bruker `[0]` på oppslaget i datamodellen.
   Dette fungerer også, men oppførselen er kanskje uventet; her skjules alle alder-komponenter dersom navnet på den _første_
   ansatte har navnet _Ola Nordmann_.
   {{% /expandlarge %}}

{{% expandlarge id="func-component" header="component (oppslag)" %}}
Oppslag direkte på komponent tilsvarer på mange måter et oppslag mot datamodell med [`dataModel`](#func-datamodel).
Et uttrykk som slår opp verdien til en komponent kommer til å lete etter komponenten og returnere verdien lagret på
komponenten sin `simpleBinding` i datamodellen. For øyeblikket støttes ingen andre verdier enn den lagret mot
`simpleBinding` (om andre verdier ønskes må man gå direkte mot [`dataModel`](#func-datamodel)).

Oppslag mot en komponent vil derimot returnere `null` dersom komponenten man slår opp verdien til er skjult (selv om
komponenten ellers har tilknyttet data i datamodellen). Dette gjør det til en viss grad mulig å styre visning av en
komponent basert på om en annen komponent er vist eller ikke. Dersom komponenten ble funnet på en helt annen (men skjult)
side gir også oppslaget verdien `null` selv om datamodellen har en verdi tilknyttet komponenten.

I likhet med [`dataModel`](#func-datamodel) vil oppslag mot en komponent-id forsøke å finne komponenten i nærheten av
uttrykket i kontekst av [repeterende grupper](../../ux/fields/grouping/repeating). Det vil først søkes etter komponenten
i gjeldende rad, før det letes oppover i sidestrukturen.
{{% /expandlarge %}}

{{% expandlarge id="func-formatDate" header="formatDate" %}}

{{% notice info %}}
Denne funksjonen er kun tilgjengelig på backend med [nuget-pakker](../../../guides/administration/maintainance/dependencies#nuget)
versjon 8.6.0-preview.3 eller nyere. I frontend er denne funksjonen tilgjengelige i versjon 4.0.0 og nyere, inkludert den siste
rullerende versjonen av v4.
{{% /notice %}}

Funksjonen `formatDate` tar imot en [dato](#datoer) som første argument, og et format som andre argument.
Formatargumentet er en valgfri streng som støtter _noen_ tokens i
[Unicode Tokens](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).

Dette er de tokenene vi støtter:

| Enhet           | Token    | Resultat                             |
|-----------------|----------|--------------------------------------|
| Era             | `G..GGG` | f.Kr., e.Kr.                         |
| Era             | `GGGG`   | før Kristus, etter Kristus           |
| Era             | `GGGGG`  | f.Kr., e.Kr.                         |
| År              | `y`      | 44, 1, 1900, 2017                    |
| År              | `yy`     | 44, 01, 00, 17                       |
| År              | `yyy`    | 044, 001, 1900, 2017                 |
| År              | `yyyy`   | 0044, 0001, 1900, 2017               |
| Forlenget år    | `u`      | -43, 0, 1, 1900, 2017                |
| Forlenget år    | `uu`     | -43, 01, 1900, 2017                  |
| Forlenget år    | `uuu`    | -043, 001, 1900, 2017                |
| Forlenget år    | `uuuu`   | -0043, 0001, 1900, 2017              |
| Måned           | `M`      | 1, 2,..., 12                         |
| Måned           | `MM`     | 01, 02,..., 12                       |
| Måned           | `MMM`    | jan, feb, ..., des                   |
| Måned           | `MMMM`   | januar, februar, ..., desember       |
| Dag i måned     | `d`      | 1, 2, ..., 31                        |
| Dag i måned     | `dd`     | 01, 02, ..., 31                      |
| Ukedag          | `E..EEE` | man, tir, ons, ..., søn              |
| Ukedag          | `EEEE`   | mandag, tirsdag, onsdag, ..., søndag |
| Ukedag          | `EEEEE`  | M, T, O, ..., S                      |
| AM/PM           | `a`      | a.m., p.m.                           |
| Time [1-12]     | `h`      | 1, 2, ..., 11, 12                    |
| Time [1-12]     | `hh`     | 01, 02, ..., 11, 12                  |
| Time [0-23]     | `H`      | 1, 2, ..., 22, 23                    |
| Time [0-23]     | `HH`     | 01, 02, ..., 22, 23                  |
| Minutt          | `m`      | 1, 2, ..., 59                        |
| Minutt          | `mm`     | 01, 02, ..., 59                      |
| Sekund          | `s`      | 1, 2, ..., 59                        |
| Sekund          | `ss`     | 01, 02, ..., 59                      |
| Brøkdels sekund | `S`      | 0, 1, ..., 9                         |
| Brøkdels sekund | `SS`     | 00, 01, ..., 99                      |
| Brøkdels sekund | `SSS`    | 000, 001, ..., 999                   |

Dersom man ikke gir et format som andre argument, vil funksjonen bruke et standardformat som varierer basert på
gjeldende språk.

Som med alle datoer og tidspunkt, vil de konverteres til lokal tidssone dersom datoen/tiden har spesifisert en annen
tidssone. Dette betyr også at uttrykk som bruker `formatDate` kan gi forskjellige resultater på frontend og backend
dersom tidssonen i nettleseren er forskjellig fra tidssonen på serveren.

Eksempel:

```json
["formatDate", "2023-10-30T14:54:00", "HH:mm"]
```
Vil resultere i `14:54`

{{% /expandlarge %}}

{{% expandlarge id="func-linkToPage" header="linkToPage" %}}
`linkToPage`-funksjonen kan brukes for å lage lenker som kan brukes inne i tekst i et skjema.
Den er ment for å lage lenker som peker til en spesifikk side av skjemaet. Å klikke på denne linken vil navigere
direkte til den spesifiserte siden.

Funksjonen tar 2 argumenter. Det første argumentet er lenketeksten som vil være synlig for
brukeren. Det andre argumentet er id-en til siden linken skal peke til.


```json
["linkToPage", "Specify your name", "page1"]
```
Resultatet vil bli `<a href="#/instance/<party-id>/<instance-id>/<TaskId>/page1">Oppgi navnet ditt</a>`
Denne lenken vil ta brukeren til den spesifiserte siden når den blir klikket på.

{{% /expandlarge %}}

{{% expandlarge id="func-linkToComponent" header="linkToComponent" %}}
`linkToComponent`-funksjonen kan brukes for å lage lenker som kan brukes inne i tekst i et skjema. Den er ment for å lage lenker
som peker til en spesifikk komponent i skjemaet. Å klikke på denne lenken vil navigere direkte til komponenten og gi den fokus.

Funksjonen tar 2 argumenter. Det første argumentet er lenketeksten som vil være synlig for brukeren.
Det andre argumentet er id-en til komponenten lenken skal peke til.


```json
["linkToComponent", "Specify your name", "inputMyName"]
```
Resultatet vil bli `<a href="#/instance/<party-id>/<instance-id>/<TaskId>/<PageId>?focusNodeId=inputMyName">Oppgi navnet ditt</a>`
Denne lenken vil ta brukeren til siden komponenten er på og fokusere på den spesifiserte komponenten, når brukeren klikker på lenken.
{{% /expandlarge %}}

{{% expandlarge id="func-optionLabel" header="optionLabel" %}}
Denne funksjonen kan brukes til å hente ut ledeteksten/labelen til et svaralternativ i en kodeliste. Teksten vil automatisk
bli oversatt til brukerens valgte språk (om ledeteksten er en tekstressurs), så det er ikke nødvendig å sende resultatet
gjennom `text`-funksjonen.

Funksjonen tar 2 argumenter. Det første argumentet er kodeliste-ID-en, og det andre argumentet er kodeliste-verdien
som skal slås opp i kodelisten.

```json
["optionLabel", "countries", "no"]
```

Sørg for at kodeliste-ID-en er en ren streng, og ikke et uttrykk. Kodeverdien derimot, kan være et uttrykk, f.eks.
oppslag fra en sti i datamodellen.

Om kodeliste-verdien ikke finnes i kodelisten, vil funksjonen returnere `null`.
{{% /expandlarge %}}

{{% expandlarge id="func-argv" header="argv" %}}
`argv`-funksjonen kan brukes for å hente ut argumenter som er sendt inn til uttrykket. Dette er foreløpig bare
tilgjengelig for [validering vha. uttrykk](../validation/expression-validation).

Funksjonen tar 1 argument, som er indeksen til argumentet du ønsker å hente ut. Indeksen starter på 0.

```json
["argv", 0]
```
{{% /expandlarge %}}

{{% expandlarge id="func-value" header="value" %}}
I likhet med `argv` er `value`-funksjonen også en metode for å hente ut argumenter som er sendt inn til uttrykket.
Funksjonen kan brukes uten argumenter for å hente ut en verdi, eller med et argument for å hente ut andre
typer verdier. Dette er foreløpig tilgjengelig for
[filtrering av svaralternativer](../../../guides/development/options/functionality/filtering) og blir snart tilgjengelig
som et alternativ til `argv` i [validering vha. uttrykk](../validation/expression-validation).

```json
["value"]
```

Dette uttrykket henter ut verdien til svaralternativet (om brukt i filtrering av svaralternativer). I andre sammenhenger
gir dette uttrykket foreløpig en feilmelding.

```json
["value", "label"]
```

Uttrykket over henter ut teksten til svaralternativet (om brukt i filtrering av svaralternativer). I andre sammenhenger
gir dette uttrykket en feilmelding.
{{% /expandlarge %}}

## Datatyper

Funksjoner i uttrykkene har en forventning om at argumentene som blir sendt inn har en spefikk type. Dersom et argument
blir sendt inn har en annen type enn forventet, blir verdien forsøkt konvertert til riktig type. Som et eksempel
forventer funksjonen `equals` to strenger, men om du sender inn den boolske verdien `true` som det ene eller andre
argumentet fungerer det også fint, siden den boolske verdien `true` blir konvertert til strengen `"true"`.

```json
["equals", true, "true"]
```

Uttrykket over fungerer, og gir `true` som resultat (fordi `true` og `"true"` sammenlignes som samme verdi ved at
`true` konverteres til `"true"` før sammenligningen). Dette gjør også at du kan kalle en funksjon som returnerer en
datatype og f.eks. sammenligne med en helt annen datatype. Les mer om hvilke datatyper som kan konverteres til hva
under.

Alle funksjoner som forventer en spesifikk datatype som argument vil også kunne fungere om man sender
inn [`null`](#null), men noen steder vil en `null`-verdi gi en feilmelding - for eksempel om man prøver å slå opp i
datamodellen med `["dataModel", null]`. I `concat`-funksjonen vil derimot en `null`-verdi bli tolket som en tom streng.

### Strenger

Strenger inneholder vilkårlig tekst, og er en bred datatype som tall og boolske verdier kan konverteres til.

Noen strenger kan også konverteres til andre datatyper:

| Strengverdi                                        | Kan erstatte               | Eksempler                  |
| -------------------------------------------------- | -------------------------- | -------------------------- |
| Heltall med eller uten negativt fortegn            | [Tall](#tall)              | `3`, `-8`, `71254`         |
| Desimaltall med eller uten negativt fortegn        | [Tall](#tall)              | `3.14`, `-33.0`, `123.123` |
| `true` eller `false` med små eller store bokstaver | [Boolsk](#boolske-verdier) | `true`, `True`, `FALSE`    |
| `null` med små eller store bokstaver               | [Null](#null)              | `null`, `Null`, `NULL`     |

Alle andre strenger enn de i tabellen over vil gi feilmelding om de blir forsøkt konvertert til andre typer.

### Tall

Tallverdier gjelder positive og negative heltall og desimaltall. Noen strenger blir også konvertert
automatisk til en tallverdi, som vist i tabellen til strenger over. For at konvertering av en streng til et tall
skal fungere, må strengen oppfylle følgende:

- Strengen inneholder bare et tall, ingen annen tekst foran/bak tallet
- Negativt fortegn (`-`) kan brukes, men positivt fortegn (`+`) støttes ikke.
- Desimaltall må representeres med punktum, ikke komma.
- Tusenskilletegn eller annen tallformattering støttes ikke.

Alle andre strenger vil gi en feilmelding om de blir forsøkt konvertert til et tall. Forsøker man å konvertere en
[boolsk verdi](#boolske-verdier) til et tall, gir det også en feilmelding.

Funksjoner som forventer å få inn et tall kan også få inn [`null`](#null). Se mer om hvilken effekt det har under
beskrivelsen til hver funksjon.

### Boolske verdier

Boolske verdier omfatter `true` (sann) og `false` (usann). Når man kaller en funksjon som forventer å få inn en boolsk
verdi, kan man også sende inn enkelte andre typer, som blir konvertert til en boolsk verdi:

- Tallene `1` og `0` fungerer som henholdsvis `true` og `false`
- Strengene `"1"` og `"0"` fungerer likt som tallene (og blir henholdsvis `true` og `false`)
- Strengene `"true"` og `"false"` konverteres også til en boolsk verdi
- Verdien [`null`](#null) fungerer likt som `false`

Alle andre verdier gir en feilmelding om de blir sendt til en funksjon som forventer en boolsk verdi. Legg merke til
at disse reglene er litt forskjellige fra reglene til [strenger](#strenger). Det er dermed forskjell på hvilke verdier
som kan _tolkes_ som en boolsk verdi for en funksjon som forventer et boolsk argument - og hvilke verdier som er _like_
en boolsk verdi. Funksjonen [`equals`](#func-equals) sammenligner verdier som strenger, og dermed vil tallet `1` og
strengen `"1"` sammenlignes som like, men den vil ikke gjenkjenne `1` og `true` som like verdier.

Det kan kanskje se ut som følgende uttrykk er like:

1. `"hidden": ["dataModel", "hideName"]`
2. `"hidden": ["equals", ["dataModel", "hideName"], true]`
3. `"hidden": ["if", ["dataModel", "hideName"], true, "else", false]`

Hvis verdien (her gitt fra oppslaget `["dataModel", "hideName"]`) er `true` eller `"true"` vil
komponenten skjules, men dersom verdien er `1` eller `"1"` vil komponenten bare skjules med uttrykkene i alternativ
1 og 3. Dette fordi resultatet i uttrykket for `hidden` [konverteres til en boolsk verdi](#bruksområder), og
`if` [forventer en boolsk verdi som første argument](#func-if). Derimot vil `equals` sammenligne verdiene som strenger,
og `"1"` er ikke lik `"true"`.

Se også tips og triks under [_Streng eller mindre streng sammenligning?_](#streng-eller-mindre-streng-sammenligning)

### Null

De fleste steder hvor man forventer å få inn en [streng](#strenger), [tall](#tall) eller
[boolske verdier](#boolske-verdier) skal også tåle en `null`-verdi. Null-verdier indikerer at en spesifikk verdi
mangler, og det er forskjell på f.eks. en `null`-verdi, en tom [streng](#strenger) og [tallet](#tall) `0`.

Dersom man gjør et oppslag i en funksjon som `dataModel`, og verdien man leter etter ikke finnes/er satt, vil som regel
`null` bli resultatet.

### Datoer

Datoer kan være strenger (eller `DateTime`/`DateOnly` i C#-datamodellen). Bare noen få datoformater kan tolkes
i uttrykksfunksjoner som tillater datoer som argument, og formatet må følge ISO 8601.

Noen eksempler på gyldige datoformater:

- `2023-10-30T14:54:00.000Z` (UTC-tidssone)
- `2023-10-30T14:54:00.000+02:00` (med tidssoneforskyvning)
- `2023-10-30T14:54:00.000` (antatt å være i lokal tidssone)
- `2023-10-30T14:54:00` (antatt å være i lokal tidssone, uten millisekunder)
- `2023-10-30` (Bare dato, antatt å være midnatt i lokal tidssone)
- `2023` (Bare år, antatt å være midnatt 1. januar i lokal tidssone)

{{% notice info %}}
Det er viktig å merke seg at datoer som inkluderer en tidssoneforskyvning (eller `Z` for UTC) blir konvertert til
lokal tidssone når de brukes i uttrykk. Dette betyr at bruk av funksjonen `formatDate` for å formatere en dato kan gi
forskjellige resultater på frontend og backend dersom tidssonen på serveren er forskjellig fra brukerens tidssone i
nettleseren.

Av denne grunn kan det være å foretrekke å spesifisere datoer og tider uten en tidssoneforskyvning eller `Z` dersom du
ønsker at datoen/tiden skal vises på samme måte uavhengig av brukerens tidssone. På samme vis er det anbefalt å unngå
å sammenligne datoer i forskjellige tidssoner.
{{% /notice %}}

## Tips og triks

### Vise/skjule hele sider

Uttrykk kan brukes til å vise/skjule hele sider. I eksempelet under vil hele siden skjules dersom en komponent
(på en av de andre sidene) har verdien _no_ eller ikke er satt.

```json
{
   "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
   "data": {
      "hidden": ["or",
         ["equals", ["component", "hasComplaints"], "no"],
         ["equals", ["component", "hasComplaints"], null]
      ],
      "layout": [
         ...
      ]
   }
}
```

Dersom siden man stod på blir skjult, vil applikasjonen automatisk gå videre til neste tilgjengelige side
i [side-rekkefølgen](../../ux/pages/navigation#rekkefølge). Om alle de neste sidene er skjult, vises den første mulige
siden i rekkefølgen istedenfor.

### Streng eller mindre streng sammenligning?

Måten uttrykkene kjøres på gjør at de kan virke litt strenge (ved at f.eks. `0` og `null` er ulike verdier når man
sammenligner med `equals`). Det er et designvalg gjort i Altinn av to grunner:

1. Strenge regler er tydelige regler. Uttrykkene vil heller gi en feilmelding om noe ikke er som forventet, enn å la deg
   lure på hvorfor det ble slikt det ble.
2. Hvis uttrykkene behandler mange ulike verdier som like, fratar vi deg muligheten til å skille mellom dem om du skulle
   ønske det.

Om man ønsker mindre streng sammenligning, kan man f.eks. konstruere et uttrykk som bruker [`or`](#func-and)-funksjonen
til å gjenkjenne flere forskjellige verdier:

```json
[
  "or",
  ["equals", ["dataModel", "My.Path"], 0],
  ["equals", ["dataModel", "My.Path"], false],
  ["equals", ["dataModel", "My.Path"], null],
  ["equals", ["dataModel", "My.Path"], ""]
]
```

Husk også at konvertering til [boolsk verdi](#boolske-verdier) tillater flere alternativer enn strenger
(som `equals` forventer). Siden funksjonen `or` forventer boolske verdier som argumenter, og verdiene
`0`, `false` og `null` allerede tillates som boolske verdier vil følgende fungere likt som uttrykket over:

```json
["or", ["dataModel", "My.Path"], ["equals", ["dataModel", "My.Path"], ""]]
```
