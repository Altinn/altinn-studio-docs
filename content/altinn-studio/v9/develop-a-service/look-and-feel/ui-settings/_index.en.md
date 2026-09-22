---
draft: true
title: Page and task settings
description: Shared settings, task overrides and automatic saving.
weight: 50
toc: true
---

Use `App/ui/Settings.json` for settings shared across tasks. Place the properties directly in the object:

```json
{
  "showLanguageSelector": true,
  "showProgress": true,
  "autoSaveBehavior": "onChangeFormData"
}
```

## Override settings for a task

In `App/ui/<TaskId>/Settings.json`, page settings belong under `pages`. `defaultDataType` belongs at the top level and refers to the data type ID in the app's metadata:

```json
{
  "defaultDataType": "model",
  "pages": {
    "order": ["Page1", "Page2"],
    "showLanguageSelector": false,
    "autoSaveBehavior": "onChangePage"
  }
}
```

`order` contains the layout filenames without `.json`. Use either `order` or `groups` to arrange pages, not both.

A value set for the task overrides the shared setting. This includes `false`. Lists replace the shared list rather than extending it.

## Display and navigation

You can display the language selector with `showLanguageSelector`, progress with `showProgress` and the button for widening the form with `showExpandWidthButton`. `expandedWidth` opens the form at the expanded width. These settings default to `false`.

`hideCloseButton` hides the close button and defaults to `false`. `navigationTitle` can be a text resource key or an expression. `taskNavigation` controls which tasks appear in task navigation.

See also [PDF generation](/en/altinn-studio/v9/develop-a-service/process/pdf/) for PDF configuration.

## Automatic saving

The default `autoSaveBehavior` is `onChangeFormData`. The app saves when form data changes. Text fields can delay updates while the user types.

Set `autoSaveBehavior` to `onChangePage` to save on page changes instead. Server-side data processing then runs when the data is saved. Values calculated by the server therefore do not update with every change on the page. Account for this if the form uses these values in dynamic behaviour or validation.

A field's `saveWhileTyping` controls the delay before it updates form data. Reducing the delay does not make `onChangePage` save every field change.
