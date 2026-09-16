---
title: Avkrysningsbokser
linktitle: Avkrysningsbokser
description: Inndataelement som lar brukeren velge eller fjerne valg for ett eller flere alternativer.
schemaname: Checkboxes # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
aliases:
- checkbox
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Bruk

Avkrysningsbokser brukes ofte i skjemaer for å samle input fra brukeren,
 slik at de kan velge ett eller flere alternativer fra en liste.
 
### Bruk avkrysningsbokser når:
 * Brukere kan velge flere alternativer fra en liste.
 * Det må gjøres et eksplisitt valg for å bruke innstillingene (f.eks. bekrefte at brukeren har lest et dokument).

### Anatomi

<iframe style="border: 0px solid rgba(0, 0, 0, 0);" width="100%" height="250" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-14680&viewport=1020%2C-1913%2C1.35&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A14680&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

{{% anatomy-list %}}
1. **Overskrift** - Spørsmål eller instruksjon.
2. **Avkrysningsboks** - Valgkontrollen.
3. **Etikett** - Tekstetikett knyttet til avkrysningsboksen.
4. **Hjelpetekst-knapp** - Om man trykker på den dukker en hjelpetekstboks.

{{% /anatomy-list %}} 

### Stil

* Avkrysningsbokser bør alltid ha en tilknyttet etikett på høyre side.

### Beste praksis

* Avkrysningsbokser med deaktivert valg bør unngås.
    Hvis et alternativ er utilgjengelig bør det fjernes og en forklaring gitt for hvorfor alternativet mangler.

 ### Veiledning for innhold

* Hold etikettene korte og beskrivende.
* Begynn alle etiketter med stor bokstav.
* Ikke inkluder tegnsetting etter etikettene.

### Relatert

* For en mer kompakt måte å vise flere alternativer med flervalg, bruk [MultipleSelect](/nb/altinn-studio/v8/reference/ux/components/multipleselect/).
* Hvis brukeren bare kan velge ett alternativ fra en liste, bruk [RadioButtons](/nb/altinn-studio/v8/reference/ux/components/radiobuttons/).
* For en mer kompakt måte å vise flere alternativer med enkeltvalg, bruk en [rullegardinmeny](/nb/altinn-studio/v8/reference/ux/components/dropdown/).

## Egenskaper

Følgende er en liste over tilgjengelige egenskaper for {{% title %}}. Listen er automatisk generert basert på komponentens JSON schema.

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter. Listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

<p><p><strong>Required properties: </strong><code>id</code>,<code>type</code></p><div class="adocs-property-table">
<table>
<tr>
<th><strong>Property</strong></th>
<th><strong>Type</strong></th>
<th><strong>Description</strong></th>
</tr><tr class="main-prop">
<td><h4><code>id</code></h4></td>
<td>string</td>
<td>The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with &lt;dash&gt;&lt;number&gt;.<br></td></p>
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
</tr><tr class="sub-prop">
    <td><code>options.label</code></td>
    <td>string</td>
    <td>The option label. Can be plain text or a text resource binding.<br></td>
</tr><tr class="sub-prop">
    <td><code>options.value</code></td>
    <td>string</td>
    <td>The option value.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>optionsId</code></h4></td>
    <td>string</td>
    <td>Reference to connected options by id.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>autocomplete</code></h4></td>
    <td>string</td>
    <td>The HTML autocomplete attribute lets web developers specify what if any permission the user agent has to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.<br><strong>Enum: </strong>[on, off, name, honorific-prefix, given-name, additional-name, family-name, honorific-suffix, nickname, email, username, new-password, current-password, one-time-code, organization-title, organization, street-address, address-line1, address-line2, address-line3, address-level4, address-level3, address-level2, address-level1, country, country-name, postal-code, cc-name, cc-given-name, cc-additional-name, cc-family-name, cc-number, cc-exp, cc-exp-month, cc-exp-year, cc-csc, cc-type, transaction-currency, transaction-amount, language, bday, bday-day, bday-month, bday-year, sex, tel, tel-country-code, tel-national, tel-area-code, tel-local, tel-extension, url, photo]<br></td>
