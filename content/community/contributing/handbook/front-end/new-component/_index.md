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

![App structure](/technology/architecture/components/application/construction/app/app-frontend/app-frontend-form-rendering.drawio.svg)

A detailed overview of the app frontend structure and architecture is available [here](/technology/architecture/components/application/construction/app/app-frontend/).

### Form components
All form components should be _presentational components_. This means that their only responsibility is to present
something to the DOM, and as such they do not handle any direct interactions with the redux store. This is the 
responsibility of the _parent component_ (in most cases `GenericComponent`), which will provide the 
form components with the data they need to render themselves, as well as any functions to call in the event of a change.

### Adding a new form component
Form components are defined in `src/components`. Find a relevant folder in the structure, or create a new one if necessary, and implement the component there.
All form components are react components, that are provided with props as input. A list of the props that are provided and can be used:

| prop name         | type                    | description                                    | source                                      |
| ----------------- | ----------------------- | ---------------------------------------------- | ------------------------------------------- |
| id                | string                  | unique component ID                            | layout                                      |
| text              | string                  | text to be displayed                           | layout (`textResourceBindings.title` value) |
| formData          | any                     | form data to display (if relevant)             | parent component                            |
| language          | any                     | object containing standard language resources  | parent component                            |
| shouldFocus       | boolean                 | should component have focus                    | parentComponent                             |
| handleDataChange  | (value: any) => void    | function to call in the event of a data change | parent component                            |
| handleFocusUpdate | (value: any) => void    | function to handle updating focus              | parent component                            |
| getTextResource   | (key: string) => string | function to get text resource value            | parent component                            |
| isValid           | boolean                 | is component valid                             | parent component                            |

_In addition, any properties defined on the component in the layout-file will be passed through to the component._

To make a new form component available for use, it needs to be added to the module that exports all the form components for use elsewhere in the application. 
This is the `src/components/index.tsx`-file. In this file, you will find lists of all the available form components exported. To make your component available, you need
to do the following:

- Import your new component into the file
- Update the `ComponentTypes` enum with your new component type
- Add your a new object for your component to one of the component lists (or create a new list if relevant). The list object must have the following structure:
    ```
    {
      name: "<component name>",
      Tag: <Component tag>,
      Type: <ComponenType enum for your component>m
      customProperties: {
        <any custom properties that the component should be initialized with>
      }
    }
    ```

Use the existing lists and components as an example for setting this up. Once this is done, the component is ready to use, and can be added to the layout file
of an app and used.