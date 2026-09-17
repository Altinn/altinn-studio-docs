---
title: Header
linktitle: Header
description: # Brief description of what the component does
schemaname: Header # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
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
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="300" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=100-7785&viewport=429%2C-4932%2C0.72&scaling=contain&content-scaling=responsive&starting-point-node-id=100%3A7785&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
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

<p><p><strong>Required properties: </strong><code>id</code>,<code>type</code>,<code>textResourceBindings</code>,<code>size</code></p><div class="adocs-property-table">
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
    <td><h4><code>textResourceBindings</code></h4></td>
    <td>object</td>
    <td><br></td>
</tr><tr class="sub-prop">
    <td><code>textResourceBindings.title</code></td>
    <td>string</td>
    <td><br></td>
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
    <td><h4><code>size</code></h4></td>
    <td>string</td>
    <td>&#39;L&#39;=&lt;h2&gt;, &#39;M&#39;=&lt;h3&gt;, &#39;S&#39;=&lt;h4&gt;<br><strong>Enum: </strong>[L, M, S, h2, h3, h4]<br></td>
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
