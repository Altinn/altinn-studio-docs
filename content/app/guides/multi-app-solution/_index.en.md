---
title: General approach for making a multi-app solution in Altinn
linktitle: Multi-app solution
description: Considerations and explanations of how to go about when creating a multi-app solution
weight: 250
aliases:

- /app/multi-app-solution/

---

Before getting into the implementation details of a multi-app solution,
the components the solution consists of should be defined.

- *An Instance*: When talking about instances is an application-context, these are unique pieces of data that describes
  details about the particular session going on in the application. The data includes information on who is filling in
  the data and what the data is.
- *Application A*: This will be an application that acts as a regular Altinn application which means
  end-users will interact with it. While filling in the form they will be working on their own private instance. However
  it will differentiate from other Altinn apps since the service owner have customized it to include actions that
  trigger a POST API call to another application. This POST API call will create a new instance of the _application B_.
- *Application B*: This will be an application that may have multiple purposes, but it's main purpose will
  be to receive and handle some data from the other application and automatically create a new instance using this data
  for a given instance owner. This application will differentiate from other Altinn apps since instances are created by
  triggers in another application.

This guide takes you through a multi-app solution consisting of two apps; _application A_ and _application B_,
but the concept can be extended to contain several applications of type A or type B, or both types.

Before continue reading these guidelines, please consider if
a multi-app solution is what you need to fulfill the purpose
of your form(s).

## What is a multi-app solution?

A multi-app solution is a solution consisting of two or more
cooperating applications, where typically application A will trigger the creation of a new
instance of application B. As a part of the
instantiation of application B it is possible to
prefill the instance with specific data from the running
instance of application A.

## Do I need a multi-app solution?

A multi-app solution is in most cases not a necessary
architectural choice for an Altinn form.

### Use cases where you can consider utilize a multi-app solution:

- The organization lacks an appropriate way of processing applications and resources to develop such a processing mechanism.
- Existing communication channels for response processing do not satisfy requirements for security (e.g. sensitive data).

### Alternative solution using eFormidling

It might be that the solution you are looking for is a form,
or multiple forms, that is set up to interact with _eFormidling_, which is another service offered by
Digitaliseringsdirektoratet. Read more about
eFormidling [here](../../development/configuration/eformidling)
. A solution that is integrated with eFormidling can
implement custom code on process-changes by using the
predefined methods i app-backend. Read more about
that [here](../../development/configuration/process)
. This custom code can build up a
message, with some form-specific content, that can be sent
to some public institution, instead of using
instantiating a second application being the receiving form.
Be aware that Altinn and eFormidling integration has some
limitations in terms of supported message types, which as
per now is limited to DPO and DPF.
Which means that you will not need to follow this guide.

{{<children description="true" />}}