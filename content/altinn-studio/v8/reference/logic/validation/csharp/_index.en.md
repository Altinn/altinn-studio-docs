---
title: Creating validators in C#
linktitle: Validators in C#
description: How to write custom validation rules in C# that the app runs on the server
toc: true
weight: 50
---

This page is for developers who write custom validation rules in C#. The [Validation]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#when-the-user-sees-validation-messages) page describes when the user sees validation messages.

A validator is a C# class that implements one of the app's validation interfaces. An interface is a fixed recipe for which methods the class must have, so that the app knows how to call it.

## How validation is structured

The app validates in two ways:

- **On every save**, the app only runs the validators that may have a new result. The browser saves changes continuously while the user fills in the form, so this happens often. We call this _incremental validation_.
- **When the user moves on in the process**, or when a system asks for it, the app runs all the validators for the task.

Each validator has a `ValidationSource`, which is a unique name for the validator. The app labels all messages from the validator with this name. The browser keeps a list of messages for each `ValidationSource`. When a validator runs again, the browser replaces the whole list from that validator with the new messages. The browser keeps the messages from validators that did not run as they were. The default value is the full class name together with the task or data type, and you rarely need to change it. If two validators have the same `ValidationSource`, their messages get mixed up.

On every save, the app asks each validator whether it needs to run, using the `HasRelevantChanges` method. The app passes in the changes in the save. If the validator answers no, the app does not run it, and the browser keeps the messages from last time.

If the validator is slow, for example because it calls other systems, it is important that `HasRelevantChanges` is as precise as possible. The app then avoids running the validator when the result cannot have changed. If the validator only does simple checks, `HasRelevantChanges` can simply always answer yes:

```csharp
protected override bool HasRelevantChanges(GrantApplication current, GrantApplication previous) => true;
```

`HasRelevantChanges` must never answer no when the messages may have changed. The user would then see outdated messages.

Some properties on the validator control how the app runs it:

| Property | Default | Meaning |
| --- | --- | --- |
| `TaskId` or `DataType` | None | Which task or data type the validator applies to. With `"*"` it applies to all. |
| `NoIncrementalValidation` | `false` | With `true`, the app does not run the validator on save, only when the user moves on or a system asks for validation. The user then sees the errors only when they try to submit. |
| `ShouldRunAfterRemovingHiddenData` | `false` | With `true`, the validator gets the data without fields that are hidden from the user. Hidden fields then do not stop the submission. |

By default, the app also validates fields that are hidden from the user. If you want the validator to see only visible data, override `ShouldRunAfterRemovingHiddenData`:

```csharp
// In GenericFormDataValidator<T>:
public override bool ShouldRunAfterRemovingHiddenData => true;

// In IValidator:
public bool ShouldRunAfterRemovingHiddenData => true;
```

The app runs the validators in parallel. A validator should only read the data, not change it. If you need to change data, use a [data processor]({{< relref "/altinn-studio/v8/reference/logic/dataprocessing" >}}). If a validator throws an exception, the whole save or submission fails. Catch errors from other systems in the validator.

## Choosing an interface

You have two options:

- `IValidator` is the main interface for validation. The validator has access to all the data in the task, and you decide which changes make it run. Use it when the rule needs data from several data models, or when you want full control.
- `GenericFormDataValidator<T>` is a ready-made class that makes it easier to validate a single data model. The app gives you the data as the right model type and builds the field path for the messages.

