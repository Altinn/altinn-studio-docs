---
title: Navigation in apps
linktitle: Navigation
description: Setup of navigation in apps.
toc: true
weight: 10
---

# Navigation in apps

When we talk about navigation, it can mean several things: giving users the ability to move from page to page in an app, providing an overview of pages/topics in the app with a navigation field at the top, or showing all tasks included in an app in a left menu. This article describes all three possibilities.

## Moving from page to page with buttons

Users move between pages in the app/form using navigation buttons. The buttons are added automatically when you use Altinn Studio, but you can also add them manually in code.

### Adding navigation buttons manually in the layout file (NavigationButtons)

You add navigation buttons to all layout files where needed. If you want them to appear at the bottom of the page, you must place them at the bottom of the layout file.

Example configuration:

```json
{
  "id": "nav-page2",
  "type": "NavigationButtons",
  "textResourceBindings": {
    "next": "next",
    "back": "back"
  },
  "showBackButton": true
}
```

### Parameters for NavigationButtons

| Parameter            | Description                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| id                   | Unique ID for the component.                                               |
| type                 | Must be "NavigationButtons"                                                |
| textResourceBindings | Allows you to override the default button texts with your own texts.       |
| showBackButton       | Optional. Shows Previous and Next buttons instead of just the Next button. |

## Showing a side menu with the order of pages/tasks

In code, you define the order of pages in `Settings.json` for the layout set:

**File location:** `App/ui/*/Settings.json`

```json
{
  "pages": {
    "order": ["side1", "side2"]
  }
}
```

**Hide pages dynamically:** You can hide certain pages with dynamic expressions.

### Grouping pages

You can group pages and display them in a side menu as an alternative to traditional ordering. Then you replace `pages.order` with `pages.groups`:

**File location:** `App/ui/*/Settings.json`

```json
{
  "pages": {
    "groups": [
      {
        "name": "group.info",
        "type": "info",
        "order": ["info1", "info2"]
      },
      {
        "name": "group.form",
        "markWhenCompleted": true,
        "order": ["side1", "side2", "side3"]
      },
      {
        "order": ["oppsummering"]
      }
    ]
  }
}
```

#### Parameters for page groups

| Parameter         | Description                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| name              | Text resource that specifies the name of the page group. Must be included if the group contains more than one page. |
| type              | Optional. Use "info" or "default".                                                                                  |
| markWhenCompleted | Optional. Marks pages as completed when all validation errors are corrected and the user has seen the page.         |
| order             | Specifies which pages are included in the group.                                                                    |

## Showing process and tasks in the navigation menu

### Showing the process by defining it in code

You can display the entire process in the navigation menu in two ways. In code, you do this:

- **For the entire app:** in `layout-sets.json` with `uiSettings.taskNavigation`
- **Per layout set:** in `Settings.json` with `pages.taskNavigation`

Example for the entire app:

**File location:** `App/ui/layout-sets.json`

```json
{
  "uiSettings": {
    "taskNavigation": [
      {
        "name": "task.form",
        "taskId": "Task_1"
      },
      {
        "taskId": "Task_2"
      },
      {
        "type": "receipt"
      }
    ]
  }
}
```

#### Parameters for process steps

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| name      | Optional. Text resource that specifies the name of the task. |
| taskId    | Which task it concerns. Mandatory if type is not set.        |
| type      | "receipt". Mandatory if taskId is not set.                   |

### Showing navigation from Altinn Studio

In Studio, we have a dedicated navigation menu that you can add from the Designer page. You can choose whether to show all pages/tasks in the navigation, or just the ones you select.

#### Adding tasks to navigation

1. Open the app you want to add a navigation menu to.
2. Click on **Utforming** in the top menu. You'll go to the Oversikt page for Utforming, where you can see the tasks available in the app.
3. Under **Andre innstillinger**, you'll see a message at the top stating that you're not showing any tasks in the navigation menu yet. Below that, you'll find a table with tasks you can choose to display.
4. Select **Vis alle oppgavene** if you want to include all tasks in the navigation menu. You'll see that they become available in the top table. Select individual tasks with **Vis oppgaven** if you don't want to include all tasks.
5. The top table now shows the tasks you've chosen to display and the order they appear in. You can click on the three dots to the right of each task and choose whether to hide individual tasks or move them up and down to change the order of tasks in the navigation. Here you can also change the display name for a task and go directly to designing it.
6. Use the **Vis med navigasjonsmeny** button to preview the navigation menu on the left side of the app.

