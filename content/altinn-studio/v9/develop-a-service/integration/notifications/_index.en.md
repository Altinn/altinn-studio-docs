---
title: Integrate an Altinn app with Notifications
linktitle: Notifications
description: How to publish notifications to users from an Altinn app.
draft: true
weight: 110
toc: true
tags: [needsReview]
---

An app can notify users through [Altinn Notifications](/en/notifications), in two ways:

- You ask for a notification in the instantiation request itself. Altinn then notifies the instance owner when the app creates the instance, and you need no code of your own in the app.
- You order notifications from the app code. `Altinn.App.Core` has built-in interfaces for email and SMS.

{{<children />}}
