---
title: Unit testing with Jest
linktitle: Unit testing
description: How to write jest test in altinn studio, what we know so far. This page summarizes how UI testing is performed with Jest and related libraries for Altinn Studio.
tags: [development, front-end, testing]
weight: 100
toc: true
---

## When should you write tests?
Unit testing includes testing of javascript functions and react/UI components.
Listing of the highest priority of unit-testing:

* API calls with the correct formatted parameters
* Rendering of isolated components.
* Functions in general.  


## Exporting and importing your component
A quick way to get started testing your component is first to export the React Component:

```javascript
export class CloneServiceComponent extends React.Component<ICloneServiceComponentProps & RouteChildrenProps, ICloneServiceComponentState> {
```

and then reference it in your test the following way:

```javascript
import { CloneServiceComponent } from '../../../src/dashboardServices/cloneService/cloneServices';

it('+++ this is the test', async () => {

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
so values usually passed in by Redux store, by means of routing or styles/Material UI needs to be reference as if they
are props passed into the component (match={mockMatch}).

## Methods in your component
Methods can be called directly from your test, or executed when clicked on UI elements (See own section).
Calling methods is done like this:

```javascript
instance.getCurrentRepositoryInfo();
instance.componentDidMount();
```

> If you call networked functions in componentDidMount() you need to mock the networked functions before mounting.

If you have one function that calls another function, and you want to be sure that both functions ran at the end of the test, you can use jest's spyOn functionality described here:

```javascript
 const spy = jest.spyOn(instance, 'funcitonTwoCalledWithinFunctionOne');
 instance.functionOne();
 expect(spy).toHaveBeenCalled();
```

> You can read more about Jest.expect() here: [Jest.expect()](https://jestjs.io/docs/en/expect)

## User Interface and Methods
In the example above, testing the actual interface is excluded.
Simulating a click on an element might need to be performed twice in some cases. Simulating a click can be done using the elements ID and the simulate method from Enzyme:

```javascript
mountedComponent.find('button#editService').simulate('click');
```

> ReactWrapper will pass a SyntheticEvent object to the event handler in your code.
If the code you are testing uses properties that are not included in the SyntheticEvent,
for instance event.target.value, you will need to provide a mock event for it to work.
[Read more at Enzyme's Simulate documentation here](https://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html).

## Networked functions (get, post, put)
If you are using get, post or put from the shared networking.ts component you need to mock the actual call to be able to test functions that calls either get, post or put.
This can be done in the following way:

```javascript
// Add this to the import statements in you test file:
import * as networking from '../../../../shared/src/utils/networking';

// To resolve the promise and and to return the value, first make sure your test is async:
it('should handle successfully returned data from API', async () => {

  /* Mounting goes here, commented to get markdown colors correctly
    const mountedComponent = mount(
      <HandleMergeConflictAbort
        language={mockLanguage}
      />,
    );
  */

  // Creating the instance so you can spy or call methods directly
  const instance = mountedComponent.instance() as HandleMergeConflictAbort;

  // Spies for regular methods
  const spyOnClickFunctionHandler = jest.spyOn(instance, 'clickFunctionHandler');

  // Before you call the methods which use netowrking, you must create the spy and mock:
  const mockData = {
    isSuccessStatusCode: true,
  };
  const getStub = jest.fn();
  const mockGet = jest.spyOn(networking, 'get').mockImplementation(getStub);
  getStub.mockReturnValue(Promise.resolve(mockData));

  // Simulate clicks
  mountedComponent.find('button#editService').simulate('click');
  // OR call methods
  instance.clickFunctionHandler();

  // Expect functions to be called, both handler and networking
  expect(spyOnClickFunctionHandler).toHaveBeenCalled();
  expect(mockGet).toHaveBeenCalled();

  // Resolve mocked networking
  await Promise.resolve();

  // Expect something to happen
  expect(instance.state.networkingRes.isSuccessStatusCode).toEqual(true);

});

```

## Rejecting Promises / Error testing / Negative tests

If you want to test how your component handles rejected Promises / errors, for example in your Try/Catch you can use the following modification:

```javascript
// This is the rejected version of the mock gode
const mockError = Error('mocked error');
const getStub = jest.fn();
const mockGet = jest.spyOn(networking, 'get').mockImplementation(getStub);
getStub.mockReturnValue(Promise.reject(mockError));

// You "execute" the network function the same way as a resolved promise
await Promise.resolve();
```

You can spy on the console.error with the following code:

```javascript
let consoleError: any;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
    return {};
  });
});

// And the following inside your test:
expect(consoleError).toHaveBeenCalled();
```

> [See example #2, for more detailed test](#example-2-negative-test-error-handling)

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

## Example #1, positive test

```javascript
import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';
import * as networking from '../../shared/src/utils/networking';

