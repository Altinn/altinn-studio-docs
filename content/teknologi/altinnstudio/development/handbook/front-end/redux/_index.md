---
title: Redux
description: Guidelines for using Redux in Altinn Studio
tags: [development, front-end, react]
weight: 40
---
Redux is used to manage the states of the applications. The components update the states in the _Redux store_, instead of keeping state only within the component. This allows components to easily react to state changes from other components.

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
