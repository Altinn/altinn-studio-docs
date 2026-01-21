---
title: Restricted data
description: How to set up additional data protections for an app
weight: 50
---

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/style.css.md" %}} 

{{% notice info %}}
Available from [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## Introduction
Restricted data refers to information requiring additional protection, such as personal, confidential, or classified data.

You can read more about the concept [here](/en/altinn-studio/v8/concepts/data-model/restricted-data/).

## Configuring Maskinporten
You must configure Maskinporten to allow the app to perform actions on behalf of the service owner.

You can find a detailed guide on that setup [here](/en/altinn-studio/v8/guides/integration/maskinporten/).

## Configuring the data types
The [applicationmetadata.json](https://github.com/Altinn/altinn-studio/blob/main/src/App/app-template-dotnet/src/App/config/applicationmetadata.json) file defines all [data types](/en/api/models/app-metadata/#datatype) in an application. Here, you specify which [actions](/en/altinn-studio/v8/reference/configuration/authorization/#action-attributes) are required for your restricted data type.

In this example, we configure a new data type, specifying the `actionRequiredToRead` and `actionRequiredToWrite` properties, and disabling `autoCreate`. We use the identifier `restrictedDataModel`, though the name itself is not significant.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice warning %}}
We disable auto-create because our [updated authorization policy](#configuring-the-authorization-policy) does not grant read or write access to end-users. Attempting to create a `restrictedDataModel` data element with a user's authorization token will result in a 403-Forbidden error.
{{% /notice %}}

## Configuring the authorization policy
Using the [default policy.xml file](https://github.com/Altinn/altinn-studio/blob/main/src/App/app-template-dotnet/src/App/config/authorization/policy.xml) as a starting point, modify rule #2 to grant the new custom actions to bearers of a service owner token.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/Policy.xml.md" %}}

## Interacting with the restricted data
Since the `restrictedDataModel` is not automatically created or attached to the user's normal data flow, you must implement all relevant logic manually.

In this section we'll create a service that helps us interact with the restricted data, before demonstrating how we can create, modify, and read restricted data elements in a normal app flow.

### Helper service
To simplify authorization and interaction with the restricted data model, we can create a helper service to handle this complexity.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/RestrictedDataHelper.cs.md" %}}

This service can then be registered in `Program.cs` and [injected](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) wherever you need it.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/Program.cs.md" %}}

### Writing data
As mentioned, we need to manually create the data element when the application enters the `Task_1` process step.

To do this, use the `UpdateOrCreateData` method from the [RestrictedDataHelper service](#helper-service).

The following example implements this logic in the `IProcessTaskStart` interface, fetching information from a fictional API and storing it in the restricted data model. This information remains unavailable to the user but can be retrieved later by the app.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/ProcessTaskStartHandler.cs.md" %}}

### Reading data
In the following code, we have created an implementation of the `IDataWriteProcessor` interface, where we perform a fictional tax calculation. This calculation requires information we previously stored in the restricted data model, so we use [RestrictedDataHelper.GetOrCreateData](#helper-service) to retrieve it.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/DataWriteHandler.cs.md" %}}