---
title: Policy Administration Point
linktitle: PAP
description: The Policy Administration Point is responsible for creating and modifying the different authorization policies used by the PDP
tags: [architecture, security, authorization, xacml]
weight: 1
---

In Altinn Platform there is currently no Policy Administration Point functionality, but Altinn Platform provides functionality used
by the other Policy Administration Points in Altinn 3. The PRP provides API for storing policies and retrieving them.

### Policy Administration Point for applications

The authorization policy for apps is defined in Altinn Studio when developing the app.

See [Policy Administration Point in Altinn Studio](/technology/solutions/altinn-studio/designer/build-app/authorization-rules/) for details.

### Delegated Policies

Access Management component will allow end users to delegate rights to persons, enterprise users and organizations

Currently this functionality is only available through Altinn 2 GUI.

The result of the delegation is a XACML Policy describing the rights delegated. 