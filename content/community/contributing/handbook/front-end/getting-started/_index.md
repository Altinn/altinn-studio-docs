---
title: Getting started
description: Get started working with the frontend
tags: [development, front-end]
weight: 1
---

The frontend is made up of several React applications. Each application covers a functional area.

## Structure
The applications are grouped by the 3 solutions:

- Altinn Studio (Designer)
- Altinn Apps
- Altinn Platform (Receipt)

### Altinn Studio Designer
{{%excerpt%}}
<object data="structure-studio.drawio.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

### Altinn Apps & Platform
{{%excerpt%}}
<object data="structure-apps.drawio.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

## Technologies and frameworks
- https://reactjs.org/
- https://redux.js.org/
- https://redux-saga.js.org/
- https://material-ui.com/

## Architecture
Each frontend runs within a .NET web application, where the transpiled javascript & CSS are referenced.
- For Altinn Studio Designer and Altinn.Platform.Receipt, these files are deployed as part of the application itself.
- For Altinn.Apps frontend, these files are hosted on a CDN, and loaded in at runtime.

![Web application high level](web-application-structure.drawio.svg "High level overview of web application structure")

All of the frontend apps are set up with the same overall React + Redux architecture:

{{%excerpt%}}
<object data="/app-template/architecture/app-frontend/react-architecture.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

- **Component:** The react component
- **Props:** Define how the component should render
- **Store:** Contains all global state data used by the components
- **Action:** Triggered when a component updates
- **Reducer:** Listens to actions and updates the store according to which action is triggered
- **Redux-Saga:** Middleware. Intercepts the action before it reaches the reducer, in order to process data before it goes to the store. Useful for handling async operations like calling APIs.

### App frontend

Details of the architecture for app frontend can be found [here](/app-template/architecture/app-frontend).

### Altinn Studio Designer frontend

Details of the architecture for Altinn Studio Designer frontend can be found [here](/altinn-studio/architecture/designer/frontend/)