## Showing a progress indicator

A progress indicator is a small visual wheel that shows how far users have progressed in filling out or reading a form. It can be useful for giving users an overview of the total number of pages and where they are in the completion process. The progress indicator appears at the top right corner.

### Important to know

Tasks in the process count towards the total number of pages in the progress indicator. If you have set up track selection or dynamically hidden pages, the number of pages can vary greatly and seem confusing to the user.

Consider whether it makes sense and provides value for the user to add a progress indicator before choosing to add it.

### Adding the progress indicator itself

**File location:** `App/ui/*/Settings.json`

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "order": ["student-info", "school-work", "well-being"],
    "showProgress": true
  }
}
```

## Showing a navigation bar (NavigationBar)

A navigation bar appears at the top of the page in an app/form and can make it easier for users to see all pages in the app. It's important that you give each page good names for the navigation bar to be useful.

![Navigation field desktop](navigationbar-desktop.png "Navigation field desktop")

### How does it work?

- **Large screens:** All pages are shown in the list. If there isn't room on one line, the list continues on the next line.
- **Small screens:** All pages are hidden in a dropdown menu. The active page is shown in the menu. Users can click on the menu to see all pages.

### Adding the navigation bar in code

You add the navigation bar by inserting the code for it in all layout files where it should be used:

```json
{
  "id": "navbar-page1",
  "type": "NavigationBar"
}
```

### Showing the dropdown menu on all screens

In code, you can set up to show the pages in the navigation bar as a dropdown menu, even on larger screens:

```json
{
  "id": "navbar-page1",
  "type": "NavigationBar",
  "compact": true
}
```

### Changing the texts on buttons in the navigation bar

The buttons in the navigation bar get their names from the page's filename, without the file extension. For example, `side1.json` and `side2.json` become the buttons "side1" and "side2".

**How to change the texts:**

Add texts in `resources.XX.json`, where `id` is the filename without the extension:

```json
{
  "id": "side1",
  "value": "First page"
},
{
  "id": "side2",
  "value": "Last page"
}
```

## Specifying validation on page change

You can add code to check for validation errors when the user tries to go to the next page. Validation errors can, for example, mean that the user has forgotten to fill in a field or has filled it in with information in the wrong format. If there are errors, navigation is stopped with one of the validation codes in the section below.

### App frontend version 4

The NavigationButtons component has the properties `validateOnNext` and `validateOnPrevious`:

```json
{
  "id": "nav-buttons1",
  "type": "NavigationButtons",
  "textResourceBindings": {...},
  "validateOnNext": {
    "page": "current",
    "show": ["All"]
  }
}
```

**page can be:**

- `current` - only this page
- `all` - all pages
- `currentAndPrevious` - this and previous pages

**show contains which validation types are checked:**

- Schema
- Component
- Expression
- CustomBackend
- Required
- AllExceptRequired
- All

### Using NavigationBar with validation

The NavigationBar component has corresponding properties, `validateOnForward` and `validateOnBackward`:

```json
{
  "id": "nav1",
  "type": "NavigationBar",
  "validateOnForward": {
    "page": "current",
    "show": ["All"]
  }
}
```

### App frontend version 3

In version 3, you add a trigger to the navigation button:

```json
{
  "id": "nav-buttons1",
  "type": "NavigationButtons",
  "textResourceBindings": {
    "next": "Next"
  },
  "triggers": ["validatePage"]
}
```

#### Available triggers

| Trigger                         | Description                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| validatePage                    | Validates components on the current page.                                                                                  |
| validateAllPages                | Validates all components on all pages. Does not prevent the user from proceeding if there are only errors on future pages. |
| validateCurrentAndPreviousPages | Validates both current and previous pages.                                                                                 |
