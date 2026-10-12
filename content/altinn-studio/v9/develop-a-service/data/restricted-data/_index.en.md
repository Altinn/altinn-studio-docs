---
draft: true
title: Restricted data
description: How to set up additional data protections for an app

---

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/style.css.md" %}}

Restricted data is information that requires additional access control, such as personal data about people other than the user, or confidential information. The app can store such data in a separate data type that the user cannot read or change. Only those with access to specific actions, usually the service owner, can read and write the data.

If the user tries to read or write the data without access to the action, the app rejects the request with `403 Forbidden`.

You set this up in the app's code. Altinn Studio Designer has no settings for restricted data.

The app reads and writes the restricted data with the service owner's token. To get the token, the app needs the default service owner scopes in Maskinporten. Altinn Studio adds these automatically when you build a v9 app, so you do not need to set up Maskinporten yourself. Read more about [how to integrate an Altinn app with Maskinporten](/nb/altinn-studio/v9/develop-a-service/integration/maskinporten/) (in Norwegian).

## Configuring the data types

The `applicationmetadata.json` file contains all [data types](/en/api/models/app-metadata/#datatype) in the app. Here, you specify which [actions](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/#action-attributter) (in Norwegian) are required to read and write the restricted data type.

In the example, you add a new data type with the properties `actionRequiredToRead` and `actionRequiredToWrite`, and disable `autoCreate`. The data type is called `restrictedDataModel`, but you can choose another name.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice info %}}
You disable `autoCreate` because the app would otherwise create an empty data element of type `restrictedDataModel` when the task starts. In the example below, the code creates the data element itself, with the right content.
{{% /notice %}}

## Configuring the authorisation policy

Start from the [default `policy.xml` file](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/) (in Norwegian), and change rule 2 to give the service owner access to the new actions.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Policy.xml.md" %}}

## Reading and writing restricted data

The app does not create `restrictedDataModel` automatically, and the data type is not part of the form the user fills in. You therefore need to write the code that reads and writes the data yourself.

Which token the app uses depends on where the code runs:

- In code that runs when the user does something, such as changing the form, the app uses the user's token. Here, you call `OverrideAuthenticationMethod` with `StorageAuthenticationMethod.ServiceOwner()`. The app then uses the service owner's token for that data type only.
- In hooks that run in the process, such as `IOnTaskStartingHandler`, the app already uses the service owner's token for all data types. Here, you do not need to call `OverrideAuthenticationMethod`.

{{% notice warning %}}
In code that runs when the user does something, such as `IDataWriteProcessor`, the app cannot save changes with the user's token and the service owner's token at the same time. If you change both the user's form data and the restricted data in the same code, you get an error when the app saves. Only the data you change counts, so you can safely read the restricted data here. If you want to change it, do so in a hook in the process. There, the app uses the service owner's token for all data types, and you can change both.
{{% /notice %}}

{{% notice warning %}}
If you have enabled XSD validation (`XsdValidation` under `AppSettings`) and there is an XSD file for `restrictedDataModel`, the validation also reads the restricted data with the user's token. The user may then get a `403 Forbidden` error.
{{% /notice %}}

### Writing data

The example below stores data in the restricted data type when the process enters the task `Task_1`. It uses a hook in the process that implements `IOnTaskStartingHandler`. Read more about `IOnTaskStartingHandler` in the [guide to upgrading from v8 to v9](/nb/altinn-studio/v9/new-in-v9/upgrade/#vi-har-flyttet-egendefinerte-oppgave-hooker-og-de-har-fått-ny-funksjonsmåte) (in Norwegian). The code fetches information from a fictional API and stores it in `restrictedDataModel`. The user cannot see the information, but the app can retrieve it later.

The hook must handle running more than once, for example when the process returns to the task. The code therefore updates the data element if it already exists, instead of creating a new one.

{{% notice warning %}}
You can only have one `IOnTaskStartingHandler` per task. If the app already has such a hook for `Task_1`, add the code to it. If more than one hook returns `true` from `ShouldRunForTask` for the same task, the process fails when it tries to enter the task, and the app does not try again.
{{% /notice %}}

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/RestrictedDataOnTaskStart.cs.md" %}}

### Reading data

The example below implements `IDataWriteProcessor` and performs a fictional tax calculation when the user changes their income in the form. The calculation needs information the app has stored in the restricted data type. The code runs when the user changes the form, so it must call `OverrideAuthenticationMethod` to read the data with the service owner's token. The code does not change the restricted data.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/DataWriteHandler.cs.md" %}}

### Registering the classes

Finally, register the classes in `Program.cs`.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Program.cs.md" %}}
