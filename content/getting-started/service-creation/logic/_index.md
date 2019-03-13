---
title: Service logic
description: Information on how to add/edit and configure service logic
tags: ["guide", "logic"]
weight: 107
---

There are three different categories of logic that can be set up for a service:
- Validations
- Calculations
- Dynamics

These categories are explained in more detail below.

The various files that are used to define logic can be reached by opening the logic menu, accessed from the GUI editor via the _f(x)_-icon on the top right. 

{{<figure src="ui-editor-logic-menu.png?width=300" title="Logic menu">}}

#### Auto-complete/intellisense
C#-files (which are used in calculations and server-side validations) are set up with support for auto-complete for the data model. This means that suggestions for possible fields in the data model are displayed as you type. 

For javascript-files, a full language intellisense is available, which suggests possibilities defined by the javascript language, and shows any syntax errors with a red underline. Intellisense/autocomplete is automatically shown as you type, and can also be reached by the key combination `CTRL + SPACE`.

{{<figure src="datamodel-intellisense.gif?width=700" title="Logic menu - auto-complete/intellisense">}}

### Validations
Validations make sure that the users input is valid with respect to the data model, as well as any custom rules that are set up for the service. Validations can be run _client-side_ (i.e. in the browser) and _server-side_. 

#### Client-side validations
{{%notice info%}}
NOTE: Configuration of client-side validations is currently not available. The documentation will be updated when new functionality is available.
{{% /notice%}}

These validations are run automatically, and validates the users input against restrictions from the data model. The following restrictions are currently supported:

- min value (number)
- max value (number)
- min length
- max length
- length
- pattern

In addition, validation on whether the field is required or not is supported. This is automatically connected to the data model, and no configuration is required.

#### Server-side validation
The validations that are run on the server can be split into two categories:

* Validations against the data model: These are run each time the user saves data. If the data does not validate against the data model, it is not saved. 
* Custom validations for the service: These are written by the service developer, and are run when the user prepares to submit the service (or continue to the next step of the service). They can also be configured to be triggered when a user leaves a specified field in the form. 

##### Adding custom validations 
Validations are written in C# code, in the file `ValidationHandler.cs`. This file can be accessed and edited via the logic menu, by selecting _Rediger valideringer_. Changes are then made in the `Validate`-method (empty method that is created when the service is created).

Form data can be accessed through the data model. An example of a simple validation that checks that a field _FirstName_ does not contain the vaule _1337_ is shown below:

```csharp
public void Validate(TestModel TestModel, RequestContext requestContext, ModelStateDictionary modelState)
{   
    // Validate first name
    ValidateFirstName(TestModel, modelState);
}

private void ValidateFirstName(TestModel TestModel, ModelState modelState)
{
    // First, make sure that the field exists
    string firstName = TestModel?.Person?.FirstName;

    // Check if field contains "1337"
    if (firstName != null && firstName.Contains("1337")) 
    {
        // If the field value contains "1337", add an error message using AddModelError-method.
        // The first argument is the error message key, which should be the data model path (without root node), if possible.
        // The second argument is the error message, which can be either a text, or a text key.
        modelState.AddModelError("Person.FirstName", "First name cannot contain 1337.");
    }
}
```

See the comments in the code above for details on what the different parts of the code do. 

##### Single field validations

If there is a need for immediate validation of a field (that is not covered by client-side validation against data model), it is possible to set up a field to trigger server-side validation. This is done by setting the property `TriggerValidation` to `true` in the component definition in FormLayout.json.

It is then up to the service developer to write the code for validations in such a way that only the relevant errors are returned when a trigger field is specified, while all validations are run f.ex. when the user is ready to submit service. An example of such code is shown below.

