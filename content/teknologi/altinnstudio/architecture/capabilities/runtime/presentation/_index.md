---
title: Presentation (User Interface) Capabilities
linktitle: Presentation
description: Presentation Capabilities enable an application to manage the human-computer interface. 
tags: [architecture, todo]
toc: true
---

This includes capturing user actions and generating resulting events, presenting data to the user, and assisting in the management of the dialog flow of processing.

These capabilities is both targeting App developers creating applications in Altinn Studio and the application created in Altinn Studio and Deployed to Altinn Apps for end users.

## Rendering & Interaction Capabilities

### Composition
The app developer may create the layout of the App UI using Altinn Studio. Standard UI components are available, in addition the app developer may create custom components and/or layouts.

### Rendering

- The UI in Altinn Studio being presented to app developers, and
- The UI designed in Altinn Studio being presented in an app to end users,

use _client-side rendering_, and may be rendered by a web browser. 

TODO: Link to relevant archiecture component(s) providing this capability.

### Session & State Management

Cookies are used for client-side session management, both in Altinn Studio and Altinn Apps.

### Input Validation
- The UI in Altinn Studio being presented to app developers, and
- The UI designed in Altinn Studio being presented in an App to end users, 

support input validation of data inputed by App Developers or end users using Apps developed in Altinn Studio.

TODO: Link to relevant archiecture component(s) providing this capability.

### PDF Generation
Apps created in Altinn Studio have the possibility to have created a PDF of the UI designed in Altinn Studio.

TODO: Link to relevant archiecture component(s) providing this capability.

### Help

TODO: Link to relevant archiecture component(s) providing this capability.

###	Notification Management

TODO: Link to relevant archiecture component(s) providing this capability.

## Presentation Adaptation Capabilities

TODO: Link to relevant archiecture component(s) providing this capability.

### Multi-channel Presentation

App developers may use Altinn Studio in a web browser, or local development tools to create an app.
TODO: Link to relevant archiecture component(s) providing this capability.

### Responsive Presentation

- The UI in Altinn Studio being presented to app developers, and
- The UI designed in Altinn Studio being presented in an App to end users, 

support support responsive presentation.
TODO: Link to relevant archiecture component(s) providing this capability.

### Localization

The UI designed in Altinn Studio, being presented in an App to end users support localization, as defined by app developers.
TODO: Link to relevant archiecture component(s) providing this capability.

### Accessibility
The presentation both in Altinn Studio for the App Developer and the presentation created in Altinn Studio and presented in the App is created to fullfill WCAG 2.0

TODO: Link to relevant archiecture component(s) providing this capability.

### UI Design
This is typical a part of the development capabilities, but since the Altinn Studio Solutions lets App developers design the UI we need this as a runtime capabilitiy also. App developers can customize the UI design in the App presented to end users.

### UI Component Library
App developers have a UI component library available in Altinn Studio to select UI components from. 