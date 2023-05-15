---
title: React + Redux architecture
linktitle: React + Redux
description: High-level description of React + Redux architecture used in app frontend
tags: [architecture]
toc: true
weight: 1
---

The app frontend uses the [React](https://reactjs.org/) and [Redux](https://redux.js.org/) frameworks for presenting a UI to the end user,
together with [redux-saga](https://redux-saga.js.org/) to handle side effects. Components are based on [Material UI](https://material-ui.com/)
components.

The diagram below show the architecture:

![React architecture](../react-architecture.svg "React architecture")

## Store
 A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action
 on it.

 [Read more](https://redux.js.org/api/store#store).

## Reducers
Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only
describe what happened, but don't describe how the application's state changes.

 [Read more](https://redux.js.org/basics/reducers#reducers).

## Middleware
`redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure
things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

[Read more](https://redux-saga.js.org/).

## Best practices
We try to follow some best-practices for React architecture:

- _Small, function-specific components_
  - UI components are "dumb", this keeps the amount of logic to a minimum within the components.

- _Reusability_
  - UI components are shared across apps. 
  - Shared components between app frontend and receipt frontend .
  - Use Material UI components as much as possible instead of building our own components from scratch.

- _DRY code_
  - Use shared resources across features to avoid duplication of code.
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
