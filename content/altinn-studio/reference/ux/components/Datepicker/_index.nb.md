---
title: Datepicker
linktitle: Datepicker
description: # Kort beskrivelse av komponenten
schemaname: Datepicker # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
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

<iframe style="border: 0px solid rgba(0, 0, 0, 0);" width="100%" height="700" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1707-13699&viewport=1020%2C-1913%2C1.35&scaling=contain&content-scaling=responsive&starting-point-node-id=1707%3A13699&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

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

**Påkrevde egenskaper:** `id`, `type`, `basicDataModelBindings.simpleBinding`

| **Egenskap**                           | **Type**  | **Beskrivelse**                                                                                                                                                                                                                                                                                                      |
| -------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **id**                                 | string    | Komponent id. Må være unik innenfor alle oppsett/sider i et layout-set. Kan ikke slutte med punktum eller tall.                                                                                                                                                                                                      |
| **type**                               | string    | Komponent typen                                                                                                                                                                                                                                                                                                      |
| **basicDataModelBindings**             | object    | Datamodellkobling til komponenten                                                                                                                                                                                                                                                                                    |
| `basicDataModelBindings.simpleBinding` | string    | Datamodellkobling til komponentens felt i datamodellen.                                                                                                                                                                                                                                                              |
| **basicTextResources**                 | object    | Tekstresurser for komponenten                                                                                                                                                                                                                                                                                        |
| `basicTextResources.title`             | string    | Tittelen                                                                                                                                                                                                                                                                                                             |
| `basicTextResources.description`       | string    | Beskrivelsesfelt                                                                                                                                                                                                                                                                                                     |
| `basicTextResources.help`              | string    | Hjelpefelt                                                                                                                                                                                                                                                                                                           |
| `basicTextResources.shortName`         | string    | Navn på komponenten, som vil brukes for valideringsmeldinger. <i>basicTextResources.title</i> er standard.                                                                                                                                                                                                           |
| `basicTextResources.tableTitle`        | string    | Teksten som vises i kolonnen for en repeterende gruppe for komponenten. <i>basicTextResources.title</i> er standard.                                                                                                                                                                                                 |
| **required**                           | boolean   | Boolean eller uttrykk som indikerer om komponenten er påkrevd når en bruker fyller ut skjemaet. Standard er false.                                                                                                                                                                                                   |
| **readOnly**                           | boolean   | Boolean eller uttrykk som indikerer om komponenten skal presenteres som kun lesbar. Standard er false.<br><i>Vennligst merk at selv med skrivebeskyttede felt i komponenter, kan det for øyeblikket være mulig å oppdatere feltet ved å endre forespørselen sendt til API-et eller gjennom et direkte API-anrop.</i> |
| **format**                             | string    | Datoformattering. Lokal brukerdato formattering vil bli prioritert over denne innstillingen.<br>**Eksempel:** `DD/MM/YYYY`, `MM/DD/YYYY`, `YYYY-MM-DD`.                                                                                                                                                              |
| **grid**                               | object    | Innstillinger for komponentens rammer. Brukes for å kontrollere horisontal plassering.                                                                                                                                                                                                                               |
| `grid.innerGrid`                       | gridProps | Valgfri. Rammer for indre komponentkontekst, så som input felt dropdown. Brukes for å unngå at feltet fyller komponentens fulle bredde. **Eksempel:** `{xs: 12}` Se: [gridProps](https://docs.altinn.studio/altinn-studio/reference/ux/components/commondefs/#gridProps)                                             |
| `grid.labelGrid`                       | gridProps | Valgfri. Rammer for komponentens tittel. Brukes i kombinasjon med innerGrid for å likestille bredden på titler på siden. **Eksempel:** `{xs: 12}` Se: [gridProps](https://docs.altinn.studio/altinn-studio/reference/ux/components/commondefs/#gridProps)                                                            |
| **hidden**                             | boolean   | Boolean eller uttrykk som indikerer om komponenten skal være skjult. Standard er false.                                                                                                                                                                                                                              |
| **maxDate**                            | string    | Setter den maksimalt tillatte datoen som brukeren kan velge. Du kan bruke nøkkelordene `today`, `yesterday`, `tomorrow`, `oneYearFromNow` og `oneYearAgo` for å definere de makismalt tillatte datoene basert på dagens dato. Standard er 2100-01-01T12:00:00.000Z.                                                  |
| **minDate**                            | string    | Setter den tidligste tillatte datoen som brukeren kan velge. Du kan bruke nøkkelordene `today`, `yesterday`, `tomorrow`, `oneYearFromNow` og `oneYearAgo` for å definere de tidligste tillatte datoene basert på dagens dato. Standard er 1900-01-01T12:00:00.000Z.                                                  |
| **pageBreak**                          | object    | Angir om komponenten kan utløse sidebrytning i PDF.                                                                                                                                                                                                                                                                  |
| `pageBreak.breakAfter`                 | string    | Kun PDF: Verdien eller uttrykket indikerer om et sidebrytning skal legges til etter komponenten.<br>Kan være: `auto` (standard), `always` eller `avoid`.                                                                                                                                                             |
| `pageBreak.breakBefore`                | string    | Kun PDF: Verdien eller uttrykket indikerer om et sidebrytning skal legges til før komponenten.<br>Kan være: `auto` (standard), `always` eller `avoid`.                                                                                                                                                               |
| **renderAsSummary**                    | boolean   | Boolean eller uttrykk som indikerer om komponenten skal bli laget som en oppsummering. Standard er false.                                                                                                                                                                                                            |
| **timeStamp**                          | boolean   | Boolean verdi som indikerer om dato skal lagres som et tidsstempel. Standard er true. Hvis true: YYYY-MM-DDThh:mm:ss:sssZ, hvis false: YYYY-MM-DD.                                                                                                                                                                   |

## Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/altinn-studio/getting-started/) ved å dra den fra komponent-listen til sideområdet.
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
