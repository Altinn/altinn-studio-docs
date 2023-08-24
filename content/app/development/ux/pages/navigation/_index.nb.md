---
title: Navigasjon mellom sider
linktitle: Navigasjon
description: Hvordan sette opp navigasjon mellom sider.
toc: true
weight: 10
---

Navigering videre til neste side skjer via en navigerings-knapp. Denne må legges til manuelt i hver layout-fil hvor man ønsker navigering fremover. Navigering tilbake til forrige side gjøres via tilbake-pil i venstre hjørnet. Denne knappen vises alltid så lenge det er en side å gå tilbake til, og er ikke en del av layout-filen. Se bilde under.

![Navigeringsknapper](nav-button-next.png "Navigeringsknapper")

## Legge til knapp for navigering

Knapp for navigering legges inn i alle layout-filer der det er behov. Om man ønsker at den skal dukke opp nederst på siden, må den legges inn nederst i layout-filen. Eksempel vises under

```json
{
  "id": "nav-page2",
  "type": "NavigationButtons",
  "textResourceBindings": {
    "next": "next",
    "back": "back"
  },
  "dataModelBindings": {}
}
```

Det er også mulighet for å vise en `tilbake`-knapp sammen med `neste`-knappen, ved å legge til parameteren `"showBackButton": true` på komponenten.

![Navigeringsknapper med tilbakeknapp](nav-button-next-prev.png "Navigeringsknapper med tilbakeknapp")

| Parameter            | Beskrivelse                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| id                   | Unik ID, tilsvarende som for alle andre skjemakomponenter.                                                                            |
| type                 | Må være `"NavigationButtons"`                                                                                                         |
| textResourceBindings | Setter man parametre `next` (og evt. `back`) her, vil man kunne overstyre med egne tekster som vises på knappen(e). Se eksempel over. |
| showBackButton       | Valgfri. Gjør at 2 knapper (tilbake/neste) vises i stedet for bare en (neste).                                                        |

## Fremdriftsindikator

Det er mulig å aktivere en fremdriftsindikator som viser øverst i høyre hjørne av appen, som indikerer til brukeren
hvor langt man har kommet i utfyllingen av en applikasjon med flere sider.

![Fremdriftsindikator](progress.png "Fremdriftsindikator")

{{%notice info%}}
Alle sider i gjeldende [prosess-steg](../../../configuration/process) teller mot det totale antall sider som vises i
fremdriftsindikatoren. Hvis det er satt opp [sporvalg](../tracks) eller flere
[dynamisk skjulte sider](../../../logic/expressions#viseskjule-hele-sider) vil antallet kunne variere mye og oppføre seg
forvirrende for brukeren. Sjekk at fremdriftsindikatoren gir mening og verdi for brukeren før den aktiveres.
{{%/notice%}}

### Konfigurasjon

For å sette opp fremdriftsindikatoren, legg til denne linjen i `App/ui/Settings.json`-filen
(du kan eventuelt ha en `Settings.json`-fil per [layout-set](../layout-sets)):

```json {hl_lines=9}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "order": ["student-info", "school-work", "well-being"],
    "showProgress": true
  }
}
```

## Navigasjonsbar

Navigasjonsbar gir enkel tilgang til alle sider i en applikasjon.

{{%notice info%}}
Navigasjonsbar lister opp alle sider i appen, og egner seg derfor ikke til bruk ved sporvalg.
{{%/notice%}}

![Navigasjonsbar desktop](navigationbar-desktop.png "Navigasjonsbar desktop")

På store skjermer vil alle sider listes opp. Dersom det ikke er plass på en linje, vil listen brytes og fortsette på neste linje. På mindre skjermer vil alle sider være skjult i en meny. Den siden som er aktiv vil vises i menyen. Når menyen klikkes på, vil en liste over alle sider vises.

![Navigasjonsbar mobil - lukket og åpen](navigationbar-mobile.png "Navigasjonsbar mobil - lukket og åpen")

Navigasjonsbar legges inn i alle layoutfiler der den skal brukes. Eksempel på konfigurasjon:

```json
{
  "id": "navbar-page-1",
  "type": "NavigationBar"
}
```

Det er også mulighet å konfigurere komponenten NavigationBar til å vise alle sider i en meny også på større skjermer. Dette gjøres ved å legge til "compact": true. Eksempel på konfigurasjon:

```json
{
  "id": "navbar-page-1",
  "type": "NavigationBar",
  "compact": true
}
```

### Endre tekster på navigasjonsbarknapper

Teksten på navigasjonsbarknappene vil som standard bruke filnavnet på siden uten filendelsen. F.eks om man har `side1.json` og `side2.json` vil navigasjonsknappene hete `side1` og `side2`. For å overstyre disse tekstene, kan du legge til tekster i `resources.XX.json`, hvor `id` er navnet på filen uten filendelse. Eksempel:

```json
{
  "id": "side1",
  "value": "Første side"
},
{
  "id": "side2",
  "value": "Siste side"
},

```

## Rekkefølge

Standard rekkefølge for sidene er alfabetisk. Utover det kan man navngi hver side som man ønsker, det er da filnavnet som gjelder her. For å sikre at sidene kommer i ønsket rekkefølge kan man f.eks. sette en prefix med tall foran sidenavnet i filnavn. F.eks:

```
|- App/
  |- ui/
    |- layouts/
      |- 1.firstPage.json
      |- 2.secondPage.json
      |- 3.aFinalPage.json
```

Det er også mulig å styre rekkefølgen på sidene ved hjelp av `Settings.json` under `App/ui/`. Dette gjøres på følgende vis:

```json
{
  "pages": {
    "order": ["side2", "side1"]
  }
}
```

Her vil sidene da vises i rekkefølgen spesifisert i `pages.order`. Om denne array'en ikke settes i repo så vil man bruke alfabetisk rekkefølge som utgangspunkt for rekkefølgen på sidene.

Om du ønsker å dynamisk endre på rekkefølgen på sidene kan dette gjøres med [sporvalg.](../tracks/)

## Validering ved sidebytte

Det er mulig å trigge validering i det brukeren prøver å bevege seg til neste side, dersom det er valideringsfeil vil det stoppe brukeren fra å navigere. Dette kan gjøres ved å legge til en trigger på navigasjons-knapp komponenten. Eksempel:

```json
{
  "id": "7cbc1c00-4c8c-42b6-bcef-12b3c4c45373",
  "type": "NavigationButtons",
  "textResourceBindings": {
    "next": "Neste",
    "back": "Tilbake"
  },
  "triggers": ["validatePage"],
  "showBackButton": true
}
```

Det er tre ulike triggere som kan brukes ved side-navigasjon:

| Trigger                           | Beskrivelse                                                                                                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `validatePage`                    | Kjører validering på komponentene i den nåværende siden. IDen til siden som trigget valideringen sendes med til backend i headeren `LayoutId`.                                            |
| `validateAllPages`                | Kjører validering på alle komponentene i alle sider i skjemaet. Hindrer ikke brukeren å navigere dersom det ikke finnes valideringsfeil på nåværende eller tidligere sider i rekkefølgen. |
| `validateCurrentAndPreviousPages` | Kjører validering på alle komponentene i nåværende og tidligere sider i rekkefølgen.                                                                                                      |
