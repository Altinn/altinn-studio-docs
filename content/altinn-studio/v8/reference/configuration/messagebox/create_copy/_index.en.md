---
title: Create new copy
linktitle: Create copy
description: This page describes how to configure the create new copy functionality in an app.
weight: 200
---

## Description
The primary purpose of the create new copy feature is to make it easy for a user of the portal to start a new submission by copying a previously completed submission. The user just need to navigate to the instance they would like to copy and then click on the link Create new copy". The App will then create a new instance and open it in the browser ready for form filling with fields already filled in with data from the original.

{{%notice info%}}
The Create new copy functionality was introduced in version 7.9.0 of the nuget packages.
[See how to update the nuget references of your application here](/en/altinn-studio/v8/guides/administration/maintainance/dependencies/).
{{% /notice%}}

## Configuration

{{% notice info  %}}
The configuration has a retroactive effect and will also apply to previously created instances.
{{% /notice %}}

In addition to turning the functionality on and off, it is possible to choose whether attachments are copied and to exclude data types and data fields from the copy.

| Name                      | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| enabled                   | true/false if it is possible to create a copy of an instance. Defaults to false.                  |
| excludedDataTypes         | List of data types that should be excluded. Applies to both form data and attachments.            |
| excludedDataFields        | List of fields in the data model that should be excluded.                                         |
| includeAttachments        | true/false indicating whether attachments should be copied. Defaults to false.                    |
| includeDueBefore          | true/false indicating whether the due date (`dueBefore`) should be copied. Defaults to false.     |
| includedDataValues        | List of keys in `dataValues` that should be copied from the source instance.                      |
| includedPresentationTexts | List of keys in `presentationTexts` that should be copied from the source instance.               |

### Exclusion of data types

It is possible to provide a list of data types you do not want to be copied to the new instance. The exclusion applies to both form data and attachments. All data types to be copied must be associated with the first step in the app process.

### Copying attachments

{{%notice warning%}}Copying attachments requires `Altinn.App.Api` version 8.7.0 or newer.{{% /notice%}}

Attachments are copied only when `includeAttachments` is set to `true`. If the setting is `false` or omitted, attachments are not copied. Attachments with a data type listed in `excludedDataTypes` are not copied either.

### Exclusion of data fields

The list of excluded fields can be used to indicate which fields you don't want to be copied over to the new data element. The purpose of this feature is to empty fields you know will need to vary from one submission to the next. This could be a field that indicate which quarter of the year the submission is relevant for. Here the app developer will need to consider the different fields, the usage of the app and what would be the best for the user. The selected fields should be indicated with dot-notation in the same way as when doing data binding in layout files.

### Copying due date, data values and presentation texts

{{%notice warning%}}Copying due date, data values and presentation texts requires version 8.12.12 or newer of the `Altinn.App` libraries.{{% /notice%}}

By default the new instance gets no due date, and only the data values and presentation texts derived from `dataFields` and `presentationFields` in the application metadata are set on the new instance (they are recalculated from the copied form data).

Set `includeDueBefore` to `true` to copy `dueBefore` from the source instance. When a copy is created through the simplified instantiation endpoint, a `dueBefore` given explicitly in the request takes precedence.

Use `includedDataValues` and `includedPresentationTexts` to list the keys that should be copied from the source instance to the new instance. Keys that do not exist on the source instance are ignored. If a key is also derived from `dataFields` or `presentationFields`, the value recalculated from the copied form data is used. This is useful for data values set by application code, for example a value that `ICopyInstanceValidator` checks, which otherwise would be missing when a copy is copied again.

The copied presentation texts are sent to Storage when the new instance is created, and older versions of localtest ignore them. When you test locally, restart the test platform with `studioctl env down` and `studioctl env up` to get the newest version of localtest. If you still use the old app-localtest repository, pull the latest version and restart it.

### Reference to the source instance

{{%notice warning%}}The reference to the source instance requires version 8.12.12 or newer of the `Altinn.App` libraries.{{% /notice%}}

The new instance gets the data value `copy.sourceInstanceId` with the id of the instance it was copied from, in the format `{instanceOwnerPartyId}/{instanceGuid}`. In application code, use the constant `DataValueKeys.CopySourceInstanceId` from `Altinn.App.Core.Constants` instead of writing the key.

