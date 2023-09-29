---
title: Developing a multi-app solution in Altinn
linktitle: Multi-app solution
description: Considerations and explanations of how to go about when creating a multi-app solution
weight: 200
aliases:

- /app/multi-app-solution/

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
  it will differentiate from other Altinn apps since the service owner
  have customized it to include actions that
  trigger a POST API call to another application. This POST API call
  will create a new instance of the _application B_.
- **Application B**: This will be an application that may have multiple
  purposes, but it's main purpose will
  be to receive and handle some data from the other application and
  automatically create a new instance using this data
  for a given instance owner. This application will differentiate from
  other Altinn apps since instances are created by
  triggers in another application.

## Do I need a multi-app solution?

Altinn offers a robust set of APIs and event support for data processing from Altinn Apps. However, if these options do
not align with your needs, you might consider a multi-app solution. Below, we've outlined some common use cases that may
warrant such an approach.

### Use cases where you can consider utilize a multi-app solution:

- The organization has limited development capacity or does not want
  to develop and maintain a new system for processing data from
  Altinn.
- Existing setup within the organization for processing data from
  Altinn does not satisfy requirements for security.

By implementing a multi-app solution an organization can use the Altinn inbox for their organization to receive data. In
most cases the people required to process the data will already have access to the organization in Altinn or can be
granted this access. The last application in the data flow (application B in our case), can set authorization rules
requiring a specific role before granting access to the data, hence supporting limiting access to sensitive data to
people with an official need.

## How does the multi-app solution actually work?

TODO: Write this

{{<children description="true" />}}