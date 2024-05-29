---
title: Maintenance of app in production
linktitle: Maintenance
description: Applications in production require regular maintenance and updates.
weight: 120
---

When the application is put into production, there will be a need to maintain the application.
The most common type of maintenance will be to [update dependencies](./dependencies).

To make a new version of the application available for users, deploy it the same way as usual.

Existing instances of the app in the user inbox will automatically be updated to use the latest app version,
so it is important that you do not introduce changes that break existing instances.

{{<children />}}