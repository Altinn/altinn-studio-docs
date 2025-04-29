---
title: Alert (Varsel)
linktitle: Alert
description: Med Varsel kan du vise meldinger til brukerne med ulike alvorlighetsgrader.
schemaname: Alert # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
aliases:
- alertcomponent
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Bruk varsler når du vil vise viktig informasjon til brukerne.

### Anatomi

<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="300" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-4276&viewport=854%2C1675%2C0.89&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A4276&show-proto-sidebar=0&embed-host=share&hide-ui=true" allowfullscreen></iframe>

{{% anatomy-list %}}
1. **Overskrift**: En kort beskrivende tittel .
2. **Ikon**: Et grafisk symbol som formidler alvorlighetsgraden av varselet.
3. **Tekstinnhold**: Skritlig informasjon eller beskjed assosiert med varselet.
{{% /anatomy-list %}}

### Tilgjengelighet

Komponenten får ikke automatisk `role="alert"`. Dette betyr at skjermlesere ikke vil behandle den som en varsel.
En Alert bør bare ha `role="alert"` hvis den vises i brukergrensesnittet som et resultat av en handling brukeren har tatt.
Vi legger automatisk til `role="alert"` hvis `Alert` har en `hidden`-egenskap satt til false. Dette betyr at `Alert`-en
ble synlig for brukeren basert på en handling brukeren tok.

<!-- 
Legg til følgende seksjoner dersom de er relevante:

### Oppførsel

(Hvordan komponenten oppfører seg i ulike sammenhenger.)

### Stil

(Visuell styling, e.g. plassering, padding, "dos and don'ts")

### Beste praksis

(Bransjestandarder, "dos and don'ts")

### Veiledning for innhold

(E.g. regler for tegnsetting, standard etiketter, etc.)

### Mobil

(Hvordan implementere komponent i mobile miljøer.)

-->
### Relatert

- [`Panel`](../panel/)


## Egenskaper

| **Egenskap** | **Type**                                       | **Beskrivelse**                                                                               |
|--------------|------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `severity`   | string | Strengverdi som angir alvorlighetsgraden til varselet. Dette påvirker utseendet til varselet. **Enum:** `"success" \| "info" \| "danger" \| "warning"`|

<!-- Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema (se link).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}} -->

<!-- Shortkoden `component-props` genererer automatisk en liste over komponentegenskaper fra komponentens JSON schema.
Komponentnavnet kan gis eksplisitt som argument (f.eks. `component-props "Grid"`).
Hvis ingen argument gis, henter shortkoden komponentnavnet fra 'schemaname' i frontmatter. -->

<!-- {{% component-props %}} -->

## Konfigurering

### Legg til komponent

Du legger til komponenter i [Altinn Studio Designer](/nb/altinn-studio/getting-started/) ved å klikke på **Legg til komponent** når du står på en side i **Utforming**. 
Du får opp de mest brukte komponentene, og kan klikke på **Vis alle** for å få en oversikt over alle komponentene i Altinn Studio. 
Når du klikker på komponenten du vil legge til, vises den i et panel til høyre. Der kan du endre ID-en til komponenten hvis du vil, før du klikker på **Legg til**. Når du har lagt den til på siden, ser du egenskapene til kompoenten, og du kan endre dem.

### Innstillinger i Altinn Studio Designer

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende,
  men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Innstillinger for egenskaper tilgjengelig i Altinn Studio Designer.

![Altert innstillingspanel](Alert-settings-panel.png "Innstillinger for Alert")

- **Komponent-ID** (`id`): Automatisk generert komponent-ID (du kan endre den).
- **Ledetekst** (`textResourceBindings.title`): Overskriften til varselet. Skriv en kort og informativ overskrift. Den skal forteller brukerne hva varselet dreier seg om.
- **Tekstinnhold** (`textResourceBindings.body`): Utdyp innholdet i varselet. Pass på at du tar med informasjon som hjelper brukerne videre.
- **Alvorlighetsgrad** (`severity`): Alvorlighetsgraden angir utsteendet på varselet med farger og ikon. Vi har fire alvorlighetsgrader: `info`, `success`, `warning`, og `danger`. Les mer på designsystemet.no om når du bruker de ulike.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Korresponderende innstillinger i sidens JSON-fil.

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=""}
{
  "data": {
    "layout": [
      {
        "id": "alert-id",
        "type": "Alert",
        "severity": "info",
        "textResourceBindings": {
          "title": "",
          "body": ""
        }
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Overskrift og tekstinnhold

På Utforming-siden går du til nedtrekkslisten Tekst i egenskapene for komponenten. Du legger til overskriften i Ledetekst og selve varselteksten i Tekstinnhold. [Legge ti og endre tekster i en app](../../../ux/texts/#legge-til-og-endre-tekster-i-en-app).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
![Alert info innstillinger](Alert-text-settings.png "Alert text settings")
{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="7-10"}
{
  "data": {
    "layout": [
      {
        "id": "alert-id",
        "type": "Alert",
        "textResourceBindings": {
          "title": "Om å endre navn",
          "body": "Ved å bekrefte navneendringen, ber du om å få endret navnet ditt."
        },
        "severity": "info"
      }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Alvorlighetsgrad

Ved å endre alvorlighetsgrad endrer du varselets farger og ikon.

#### `info`

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Example">}}
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="300" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=628-8250&viewport=854%2C1675%2C0.89&scaling=contain&content-scaling=responsive&starting-point-node-id=628%3A8250&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
{{</content-version-container>}}


{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="11"}
{
  "data": {
    "layout": [
      {
        "id": "alert-id",
        "type": "Alert",
        "textResourceBindings": {
          "title": "Om å endre navn",
          "body": "Ved å bekrefte navneendringen, ber du om å få endret navnet ditt."
        },
        "severity": "info"
      }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

#### `success`

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Example">}}
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="300" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=628-8254&viewport=854%2C1675%2C0.89&scaling=contain&content-scaling=responsive&starting-point-node-id=628%3A8254&show-proto-sidebar=0&embed-host=share
" allowfullscreen></iframe>{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="11"}
{
  "data": {
    "layout": [
      {
        "id": "alert-id",
        "type": "Alert",
        "textResourceBindings": {
          "title": "Om å endre navn",
          "body": "Ved å bekrefte navneendringen, ber du om å få endret navnet ditt."
        },
        "severity": "success"
      }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

#### `warning`

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Example">}}
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="300" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=628-8252&viewport=854%2C1675%2C0.89&scaling=contain&content-scaling=responsive&starting-point-node-id=628%3A8252&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="11"}
{
  "data": {
    "layout": [
      {
        "id": "alert-id",
        "type": "Alert",
        "textResourceBindings": {
          "title": "Om å endre navn",
          "body": "Ved å bekrefte navneendringen, ber du om å få endret navnet ditt."
        },
        "severity": "warning"
      }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

#### `danger`

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Example">}}
<iframe style="border: 0px solid rgba(0, 0, 0, 0.1);" width="100%" height="300" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=628-8256&viewport=854%2C1675%2C0.89&scaling=contain&content-scaling=responsive&starting-point-node-id=628%3A8256&show-proto-sidebar=0&embed-host=share
" allowfullscreen></iframe>
{{</content-version-container>}}


{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="11"}
{
  "data": {
    "layout": [
      {
        "id": "alert-id",
        "type": "Alert",
        "textResourceBindings": {
          "title": "Om å endre navn",
          "body": "Ved å bekrefte navneendringen, ber du om å få endret navnet ditt."
        },
        "severity": "danger"
      }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}
Disse eksemplene er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksemplene ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.