When a copy is copied again, the value by default points to the instance that was copied directly. If you add `copy.sourceInstanceId` to `includedDataValues`, the value is copied from the source instance instead, so that all copies in a chain point to the first instance. If the source instance has no such value, the id of the source instance is used.

```json
"copyInstanceSettings": {
    "enabled": true,
    "includedDataValues": [
        "copy.sourceInstanceId"
    ]
}
```

## Examples

Configuration for turning the *Create new copy* feature on and off.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true
}
```

Configuration where the Create new copy is activated and where two fields in two separate groups within the model is being excluded.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "excludedDataFields": [
        "group1.felt2",
        "group23.felt21"
    ]
}
```

Configuration where the Create new copy feature is activated and attachments are copied to the new instance.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "includeAttachments": true
}
```

Configuration where the due date and selected data values and presentation texts are copied to the new instance.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "includeDueBefore": true,
    "includedDataValues": [
        "appVersion",
        "customerId"
    ],
    "includedPresentationTexts": [
        "name"
    ]
}
```

## Programing interface

During the copying of an instance the logic will perform a method call to **IInstantiationProcessor.DataCreation**. This makes it possible to perform programmatic changes to the data as it is being copied. [Programmatic prefill](/en/altinn-studio/v8/guides/development/prefill/custom/).

## Validation

{{%notice warning%}}Validation requires version 8.12.2 or newer of the `Altinn.App` libraries.{{% /notice%}}

Validation is useful if the service owner wishes to restrict when end users can copy instances, for example based on deadlines or changes to the application.

`ICopyInstanceValidator` can be implemented in the application code to add custom validation that only runs when copying from an instance. The interface takes an `IInstanceDataAccessor` based on the source instance as an argument and returns an `InstantiationValidationResult`.

If the validation returns `Valid = false`, the end user will receive an error message and the copying will be cancelled.

### Examples

Instantiation of a copy not allowed if more than 10 days have passed since the submission deadline.

```C# {hl_lines=[12]}
using System;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;

namespace Altinn.App.models;

public class CopyInstanceValidator : ICopyInstanceValidator
{
    private const int NumberOfDaysAfterDueDate = 10;

    public async Task<InstantiationValidationResult> Validate(IInstanceDataAccessor sourceInstanceDataAccessor)
    {
        if (sourceInstanceDataAccessor.Instance.DueBefore.HasValue)
        {
            var deadline = sourceInstanceDataAccessor.Instance.DueBefore.Value.AddDays(NumberOfDaysAfterDueDate);
            if (DateTimeOffset.UtcNow > deadline)
            {
                return new InstantiationValidationResult
                {
                    Valid = false,
                    Message = "ERROR: Too long since due date"
                };
            }
        }

        return null;
    }
}
```

Instantiation of a copy not allowed after a specified date.

```C# {hl_lines=[12]}
using System;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;

namespace Altinn.App.models;

public class CopyInstanceValidator : ICopyInstanceValidator
{
    private static readonly DateTime CopiesNotAllowedAfter = new(2026, 6, 30);

    public async Task<InstantiationValidationResult> Validate(IInstanceDataAccessor sourceInstanceDataAccessor)
    {
        if (DateTime.UtcNow > CopiesNotAllowedAfter)
        {
            return new InstantiationValidationResult
            {
                Valid = false,
                Message = "ERROR: Not allowed to copy instances after 2026-06-30"
            };
        }

        return null;
    }
}
```

Instantiation of a copy not allowed if the application version has changed from the one used for the source instance.

```C# {hl_lines=[12]}
using System.Linq;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Internal.App;
using Altinn.App.Core.Models.Validation;

namespace Altinn.App.models;

public class CopyInstanceValidator(IAppMetadata appMetadata) : ICopyInstanceValidator
{
    public async Task<InstantiationValidationResult> Validate(IInstanceDataAccessor sourceInstanceDataAccessor)
    {
            var appVersionDataValue = sourceInstanceDataAccessor
                .Instance
                .DataValues
                .SingleOrDefault(x => x.Key == "appVersion");
            var application = await appMetadata.GetApplicationMetadata();
            if (appVersionDataValue != null && appVersionDataValue.Value.Equals(application.VersionId) == false)
            {
                return new InstantiationValidationResult
                {
                    Valid = false,
                    Message = "ERROR: Application version differs from the version that the source instance was created with"
                };
            }

            return null;
    }
}
```
