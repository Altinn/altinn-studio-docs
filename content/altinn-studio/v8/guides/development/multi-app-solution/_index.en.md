---
title: Developing a multi-app solution in Altinn
linktitle: Multi-app solution
description: Considerations and explanations of how to go about when creating a multi-app solution
weight: 200
aliases:
- /app/multi-app-solution/
- /altinn-studio/guides/multi-app-solution/
---

## What is a multi-app solution?

A multi-app solution is a solution consisting of two or more
cooperating applications, where typically application A will trigger
the creation of a new
instance of application B. As a part of the
instantiation of application B it is possible to
prefill the instance with specific data from the running
instance of application A.

This guide takes you through a multi-app solution consisting of two
apps; _application A_ and _application B_,
but the concept can be extended to contain several applications of
type A or type B, or both types.

![Example architecture of a multi app solution](multi-app-architecture.drawio.svg)

### Terminology

- **An Instance**: When talking about instances in an
  application-context, these are unique pieces of data that describes
  details about the particular session going on in the application.
  The data includes information on who is filling in
  the data and what the data is.
- **Application A**: This will be an application that acts as a regular
  Altinn application which means
  end-users will interact with it. While filling in the form they will
  be working on their own private instance. However
  it will differ from other Altinn apps since the service owner
  has customized it to include actions that
  will create a new instance of the _application B_.
- **Application B**: This will be an application that may have multiple
  purposes, but its main purpose will
  be to receive and handle data from _application A_.
This application will differ from
  other Altinn apps since instances are created by
  triggers in another application.

## Do I need a multi-app solution?

Altinn offers a robust set of APIs and event support for processing data from Altinn Apps. However, if these options do
not align with your needs, you might consider a multi-app solution.

### Use cases where you can consider using a multi-app solution:

We have outlined some common use cases that may warrant the multi-app approach.
- The organization has limited development capacity or does not want
  to develop and maintain a new system for processing data from
  Altinn.
- Existing setup within the organization for processing data from
  Altinn does not satisfy requirements for security.

By implementing a multi-app solution, an organization can use the Altinn inbox for their organization to receive data. In
most cases the people required to process the data will already have access to the organization in Altinn or can be
granted this access. The last application in the data flow (application B in our case), can set authorization rules
requiring a specific role before granting access to the data, hence supporting limiting access to sensitive data to
people with an official need.

## How does the multi-app solution actually work?

A multi-app solution is a way of configuring multiple forms to communicate through API calls. The specific communication
we will describe in this guide is the creation of a new instance of an application (B) triggered by another application
(A). A typical scenario would be that an end-user fills out or uploads information in an instance of application A. And when pressing
the button to submit the form, an API call is sent to another application (B), creating a new instance of this application where
the answers from application A is a part of the information.

### An integration between the app and Maskinporten might be required

In order for an application to perform actions on another application such as creating a new instance on behalf of 
and end user or organisation, it needs to be authorized.
By nature, the request to create the instance of application B will include the credentials of the end user 
filling out application A. 
In most cases this end user will not be authorized to instantiate new instances on behalf of the 
organisation that owns application B, thus this will fail.
A way to ensure the application is authorized to perform the instantiation action, is to use the 
application owners credentials instead of the end user's credentials. 
This is achieved by using a Maskinporten integration to generate a token that represents the organisation 
and adding this token to the requests that application A makes towards application B. 


{{<children description="true" />}}