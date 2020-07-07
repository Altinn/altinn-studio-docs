---
title: React
description: Guidelines for using React in Altinn Studio
tags: [development, react]
weight: 30
---

## React

React is a library for developing component based applications. It is done by having declared html as xml in javascript code, and that is again transpiled into vanilla javascript for the browser to render into a page.

Get started by looking at the [Getting started docs](https://reactjs.org/docs/getting-started.html) or trying the [tutorial](https://reactjs.org/tutorial/tutorial.html).

### Important concepts
The 2 most important concepts when working with React components are _state_ and _props_. 

**State** is a collection of properties, controlled by the component, that say what the current state of the component is - this can be used to determine how the component should be rendered. 

**Props** is a collection of properties that are _passed_ to the component as input. They can also be used to determine how the component should render. 

Any time the state or props of a component is updated, the component re-renders.

### Class components
Class components are React components defined as classes. We used class components when we started building Altinn Studio, and most of the components for the Altinn Studio applications are still class components.

```jsx
// Example component
import * as React from React

export interface IExampleComponentProps {
  id: string;
  title: string;
}

export interface IExampleComponentState {
  value: string;
}

export class ExampleComponent extends 
React.Component<IExampleComponentProps, IExampleComponentState> {
  public onChange = (event: any) => {
    setState(event.target.value);
  }

  public render(
    <div id={this.props.id}>
      <label htmlFor={`input-${this.props.id}`}>{this.props.title}</label>
      <input
        id={`input-${this.props.id}`}
        value={this.state.value}
        onChange={this.onChange}
      />
    </div>
  );
}
```

Read more about class components [here](https://reactjs.org/docs/react-component.html).

When writing a new component, or refactoring an existing class component, use hooks where possible.

### Functional components - React hooks
Hooks are new in React 16.8, and allow us to use state directly in functional components - components that are defined as functions. Using functional components with hooks results in cleaner, shorter code. Most of the components for the Altinn Apps applications are functional components using hooks. 

```jsx
// Example component
import * as React from React

export interface IExampleComponentProps {
  id: string;
  title: string;
}

export function ExampleComponent(props: IExampleComponentProps) : JSX.Element {
  const [value, setValue] = React.useState<string>('');
  
  const onChange = (event: any) => {
    setValue(event.target.value);
  }

  return(
    <div id={props.id}>
      <label htmlFor={`input-${props.id}`}>{props.title}</label>
      <input
        id={`input-${props.id}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
```

Read more about React hooks [here](https://reactjs.org/docs/hooks-intro.html)

## Links

- [Documentation for react components](https://reactjs.org/docs/react-component.html)
