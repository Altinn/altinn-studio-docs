---
title: Restricted Data
linktitle: Restricted Data
description: How to set up additional data protections for an app
weight: 50
---

{{% notice info %}}
Available from [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## What is restricted data?
Restricted data refers to any information that needs extra protection, such as personal, confidential, or classified data.

You can read more [here](/altinn-studio/concepts/data-model/restricted-data).

## Configuring the application metadata
The [applicationmetadata.json](https://github.com/Altinn/app-template-dotnet/blob/main/src/App/config/applicationmetadata.json)
contains the definition for all [data types](/api/models/app-metadata/#datatype) in an application. This is where we define
which [action](/altinn-studio/reference/configuration/authorization/#action-attributes) our restricted data type should require.

For this example, we are going to configure two actions:
- `...`