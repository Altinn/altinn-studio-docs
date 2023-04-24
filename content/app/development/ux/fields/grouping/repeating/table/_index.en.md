---
title: Table configuration
linktitle: Table
description: Configuration for the table that is shown above repeating groups
weight: 2
toc: true
---

## Separate title for table view

Items in repeating groups that are not in editing mode are shown as a table. This table view has limited space for long prompts. A shorter prompt for table views can be set by defining `tableTitle` in `textResourceBindings` for each component in the repeating group.

Example:

```json
{
  ...
  "type": "Input",
  "textResourceBindings": {
    "title": "Enter your full name",
    "tableTitle": "Name"
  },
  ...
},
```

## Widths, alignment and overflow for columns

Using the `tableColumns` property makes it is possible to configure the width, text alignment, and number of lines to show in a cell for columns.

- `width` - set to a string value containing a percentage, ex: `"25%"`, or `"auto"` (default).
- `alignText` - choose between `"left"`, `"center"` or `"right"` to align text in table cell accordingly.
- `textOverflow` - is used to controll behaviour when text content is too large for a table cell.
    - `lineWrap` - set to `false` in order to turn of linebreaking. Default is `true`.
    - `maxHeight` - sets number of lines before overflowing text is hidden with an elipsis (...). `"maxHeight": 0` results in turning off linebreaking.
- `editInTable` - set to `true` to enable editing of the component in the table view. Default is `false`. See more about this in the [section describing this functionality](#showing-components-directly-in-the-table).
- `showInExpandedEdit` - set to `false` to hide the component in the expanded edit view. Default is `true`. See more about this in the [section describing this functionality](#showing-components-directly-in-the-table).

Example:

```json
{
  ...
  "tableHeaders": [
    "streetAdress",
    "postalNumber",
    "city"
  ],
  "tableColumns": {
    "streetAdress": {
      "width": "20%",
      "alignText": "left",
      "textOverflow": {
        "lineWrap": true, 
        "maxHeight": 1
      }
    },
    "postalNumber": {
      "alignText": "right"
    },
    "city": {
      "width": "auto",
      "alignText": "left",
      "textOverflow": {
        "lineWrap": true,
        "maxHeight": 3
      }
    }
  },
  ...
}
```

![Example for column options](column-options-example.png "Example for column options")

## Showing components directly in the table

It is possible to show components directly in the table view. This is done by setting `editInTable` to `true` for the
component in question, via the [tableColumns](#widths-alignment-and-overflow-for-columns) property. This is useful for
components and groups that are not very complex, and where it is not necessary to show the component in the expanded edit view.
Visually, this can make the repeating group functionality resemble some configurations of
the [Grid component](../../../../components/grid), but allows the user to add/remove rows from the table - and allows
for storing the data in a repeating structure in the data model.