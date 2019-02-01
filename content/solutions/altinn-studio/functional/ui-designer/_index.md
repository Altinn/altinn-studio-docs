---
title: UI Designer
description: The UI-designer is the part of Altinn Studio where the service developer can create a form
tags: ["studio", "ui-designer"]
---

The possibility to effectly build a user friendly user interface for a service is an essential feature for Altinn Studio. this is one of the more complex functionalities developed as part of Altinn Studio. 

The UI-designer has the following functionality:

- Define a **detailed layout** (responsive design)
  - Add reusable [form components](#components)
    - Configure form components
      - Connection to **data model**
      - Connection to **texts/translations**
- Define/configure connections to **external API**
- Define/configure rules for [validation](#validation), [calculation](#calculation) and [dynamics](#dynamics)

See all issues related to Altinn Studio and UI-designer on [Github](https://github.com/Altinn/altinn-studio/labels/ui-editor)

{{<figure src="ux-editor-dnd.gif?width=800" title="Drag'n drop av web komponenter">}}

### Form components
The form components are reusable components that are used to build the user interface of the service. Examples include input fields and title components. See a list of all available form components [here](components).

It is also possible to define custom components and use this in the service. 
