---
title: Auto Save Behavior
description: Configuring how frequently the client saves the form data
---

{{%notice warning%}}
This feature does not support single field validation.
{{%/notice%}}

Changing this behavior can change how often the app saves data to the backend.
The configuration can be done in both layout-sets.json and Settings.json.

```json
// layout-sets.json
{
  "sets": [...],
  "uiSettings": {
    "autoSaveBehavior": "onChangePage"
  }
}
```

```json
// Settings.json
{
  "pages": {
    "autoSaveBehavior": "onChangePage"
  }
}
```

## onChangeFormData (Default)

Saves data to the backend on every interaction with a form component.
This is the default behavior.

## onChangePage

Saves data to the backend on navigation between pages.
This includes navigating with the NavigationBar-component, NavigationButtons-component and the Back button Icon.

### Improves server performance on high demand

On change page behavior can improve server performance in Azure if your app has many users in a short period of time.
However you must consider that the app will not save the form if the user hasn't navigated between pages or submitted.
A page refresh will then loose the data.
