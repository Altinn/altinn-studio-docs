---
title: Validation
description: How to add logic to validate form data?
toc: true
---

## Introduction

Validations ensures that the user's input is valid with regard to the data model, 
in addition to all custom rules that are set up for the application.
Validations can be run either on the client- (the browser) or the server-side.

## Client-side validation

This is validation that is run in the browser, before data is sent to server for saving. This makes it possible to give quick feedback to 
the user during the fillout process.

Client-side validation is based on the data model of the form, and uses this to determine what is valid input in a field.
Specifically, the JSON schema version of the data model is used for validation. This is automatically generated when uploading an XSD.
It is possible to make changes in the JSON schema file directly to adapt the validation when needed.

**Note that if you make changes in the JSON schema manually, and then update the XSD and reupload it, a new 
JSON schema will also be generated and all manual adaptations will have to be remade. It is therefore recommended to make changes in the XSD and/or the data modeling tool
for these changes to be reflected in the JSON schema.**

An example of how a field can be defined in the JSON schema data model is:

```json
"someField": {
  "type": "string",
  "maxLength": "4"
}
```

Input in this field will be validated towards the limits that are set, and an error message will appear if these are not met - in this case, if
input is a text longer than four characters.

### Default error messages
Default error messages has been set up for all validations done on the client-side. See the overview below.

| Rule      | Error message bokmål          | Error message nynorsk         | Error message english                 |
| --------- | ----------------------------- | ----------------------------- | ------------------------------------- |
| min       | 'Minste gyldig verdi er {0}'  | 'Minste gyldig verdi er {0}'  | 'Minimum valid value is {0}'          |
| max       | 'Største gyldig verdi er {0}' | 'Største gyldig verdi er {0}' | 'Maximum valid value is {0}'          |
| minLength | 'Bruk {0} eller flere tegn'   | 'Bruk {0} eller flere tegn'   | 'Use {0} or more characters'          |
| maxLength | 'Bruk {0} eller færre tegn'   | 'Bruk {0} eller færre tegn'   | 'Use {0} or fewer characters'         |
| length    | 'Antall tillatte tegn er {0}' | 'Antall tillatte tegn er {0}' | 'Number of characters allowed is {0}' |
| pattern   | 'Feil format eller verdi'     | 'Feil format eller verdi'     | 'Wrong format or value'               |
| required  | 'Du må fylle ut {0}'          | 'Du må fylle ut {0}'          | 'You have to fill out {0}'            |
| enum      | 'Kun verdiene {0} er tillatt' | 'Kun verdiene {0} er tillatt' | 'Only the values {0} are permitted'   |

### Specifically on default error messages for required fields
The error message for required fields is as defined above, _"You have to fill out {0}"_. The `{0}` symbol is replaced with the field that
the error message is shown for. This is done in the following way:
- Uses the field's `shortName` text. This is a new component, that can be set up on a component in the same way as a prompt (`title`).  _This is currently used only for an error message for required fields._
- If the `shortName` text is not defined, the `title` text for the component is used - this is the components label text.
- In some special cases (Address component) where there are multiple fields within the component, the default labels for the fields is used.

#### Example: Component with only `title`
```json
{
  "id": "firstName",
  "type": "Input",
  "textResourceBindings": {
    "title": "text-firstName"
  },
  ... //etc
}
```
With resource texts:

```json
...
{
  "id": "text-firstName",
  "value": "First name"
}
```

The error message would then be `"You have to fill out First name"`.

#### Example: Component with `shortName`
If the field's prompt is long or not suitable for use in the validation message, you can add a `shortName` text that can be used instead.
_Note that this only applies to this specific validation message - the `shortName` text is not used otherwise in the solution as of now._
```json
{
  "id": "firstName",
  "type": "Input",
  "textResourceBindings": {
    "title": "text-firstName",
    "shortName": "firstName-short",
  },
  ... //etc
}
```
With resource texts:

```json
...
{
  "id": "text-firstName",
  "value": "Please type your first name in the field below:"
},
{
  "id": "firstName-short",
  "value": "your first name"
}
```

The error message would then be `"You have to fill out your first name"`.

### Custom error messages
It is possible to define custom error messages that will be displayed when a field doesn't pass the validation check. This is done by including a parameter `errorMessage` where the field is defined in the JSON schema. 
The JSON schema file is in the folder `App/models` and has a naming patterns as follows; `*.schema.json`,

An example of how to extend the example previously presented with a custom error message:

```json  {hl_lines=[4]}
"someField": {
  "type": "string",
  "maxLength": "4",
  "errorMessage": "myCustomError"
}
```

