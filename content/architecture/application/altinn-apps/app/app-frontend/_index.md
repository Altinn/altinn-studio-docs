---
title: App Frontend Application Architecture
linktitle: App Frontend
description: Description of the Application architecture for App-Frontend
tags: [architecture]
weight: 100
---

App Frontend is a [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) based on React.

This application is responsible to present a UI to the end user. The application consist of serveral different
features that is responsible for handling the ui for different steps in the workflow.

Each App developed in Altinn Studio will contain their own App Frontend as part of the Docker Container created during
the build/deploy process to a Altinn Apps environment. This means that there can be different versions of App Frontend for two 
different deployed Apps

## React Architecture
The React Architecture used for App Frontend is based on using different javascript frameworks together REACT to handle different responsibilties.

The React architecture tries to follow best practice React architecture. 

The diagram below show the architecture 

{{%excerpt%}}
<object data="/architecture/application/altinn-apps/app/app-frontend/app-frontend-application-architecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

### Store
 A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.

 [See details](https://redux.js.org/api/store#store)

### Reducers
Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.

 [See details](https://redux.js.org/basics/reducers#reducers)


### Action Creators
An action creator is, quite simply, a function that creates an action. Do not confuse the two terms—again, an action is a payload of information, and an action creator is a factory that creates an action.

[See details](https://redux.js.org/glossary#action-creator)


## App Frontend Features
The App Frontend SPA is seperated in serveral features that is a collection of components and containers that support a given functional
area for a App. Typical a feature is connected to a type of workflow step. Like formfilling, signing, ++.

Support for new types of workflow steps are added

### Instansiate
This feature is responsible for presenting the user 

### UI Render (FormFiller)
The UI rendering component is the one that is responsible for rendering the UI designed in Altinn Studio.

This feature uses the formlayout for a app together with other metdata about the datamodell.

Based on the content of the formlayout file the UI Render, renders the correct components like textbox, fileupload ++

### Receipt
This feature is responsible to show the summary of the instance when a app is sent to end state of the process flow.


## Configuration files
The App Frontend requires some configuration files to work correctly. These files are loaded through API

### FormLayout
The formlayot is used the UI-render feature. 

It decides the layout elements. App Frontend have access to form layout through API.

[See details about FormLayout.json](/solutions/altinn-studio/altinn-studio-repos/structure/form-layout/)

### Language
Contains all text resources 

### ServiceMetadata
Contains information about the datamodell and is used by UI-render to map the fields to the datamodel. 

[See details about ServiceMetadata.json](/solutions/altinn-studio/altinn-studio-repos/structure/form-layout/)


### 