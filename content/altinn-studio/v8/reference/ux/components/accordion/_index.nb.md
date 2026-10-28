---
title: Accordion (Trekkspilliste)
linktitle: Accordion
description: En komponent som lar deg gruppere innhold i sammenleggbare seksjoner
schemaname: Accordion # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Accordion er en trekkspill-komponent som lar brukere utvide og lukke seksjoner med innhold ved å klikke på overskriften,
noe som gir en plassbesparende og organisert måte å presentere informasjon på.

### Anatomi

<iframe style="border: 0px solid rgba(0, 0, 0, 0);" width="100%" height="250" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1320-9369&viewport=634%2C2793%2C0.78&scaling=contain&content-scaling=responsive&starting-point-node-id=1320%3A9369&show-proto-sidebar=0&embed-host=share&hide-ui=true" allowfullscreen></iframe>

<iframe style="border: 0px solid rgba(0, 0, 0, 0);" width="100%" height="300" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-4275&viewport=634%2C2793%2C0.78&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A4275&show-proto-sidebar=0&embed-host=share&hide-ui=true" allowfullscreen></iframe>

{{% anatomy-list %}}

1. **Overskrift**: Den klikkbare seksjonstittelen som brukere samhandler med for å utvide eller lukke innholdet.
2. **Innholdsområde**: Området som utvider eller kollapser, som viser eller skjuler ytterligere informasjon når overskriften klikkes.
   {{% /anatomy-list %}}

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

-->

### Relatert

- [`AccordionGroup`](/nb/altinn-studio/v8/reference/ux/components/accordiongroup/)

## Egenskaper

| **Egenskap**                 | **Type** | **Beskrivelse**                                                                              |
| ---------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `children`                   | array    | En array med ID'en til komponenter som tilhører gruppen. **Enum:** `"Paragraph" \| "Button"` |
| `textResourceBindings.title` | string   | Klikkbar seksjonstittel                                                                      |
| `openByDefault`              | boolean  | Åpent eller stengt modus på accordion fra start                                              |
| `headingLevel`               | integer  | Størrelse på header. Standard er `"2"`. **Enum:** `"2" \| "3" \| "4" \| "5" \| "6"`          |

## Konfigurering

### Legg til komponent

Du kan legge til en komponent i [Altinn Studio Designer](/nb/altinn-studio/v8/getting-started/) ved å dra den fra venstre sidepanel til midten av siden.
Når du velger komponenten, vises et panel med innstillinger for den på høyre side.

### Innstillinger i Altinn Studio Designer

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Innstillinger for egenskaper tilgjengelig i Altinn Studio Designer.

{{% notice warning %}}
**NB!** Accordions egenskap `children` må [legges til manuelt](#children) for å unngå feilmelding.
{{% /notice %}}

![Accordion innstillinger i Altinn Studio](Accordion-settings-panel.png "Innstillinger for Accordion i Altinn Studio")

- **Komponent-ID** (`id`): Automatisk generert komponent-ID (kan redigeres).

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Korresponderende innstillinger i sidens JSON-fil.

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-9"}
...

{
  "data": {
    "layout": [
       {
        "id": "Accordion-3uoJMS",
        "type": "Accordion"
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Legg til overskrift og underelementer

<br>

#### `textResourceBindings.title`

Overskriften for Accordion kan legges til som en tekst direkte eller refereres via en tekstnøkkel til en [tekstressurs](/nb/altinn-studio/v8/reference/ux/texts/#legge-til-og-endre-tekster-i-en-app).

#### `children`

Spesifiser hvilke komponenter du vil kunne ekspandere ved å legge deres ID-er i en array under `children`.

Følgende typer kan legges til en `Accordion`:

- `Paragraph`
- `Button`

<br>

#### Eksempel

Accordion med et avsnitt og en knapp som underelementer.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=["9-12"]}
...

{
  "data": {
    "layout": [
       {
        "id": "Accordion-3uoJMS",
        "type": "Accordion",
        "textResourceBindings": {
          "title": "Lorem ipsum"
        },
        "children": ["lorem-ipsum", "ok-button"]
      },
      {
        "id": "lorem-ipsum",
        "type": "Paragraph",
        "textResourceBindings": {
          "title": "Paragraph.loremIpsum1"
        },
        "dataModelBindings": {}
      },
      {
        "id": "ok-button",
        "type": "Button",
        "dataModelBindings": {},
        "textResourceBindings": {
          "title": "OK"
        }
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

![Accordion eksempel](Accordion-title-and-children.png "Accordion med avsnitt og knapp")

### Nivå for overskrift

Standard nivå for overskrift er `2`. For å endre, legg til egenskapen `headingLevel` som i eksempelet under.
`headingLevel` kan ta verdiene `2 | 3 | 4 | 5 | 6`.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="13"}
...

{
  "data": {
    "layout": [
       {
        "id": "Accordion-3uoJMS",
        "type": "Accordion",
        "textResourceBindings": {
          "title": "Lorem ipsum"
        },
        "children": ["lorem-ipsum", "ok-button"],
        "headingLevel": 3
      },
      ...
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}
