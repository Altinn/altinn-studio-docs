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

```json {linenos=false,hl_lines=[5]}
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

**At 62, your are eligible for retirement**

Og for en person som er 15 år (eller yngre, som f.eks. en 4-åring), returneres teksten:

**At 4, you should stay in (pre)school**
{{% /expandlarge %}}


### Bruksområder

Dynamiske uttrykk er foreløpig tilgjengelig for bruk i disse egenskapene, som definert i [layout-filer](../../ux/pages).

| Komponenter                                               | Egenskap                                        | Forventet verdi            | Frontend | Backend |
|-----------------------------------------------------------|-------------------------------------------------|----------------------------|----------|---------|
| [Sider/layouts](#viseskjule-hele-sider)                   | `hidden`                                        | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Alle                                                      | `hidden`                                        | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Skjemakomponenter                                         | `required`                                      | [Boolsk](#boolske-verdier) | ✅        | ✅       |
| Skjemakomponenter                                         | `readOnly`                                      | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating) | `edit.addButton`                                | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating) | `edit.saveButton`                               | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating) | `edit.deleteButton`                             | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| [Repeterende grupper](../../ux/fields/grouping/repeating) | `edit.saveAndNextButton`                        | [Boolsk](#boolske-verdier) | ✅        | ❌       |
| Alle                                                      | `textResourceBindings.[textResourceBinding]` *  | [Streng](#strenger)        | ✅        | ❌       |

\* = Hvilke verdier man kan overstyre med textResourceBindings varierer fra komponent til komponent, men vil fungere på
alle steder der det brukes. TextResourceBindigs for repeterende grupper finner du [her](../../ux/fields/grouping/setup#textresourcebindings)

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
   "children": [
      "field-id-one",
      "field-id-two",
   ],
   "dataModelBindings": {
      "group": "Citizen.FormerAdresses"
   },
   "maxCount": 10,
   "textResourceBindings": {
      "edit_button_open": [
      "if",
      [ "dataModel", "Citizen.FormerAdresses.IsPrefill" ],
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

| Funksjonsnavn                                | Parametre                                          | Returverdi                           | Frontend | Backend | 
|----------------------------------------------|----------------------------------------------------|--------------------------------------|----------|---------|
| [`equals`](#func-equals)                     | [Streng](#strenger), [Streng](#strenger)           | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`notEquals`](#func-equals)                  | [Streng](#strenger), [Streng](#strenger)           | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`not`](#func-not)                           | [Boolsk](#boolske-verdier)                         | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`greaterThan`](#func-gt)                    | [Tall](#tall), [Tall](#tall)                       | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`greaterThanEq`](#func-gt)                  | [Tall](#tall), [Tall](#tall)                       | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`lessThan`](#func-gt)                       | [Tall](#tall), [Tall](#tall)                       | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`lessThanEq`](#func-gt)                     | [Tall](#tall), [Tall](#tall)                       | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`concat`](#func-concat)                     | Ingen eller flere [strenger](#strenger)            | [Streng](#strenger)                  | ✅        | ✅       |
| [`and`](#func-and)                           | En eller flere [boolske verdier](#boolske-verdier) | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`or`](#func-and)                            | En eller flere [boolske verdier](#boolske-verdier) | [Boolsk](#boolske-verdier)           | ✅        | ✅       |
| [`if`](#func-if)                             | [Se detaljert beskrivelse](#func-if)               | [Se detaljert beskrivelse](#func-if) | ✅        | ✅       |
| [`instanceContext`](#func-instancecontext)   | [Streng](#strenger)                                | [Streng](#strenger)                  | ✅        | ✅       |
| [`frontendSettings`](#func-frontendsettings) | [Streng](#strenger)                                | [Streng](#strenger)                  | ✅        | ✅       |
| [`dataModel`](#func-datamodel)               | [Streng](#strenger)                                | [Streng](#strenger)                  | ✅        | ✅       |
| [`component`](#func-component)               | [Streng](#strenger)                                | [Streng](#strenger)                  | ✅        | ✅       |

Detaljerte beskrivelser og eksempler

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
  "hidden": ["not",
    ["or",
       ["dataModel", "ShowLastName"],
       ["frontendSettings", "ShowAllFields"]
    ]
  ]
}
```
{{% /expandlarge %}}

{{% expandlarge id="func-gt" header="greaterThan / greaterThanEq / lessThan / lessThanEq" %}}
Disse 4 funksjonene forventer to tall inn, og sammenligner om _det første_ med _det andre_. Det vil si, for funksjonen
`greaterThan` er uttrykket sant dersom det første tallet er _større enn_ det andre.

