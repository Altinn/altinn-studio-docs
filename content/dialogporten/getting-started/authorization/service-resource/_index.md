---
title: 'Service Resource'
description: 'Learn how dialogs in Dialogporten all refer to resources defined in Altinn Resource Registry'
weight: 10
---

All dialogs must refer to a _service resource_. A service resource serves as the authorization bearer and can be compared to the modern use of linked services in Altinn 2. This is a description of a service located in the [Altinn Resource Registry](https://docs.altinn.studio/authorization/modules/resourceregistry/). Each service resource has an authorization policy expressed in [XACML](https://docs.altinn.studio/authorization/guide/xacml/), which describes the access rules for all dialogs that refer to it. XACML offers great flexibility in how coarse or fine-grained the access control should be, and Dialogporten will base its determination of who can see a given dialog and what actions are available on this policy.

For example, the GUI action "Sign" will refer to an _action_ called "sign" in the XACML policy, which requires permissions that the logged-in user does not possess. Therefore, the button may be grayed out and disabled. The service resource is what access controllers in organizations relate to, regarding who should have access to do what on behalf of an organization (similar to today's service delegation).


{{<children />}}

