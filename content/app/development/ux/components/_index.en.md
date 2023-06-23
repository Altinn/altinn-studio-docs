---
title: Components
description: Components are the building blocks of applications.
weight: 10
---

For how to add and edit components in the UI editor, see [Altinn Studio Designer](/app/getting-started/ui-editor/).
 Component settings are described on the individual component pages linked below.

{{% expandlarge id="components-code" header="Code" %}}

Available components and their respective properties are described in the [layout JSON schema](https://altinncdn.no/schemas/json/layout/layout.schema.v1.json) file.

When building an application, the layout of each page is described by a `<pageName>.json` file located in `<applicationRepo>/App/ui/layouts/`.
Components added to the page are listed in the `layout` subsection in the file.

The below table describes the general layout properties for componets. Component-specific properties are described on the individual component pages linked below.

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
