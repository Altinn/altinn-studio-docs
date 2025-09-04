---
title: Restricted Data
description: Extra protections for restricted data types
---

{{% notice info %}}
Available from [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## What is restricted data?
Restricted data refers to any information that needs extra protection, such as personal, confidential, or classified data.

By default, a user needs `read` and/or `write` actions to access application data. The [policy.xml](https://github.com/Altinn/app-template-dotnet/blob/main/src/App/config/authorization/policy.xml) file is the primary source of authorization policies, but permissions can also be [delegated through Altinn](/authorization/what-do-you-get/accessmanagement/#delegation-and-management-of-access-groups).

If your app contains data that requires extra protection, you can use the [applicationmetadata.json](/api/models/app-metadata/#datatype) file to specify `actionRequiredToRead` and `actionRequiredToWrite` properties for specific data types. These actions must be assigned in the policy, in addition to `read`/`write`, before users can access the protected data elements.

## When would I use this?
You should add data restrictions if your app:
- Has multiple users who should not see each other's data
- Collects sensitive or classified information about third parties
- Contains data that should be treated as read-only

## Further reading
- [Guide for configuring sensitive data types](/altinn-studio/guides/development/restricted-data)
- [More details about the applicationmetadata.json file](/api/models/app-metadata/#complete-example)
- [More details about authorization policies and action attributes](/altinn-studio/reference/configuration/authorization/#action-attributes)