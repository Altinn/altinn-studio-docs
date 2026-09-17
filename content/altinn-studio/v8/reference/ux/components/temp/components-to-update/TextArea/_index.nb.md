---
title: TextArea
linktitle: TextArea
description: # Kort beskrivelse av komponenten
schemaname: TextArea # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
hidden: true # Fjern for ny komponent
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

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}.

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

<p><strong>Required properties: </strong><code>id</code>,<code>type</code>,<code>dataModelBindings</code></p><div class="adocs-property-table">
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
    <td><h4><code>basicDataModelBindings</code></h4></td>
    <td>object</td>
    <td>Data model bindings for component<br></td>
</tr><tr class="sub-prop">
    <td><code>basicDataModelBindings.simpleBinding</code></td>
    <td>string</td>
    <td>Data model binding for components connection to a single field in the data model<br></td>
</tr><tr class="main-prop">
    <td><h4><code>basicTextResources</code></h4></td>
    <td>object</td>
    <td>Text resource bindings for a component.<br></td>
</tr><tr class="sub-prop">
    <td><code>basicTextResources.description</code></td>
    <td>string</td>
    <td>The description text for the component<br></td>
</tr><tr class="sub-prop">
    <td><code>basicTextResources.help</code></td>
    <td>string</td>
    <td>The help text for the component<br></td>
</tr><tr class="sub-prop">
    <td><code>basicTextResources.shortName</code></td>
    <td>string</td>
    <td>The short name for the component (used in validation messages) (optional). If it is not specified, &#39;title&#39; text is used.<br></td>
</tr><tr class="sub-prop">
    <td><code>basicTextResources.tableTitle</code></td>
    <td>string</td>
    <td>The text shown in column title when component is used in repeating group (optional). If it is not specified, &#39;title&#39; text is used.<br></td>
</tr><tr class="sub-prop">
    <td><code>basicTextResources.title</code></td>
    <td>string</td>
    <td>The title/label text for the component<br></td>
</tr><tr class="main-prop">
    <td><h4><code>required</code></h4></td>
    <td>boolean</td>
    <td>Boolean or expression indicating if the component is required when filling in the form. Defaults to false.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>readOnly</code></h4></td>
    <td>boolean</td>
    <td>Boolean or expression indicating if the component should be presented as read only. Defaults to false. &lt;br /&gt; &lt;i&gt;Please note that even with read-only fields in components, it may currently be possible to update the field by modifying the request sent to the API or through a direct API call.&lt;i/&gt;<br></td>
</tr><tr class="main-prop">
    <td><h4><code>autocomplete</code></h4></td>
    <td>string</td>
    <td>The HTML autocomplete attribute lets web developers specify what if any permission the user agent has to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.<br><strong>Enum: </strong>[on, off, name, honorific-prefix, given-name, additional-name, family-name, honorific-suffix, nickname, email, username, new-password, current-password, one-time-code, organization-title, organization, street-address, address-line1, address-line2, address-line3, address-level4, address-level3, address-level2, address-level1, country, country-name, postal-code, cc-name, cc-given-name, cc-additional-name, cc-family-name, cc-number, cc-exp, cc-exp-month, cc-exp-year, cc-csc, cc-type, transaction-currency, transaction-amount, language, bday, bday-day, bday-month, bday-year, sex, tel, tel-country-code, tel-national, tel-area-code, tel-local, tel-extension, url, photo]<br></td>
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
    <td><h4><code>labelSettings</code></h4></td>
    <td>object</td>
    <td>A collection of settings for how the component label should be rendered.<br></td>
</tr><tr class="sub-prop">
    <td><code>labelSettings.optionalIndicator</code></td>
    <td>boolean</td>
    <td>Controls whether the text that is indicating that a field is optional should be displayed.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>maxLength</code></h4></td>
    <td>number</td>
    <td>Maximum length of input field<br></td>
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
    <td><h4><code>saveWhileTyping</code></h4></td>
    <td></td>
    <td>Boolean or number. True = feature on (default), false = feature off (saves on focus blur), number = timeout in milliseconds (400 by default)<br></td>
</tr><tr class="main-prop">
    <td><h4><code>triggers</code></h4></td>
    <td>array</td>
    <td>An array of actions that should be triggered when data connected to this component changes.<br></td>
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
