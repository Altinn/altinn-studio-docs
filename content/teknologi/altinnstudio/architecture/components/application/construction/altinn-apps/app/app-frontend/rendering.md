---
title: App frontend rendering and flow
linktitle: Rendering
description: High-level overview of what happens when the app frontend is rendered
tags: [architecture]
toc: true
weight: 5
---

The sections below give a high-level overview of what happens when the app frontend is rendered.
Data that is loaded into the app frontend is placed in the Redux store, where it can be 
accessed by the React components during rendering.

## Loading general App resources - common for all apps and process task types
When an app is loaded initially, there is some data that is always loaded for the App, regardless of state or which 
process task the app is currently in. This includes the following data:
- **application metadata** - general metadata about the application
- **text resources** - json file containing all app-specific texts in a given language
- **user profile** - loaded from Altinn II
- **current party** - who the user is currently representing
- **language** - standard language text resources for the app. These are not app specific, but are included in all apps.

See the diagram below for an overview of what happens when the user loads the app for the first time, the flow goes up to 
the process specific part, which is detailed in the other sections.

![Rendering the app - general flow for all apps/processes](../app-frontend-rendering-general.drawio.svg "Rendering the app - general flow for all apps/processes")

## Loading App resources for a `data` type process task
A `data` type process task has a data model that can be populated, f.ex. through the use of forms. All the resources that are needed to support
displaying and/or updating data in the data model are loaded when an app is in a `data` type process task. This includes the following resources:
- **formData** - any data on the data model that has been previously saved.
- **layout sets** - an overview of the different layout sets available in the app.
- **jsonSchema** - a JSON schema representation of the data model for validation
- **layouts** - the actual layouts (within a given layout set) defining the form components to be rendered
- **ruleHandler** - a collection of rules that can be run client-side
- **ruleConfiguration** - the definitions of when any client-side rules should be triggered

See the diagram below for an overview of what happens when the user loads an app in a `data` process task, after the initial loading of general 
resources (and instantiation if needed) has completed.

![Rendering the app - flow for data type process task](../app-frontend-rendering-data.drawio.svg "Rendering the app - flow for data type process task")

## Rendering a form in `data` process task

![Rendering a form in the data process task](../app-frontend-form-rendering.drawio.svg "Rendering a form in the data process task")