---
title: Template filestructure 
linktitle: Filestructure
description: Description of the files in the ASP.NET Core template.
tags: [altinn-apps]
toc: true
---

The template contains serveral standard files that is added to the repository when app is created.

## Process
The Process.xml defines the business process of the app and is based om [BPMN 2.0](https://www.omg.org/spec/BPMN/2.0/).
The app supports differen types of processes.

[See standard BPMN file in template](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/config/process/process.bpmn).

## XACML
The Polixy.xml defines the authorization policy with rules. Is based on [XACML 3.0](http://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html).

The XACML is imported in to authorization component.

[See standard XACML file in template](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/config/authorization/policy.xml).

## UI
The Formlayout.json defines the rendering of the UI based on Altinn Studio UI designer. 
For Apps without frontend this is not needed.

## Text Resources
The App can be breated with multiple langauges at the same time. The different texts are put in language files for each language.

## Prefill 
Prefill.json defines the prefill for a app.

## Dockerfile
Defines the docker image.
