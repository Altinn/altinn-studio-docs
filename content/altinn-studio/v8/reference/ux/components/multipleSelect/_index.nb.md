---
title: MultipleSelect
description: MultipleSelect kan benyttes når brukeren kan velge blant flere valg
schemaname: Checkboxes # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
toc: true
weight: 10
---


{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

MultipleSelect brukes ofte i skjemaer for å samle input fra brukeren,
 slik at de kan velge ett eller flere alternativer fra en lang liste med alternativer.
 MultipleSelect tilbyr også støtte for lokalt søk/filtrering.
 Som `Checkbox`-komponenten lagrer MultipleSelect valgene som en komma-separert liste.
 
 ### Bruk MultipleSelect når:
 * Brukere kan velge flere alternativer fra en liste.
 * Når listen med alternativer er for lang til å vises som avkrysningsbokser.

### Anatomi

<iframe style="border: 0px solid rgba(0, 0, 0, 0);" width="100%" height="450" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/Link-fra-Figma-til-Docs?page-id=0%3A1&node-id=1-40907&viewport=-2494%2C-11061%2C1.8&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A40907&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

{{% anatomy-list %}}
1. **Feltetikett**: Feltetiketter bør indikere hvilken type informasjon feltet krever.
2. **Tekstfelt**: Feltet brukeren klikker på for å åpne listen med alternativer. Valgte alternativer vises i tekstinntastingsfeltet.
3. **Meny**: Inneholder listen over alle valgbare elementer.
4. **Valgt element**: Viser hvilke alternativer som er valgt. Brukere kan fjerne enkeltvalg ved å klikke på **x** ved elementet.
5. **Fjern alle**: **x** fjerner alt i tekstinntastingsfeltet. Denne er aktiv bare når minst ett alternativ er valgt.
{{% /anatomy-list %}}

<!-- 
Legg til seksjoner dersom de er relevante:

### Oppførsel

(Hvordan komponenten oppfører seg i ulike sammenhenger, f.eks. på mobil vs. desktop)

### Stil

(Visuell styling, e.g. plassering, padding, "dos and don'ts")

### Beste praksis

(Bransjestandarder, "dos and don'ts")

### Veiledning for innhold

(E.g. regler for tegnsetting, standard etiketter, etc.)

### Tilgjengelighet

(Komponent-spesifikk beste praksis for tilgjengelighet.)

### Mobil

(Hvordan implementere komponent i mobile miljøer.)

-->

### Relatert

* For flervalg med få alternativer, bruk [Avkrysningsbokser](/nb/altinn-studio/v8/reference/ux/components/checkboxes/).
* For enkeltvalg med få alternativer, bruk [radionkapper](/nb/altinn-studio/v8/reference/ux/components/radiobuttons/).
* For enkeltvalg med mang alternativer, bruk [Dropdown](/nb/altinn-studio/v8/reference/ux/components/dropdown/).

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema (se link).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

{{% component-props %}}

## Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/altinn-studio/v8/getting-started/) ved å dra den fra komponent-listen til sideområdet.
Når du velger komponenten, vises innstillingspanelet for den.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Grunnleggende komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-12"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "MultipleSelect-id",
          "type": "MultipleSelect",
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

{{< property-docs prop="text-all" >}}

{{< property-docs prop="dataModelBindings" >}}

{{< property-docs prop="options-page" >}}

{{< property-docs prop="readOnly" >}}

{{< property-docs prop="required" >}}

{{< property-docs prop="preselectedOptionsIndex" >}}

{{< property-docs prop="autocomplete" >}}

{{< property-docs prop="renderAsSummary" >}}

{{< property-docs prop="hidden" >}}

{{< property-docs prop="page-break" >}}

{{< property-docs prop="grid-short" >}}

<!-- ## Eksempler -->
