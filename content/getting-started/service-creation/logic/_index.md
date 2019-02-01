---
title: Service logic
description: Information on how to add/edit and configure service logic
tags: ["guide", "logic"]
weight: 107
---

### Logic
There are three different categories of logic that can be set up for a service:
- Validations
- Calculations
- Dynamics

These categories are explained in more detail below.

The various files that are used to define logic can be reached by opening the logic menu, accessed from the GUI editor via the _f(x)_-icon on the top right. 

{{<figure src="ui-editor-logic-menu.png?width=300" title="Logic menu">}}

##### Auto-complete/intellisense
C#-files (which are used in calculations and server-side validations) are set up with support for auto-complete for the data model. This means that suggestions for possible fields in the data model are displayed as you type. 

For javascript-files, a full language intellisense is available, which suggests possibilities defined by the javascript language, and shows any syntax errors with a red underline. Intellisense/autocomplete is automatically shown as you type, and can also be reached by the key combination `CTRL + SPACE`.

{{<figure src="datamodel-intellisense.gif?width=700" title="Logic menu - auto-complete/intellisense">}}

#### Validations
Validations make sure that the users input is valid with respect to the data model, as well as any custom rules that are set up for the service. Validations can be run _client-side_ (i.e. in the browser) and _server-side_. 

{{%notice info%}}
NOTE: Currently, the solution is set up to run basic validations against the data model on the _client-side_. It is also possible to implement validations on the server-side, by writing code. Configuration of client-side validations, as well as displaying any validation results from the server-side is functionality that is currently being developed. The documentation will be updated when new functionality is available.
{{% /notice%}}

##### Client-side validations
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

In addition, validation on whether the field is required or not is supported, but this is currently not connected to the data model and needs to be set manually for the component via the FormLayout.json file. 

##### Server-side validations
{{%notice info%}}
NOTE: Displaying any validation results from the server-side, and configuring when it should be run is functionality that is currently being developed. The documentation will be updated when new functionality is available.
{{% /notice%}}

Server side validations are set up to run when the user submits data. The submitted data is automatically validated against the data model on the server, and if the data is not valid, an error is returned. In addition, it is possible to configure custom validations for the service. This is done by coding the validations in C#, in the file `ValidationHandler.cs`. 

#### Calculations
Calculations are done server-side, and are based on input from the end user. Calculations need to be coded in C# in the file `CalculationHandler.cs`. This file can be edited by clicking _Rediger kalkuleringer_ from the logic menu. 

#### Dynamics
Dynamics are events that happen on the client-side. These can include calculations and rules for conditional rendering (ex. hide/show). The actual conditions/methods that are used need to be coded in javascript, in the file `RuleHandler.js` (see below for more details). This file can be reached through the logic menu, by clicking _Rediger dynamikk_. 
Once these conditions/methods are coded, they can be configured to be triggered for specific fields in the form.

##### Add/edit methods for dynamics
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

##### Configuring dynamics for form components 
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
