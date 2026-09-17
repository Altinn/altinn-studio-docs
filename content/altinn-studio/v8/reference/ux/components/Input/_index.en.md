---
title: Input
linktitle: Input
description: # Brief description of what the component does
schemaname: Input # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

<!-- HOW TO USE THIS TEMPLATE
- Read the comments within each section for guidance.
- Delete comments and content that are not relevant.
- When the documentation is ready for publishing, remove "hidden: true" from the frontmatter.
- If the documentation is complete, remove the warning that it's a work in progress.

COMMON PROPERTIES
Documentation for properties that are common to multiple components is updated in separate files and added via shortcode.
Add documentation: Use the shortcode `property-docs` with pointy brackets and the argument `prop="{propName}"`. `propName` must match the filename (which should correspond to the JSON schema name).
Update/create documentation:
- Files, templates, and instructions are located under components/_common-props-content.
- Images are located under /assets/images/component-settings and are added via a separate shortcode (`image.html`).

EXAMPLES
- See Image, Checkboxes, RadioButtons, and Dropdown for examples.

-->

{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

---

## Usage

<!-- Brief description of the component and how it is used. -->

### Anatomy

<!-- 

Image/diagram with numbered callouts.
1. Take a screenshot of the basic version of the component with good copy (text).
2. Use the [PowerPoint file](../numbered-callouts-anatomy.pptx) to add numbers to the screenshot
3. Group screenshot and numbering, save as image, and add to documentation
4. Include key with description of callouts below using anatomy-list shortcode (see example for formatting).

Example:

![Example image and alt text anatomy](../image/image-and-alt-text-en.png)

{{% anatomy-list %}}
1. **Image**: Photo, screenshot, illustration, or graphic.
2. **Alternative text**: Used by screen readers and displayed if the image can not be rendered.
{{% /anatomy-list %}} 

-->

<!-- 
Add the following sections if relevant:

### Behavior

(How the component behaves in different contexts)

### Style

(Visual styling (e.g. alignment, padding, dos and don'ts))

### Best Practices

(Industry standards, dos and don'ts)

### Content guidelines

(E.g. punctuation rules, standard labels, etc.)

### Accessibility

(Component-specific best practices for accessibility.)

### Mobile

(How to apply component in mobile environments.)

### Related

(List of related components or patterns, include links)

-->

## Properties

The following is a list of the properties available for {{% title %}}.

{{% notice warning %}}
We are currently updating how we implement components, and the list of properties may not be entirely accurate.
{{% /notice %}}

<p><p><strong>Required properties: </strong><code>id</code>,<code>type</code>,<code>dataModelBindings</code></p><div class="adocs-property-table">
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
    <td><code>dataModelBindings.simpleBinding</code></td>
    <td>string</td>
    <td>Data model binding for components connection to a single field in the data model<br></td>
</tr><tr class="main-prop">
    <td><h4><code>textResourceBindings</code></h4></td>
    <td>object</td>
    <td>Text resource bindings for a component.<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.description</code></td>
    <td>string</td>
    <td>The description text for the component<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.help</code></td>
    <td>string</td>
    <td>The help text for the component<br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.title</code></td>
    <td>string</td>
    <td>The title/label text for the component<br></td>
</tr><tr class="main-prop">
    <td><h4><code>required</code></h4></td>
    <td>boolean</td>
    <td>Boolean or expression indicating if the component is required when filling in the form. Defaults to false.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>readOnly</code></h4></td>
    <td>boolean</td>
    <td>Boolean or expression indicating if the component should be presented as read only. Defaults to false.<br></td>
</tr><tr class="main-prop">
    <td><h4><code>autocomplete</code></h4></td>
    <td>string</td>
    <td>The HTML autocomplete attribute lets web developers specify what if any permission the user agent has to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.<br><strong>Enum: </strong>[on, off, name, honorific-prefix, given-name, additional-name, family-name, honorific-suffix, nickname, email, username, new-password, current-password, one-time-code, organization-title, organization, street-address, address-line1, address-line2, address-line3, address-level4, address-level3, address-level2, address-level1, country, country-name, postal-code, cc-name, cc-given-name, cc-additional-name, cc-family-name, cc-number, cc-exp, cc-exp-month, cc-exp-year, cc-csc, cc-type, transaction-currency, transaction-amount, language, bday, bday-day, bday-month, bday-year, sex, tel, tel-country-code, tel-national, tel-area-code, tel-local, tel-extension, url, photo]<br></td>
</tr><tr class="main-prop">
    <td><h4><code>formatting</code></h4></td>
    <td>object</td>
    <td>Set of options for formatting input fields.<br></td>
</tr><tr class="sub-prop">
    <td><code>formatting.align</code></td>
    <td>string</td>
    <td>The alignment for Input field (eg. right aligning a series of numbers).<br><strong>Enum: </strong>[left, center, right]<br></td>
</tr><tr class="sub-prop">
    <td><code>formatting.currency</code></td>
    <td>string</td>
    <td>Enables currency along with thousand and decimal separators to be language sensitive based on selected app language. They are configured in number property. Note: parts that already exist in number property are not overridden by this prop.<br><strong>Enum: </strong>[AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN, BHD, BIF, BMD, BND, BOB, BOV, BRL, BSD, BTN, BWP, BYN, BZD, CAD, CDF, CHE, CHF, CHW, CLF, CLP, CNY, COP, COU, CRC, CUC, CUP, CVE, CZK, DJF, DKK, DOP, DZD, EGP, ERN, ETB, EUR, FJD, FKP, GBP, GEL, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HTG, HUF, IDR, ILS, INR, IQD, IRR, ISK, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW, KWD, KYD, KZT, LAK, LBP, LKR, LRD, LSL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRU, MUR, MVR, MWK, MXN, MXV, MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK, PHP, PKR, PLN, PYG, QAR, RON, RSD, RUB, RWF, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLE, SLL, SOS, SRD, SSP, STN, SVC, SYP, SZL, THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD, USN, UYI, UYU, UYW, UZS, VED, VES, VND, VUV, WST, XAF, XCD, XDR, XOF, XPF, XSU, XUA, YER, ZAR, ZMW, ZWL]<br></td>
</tr><tr class="sub-prop">
    <td><code>formatting.position</code></td>
    <td>string</td>
    <td>Display the unit as prefix or suffix. Default is prefix<br><strong>Enum: </strong>[prefix, suffix]<br></td>
</tr><tr class="sub-prop">
    <td><code>formatting.unit</code></td>
    <td>string</td>
    <td>Enables unit along with thousand and decimal separators to be language sensitive based on selected app language. They are configured in number property. Note: parts that already exist in number property are not overridden by this prop.<br><strong>Enum: </strong>[celsius, centimeter, day, degree, foot, gram, hectare, hour, inch, kilogram, kilometer, liter, meter, milliliter, millimeter, millisecond, minute, month, percent, second, week, year]<br></td>
</tr><tr class="sub-prop">
    <td><code>gridSettings.innerGrid</code></td>
    <td>gridProps</td>
    <td>Optional grid for inner component content like input field or dropdown. Used to avoid inner content filling the component width.<br><strong>Example(s): </strong><code>{xs: 12}</code><br></b><strong>See</strong>: <a href="/nb/altinn-studio/v8/reference/ux/components/commondefs#gridProps">gridProps</a><br></td>
</tr><tr class="sub-prop">
    <td><code>gridSettings.labelGrid</code></td>
    <td>gridProps</td>
    <td>Optional grid for the component label. Used in combination with innerGrid to align labels on the side.<br><strong>Example(s): </strong><code>{xs: 12}</code><br></b><strong>See</strong>: <a href="/nb/altinn-studio/v8/reference/ux/components/commondefs#gridProps">gridProps</a><br></td>
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
</tr><tr class="main-prop">
    <td><h4><code>variant</code></h4></td>
    <td>string</td>
    <td>An enum to choose if the inputfield it is a normal textfield or a searchbar<br><strong>Enum: </strong>[text, search]<br></td>
</tr></table>
    </div>

## Configuration

{{% notice warning %}}
We are currently updating Altinn Studio Designer with more configuration options!
 The documentation is continuously updated, and there may be more settings available than what is described here, and some settings may be in beta version.
{{% /notice %}}

### Add component

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

You can add a component in [Altinn Studio Designer](/en/altinn-studio/v8/getting-started/) by dragging it from the list of components to the page area.
Selecting the component brings up its configuration panel.

{{</content-version-container>}}
{{<content-version-container version-label="Code">}}

Basic component:

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
Add sections describing the configuration of properties specific for the component.
- Use the below Designer/Code tabs shortcode to display the settings.
- Include screenshots and examples where appropriate.
- If the settings are not available in Altinn Studio, use only the Code tab and add the following shortcode directly under the section heading:
    {{% notice info %}}
    The settings for this property is currently not available in Altinn Studio and must be configured manually.
    {{% /notice %}}
- Add file path or other info within the code-title shortcode (shown at the top of the code block)
- Consider highlighting relevant parts of the code using hl_lines
- Add documentation for common properties using the shortcode `property-docs` with pointy brackets and the argument `prop="{propName}"`. `propName` must match the filename (which should correspond to the JSON schema name).

Shortcode for tabs:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

{{</content-version-container>}}

{{<content-version-container version-label="Code">}}

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

## Examples

<!-- One or more examples of configuration (if relevant) -->
