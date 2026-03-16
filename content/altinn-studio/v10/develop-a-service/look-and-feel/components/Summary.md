---
title: Summary
draft: true
---

## Properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `type` | Required. | `"Summary"` |
| `componentRef` | String value indicating which layout component (by ID) the summary is for. Required. |  |
| `largeGroup` | Boolean value indicating if summary of repeating group should be displayed in large format. Useful for displaying summary with nested groups. |  |
| `excludedChildren` | Array of component IDs that should not be shown in a repeating group's summary |  |
| `textResourceBindings` | See [Text resource bindings](#text-resource-bindings-textresourcebindings). |  |
| `display` | Optional properties to configure how summary is displayed See [Display](#display-display). |  |

## Text resource bindings (`textResourceBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `returnToSummaryButtonTitle` | Used to specify the text on the NavigationButtons component that should be used after clicking "Change" on the summary component |  |

## Display (`display`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `hideChangeButton` | Set to true if the change button should be hidden for the summary component. False by default. |  |
| `hideValidationMessages` | Set to true if the validation messages should be hidden for the component when shown in Summary. False by default. |  |
| `useComponentGrid` | Set to true to allow summary component to use the grid setup of the referenced component. For group summary, this will apply for all group child components. |  |
| `hideBottomBorder` | Set to true to hide the blue dashed border below the summary component. False by default. |  |
| `nextButton` | Set to to true display a "next" button as well as the return to summary button |  |

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
