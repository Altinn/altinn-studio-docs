---
title: Develop a Multi-app Solution in Altinn
linktitle: Multi-app solution
description: How you assess needs and proceed when you develop a multi-app solution
weight: 200
tags: [needsReview]
aliases:
- /app/multi-app-solution/
- /altinn-studio/guides/multi-app-solution/
---

<!--
REMEMBER: Check "how to" formulations that are clear anglicisms.
Use "This is how you..." instead of "How you..." where appropriate.
-->

## Understand What a Multi-app Solution Is

A multi-app solution consists of two or more applications that work together.
Application A triggers the creation of a new instance of application B.
You can prefill the new instance with data from the ongoing instance of application A.

This guide shows you a multi-app solution consisting of two apps: _application A_ and _application B_.
You can extend the solution to include multiple applications of type A or type B, or both types.

![Example architecture of a multi app solution](multi-app-architecture.drawio.svg)

### Terminology

- **Instance:** Unique data that describes the specific session ongoing in the application.
  The data includes information about who is filling in and what the data contains.
- **Application A:** A regular Altinn application that end-users interact with.
  End-users work on their own private instance whilst filling in the form.
  You customise this application to create a new instance of _application B_.
- **Application B:** An application that receives and handles data from _application A_.
  It differs from other Altinn apps because another application creates the instances.

## Consider Whether You Need a Multi-app Solution

Altinn offers APIs and event support to process data from Altinn apps.
Consider a multi-app solution if these alternatives do not cover your needs.

### Use Cases for Multi-app Solutions

A multi-app solution may suit if:

- Your organisation has limited development capacity or does not want to develop and maintain
  a new system to process data from Altinn.
- Your organisation's existing setup to process data from Altinn does not meet security requirements.

When you implement a multi-app solution, your organisation can use the Altinn inbox to receive data.
In most cases, the people who need to process the data already have access to the organisation in Altinn,
or you can grant them this access. You can set authorisation rules in the final application in the data flow
(application B in our case) that require a specific role before you grant access to the data.
This provides limited access to sensitive data for people with an official need.

## Understand How a Multi-app Solution Works

In a multi-app solution, you configure multiple forms to communicate through API calls.
This guide shows you how to create a new instance of an application (B) that is triggered by another application (A).

A typical scenario is that an end-user fills in or uploads information in an instance of application A.
When the end-user presses the button to submit the form, the application sends an API call to application B.
This creates a new instance of application B, where the answers from application A are part of the information.

### Integrate the App with Maskinporten

For an application to perform actions on another application, such as creating a new instance
on behalf of an end-user or organisation, you must authorise it.

The request to create the instance of application B includes the credentials of the end-user filling in application A.
In most cases, this end-user is not authorised to create new instances on behalf of the organisation
that owns application B, and this will fail.

To ensure the application is authorised to create the instance, you use the application owner's
credentials instead of the end-user's credentials.
You do this by using a Maskinporten integration that generates a token representing the organisation.
Add this token to the requests that application A makes to application B.

{{<children description="true" />}}
