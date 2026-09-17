---
title: Bilde
linktitle: Bilde
description: Vis visuelt innhold som bilder, skjermbilder, illustrasjoner og grafikk
schemaname: Image # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
aliases:
- /nb/altinn-studio/v8/reference/ux/images/
- /nb/altinn-studio/v8/reference/ux/components/images
- /nb/altinn-studio/guides/design/guidelines/components/picture-component/
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Bruk bilder og illustrasjoner for å fremheve poeng eller illustrere begreper som er vanskelige å forklare med tekst.

Denne komponenten kan brukes frittstående eller som en mediakomponent i [Cards-komponenten](/nb/altinn-studio/v8/reference/ux/components/cards/).

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

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}.

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

<p><strong>Required properties: </strong><code>id</code>,<code>type</code>,<code>src</code>,<code>width</code>,<code>align</code></p><div class="adocs-property-table">
<table>
<tr>
<th><strong>Property</strong></th>
<th><strong>Type</strong></th>
<th><strong>Description</strong></th>
</tr><tr class="main-prop">
<td><h4><code>id</code></h4></td>
<td>string</td>
<td>The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with &lt;dash&gt;&lt;number&gt;.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>type</code></h4></td>
    <td>string</td>
    <td>The component type.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>textResourceBindings</code></h4></td>
    <td>object</td>
    <td>Text resource bindings for a component.<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.altTextImg</code></td>
    <td>string</td>
    <td>Alternate text is read aloud to someone using assistive technology, but is hidden from a sighted user.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>align</code></h4></td>
    <td>string</td>
    <td>Align image<br><strong>Enum: </strong>[flex-start, center, flex-end, space-between, space-around, space-evenly]<br></td>
</tr><tr class="main-prop">
    <td><h4><code>grid</code></h4></td>
    <td>object</td>
    <td>Settings for the components grid. Used for controlling horizontal alignment.<br><strong>Example(s): </strong><code>{xs: 12}</code><br></td>
</tr><tr class="sub-prop">
    <td><code>gridSettings.innerGrid</code></td>
    <td>gridProps</td>
    <td>Optional grid for inner component content like input field or dropdown. Used to avoid inner content filling the component width.<br><strong>Example(s): </strong><code>{xs: 12}</code><br><strong>See</strong>: <a href="/nb/altinn-studio/v8/reference/ux/components/commondefs#gridProps">gridProps</a><br></td>
</tr><tr class="sub-prop">
    <td><code>gridSettings.labelGrid</code></td>
    <td>gridProps</td>
    <td>Optional grid for the component label. Used in combination with innerGrid to align labels on the side.<br><strong>Example(s): </strong><code>{xs: 12}</code><br><strong>See</strong>: <a href="/nb/altinn-studio/v8/reference/ux/components/commondefs#gridProps">gridProps</a><br></td>
</tr><tr class="main-prop">
    <td><h4><code>hidden</code></h4></td>
    <td>boolean</td>
    <td>Boolean value or expression indicating if the component should be hidden. Defaults to false.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>pageBreak</code></h4></td>
    <td>object</td>
    <td><br></td>
</tr><tr class="sub-prop">
    <td><code>pageBreak.breakAfter</code></td>
    <td>string</td>
    <td>PDF only: Value or expression indicating whether a page break should be added after the component. Can be either: &#39;auto&#39; (default), &#39;always&#39;, or &#39;avoid&#39;.<br><strong>Example(s): </strong><code>auto</code>,<code>always</code>,<code>avoid</code><br></td>
</tr><tr class="sub-prop">
    <td><code>pageBreak.breakBefore</code></td>
    <td>string</td>
    <td>PDF only: Value or expression indicating whether a page break should be added before the component. Can be either: &#39;auto&#39; (default), &#39;always&#39;, or &#39;avoid&#39;.<br><strong>Example(s): </strong><code>auto</code>,<code>always</code>,<code>avoid</code><br></td>
</tr><tr class="main-prop">
    <td><h4><code>renderAsSummary</code></h4></td>
    <td>boolean</td>
    <td>Boolean or expression indicating if the component should be rendered as a summary. Defaults to false.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>src</code></h4></td>
    <td>object</td>
    <td>Image source<br></td>
</tr><tr class="sub-prop">
    <td><code>src.en</code></td>
    <td>string</td>
    <td>English<br></td>
</tr><tr class="sub-prop">
    <td><code>src.nb</code></td>
    <td>string</td>
    <td>Bokmål<br></td>
</tr><tr class="sub-prop">
    <td><code>src.nn</code></td>
    <td>string</td>
    <td>Nynorsk<br></td>
</tr><tr class="main-prop">
    <td><h4><code>width</code></h4></td>
    <td>string</td>
    <td>Image width<br><strong>Example(s): </strong><code>100%</code><br></td>
</tr></table>
    </div>

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

Grunnleggende bildekomponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-14"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "komponent-id",
        "type": "Image",
        "image": {
          "src": {
            "en": "https://example.com/image.jpg",
            "nb": "/org/app/assets/image.png"
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

### Alternativ tekst (`textResourceBindings.altTextImg`)

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Velg 'Alternativ tekst for bilde' i nedtrekksmenyen.

![Innstilling legg til tekst](innstilling-tekst.png)

Klikk plusstegnet for å opprette en ny tekst eller forstørrelsesglasset for å velge en eksisterende [tekstressurs](/nb/altinn-studio/v8/reference/ux/texts/#legge-til-og-endre-tekster-i-en-app).

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

#### Kilde (`image.src`)

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


{{< property-docs prop="renderAsSummary" >}}

{{< property-docs prop="hidden" >}}

{{< property-docs prop="page-break" >}}

{{< property-docs prop="grid-short" >}}

<!-- ## Eksempler -->
