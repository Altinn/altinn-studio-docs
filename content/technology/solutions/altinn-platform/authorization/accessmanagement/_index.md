---
title: Access Management component
linktitle: Access Management
description: The Access Management provides functionality to end users for managing groups, roles and rights 
tags: [architecture, security, authorization, xacml]
---

{{<notice warning>}}
This is work in progress
{{</notice>}}

The access management will provide the following functionality

- Delegate and revoke Altinn 2 roles
- Add and remove membership for Access Groups
- Delegate App and instance rights
- [Manage Delegatable Maskinporten API resources](https://github.com/Altinn/altinn-authorization/issues/59)
- List access groups members
- List resources that is linked to access groups


This design is in early phase. 


## Delegated Policies

Delegated policies are policies created by users when their own rights are delegated ot other persons/systems.
The who is identified by user or partyId.


### Construction

See details how AccessManagement is [constructed](/architecture/components/application/construction/altinn-platform/authorization/accessmanagment/).