The error text can be included directly. To enable language support, add a text key for a [text defined in the resource files](../../ux/texts).

Notice that if you have a reference to a definition the error message must be added to the `property`-field and not the reference/definition.
Example:
```json {hl_lines=[5]}
{
  "properties": {
    "person": {
        "$ref" : "#/definitions/personDefinition",
        "errorMessage": "myCustomError",
    }
  },
  "definitions": {
    "personDefinition" : {
      "age": {
        "type": "number"
      },
      ...
  }
}
```

{{% notice warning %}}
Note that when the XSD is changed, the custom error messages will de removed from the JSON schema.
In the future, there will be support for setting custom error messages in the data modelling tool in Altinn Studio. But for now, this is a manual job.
{{% /notice %}}

## Server-side validation

Server-side validation can be split into two categories:

- **Validations against data model** - These run automatically whenever the user attempts to submit form data.
- **Custom validations** - these are written by the application developer,
and run when the user attempts to submit form data or move the process to a new step.

## How to add custom validation
Custom validation can also be split into two categories; task-validation and data-validation.
- Task-validation will run each time validation is triggered either manually from the application or when you attempt to move forward in the process.
- Data-validation will run if you're on a step that has defined data elements associated with it.

Validations are written in C#, in the `ValidationHandler.cs`-file in the application template.
The file can be accessed and edited in Altinn Studio through the logic menu, by selecting _Rediger valideringer_,
or directly in the application repo where the file is under the `logic/Validation`-folder.

Changes are made in the `ValidateData` and `ValidateTask`-methods (these are empty when the app is made).
The former takes in a data object and the latter takes in the instance and taskId.
To add a validation error, the `AddModelError`-method of the `validationResult`-object, which is a parameter in both methods, is used.

An example of a simple data validation that tests that the field _FirstName_ does not contain the value _1337_, when the root element of the model is `Skjema` is shown below:

```C# {hl_lines=[12]}
public void ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data.GetType() == typeof(Skjema))
    {
        // Cast instance data to model type
        Skjema model = (Skjema)data;

        // Get value to test - FirstName
        string firstName = Skjema?.Person?.FirstName;

        // Check if FirstName exists, and contains the value "1337"
        if (firstName != null && firstName.Contains("1337"))
        {
            // Add validation error, with error message and list
            // of affected fields (in this case Person.FirstName)
            validationResults.AddModelError(
            "Person.FirstName",
            "Error: First name cannot contain the value '1337'."
            );
        }
    }
}
```

See comments in code above for an expnation of what the different parts do.

In the other parameter of the method `AddModelError`, where it says "_Error: First name cannot contain the value '1337'_", you can use a text key for a [text defined in the resource files](../../ux/texts) for language support. 

An example of a simple task validation that checks how long the user spent on Task_1 and returns an error if there has gone more than three days:

```C# {hl_lines=["5-6"]}
public async Task ValidateTask(Instance instance, string taskId, ModelStateDictionary validationResults)
{
  if (taskId.Equals("Task_1"))
  {
    DateTime deadline = ((DateTime)instance.Created).AddDays(3);
    if (DateTime.UtcNow < deadline)
    {
      validationResults.AddModelError("Task_1", $"Completion of Task_1 has taken too long. Please start over.");
    }
  }
}
```

## Single field validation

If there is a need for immediate validation of a field
that can not be covered in the client side validation,
you can set up a trigger for validation on single fields in `formLayout.json`

```json {hl_lines=[13]}
{
  "data": {
    "layout": [
      {
        "id": "3611fb2a-c06b-4fa7-a400-3f6c1ece64e1",
        "textResourceBindings": {
          "title": "25795.OppgavegiverNavnPreutfyltdatadef25795.Label"
        },
        "dataModelBindings": {
          "simpleBinding": "etatid"
        },
        "type": "Input",
        "triggers": ["validation"] , // <--- Add this field
      },
      {
        "id": "9ec368da-d6a9-4fbd-94d0-b4dfa8891981",
        "type": "Button",
        "textResourceBindings": {
          "title": "Button"
        },
        "dataModelBindings": {},
        "textResourceId": "Standard.Button.Button",
        "customType": "Standard"
      }
    ]
  }
}
```

{{% notice warning %}}
Note that if you define a field to trigger validation on server-side, only the result of this validation will be displayed. E.i.
if there is another client-side validation defined, a possible server-side validation of the field will overrun these. Therefore, you should make sure
to implement all necessary validations on the server-side as well. It is possible to attach multiple error messages to the same field if needed.
{{% /notice %}}

