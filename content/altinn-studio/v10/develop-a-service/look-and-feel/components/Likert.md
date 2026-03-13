---
title: Likert
draft: true
---

## Properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `renderAsSummary` | Boolean value indicating if the component should be rendered as a summary. Defaults to false. |  |
| `forceShowInSummary` | Will force show the component in a summary even if hideEmptyFields is set to true in the summary component. |  |
| `readOnly` | Boolean value or expression indicating if the component should be read only/disabled. Defaults to false. <br /> <i>Please note that even with read-only fields in components, it may currently be possible to update the field by modifying the request sent to the API or through a direct API call.</i> |  |
| `required` | Boolean value or expression indicating if the component should be required. Defaults to false. |  |
| `showValidations` | List of validation types to show |  |
| `columns` | Add customization to the columns of the likert component |  |
| `columns[].value` | The value of the answer column Required. |  |
| `columns[].divider` | Choose if the divider should be shown 'before', 'after' or on 'both' sides of the column. | `"before"`, `"after"`, `"both"` |
| `optionsId` | ID of the option list to fetch from the server |  |
| `mapping` | **Deprecated**: Will be removed in the next major version. Use `queryParameters` with expressions instead. |  |
| `queryParameters` | A mapping of query string parameters to values. Will be appended to the URL when fetching options. |  |
| `options` | List of static options |  |
| `options[].label` | Required. |  |
| `options[].value` | Required. |  |
| `options[].description` |  |  |
| `options[].helpText` |  |  |
| `secure` | Whether to call the secure API endpoint when fetching options from the server (allows for user/instance-specific options) |  |
| `sortOrder` | Sorts the code list in either ascending or descending order by label. | `"asc"`, `"desc"` |
| `source` | Allows for fetching options from the data model, pointing to a repeating group structure See [Source](#source-source). |  |
| `optionFilter` | Setting this to an expression allows you to filter the list of options (the expression should return true to keep the option, false to remove it). To get the option value, use ["value"]. You can also use ["value", "label"] to get the label text resource id, likewise also "description" and "helpText". |  |
| `type` | Required. | `"Likert"` |
| `textResourceBindings` | See [Text resource bindings](#text-resource-bindings-textresourcebindings). |  |
| `removeWhenHidden` | Override the logic cleaning data for hidden components at task end, if you want to keep data referenced in hidden components. Currently only has effect if AppSettings.RemoveHiddenData is enabled. |  |
| `dataModelBindings` | See [Data model bindings](#data-model-bindings-datamodelbindings). Required. |  |
| `filter` | Optionally filter specific rows within the likert group using start/stop indexes for displaying the desired ones(beware that start index starts at zero, and stop index starts at one, so {start, stop} = {0, 3} will display 3 rows, not 4) |  |
| `filter[].key` | Required. | `"start"`, `"stop"` |
| `filter[].value` | Required. |  |

## Source (`source`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `dataType` | The datamodel where the repeating group data is stored. If not specified, the data model defined in the layout-set will be used. |  |
| `group` | The repeating group to base options on. Required. |  |
| `label` | A label of the option displayed in Radio- and Checkbox groups. Can be plain text, a text resource binding, or a dynamic expression. Required. |  |
| `value` | Field in the group that should be used as value Required. |  |
| `description` | A description of the option displayed in Radio- and Checkbox groups. Can be plain text, a text resource binding, or a dynamic expression. |  |
| `helpText` | A help text for the option displayed in Radio- and Checkbox groups. Can be plain text, a text resource binding, or a dynamic expression. |  |

## Text resource bindings (`textResourceBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `summaryTitle` | Title used in the summary view (overrides the default title) |  |
| `summaryAccessibleTitle` | Title used for aria-label on the edit button in the summary view (overrides the default and summary title) |  |
| `title` | The title of the group |  |
| `description` | The description text for the Likert table. |  |
| `leftColumnHeader` | The header text for the left column in the Likert table |  |
| `questions` | The questions to be displayed in each row (use a dynamic text resource) |  |
| `questionDescriptions` | The descriptions to be displayed in each row (use a dynamic text resource) |  |
| `questionHelpTexts` | The help texts to be displayed in each row (use a dynamic text resource) |  |

## Data model bindings (`dataModelBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `answer` | Required. |  |
| `answer.dataType` | The name of the datamodel type to reference Required. |  |
| `answer.field` | The path to the property using dot-notation Required. |  |
| `questions` | Required. |  |
| `questions.dataType` | The name of the datamodel type to reference Required. |  |
| `questions.field` | The path to the property using dot-notation Required. |  |

## Common properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `id` | The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with &lt;dash&gt;&lt;number&gt;. Required. |  |
| `hidden` | Boolean value or expression indicating if the component should be hidden. Defaults to false. |  |
| `grid` | Settings for the components grid. Used for controlling horizontal alignment |  |
| `grid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid` |  |  |
| `grid.labelGrid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid` |  |  |
| `grid.innerGrid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `pageBreak` | Optionally insert page-break before/after component when rendered in PDF |  |
| `pageBreak.breakBefore` | PDF only: Value or expression indicating whether a page break should be added before the component. Can be either: 'auto' (default), 'always', or 'avoid'. |  |
| `pageBreak.breakAfter` | PDF only: Value or expression indicating whether a page break should be added after the component. Can be either: 'auto' (default), 'always', or 'avoid'. |  |
