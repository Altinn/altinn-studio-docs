---
title: Restricted Data
linktitle: Restricted Data
description: How to set up additional data protections for an app
weight: 50
---

<style>
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

## Configuring Maskinporten
Maskinporten must be configured in order for the app to perform actions on behalf of the service owner.

You will find a detailed guide that setup in the [integrations section](/altinn-studio/guides/integration/maskinporten).

## Interacting with the restricted data
Because we have prevented the `restrictedDataModel` from being automatically created, we need to implement the required
logic ourselves.

### Helper service
You may find it convenient to create a helper service that can handle the data element creation and relevant authorization.

This service can then be registered in `Program.cs` and injected wherever you need it.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/RestrictedDataHelper.cs.md" %}}

### Writing data
As part of our restricted data example, we need to manually create the data element when an application enters the `Task_1` process step.

To achieve this we can make use of the [RestrictedDataHelper service](#helper-service) described above, for instance in an implementation of `IProcessTaskStart`.

In the example below we are fetching some information from a fictional API and storing it in our restricted data model.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/ProcessTaskStartHandler.cs.md" %}}

### Reading data
Likewise when it comes to reading information from the restricted data type, we need to make use our [helper service](#helper-service).

In the example below we are using the information stored in the previous step to perform some fictional tax calculations.

{{% insert "content/altinn-studio/guides/development/restricted-data/shared/DataWriteHandler.cs.md" %}}