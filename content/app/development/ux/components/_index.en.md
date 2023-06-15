---
title: Components
weight: 10
---

 Below is a table overview of component layout properties.
More specific properties and definitions are found in the description of each component and in the [page layout JSON schema](https://altinncdn.no/schemas/json/layout/layout.schema.v1.json) file.

{{% expandlarge id="component-layout-properties" header="Component Layout Properties" %}}

| **Property**           | **Title**              | **Type**      | **Description**                                                                                                 |
| ---------------------- | ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| `id`                   | id                     | string        | The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with `<dash><number>`.    |
| `type`                 | Type                   | string (enum) | The component type                                                                                              |
| `required`             | Required               | boolean       | Boolean or expression indicating if the component is required when filling in the form. Default value: `false`. |
| `readOnly`             | Read Only              | boolean       | Boolean or expression indicating if the component should be presented as read only. Default value: `false`.     |
| `renderAsSummary`      | Render as summary      | boolean       | Boolean or expression indicating if the component should be rendered as a summary. Default value: `false`.      |
| `hidden`               | Hidden                 | boolean       | Boolean value or expression indicating if the component should be hidden. Default value: `false`.               |
| `textResourceBindings` | Text resource bindings | object        | Text resource bindings for a component.                                                                         |
| `dataModelBindings`    | Data model bindings    | object        | Data model bindings for a component                                                                             |
| `triggers`             | Triggers               | array         | An array of actions that should be triggered when data connected to this component changes.                     |
| `labelSettings`        | Label settings         | object        | A collection of settings for how the component label should be rendered.                                        |
| `grid`                 | Grid                   | object        | Settings for the components grid. Used for controlling horizontal alignment.                                    |
| `pageBreak`            | Page break             | object        | PDF only: Value or expression indicating whether a page break should be added before or after the component.    |


{{% /expandlarge %}}

{{<children />}}