```csharp
public void Validate(TestModel TestModel, RequestContext requestContext, ModelStateDictionary modelState)
{
    // Check if a trigger field is specified on the request context.
    // If a trigger field is specified, run validations inside if-block and then stop so that only relevant errors are returned.
    if (requestContext.ValidationTriggerField != null)
    {
        string triggerField = requestContext.ValidationTriggerField;
        // Check which field triggered validation, and run any relevant validations
        if (triggerField == "Person.FirstName")
        {
            ValidateFirstName(TestModel, modelState);
        }

        // Finish here, do not run any further validations
        return;
    }
    
    // If no trigger field is specified, run validations for all fields
    RunAllValidations(TestModel, requestContext, modelState);
}

private void RunAllValidations(TestModel TestModel, RequestContext requestContext, ModelStateDictionary modelState)
{
    // All validations for the form
    ValidateFirstName(TestModel, modelState);
}

private void ValidateFirstName(TestModel TestModel, ModelState modelState)
{
    // Check if field FirstName exists and has value
    string firstName = TestModel?.Person?.FirstName;

    // Check if the field contains "1337"
    if (firstName != null && firstName.Contains("1337")) 
    {
        // If the field value contains "1337", add an error message using AddModelError-method.
        // The first argument is the error message key, which should be the data model path (without root node), if possible.
        // The second argument is the error message, which can be either a text, or a text key.
        modelState.AddModelError("Person.FirstName", "First name cannot contain 1337.");
    }
}
```

#### Soft validations
Soft validations (or warnings) are validation messages that do not stop the user from proceeding to the next step. This validation type can be used for example to ask the user to verify input that might seem strange, but is not technically invalid. Soft validations are set up in the same way as other validations - the only difference is that the validation message must be prefixed by `*WARNING*`. An example is shown below:

```csharp
public void Validate(TestModel TestModel, RequestContext requestContext, ModelStateDictionary modelState)
{   
    // Validate first name
    ValidateFirstName(TestModel, modelState);
}

private void ValidateFirstName(TestModel TestModel, ModelState modelState)
{
    // First, make sure that the field exists
    string firstName = TestModel?.Person?.FirstName;

    // Check if field contains "1337"
    if (firstName != null && firstName.Contains("1337")) 
    {
        // If the field value contains "1337", add an error message using AddModelError-method.
        // The first argument is the error message key, which should be the data model path (without root node), if possible.
        // The second argument is the error message, which can be either a text, or a text key.
        // When adding a soft validation, prefix the error message with *WARNING*
        modelState.AddModelError("Person.FirstName", "*WARNING*Are you sure your first name contains 1337?");
    }
}
```

### Calculations
Calculations are done server-side, and are based on input from the end user. Calculations need to be coded in C# in the file `CalculationHandler.cs`. This file can be edited by clicking _Rediger kalkuleringer_ from the logic menu. 

### Dynamics
Dynamics are events that happen on the client-side. These can include calculations and rules for conditional rendering (ex. hide/show). The actual conditions/methods that are used need to be coded in javascript, in the file `RuleHandler.js` (see below for more details). This file can be reached through the logic menu, by clicking _Rediger dynamikk_. 
Once these conditions/methods are coded, they can be configured to be triggered for specific fields in the form.

#### Add/edit methods for dynamics
The solution currently supports two types of methods:

- Rules for calculation/populating values in form fields
- Conditions for rendering (hide/show) of form fields

These are defined in the file `RuleHandler.js` as separate objects, `ruleHandlerObject` and `conditionalRuleHandlerObject`. In addition there are two corresponding _helper_ objects (`ruleHandlerHelper` and `conditionalRuleHandlerHelper`), that define which parameters should be set up when configuring the methods to trigger. In order for a dynamics method to be available, the actual method/action must be defined in the _object_ and the configuration parameters must be defined in the corresponding _helper_. 

The objects and helpers are all generated automatically with some examples when the service is created, and can be added to or edited to create/change methods.

In the example below, the following methods are defined:

| Method name | Description | Parameters | Defined in object/helper |
| ----------- | ----------- | ---------- | ------------------------ |
| `sum`       | Returns the sum of the 3 provided values | `value1`, `value2`, `value3` | `ruleHandlerObject`/`ruleHandlerHelper`|
| `fullName`  | Returns the full name based on the provided first and last names | `firstName`, `lastName` | `ruleHandlerObject`/`ruleHandlerHelper`|
| `lengthGreaterThan4`| Returns `true` if the provided value's length is greater than 4 | `value` | `conditionalRuleHandlerObject`/`conditionalRuleHandlerHelper`|