The configuration above will result in your own custom validation in `ValidationHandler.cs` 
being triggered each time the field is updated. If you need to know which field
triggered the validation, this is available in the http-context as a header of the request named _ValidationTriggerField_.

An example of a custom validation where the header value is retrieved is shown below.

```csharp
 public async Task ValidateData(object data, ModelStateDictionary validationResults)
 {
    _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("ValidationTriggerField", out StringValues value);

    if (value.Count > 0 && value[0].Equals("kommune"))
    {
      // Cast instance data to model type
      flyttemelding model = (flyttemelding)data;

      // Get value to test - Kommune
      string kommune = model.kommune;

      if (!kommune.Equals("Oslo"))
      {
          validationResults.AddModelError(value[0], "This is not a valid municipality.");
      }
    }

    await Task.CompletedTask;
 }
```

**NOTE** validation of single fields should be implemented in a way where it is both run on triggers and during general validation.
The example that revolves multiple complex validations show how this can be implemented.

Several things has been done to get this code to run

1. In _ValidationHandler.cs_ `using Microsoft.Extensions.Primitives;` is included at the top of the file to be able to use `StringValues`. 
2. In _App.cs_ `using Microsoft.AspNetCore.Http;` is included at the top of the file to be able to use `IHttpContextAccessor`.
3. In _App.cs_ `IHttpContextAccessor` is dependency injected in the constructor and passed along to ValidationHandler.

```cs {hl_lines=[10, 14]}
public App(
            IAppResources appResourcesService,
            ILogger<App> logger,
            IData dataService,
            IProcess processService,
            IPDF pdfService,
            IProfile profileService,
            IRegister registerService,
            IPrefill prefillService,
            IHttpContextAccessor httpContextAccessor // <--- Add this line
            ) : base(appResourcesService, logger, dataService, processService, pdfService, prefillService)
        {
            _logger = logger;
            _validationHandler = new ValidationHandler(httpContextAccessor);  // <--- Include the new property here
            _calculationHandler = new CalculationHandler();
            _instantiationHandler = new InstantiationHandler(profileService, registerService);
        }
```

If there are multiple complex validations that are time consuming, it is recommended to implement several private methods
to validate these and use ValidationTriggerField to determine which private method is to be run.
You can e.g. use a _switch statement_ to accomplish this.

```cs
public async Task ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data is flyttemelding model)
    {
        _httpContextAccessor.HttpContext.Request.Headers
            .TryGetValue("ValidationTriggerField", out StringValues value);

        string dataField = value.Any() ? value[0] : string.Empty;

        switch (dataField)
        {
            case "kommune":
                ValidateKommune(model, validationResults);
                break;
            case "boaddresse":
                ValidateBoAdresse(model, validationResults);
                break;
            default:
                ValidateKommune(model, validationResults);
                ValidateBoAdresse(model, validationResults);
                break;
        }
    }
}

private void ValidateKommune(flyttemelding model, ModelStateDictionary validationResults)
{
    if (model.kommune != null && !model.kommune.Equals("Oslo"))
    {
        validationResults.AddModelError(
            nameof(model.kommune), 
            "This is not a valid municipality.");
    }
}
private void ValidateBoAdresse(flyttemelding model, ModelStateDictionary validationResults)
{
    if (model.boaddresse != null && model.boaddresse.Length > 150)
    {
        validationResults.AddModelError(
            nameof(model.boaddresse), 
            "Address can not be longer than 150 characters.");
    }
}
```

### Specify that validation errors are fixed
When validation is triggered by a single field, all former validations on this field will be removed pending a response from the last validation.
If a field triggers validation that updates/adds an error message to multiple fields at once, these will not be removed even though there is no longer any
error in these fields. This is because there is no way to know which fields may have been validated through a single field validation.

For example, if you have two fields; first name and last name. Both fields trigger single field validation, and if both fields have a value, you can validate that
the full name can not be longer than 50 characters. An error message is then set on both fields. If you correct this by changing the first name, the error message from first name will
disappear, but the error message on the last name field will still be displayed even though the validation does not set any error messages on the fields.

```C#
private void ValidateFullName(Datamodell model, ModelStateDictionary validationResults)
{
  if (!string.isNullOrEmpty(model.fornavn) && !string.isNullOrEmpty(model.etternavn)
    && model.fornavn.Length + model.etternavn.Length > 50)
  {
    validationResults.addModelError(nameof(model.fornavn),
      "Full name can not be longer than 50 characters.");
    validationResults.addModelError(nameof(model.etternavn),
      "Full name can not be longer than 50 characters.");
  }
}
```

