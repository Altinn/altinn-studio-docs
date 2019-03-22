---
title: React
description: Guidelines for using React in Altinn Studio
tags: ["development", "handbook", "front-end", "react"]
weight: 100
---

### React

React is a library for developing component based applications. It is done by having declared html as xml in javascript code, and that is again transpiled into vanilla javascript for the browser to render into a page.

#### React Components lifecycle

There are sequences that are called when mounting, updated, unmounted and error-catching for every component in React. This is the order they are called:

##### Mounting

1. `constructor()`
2. `static getDerivedStateFromProps()`
3. `render()`
4. `componentDidMount()`

##### Updating

1. `static getDerivedStateFromProps()`
2. `shouldComponentUpdate()`
3. `render()`
4. `getSnapshotBeforeUpdate()`
5. `componentDidUpdate()`

##### Unmounting

1. `componentWillUnmount()`

##### Error handling

1. `static getDerivedStateFromError()`
2. `componentDidCatch()`

#### Other React component APIs and properties

##### APIs

1. `setState()`
2. `forceUpdate()`

##### Class Properties

1. `defaultProps`
2. `displayName`

##### Instance Properties

1. `props`
2. `state`

### Adding a new react-app to altinn.studio

When adding a new react-app, use the template folder that is in the github repo. Create a new folder in the `src/react-apps/applications`-folder and copy the contents from the `src/react-apps/templates/template-app`-folder of that newly created folder.  
Then change the names in the `package.json`-file and start developing the new application.  
In the templates folder, in the `src/index.tsx`-file, a function called `run` is commented out, if your application needs to have sagas, uncomment the `run`-function which should initialize the sagas.

### Links

- [Documentation for react components](https://reactjs.org/docs/react-component.html)