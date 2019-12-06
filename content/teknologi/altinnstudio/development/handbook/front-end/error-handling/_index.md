---
title: Error handling
description: Guidelines for error handling front-end
tags: [development, error-handling]
weight: 100
---
{{%notice warning%}}
This page is a work-in-progress. Because we do not have details on how potential errors should be shown to the users, this is only a general overview currently. More details will be added once we have a functional understanding of how users should experience errors. 
{{% /notice%}}

### React components

#### Error boundaries
Error boundaries are React's official way of handling errors that occur in a component. This functionality is available from React 16. Using this allows a component to fail without unmounting the whole application, and allows us to control how the user is exposed to unexpected errors. 

See the official [React documentation](https://reactjs.org/docs/error-boundaries.html) or this official [blog post](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html) for more information about error boundaries and how to implement them. 

We need a generic error boundary component that can be configured and reused for all of the sub-applications. Each sub-application should be wrapped in this error boundary component. This will allow the main applications (_service-development_ and _dashboard_) to keep functioning even though any sub-applications throw an error. 

In addition we should have a generic "something went wrong" error boundary for the main applications. 

Within the sub-applications, it may be beneficial to implement error boundaries around key components. This will typically be relevant for components that act as _containers_ for other components. An example could be the preview-component in the UI-editor, which shows the working surface of the forms designer.

#### Event handlers
Error boundaries do not catch errors that occur within event handlers, as mentioned in the official React documentation. Thus, any direct API calls from within an event handler in a React component should be wrapped in a `try/catch` block.

#### Optional props
Any use of props that have been defined as optional should be done together with a `null/undefined-check`, to make sure that the prop is actually available.


### Redux

#### Actions
All actions should have sibling actions for _success_ and _error_. See [naming conventions](../../naming#actions) for actions. The success action is triggered when everything is ok, while the error action is triggered if something goes wrong.

#### Sagas
If a saga needs to make an API call (or uses logic/utils that make API calls), this should be wrapped in a `try/catch` block. If an error occurs, this should be logged and the corresponding error action should be triggered. If no error occurs then the corresponding success action should be triggered. See [here](../redux) for more information on actions and sagas.

#### Reducers
If an error handling action is triggered, the reducer should update the corresponding error object in the state to reflect that an error has occured. 

### Logging errors
{{%notice info%}}
We need to decide if all errors should be logged on the server or not. If all front-end errors should be logged on the server, we need to create an API we can call from the front-end to to the logging. 
{{% /notice%}}
All errors that are caught should be logged to the console using `console.error`. 
