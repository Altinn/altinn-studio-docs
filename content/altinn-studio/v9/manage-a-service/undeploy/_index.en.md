---
draft: true
title: Unpublishing apps
linktitle: Unpublishing
description: What happens when you unpublish an app, and what to consider before you do it.
toc: true
weight: 70
tags: [Reviewed]
---

## Unpublishing apps in Altinn Studio

When you unpublish an app in Altinn Studio, you make it unavailable to users by removing it from an environment. This can be useful when an app is outdated and should no longer be used. In this article, we explain what happens when you unpublish, what you should consider before and after the process, and what you can do instead. See the [guide to unpublishing an app]({{< relref "/altinn-studio/v9/manage-a-service/undeploy/how-to" >}}) for the steps in Altinn Studio.

### What happens when you unpublish an app?

Once the app is unpublished, it becomes unavailable to users, both in the user interface and via API endpoints.

- **API endpoints become unavailable:**  
  When an app is unpublished, its API endpoints will no longer function. This means that external systems and users trying to communicate with the app via the API will experience errors.

- **Active instances:**  
  Users who still have active instances of an unpublished app will no longer be able to access their instance. When they try to open the instance from their inbox, they will encounter an error page.

### Important considerations before you unpublish

Before you proceed with unpublishing, you should consider how you will handle active instances and their data:

1. **Handling active instances:**  
   If there are instances that are still in use (for example, in the user's inbox), you must decide what should happen to them. If you want to remove the instances, you can do so via the app’s APIs before unpublishing.

2. **Handling data after unpublishing:**  
   Once the app is unpublished, you can still retrieve data, but you will need to use the Storage API after unpublishing. This is because the app’s own APIs will no longer be available.
{.floating-bullet-numbers}

### What can you do to make an app unavailable instead of unpublishing?

If you do not want to unpublish the app, you can make it unavailable in several other ways:

- **Switch to an earlier version:**  
  If the current version of the app has issues, you can choose to roll back to an earlier version that works better.

- **Deactivate the app in the code:**  
  You can remove access to the app in the code, making it unavailable in that way. This allows you to avoid completely unpublishing the app.

- **Change access settings:**  
  You can adjust the access settings so that users cannot start new instances of the app.

- **Add a check before you unpublish:**  
  By adding a check in the code, you can decide when users should have access to the app. This can be useful if you want to give users a transition period before the app becomes completely unavailable in the environment.
