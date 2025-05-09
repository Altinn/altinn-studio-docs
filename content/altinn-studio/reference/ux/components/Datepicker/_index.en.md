---
title: Datepicker
linktitle: Datepicker
description: # Brief description of what the component does
schemaname: Datepicker # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
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

<iframe style="border: 0px solid rgba(0, 0, 0, 1);" width="100%" height="700" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1707-13699&viewport=1020%2C-1913%2C1.35&scaling=contain&content-scaling=responsive&starting-point-node-id=1707%3A13699&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
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

**Required properties:** `id`, `type`, `basicDataModelBindings.simpleBinding`

| **Property**                           | **Type**  | **Description**                                                                                                                                                                                                                                                                                      |
| -------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **id**                                 | string    | The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with dash or number.                                                                                                                                                                                           |
| **type**                               | string    | The component type.                                                                                                                                                                                                                                                                                  |
| **basicDataModelBindings**             | object    | Data model bindings for component                                                                                                                                                                                                                                                                    |
| `basicDataModelBindings.simpleBinding` | string    | Data model binding for a component's connection to a single field in the data model                                                                                                                                                                                                                  |
| **basicTextResources**                 | object    | Text resource bindings for a component.                                                                                                                                                                                                                                                              |
| `basicTextResources.title`             | string    | The title/label text for the component                                                                                                                                                                                                                                                               |
| `basicTextResources.description`       | string    | The description text for the component                                                                                                                                                                                                                                                               |
| `basicTextResources.help`              | string    | The help text for the component                                                                                                                                                                                                                                                                      |
| `basicTextResources.shortName`         | string    | The short name for the component (used in validation messages) (optional). If it is not specified, 'title' text is used.                                                                                                                                                                             |
| `basicTextResources.tableTitle`        | string    | The text shown in column title when component is used in repeating group (optional). If it is not specified, 'title' text is used.                                                                                                                                                                   |
| **required**                           | boolean   | Boolean or expression indicating if the component is required when filling in the form. Defaults to false.                                                                                                                                                                                           |
| **readOnly**                           | boolean   | Boolean or expression indicating if the component should be presented as read only. Defaults to false.<br/><i>Please note that even with read-only fields in components, it may currently be possible to update the field by modifying the request sent to the API or through a direct API call.</i> |
| **format**                             | string    | Long date format used when displaying the date to the user. The user date format from the locale will be prioritized over this setting. **Example(s):** `DD/MM/YYYY,MM/DD/YYYY,YYYY-MM-DD`                                                                                                           |
| **grid**                               | object    | Settings for the components grid. Used for controlling horizontal alignment. **Example(s):** `{xs: 12}`                                                                                                                                                                                              |
| `gridSettings.innerGrid`               | gridProps | Optional grid for inner component content like input field or dropdown. Used to avoid inner content filling the component width. **Example(s):** `{xs: 12}` See: [gridProps](http://localhost:1313/altinn-studio/reference/ux/components/commondefs#gridProps)                                       |
| `gridSettings.labelGrid`               | gridProps | Optional grid for the component label. Used in combination with innerGrid to align labels on the side. **Example(s):** `{xs: 12}` See: [gridProps](http://localhost:1313/altinn-studio/reference/ux/components/commondefs#gridProps)                                                                 |
| **hidden**                             | boolean   | Boolean value or expression indicating if the component should be hidden. Defaults to false.                                                                                                                                                                                                         |
| **maxDate**                            | string    | Sets the maximum allowed date. Can also use keywords `today`, `yesterday`, `tomorrow`, `oneYearFromNow` and `oneYearAgo` to define a maximum date based on the current date. Defaults to 2100-01-01T12:00:00.000Z.                                                                                   |
| **minDate**                            | string    | Sets the minimum allowed date. Can also use keywords `today`, `yesterday`, `tomorrow`, `oneYearFromNow` and `oneYearAgo` to define a minimum date based on the current date. Defaults to 1900-01-01T12:00:00.000Z.                                                                                   |
| **pageBreak**                          | boolean   |                                                                                                                                                                                                                                                                                                      |
| `pageBreak.breakAfter`                 | string    | PDF only: Value or expression indicating whether a page break should be added after the component. Can be either: `auto`(default),`always`,`avoid`                                                                                                                                                   |
| `pageBreak.breakBefore`                | string    | PDF only: Value or expression indicating whether a page break should be added before the component. Can be either: `auto`(default),`always`,`avoid`                                                                                                                                                  |
| **renderAsSummary**                    | boolean   | Boolean or expression indicating if the component should be rendered as a summary. Defaults to false.                                                                                                                                                                                                |
| **timeStamp**                          | boolean   | Boolean value indicating if the date time should be stored as a timeStamp. Defaults to true. If true: `YYYY-MM-DDThh:mm:ss.sssZ`, if false `YYYY-MM-DD`;                                                                                                                                             |

## Configuration

{{% notice warning %}}
We are currently updating Altinn Studio Designer with more configuration options!
The documentation is continuously updated, and there may be more settings available than what is described here, and some settings may be in beta version.
{{% /notice %}}

### Add component

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

You can add a component in [Altinn Studio Designer](/altinn-studio/getting-started/) by dragging it from the list of components to the page area.
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
