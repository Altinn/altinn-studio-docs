---
title: App frontend features
linktitle: Features
description: High-level description of app frontend features
tags: [architecture]
toc: true
weight: 3
---

The App Frontend SPA is separated in several features that is a collection of components and containers that support a given
functional area for a App. Typical a feature is connected to a type of workflow step. Like form filling, signing, ++.

Support for new types of workflow steps will be added as they become available in the backend.

## Instantiate
This feature is responsible for creating a specific instance of the app for the end user. This feature validates the selected
party by checking authorization, and gives the user the option to select a new party (if available) if the current party is invalid.
Once a user/party is validated, the backend API to create an instance is called, and the user is sent to the first process step defined for the app. 

## Form
This feature is responsible for the `data` process task type, which is typically used for form filling. 
This includes rendering the form UI designed in Altinn Studio,
running any rules/dynamics, calling APIs to perform calculations, validations, save form data, submit/move process to next step.

To render the form UI, the _form layout_ defined in Altinn Studio is used together with metadata about the data model.
The form components are rendered based on the contents of the form layout.

## Confirm
This feature is responsible for the `confirmation` process task type. This includes rendering a configurable confirmation view.

## Feedback
This feature is responsible for the `feedback` process task type. This includes rendering a configurable feedback view.

## Receipt
This feature is responsible to show the summary of the instance when an app is sent to end state of the process flow.