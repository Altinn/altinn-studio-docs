---
draft: false
title: Protected Data
description: Protected data requires extra access control beyond normal authorisation.
tags: [needsReview]
---

{{% notice info %}}
Available from [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## Protected Data in Altinn Studio

Protected data is information that requires extra access control beyond normal authorisation. In this article, we explain what protected data is, how it works, and when you should use it.

### What Is Protected Data?

Protected data is information that requires extra access control, for example personal information or confidential/classified information.

By default, users need the actions `read` and/or `write` to access the application's data. The [Policy.xml file](https://github.com/Altinn/app-template-dotnet/blob/main/src/App/config/authorization/policy.xml) is the main source of authorisation rules, but permissions can also be [delegated through Altinn](/en/authorization/what-do-you-get/accessmanagement/#delegation-and-management-of-access-groups).

### How Does Protected Data Work?

If your app contains data that requires extra protection, you can use the [applicationmetadata.json file](/en/api/models/app-metadata/#datatype) to specify `actionRequiredToRead` and `actionRequiredToWrite` for specific data types.

The policy must then include these actions, in addition to `read`/`write`, before users get access to the protected data types.

### When Should You Use This?

You should add extra access controls if your app:
- Has multiple users who should not see each other's data
- Collects sensitive or classified information about third parties
- Contains data that should only be readable

### Read More
- [Guide for configuring protected data types](/en/altinn-studio/v8/guides/development/restricted-data/)
- [More about applicationmetadata.json](/en/api/models/app-metadata/#complete-example)
- [More about authorisation policy and action attributes](/en/altinn-studio/v8/reference/configuration/authorization/#action-attributes)
