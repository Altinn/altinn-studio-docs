---
title: Jest
description: How to write jest test in altinn studio, what we know so far
tags: [tech, frontend, test]
---

![Jest logo](jest-logo.png)

Here you can find information related to have jest tests are written for altinn studio code.

## Exporting your component
To be able to test methods in your component the best way is to export it in the following way:

```javascript
export class CloneServiceComponent extends React.Component<ICloneServiceComponentProps & RouteChildrenProps, ICloneServiceComponentState> {
```

and reference it in your test the following way:

```javascript
import { CloneServiceComponent } from '../../../src/dashboardServices/cloneService/cloneServices';

it('+++ this is the test', () => {

  const mountedComponent = mount(
    <CloneServiceComponent
      language={mockLanguage}
      services={mockServices}
      classes={mockClasses}
      location={mockLocation}
      history={mockHistory}
      match={mockMatch}
    />,
  );

  const instance = mountedComponent.instance() as CloneServiceComponent;
}
```

This will test the component without state, router or styles (read Material UI),
so values usually passed in by redux store, by means of routing or styles/Material UI needs to be reference as if they
are props passed into the component (match={mockMatch}).

## Testing your component
Methods can be called directly from your test, so you don't necessarly have to simulate an event to test your code.
This is done the following way:

```javascript
instance.getCurrentRepositoryInfo();
instance.componentDidMount();
```

In some cases it might be necessary to run componentDidMount() after you have mounted your component, before running your tests. Enzymez's mount() does not runcomponentDidMount().

If you have one function that calls another function, and you want to be sure that both functions ran at the end of the test, you can use jest's spyOn functionality described here:

```javascript
 const spy = jest.spyOn(instance, 'funcitonTwoCalledWithinFunctionOne');
 instance.funcitonOne();
 expect(spy).toHaveBeenCalled();
```

You can read more about Jest.expect() here: [Jest.expect()](https://jestjs.io/docs/en/expect)

## Testing with Material UI
In the example above, Material-UI will be excluded from the component. This means that opening a Material UI modal with a simulated click does not necessary give you the desired output.
Simulating a click on a Material ui button however works (unsure which other compoent this works for and not). If you want to simulate a click on a button this can be done using the buttons id and the simulate method from enzyme
the following way:

```javascript
mountedComponent.find('button#editService').simulate('click');
```

## get, post, put using networking in your test
If you are using get, post or put from the shared networking.ts component you need to mock the acctual call to be able to test functions that calls either get, post or put.
This can be done in the following way:

```javascript
// Add this to the import statements in you test file:
import * as networking from '../../../../shared/src/utils/networking';

// Then in you code you add this, before calling the funciton that contains the call form the networking component:
const mockResult = {}; //insert what the post method should return
const postSpy = jest.spyOn(networking, 'post').mockImplementation(() => Promise.resolve(mockResult));
instance.methodThatCallsPost();

// To resolve the promise and get post method to acctualy return something, you write the following:
return Promise.resolve().then(() => {
    // all tests that is about what happens after post returns should be written in here
    expect(postSpy).toHaveBeenCalled();
});
```

## Using Router
If you are testing a component that uses React Router, you might have to build router props and pass them to the component you are testing.
Here is an example on how this can be done:

```javascript
mockLocation = {
  pathname: 'pathname',
  search: 'search',
  state: {},
  hash: 'hash',
};

mockHistory = {
  length: 1,
  action: 'PUSH' as Action,
  location,
  push: () => false,
  replace: () => false,
  go: () => false,
  goBack: () => false,
  goForward: () => false,
  block: () => (null) as any,
  listen: () => (null) as any,
  createHref: () => '',
};

mockMatch = {
  params: {},
  isExact: false,
  path: '',
  url: '',
};
```
