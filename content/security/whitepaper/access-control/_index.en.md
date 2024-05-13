---
title: Access control
description: 
toc: false
weight: 7
---

There are mainly two systems used for access control for development and operation.
Altinn Studio uses Gitea's internal authentication solution, which also controls access to the code of the services.

Multifactor authentication is supported and users must configure this themselves.

[Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id) is used to
restrict access to development and operation of Altinn Studio and other Digdir products.
Only operations and developers associated with Altinn 3 have access to the solution.

The service owner can order access to users for the service test development environment (TT02) and the production environment.
This is described in more detail on the [Access Control page](/altinn-studio/guides/access-management/apps/).
Note that service owners must notify Digdir when access is to be removed.

Authentication for end users is explained in more detail [here](/api/authentication/).

Service owners must specify authorization policies in the apps they develop.
More information can be found [here](/altinn-studio/reference/configuration/authorization/).

