---
draft: true
title: Restricted data
description: How to set up additional data protections for an app

---

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/style.css.md" %}}

Restricted data is information that requires additional access control, such as personal data about people other than the user, or confidential information. The app can store such data in a separate data type that the user cannot read or change. Only those with access to specific actions, usually the service owner, can read and write the data.

If the user tries to read or write the data without access to the action, the app rejects the request with `403 Forbidden`.

You set this up in the app's code. Altinn Studio Designer has no settings for restricted data.

## Configuring Maskinporten

The app must be able to perform actions on behalf of the service owner, so you need to set up Maskinporten. See [integrating an Altinn app with Maskinporten](/nb/altinn-studio/v9/develop-a-service/integration/maskinporten/) (in Norwegian).

## Configuring the data types

The `applicationmetadata.json` file contains all [data types](/en/api/models/app-metadata/#datatype) in the app. Here, you specify which [actions](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/#action-attributter) (in Norwegian) are required to read and write the restricted data type.

In the example, you add a new data type with the properties `actionRequiredToRead` and `actionRequiredToWrite`, and disable `autoCreate`. The data type is called `restrictedDataModel`, but you can choose another name.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice warning %}}
You disable `autoCreate` because the [authorisation policy](#configuring-the-authorisation-policy) does not give users read or write access. If the app tries to create a data element of type `restrictedDataModel` with the user's token, it gets a `403 Forbidden` error.
{{% /notice %}}

## Configuring the authorisation policy

Start from the [default `policy.xml` file](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/) (in Norwegian), and change rule 2 to give the service owner access to the new actions.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Policy.xml.md" %}}

## Reading and writing restricted data

The app does not create `restrictedDataModel` automatically, and the data type is not part of the form the user fills in. You therefore need to write the code that reads and writes the data yourself.

By default, the app uses the user's token. To read and write the restricted data type, call `OverrideAuthenticationMethod` with `StorageAuthenticationMethod.ServiceOwner()`. The app then uses the service owner's token for that data type only.

{{% notice warning %}}
The app cannot save changes with the user's token and the service owner's token at the same time. If you change both the user's form data and the restricted data in the same code, you get an error when the app saves. You can read the restricted data when the user changes the form, but only change it in code that does not also change the user's data, for example when a task starts.
{{% /notice %}}

### Writing data

The example below stores data in the restricted data type when the process enters the task `Task_1`. It uses a [process hook](/nb/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks/) (in Norwegian) that implements `IOnTaskStartingHandler`. The code fetches information from a fictional API and stores it in `restrictedDataModel`. The user cannot see the information, but the app can retrieve it later.

The hook may run more than once if something fails along the way. The code therefore updates the data element if it already exists, instead of creating a new one.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/RestrictedDataOnTaskStart.cs.md" %}}

### Reading data

The example below implements `IDataWriteProcessor` and performs a fictional tax calculation when the user changes their income in the form. The calculation needs information the app has stored in the restricted data type. The code reads it with the service owner's token, but does not change it.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/DataWriteHandler.cs.md" %}}

### Registering the classes

Finally, register the classes in `Program.cs`.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Program.cs.md" %}}
