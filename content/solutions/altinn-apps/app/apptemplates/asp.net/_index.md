---
title: Asp.Net App Template
description: Description of the app created in Altinn Studio and that is deployed to Altinn Apps.
tags: [altinn-apps]
weight: 200
---

This template is based on a ASP.Net Web application with API controllers. 

The template has features to easily support different types of applications running
in Altinn Apps.

When a new App is created in Altinn Studio this is the template that is used as 

### App Configuration
The App template based on Asp.Net Core contains different types of standard configuration files.

#### Process
The Process.xml defines the business process of the app and is based om BPMN 2.0

#### XACML
The Polixy.xml defines the authorization policy with rules. Is based on XACML 3.0

#### Form Layout
The Formlayout.json defines the rendering of the UI based on Altinn Studio UI designer. 

#### Text Resources

#### Prefill 
Prefill.json defines the prefill for a app

### App libraries
The Asp.Net Template uses some libraries created by Altinn.

#### Altinn.App.Api 
This library contains controllers for the standard App APIS

##### Instance API
API for instances

##### Data Api
API for data

##### Process Api
API for process

#### Altinn.App.Services
The Service Library contains client functionality for platform and other functionality that a App can choose to need.

#### Altinn.App.Common
Contains common functionality needed.
