---
title: TextArea
draft: true
---

## Properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `readOnly` | Boolean value or expression indicating if the component should be read only/disabled. Defaults to false. <br /> <i>Please note that even with read-only fields in components, it may currently be possible to update the field by modifying the request sent to the API or through a direct API call.</i> |  |
| `required` | Boolean value or expression indicating if the component should be required. Defaults to false. |  |
| `showValidations` | List of validation types to show |  |
| `renderAsSummary` | Boolean value indicating if the component should be rendered as a summary. Defaults to false. |  |
| `forceShowInSummary` | Will force show the component in a summary even if hideEmptyFields is set to true in the summary component. |  |
| `labelSettings` | See [Label settings](#label-settings-labelsettings). |  |
| `type` | Required. | `"TextArea"` |
| `textResourceBindings` | See [Text resource bindings](#text-resource-bindings-textresourcebindings). |  |
| `removeWhenHidden` | Override the logic cleaning data for hidden components at task end, if you want to keep data referenced in hidden components. Currently only has effect if AppSettings.RemoveHiddenData is enabled. |  |
| `dataModelBindings` | See [Data model bindings](#data-model-bindings-datamodelbindings). Required. |  |
| `saveWhileTyping` | Lets you control how long we wait before saving the value locally while typing. This value is usually also used to determine how long we wait before saving the value to the server. The default value is 400 milliseconds. |  |
| `autocomplete` | Autocomplete hints to the browser. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete | `"on"`, `"off"`, `"name"`, `"honorific-prefix"`, `"given-name"`, `"additional-name"`, `"family-name"`, `"honorific-suffix"`, `"nickname"`, `"email"`, `"username"`, `"new-password"`, `"current-password"`, `"one-time-code"`, `"organization-title"`, `"organization"`, `"street-address"`, `"address-line1"`, `"address-line2"`, `"address-line3"`, `"address-level4"`, `"address-level3"`, `"address-level2"`, `"address-level1"`, `"country"`, `"country-name"`, `"postal-code"`, `"cc-name"`, `"cc-given-name"`, `"cc-additional-name"`, `"cc-family-name"`, `"cc-number"`, `"cc-exp"`, `"cc-exp-month"`, `"cc-exp-year"`, `"cc-csc"`, `"cc-type"`, `"transaction-currency"`, `"transaction-amount"`, `"language"`, `"bday"`, `"bday-day"`, `"bday-month"`, `"bday-year"`, `"sex"`, `"tel"`, `"tel-country-code"`, `"tel-national"`, `"tel-area-code"`, `"tel-local"`, `"tel-extension"`, `"impp"`, `"url"`, `"photo"` |
| `maxLength` | Max length of the input field. Will add a counter to let the user know how many characters are left. |  |

## Label settings (`labelSettings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `optionalIndicator` | Show optional indicator on label |  |

## Text resource bindings (`textResourceBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `tableTitle` | Title used in the table view (overrides the default title) |  |
| `shortName` | Alternative name used for required validation messages (overrides the default title) |  |
| `requiredValidation` | Full validation message shown when the component is required and no value has been entered (overrides both the default and shortName) |  |
| `summaryTitle` | Title used in the summary view (overrides the default title) |  |
| `summaryAccessibleTitle` | Title used for aria-label on the edit button in the summary view (overrides the default and summary title) |  |
| `title` | Label text/title shown above the component |  |
| `description` | Label description shown above the component, below the title |  |
| `help` | Help text shown in a tooltip when clicking the help button |  |

## Data model bindings (`dataModelBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `simpleBinding` | Required. |  |
| `simpleBinding.dataType` | The name of the datamodel type to reference Required. |  |
| `simpleBinding.field` | The path to the property using dot-notation Required. |  |

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
