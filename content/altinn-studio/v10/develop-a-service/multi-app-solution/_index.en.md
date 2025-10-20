---
title: Develop a multi-app solution in Altinn
linktitle: Multi-app solution
description: How to assess needs and proceed when developing a multi-app solution
weight: 250
tags: [needsReview]
aliases:
- /app/multi-app-solution/
- /altinn-studio/guides/multi-app-solution/
---

## Understand what a multi-app solution is

A multi-app solution consists of two or more apps that work together.
App A triggers the creation of a new instance of app B.
You can pre-fill the new instance with data from the ongoing instance of app A.

This guide demonstrates a multi-app solution consisting of two apps: _app A_ and _app B_.
You can extend the solution to include multiple apps of type A or type B, or both types.

![Example architecture for a multi-app solution](multi-app-architecture.drawio.svg)

### Terminology

- **Instance:** Unique data describing the specific session taking place in the app.
  The data includes information about who is filling it in and what the data contains.
- **App A:** A standard Altinn app that end users interact with.
  End users work on their own private instance whilst filling in the form.
  You customise this app to create a new instance of _app B_.
- **App B:** An app that receives and handles data from _app A_.
  It differs from other Altinn apps because another app creates the instances.

## Assess whether you need a multi-app solution

Altinn offers APIs and event support for processing data from Altinn apps.
Consider a multi-app solution if these alternatives do not meet your needs.

### Use cases for multi-app solutions

A multi-app solution may be suitable if:

- Your organisation has limited development capacity or does not wish to develop and maintain
  a new system for processing data from Altinn.
- Existing set-up in your organisation for processing data from Altinn does not meet security requirements.

When you implement a multi-app solution, your organisation can use the Altinn inbox to receive data.
In most cases, the people who need to process the data already have access to the organisation in Altinn,
or you can grant them this access. You can specify authorisation rules in the final app in the data flow
(app B in our case) that require a specific role before granting access to the data.
This provides restricted access to sensitive data for people with an official need.

## Understand how a multi-app solution works

In a multi-app solution, you configure multiple forms to communicate through API calls.
This guide demonstrates how to create a new instance of an app (B) that is triggered by another app (A).

A typical scenario is that an end user fills in or uploads information in an instance of app A.
When the end user presses the button to submit the form, the app sends an API call to app B.
This creates a new instance of app B, where the responses from app A are part of the information.

### Integrate the app with Maskinporten

For an app to perform actions on another app, such as creating a new instance
on behalf of an end user or organisation, you must authorise it.

The request to create the instance of app B includes the credentials of the end user filling in app A.
In most cases, this end user is not authorised to create new instances on behalf of the organisation
that owns app B, and this will fail.

To ensure that the app is authorised to create the instance, you use the app owner's
credentials instead of the end user's credentials.
You do this by using a Maskinporten integration that generates a token representing the organisation.
Add this token to the requests that app A makes to app B.

{{<children description="true" />}}
