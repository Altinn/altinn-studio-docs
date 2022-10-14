---
title: Policy Administration Point
linktitle: PAP
description: The Policy Administration Point is responsible for creating and modifying the different authorization policies used by the PDP
tags: [architecture, security, authorization, xacml]
---

In Altinn Platform there is currently no Policy Administration Point functionality, but Altinn Platform provides functionality used
by the other Policy Administration Points in Altinn 3. The PRP provides API for storing policies and retrieving them.

### Policy Administration Point for applications

The authorization policy for apps is defined in Altinn Studio when developing the app.

See [Policy Administration Point in Altinn Studio](../../../altinn-studio/designer/pap/) for details.

### Delegation Policies

Delegation of rights will be performed in Altinn II platform through the delegation functionality. 

When delegation is done through creation of new policies that gives user or organisation new rights.

This will be supported in Altinn 3. See [Github issue 1258](https://github.com/Altinn/altinn-studio/issues/1258)
