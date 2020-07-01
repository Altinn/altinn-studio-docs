---
title: Getting started
description: Get started working with the frontend
tags: [development, front-end]
weight: 10
---

The frontend is made up of several React applications. Each application covers a functional area.

## Technologies and frameworks
- https://reactjs.org/
- https://redux.js.org/
- https://redux-saga.js.org/


## Structure
The applications are grouped by the 2 solutions:

- Altinn Studio
- Altinn Apps

### Altinn Studio
{{%excerpt%}}
<object data="structure-studio.drawio.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

### Altinn Apps
{{%excerpt%}}
<object data="structure-apps.drawio.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

## Architecture
All of the apps are set up with the same overall architecture:

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app-frontend/react-architecture.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px"></object>
{{% /excerpt%}}

- **Component:** The react component
- **Props:** Define how the component should render
- **Store:** Contains all global state data used by the components
- **Action:** Triggered when a component updates
- **Reducer:** Listens to actions and updates the store according to which action is triggered
- **Redux-Saga:** Middleware. Intercepts the action before it reaches the reducer, in order to process data before it goes to the store. Useful for handling async operations like calling APIs.


