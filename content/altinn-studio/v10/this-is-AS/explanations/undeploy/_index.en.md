---
draft: false
title: Unpublish Apps
linktitle: Unpublishing
description: Unpublishing makes an app unavailable by removing it from an environment.
toc: true
weight: 10
tags: [needsReview]
---

## Unpublish Apps in Altinn Studio

When you unpublish apps in Altinn Studio, you make the app unavailable to users by removing the app from an environment. It can be useful to unpublish when an app is outdated and should no longer be used. In this article, we go through what happens when you unpublish, what you should consider before and after the process, and what you can alternatively choose to do instead.

### What Happens When You Unpublish an App?

When the app is unpublished, it is not available to users, either in the user interface or via the API endpoints.

- **API endpoints become unavailable:**
  When the app is unpublished, its API endpoints will no longer work. This means that external systems and users trying to communicate with the app via the API will experience errors.

- **Active instances:**
  Users who still have active instances of an unpublished app can no longer access their instance and do anything. When they try to open the instance from the inbox, they encounter an error page.

### Important to Consider Before You Unpublish

Before you carry out the unpublishing, you should consider how you want to handle active instances and data from them:

1. **Handle active instances:**
   If there are instances that are still in use (for example in the user's inbox), you must consider what should happen to these. If you want to remove the instances, you can do so via the app's APIs before you unpublish.

2. **Handle data after unpublishing:**
   When the app is unpublished, you can still retrieve data, but you must use the Storage API after unpublishing. This is because the app's own APIs are no longer available.
{.floating-bullet-numbers}

### What Can You Do Instead of Unpublishing?

If you do not want to unpublish the app, you can make the app unavailable in several other ways:

- **Switch to an earlier version:**
  If the current version of the app has errors, you can choose to roll back to an earlier version that works better.

- **Deactivate the app in the code:**
  You can remove access to the app in the code, so that it becomes unavailable in that way. Then you do not have to unpublish it completely.

- **Change access settings:**
  You can adjust the access settings so that users cannot start new instances of the application.

- **Add validation before you unpublish:**
  If you add validation in the code, you can decide when users should have access to the app. This can be useful if you want to give users a transition period before the app becomes completely unavailable in the environment.

### How Do I Unpublish an App?

[Go to the guide for unpublishing apps](/en/altinn-studio/v8/guides/development/undeploy/).
