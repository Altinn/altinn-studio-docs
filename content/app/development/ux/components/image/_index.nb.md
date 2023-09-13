---
title: Bilde
linktitle: Bilde
description: Vis visuelt innhold som bilder, skjermbilder, illustrasjoner og grafikk
schemaname: Image # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
aliases:
- /nb/app/development/ux/images/
- /nb/app/development/ux/components/images
- /nb/app/guides/design/guidelines/components/picture-component/
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

<!-- Kort beskrivelse av komponenten og hvordan den brukes. -->

### Anatomi

![Bilde og alt tekst anatomi](image-and-alt-text-en.png)

{{%  anatomy-list %}}
1. **Bilde**: Foto, skjermbilde, illustrasjon eller grafikk.
2. **Alternativ tekst**: Brukes av skjermlesere og vises dersom bildet ikke er tilgjengelig.
{{% /anatomy-list %}}

### Beste praksis

Vi anbefaler å følge retningslinjene fra [UUtilsynet](https://www.uutilsynet.no/regelverk/bilder-og-grafikk/205).

- Legg til en alternativ tekst som forklarer bildet. Alt. tekst vil vises hvis bildet ikke er tilgjengelig og brukes av skjermlesere.
- Hvis et bilde er rent dekorativt, er det best å ikke inkludere en alternativ tekst.
- Ikke bruk bilder for bildets skyld. Spør deg selv om bildet illustrerer et poeng eller øker forståelsen av det du prøver å fortelle.
- Sjekk om bildet skalerer godt på enheter som mobil eller nettbrett. Et bilde som ser bra ut på en PC kan raskt fylle en mindre skjerm.
– Unngå å bruke bilder i stedet for tekst, da skjermlesere ikke kan lese det.

### Veiledning for innhold

Hold alternative tekster konsekvente:
- Begynn aldri med "Bilde av ..."
- Skriv kort og start med den mest essensielle delen av bildet.
– Avslutt med å si om bildet er en illustrasjon eller grafikk.

<br>

**Eksempel** 

<img src="https://www.uutilsynet.no/sites/tilsyn/files/styles/xxl/public/2023-01/Tretralle.png?itok=gBevDs0F" alt="Gammel trevogn. Fotografi." width="300px"/>

Alt text: "Gammel trevogn. Fotografi."

<br>

For flere retningslinjer og eksempler, se [UUtilsynet](https://www.uutilsynet.no/regelverk/bilder-og-grafikk/205).

<!-- 
Legg til flere seksjoner dersom de er relevante:

### Oppførsel

(Hvordan komponenten oppfører seg i ulike sammenhenger.)

### Stil

(Visuell styling, e.g. plassering, padding, "dos and don'ts")

### Tilgjengelighet

(Komponent-spesifikk beste praksis for tilgjengelighet.)

### Mobil

(Hvordan implementere komponent i mobile miljøer.)

### Relatert

(Liste over relaterte komponenter, inkluder lenker.)

-->

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

### Legg til komponent

Du kan legge til en komponent i [Altinn Studio Designer](/nb/app/getting-started/ui-editor/) ved å dra den fra venstre sidepanel til midten av siden.
Når du velger komponenten, vises et panel med innstillinger for den på høyre side.

### Innstillinger i Altinn Studio Designer

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Innstillinger for egenskaper tilgjengelig i Altinn Studio Designer.

![Innstillingspanel for komponent](../image/screenshot-component-settings.png)

- **Komponent-ID** (`id`): Automatisk generert komponent-ID (kan redigeres).
- **Kilde** (`src`): Lenke eller filsti til [bildets kilde](#konfigurer-kilde-src).
- **Alternativ tekst** (`textResourceBindings.altTextImg`): Alternativ tekst. Opprett ny eller velg eksisterende [tekstressurs](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app).
- **Bredde** (`width`): Bredde på bildet i prosent (100% er opprinnelig bredde).
- **Plassering** (`align`): [Horisontal justering av bildet](#horisontal-justering-med-align).

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Korresponderende innstillinger i sidens JSON-fil.

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-17"}
{
  "data": {
    "layout": [
      {
        "id": "Image-ijlpGL",
        "type": "Image",
        "textResourceBindings": {
          "altTextImg": ""
        },
        "image": {
          "src": {
            "nb": ""
          },
          "width": "100%",
          "align": "center"
        }
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Konfigurer kilde (`src`)

Bildekilden kan være ekstern eller lokal for appen.

For eksterne bilder er kilden *bilde-URL* (f.eks. `https://examples.com/myImage.png`).

For å hoste et bilde i applikasjonen, plasser det i mappen `App/wwwroot` (hvis mappen ikke eksisterer, kan du opprette den).
 Statisk hosting må [konfigureres manuelt](#configure-static-hosting) for apper opprettet før desember 2021.

Et bilde plassert i `App/wwwroot` kan refereres til på følgende måter:
– Ved å bruke dens *relative URL*: `/<org eller brukernavn>/<app-navn>/image.png` eller
- Bruk av *filstien*: `wwwroot/image.png`. Filstien vil konverteres til bildets relative URL før bildet lastes inn.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}
Bruke relativ URL som kilde:

![Innstillinger med relativ URL som kilde. Skjermbilde](<image-src-rel-url.png> "Innstillinger med relativ URL som kilde")

Bruke filsti som kilde:

![Innstillinger med filsti som kilde. Skjermbilde](<image-src-wwwroot.png> "Innstillinger med filsti som kilde")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}
Bruke relativ URL som kilde:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="7"}
...
      {
        "id": "kommune-logo-2",
        "type": "Image",
        "image": {
          "src": {
            "nb": "/testdep/flyttemelding-sogndal/kommune-logo.png"
          },
          ...
        }
      }
...
```
Bruke filsti som kilde:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="7"}
...
      {
        "id": "kommune-logo",
        "type": "Image",
        "image": {
          "src": {
            "nb": "wwwroot/kommune-logo.png"
          },
          ...
        }
      }
...
```

{{</content-version-container>}}
{{</content-version-selector>}}

#### Configure static hosting
For apper opprettet *før desember 2021* må statisk hosting konfigureres manuelt ved å legge til linjen
 `app.UseStaticFiles('/' + applicationId);` i metoden `Configure` i `App/Program.cs` som vist her:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```C# {hl_lines="5"}
void Configure()
  {
    ...
    app.UseRouting();
    app.UseStaticFiles('/' + applicationId);
    app.UseAuthentication();
    ...
  }
```

`applicationId` tilsvarer `id`  i `App/configApplicationmetadata.json`.

####  Flere kilder basert på språk

Standardkilden er `nb`; ethvert språk som ikke definerer en separat bildekilde vil bruke denne kilden.
  Oppgi en annen språkkode og bildekilde for å legge til en kilde, som i eksemplet nedenfor.

Tilgjengelige språkkilder er `en` (engelsk), `nb` (norsk bokmål) og `nn` (norsk nynorsk).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode">}}

Eksempel med forskjellige bilder for norske (`nb`) og engelske (`en`) sider:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=["8-11"]}
{
  "data": {
    "layout": [
      {
        "id": "example-image",
        "type": "Image",
        "image": {
          "src": {
            "nb": "https://example.com/image_nb.png",
            "en": "https://example.com/image_en.png"
          },
          "width": "100%",
          "align": "center"
        }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Horisontal justering med `align`

Egenskapen `align` kontrollerer den horisontale posisjonen til bildet i forhold til beholderen.
I Designer er alternativene "Venstre" (venstre), "Midtstilt" (senter) og "Høyre" (høyre).
 Disse innstillingene tilsvarer egenskapsverdiene `flex-start`, `center` og `flex-end` i koden.
  I tillegg aksepterer `align` verdiene `space-between`, `space-around` og `space-evenly`.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstillinger for Plassering av bilde. Skjermbilde](screenshot-alignment-settings.png "Innstillinger for plassering")

![]() <!-- Hack to reveal image caption -->
{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="15"}
{
  "data": {
    "layout": [
      {
        "id": "kommune-logo",
        "type": "Image",
        "textResourceBindings": {
          "altTextImg": "kommune-logo.altTextImg"
        },
        "image": {
          "src": {
            "nb": "wwwroot/kommune-logo.png",
          },
          "width": "100%",
          "align": "flex-start"
        }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

### Horisontal justering med `grid`

{{% notice info %}}
Innstillingene for denne egenskapen er foreløpig ikke tilgjengelig i Altinn Studio og må konfigureres manuelt.
{{% /notice %}}

`grid`-egenskapen kontrollerer horisontal justering basert på en layout med 12 kolonner.
 Elementer tildeles brøkdeler av 12 som bestemmer deres bredde i forhold til skjermbredden.
  I eksemplet nedenfor setter vi bildekomponentens bredde til 2/12 av skjermbredden for alle skjermstørrelser (fra `xs` og opp).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines=["13-15"]}
{
  "data": {
    "layout": [
      {
        "id": "kommune-logo",
        "type": "Image",
        "image": {
          "src": {
            "nb": "wwwroot/kommune-logo.png",
          },
          "width": "100%",
          "align": "center",
          "grid": {
            "xs": 2,
          }
        }
      },
      ...
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

![Eksempel posisjonering med grid. Skjermbilde](screenshot-grid-example.png "Eksempel med bilde som tar 2/12 av skjermbredden")

Du kan også bruke `grid` for å sidestille komponenter.

Se [Sidestilte komponenter (grid)](/nb/app/development/ux/styling/#sidestilte-komponenter-grid) for detaljer og flere eksempler.