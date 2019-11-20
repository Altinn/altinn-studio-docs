---
title: React
description: Guidelines for using React in Altinn Studio
tags: [development, react]
weight: 100
---

## React

React is a library for developing component based applications. It is done by having declared html as xml in javascript code, and that is again transpiled into vanilla javascript for the browser to render into a page.

### React Components lifecycle

There are sequences that are called when mounting, updated, unmounted and error-catching for every component in React. This is the order they are called:

#### Mounting

1. `constructor()`
2. `static getDerivedStateFromProps()`
3. `render()`
4. `componentDidMount()`

#### Updating

1. `static getDerivedStateFromProps()`
2. `shouldComponentUpdate()`
3. `render()`
4. `getSnapshotBeforeUpdate()`
5. `componentDidUpdate()`

#### Unmounting

1. `componentWillUnmount()`

#### Error handling

1. `static getDerivedStateFromError()`
2. `componentDidCatch()`

### Other React component APIs and properties

#### APIs

1. `setState()`
2. `forceUpdate()`

#### Class Properties

1. `defaultProps`
2. `displayName`

#### Instance Properties

1. `props`
2. `state`

## Adding a new react-app to altinn.studio

When adding a new react-app, use the template folder that is in the github repo. Create a new folder in the `src/react-apps/applications`-folder and copy the contents from the `src/react-apps/templates/template-app`-folder of that newly created folder.  
Then change the names in the `package.json`-file and start developing the new application.  
In the templates folder, in the `src/index.tsx`-file, a function called `run` is commented out, if your application needs to have sagas, uncomment the `run`-function which should initialize the sagas.

### React Folder Structure

This is the best practice for folder structure in applications.

```
- src /
  - config /
    - config.json
    - exportedConfig.ts
  - features / # routes,pages,features
    - [featureName] /
      - components /
      - containers /
      - resources /
        - featureSpecificData /
          - delete /
            - deleteFeatureSpecificDataActions.ts
            - deleteFeatureSpecificDataSagas.ts
          - fetch /
            - ...
          - upload /
            - ...
          - featureSpecificDataActions.ts
          - featureSpecificDataActionTypes.ts
          - featureSpecificDataReducers.ts
          - featureSpecificDataSagas.ts
      - selectors /
        - getSomeResourceSelector.ts
      - reducers /
        - featureNameReducer.ts
      - utils / # Feature specific utils
    - formFiller / # Example feature
      - components /
      - containers /
      - resources
        - attachments / # FileUpload example
          - delete /
            - deleteAttachmentsActions.ts
            - deleteAttachmentsSagas.ts
          - fetch /
            - fetchAttachmentsActions.ts
            - ...
          - upload /
            - ...
          - attachmentsActions.ts
          - attachmentsActionTypes.ts
          - attachmentsReducers.ts
          - attachmentsSagas.ts
        - validations /
          - componentValidation
            - componentValidationActions.ts
            - ...
          - singleFieldValidation /
            - singleFieldValidationActions.ts
            - ...
          - validationsActions.ts
          - validationsActionTypes.ts
          - validationsReducers.ts
          - validationsSagas.ts
      - selectors / 
        - getSomeResouceSelector.ts
      - reducers /
        - formfillerReducer.ts
      - utils /
    - instantiate /
      - components /
      - containers /
      - resources /
      - selectors /
      - reducers / 
  - reducers /
    - index.ts
  - shared /
    - components / # Shared components
      - altinnAppHeader.tsx
    - resources / # Shared resources
      - language /
          - fetch /
            - fetchLanguageActions.ts
            - fetchLanguageSagas.ts
          - someAction /
            - someActionOnLanguageActions.ts
            - someActionOnLanguageSagas.ts
          - languageActions.ts
          - languageActionTypes.ts
          - languageReducer.ts
          - languageSagas.ts
        - repoStatus /
          - fetch /
            - fetchRepoStatusActions.ts
            - fetchRepoStatusSagas.ts
          - repoStatusActions.ts
          - repoStatusActionTypes.ts
          - repoStatusReducer.ts
          - repoStatusSagas.ts
  - types /
  - utils /
- store
- types
- utils
```

## Links

- [Documentation for react components](https://reactjs.org/docs/react-component.html)