The app also has older interfaces that still work. See [Older validation interfaces](#older-validation-interfaces).

## Using IValidator

`IValidator` has access to all the data in the instance through `dataAccessor`.

The example below checks that the total in the budget is not higher than the amount the user applies for. The budget and the grant application are two data types in the same task:

{{% notice info %}}
In v9, the app template has implicit `using` directives and nullable turned on. You then do not need the `using` lines for the `System` namespaces, and `language` is `string?`.
{{% /notice %}}

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models;
using Altinn.App.Core.Models.Validation;
using Altinn.App.Models.GrantApplication; // The namespaces of your data models
using Altinn.App.Models.Budget;

namespace Altinn.App.Logic.Validation;

public class BudgetValidator : IValidator
{
    // The ID of the task the validator runs in. Use "*" to run in all tasks.
    public string TaskId => "Task_1";

    // language is the language the user has chosen. You only need it if you build
    // the message text yourself instead of using CustomTextKey.
    public async Task<List<ValidationIssue>> Validate(
        IInstanceDataAccessor dataAccessor,
        string taskId,
        string language)
    {
        // Check that there is exactly one data element of each data type. If one is missing,
        // the validator returns no messages instead of throwing an exception.
        if (dataAccessor.GetDataElementsForType("grant-application").ToList() is not [var grantApplicationElement]
            || dataAccessor.GetDataElementsForType("budget").ToList() is not [var budgetElement])
        {
            return [];
        }

        var grantApplication = await dataAccessor.GetFormData<GrantApplication>(grantApplicationElement);
        var budget = await dataAccessor.GetFormData<Budget>(budgetElement);

        // If Total or AmountApplied is empty (null), the comparison is always false.
        // The validator then returns no message, and required on the components checks
        // whether the fields are filled in.
        if (budget.Total > grantApplication.AmountApplied)
        {
            return
            [
                new ValidationIssue
                {
                    Severity = ValidationIssueSeverity.Error,
                    // Without DataElementId, the app links the message to the default
                    // data model for the task. Always set it, so the message ends up at the right field.
                    DataElementId = budgetElement.Id,
                    // The path to the field, as it appears in dataModelBindings.
                    Field = "Total",
                    CustomTextKey = "validation.budget.above-amount-applied",
                },
            ];
        }

        return [];
    }

    // Only run the validator when the user has changed the grant application or the budget.
    public Task<bool> HasRelevantChanges(
        IInstanceDataAccessor dataAccessor,
        string taskId,
        DataElementChanges changes) =>
        Task.FromResult(changes.FormDataChanges.Any(change =>
            change.DataType.Id is "grant-application" or "budget"));
}
```

## Using GenericFormDataValidator

If the rule only looks at a single data model, `GenericFormDataValidator<T>` is simpler. The example below checks that the end date comes after the start date in the `GrantApplication` data model, which belongs to the `grant-application` data type. You could also solve this rule with [validation using expressions]({{< relref "/altinn-studio/v8/reference/logic/validation/expression-validation" >}}), but it shows how the class is structured:

```csharp
using System.Threading.Tasks;
using Altinn.App.Core.Features.Validation;
using Altinn.App.Core.Models.Validation;
using Altinn.App.Models.GrantApplication; // The namespace of your data model
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic.Validation;

// "grant-application" is the ID of the data type in applicationmetadata.json.
// The validator only runs in the task the data type belongs to.
public class PeriodValidator() : GenericFormDataValidator<GrantApplication>("grant-application")
{
    // The check is fast, so the validator can run on every save.
    protected override bool HasRelevantChanges(GrantApplication current, GrantApplication previous) => true;

    protected override Task ValidateFormData(
        Instance instance,
        DataElement dataElement,
        GrantApplication data,
        string language)
    {
        // The fields are nullable, as they usually are in data models generated from XSD.
        // If one of the dates is empty, the validator does not check anything. Required on
        // the component checks whether the field is filled in.
        if (data.Period?.Start is { } start
            && data.Period?.End is { } end
            && end <= start)
        {
            // The first argument points to the field, and the app builds the field path for you.
            // The second argument is the text key of the error message.
            // To give a warning instead, pass ValidationIssueSeverity.Warning
            // as the third argument.
            CreateValidationIssue(
                grantApplication => grantApplication.Period.End,
                "validation.period.end-before-start");
        }

        return Task.CompletedTask;
    }
}
```

You usually let the validator accept empty values, that is `null` and empty text (`""`), and let `required` on the component check whether the field is filled in. The app shows errors from the validator straight away, so a validator that triggers on empty values shows errors for fields the user has not reached yet. See [While the user fills in the form]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#while-the-user-fills-in-the-form) and [Creating validation messages](#creating-validation-messages).

## Registering the validator

Register the validator in `RegisterCustomAppServices` in `App/Program.cs`. Add the `using` lines at the top of the file:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Logic.Validation;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register each validator only once. Two registrations of the same class give
    // the same ValidationSource, and the messages get mixed up.
    services.AddTransient<IValidator, BudgetValidator>();

    // GenericFormDataValidator<T> implements IFormDataValidator, so register it as that.
    services.AddTransient<IFormDataValidator, PeriodValidator>();
}
```

You decide what the classes are called and where the files are. We recommend the `App/logic/Validation` folder.

## Creating validation messages

A validation message is a `ValidationIssue` object. These are the most important properties:

| Property | Description |
| --- | --- |
| `Severity` | The severity. Required. |
| `CustomTextKey` | The text key of the message the user sees |
| `CustomTextParameters` | Values you want to insert into the text |
| `Field` | The field path in the data model that the message is about |
| `DataElementId` | The ID of the data element that the message is about |
| `Code` | A short, fixed code for the type of error, for example `DeadlineExpired`. The user does not see it. |
| `Description` | A text the app uses if you have not set `CustomTextKey` (if it is not set, the translation system is used automatically) |

The app sets `Source` itself. Do not set it.

### Severity

| `Severity` | The user sees | Stops submission? |
| --- | --- | --- |
| `Error` | An error message | Yes |
| `Warning` | A warning | No |
| `Informational` | An information message | No |
| `Success` | A confirmation | No |

Warnings, information and confirmations are [_soft validations_]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#soft-validations). Use them to ask the user to double-check a value that looks wrong but is not invalid. The app only shows soft validations next to a field, so they must have `Field`.

### Linking the message to a field

For the app to show the message next to the right component, `Field` must be exactly the same path that the component uses in `dataModelBindings`. This means that

- you use full stops between levels, for example `Person.Address.PostCode`
- you write the row number in repeating groups in square brackets, for example `People[2].FirstName` (the first row is `0`)
- upper and lower case must match
- you use the names from `dataModelBindings`, not the names of the C# properties, if they differ

With `GenericFormDataValidator<T>` and `CreateValidationIssue`, the app builds the path for you. With `IValidator`, you should also set `DataElementId`. Without it, the app links the message to the default data model for the task.

{{% notice info %}}
In v9, the app does not show messages that have `Field` but no `DataElementId`. Always set `DataElementId` in `IValidator`, so the validator keeps working after an upgrade.
{{% /notice %}}

The user only sees errors without `Field`, or with a field that has no visible component, in the error summary after a failed attempt to move on. If the field belongs to a hidden component, the error still stops the submission. See [How validation is structured](#how-validation-is-structured).

### Texts and languages

Put the message in the [text resources]({{< relref "/altinn-studio/v8/reference/ux/texts" >}}) and set the text key in `CustomTextKey`. The app then shows the text in the language the user has chosen.

{{< code-title >}}
App/config/texts/resource.en.json
{{< /code-title >}}

```json
{
  "id": "validation.budget.above-amount-applied",
  "value": "The budget is higher than the amount you are applying for."
}
```

If you want to insert values into the text, put them in `CustomTextParameters` and use `variables` with `"dataSource": "customTextParameters"` in the text resource. You insert the variables with `{0}`, `{1}` and so on, in the same order as in `variables`:

```csharp
CustomTextKey = "validation.budget.above-amount-applied",
CustomTextParameters = new() { ["amount"] = $"{grantApplication.AmountApplied}" },
```

```json
{
  "id": "validation.budget.above-amount-applied",
  "value": "The budget is higher than {0} kroner, which is the amount you are applying for.",
  "variables": [
    { "key": "amount", "dataSource": "customTextParameters" }
  ]
}
```

Which data sources (`dataSource`) are supported can vary with where the text is shown. `Description` is translated automatically, if you have not set it to something other than `null`.

## When the app runs the validators

### While the user fills in the form

When the user opens the form, the app runs the same validators as on save, so that the user sees the messages straight away.

The browser checks required fields, validation using expressions and the data model itself while the user fills in the form, so the server skips them on save. The server runs them when the user moves on in the process. If the browser and the server give different answers, the user can get an error on submission that they did not see while filling in the form.

### When the user moves on in the process

When the user moves on to the next task, the app runs all the validators for the task. If at least one validator returns an error with severity `Error`, the user cannot move on.

The app skips validation when

- the user rejects the task with the `reject` action, and rejection is allowed for the task in the process
- the task is a [service task]({{< relref "/altinn-studio/v8/guides/development/service-tasks" >}}) that the app runs without a user

The app runs the validation _after_ any action the user has chosen, for example `sign` or `confirm`, because the result of the action can decide whether the validation passes. If the validation fails, the action has still happened. For example, the user has signed but cannot move on until they have fixed the errors.

### When other end-user systems use the API

For some forms, accounting systems or other software have a direct integration that submits the form on behalf of the user. Such a system can ask the app to validate the instance with the [validation API]({{< relref "/api/apps/validation" >}}). The app then runs all the validators for the task the instance is in. When the system asks the app to move on in the process, the app validates in the same way as when a user does it.

When the system saves data, it does not always get the validation result back. Use the validation API to get all the messages.

## Older validation interfaces

The app still supports the `IDataElementValidator` and `ITaskValidator` interfaces, and you can use `IFormDataValidator` directly without `GenericFormDataValidator<T>`. Anything you can do with them, you can also do with `IValidator`, so we recommend `IValidator` for new validators.

| Interface | Gets | How to do the same with `IValidator` |
| --- | --- | --- |
| `IDataElementValidator` | One data element at a time, with metadata such as file name, file type and tags | Go through the data elements in `dataAccessor.Instance.Data` |
| `ITaskValidator` | The instance, without form data | Return messages without `Field` |
| `IFormDataValidator` | A single data model as `object` | Use `GenericFormDataValidator<T>`, or get the data with `dataAccessor` |

You register them in the same way as other validators, with the interface as the type, for example `services.AddTransient<ITaskValidator, DeadlineValidator>();`. The app sets `DataElementId` for you in `IDataElementValidator` and `IFormDataValidator`, but not in `IValidator`.

`IDataElementValidator` and `ITaskValidator` have `NoIncrementalValidation` set to `true` by default. The app then does not run them on save, only when the user moves on in the process or a system asks for validation, and the user sees the errors only when they try to submit. You can override the property in your class:

```csharp
public bool NoIncrementalValidation => false;
```

The app then runs the validator on every save, and the user sees messages with `Field` next to the field straight away. The app does not show messages without `Field` until the user tries to submit in any case. These interfaces have no `HasRelevantChanges`, so the app runs the validator every time, whatever the user has changed. Only do this for validators that are fast.

## Migrating from IInstanceValidator

`IInstanceValidator` is obsolete, but the app still runs it. The app runs `ValidateData` on every save, whatever the user has changed, and `ValidateTask` when the user moves on in the process. We recommend moving the rules to the new interfaces:

| With `IInstanceValidator` | Use instead |
| --- | --- |
| `ValidateData` | `GenericFormDataValidator<T>` or `IValidator` |
| `ValidateTask` | `IValidator` with messages without `Field`, and `NoIncrementalValidation = true` |
| `validationResults.AddModelError(field, message)` | Return a `ValidationIssue` with `Field` and `CustomTextKey`. `Field` must be the path from `dataModelBindings`, not the C# name. `CreateValidationIssue` builds the path for you. |
| The prefixes `*WARNING*`, `*INFO*` and `*SUCCESS*` before the message | `Severity = Warning`, `Informational` or `Success` |
| The `*FIXED*` prefix | Nothing. The app runs all the validations again, so you do not need to report that an error has been fixed. |

The prefixes do not work in the new interfaces. If a prefix is in the text, the user sees it as part of the message.

The text keys `soft_validation.info_title`, `soft_validation.warning_title` and `soft_validation.success_title` are no longer used.

## Troubleshooting

| Problem | Possible cause |
| --- | --- |
| The validator does not run | The validator is not registered in `Program.cs`, or it is registered without the interface as the type. The app only finds validators that are registered with the interface.<br>Wrong: `services.AddTransient<BudgetValidator>();`<br>Right: `services.AddTransient<IValidator, BudgetValidator>();`<br>Wrong: `services.AddTransient<PeriodValidator>();`<br>Right: `services.AddTransient<IFormDataValidator, PeriodValidator>();` |
| The validator does not run in the task the user is in | `TaskId` or `DataType` belongs to another task |
| The app responds with a server error when the user saves or submits | The validator's `DataType` does not exist in `applicationmetadata.json`, or the validator throws an exception |
| The message is not shown next to the field | `Field` does not exactly match `dataModelBindings`, or `DataElementId` is missing and the field is in a data model other than the default one for the task |
| The message is only shown when the user tries to submit | The validator has `NoIncrementalValidation = true`, which is the default for the older interfaces `ITaskValidator` and `IDataElementValidator`, or the message has no `Field` |
| The user sees the text key instead of the text | The text key is missing from the text resources for the language the user has chosen |
| The message starts with `*WARNING*` or another prefix | The prefixes only work in `IInstanceValidator`. Set `Severity` instead. |
| The user sees errors for fields they have not filled in yet | A validator triggers on empty values. You usually let the validator accept `null` and `""`, and use `required` to check that the field is filled in. |
| Messages from two validators get mixed up or disappear | Two validators have the same `ValidationSource`, for example because the same class is registered twice |
| A hidden component stops the submission | The validator checks hidden fields. See [How validation is structured](#how-validation-is-structured). |