| Funksjon        | Beskrivelse                                                   | Symbol |
|-----------------|---------------------------------------------------------------|--------|
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
["concat",
   "Gratulerer med ",
   ["component", "alder"],
   "-årsdagen!"
]
```

Uttrykket over gir teksten `Gratulerer med 18-årsdagen!` dersom verdien i alder-komponenten var `18`.

I `concat`-funksjonen tolkes [`null`](#null)-verdier som tomme strenger. [Boolske verdier](#boolske-verdier) skrives
ut som strengene `"true"` og `"false"`.
{{% /expandlarge %}}

{{% expandlarge id="func-and" header="and / or" %}}
Funksjonene `and` og `or` forventer 1 eller flere boolske verdier, og gir et resultat ut fra om henholdsvis _alle_ eller
_minst en_ av verdiene var sanne (`true`).

| Funksjon | Beskrivelse                                     |
|----------|-------------------------------------------------|
| `and`    | Er **alle** argumentene sanne? (`true`)         |
| `or`     | Er **minst ett** av argumentene sanne? (`true`) |

Gir man [`null`](#null)-verdier tolkes disse som usann (`false`). Eksempler på bruk finnes
under [_Streng eller mindre streng sammenligning?_](#streng-eller-mindre-streng-sammenligning)
{{% /expandlarge %}}

{{% expandlarge id="func-if" header="if" %}}
`if`-funksjonen kan brukes for å forgrene et uttrykk slik at returverdien styres av resultatet av et annet
boolsk uttrykk. Funksjonen kan kalles på to forskjellige måter; med 2 eller 4 argumenter:

| Argument        | Alternativ 1                 | Alternativ 2                 |
|-----------------|------------------------------|------------------------------|
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
["if",
   ["greaterThan", ["component", "birthYear"], 1945],
   "Du ble født etter verdenskrigene",
"else",
  ["if",
     ["greaterThanEq", ["component", "birthYear"], 1939],
     "Du ble født under andre verdenskrig",
  "else",
     "Du ble født før andre verdenskrig"
  ]
]
```
{{% /expandlarge %}}

{{% expandlarge id="func-instancecontext" header="instanceContext (oppslag)" %}}
Denne funksjonen gjør det mulig å hente ut informasjon om gjeldende instans. Følgende nøkler kan brukes fom første
argument:

| Nøkkel                   | Verdi                          | Eksempelverdi                                       |
|--------------------------|--------------------------------|-----------------------------------------------------|
| `instanceId`             | Gjeldende instans-ID           | `512345/48c31ffc-dcdd-416d-8bc7-194bec3b7bf0`       |
| `instanceOwnerPartyId`   | Gjeldende aktør-ID             | `512345`                                            |
| `instanceOwnerPartyType` | Hva slags aktør eier instansen | `"org", "person", "selfIdentified" eller "unknown"` |
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

| Strengverdi                                                            | Kan erstatte               | Eksempler                  |
|------------------------------------------------------------------------|----------------------------|----------------------------|
| Heltall med eller uten negativt fortegn                                | [Tall](#tall)              | `3`, `-8`, `71254`         |
| Flyttall med eller uten negativt fortegn, med punktum istedenfor komma | [Tall](#tall)              | `3.14`, `-33.0`, `123.123` |
| `true` eller `false` med små eller store bokstaver                     | [Boolsk](#boolske-verdier) | `true`, `True`, `FALSE`    |
| `null` med små eller store bokstaver                                   | [Null](#null)              | `null`, `Null`, `NULL`     |

Alle andre strenger enn de i tabellen over vil gi feilmelding om de blir forsøkt konvertert til andre typer.

### Tall
Tallverdier gjelder positive og negative heltall og flyttall (tall med komma). Noen strenger blir også konvertert
automatisk til en tallverdi, som vist i tabellen til strenger over. For at konvertering av en streng til et tall
skal fungere, må strengen oppfylle følgende:

* Strengen inneholder bare et tall, ingen annen tekst foran/bak tallet
* Negativt fortegn (`-`) kan brukes, men positivt fortegn (`+`) støttes ikke.
* Flyttall må representeres med punktum, ikke komma.
* Tusenskilletegn eller annen tallformattering støttes ikke.

Alle andre strenger vil gi en feilmelding om de blir forsøkt konvertert til et tall. Forsøker man å konvertere en
[boolsk verdi](#boolske-verdier) til et tall, gir det også en feilmelding.

Funksjoner som forventer å få inn et tall kan også få inn [`null`](#null). Se mer om hvilken effekt det har under
beskrivelsen til hver funksjon.

### Boolske verdier
Boolske verdier omfatter `true` (sann) og `false` (usann). Når man kaller en funksjon som forventer å få inn en boolsk
verdi, kan man også sende inn enkelte andre typer, som blir konvertert til en boolsk verdi:

* Tallene `1` og `0` fungerer som henholdsvis `true` og `false`
* Strengene `"1"` og `"0"` fungerer likt som tallene (og blir henholdsvis `true` og `false`)
* Strengene `"true"` og `"false"` konverteres også til en boolsk verdi
* Verdien [`null`](#null) fungerer likt som `false`

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

## Tips og triks

### Vise/skjule hele sider
Uttrykk kan brukes til å vise/skjule hele sider. I eksempelet under vil hele siden  skjules dersom en komponent
(på en av de andre sidene) har verdien _no_ eller ikke er satt.

```json
{
   "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
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

Dette kan sees på som et alternativ til [sporvalg-funksjonaliteten](../../ux/pages/tracks), men i motsetning til
sporvalg gjøres utregningen av disse uttrykkene i _både_ frontend _og_ backend, dermed er det ikke nødvendig å legge
til `"triggers": ["calculatePageOrder"]` for å få funksjonaliteten til å fungere.

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
["or",
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
["or",
   ["dataModel", "My.Path"],
   ["equals", ["dataModel", "My.Path"], ""]
]
```
