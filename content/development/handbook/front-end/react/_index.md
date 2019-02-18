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

### Links

- [Documentation for react components](https://reactjs.org/docs/react-component.html)