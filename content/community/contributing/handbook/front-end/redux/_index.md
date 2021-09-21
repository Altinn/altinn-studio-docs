---
title: Redux
description: Guidelines for using Redux in Altinn Studio
tags: [development, front-end, react]
weight: 40
---
Redux is used to manage the states of the applications. The components update the states in the _Redux store_, instead of keeping state only within the component.
This allows components to easily react to state changes from other components.

### Redux Toolkit
As of 2021, we have started using Redux Toolkit rather than the traditional Redux setup. This allows us to get rid of a lot of boilerplate code. Read
more about Redux Toolkit [here](https://redux-toolkit.js.org/introduction/quick-start).

In practice, this affects the setup of actions and reducers. We currently use Redux Toolkit in Altinn Studio, and plan to update the App frontend as well.
Redux Toolkit also works well in parallel with the more traditional setup. In App frontend, any new reducers should be set up as _slices_ where possible,
using Redux Toolit. New actions can be set up using the `createAction` method, rather than the existing boilerplate setup.

#### `createAction`
React more about creating actions [here](https://redux-toolkit.js.org/tutorials/basic-tutorial#introducing-createaction).
Actions can also be created automatically within _slices_. The `createAction` command is useful for actions that are are not necessarily
handled by the reducer.

#### `createSlice`
Read more about slices [here](https://redux-toolkit.js.org/tutorials/basic-tutorial#introducing-createslice).
Slices combine the creation of actions and reducers into one command, thereby reducing the amount of code, as well as making the 
setup much more readable.

#### Dispatching actions
In the traditional setup, we use an action dispatcher. For App frontend, it is possible to combine f.ex. `createAction` with existing action dispatchers. 
Where possible, however, actions should be dispatched using the `dispatch` function, from the component itself. For class components, this function is provided
as a prop from `mapStateToProps`. For functional components using hooks, we can use `const dispatch = useDispatch()` where the `useDispatch` function comes from the 
`react-redux` package.

#### Examples
For examples of Redux Toolkit setup in the code, look at the Studio code, where all actions/reducers/dispatching has been updated to use Redux Toolkit.

## Basic concepts
Below is a short descriptions of some of the basic Redux concepts that we use. Note that these are described using the traditional Redux setup and not Redux Toolkit, but the 
concepts are the same in both cases.

### Store
This is where the overall states are stored. Each state is stored here as an object. 

### Actions
Actions are the events that are triggered when a change is made. An action contains the action type, and any metadata needed to complete the action. For example:

```typescript
export interface IUpdateFormData extends Action {
  field: string;
  data: any;
  componentId: string;
}

export function updateFormData(field: string, data: any, componentId: string): IUpdateFormData {
  return {
    type: actionTypes.UPDATE_FORM_DATA,
    field,
    data,
    componentId,
  };
}
```
In this example, a change in form data can trigger the `updateFormData` action, which contains an object with the action type, as well as the data/metadata. 

### Sagas
Redux saga is the middleware used to process information before the store is updated (i.e. before the reducer does its work). 

An example is asyncronous calls to backend APIs to get data, or submit data.

Each saga defines methods that complete different tasks, connected to actions. These methods are called via listeners that listen to the actions that are being dispatched. There are different sagas for all the different functional areas.

```typescript
/**
 * Define the saga for the UPDATE_FORM_DATA event
 */
function* updateFormDataSaga(action: ActionType) {
  try {
    // fetch some data
    const relevantData = yield selectRelevantStateObjects(...);
    ...
    // process the data
    const processedData = doRelevantLogic(relevantData);
    ...
    // trigger a new action to update the store
    yield call(updateFormDataSagaFulfilled, processedData, ... );
  } catch (err) {
    yield call(updateFormDataSagaRejected, err);
  }
}

/**
 * Define a listener for the UPDATE_FORM_DATA event
 */
export function* watchUpdateFormDataSaga(): SagaIterator {
  yield takeLatest(FormFillerActionTypes.UPDATE_FORM_DATA, updateFormDataSaga);
}
```

### Reducers
Redux reducers are used to update the different states in the store. There is one reduer per state. The reducers listen to the actions that are dispatched when changes are made, and update the state accordingly.

Example:

```typescript
const initialState: IFormDataState = {
  formData: {},
  error: null,
};

const FormDataReducer: Reducer<IFormDataState> = (
  state: IFormDataState = initialState,
  action?: Action,
): IFormDataState => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.UPDATE_FORM_DATA_FULFILLED: {
      const { field, data } = action as IUpdateFormDataFulfilled;
      return Immutable<IFormDataState>(state, {
        formData: {
          $setField: {
            field,
            data,
          },
        },
      });
    }

    case actionTypes.UPDATE_FORM_DATA_REJECTED: {
      const { error } = action as IUpdateFormDataRejected;
      return Immutable<IFormDataState>(state, {
        error: {
          $set: error,
        },
      });
    }

    default: {
      return state;
    }
  }
};

export default FormDataReducer;
```
