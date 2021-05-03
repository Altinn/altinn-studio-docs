---
title: Getting started
description: Get started working with the frontend
tags: [development, front-end]
weight: 1
---

The frontend is made up of several React applications. Each application covers a functional area.

## Technologies and frameworks
- https://reactjs.org/
- https://redux.js.org/
- https://redux-saga.js.org/
- https://material-ui.com/


## Structure
The applications are grouped by the 2 solutions:

- Altinn Studio (Designer)
- Altinn Apps

### Altinn Studio Designer
{{%excerpt%}}
<object data="structure-studio.drawio.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

### Altinn Apps
{{%excerpt%}}
<object data="structure-apps.drawio.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

## Architecture
All of the apps are set up with the same overall React + Redux architecture:

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app-frontend/react-architecture.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

- **Component:** The react component
- **Props:** Define how the component should render
- **Store:** Contains all global state data used by the components
- **Action:** Triggered when a component updates
- **Reducer:** Listens to actions and updates the store according to which action is triggered
- **Redux-Saga:** Middleware. Intercepts the action before it reaches the reducer, in order to process data before it goes to the store. Useful for handling async operations like calling APIs.

### App frontend
Details of the architecture for app frontend can be found [here](/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app-frontend).

### Altinn Studio Designer frontend
Details of the architecture for Altinn Studio Designer frontend can be found [here](/teknologi/altinnstudio/architecture/components/application/construction/altinn-studio/designer/frontend/)
