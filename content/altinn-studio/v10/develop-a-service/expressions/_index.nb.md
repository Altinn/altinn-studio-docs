---
title: Uttrykk
linktitle: Uttrykk
description: Introduksjon til uttrykksspråket i Altinn Studio og hvordan du kan bruke det til å lage mer dynamiske skjemaer.
tags: [expressions, dynamics, needsReview]
toc: true
weight: 50
---

## Introduksjon
Uttrykksspråket i Altinn Studio gjør det mulig å definere enkle regler for hvordan ulike deler av tjenesten skal oppføre seg, uten å måtte programmere det med et tradisjonelt programmeringsspråk. Du kan gjerne sammenligne uttrykk med enkle makroer i Excel. Uttrykkene kan enten skrives for hånd eller konfigureres via grensesnittet i Altinn Studio Designer.

Du bruker uttrykk typisk i forbindelse med dynamikk, blant annet til å:
- vise og skjule
  - komponenter/skjemafelt
  - deler av en komponent (rad i repeterende gruppe, verdi i kodeliste)
  - en gruppe av komponenter
  - hele sider
- bygge opp dynamiske kodelister
- kontrollere hvordan prosessen skal være, for eksempel hoppe over et signeringsteg hvis reglene tilsier at det ikke er nødvendig

Uansett hva du bruker uttrykk til, er språket det samme, og du vil kjenne igjen funksjonene selv om du bruker dem på forskjellige steder.

## Terminologi
- **Uttrykk**: En enhet som består av et boolsk komponentfelt og det faktiske uttrykket som vil bli evaluert til å være
  en
  boolsk verdi når det beregnes i en kjørende app. Det enkleste uttrykket kan bestå av en enkelt underenhet,
  mens et mer avansert uttrykk kan bestå av flere underuttrykk kombinert med en operator.
- **Underuttrykk**: Et begrep som brukes for å omtale den mest elementære enheten i et uttrykk. Et underuttrykk består
  av en funksjon og to verdier, der en verdi kan være et enkelt element eller et sammensatt element der den første delen
  av elementet definerer en kilde hvor den etterfulgte verdien kan bli funnet.
- **Egenskap** eller **Felt**: Den boolske egenskapen eller feltet til komponenten som uttrykket skal kobles til.
- **Funksjon**: Funksjonen som skal brukes til å sammenligne de to verdiene i underuttrykket.
- **Datakilde**: Kilden for verdiene i underuttrykket. Kan også omtales som _typen_ til verdien.
- **Verdi for datakilde**: Den faktiske verdien som skal brukes til å evaluere underuttrykket. Hvis verdien har
  en
  datakilde som er `applikasjonsinnstillinger`, `komponent`, `datamodell` eller `instanskontekst`, fungerer den som en
  referanse til en verdi i stedet for en eksplisitt verdi.
- **Operator**: Operatoren er bare relevant når det er mer enn ett underuttrykk, og den vil bli brukt til å
  evaluere om _alle_ underuttrykkene skal gjelde (bruk **OG**) eller om det er nok at bare ett av underuttrykkene
  gjelder (bruk **ELLER**).

## Oppbygging og skrivemåte (syntaks)

Uttrykkene er bygget opp som et slags mini-programmeringsspråk, hvor alt er definert i JSON. Selve uttrykkene er alltid
en liste (array) med verdier, hvor den første verdien i hver liste alltid er et funksjonsnavn. Resten
av verdiene sendes som inndata/argumenter til funksjonen. Inndata/argumentene kan komme fra ulike kilder.

```json
["equals", "foo", "bar"]
```

I eksempelet over brukes funksjonen ```equals``` (første verdi i listen) og deretter blir strengene "foo" og "bar" sammenlignet. De er ulike, så resultatet av dette uttrykket blir en boolsk verdi; ```false```.

Funksjonen ```equals``` forventer å få inn to strenger (tekstverdier) som inndata/argumenter. I eksemplet over er tekstverdiene faste og de samme hver gang. Det er mulig å bruke andre uttrykk som igjen returnerer en tekstverdi. Hvis du gjør dette, blir uttrykket tolket slik at de innerste funksjonene kjøres først, og de ytterste kjøres sist.

```json
["equals", ["component", "firstName"], "John"]
```

