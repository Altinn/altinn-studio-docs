---
title: App Frontend configuration files
linktitle: Configuration files
description: Description of the different configuration files used by app frontend
tags: [architecture]
toc: true
weight: 2
---

The App Frontend requires some configuration files to work correctly. These files are loaded through APIs.

## Layout files
The _form layout files_ are used to render the UI for the _form_ feature. They defines which layout elements should be rendered,
in what order, and contains details about how they should be rendered (ex. text keys, data model, etc.)

### FormLayout.json
The default layout file, at the root of the `ui` config folder. This is only used if the app only has a single layout to use.

### Settings.json
A configuration file used when an app has multiple layouts within a given process task. This defines f.ex. the order the layouts should be rendered in.

### layout-sets.json
When an app has multiple sets of layout files (f.ex. multiple data tasks), this configuration file defines which layout files
belong to which task.

## Language
All (non app-specific) text resources that are used in the app frontend.

## JSON schema data model
Contains information about the data model and is used for client-side validation. 

## Text resources
App specific texts.