import { HandleMergeConflictAbort } from '../src/features/handleMergeConflict/components/HandleMergeConflictAbort';

describe('HandleMergeConflictAbort', () => {
  let mockLanguage: any;

  beforeEach(() => {
    mockLanguage = {};
  });

  it('should handle successfully returned data from API', async () => {
    const wrapper = mount(
      <HandleMergeConflictAbort
        language={mockLanguage}
      />,
    );

    const instance = wrapper.instance() as HandleMergeConflictAbort;

    // Spies
    const spyOnAbortPopover = jest.spyOn(instance, 'AbortPopover');
    const spyOnAbortConfirmed = jest.spyOn(instance, 'AbortConfirmed');

    // Mocks
    const mockData = {
      isSuccessStatusCode: true,
    };
    const getStub = jest.fn();
    const mockGet = jest.spyOn(networking, 'get').mockImplementation(getStub);
    getStub.mockReturnValue(Promise.resolve(mockData));

    // Expected no result from networking yet
    expect(instance.state.networkingRes).toEqual(null);

    // Expect discard button to exist
    expect(wrapper.exists('#abortMergeBtn')).toEqual(true);

    // workaround, have to click twice the first time
    wrapper.find('button#abortMergeBtn').simulate('click');
    // Click the discard button
    wrapper.find('button#abortMergeBtn').simulate('click');
    expect(spyOnAbortPopover).toHaveBeenCalled();

    // Expect the button inside the popover to exist
    expect(wrapper.exists('#abortMergeConfirmBtn')).toEqual(true);

    // Click the confirm button
    wrapper.find('button#abortMergeConfirmBtn').simulate('click');

    // Expect functions to be called
    expect(spyOnAbortConfirmed).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalled();

    // Expect state to change
    expect(instance.state.popoverState.isLoading).toEqual(true);
    expect(instance.state.popoverState.shouldShowDoneIcon).toEqual(false);

    // Resolve mocked networking
    await Promise.resolve();

    // Expect state to change
    expect(instance.state.popoverState.isLoading).toEqual(false);
    expect(instance.state.popoverState.shouldShowDoneIcon).toEqual(true);
    expect(instance.state.networkingRes.isSuccessStatusCode).toEqual(true);

  });
});
```

## Example #2, negative test (Error handling)
```javascript
import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';
import * as networking from '../../shared/src/utils/networking';

import { HandleMergeConflictAbort } from '../src/features/handleMergeConflict/components/HandleMergeConflictAbort';

describe('HandleMergeConflictAbort', () => {
  let mockLanguage: any;
  let consoleError: any;

  beforeAll(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
      return {};
    });
  });

  beforeEach(() => {
    mockLanguage = {};
  });

 it('should catch error from networked function', async () => {
    const wrapper = mount(
      <HandleMergeConflictAbort
        language={mockLanguage}
      />,
    );

    const instance = wrapper.instance() as HandleMergeConflictAbort;

    // Spies
    const spyOnAbortPopover = jest.spyOn(instance, 'AbortPopover');
    const spyOnAbortConfirmed = jest.spyOn(instance, 'AbortConfirmed');

    // Mocks
    const mockError = Error('mocked error');
    const getStub = jest.fn();
    const mockGet = jest.spyOn(networking, 'get').mockImplementation(getStub);
    getStub.mockReturnValue(Promise.reject(mockError));

    // Expected no result from networking yet
    expect(instance.state.networkingRes).toEqual(null);

    // Expect discard button to exist
    expect(wrapper.exists('#abortMergeBtn')).toEqual(true);

    // workaround, have to click twice the first time
    wrapper.find('button#abortMergeBtn').simulate('click');
    // Click the discard button
    wrapper.find('button#abortMergeBtn').simulate('click');
    expect(spyOnAbortPopover).toHaveBeenCalled();

    // Expect the button inside the popover to exist
    expect(wrapper.exists('#abortMergeConfirmBtn')).toEqual(true);

    // Click the confirm button
    wrapper.find('button#abortMergeConfirmBtn').simulate('click');

    // Expect functions to be called
    expect(spyOnAbortConfirmed).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalled();

    // Error is thrown
    await Promise.resolve();

    // Expect state to change, and error to be saved to state
    expect(instance.state.popoverState.isLoading).toEqual(false);
    expect(instance.state.popoverState.shouldShowDoneIcon).toEqual(false);
    expect(instance.state.errorObj).toMatchObject(Error('mocked error'));
    expect(instance.state.networkingRes).toEqual('error');

    // Expect console.error to be called.
    expect(consoleError).toHaveBeenCalled();

  });
});
```
