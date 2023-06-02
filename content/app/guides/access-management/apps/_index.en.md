---
title: Apps infrastructure access
linktitle: Apps
description: How to request access to Altinn Apps infrastructure.
toc: false
weight: 200
---

## Access to logs and secrets

There are two different roles that give access to the runtime environments in Altinn Apps.

- _Developer_ : grants access to _Application Insights_ where logs for the applications owned by the service owner are stored.
- _Operations_ : grants access to _Key Vault_ which is used to manage the secrets used by applications.

There are two variants of each role: one for test (TT02) and one for production (prod).
A user can be assigned one or more roles.

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
