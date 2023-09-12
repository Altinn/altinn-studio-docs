---
title: AccordionGroup
linktitle: AccordionGroup
description: En komponent som lar deg gruppere Accordions
schemaname: AccordionGroup # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

`AccordionGroup` brukes til å gruppere relaterte [`Accordion`-komponenter](../accordion/).

### Anatomi

![AccordionGroup åpen](accordion-group-open.png "AccordionGroup med en åpen Accordion")

![AccordionGroup lukket](accordion-group-closed.png "AccordionGroup i lukket tilstand")

<!-- 

Nummerert skjermbilde av komponenten
1. Ta et skjermbilde av basis-versjonen av komponenten.
2. Bruk [PowerPoint-filen](../numbered-callouts-anatomy.pptx) for å legge til nummerering på skjermbildet 
3. Grupper skjermbilde og nummerering, lagre som bilde og legg det til i dokumentasjonen.
4. Legg til nummerert liste med beskrivelser, bruk anatomy-list shortcode (se eksempel for format).

Eksempel:

![Eksempel bilde og alt tekst anatomi](../image/image-and-alt-text-en.png)

{{% anatomy-list %}}
1. **Bilde**: Foto, skjermbilde, illustrasjon, eller grafikk.
2. **Alternativ tekst**: Brukes av skjermlesere og vises dersom bildet ikke er tilgjengelig.
{{% /anatomy-list %}} 

-->

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

### Tilgjengelighet

(Komponent-spesifikk beste praksis for tilgjengelighet.)

### Mobil

(Hvordan implementere komponent i mobile miljøer.)

### Relatert

(Liste over relaterte komponenter, inkluder lenker.)

-->

## Egenskaper

| **Egenskap** | **Type**                                       | **Beskrivelse** |
|--------------|------------------------------------------------|-----------------|
| `children`   | array | En array med ID'en til komponenter som tilhører gruppen. | 

<!-- Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema (se link).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}} -->

<!-- Shortkoden `component-props` genererer automatisk en liste over komponentegenskaper fra komponentens JSON schema.
Komponentnavnet kan gis eksplisitt som argument (f.eks. `component-props "Grid"`).
Hvis ingen argument gis, henter shortkoden komponentnavnet fra 'schemaname' i frontmatter. -->

<!-- {{% component-props "ButtonGroup" %}} -->

## Konfigurering

### Legg til komponent

Du kan legge til en komponent i [Altinn Studio Designer](/nb/app/getting-started/ui-editor/) ved å dra den fra venstre sidepanel til midten av siden.
Når du velger komponenten, vises et panel med innstillinger for den på høyre side.

### Innstillinger i Altinn Studio Designer

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen vil bli oppdatert for å gjenspeile endringene når de er stabile.
  I mellomtiden kan det være flere alternativer tilgjengelige i betaversjonen enn det som beskrives her.
{{% /notice %}}

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Innstillinger for egenskaper tilgjengelig i Altinn Studio Designer.

{{% notice warning %}}
**NB!** For å unngå feilemlding må egenskapen `children` legges til i koden.
 Se [Legg til underelementer](#legg-til-underelementer)
{{% /notice %}}

![AccordionGroup innstillingspanel](AccordionGroup-settings-panel.png "Innstillinger for AccordionGroup")

- **Komponent-ID** (`id`): Automatisk generert komponent-ID (kan redigeres).

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Korresponderende innstillinger i sidens JSON-fil.

{{% notice warning %}}
**NB!** For å unngå feilemlding må egenskapen `children` legges til i koden.
 Se [Legg til underelementer](#legg-til-underelementer)
{{% /notice %}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=""}
{
  "data": {
    "layout": [
      {
        "id": "accordion-group",
        "type": "AccordionGroup"
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Legg til underelementer

Spesifiser hvilke komponenter av typen `Accordion` du vil gruppere ved å legge til deres ID-er til `AccordionGroup`-komponenten sin `children`-egenskap.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=""}
...
{
  "data": {
    "layout": [
      {
        "id": "accordion-group",
        "type": "AccordionGroup",
        "children": [
          "accordion1",
          "accordion2"
        ]
      },
      ...
    ]
  }
}
...
```
{{</content-version-container>}}
{{</content-version-selector>}}