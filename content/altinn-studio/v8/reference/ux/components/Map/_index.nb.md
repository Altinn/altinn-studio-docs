---
title: Map
linktitle: Map
description: # Kort beskrivelse av komponenten
schemaname: Map # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
---

<!-- HVORDAN BRUKE DENNE MALEN
- Les kommentarer under hver seksjon for veiledning.
- Slett kommentarer og deler av innholdet som ikke er relevant.
- Gi norsk navn til title og linktitle i frontmatter
- Når dokumentasjonen er klar til å publiseres, fjern "hidden: true" fra frontmatter
- Hvis dokumentasjonen er fullstendig, fjern advarsel om at den er under oppdatering.

FELLES EGENSKAPER
Dokumentasjon for egenskaper som er felles for flere komponenter oppdateres i egne filer og legges til via shortcode.
Legg til dokumentasjon: Bruk shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn (som bør samsvare med JSON-skjema-navn).
Oppdatere/opprette dokumentasjon:
- Filer, maler og instruksjoner ligger under components/_common-props-content
- Bilder legges i /assets/images/component-settings og legges til via egen shortcode (`image.html`)

EKSEMPLER
- Se Image, Checkboxes, RadioButtons og Dropdown. for eksempler.

-->

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

<!-- Kort beskrivelse av komponenten og hvordan den brukes. -->

### Anatomi

<!--

Nummerert skjermbilde av komponenten
1. Ta et skjermbilde av basis-versjonen av komponenten.
2. Bruk PowerPoint-filen (components/numbered-callouts-anatomy.pptx) for å legge til nummerering på skjermbildet
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

### Relatert

(Liste over relaterte komponenter, inkluder lenker.)

-->

## Egenskaper

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

| **Egenskap**                       | **Type**  | **Beskrivelse**                                                                                                                                                                                                                                   |
| ---------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                               | string    | Unik ID-streng for komponenten. Kan ikke slutte med bindestrek eller tall.                                                                                                                                                                        |
| `dataModelBindings.simpleBinding`  | string    | Datamodellkobling til komponentens felt i datamodellen. Feltet må være av type string.                                                                                                                                                            |
| `textResourceBindings.title`       | string    | Tittelen/ledeteksten for komponenten.                                                                                                                                                                                                             |
| `textResourceBindings.description` | string    | Beskrivelsesfelt for komponenten (valgfritt).                                                                                                                                                                                                     |
| `textResourceBindings.help`        | string    | Hjelpefelt for komponenten (valgfritt).                                                                                                                                                                                                           |
| `textResourceBindings.shortName`   | string    | Navn på komponenten, som vil brukes for valideringsmeldinger. <i>basicTextResources.title</i> er standard.                                                                                                                                        |
| `textResourceBindings.tableTitle`  | string    | Teksten som vises i kolonnen for en repeterende gruppe for komponenten. <i>basicTextResources.title</i> er standard.                                                                                                                              |
| `required`                         | boolean   | Boolean eller uttrykk som indikerer om komponenten er påkrevd når en bruker fyller ut skjemaet. Standard er `false`.                                                                                                                              |
| `readOnly`                         | boolean   | Boolean eller uttrykk som indikerer om komponenten skal presenteres som kun lesbar. Standard er `false`.                                                                                                                                          |
| `grid`                             | object    | Innstillinger for komponentens rammer. Brukes for å kontrollere horisontal plassering.                                                                                                                                                            |
| `grid.innerGrid`                   | gridProps | Valgfri. Rammer for indre komponentkontekst. Brukes for å unngå at feltet fyller komponentens fulle bredde. <br>**Eksempel:** `{xs: 12}` <br>**Se:** [gridProps](/nb/altinn-studio/v8/reference/ux/components/commondefs/#gridProps)              |
| `grid.labelGrid`                   | gridProps | Valgfri. Rammer for komponentens tittel. Brukes i kombinasjon med innerGrid for å likestille bredden på titler på siden. <br>**Eksempel:** `{xs: 12}` <br>**Se:** [gridProps](/nb/altinn-studio/v8/reference/ux/components/commondefs/#gridProps) |
| `hidden`                           | boolean   | Boolean eller uttrykk som indikerer om komponenten skal være skjult. Standard er `false`.                                                                                                                                                         |
| `pageBreak`                        | object    | Angir om komponenten kan utløse sidebrytning i PDF.                                                                                                                                                                                               |
| `pageBreak.breakAfter`             | string    | Kun PDF: Verdien eller uttrykket indikerer om en sidebrytning skal legges til etter komponenten.<br>Kan være: `auto` (standard), `always` eller `avoid`.                                                                                          |
| `pageBreak.breakBefore`            | string    | Kun PDF: Verdien eller uttrykket indikerer om en sidebrytning skal legges til før komponenten.<br>Kan være: `auto` (standard), `always` eller `avoid`.                                                                                            |
| `renderAsSummary`                  | boolean   | Boolean eller uttrykk som indikerer om komponenten skal bli laget som en oppsummering. Standard er `false`.                                                                                                                                       |
| `centerLocation`                   | object    | Kartets midtpunkt.                                                                                                                                                                                                                                |
| `centerLocation.latitude`          | number    | Tall eller uttrykk som setter breddegraden for kartets midtpunkt.                                                                                                                                                                                 |
| `centerLocation.longitude`         | number    | Tall eller uttrykk som setter lengdegraden for kartets midtpunkt.                                                                                                                                                                                 |
| `layers`                           | array     | Liste med kartlag.                                                                                                                                                                                                                                |
| `layers.attribution`               | string    | Tekst som viser til hvor kartlaget hentes fra.                                                                                                                                                                                                    |
| `layers.subdomains`                | array     | Liste over underdomener. Brukes til å balansere belastningen på forskjellige "map tiling" servere. En tilfeldig server vil erstatte `{s}` i den definerte URL-en.                                                                                 |
| `layers.url`                       | string    | URL-en til et "tile layer". `{z}/{x}/{y}` erstattes av tile koordinatene, `{s}` erstattes med et tilfeldig underdomene dersom det er angitt.                                                                                                      |
| `zoom`                             | number    | Tall som setter kartets standard zoom.                                                                                                                                                                                                            |

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

```json{hl_lines="6-"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          // Basic component (required properties)
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

<!--
Legg til seksjoner som beskriver konfigurasjonen av egenskaper som er spesifikke for komponenten.
- Bruk nedenstående shortcode for Designer/Kode-faner for å vise innstillingene.
- Inkluder skjermbilder og eksempler der det er hensiktsmessig.
- Hvis innstillingene ikke er tilgjengelige i Altinn Studio, bruk kun fanen for kode og legg til følgende shortcode rett under overskriften til avsnittet:
    {{% notice info %}}
    Innstillingene for denne egenskapen er foreløpig ikke tilgjengelig i Altinn Studio og må konfigureres manuelt.
    {{% /notice %}}
- Legg til filsti eller annen informasjon inni code-title (vises øverst i kodeblokken).
- Marker gjerne relevante deler av koden vha hl_lines.
- Legg til dokumentasjon for felles egenskaper ved å bruke shortcode `property-docs` med hakeparenteser (`< >`) og argument `prop="{propName}"`. `propName` må samsvare med filnavn (som bør samsvare med JSON-skjema-navn).

Shortcode for faner:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=""}
{
  // component properties
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

-->

## Eksempler

<!-- Ett eller flere eksempler på konfigurasjon (hvis relevant) -->