```
var ruleHandlerObject = {
  sum: (obj) => {
    obj.value1 = +obj.value1;
    obj.value2 = +obj.value2;
    obj.value3 = +obj.value3;
    return obj.value1 + obj.value2 + obj.value3;
  },

  fullName: (obj) => {
    return obj.firstName + ' ' + obj.lastName;
  }
}
var ruleHandlerHelper = {
  sum: () => {
    return {
      value1: "Value 1",
      value2: "Value 2",
      value3: "Value 3"
    }
  },

  fullName: () => {
    return {
      firstName: "First name",
      lastName: "Last name"
    };
  }
}

var conditionalRuleHandlerObject = {
  lengthBiggerThan4: (obj) => {
    if (obj.value == null) return false;
    return obj.value.length >= 4;
  }
}
var conditionalRuleHandlerHelper = {
  lengthBiggerThan4: () => {
    return {
      value: "value"
    }
  }
}
```

#### Configuring dynamics for form components 
1. Add any form components that are needed. For example, for the method `sum` defined above, 3 input values are required, so 3 form components have to be set up for the input, in addition to 1 field to display the result. 
2. Open the logic menu and select _Legg til tilkobling_ under _Regler_ (for calculation/population rules) or _Betingede redigeringstilkoblinger_ for conditional rendering.
3. Select rule from the list of available rules, ex. `sum` from the example above.
4. Configure the fields that will provide input to the method
  a. For calculation/population rules, use the same data model field as configured on the form component.
  b. For conditional rendering, select the component id from the list
5. Configure the field that will show the output/render conditionally
  a. For calculation/population rules, select the same data model field as configured on the form component that is to show the result.
  b. For conditional rendering, first select the action (hide/show) that will trigger if the selected method returns `true`. Then select the component id that will be conditionally rendered.
6. Save the configuration.
7. Test that it works by entering values in the defined input fields.

Existing configurations are visible in the logic menu, and can be edited/deleted.

#### Example of using dynamics in a form
The scenario:

A service uses a form which has multiple input fields. One of these is a radio button group, with Yes/No options. Depending on the end users response (Yes or No), different content should be shown:

- Yes: A new input field should be shown, together with information on what to fill out in the field.
- No: An information text should be showm.

After creating the form in the GUI editor, the following code is added from the logic menu, under "Rediger dynamikk":

```javascript
var conditionalRuleHandlerObject = {
  sjekkVirksomhetIDrift: (obj) => {
    return (obj.value && obj.value === "Ja");
  },

  sjekkVirksomhetIkkeIDrift: (obj) => {
    return (obj.value && obj.value === "Nei");
  }
}

var conditionalRuleHandlerHelper = {
  sjekkVirksomhetIDrift: () => {
    return {
      value: "Verdi"
    }
  },
  sjekkVirksomhetIkkeIDrift: () => {
    return {
      value: "Verdi"
    }
  }
}
```

Here, two functions are created to check if the a given value is either "Ja" or "Nei". 

After adding this code, the configuration for using the functions is added. Starting with `sjekkVirksomhetIDrift`:

{{<figure src="dynamics-example-config.png?width=700" title="Test of dynamics example">}}

* First, we add the field that will provide the input.
  - This is the data model field that is also mapped to the radio button group we want to trigger the dynamics.
* Then we select the action (show/hide) we want to trigger, and which components we want to be affected
  - Here, we select *show*. This will hide the components until they are triggered to show.
  - We add the text components (header and paragraph for information text) and input component that should be _shown_ when the dynamic is triggered.

Then we do the same for `sjekkVirksomhetIkkeIDrift`. 

Finally, we run a manual test in Altinn Studio to check that everything works as expected. The results are shown in the GIF below. 

{{<figure src="dynamics-test.gif?width=700" title="Test of dynamics example">}}
