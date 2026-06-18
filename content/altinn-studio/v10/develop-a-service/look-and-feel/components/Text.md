---
title: Text
draft: true
---

## Properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `renderAsSummary` | Boolean value indicating if the component should be rendered as a summary. Defaults to false. |  |
| `forceShowInSummary` | Will force show the component in a summary even if hideEmptyFields is set to true in the summary component. |  |
| `type` | Required. | `"Text"` |
| `textResourceBindings` | See [Text resource bindings](#text-resource-bindings-textresourcebindings). |  |
| `value` | Any expression returning string Required. |  |
| `direction` |  | `"horizontal"`, `"vertical"` |
| `icon` |  |  |

## Text resource bindings (`textResourceBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `summaryTitle` | Title used in the summary view (overrides the default title) |  |
| `summaryAccessibleTitle` | Title used for aria-label on the edit button in the summary view (overrides the default and summary title) |  |
| `title` | Label text/title shown above the component |  |
| `description` | Label description shown above the component, below the title |  |
| `help` | Help text shown in a tooltip when clicking the help button |  |

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
