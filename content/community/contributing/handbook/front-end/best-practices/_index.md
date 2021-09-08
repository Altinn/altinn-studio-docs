---
title: Best practices
description: Best practices for altinn.studio frontend
tags: [development, front-end]
weight: 100
---

{{% notice info %}}
Altinn.studio best practices will be updated with more and better practices ;)
{{% /notice %}}

## Best practices

- Simple lists should be sorted alphabetically

### Form components (app-frontend)
Form components (`src/components`) should, whenever possible, be "dumb" components that receive all their input from props. They should not have 
a direct connection to the store, and should not know anything about the store.

### Sagas
All logic used in a saga should be an exported function in the `utils`-folder. This is decided since we need to split up the logic from the fetching of data, so we have a more testable codebase. The saga only fetches data from the state, and sends the appropriate data to utils-functions.

### Folder Structure

This is the best practice for folder structure in applications. Note that this is not necessarily how the folder structure is for all the apps, but when creating anything new, or cleaning up, this is how it should look.

```
- src /
  - config /
    - config.json
    - exportedConfig.js
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
      - selectors / 
        - getSomeResouceSelector.ts
      - reducers /
        - formfillerReducer.ts
      - utils /
  - reducers /
    - index.ts
  - shared /
    - components / # Shared components
    - resources / # Shared resources
      - [resourceName] /
        - [action] /
          - <action><resourceName>Actions.ts
          - <action><resourceName>Sagas.ts
        - <resourceName>Actions.ts
        - <resourceName>ActionTypes.ts
        - <resourceName>Reducer.ts
        - <resourceName>Sagas.ts
      - language / # example resource
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
    - types /
    - utils /
  - store
  - types
  - utils
```
