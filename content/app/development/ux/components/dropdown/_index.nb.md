---
title: Nedtrekksliste
linktitle: Nedtrekksliste
description: Inndataelement som lar brukeren velge kun ett alternativ i en liste med flere alternativer.
schemaname: Dropdown
weight: 10
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Nedtrekkslister brukes ofte i skjemaer for å samle input fra brukeren der de må velge kun ett av flere alternativer fra en liste.

**Bruksområder:**

* Når brukeren kun kan velge ett av flere alternativer.
* Når listen med alternativer er for lang til å vises som radioknapper (se [Relatert](#relatert)).
* For navigeringsmenyer

### Anatomi

![Anatomi Nedtrekksliste](Dropdown-anatomy.png)

{{% anatomy-list %}}
1. **Overskrift** - Spørsmål eller instruksjon.
2. **Trigger** - Klikk for å åpne menyen
3. **Meny** - Liste med alternativer
{{% /anatomy-list %}} 

### Beste praksis

- List alternativer i en logisk rekkefølge:
  - mest sannsynlig til minst sannsynlig å bli valgt
  - enklest til mest kompleks operasjon
  - minst til mest risiko
- Forhåndsvelg ett alternativ. Velg det tryggeste, mest sikre og private alternativet først. Hvis sikkerhet og personvern ikke er viktig, velg det mest sannsynlige eller praktiske alternativet.
- Hvis brukeren skal kunne unngå å velge, legg til et "Ingen" (eller tilsvarende) alternativ.
- Hvis du ikke kan ha en liste over alle mulige alternativer, legg til et "Annet" alternativ.
- Unngå alfabetisk sortering ettersom det er avhengig av språket og ikke kan lokaliseres.
- Unngå overlappende alternativer. For eksempel, Velg alder: 0-20, 20-40 — Hva velger du hvis alderen din er 20?
- Inkluder alle relevante alternativer. For eksempel, Velg alder: Under 20, Over 20 — Hva velger du hvis du er 20?

### Veiledning for innhold

* Hold etikettene korte og beskrivende.
* Begynn alle etiketter med stor bokstav.
* Ikke inkluder tegnsetting etter etikettene.

### Relatert

* For enkeltvalg med få alternativer, bruk [radionkapper](../radiobuttons/).
* Hvis brukeren kan velge flere alternativ fra en liste, bruk [Avkrysningsbokser](../checkboxes/).
* For en mer kompakt måte å vise flere alternativer med flervalg, bruk [MultipleSelect](../multipleselect/).

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema (se link).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

<!-- Shortkoden `component-props` genererer automatisk en liste over komponentegenskaper fra komponentens JSON schema.
Komponentnavnet kan gis eksplisitt som argument (f.eks. `component-props "Grid"`).
Hvis ingen argument gis, henter shortkoden komponentnavnet fra 'schemaname' i frontmatter. -->

{{% component-props %}}

## Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/app/getting-started/ui-editor/) ved å dra den fra komponent-listen til sideområdet.
Når du velger komponenten, vises innstillingspanelet for den.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Grunnleggende komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-12"}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
            "id": "Dropdown-id",
            "type": "Dropdown",
            "dataModelBindings": {
                "simpleBinding": ""
            }
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Tekst (`textResourceBindings`)

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan opprette en ny tekst ved å klikke på pluss-tegnet eller velge en eksisterende ved å klikke på forstørrelsesglasset. Se [Legge til og endre tekster i en app](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app) for mer info.

![Tekst innstillinger. Skjermbilde](../Tekst-settings-all.png "Innstillinger for tekst")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Tekst kan legges til direkte som en tekststreng eller ved å oppgi nøkkelen til en [tekstressurs](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app).

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-10"}
{
  "id": "komponent-id",
  "type": "Dropdown",
  "textResourceBindings": {
          "title": "",
          "description": "",
          "help": "",
          "shortName": "",
          "tableTitle": ""
        }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

**Tekst anatomi**

![Tekst anatomi. Skjermbilde](Dropdown-text-anatomy.png)

{{% anatomy-list %}}
1. **Ledetekst** (`textResourceBindings.title`): Overskrift med spørsmål eller instruksjon.
2. **Beskrivelse** (`textResourceBindings.description`): Tekst for ytterligere beskrivelse eller utdyping.
3. **Hjelpetekst** (`textResourceBindings.help`): Når hjelpetekst er fylt ut vil et spørsmålstegn vises ved siden av ledeteksten. Klikk på spørsmålstegnet for å vise teksten som en popup.
Kan brukes til forklaring, eksempler, brukssituasjoner osv.

- **Kortnavn** (`textResourceBindings.shortName`): Overstyrer tittelen til komponenten som brukes i den standard `required` valideringsmeldingen.
- **Tittel i tabell** (`textResourceBindings.tableTitle`): Overstyrer tittelen til komponenten som blir brukt i kolonneheader når komponenten befinner seg i repeterende grupper.
{{% /anatomy-list %}}

### Datamodell

For at det skal være mulig å lagre og manipulere informasjonen må komponenten kobles til et felt i en [datamodell](/nb/app/development/data/data-modeling/#datamodeller).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Velg feltet du ønsker å koble komponenten til fra nedtrekksmenyen.
 Hvis det ikke er noen felter tilgjengelig må du først [laste opp en datamodell](/nb/app/development/data/data-modeling/#laste-opp-og-vise-datamodell).

![Innstillinger datamodell. Skjermbilde](../Datamodell-settings.png)

{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

Legg navnet på feltet du ønsker å koble komponenten til i krøllparenteser under `dataModelBindings`.

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-6"}
{
  "id": "komponent-id",
  ...
  "dataModelBindings": {
    "simpleBinding": "MyDataModel.SomeField"
    }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Legge til alternativer

Alternativer kan legges til manuelt eller ved hjelp av [kodelister](/nb/app/development/data/options).

#### Manuelt (`options`)

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
Velg "Manuelt" og klikk "Legg til flere" for å til et nytt alternativ. Velg eller opprett ny tekst for å legge til etikett (`label`).

Alternativet kommer med en forhåndsutfylt verdi (`value`), som er dataen som lagres når brukeren gjør et valg.
 Verdien lagres som en streng og kan endres etter ønske.

![Innstillinger for Alternativer lagt til manuelt](Manuelt-settings.png "Alternativer lagt til manuelt")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="5-10"}
{
  "id": "komponent-id",
  "type": "Dropdown",
  ...
  "options": [
          {
            "label": "Alternativ 1",
            "value": "1"
          }
        ]
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

#### Kodeliste (`optionsId`)

En [kodeliste](/nb/app/development/data/options) er en forhåndsdefinert liste med alternativer.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

For å legge til alternativer fra en kodeliste, velg 'Kodeliste' og angi en kodeliste ID.
 For å bruke en egendefinert (dynamisk) kodeliste, klikk på "Bytt til egendefinert kodeliste".

![Kodeliste innstillinger. Skjermbilde](../Kodeliste-settings.png)

Om du ønsker å [sikre dynamiske kodelister](/nb/app/development/data/options/dynamic-codelists/#sikrede-dynamiske-kodelister) kan du huke av for dette:

![Sikret API innstilling](../Sikret-API-settings.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-5"}
{
  "id": "komponent-id",
  ...
  "optionsId": "land",
  "secure": true
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

#### Kilde (`source`)

En siste måte å legge til alternativer er å koble komponenten til en kodeliste basert på skjemadata lagret i selve appen.
Dette gjør du ved å legge til en kilde (`source`); se [dokumentasjon](/nb/app/development/data/options/repeating-group-codelists/) for hvordan dette konfigureres.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstilling kilde. Skjermbilde](../Kilde-settings.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-9"}
{
  "id": "komponent-id",
  ...
  "source": {
    "group": "some.group",
    "label": "option.label",
    "value": "some.group[{0}].someField",
    "description": "Some description",
    "helpText": "Some help text"
  }
}
...
```
{{</content-version-container>}}
{{</content-version-selector>}}

**Dokumentasjon for kodelister**
- [Koble en komponent til kodeliste](/nb/app/development/data/options/#koble-en-komponent-til-kodeliste)
- [Statiske kodelister](/nb/app/development/data/options/static-codelists/)
- [Dynamiske kodelister](/nb/app/development/data/options/dynamic-codelists/)
- [Dynamiske kodelister fra repeterede grupper i datamodellen](/nb/app/development/data/options/repeating-group-codelists/)

### Innstillinger for Dropdown

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstillinger skrivebeskyttet, påkrevd, indeks](Dropdown-innstillinger.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-6"}
{
  "id": "komponent-id",
  ...
  "readOnly": false,
  "required": true,
  "preselectedOptionsIndex": 0
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

- **Feltet skal være skrivebeskyttet** (`readOnly`): Deaktiverer komponenten når huket av (`true`). Komponenten vises dimmet og det er ikke mulig å gjøre valg.
- **Feltet skal være påkrevd** (`required`): Krever at det gjøres et valg når huket av (`true`). Indikeres av stjerne ved overskrift.
- **Forhåndsvalgt verdi** (`preselectedOptionsIndex`): Sett en forhåndsvalgt verdi. Alternativene er nullindeksert, så det første alternativet er `0`, det andre `1`, osv.

**Eksempler**

![Eksempel påkrevd og forhåndsvalg](Eksempel-required-preselect.png "Eksempel påkrevd og forhåndsvalg")

![Eksempel skrivebeskyttet. Skjermbilde](eksempel-readOnly.png "Eksempel skrivebeskyttet")


### Generelle innstillinger

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstilling oppsummering og skjult](../innstilling-oppsummering-skjules.png)

![Innstilling sideskift](../innstilling-sideskift.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-9"}
{
  "id": "komponent-id",
  ...
  "renderAsSummary": false,
  "hidden": false,
  "pageBreak": {
    "breakBefore": "auto",
    "breakAfter": "auto"
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

- **Oppsummering** (`renderAsSummary`): Indikerer om feltet skal være med i oppsummering eller ikke (standard: `false`).
- **Feltet skal skjules** (`hidden`): Indikerer om feltet skal skjules eller ikke (standard: `false`).
- **PDF-innstillinger** (`pageBreak`): Indikerer om en sideskift skal legges til før eller etter komponenten. Kan være enten: `auto` (standard), `always` (alltid) eller `avoid` (unngå).


---

{{% notice info %}}
Følgende innstillinger er ikke støttet i skjemaeditor ennå, men kan konfigureres manuelt.
{{% /notice %}}

### Horisontal justering med `grid`

`grid`-egenskapen kontrollerer horisontal justering av komponenten basert på en layout med 12 kolonner.
 Elementer tildeles brøkdeler av 12 som bestemmer deres bredde i forhold til skjermbredden.
  I eksemplet nedenfor setter vi komponentens bredde til 2/12 av skjermbredden for alle skjermstørrelser (fra `xs` og opp).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=["4-6"]}
{
  "id": "komponent-id",
  ...
  "grid": {
      "xs": 2,
    }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

Du kan også bruke `grid` for å sidestille komponenter.

Se [Sidestilte komponenter (grid)](/nb/app/development/ux/styling/#sidestilte-komponenter-grid) for detaljer og eksempler.

<!-- ## Eksempler -->