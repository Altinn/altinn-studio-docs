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

{{% component-props %}}

## Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/app/getting-started/) ved å dra den fra komponent-listen til sideområdet.
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