---
draft: true
title: Datatyper
linktitle: Datatyper
description: Oversikt over datatyper som brukes i uttrykk.
tags: [dynamics, expressions, needsReview]
toc: true
---

## Datatyper

Funksjoner i uttrykkene forventer at argumentene som sendes inn, har en spesifikk type. Hvis et argument har en annen type enn forventet, forsøkes verdien konvertert til riktig type. Som eksempel forventer funksjonen `equals` to strenger, men hvis du sender inn den boolske verdien `true` som det ene eller andre argumentet, fungerer det også fint, siden den boolske verdien `true` konverteres til strengen `"true"`.

```json
["equals", true, "true"]
```

Uttrykket over fungerer, og gir `true` som resultat (fordi `true` og `"true"` sammenlignes som samme verdi ved at
`true` konverteres til `"true"` før sammenligningen). Dette gjør også at du kan kalle en funksjon som returnerer en
datatype og f.eks. sammenligne med en helt annen datatype. Les mer om hvilke datatyper som kan konverteres til hva
under.

Alle funksjoner som forventer en spesifikk datatype som argument, vil også kunne fungere hvis du sender inn [`null`](#null), men noen steder vil en `null`-verdi gi en feilmelding - for eksempel hvis du prøver å slå opp i datamodellen med `["dataModel", null]`. I `concat`-funksjonen vil derimot en `null`-verdi tolkes som en tom streng.

### Strenger

Strenger inneholder vilkårlig tekst, og er en bred datatype som tall og boolske verdier kan konverteres til.

Noen strenger kan også konverteres til andre datatyper:

| Strengverdi                                        | Kan erstatte               | Eksempler                  |
| -------------------------------------------------- | -------------------------- | -------------------------- |
| Heltall med eller uten negativt fortegn            | [Tall](#tall)              | `3`, `-8`, `71254`         |
| Desimaltall med eller uten negativt fortegn        | [Tall](#tall)              | `3.14`, `-33.0`, `123.123` |
| `true` eller `false` med små eller store bokstaver | [Boolsk](#boolske-verdier) | `true`, `True`, `FALSE`    |
| `null` med små eller store bokstaver               | [Null](#null)              | `null`, `Null`, `NULL`     |

Alle andre strenger enn de i tabellen over vil gi feilmelding hvis de forsøkes konvertert til andre typer.

### Tall

Tallverdier gjelder positive og negative heltall og desimaltall. Noen strenger konverteres også automatisk til en tallverdi, som vist i tabellen til strenger over. For at konvertering av en streng til et tall skal fungere, må strengen oppfylle følgende:

- strengen inneholder bare et tall, ingen annen tekst foran eller bak tallet
- negativt fortegn (`-`) kan brukes, men positivt fortegn (`+`) støttes ikke
- desimaltall må representeres med punktum, ikke komma
- tusenskilletegn eller annen tallformattering støttes ikke

Alle andre strenger vil gi en feilmelding hvis de forsøkes konvertert til et tall. Hvis du forsøker å konvertere en [boolsk verdi](#boolske-verdier) til et tall, gir det også en feilmelding.

Funksjoner som forventer å få inn et tall kan også få inn [`null`](#null). Se mer om hvilken effekt det har under
beskrivelsen til hver funksjon.

### Boolske verdier

Boolske verdier omfatter `true` (sann) og `false` (usann). Når du kaller en funksjon som forventer å få inn en boolsk verdi, kan du også sende inn enkelte andre typer, som konverteres til en boolsk verdi:

- tallene `1` og `0` fungerer som henholdsvis `true` og `false`
- strengene `"1"` og `"0"` fungerer likt som tallene (og blir henholdsvis `true` og `false`)
- strengene `"true"` og `"false"` konverteres også til en boolsk verdi
- verdien [`null`](#null) fungerer likt som `false`

Alle andre verdier gir en feilmelding hvis de sendes til en funksjon som forventer en boolsk verdi. Legg merke til
at disse reglene er litt forskjellige fra reglene til [strenger](#strenger). Det er dermed forskjell på hvilke verdier
som kan _tolkes_ som en boolsk verdi for en funksjon som forventer et boolsk argument - og hvilke verdier som er _like_
en boolsk verdi. Funksjonen ```equals``` sammenligner verdier som strenger, og dermed vil tallet `1` og
strengen `"1"` sammenlignes som like, men den vil ikke gjenkjenne `1` og `true` som like verdier.

Det kan kanskje se ut som følgende uttrykk er like:

1. `"hidden": ["dataModel", "hideName"]`
2. `"hidden": ["equals", ["dataModel", "hideName"], true]`
3. `"hidden": ["if", ["dataModel", "hideName"], true, "else", false]`

Hvis verdien (her gitt fra oppslaget `["dataModel", "hideName"]`) er `true` eller `"true"` vil
komponenten skjules, men dersom verdien er `1` eller `"1"` vil komponenten bare skjules med uttrykkene i alternativ
1 og 3. Dette fordi resultatet i uttrykket for `hidden` konverteres til en boolsk verdi, og
`if` forventer en boolsk verdi som første argument. Derimot vil `equals` sammenligne verdiene som strenger,
og `"1"` er ikke lik `"true"`.

Se også tips og triks under [_Streng eller mindre streng sammenligning?_](#streng-eller-mindre-streng-sammenligning)

### Null

De fleste steder hvor du forventer å få inn en [streng](#strenger), [tall](#tall) eller [boolske verdier](#boolske-verdier), skal også tåle en `null`-verdi. Null-verdier indikerer at en spesifikk verdi mangler, og det er forskjell på for eksempel en `null`-verdi, en tom [streng](#strenger) og [tallet](#tall) `0`.

Hvis du gjør et oppslag i en funksjon som `dataModel`, og verdien du leter etter ikke finnes eller er satt, vil `null` som regel bli resultatet.

### Datoer

Datoer kan være strenger (eller `DateTime`/`DateOnly` i C#-datamodellen). Bare noen få datoformater kan tolkes
i uttrykksfunksjoner som tillater datoer som argument, og formatet må følge ISO 8601.

Noen eksempler på gyldige datoformater:

- `2023-10-30T14:54:00.000Z` (UTC-tidssone)
- `2023-10-30T14:54:00.000+02:00` (med tidssoneforskyvning)
- `2023-10-30T14:54:00.000` (antatt å være i lokal tidssone)
- `2023-10-30T14:54:00` (antatt å være i lokal tidssone, uten millisekunder)
- `2023-10-30` (bare dato, antatt å være midnatt i lokal tidssone)
- `2023` (bare år, antatt å være midnatt 1. januar i lokal tidssone)

{{% notice info %}}
Det er viktig å merke seg at datoer som inkluderer en tidssoneforskyvning (eller `Z` for UTC) blir konvertert til
lokal tidssone når de brukes i uttrykk. Dette betyr at bruk av funksjonen `formatDate` for å formatere en dato kan gi
forskjellige resultater på frontend og backend dersom tidssonen på serveren er forskjellig fra brukerens tidssone i
nettleseren.

Av denne grunn kan det være å foretrekke å spesifisere datoer og tider uten en tidssoneforskyvning eller `Z` dersom du
ønsker at datoen/tiden skal vises på samme måte uavhengig av brukerens tidssone. På samme vis er det anbefalt å unngå
å sammenligne datoer i forskjellige tidssoner.
{{% /notice %}}

## Streng eller mindre streng sammenligning?

Måten uttrykkene kjøres på, gjør at de kan virke litt strenge (ved at for eksempel `0` og `null` er ulike verdier når du sammenligner med `equals`). Det er et designvalg gjort i Altinn av to grunner:

1. Strenge regler er tydelige regler. Uttrykkene vil heller gi en feilmelding hvis noe ikke er som forventet, enn å la deg lure på hvorfor det ble som det ble.
2. Hvis uttrykkene behandler mange ulike verdier som like, fratar vi deg muligheten til å skille mellom dem hvis du skulle ønske det.

Hvis du ønsker mindre streng sammenligning, kan du for eksempel konstruere et uttrykk som bruker ```or```-funksjonen til å gjenkjenne flere forskjellige verdier:

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