</tr><tr class="main-prop">
    <td><h4><code>grid</code></h4></td>
    <td>object</td>
    <td>Settings for the components grid. Used for controlling horizontal alignment.<br><strong>Example(s): </strong><code>{xs: 12}</code><br><tr class="sub-prop">
    <td><code>gridSettings.innerGrid</code></td>
    <td>gridProps</td>
    <td>Optional grid for inner component content like input field or dropdown. Used to avoid inner content filling the component width.<br><strong>Example(s): </strong><code>{xs: 12}</code><br></b><strong>See</strong>: <a href="/nb/altinn-studio/v8/reference/ux/components/commondefs#gridProps">gridProps</a><br></td>
</tr><tr class="sub-prop">
    <td><code>gridSettings.labelGrid</code></td>
    <td>gridProps</td>
    <td>Optional grid for the component label. Used in combination with innerGrid to align labels on the side.<br><strong>Example(s): </strong><code>{xs: 12}</code><br></b><strong>See</strong>: <a href="/nb/altinn-studio/v8/reference/ux/components/commondefs#gridProps">gridProps</a><br></td>
</tr></td>
</tr><tr class="main-prop">
    <td><h4><code>hidden</code></h4></td>
    <td>boolean</td>
    <td>Boolean value or expression indicating if the component should be hidden. Defaults to false.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>mapping</code></h4></td>
    <td>mapping</td>
    <td>Optionally used to map options<br><tr class="main-prop">
    <td><h4><code>mapping</code></h4></td>
    <td>object</td>
    <td>Mapping<br><strong>Example(s): </strong><code>{some.source.field: key1}</code><br></td>
</tr></td>
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
    <td><h4><code>preselectedOptionIndex</code></h4></td>
    <td>integer</td>
    <td>Sets a preselected index.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>renderAsSummary</code></h4></td>
    <td>boolean</td>
    <td>Boolean or expression indicating if the component should be rendered as a summary. Defaults to false.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>secure</code></h4></td>
    <td>boolean</td>
    <td>Boolean value indicating if the options should be instance aware. Defaults to false. See more on docs: https://docs.altinn.studio/app/development/data/options/<br></td>
</tr><tr class="main-prop">
    <td><h4><code>source</code></h4></td>
    <td>object</td>
    <td>Object to define a data model source to be used as basis for options. Can not be used if options or optionId is set. See more on docs: https://docs.altinn.studio/app/development/data/options/<br></td>
</tr><tr class="sub-prop">
    <td><code>source.description</code></td>
    <td>string</td>
    <td>A description of the option displayed in Radio- and Checkbox groups. Can be plain text or a text resource binding.<br><strong>Example(s): </strong><code>some.text.key</code>,<code>My Description</code><br></td>
</tr><tr class="sub-prop">
    <td><code>source.group</code></td>
    <td>string</td>
    <td>The repeating group to base options on.<br><strong>Example(s): </strong><code>model.some.group</code><br></td>
</tr><tr class="sub-prop">
    <td><code>source.helpText</code></td>
    <td>string</td>
    <td>A help text for the option displayed in Radio- and Checkbox groups. Can be plain text or a text resource binding.<br><strong>Example(s): </strong><code>some.text.key</code>,<code>My Help Text</code><br></td>
</tr><tr class="sub-prop">
    <td><code>source.label</code></td>
    <td>string</td>
    <td>Reference to a text resource to be used as the option label.<br><strong>Example(s): </strong><code>some.text.key</code><br></td>
</tr><tr class="sub-prop">
    <td><code>source.value</code></td>
    <td>string</td>
    <td>Field in the group that should be used as value<br><strong>Example(s): </strong><code>model.some.group[{0}].someField</code><br></td>
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

```json{hl_lines="6-14"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "Image-id",
          "type": "Image",
          "image": {
            "src": {},
            "width": "100%",
            "align": "center"
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

{{< property-docs prop="layout" >}}

{{< property-docs prop="preselectedOptionsIndex" >}}

{{< property-docs prop="renderAsSummary" >}}

{{< property-docs prop="hidden" >}}

{{< property-docs prop="page-break" >}}

{{< property-docs prop="grid-short" >}}

<!-- ## Eksempler -->
