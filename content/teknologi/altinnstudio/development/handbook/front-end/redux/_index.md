---
title: Redux
description: Guidelines for using Redux in Altinn Studio
tags: [development, front-end, react]
weight: 100
---
Redux is used to manage the states of the ux-editor.

### Actions
Actions are the events that are triggered when a change is made. An action contains the action type, and any metadata needed to complete the action. For example:

```typescript
export interface IUpdateFormDataAction extends Action {
  formData: any;
  componentID: string;
  dataModelElement: IDataModelFieldElement;
}
```

### Sagas
Redux saga is the middleware used to process information before the store is updated. All logic used in a saga should be an exported function in the `utils`-folder. This is decided since we need to split up the logic from the fetching of data, so we have a more testable codebase. The saga only fetches data from the state, and sends the appropriate data to utils-functions.

An example is asyncronous calls to backend APIs to get data, or submit data.

Each saga defines methods that complete different tasks, connected to actions. These methods are called via listeners that listen to the actions that are being dispatched. There are different sagas for all the different functional areas.

```typescript

/**
 * Define the saga for the UPDATE_FORM_DATA event
 */
function* updateFormDataSaga(action: ActionType) {
  try {
    const relevantData = yield selectRelevantStateObjects(...);
    ...
    doRelevantLogic(relevantData);
    ...
    yield call(updateFormDataSagaFulfilled, ... );
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
Redux reducers are used to update the different states in the store. There is one reduer per state. The reducers listen to the actions that are dispatched when changes are made
