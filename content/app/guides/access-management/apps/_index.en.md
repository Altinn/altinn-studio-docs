---
title: Apps infrastructure access
linktitle: Apps
description: How to request access to app logs and secrets.
toc: true
weight: 200
---

## Roles
There are two different roles that give access to the runtime environments in Altinn Apps.

There are two variants of each role: one for test (TT02) and one for production (prod).
A user can be assigned one or more roles.

### Developer
The role Developer grants access to
[Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
where logs for the applications owned by the service owner are stored.

### Operations
The role Operations grants access to [Key Vault](https://learn.microsoft.com/nb-NO/azure/key-vault/general/basic-concepts)
which is used to manage the secrets used by applications.


## Creating a ticket
The following roles can be requested assigned to a user by the service owner:

- Test Developer
- Test Operations
- Prod Developer
- Prod Operations

To be assigned a role you must first have a registered user belonging to the same service owner as the application whose runtime environment you wish to access.
Requests are submitted using our [self-service portal](https://www.altinndigital.no/oversikt).
There are also instructions for registering a new user for the first time.

To create a ticket requesting a new role for you user click the tab _"Support"_ then choose the option _"Ny sak"_ from the left-hand side menu.
* On the first page of the form select the options: _"Bestilling"_ and _"Tilganger"_.
* Select the option _"Altinn 3.0 - Apps"_ on the second page.
* Finally, specify the desired roles along with the contact information of the user who the roles should be granted to.

When the user has been assigned the requested roles logs and/or secrets can be accessed through [Microsoft Azure Portal](https://portal.azure.com).

For login you use the same account as for the self-service portal:

- `username@ai-dev.no` (most people)
- `username@ai-dev.brreg.no` (a few still uses this)
