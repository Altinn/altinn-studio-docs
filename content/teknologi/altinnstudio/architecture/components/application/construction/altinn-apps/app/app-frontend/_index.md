---
title: App Frontend Application Architecture
linktitle: App Frontend
description: Description of the Application architecture for App-Frontend
tags: [architecture]
weight: 100
---

App Frontend is a [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) built using React + Redux.

This application is responsible for presenting a UI to the end user. The application consists of several different features
that are responsible for handling the UI for different steps in the workflow.

The app frontend is automatically built and deployed to a CDN, and is versioned using [semantic versioning](https://semver.org/). 
Each App developed in Altinn Studio will reference the app frontend, which will be served by the CDN. By default,
an app will reference the latest _major_ version that was available when the app was created. Each app may reference a specific
version, so that there can be different versions of the app frontend for two different deployed apps.

## React Architecture
The app frontend uses the [React](https://reactjs.org/) and [Redux](https://redux.js.org/) frameworks for presenting a UI to the end user,
together with [redux-saga](https://redux-saga.js.org/) to handle side effects. Components are based on [Material UI](https://material-ui.com/)
components.

The diagram below show the architecture:

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app-frontend/react-architecture.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}

### Store
 A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action
 on it.

 [Read more](https://redux.js.org/api/store#store)

### Reducers
Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only
describe what happened, but don't describe how the application's state changes.

 [Read more](https://redux.js.org/basics/reducers#reducers)

### Redux-Saga
`redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure
things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

[Read more](https://redux-saga.js.org/)

We try to follow some best-practices for React architecture:

- _Small, function-specific components_
  - UI components are "dumb", this keeps the amount of logic to a minimum within the components.

- _Reusability_
  - UI components are shared across apps. 
  - Shared components between app frontend and receipt frontend .
  - Use Material UI components as much as possible instead of building our own components from scratch.

- _DRY code_
  - Use shared resources accross features to avoid duplication of code.
  - Share resources/utils between app frontend and receipt frontend.

- _Comments only where necessary_
  - Function and component names should be self-explanatory.
  - Avoid clutter and having to update comments when things change.

- _Component names in capital_

- _Keep complex data-loading logic separate from rendering of components_
  - State is handled by redux as much as possible
  - Data should be passed as props to UI components where possible

- _Use a feature-based code structure_
  -  Code related to a feature should be grouped together, rather than grouping code by function (actions/reducers etc).

- _Follow linting rules_
  - Use a code analyzer to make sure linting rules are followed, for clean readable code


## App Frontend Features
The App Frontend SPA is seperated in serveral features that is a collection of components and containers that support a given
functional area for a App. Typical a feature is connected to a type of workflow step. Like formfilling, signing, ++.

Support for new types of workflow steps will be added as they become available in the backend.

### Instantiate
This feature is responsible for creating a specific instance of the app for the end user. This feature validates the selected
party by checking authorization, and gives the user the option to select a new party (if available) if the current party is 
invalid. Once a user/party is validated, the backend API to create an instance is called, and the user is sent to the first
process step defined for the app. 

### Form
This feature is responsible for the form filling process step. This includes rendering the form UI designed in Altinn Studio,
running any rules/dynamics, calling APIs to perform calulations, validations, save form data, submit/move process to next step.

To render the form UI, the _form layout_ defined in Altinn Studio is used together with metadata about the data model. The form
components are rendered based on the contents of the form layout.

### Receipt
This feature is responsible to show the summary of the instance when an app is sent to end state of the process flow.

## Configuration files
The App Frontend requires some configuration files to work correctly. These files are loaded through APIs.

### FormLayout.json
The _form layout_ is used to render the UI for the _form_ feature. It defines which layout elements should be rendered,
in what order, and contains details about how they should be rendered (ex. text keys, data model, etc.)

[See details about FormLayout.json](/solutions/altinn-studio/altinn-studio-repos/structure/form-layout/)

### Language
All text resources that are used in the app frontend.

### ServiceMetadata
Contains information about the data model and is used by UI-render to map the fields to the data model. 

[See details about ServiceMetadata.json](/solutions/altinn-studio/altinn-studio-repos/structure/form-layout/)
