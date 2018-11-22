---
title: UI - designer
linktitle: UI - designer
description: The UI-designer is the part of Altinn Studio where the service developer can create
tags: ["tjenester 3.0"]
weight: 99
---

{{<figure src="formdesigner1.png?width=1000" title="Definering av layout for tjenesten \"Starte Enkeltpersonforetak\"">}}

The possibility to effectly build a user friendly user interface for a service is a
essential feature for Altinn Studio. 

This is one of the more complex functionality developed as part of Altinn Studio.

The UI-designer is expected to have the following functionality

- Choose or change [overall layout](#overall-layout) / look & feel
- Defining on or more **views** for the service
  - Define **navigation** between views
- Define **detailed layout** pr. view (responsive design)
- Add reusable [webcomponents](#web-component) to detailed layout
  - Configuration of the web components
- Connection for **datamodel** og **server-side API** (The need for rules and validation should be performend also when accessing throug API.
- Connection for **text/translations**

{{<figure src="../ux-editor.gif?width=1000" title="Drag'n drop av web komponenter">}}

See all issues related to Altinn Studio and UI-designer on [Github](https://github.com/Altinn/altinn-studio/labels/ui-editor)


### Components
The following list of components has been defined. (list will be expanded)


### Radio button

{{<figure src="component_radiobutton1.png" title="Radio Button in designer">}}

{{<figure src="component_radiobutton2.png" title="Radio Button configuration">}}

{{<figure src="component_radiobutton3.png" title="Radio Button in runtime">}}

