---
title: Avkrysningsbokser
linktitle: Avkrysningsbokser
description: Inndataelement som lar brukeren velge eller fjerne valg for ett eller flere alternativer.
schemaname: Checkboxes # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
aliases:
- checkbox
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Avkrysningsbokser brukes ofte i skjemaer for å samle input fra brukeren,
 slik at de kan velge ett eller flere alternativer fra en liste.
 
 #### Bruk avkrysningsbokser når:
 * Brukere kan velge flere alternativer fra en liste.
 * Det må gjøres et eksplisitt valg for å bruke innstillingene (f.eks. bekrefte at brukeren har lest et dokument).

### Anatomi

![Anatomi avkrysningsbokser](Checkboxes-anatomy.png)

{{% anatomy-list %}}
1. **Overskrift** - Spørsmål eller instruksjon.
2. **Avkrysningsboks** - Valgkontrollen.
3. **Etikett** - Tekstetikett knyttet til avkrysningsboksen.
{{% /anatomy-list %}} 

### Stil

* Avkrysningsbokser bør alltid ha en tilknyttet etikett på høyre side.

### Beste praksis

* Avkrysningsbokser med deaktivert valg bør unngås.
    Hvis et alternativ er utilgjengelig bør det fjernes og en forklaring gitt for hvorfor alternativet mangler.

 ### Veiledning for innhold

* Hold etikettene korte og beskrivende.
* Begynn alle etiketter med stor bokstav.
* Ikke inkluder tegnsetting etter etikettene.

### Relatert

* For en mer kompakt måte å vise flere alternativer med flervalg, bruk [MultipleSelect](../multipleselect/).
* Hvis brukeren bare kan velge ett alternativ fra en liste, bruk [RadioButtons](../radiobuttons).
* For en mer kompakt måte å vise flere alternativer med enkeltvalg, bruk en [rullegardinmeny](../dropdown).

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

```json{hl_lines="6-14"}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "Image-id",
          "type": "Image",
          "image": {
            "src": {},
            "width": "100%",
            "align": "center"
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
  "type": "Checkboxes",
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

![Tekst anatomi. Skjermbilde](Checkboxes-text-anatomy.png)

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
Verdiene til alternativene lagres som streng.

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

### Legge til avkrysningsbokser

Avkrysningsbokser kan legges til manuelt eller ved hjelp av [kodelister](/nb/app/development/data/options).

#### Manuelt (`options`)

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
Velg "Manuelt" og klikk "Legg til flere" for å til en ny avkrysningsboks. Velg eller opprett ny tekst for å legge til etikett (`label`).

Avkrysningsboksen kommer med en forhåndsutfylt verdi (`value`), som er dataen som lagres når brukeren gjør et valg.
 Endre verdien til det som passer.

![Innstillinger for avkrysningsbokser lagt til manuelt](Manuelt-settings.png "Avkrysningsboks lagt til manuelt")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-9"}
{
  "id": "komponent-id",
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
    "label": "dropdown.label",
    "value": "some.group[{0}].someField",
    "description": "",
    "helpText": ""
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

### Innstillinger for avkrysningsbokser

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstillnger skrivebeskyttet, påkrevd, visning, indeks](../innstillinger-skrivebeskyttet-required-visning-indeks.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-7"}
{
  "id": "komponent-id",
  ...
  "readOnly": false,
  "required": true,
  "layout": "row",
  "preselectedOptionsIndex": 0
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

- **Feltet skal være skrivebeskyttet** (`readOnly`): Deaktiverer komponenten når aktivert (`true`).
- **Feltet skal være påkrevd** (`required`): Krever at det gjøres et valg når aktivert (`true`).
- **Visning** (`layout`): Kan være kolonne (`column`) (standard for mer enn to alternativer) eller rad (`row`) (standard for opp til to alternativer).
- **Forhåndsvalgt verdi** (`preselectedOptionsIndex`): Sett en forhåndsvalgt verdi. Alternativene er nullindeksert, så det første alternativet er `0`, det andre `1`, osv.

![Eksempel visning column. Skjermbilde](Visning-column.png "Visning 'column'")

![Eksempel visning row. Skjermbilde](Visning-row.png "Visning 'row'")

![Eksempel skrivebeskyttet, påkrevd, forhåndsvalg](checkboxes-readonly-required-preselected.png "Skrivebeskyttet, påkrevd og forhåndsvalg")

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