I dette eksempelet blir det innerste uttrykket/funksjonskallet `["component", "firstName"]` kjørt først. Hvis verdien til
komponenten "firstName" er lik strengen "John", gir funksjonen resultatet den boolske verdien ```true```.

Hvis du bruker dette uttrykket for `hidden`-egenskapen til en komponent, blir komponenten skjult hvis du skriver inn "John" i "firstName"-komponenten et annet sted i applikasjonen:

```json
{
  "id": "lastName",
  "type": "Input",
  ...
  "hidden": ["equals", ["component", "firstName"], "John"]
}
```

Det er ingen begrensninger rundt hvor store eller komplekse uttrykkene kan være. Som en øvelse, se om du klarer å lese hva dette uttrykket gjør, og hvilke mulige verdier det kan returnere:

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

**At 62, you are eligible for retirement**

Og for en person som er 15 år (eller yngre, som f.eks. en 4-åring), returneres teksten:

**At 4, you should stay in (pre)school**
{{% /expandlarge %}}

## Bruksområder

Dynamiske uttrykk er tilgjengelig for bruk i disse egenskapene:

| Komponenter                                                                                                     | Egenskap                      | Forventet verdi            | Frontend | Backend |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------------------- | -------- | ------- |
| [Sider/layouts](#show-hide-pages)                                                                         | `hidden`                      | Boolsk | ✅       | ✅      |
| Alle                                                                                                            | `hidden`                      | Boolsk | ✅       | ✅      |
| Skjemakomponenter                                                                                               | `required`                    | Boolsk | ✅       | ✅      |
| Skjemakomponenter                                                                                               | `readOnly`                    | Boolsk | ✅       | ❌      |
| [Repeterende grupper](/nb/altinn-studio/v10/develop-a-service/look-and-feel/components/repeatinggroup/)                                                       | `hiddenRow`                   | Boolsk | ✅       | ❌      |
| [Repeterende grupper](/nb/altinn-studio/v10/develop-a-service/look-and-feel/components/repeatinggroup/)                                                       | `edit.addButton`              | Boolsk | ✅       | ❌      |
| [Repeterende grupper](/nb/altinn-studio/v10/develop-a-service/look-and-feel/components/repeatinggroup/)                                                       | `edit.saveButton`             | Boolsk | ✅       | ❌      |
| [Repeterende grupper](/nb/altinn-studio/v10/develop-a-service/look-and-feel/components/repeatinggroup/)                                                       | `edit.deleteButton`           | Boolsk | ✅       | ❌      |
| [Repeterende grupper](/nb/altinn-studio/v10/develop-a-service/look-and-feel/components/repeatinggroup/)                                                       | `edit.alertOnDelete`          | Boolsk | ✅       | ❌      |
| [Repeterende grupper](/nb/altinn-studio/v10/develop-a-service/look-and-feel/components/repeatinggroup/)                                                       | `edit.saveAndNextButton`      | Boolsk | ✅       | ❌      |
| [Kodelistebaserte komponenter](/nb/altinn-studio/v10/develop-a-service/look-and-feel/options/sources/from-data-model/#støtte-for-uttrykk) | `source.label`                | Streng       | ✅       | ❌      |
| [Kodelistebaserte komponenter](/nb/altinn-studio/v10/develop-a-service/look-and-feel/options/sources/from-data-model/#støtte-for-uttrykk) | `source.description`          | Streng       | ✅       | ❌      |
| [Kodelistebaserte komponenter](/nb/altinn-studio/v10/develop-a-service/look-and-feel/options/sources/from-data-model/#støtte-for-uttrykk) | `source.helpText`             | Streng       | ✅       | ❌      |
| [Kodelistebaserte komponenter](/nb/altinn-studio/v10/develop-a-service/look-and-feel/options/sources/dynamic/#basert-på-uttrykk)          | `queryParameters.[*]`         | Streng       | ✅       | ❌      |
| [Kodelistebaserte komponenter](/nb/altinn-studio/v10/develop-a-service/look-and-feel/options/functionality/filtering/)                     | `optionFilter`                | Streng       | ✅       | ❌      |
| Alle                                                                                                            | `textResourceBindings.[*]` \* | Streng       | ✅       | ❌      |

\* = Hvilke verdier du kan overstyre med textResourceBindings, varierer fra komponent til komponent, men vil fungere på alle steder der det brukes. TextResourceBindings for repeterende grupper finner du [mer informasjon om her](/nb/altinn-studio/v10/develop-a-service/look-and-feel/components/repeatinggroup#text-resource-bindings-textresourcebindings)


## Testing, feilsøking og utvikling av uttrykk

Når du skal skrive et uttrykk, er det greit å vite noenlunde hva resultatet kommer til å bli, og om uttrykket er gyldig. Ugyldige uttrykk gir en advarsel i JavaScript-konsollen i nettleseren når siden lastes, så det kan være lurt å ha denne konsollen åpen når du utvikler en applikasjon og tester uttrykkene lokalt.

Det er også mulig å teste kjøring av et uttrykk direkte i utviklerverktøyene. Det gjør du ved å trykke `Ctrl + Shift + K` på PC eller `Cmd + Shift + K` på Mac, og gå til fanen for uttrykk. Uttrykk vil kunne oppføre seg annerledes avhengig av hvilken komponent de evalueres i nærheten av. Derfor kan du også velge en komponent som skal brukes som kontekst når uttrykket evalueres i utviklerverktøyene.

## Eksempler
{{% expandlarge id="rep-group-edit-button-text" header="Styre redigeringsknapp-tekst i repeterende gruppe" %}}

Her endrer vi teksten til redigeringsknappen i en repeterende gruppe basert på om `IsPrefill` er satt til `true` i
en gitt adresse i datamodellen. Dersom `IsPrefill` er `true` for en adresse, vil raden som viser frem den adressen ha en
redigerings-knapp med teksten `"View"`. Hvis `IsPrefill` er `false` blir teksten på knappen til den spesifikke raden
`"Edit"`.

Det er verdt å merke seg at dersom et oppslag på `IsPrefill` gir resultatet `null`(ikke funnet) så konverteres
resultatet til `false` når det blir brukt i en `if`. Les mer detaljert om dette i seksjonene [if](/nb/altinn-studio/v10/develop-a-service/expressions/reference/functions/#func-if) og [datatyper](/nb/altinn-studio/v10/develop-a-service/expressions/reference/datatypes/)

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

{{% expandlarge id="show-hide-pages" header="Vise/skjule hele sider" %}}
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

Hvis siden du står på blir skjult, vil applikasjonen automatisk gå videre til neste tilgjengelige side i siderekkefølgen. Hvis alle de neste sidene er skjult, vises den første mulige siden i rekkefølgen i stedet.
{{% /expandlarge %}}

{{% expandlarge id="rep-group-expandable" header="ID-er og evaluering i repeterende grupper" %}}

**NB:** Dette eksemplet er kun relevant når du skal prøve et uttrykk i utviklerverktøyene som er avhengig av en kjent posisjon i en repeterende gruppe. Dette kan endres i fremtiden, og slike endringer vil ikke påvirke uttrykk som du har definert i en applikasjon. Der hentes konteksten ut fra hvor uttrykket er definert i layout-filen.

Se for deg en repeterende gruppe for personer med to felt: `navn` og `alder`. Gitt dette uttrykket:

`["component", "alder"]`

Hva vil alderen være? Det vil kunne variere etter hvilken gruppe som evaluerer uttrykket. Hvis du har to grupper/rader, vil både `navn`- og `alder`-komponentene finnes to ganger hver. Disse vil få ID-ene `navn-0` og `alder-0` (for den første raden) og `navn-1` og `alder-1` (for den andre raden).

Tenk deg at følgende data er fylt inn i en repeterende gruppe:

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

1. Du har ikke gitt noen kontekst (eventuelt, uttrykket plasseres på en komponent som ikke er i nærheten av en `alder`-komponent)
2. Du evaluerer uttrykket i kontekst av `navn-0`
3. Du evaluerer uttrykket i kontekst av `navn-1`

Hva vil resultatet bli i de forskjellige eksemplene? Her er svarene:

1. Denne vil finne "første og beste" `alder`-komponent, og finner dermed `alder-0`. Den returnerer derfor _24_, Per sin alder.
2. Her prøver vi å lete i kontekst av `navn`-komponenten på første rad, og igjen finner vi _24_, Per sin alder.
3. I siste eksempel har vi spesifisert andre rad i den repeterende gruppen ved å evaluere i kontekst av `navn-1`. Her finner vi den nærmeste `alder`-komponenten `alder-1`, som er _36_, Kari sin alder.

{{% /expandlarge %}}

