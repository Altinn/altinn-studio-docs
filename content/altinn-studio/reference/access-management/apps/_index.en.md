---
title: Apps infrastructure access
linktitle: Apps
description: Roles for access to app logs and secrets.
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

See [guide to requesting access to app logs and secrets](../../../guides/access-management/apps/).
