---
title: 'Authorization Attributes'
description: 'Learn how dialogs in Dialogporten implements fine-grained access control using Altinn Authorization'
weight: 10
---

Actions and other parts (e.g., references to dialog elements) of the dialog can also specify an additional _authorization attribute_ .

This allows having different authorization requirements for the same type of action available in different dialog states. For example, it can be used to make a signing action available only to an external auditor/accountant, while another signing action is available to the CEO.

Authorization attributes can also be used on [dialog elements]({{< relref "../../dialogs#dialog-elements" >}}) to define specific access rules for each dialog element. The access rules can be defined in the same policy as the dialog [service resource]({{< relref "../service-resource" >}}), or in its own separate service resource.

{{<children />}}

