---
title: Nedtrekksliste
linktitle: Nedtrekksliste
description: Inndataelement som lar brukeren velge kun ett alternativ i en liste med flere alternativer.
schemaname: Dropdown
toc: true
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

<iframe style="border: 0px solid rgba(0, 0, 0, 0);" width="100%" height="550" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1778-14039&viewport=-1318%2C-5700%2C0.95&scaling=contain&content-scaling=responsive&starting-point-node-id=1778%3A14039&show-proto-sidebar=0&embed-host=share&hide-ui=true
" allowfullscreen></iframe>

{{% anatomy-list %}}
1. **Overskrift** - Spørsmål eller instruksjon.
2. **Beskrivelse** - Her kan du beskrive det.
3. **Utløser** - Klikk for å åpne menyen.
4. **Tittel på alternativ** - Hovedtittel for alternativet.
5. **Beskrivelse av alternativ** - Her kan du beskrive alternativet.
6. **Valgt alternativ** - Indikasjon på det valgte alternativet.
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

* For enkeltvalg med få alternativer, bruk [radionkapper](/nb/altinn-studio/v8/reference/ux/components/radiobuttons/).
* Hvis brukeren kan velge flere alternativ fra en liste, bruk [Avkrysningsbokser](/nb/altinn-studio/v8/reference/ux/components/checkboxes/).
* For en mer kompakt måte å vise flere alternativer med flervalg, bruk [MultipleSelect](/nb/altinn-studio/v8/reference/ux/components/multipleselect/).

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
