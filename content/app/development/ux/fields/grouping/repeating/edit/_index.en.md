---
title: Row editing settings
linktitle: Edit
description: Change how to edit/fill out a row in a repeating group
weight: 1
toc: true
---

A parameter, `edit`, can be set up on a group component (only for repeating groups). This allows us to define various settings
in regards to displaying a group element when editing/filling out. The following settings can be set:

## mode

Defines whether the table (that displays all elements in the group) should be displayed when an element is open in editing-mode.
The following values are allowed:

| Value       | Description                                                                                                                      |
|-------------|----------------------------------------------------------------------------------------------------------------------------------|
| "showTable" | Default behaviour if nothing else has been specified. Displays the table for editing of group-element.                           |
| "hideTable" | Hides the table when a group-element is open for editing.                                                                        |
| "showAll"   | Hides the table. Shows all elements in the group in editing mode below each other. The save button is hidden.                    |
| "onlyTable" | Shows the table, but never shows the editing area for a group row. Useful when [editing directly in table](../table).            |
| "likert"    | Likert display. Must be used if the first and only component in the group is a [Likert component](../../../../components/likert) |

## addButton

Determines whether the "Add new" button is displayed below the table. It is useful to hide this if you only wish to display data.

## alwaysShowAddButton

Determines whether the "Add new" button is displayed below the table when a row is open. It is displayed if ``"alwaysShowAddButton": true`` and the following two conditions are met: (1) [addButton](http://localhost:1313/app/development/ux/fields/grouping/alternatives/#addbutton) is **not** set to ``false``, (2) number of rows has not reached its upper limit, [maxCount.](http://localhost:1313/nb/app/development/ux/fields/grouping/setup/)\
A use-case for this setting is to allow users to add more rows without clicking to save and close existing rows first, which is especially useful in combination with [openByDefault](http://localhost:1313/nb/app/development/ux/fields/grouping/alternatives/#openbydefault) (where it might not be obvious to the user that more rows can be added).

## editButton
Determines whether the "Edit" button is displayed for each row in the table. The default behaviour if the parameter is
not set is for the "Edit" button to be displayed. If you have set [`mode`](#mode) to `onlyTable`, this setting
is ignored and the "Edit" button is always hidden.

## saveButton
Determines whether the "Save" button is displayed when a group element is in editing mode. The default behaviour if the parameter is not set is for the "Save" button to be displayed.
If you have set `"mode": "showAll"`, the "Save" button is always hidden, since in this mode you do not have the opportunity to close the editing area for
the group-element. The data is still saved.

## deleteButton

Determines whether the "Delete" button is displayed when a group element is in editing mode. The default behaviour if the parameter is not set is for the "Delete" button to be displayed.

## multiPage

Editing/filling out pages can be performed over multiple "pages"/displays. Requires more setup to work,
[see the dedicated documentation for this feature](../multipage).

## filter

Allows you to filter out some rows, so that only a subset of the rows are displayed. This option is deprecated and
will be removed in a future version. More information and a description of alternatives can be found [in the documentation dedicated to dynamics in repeating groups](../dynamics).

## openByDefault

Open the group in editing mode by default. The following values are allowed:

| Value   | Description                                                                                                                                                                                                                     |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| "first" | If there are prefilled items or existing data in the group, the first item will be opened in editing mode by default. If there are no items in the group to begin with, a new item will be added and is opened in editing mode. |
| "last"  | If there are prefilled items or existing data in the group, the last item will be opened in editing mode by default. If there are no items in the group to begin with, a new item will be added and is opened in editing mode.  |
| true    | If there are no prefilled items or existing data in the group to begin with, a new item will be added and is opened in editing mode.                                                                                            |
| false   | No items will be opened by default.                                                                                                                                                                                             |

Note that this setting has no effect when be used with `"mode": "showAll"`.

Example:

```json
{
  ...
  "edit": {
    "openByDefault": "first"
  }
}
```

## saveAndNextButton

Determines whether the "Save and open next" button should be displayed when a group element is open in editing mode. This button is not visible if this parameter is not set.

Note that this setting has no effect when be used with `"mode": "showAll"`.

## alertOnDelete

Determines whether a warning panel will open when the user presses the "Delete" button. A potential situation where this might be useful is when a row contains a lot of data.
The default behaviour if the parameter is not set, is for the warning panel not to be displayed.

Example:

```json
{
  ...
  "edit": {
    "alertOnDelete": true
  }
}
```

