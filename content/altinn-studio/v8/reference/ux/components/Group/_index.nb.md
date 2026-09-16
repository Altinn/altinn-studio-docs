---
title: Group
linktitle: Group
description: # Kort beskrivelse av komponenten
schemaname: Group # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
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
    <td><h4><code>dataModelBindings</code></h4></td>
    <td>object</td>
    <td>Data model bindings for component<br></td>
</tr><tr class="sub-prop">
    <td><code>dataModelBindings.group</code></td>
    <td>string</td>
    <td>Data model binding for repeating group connection to a group in the data model<br></td>
</tr><tr class="main-prop">
    <td><h4><code>textResourceBindings</code></h4></td>
    <td>object</td>
    <td>Text resource bindings for a component.<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.add_button</code></td>
    <td>string</td>
    <td>Add button<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.description</code></td>
    <td>string</td>
    <td>The description text for the group<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.edit_button_close</code></td>
    <td>string</td>
    <td>Edit button close<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.edit_button_open</code></td>
    <td>string</td>
    <td>Edit button open<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.help</code></td>
    <td>string</td>
    <td>The help text for the group<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.save_and_next_button</code></td>
    <td>string</td>
    <td>Save and next button<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.save_button</code></td>
    <td>string</td>
    <td>Save button<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.shortName</code></td>
    <td>string</td>
    <td>The short name for the group (used in validation messages) (optional). If it is not specified, &#39;title&#39; text is used.<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.title</code></td>
    <td>string</td>
    <td>The title/label text for the group<br></td>
</tr><tr class="main-prop">
    <td><h4><code>children</code></h4></td>
    <td>array</td>
    <td>An array of the &#34;id&#34; of child components belonging to the group.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>edit</code></h4></td>
    <td>groupEditOptions</td>
    <td>Alternatives for edit view of repeating group<br><tr class="sub-prop">
    <td><code>groupEditOptions.addButton</code></td>
    <td>boolean</td>
    <td>Boolean or expression indicating whether add new button should be shown or not under the table.<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.alertOnDelete</code></td>
    <td>boolean</td>
    <td>Boolean value indicating if warning popup should be displayed when attempting to delete a row<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.alwaysShowAddButton</code></td>
    <td>boolean</td>
    <td>Boolean value indicating whether add new button should be shown or not under the table when a group is open.<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.deleteButton</code></td>
    <td>boolean</td>
    <td>Boolean or expression indicating whether delete button should be shown or not for a given row<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.editButton</code></td>
    <td>boolean</td>
    <td>Boolean or expression indicating whether edit button should be shown or not for a given row<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.filter</code></td>
    <td>array</td>
    <td>Conditions for filtering visible items in repeating group<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.mode</code></td>
    <td>string</td>
    <td>Mode for how repeating group table is displayed in edit mode<br><strong>Enum: </strong>[hideTable, likert, showAll, showTable, onlyTable]<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.multiPage</code></td>
    <td>boolean</td>
    <td>Boolean value indicating if form components in edit mode should be shown over multiple pages/views.<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.openByDefault</code></td>
    <td></td>
    <td>Boolean or string indicating if group should be opened by default. If no items exist: &#39;first&#39;, &#39;last&#39;, and true adds a new item. If items exist already, true does not open anything, but &#39;first&#39; opens the first item, and &#39;last&#39; opens the last item in the group.<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.saveAndNextButton</code></td>
    <td>boolean</td>
    <td>Boolean or expression indicating whether save and go to next button should be shown or not in addition to save and close button<br></td>
</tr><tr class="sub-prop">
    <td><code>groupEditOptions.saveButton</code></td>
    <td>boolean</td>
    <td>Boolean or expression indicating whether save button should be shown or not for a given row<br></td>
</tr></td>
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
    <td><h4><code>hiddenRow</code></h4></td>
    <td>boolean</td>
    <td>Boolean to decide whether the row should be displayed.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>maxCount</code></h4></td>
    <td>integer</td>
    <td>The maximum number of iterations of a group. Only relevant if group is repeating.<br></td>
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
    <td><h4><code>panel</code></h4></td>
    <td>groupPanelOptions</td>
    <td>Alternatives for panel view of repeating group<br><tr class="sub-prop">
    <td><code>groupPanelOptions.groupReference</code></td>
    <td>object</td>
    <td>Reference to the group that is being displayed in the panel. Used for referencing another repeating group context.<br></td>
</tr><tr class="sub-prop">
    <td><code>groupPanelOptions.groupReference.group</code></td>
    <td>string</td>
    <td>Group reference. Can be either the group id or the group data model binding.<br><strong>Example(s): </strong><code>the-group-id</code>,<code>some.model.theGroup</code><br></td>
</tr><tr class="sub-prop">
    <td><code>groupPanelOptions.iconAlt</code></td>
    <td>string</td>
    <td>Alternative text for the icon. Only applicable if iconUrl is provided. Can be plain text or a text resource reference.<br></td>
</tr><tr class="sub-prop">
    <td><code>groupPanelOptions.iconUrl</code></td>
    <td>string</td>
    <td>Url of the icon to be shown in panel. Can be relative if hosted by app or full if referencing a cdn or other hosting.<br><strong>Example(s): </strong><code>fancyIcon.svg</code>,<code>https://cdn.example.com/fancyIcon.svg</code><br></td>
</tr><tr class="sub-prop">
    <td><code>groupPanelOptions.showIcon</code></td>
    <td>boolean</td>
    <td>Boolean value indicating if the icon should be shown.<br></td>
</tr><tr class="sub-prop">
    <td><code>groupPanelOptions.variant</code></td>
    <td>string</td>
    <td>Change the look of the panel.<br><strong>Enum: </strong>[info, warning, success]<br></td>
</tr></td>
</tr><tr class="main-prop">
    <td><h4><code>renderAsSummary</code></h4></td>
    <td>boolean</td>
    <td>Boolean or expression indicating if the component should be rendered as a summary. Defaults to false.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>rowsAfter</code></h4></td>
    <td>array</td>
    <td>An array of rows to be rendered after the group table (using Grid component configuration)<br></td>
</tr><tr class="main-prop">
    <td><h4><code>rowsBefore</code></h4></td>
    <td>array</td>
    <td>An array of rows to be rendered before the group table (using Grid component configuration)<br></td>
</tr><tr class="main-prop">
    <td><h4><code>showGroupingIndicator</code></h4></td>
    <td>boolean</td>
    <td>Boolean to decide whether a vertical line indicating grouping of fields should be visible. Only relevant for non-repeating groups.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>tableColumns</code></h4></td>
    <td>object</td>
    <td>An object containing key-value pairs where the key is a table header and the value is an object containing settings for the headers column<br></td>
</tr><tr class="main-prop">
    <td><h4><code>tableHeaders</code></h4></td>
    <td>array</td>
    <td>An array of the id of child components that should be included as table headers. If not defined all components are shown.<br></td>
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
