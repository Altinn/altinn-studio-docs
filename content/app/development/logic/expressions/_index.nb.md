---
title: Dynamiske uttrykk
linktitle: Uttrykk
description: Oversikt over dynamiske uttrykk definert i JSON
tags: [dynamics]
toc: true
---

{{% panel theme="warning" %}}
⚠️ Dynamikk er et område under aktiv utvikling. Denne funksjonaliteten er ikke tilgjengelig for konfigurasjon direkte
i Altinn Studio enda, og må derfor skrives manuelt i JSON-filene.
{{% /panel %}}

## Introduksjon

Dynamikk via uttrykk gjør det mulig å definere enkel dynamisk oppførsel i en Altinn 3 app, som for eksempel ved å
definere om et skjemafelt skal vises eller skjules, om feltet skal være påkrevd eller skrivebeskyttet.

Uttrykkene er tilgjengelige i alle Altinn 3-apper som bruker frontend-versjon
[3.54.0](https://github.com/Altinn/app-frontend-react/releases/tag/v3.54.0) eller nyere. Bruker man denne versjonen
(eller siste hovedversjon) har man mulighet til å benytte dynamiske uttrykk til [flere bruksområder](#bruksområder).

Fra versjon `7.2.0` av [nuget-pakkene](../../../maintainance/dependencies#nuget) er også uttrykkene støttet i backend.
Det gjør at serveren vil kunne evaluere uttrykkene og fjerne data som potensielt er lagret i instansen og er knyttet
til felter/komponenter som i ettertid er skjult. Disse dataene kan da fjernes fra datamodellen når instansen sendes inn.
Merk at dette bare gjelder data i datamodellen som er knyttet til skjulte komponenter - data i datamodellen som ikke
er knyttet til komponenter (og dermed implisitt skjult for brukeren) vil ikke fjernes automatisk.

Det gjør det også mulig å unnlate å sende inn data som ellers er tilknyttet påkrevde felter - dersom disse påkrevde
feltene er skjult i skjemaet ved hjelp av dynamiske uttrykk. Dette gjelder også ved innsending direkte fra API.

**NB:** Automatisk fjerning av skjult data må foreløpig aktiveres manuelt (_opt-in_) ved at man legger til følgende
linje i `App/appsettings.json` etter at man har oppgradert [nuget-pakkene](../../../maintainance/dependencies#nuget)
til `7.2.0` eller nyere:

```json {linenos=false,hl_lines=["6"]}
  "AppSettings": {
    "OpenIdWellKnownEndpoint": "http://localhost:5101/authentication/api/v1/openid/",
    "RuntimeCookieName": "AltinnStudioRuntime",
    "RegisterEventsWithEventsComponent": false,
    "RemoveHiddenDataPreview": true
  },
```

### Oppbygging og syntaks

Uttrykkene er bygget opp som et slags mini-programmeringsspråk, hvor alt er definert i JSON. Selve uttrykkene er alltid
en liste (array) med verdier, hvor den første verdien i hver liste alltid er et [funksjonsnavn](#funksjoner). Resten
av verdiene sendes som inndata/argumenter til funksjonen.

```json
["equals", "foo", "bar"]
```

I eksempelet over blir strengene "foo" og "bar" sammenlignet. De er ulike, så resultatet av dette uttrykket blir en
boolsk verdi; false.

Denne funksjonen, [equals](#equals--notequals), forventer å få inn to [strenger](#strenger) som inndata/argumenter. Det
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
    ["concat",
      "At ", ["component", "age"], ", you are eligible for retirement"]
  ],
  "else",
  ["concat",
    "At ", ["component", "age"], ", you should stay in (pre)school"]
]
```

{{% expandlarge id="answer-expandable" header="Røpealarm: Klikk her for en tolkning av uttrykket over" %}}
Uttrykket sjekker verdien til en tenkt komponent med ID "alder". Dersom personen er 16 år eller mer,
for eksempel 45 år gammel, returneres teksten:

**Please consider applying for our open position!**

For en person som er 62 år returneres teksten:

**At 62, your are eligble for retirement**

Og for en person som er 15 år (eller yngre, som f.eks. en 4-åring), returneres teksten:

**At 4, you should stay in (pre)school**
{{% /expandlarge %}}


### Bruksområder

Dynamiske uttrykk er foreløpig tilgjengelig for bruk i disse egenskapene, som definert i [layout-filer](../../ux/pages).

| Komponenter                             | Egenskap                   | Forventet verdi            | Frontend | Backend |
|-----------------------------------------|----------------------------|----------------------------|----------|---------|
| [Sider/layouts](#viseskjule-hele-sider) | `hidden`                   | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Alle                                    | `hidden`                   | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Skjemakomponenter                       | `required`                 | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Skjemakomponenter                       | `readOnly`                 | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| Repeterende grupper                     | `edit.addButton`           | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| Repeterende grupper                     | `edit.saveButton` *        | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| Repeterende grupper                     | `edit.deleteButton` *      | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| Repeterende grupper                     | `edit.saveAndNextButton` * | [Boolsk](#boolske-verdier) | ✅        | ❌       |

\* = Disse egenskapene kan foreløpig bare styres dynamisk for alle repeterende grupper på en gang, ikke
for hver enkelt rad.

### Testing, feilsøking og utvikling av uttrykk

Når man skal skrive et uttrykk er det greit å vite noenlunde hva resultatet kommer til å bli, og om uttrykket er gyldig.
Ugyldige uttrykk gir en advarsel i JavaScript-konsollet i nettleseren når siden lastes, så det kan være lurt å ha 
dette konsollet åpent når man utvikler en applikasjon og tester uttrykkene lokalt.

Det er også mulig å teste ut kjøring av et uttrykk rett i nettleserens JavaScript-konsoll. Det gjøres ved å bruke
funksjonen `evalExpression()`. Som første parameter tar den inn et hvilket som helst uttrykk, og resultatet skrives
tilbake til konsollet:

!["Eksempelkjøring av evalExpression()"](evalExpression.png "Eksempelkjøring av evalExpression()" )

Uttrykk vil også kunne oppføre seg annerledes alt etter hvilken komponent de evalueres i nærheten av.
Som et valgfritt andre parameter kan du også sende inn ID-en til en komponent som skal brukes som kontekst når
uttrykket evalueres.  Hvis du er usikker på hvilke komponenter og IDer som er tilgjengelige på siden du ser på i
applikasjonen, kan du prøve å sende inn en tom streng eller ugyldig komponent-ID som andre parameter, så vil du få tips
til hvilke ID-er du kan bruke.

{{% expandlarge id="rep-group-expandable" header="Eksempel på ID-er og evaluering i repterende grupper" %}}

**NB:** Her beskrives noen implementasjonsdetaljer i [app-frontend-react](https://github.com/Altinn/app-frontend-react/),
og er kun relevant når du skal prøve et uttrykk i JavaScript-konsollet som er avhengig av en kjent posisjon i en
repeterende gruppe. Dette kan endres i fremtiden, og slike endringer vil ikke påvirke uttrykk som man har definert i en
applikasjon. Der hentes konteksten ut fra hvor uttrykket er definert i layout-filen.

Se for deg en [repeterende gruppe](../../ux/fields/grouping/repeating) for personer med to felt; `navn` og `alder`.
Gitt dette uttrykket:

`["component", "alder"]`

Hva vil alderen være? Det vil være kunne variere etter hvilken gruppe som evaluerer
uttrykket. Har man har to grupper/rader vil både `navn`- og `alder`-komponentene finnes to ganger hver. Disse vil få
ID-ene `navn-0` og `alder-0` (for den første raden) og `navn-1` og `alder-1` (for den andre raden). Du kan lete etter
den nærmeste alder-komponenten (den som tilhører samme gruppe/rad som `navn`-komponenten) ved å spesifisere en
mer nøyaktig ID i tilfeller der uttrykk evalueres i repeterende gruppe.

Tenk deg at følgende data er fyllt inn i en repeterende gruppe:

| Navn | Komponent-ID | Alder | Komponent-ID |
|------|--------------|-------|--------------|
| Per  | `navn-0`     | 24    | `alder-0`    |
| Kari | `navn-1`     | 36    | `alder-1`    |
| Ola  | `navn-2`     | 18    | `alder-2`    |

```javascript
evalExpression(["component", "alder"]); // Eksempel 1
evalExpression(["component", "alder"], "navn"); // Eksempel 2
evalExpression(["component", "alder"], "navn-0"); // Eksempel 3
evalExpression(["component", "alder"], "navn-1"); // Eksempel 4
```

1. Denne vil finne "første og beste" `alder`-komponent, og finner dermed `alder-0`. Den returnerer
   derfor *24*, Per sin alder.
2. Denne prøver å evaluere uttrykket i kontekst av den første `navn`-komponenten den finner, som er `navn-0`.
   Den nærmeste `alder`-komponenten til `navn-0` er `alder-0`, og dermed vår vi igjen *24*, Per sin alder.
3. Her prøver vi å lete i kontekst av `navn`-komponenten på første rad, og igjen finner vi *24*, Per sin alder.
4. I siste eksempel har vi spesifisert andre rad i den repeterende gruppen ved å evaluere i kontekst av `navn-1`.
   Her finner vi den nærmeste `alder`-komponenten `alder-1`, som er *36*, Kari sin alder.

{{% /expandlarge %}}

## Funksjoner

Disse funksjonene er tilgjengelige for bruk i uttrykk:

| Funksjonsnavn                                                        | Parametre                                          | Returverdi                      | Frontend | Backend | 
|----------------------------------------------------------------------|----------------------------------------------------|---------------------------------|----------|---------|
| [`equals`](#equals--notequals)                                       | [Streng](#strenger), [Streng](#strenger)           | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`notEquals`](#equals--notequals)                                    | [Streng](#strenger), [Streng](#strenger)           | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`not`](#not)                                                        | [Boolsk](#boolske-verdier)                         | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`greaterThan`](#greaterthan--greaterthaneq--lessthan--lessthaneq)   | [Tall](#tall), [Tall](#tall)                       | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`greaterThanEq`](#greaterthan--greaterthaneq--lessthan--lessthaneq) | [Tall](#tall), [Tall](#tall)                       | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`lessThan`](#greaterthan--greaterthaneq--lessthan--lessthaneq)      | [Tall](#tall), [Tall](#tall)                       | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`lessThanEq`](#greaterthan--greaterthaneq--lessthan--lessthaneq)    | [Tall](#tall), [Tall](#tall)                       | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`concat`](#concat)                                                  | Ingen eller flere [strenger](#strenger)            | [Streng](#strenger)             | ✅        | ✅       |
| [`and`](#and--or)                                                    | En eller flere [boolske verdier](#boolske-verdier) | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`or`](#and--or)                                                     | En eller flere [boolske verdier](#boolske-verdier) | [Boolsk](#boolske-verdier)      | ✅        | ✅       |
| [`if`](#if)                                                          | [Se detaljert beskrivelse](#if)                    | [Se detaljert beskrivelse](#if) | ✅        | ✅       |
| [`instanceContext`](#instancecontext-oppslag)                        | [Streng](#strenger)                                | [Streng](#strenger)             | ✅        | ✅       |
| [`frontendSettings`](#frontendsettings-oppslag)                      | [Streng](#strenger)                                | [Streng](#strenger)             | ✅        | ✅       |
| [`component`](#component-oppslag)                                    | [Streng](#strenger)                                | [Streng](#strenger)             | ✅        | ✅       |
| [`dataModel`](#datamodel-oppslag)                                    | [Streng](#strenger)                                | [Streng](#strenger)             | ✅        | ✅       |


### `equals` / `notEquals`
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

### `not`
TODO: Beskriv funksjonene

### `greaterThan` / `greaterThanEq` / `lessThan` / `lessThanEq`
TODO: Beskriv funksjonene

### `concat`
TODO: Beskriv funksjonen

### `and` / `or`
TODO: Beskriv funksjonene

### `if`
TODO: Beskriv funksjonen

### `instanceContext` (oppslag)
TODO: Beskriv funksjonen

### `frontendSettings` (oppslag)
TODO: Beskriv funksjonen

### `component` (oppslag)
TODO: Beskriv funksjonen

### `dataModel` (oppslag)
TODO: Beskriv funksjonen

## Datatyper
Funksjoner i uttrykkene har en forventning om at argumentene som blir sendt inn har en spefikk type. Dersom et argument
blir sendt inn har en annen type enn forventet, blir verdien til argumentet forsøkt konvertert til riktig type. Som
et eksempel forventer funksjonen `equals` at begge argumentene er strenger, men om du sender inn den boolske verdien
`true` som det ene eller andre argumentet fungerer det også fint, siden den boolske verdien `true` blir konvertert til
strengen `"true"`.

```json
["equals", true, "true"]
```

Uttrykket over fungerer, og gir `true` som resultat (fordi `true` og `"true"` sammenlignes som samme verdi ved at
`true` konverteres til `"true"` før sammenligningen). Dette gjør også at du kan kalle en funksjon som returnerer en
datatype og f.eks. sammenligne med en helt annen datatype. Les mer om hvilke datatyper som kan konverteres til hva
under.

Alle funksjoner som forventer en spesifikk datatype som argument vil også kunne fungere om man sender
inn [null](#null), men noen steder vil en `null`-verdi gi en feilmelding (f.eks. dersom man prøver å slå opp i
datamodellen med `["dataModel", null]`, mens i f.eks. `concat`-funksjonen vil en `null`-verdi bli konvertert til
en tom streng).

### Strenger
Strenger inneholder vilkårlig tekst, og er en bred datatype som tall og boolske verdier kan konverteres til. Funksjoner
som 
Noen strenger kan også konverteres til andre datatyper:

| Strengverdi                                                            | Kan erstatte               | Eksempler                  |
|------------------------------------------------------------------------|----------------------------|----------------------------|
| Heltall med eller uten negativt fortegn                                | [Tall](#tall)              | `3`, `-8`, `71254`         |
| Flyttall med eller uten negativt fortegn, med punktum istedenfor komma | [Tall](#tall)              | `3.14`, `-33.0`, `123.123` |
| `true` eller `false` med små eller store bokstaver                     | [Boolsk](#boolske-verdier) | `true`, `True`, `FALSE`    |
| `null` med små eller store bokstaver                                   | [Null](#null)              | `null`, `Null`, `NULL`     |

Alle andre strenger enn de i tabellen over vil gi feilmelding om de blir forsøkt konvertert til andre typer.

### Tall
Tallverdier gjelder positive og negative heltall og flyttall (tall med komma).
TODO: Beskriv tall

### Boolske verdier
TODO: Beskriv boolske verdier

### Null
Alle steder hvor man forventer å få inn en [streng](#strenger), [tall](#tall) eller [boolske verdier](#boolske-verdier)
skal 

## Vise/skjule hele sider
TODO: Beskriv hvordan uttrykk kan brukes til å vise/skjule hele sider
