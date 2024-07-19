---
title: 'Authorization Attributes'
description: 'Learn how dialogs in Dialogporten implements fine-grained access control using Altinn Authorization'
weight: 10
---

## Introduction

Actions and other parts (e.g., references to transmissions) of the dialog can also specify an additional _authorization attribute_ .

This allows having different authorization requirements for the same type of action available in different dialog states. For example, it can be used to make a signing action available only to an external auditor/accountant, while another signing action is available to the CEO.

The access rules can be defined in the same policy as the dialog [service resource]({{<relref "../service-resource">}}) (called a "sub resource"), or in its own separate service resource. 

Authorization attributes can also be used on [transmissions]({{<relref "../../dialogs#transmissions">}}) to define specific access rules controlling who is allowed to read a given transmission. 

**Read more**
* [Technical reference for authorization attributes]({{<relref "../../../reference/authorization/attributes">}})

{{<children />}}

