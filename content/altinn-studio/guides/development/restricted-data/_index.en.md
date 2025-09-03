---
title: Restricted Data
linktitle: Restricted Data
description: How to set up additional data protections for an app
weight: 50
---

<style>
code {
    max-height: 500px;
}
code.language-xml {
  white-space: pre !important;
}
</style>

{{% notice info %}}
Available from [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## Introduction
Restricted data refers to any information that needs extra protection, such as personal, confidential, or classified data.

You can read more about the concept [here](/altinn-studio/concepts/data-model/restricted-data).

## Configuring Maskinporten
Maskinporten must be configured in order for the app to perform actions on behalf of the service owner.

You can find a detailed guide on that setup [here](/altinn-studio/guides/integration/maskinporten).

## Configuring the application metadata
The [applicationmetadata.json](https://github.com/Altinn/app-template-dotnet/blob/main/src/App/config/applicationmetadata.json)
file contains the definition for all [data types](/api/models/app-metadata/#datatype) in an application. This is where we define
which [action](/altinn-studio/reference/configuration/authorization/#action-attributes) our restricted data type should require.

For this example, we are going to configure a new data type. The data type will specify the `actionRequiredToRead` and `actionRequiredToWrite` properties, 
and will disable `autoCreate`. We'll give it the identifier `restrictedDataModel`, but this name is not semantically important.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice warning %}}
The reason we need to disable auto-create in this scenario is because our [updated authorization policy](#configuring-the-authorization-policy) will not grant read
or write access to end-users of this application. Attempting to create a data element of type `restrictedDataModel` with a user's authorization token
would result in a 403-Forbidden error.
{{% /notice %}}

## Configuring the authorization policy
Using the [default policy.xml file](https://github.com/Altinn/app-template-dotnet/blob/main/src/App/config/authorization/policy.xml) as a starting point,
let's modify rule #2 to grant the new custom actions to bearers of a service owner token.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/Policy.xml.md" %}}

## Interacting with the restricted data
Because the `restrictedDataModel` will not be automatically created by the system, and is not attached to the user's normal data flow,
we need to implement all the relevant logic ourselves.

In this section we'll create a service that helps us interact with the restricted data, before demonstrating how we can
create, modify, and read restricted data elements in a normal app flow.

### Helper service
In order to simplify the authorization and interaction with the restricted data model, we'll create a helper service that
takes care of this complexity for us.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/RestrictedDataHelper.cs.md" %}}

This service can then be registered in `Program.cs` and injected wherever you need it.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/Program.cs.1.md" %}}

### Writing data
As mentioned, we need to manually create the data element when an application enters the `Task_1` process step.

To achieve this we can use the `UpdateOrCreateData` method from the [RestrictedDataHelper service](#helper-service).

The following example has implemented this logic in the `IProcessTaskStart` interface, where we fetch some information
from a fictional API and store it in our restricted data model. This information will remain unavailable to the user of the
application, but can be retrieved later by the app itself.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/ProcessTaskStartHandler.cs.md" %}}

### Reading data
When we want to read information stored in the restricted data model, we can again make use of the [helper service](#helper-service).

This time we'll make use of the `GetOrCreateData` method in an implementation of the `IDataWriteProcessor` interface.
The task at hand is to perform a fictional tax calculation based on the app user's reported income, along with the spousal
details we stored in the previous step.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/DataWriteHandler.cs.md" %}}