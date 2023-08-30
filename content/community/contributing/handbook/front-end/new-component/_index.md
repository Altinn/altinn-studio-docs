---
title: Creating components
description: Get started creating new form components for the apps
tags: [development, front-end]
weight: 12
---

## App structure
When an instance is in a _data_ step, the form defined in the JSON form layout file(s) for that task is rendered.
Below you can see a simplified overview of the layers of components that are used to render the form, including some of the
most important inputs.

![App structure](/app-template/architecture/app-frontend/app-frontend-form-rendering.drawio.svg)

A detailed overview of the app frontend structure and architecture is available [here](/app-template/architecture/app-frontend/).

### Adding a new form component
Form components are defined in `src/layout`. Create a new folder, and take inspiration from the existing components.
All form components render react components, that are provided with a `node` object as input.

Every component needs to have a `config.ts` file, that defines the properties that can be set on the component.
When this file is added, and exports a `Config` object, you can run `yarn gen` to generate the TypeScript types and
JsonSchema types for your component as well. 

At that point you can start implementing the `index.tsx` file, that defines the React component that renders the form
component, along with any other (dynamic) configuration needed for the component.

Make sure to consider the following when creating a new component:
 - How should the component be displayed when referenced in a `Summary` component? It might need some
   overriding in `index.tsx` to display correctly.
 - Should it be possible to render the component inside a table/Grid-component, etc? Test it and make sure it looks
   good.
 - Consider adding automated tests for your component, and add it to our [frontend-test](https://dev.altinn.studio/editor/ttd/frontend-test)
   app. This app is regularly tested using Cypress, and will help you catch any regressions in your component over time.

Once this is done, the component is ready to use, and can be added to the layout file of an app and used.