To be able to remove old error messages in a case like this, there has been added support to be able to specify that a validation error has been **fixed**.
Then, the field in question will be able to be notified that a specific error message that it is displaying has been fixed and can now be hidden.

This is done by adding a validation error in the code in the case where there are no errors in the validation,
and set `*FIXED*` in front of the error message itself. This corresponds to the setup for [soft validation](#soft-validations).
This prefix causes the error message that is set to be removed from the field in question, or ignored (if there is no error message on the field already).

You can now expand the example above to support this:

```C# {hl_lines=[14,16]}
private void ValidateFullName(Datamodell model, ModelStateDictionary validationResults)
{
  if (!string.isNullOrEmpty(model.fornavn) && !string.isNullOrEmpty(model.etternavn)
    && model.fornavn.Length + model.etternavn.Length > 50)
  {
    validationResults.addModelError(nameof(model.fornavn),
      "Full name can not be longer than 50 characters.");
    validationResults.addModelError(nameof(model.etternavn),
      "Full name can not be longer than 50 characters.");
  } 
  else
  {
    validationResults.addModelError(nameof(model.fornavn),
      "*FIXED*Full name can not be longer than 50 characters.");
    validationResults.addModelError(nameof(model.etternavn),
      "*FIXED*Full name can not be longer than 50 characters.");
  }
}
```

## Soft validations

Soft validations are validation messages that does not stop the user from submitting or move onto the next step of the process, but that are used to give the user different forms of information.
These types of validations can for example be used to ask the user to verify input that seems wrong or strange, but which strictly speaking is not invalid, or give useful information for further filling out the form.

Messages based on soft validation will be displayed once, but the user can choose to move on without making any changes.

Soft validations are added from the server-side the application logic, in the same way as regular validation errors. The difference is that the validation message
must be prefixed with the type of validation you want to give, e.g. `*WARNING*`. This will be interpreted as a soft validation. The prefix `*WARNING*` will not be displayed for the user.

The different types of soft validations are `WARNING`, `INFO` and `SUCCESS`.

**Code example**

```csharp
public async Task ValidateData(object data, ModelStateDictionary modelState)
{
  if (data is TestModel testModel)
  {
      string firstName = testModel?.Person?.FirstName;
      if (firstName != null && firstName.Contains("1337")) 
      {
        validationResults.AddModelError(
          "Person.FirstName", 
          "*WARNING*Are you sure your first name contains 1337?");
      }

      if (firstName != null && firstname.Contains("Altinn"))
      {
        validationResults.AddModelError(
          "Person.FirstName", 
          "*SUCCESS*Altinn is a great name!");
      }
  }
  
  await Task.CompletedTask;
}
```

Examples on display of different validations below:

!["Information message"](info-message.jpeg "Example on information message (*INFO* - prefix)" )

!["Success message"](success-message.jpeg "Example on success message (*SUCCESS* - prefix)")

!["Warning message"](warning-message.jpeg "Example on warning message (*WARNING* - prefix)" )

It is also possible to overrule the title you see on the messages by adding the keys `soft_validation.info_title`, `soft_validation.warning_title`, and `soft_validation.success_title` in the text resources if you want to set a custom title.

## Group validation

It is possible to apply validations to a repeating group when the user wants to set a custom title.
This can be done by adding a trigger on the group component in the layout file (e.g. `FormLayout.json`). Example:

```json {hl_lines=[14]}
{
  "data": {
    "layout": [
      {
        "id": "demo-gruppe",
        "type": "Group",
        "children": [
            "..."
        ],
        "maxCount": 3,
        "dataModelBindings": {
            "group": "Endringsmelding-grp-9786.OversiktOverEndringene-grp-9788"
        },
        "triggers": ["validation"]  // <--- Add this
      },
      ...
    ]
  }
}
```

This will ensure that validation is run on the components that are a part of the group on the index you're working on.
If there are validation errors you will be stopped from saving the group until this has been corrected.

If you add validation on the group component, a call will be made towards the validation back-end with a header specifying which component triggered the validation: `ComponentId`.
Validations are written in C# in the `ValidationHandler.cs`-file in the application template. In the validation, you can then retrieve this id and tailor possible validations that should run back-end, example:

```cs
public async Task ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data is flyttemelding model))
    {
        _httpContextAccessor.HttpContext.Request.Headers
            .TryGetValue("ComponentId", out StringValues value);

        string component = value.Any() ? value[0] : string.Empty;

        switch (component)
        {
            case "demo-group":
                // run validations specific to the group
                break;
            default:
                // run the validations in their entirety
                break;
        }
    }
}
```

For tips on how you solve complex validations, see the examples under [single field validation](#single-field-validation).
