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

Bruk bilder og illustrasjoner for å fremheve poeng eller illustrere begreper som er vanskelige å forklare med tekst.

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

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema (se link).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

{{% component-props %}}

## Konfigurering

### Legg til komponent

Du kan legge til en komponent i [Altinn Studio Designer](/nb/app/getting-started/ui-editor/) ved å dra den fra venstre sidepanel til midten av siden.
Når du velger komponenten, vises et panel med innstillinger for den på høyre side.

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Alternativ tekst

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Velg 'Alternativ tekst for bilde' i nedtrekksmenyen.

![Innstilling legg til tekst](innstilling-tekst.png)

Klikk plusstegnet for å opprette en ny tekst eller forstørrelsesglasset for å velge en eksisterende [tekstressurs](/nb/app/development/ux/texts/#legge-til-og-endre-tekster-i-en-app).

![Innstilling for alternativ tekst](innstilling-alternativ-tekst.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Korresponderende innstillinger i sidens JSON-fil.

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="7-9"}
{
  "data": {
    "layout": [
      {
        "id": "kommune-logo",
        "type": "Image",
        "textResourceBindings": {
          "altTextImg": ""
        },
        ...
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Bildeinnstillinger (`image`)

#### Legg til kilde (`image.src`)

Standardkilden er `nb`; ethvert språk som ikke definerer en separat bildekilde vil bruke denne kilden.
  Oppgi en annen språkkode og bildekilde for å legge til en kilde, som i eksemplet nedenfor.

Tilgjengelige språkkilder er `en` (engelsk), `nb` (norsk bokmål) og `nn` (norsk nynorsk).

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstilling kilde](innstilling-kilde.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="5-8"}
{
  "id": "kommune-logo",
  "type": "Image",
  "image": {
    "src": {
      "nb": "/testdep/flyttemelding-sogndal/kommune-logo.png",
      "nn": "wwwroot/kommune-logo.png"
    },
    ...
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

Bildekilden kan være ekstern eller lokal for appen.

For eksterne bilder er kilden *bilde-URL* (f.eks. `https://examples.com/myImage.png`).

For å hoste et bilde i applikasjonen, plasser det i mappen `App/wwwroot` (hvis mappen ikke eksisterer, kan du opprette den).
 Statisk hosting må [konfigureres manuelt](#konfigurer-statisk-hosting) for apper opprettet før desember 2021.

Et bilde plassert i `App/wwwroot` kan refereres til på følgende måter:
- Ved å bruke dens *relative URL*: `/<org eller brukernavn>/<app-navn>/image.png` eller
- Bruk av *filstien*: `wwwroot/image.png`. Filstien vil konverteres til bildets relative URL før bildet lastes inn.

#### Konfigurer statisk hosting
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

#### Bredde og plassering (`image.width`, `image.align`)

Med `width` kan du justere bildestørrelsen ved å angi bredde på bildet i prosent.
 Høyden settes automatisk for å bevare proporsjoner. Standard innstilling er 100% (opprinnelig bredde).

Egenskapen `align` kontrollerer den horisontale posisjonen til bildet i forhold til beholderen.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstilling bredde og plassering](innstilling-bredde-plassering.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="14-15"}
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
          "align": "center"
        }
      }
    ]
  }
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

 Følgende alternativer er tilgjengelig for plassering:

- `flex-start`: Venstrejustert
- `center`: Midtstilt
- `flex-end`: Høyrejustert
- `space-between`: Elementene er jevnt fordelt langs hovedaksen, med like mye mellomrom mellom hvert element og ingen mellomrom ved start og slutt.
- `space-around`: Elementene er jevnt fordelt langs hovedaksen med like mye mellomrom mellom hvert element, inkludert mellomrom ved start og slutt, som er halvparten av mellomrommet mellom elementene.
- `space-evenly`: Elementene er jevnt fordelt langs hovedaksen med like mye mellomrom mellom hvert element, inkludert start og slutt, slik at det totale mellomrommet er jevnt fordelt.

### Andre innstillinger

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

![Innstilling oppsummering og skjult](innstilling-oppsummering-skjules.png)

![Innstilling sideskift](innstilling-sideskift.png)

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="17-22"}
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
          "align": "center"
        },
        "renderAsSummary": false,
        "hidden": false,
        "pageBreak": {
          "breakBefore": "auto",
          "breakAfter": "auto"
        }
      }
    ]
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

<!-- ## Eksempler -->