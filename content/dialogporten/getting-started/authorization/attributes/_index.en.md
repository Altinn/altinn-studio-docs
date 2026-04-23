---
title: 'Authorization Attributes'
description: 'Learn how dialogs in Dialogporten implement fine-grained access control using Altinn Authorization'
weight: 20
---

## Introduction

Actions and other parts of the dialog, such as references to transmissions, can also specify an additional _authorization attribute_.

This allows having different authorization requirements for the same type of action available in different dialog states. For example, it can be used to make a signing action available only to an external auditor/accountant, while another signing action is available to the CEO.

The access rules can be defined in the same policy as the dialog [service resource](/en/dialogporten/getting-started/authorization/attributes/../service-resource/) (called a "sub resource"), or in a separate service resource of their own.

Authorization attributes can also be used on [transmissions](/en/dialogporten/getting-started/authorization/attributes/../../dialogs#transmissions) to define specific access rules controlling who is allowed to read a given transmission.

**Read more**
* [Technical reference for authorization attributes](/en/dialogporten/getting-started/authorization/attributes/../../../reference/authorization/attributes/)

{{<children />}}
