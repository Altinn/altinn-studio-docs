---
title: Altinn Designer
linktitle: Designer
description: Altinn Designer is the custom appliaction where app developers mange their applications.
tags: [solution, architecture]
alwaysopen: false
weight: 99
---

## Dashboard
Dashboard let the app developer search and find application developed in Altinn Studio. It possible to search across all orgs 

![Dashboard](dashboard.png)

## App Creation
App creation functionaliy lets the app developer create applications

## UI Editor
The UI-editor lets the app developer create a UI interface with WYSIWYG 

## Datamodel
The datamodel functionality lets the develope upload a XSD for datamodel creation in app.

When datamodel is uploaded a C# classes is generated based on this and metadata about datamodel is created.

## Build & Deploy
Build & Deploy functionality includes functionality to 
- Build created app to a docker container
- Upload docker container to a container registry
- Register the build in to a database
- Let the app developer select a previous build and deploy that container to a specific Altinn Apps environment (test, performance test, production ++)


## Process
Process functionality lets the app developer configure the given process that a user/system acessing the developed app should follow.

## App configuration
Configuration include 