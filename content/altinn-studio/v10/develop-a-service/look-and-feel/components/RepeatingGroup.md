---
title: RepeatingGroup
draft: true
---

## Properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `renderAsSummary` | Boolean value indicating if the component should be rendered as a summary. Defaults to false. |  |
| `forceShowInSummary` | Will force show the component in a summary even if hideEmptyFields is set to true in the summary component. |  |
| `type` | Required. | `"RepeatingGroup"` |
| `textResourceBindings` | See [Text resource bindings](#text-resource-bindings-textresourcebindings). |  |
| `rowsBefore` | The list of rows in this grid |  |
| `rowsBefore[].header` | Is header row? |  |
| `rowsBefore[].readOnly` | Is row read-only? |  |
| `rowsBefore[].columnOptions` | Options for the row/column |  |
| `rowsBefore[].columnOptions.width` | Width of cell in % or 'auto'. Defaults to 'auto' |  |
| `rowsBefore[].columnOptions.alignText` | Choose text alignment between 'left', 'center', or 'right' for text in table cells. Defaults to 'left' for text and 'right' for numbers. | `"left"`, `"center"`, `"right"` |
| `rowsBefore[].columnOptions.textOverflow` |  |  |
| `rowsBefore[].columnOptions.textOverflow.lineWrap` | Toggle line wrapping on or off. Defaults to true |  |
| `rowsBefore[].columnOptions.textOverflow.maxHeight` | Determines the number of lines to display in table cell before hiding the rest of the text with an ellipsis (...). Defaults to 2. |  |
| `rowsBefore[].columnOptions.hidden` | Expression or boolean indicating whether each column should be hidden. An expression will be evaluated per column, and if it evaluates to true, the column will be hidden. |  |
| `rowsBefore[].cells` | The list of cells in this row Required. |  |
| `rowsAfter` | The list of rows in this grid |  |
| `rowsAfter[].header` | Is header row? |  |
| `rowsAfter[].readOnly` | Is row read-only? |  |
| `rowsAfter[].columnOptions` | Options for the row/column |  |
| `rowsAfter[].columnOptions.width` | Width of cell in % or 'auto'. Defaults to 'auto' |  |
| `rowsAfter[].columnOptions.alignText` | Choose text alignment between 'left', 'center', or 'right' for text in table cells. Defaults to 'left' for text and 'right' for numbers. | `"left"`, `"center"`, `"right"` |
| `rowsAfter[].columnOptions.textOverflow` |  |  |
| `rowsAfter[].columnOptions.textOverflow.lineWrap` | Toggle line wrapping on or off. Defaults to true |  |
| `rowsAfter[].columnOptions.textOverflow.maxHeight` | Determines the number of lines to display in table cell before hiding the rest of the text with an ellipsis (...). Defaults to 2. |  |
| `rowsAfter[].columnOptions.hidden` | Expression or boolean indicating whether each column should be hidden. An expression will be evaluated per column, and if it evaluates to true, the column will be hidden. |  |
| `rowsAfter[].cells` | The list of cells in this row Required. |  |
| `removeWhenHidden` | Override the logic cleaning data for hidden components at task end, if you want to keep data referenced in hidden components. Currently only has effect if AppSettings.RemoveHiddenData is enabled. |  |
| `dataModelBindings` | See [Data model bindings](#data-model-bindings-datamodelbindings). Required. |  |
| `showValidations` | List of validation types to show |  |
| `validateOnSaveRow` | List of validation types to show |  |
| `edit` | See [Edit](#edit-edit). |  |
| `pagination` | Pagination options for the repeating group rows. See [Pagination](#pagination-pagination). |  |
| `maxCount` | Maximum number of rows that can be added. |  |
| `minCount` | Minimum number of rows that should be added. If the user has not added enough rows, the repeating group will show a validation error |  |
| `tableHeaders` | Array of component IDs that should be displayed as table headers. If not defined, all components referenced in the "children" property will be displayed as table headers |  |
| `tableColumns` |  |  |
| `hiddenRow` | Expression or boolean indicating whether each row should be hidden. An expression will be evaluated per row, and if it evaluates to true, the row will be hidden. If set to true, all rows will be hidden. |  |
| `stickyHeader` | If set to true, the header of the repeating group will be sticky |  |
| `labelSettings` | See [Label settings](#label-settings-labelsettings). |  |
| `addButton` | See [Add button](#add-button-addbutton). |  |
| `children` | List of child component IDs to show inside (will be repeated according to the number of rows in the data model binding) Required. |  |

## Text resource bindings (`textResourceBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `summaryTitle` | Title used in the summary view (overrides the default title) |  |
| `summaryAccessibleTitle` | Title used for aria-label on the edit button in the summary view (overrides the default and summary title) |  |
| `title` | The title of the group (shown above each instance in a Summary) |  |
| `description` | The description text shown underneath the title |  |
| `add_button_full` | The text for the "Add" button (overrides "add_button", and sets the full text for the button) |  |
| `add_button` | The text for the "Add" button (used as a suffix after the default button text) |  |
| `save_button` | The text for the "Save" button when the repeating group item is in edit mode |  |
| `save_and_next_button` | The text for the "Save and next" button when the repeating group item is in edit mode (only displayed if edit.saveAndNextButton is true) |  |
| `edit_button_close` | The text for the "Edit" button when the repeating group item is in edit mode (i.e. the user can close the edit mode) |  |
| `edit_button_open` | The text for the "Edit" button when the repeating group item is not in edit mode (i.e. the user can open the edit mode) |  |
| `pagination_next_button` | The text for the "Next" button in pagination |  |
| `pagination_back_button` | The text for the "Back" button in pagination |  |
| `multipage_back_button` | The text for the "Back" button in multipage navigation |  |
| `multipage_next_button` | The text for the "Next" button in multipage navigation |  |

## Data model bindings (`dataModelBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `group` | Required. |  |
| `group.dataType` | The name of the datamodel type to reference Required. |  |
| `group.field` | The path to the property using dot-notation Required. |  |

## Edit (`edit`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `mode` | The mode of the repeating group | `"hideTable"`, `"showTable"`, `"showAll"`, `"onlyTable"` |
| `addButton` | Expression or boolean indicating whether to show the "Add" button |  |
| `saveButton` | Expression or boolean indicating whether to show the "Save" button |  |
| `deleteButton` | Expression or boolean indicating whether to show the "Delete" button |  |
| `editButton` | Expression or boolean indicating whether to show the "Edit" button |  |
| `multiPage` | Turning this on makes it possible to display the edit mode for a repeating group with multiple inner pages. Every component referenced in the "children" property should have a prefix with the page number it should be displayed on (e.g. "1:component1", "2:component2", etc.) |  |
| `openByDefault` | If set to true, a row of the repeating group will be opened by default, if the group has no rows already. If set to "first" or "last", the first or last row will be opened by default | `"first"`, `"last"` |
| `alertOnDelete` | Expression or boolean indicating whether to show an alert when the user clicks the "Delete" button, prompting them to confirm the deletion |  |
| `saveAndNextButton` | Expression or boolean indicating whether to show the "Save and next" button when editing a repeating group row. This button will save the current row and open the next row for editing. |  |
| `alwaysShowAddButton` | If set to true, the "Add" button will always be shown, even if the user is currently editing another row |  |
| `compactButtons` | If true, edit and delete buttons in the table only show icons when the row is not in edit mode. Text will still be shown when the row is in edit mode. |  |

## Pagination (`pagination`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `rowsPerPage` | Required. |  |

## Label settings (`labelSettings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `optionalIndicator` | Show optional indicator on label |  |

## Add button (`addButton`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `size` | The size of the button. Only effective using style of primary or secondary | `"sm"`, `"md"`, `"lg"` |
| `textAlign` | Text align when using style of primary or secondary. | `"left"`, `"center"`, `"right"` |
| `fullWidth` | Whether a link button should expand to full width |  |
| `position` | Position the button left, center or right on the screen. | `"left"`, `"center"`, `"right"` |

## Common properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `id` | The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with <dash><number>. Required. |  |
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
