---
title: Unpublishing Apps
linktitle: Unpublishing
description: Explains what unpublishing is and what happens when you unpublish an app.
toc: true
weight: 70
---

## Unpublishing Apps in Altinn Studio

When you unpublish apps in Altinn Studio, you make the apps unavailable to users by removing them from an environment. This can be useful when an app is outdated and is no longer to be used. In this article, we will explain what happens when you unpublish, what you should consider before and after the process, and what alternatives you may wish to consider.

### What happens when you unpublish an app?

Once the app is unpublished, it becomes unavailable to users, both in the user interface and via API endpoints.

- **API endpoints become unavailable:**  
  When an app is unpublished, its API endpoints will no longer function. This means that external systems and users trying to communicate with the app via the API will experience errors.

- **Active Instances:**  
  Users who still have active instances of an unpublished app will no longer be able to access their instance. When they try to open the instance from their inbox, they will encounter an error page.

### Important Considerations Before Unpublishing

Before you proceed with unpublishing, you should consider how you will handle active instances and their data:

1. **Handling Active Instances:**  
   If there are instances that are still in use (for example, in the user's inbox), you must consider what will happen to these. If you want to remove the instances, you can do so via the app’s APIs before unpublishing.

2. **Handling Data After Unpublishing:**  
   Once the app is unpublished, you can still retrieve data, but you will need to use the Storage API after unpublishing. This is because the app’s own APIs will no longer be available.

### What Can You Do Instead of Unpublishing?

If you do not wish to unpublish the app, you can make it unavailable in several other ways:

- **Switch to an Earlier Version:**  
  If the current version of the app has issues, you can choose to roll back to an earlier version that works better.

- **Deactivate the App in the Code:**  
  You can remove access to the app in the code, making it unavailable in that way. This allows you to avoid completely unpublishing the app.

- **Change Access Settings:**  
  You can adjust the access settings so that users cannot start new instances of the application.

- **Implement Validation Before Unpublishing:**  
  By adding validation in the code, you can decide when users should have access to the app. This can be useful if you want to give users a transition period before the app becomes completely unavailable in the environment.

### How Do I Unpublish an App?

[Go to the guide for unpublishing apps](/nb/altinn-studio/guides/development/undeploy/).
