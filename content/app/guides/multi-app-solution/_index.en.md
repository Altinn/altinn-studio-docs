---
title: General approach for making a multi-app solution in Altinn
linktitle: Multi-app solution
description: Considerations and explanations of how to go about when creating a multi-app solution
weight: 250
aliases:

- /app/multi-app-solution/

---

Before continue reading these guidelines, please consider if
a multi-app solution is what you need to fulfill the purpose
of your form(s).

## What is a multi-app solution?

A multi-app solution is a solution consisting of two or more
cooperating apps, where typically (as per now) the "
original" application(s) will trigger a creation of a new
instance of the receiving application. As a part of the
instantiation of the receiving application it is possible
prefill the instance with specific data from the running
instance of the original application.

## Do I need a multi-app solution?

A multi-app solution is in most cases not a necessary
architectural choice for an Altinn form.

### Use cases where you can consider utilize a multi-app solution:

Criteria that should be met if you could consider creating a
multi-app solution:

- My forms will be answered by users that does not have
  Altinn
- It is okay that my receiving forms must be deleted in
  order to end the lifecycle of the form.
- The receiving form will act as temporary dashboard in
  order to view and/or process the incoming forms, since you
  dont have any receiving platform that are processing the
  forms.

### Alternative solution using eFormidling

It might be that the solution you are looking for is a form,
or multiple forms, that is set up to interact with _eFormidling_, which is another service offered by
Digitaliseringsdiriktoratet. Read more about
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