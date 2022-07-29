---
title: UI Design
description: The UI-designer is the part of Altinn Studio where the developer can create UI for the app.
toc: true
---

The possibility to effectly build a user friendly user interface for an app, is an essential feature for Altinn Studio.
This is one of the more complex functionalities developed as part of Altinn Studio. 

The UI-designer has the following functionality:

- Define a **detailed layout** (responsive design)
  - Add reusable [form components](#form-components)
    - Configure form components
      - Connection to **data model**
      - Connection to **texts/translations**
- Define/configure connections to **external API**
- Define/configure rules for [validation](/app/development/logic/validation), [calculation](/app/development/logic/calculation) and [dynamics](/app/development/logic/dynamic)

![Drag'n drop of web components](ux-editor-dnd.gif "Drag'n drop of web components")

## Form components

The form components are reusable components that are used to build the user interface of the app.
Examples include input fields and title components. See a list of all available form components [here](/ui-components/).

It is also possible to define custom components and use this in the app. 


## Multiple form layouts
In the future Altinn Studio will support creating different UI for seperate datamodels for sub forms or forms in seperate form filling task in a process.


[See all Github issues for UI-editor](https://github.com/Altinn/altinn-studio/labels/area%2Fui-editor).
