---
title: Solution-specific application components Altinn Studio Designer
linktitle: Designer
description: Altinn Studio Designer is the custom appliaction where app developers manage and creates applications.
toc: true
tags: [solution, architecture]
---

Altinn Studio Designer contains serveral functional components/modules.  

## Welcome Screen
The welcome screen gives information to the user.

![Welcome](welcome.png "Welcome screen")

## Dashboard
Dashboard let the app developer search and find applications developed in Altinn Studio. It possible to search across all orgs the developer has access to.

![Dashboard](dashboard.png "Dashboard")

## App Creation
App creation functionaliy lets the app developer create applications. 

During this process the app developer can select the org that will own the app and the repository name for that app.

![Application creation](appcreation.png "Create app")

## App Info 
Application info module lets the user change the name of the app and add descriptions

![Application information](appinfo.png "About the app")


## UI Editor
The UI-editor lets the app developer create a UI interface with WYSIWYG 

![UI-editor](uieditor.png "The UI-Editor")

## Datamodel
The datamodel functionality lets the developer upload a XSD for datamodel creation in app.

When datamodel is uploaded a C# classes is generated based on this and metadata about datamodel is created.

![Datamodel](datamodel.png "Data modelling")


## Build & Deploy
Build & Deploy functionality includes functionality to 
- Build created app to a docker container
- Upload docker container to a container registry
- Register the build in to a database
- Let the app developer select a previous build and deploy that container to a specific Altinn Apps environment (test, performance test, production ++)

![Build & Deploy](deploy.png "Deploy")


## Process
Process functionality lets the app developer configure the given process that a user/system acessing the developed app should follow.


## Texts
The text module lets the app developer define the texts for a given app.

![Texts](texts.png "Texts")

## Logic Editor
The logic editor module lets the app developer create and modify app logic like validation and calculation. This is a very simple browser based editor.
The recomendation is to clone the app repository and edit the code in a regular IDE like Visual Studio Code

![Logic Editor](logiceditor.png "Coding some logic")


## Policy Administration Point
As part of the application development process the developer defines the authorization policies for the app.

[Read more about PAP and policies](pap).

{{<children>}}
