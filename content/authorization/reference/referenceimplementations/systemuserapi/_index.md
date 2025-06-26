---
title: Reference Implementation System User API
linktitle: SystemUser API
description: Reference implementations using Altinn Authentication functionality
weight: 5
---

The SystemUser API reference implementation demonstrates how a service owner can use Altinn Authorization to authorize access to various resources in the resource registry.

- [LogisticsAPI](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserApi/SystemUserApi/Controllers/LogisticsController.cs) checks for read access to the resource **ttd_systembruker-logistikk-demo**
- [SalaryAPI](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserApi/SystemUserApi/Controllers/SalaryController.cs) checks for read access to the resource **ttd_systembruker-salary**

The SystemUser API uses Altinn PDP to authorize access for the system user. It retrieves information about the system user from the authenticated identity and uses that information to call Altinn authorization.



The project can be studied [here](https://github.com/TheTechArch/altinn-systemuser/tree/main/src/SystemUserApi/SystemUserApi).
