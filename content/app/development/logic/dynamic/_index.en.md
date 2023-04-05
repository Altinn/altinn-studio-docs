---
title: Dynamics
description: How to add dynamics?
tags: [dynamics]
toc: true
---

{{% panel theme="warning" %}}
⚠️ Dynamics are under active development. The `RuleHandler.js` file will in the future be replaced by
[dynamic expressions](../expressions). Currently only show/hide dynamics are supported using expressions, but
calculation and validation will be supported in the future.
{{% /panel %}}

## Introduction

Dynamics are events that happen on the client side. These can be separated in two categories:
- Calculations -  do calculations on the client side, and update the fields with new value.
- Show/hide fields - decide if fields should be hidden or displayed based on form values.  

There are two ways to add and change dynamics for an Altinn App:
1. Directly in Altinn Studio under _Lage_-tab. Select _Rediger dynamikk_ in the right menu.
2. In a local development environment by working in the file `RuleHandler.js` which can be found in the `App/ui` folder.

All dynamics are written as JavaScript functions in the _RuleHandler_ file.
Functions that are defined in this file can be configured to run for selected fields in the app.


{{%notice info%}}
The dynamic code to show/hide fields or perform calculations should be set up so that it handles possible errors in the input gracefully.
It should, for instance, handle empty fields or strings where you expect numbers without crashing.
If the dynamic does not work as expected, take a look at the code that defines the dynamic and verify that it handles errors.
{{% /notice%}}

{{% notice warning %}}
NOTE: In order to support dynamics in older browsers the code defined in `RuleHandler.js` must be written in the version of ECMAScript that the given browser supports.
For IE11 this is ECMAScript 5.
{{% /notice %}}

## Add or edit functions for dynamics

There are two JavaScript objects in the file `RuleHandler.js`:

- `ruleHandlerObject` - functions for calculations
- `conditionalRuleHandlerObject` - functions for hiding/showing fields

It is in these objects the functions should be defined. In addition to these there are two _help objects_ (`ruleHandlerHelper` and `conditionalRuleHandlerHelper`), where you configure what input the different functions expect. This is done in order to be able to configure up rules in Altinn Studio at a later point.
To be able to configure dynamics in studio the functions must be defined in the JavaScript objects (`ruleHandlerObject` or `conditionalRuleHandlerObject`), and the parameters they expect in the corresponding helper object.

The structure of the help object:

```javascript
var ruleHandlerHelper = {
  <name_of_rule>: () => {
    return {
      <input_param>: "<description>",
      <input_param>: "<description>",
      <input_param>: "<description>"
      ...
    };
  }
}
```

The structure of objects containing the javascript functions: 

```javascript
var ruleHandlerObject = {
  <name_of_rule>: (<input_variable_name>) => {
    // Do something here
    // Values from input parameters defined in 
    // helper can be accessed through the object passed
    // into the rule, f.ex.
    // <input_variable_name>.<input_param>
  }
}
```

For instance, to create a rule that calculates the sum of two numbers (calculation) the following code is needed: 

```javascript
var ruleHandlerHelper = {
  sum: () => {
    return {
      field1: "Field 1 in sum",
      field2: "Field 2 in sum"
    };
  }
}

var ruleHandlerObject = {
  sum: (data) => {
    // Check if data is available
    if (!data) return;

    // Check if value from input fields are available
    // If not, use value 0 in sum
    data.field1 = data.field1 ? data.field1 : 0;
    data.field2 = data.field2 ? data.field2 : 0;

    // return the sum
    return data.field1 + data.field2;
  }
}
```

Some default methods for calculations, with help objects, are defined as part of the app template. 

| Method name          | Description                                                                | Parameters              | Defined in object/helper                                      |
| -------------------- | -------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------- |
| `sum`                | Returns the sum of two values                                              | `value1`, `value2`      | `ruleHandlerObject`/`ruleHandlerHelper`                       |
| `fullName`           | Combines two strings (first name and last name) separated with a space.    | `firstName`, `lastName` | `ruleHandlerObject`/`ruleHandlerHelper`                       |
| `lengthGreaterThan4` | Returns `true` if the value is longer than 4 chars long.                   | `value`                 | `conditionalRuleHandlerObject`/`conditionalRuleHandlerHelper` |


 Dynamics are run if a change has occurred in the input fields connected to the rule. The functions have to handle cases where for instance only one of the two parameters have defined values.

An example of how this could be done is shown in the `sum`-function below, where missing values are corrected to the value `0`.


```javascript
var ruleHandlerObject = {
  sum: (obj) => {
    obj.value1 = obj.value1 ? +obj.value1 : 0;
    obj.value2 = obj.value2 ? +obj.value2 : 0;
    return obj.value1 + obj.value2;
  },

  fullName: (obj) => {
    return obj.firstName + ' ' + obj.lastName;
  }
}
var ruleHandlerHelper = {
  sum: () => {
    return {
      value1: "Value 1",
      value2: "Value 2"
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

## Configure dynamics for UI components

1. Add the relevant UI components to the layout.
2. In the right menu, select _Regler for beregninger_ or _Regler for vis/skjul felt_.
   ![Rules for hiding/showing fields](rules-show-hide.png)
3. Select the wanted rule. Or add a function, as described in the sections above. ![Select a rule](rules-select-rule.png)
4. Configure which field(s) that should be used as _input_ for the function - this is fields in the data model. 
    ![Configure dynamics](rules-configure.png)
5. Select which component(s) that should be affected by the rule (recieve value or be shown/hidden) - this is components in the layout.
     - For rules for hiding/showing elements several fields can be selected for the same rule.
6. Save the configuration.
7. Test that the rules works as expected.

Existing configured rules is shown in the right menu, and can be edited/deleted.

The configuration can also be seen in the file `App/ui/RuleConfiguration.json`. This can be manually edited if necessary.

## Example usage of dynamics on an app

Scenario:

An app with a UI with several fields for input. One of these fields is a radio button with the options "Yes" and "No".
Depending on what the user selects, different content is to be displayed:
- Yes: a new input field is shown, together with information on what is to be filled in.
- No: a different information text is shown.

This can be solved by adding the following in `RuleHandler.js`, either through _Rediger dynamikk_ in Altinn Studio, or by manually editing the source code.

```javascript
var conditionalRuleHandlerObject = {
  sjekkVirksomhetIDrift: (obj) => {
    return (obj.value && obj.value === "Yes");
  },

  sjekkVirksomhetIkkeIDrift: (obj) => {
    return (!obj.value || obj.value != "Yes");
  }
}

var conditionalRuleHandlerHelper = {
  sjekkVirksomhetIDrift: () => {
    return {
      value: "value"
    }
  },
  sjekkVirksomhetIkkeIDrift: () => {
    return {
      value: "value"
    }
  }
}
```

Here, two functions have been added which checks if the value is "Yes" or not.
After this code is added, the rules can be configured in studio. The results are displayed below:

![Test of dynamics screenshot](dynamics-test.gif "Test of dynamics example")

## Dynamics in repeating groups 

It is also possible to add dynamics within a repeating group. This requires that the rule is configured in Altinn Studio as 
usual, and then manually doing some extra configuration in the `App/ui/RuleConfiguration.json` file as described below.

- For each `inputParams`, one needs to add `{0}` after the  _group part_ of the data binding. For instance `model.group{0}.field`. The index indicator will be replaced by the index for each relevant field in the repeating group.
- For each `selectedFields` (the fields affected by the rule), one needs to add `{0}` after the field id, for instance `layoutComponent{0}`
- A new property must also be added to the rule, `repeatingGroup`. This object must contain the id of the relevant group in the layout file.

An example of a rule that is configured for a repeating group:

```json {hl_lines=[8,12-13,15-17]}
{
  "data": {
    "ruleConnection": {},
    "conditionalRendering": {
      "9f9f2a50-360b-11ea-b69a-8510e2e248b9": {
        "selectedFunction": "lengthBiggerThan4",
        "inputParams": {
          "value": "model.group{0}.field"
        },
        "selectedAction": "Show",
        "selectedFields": {
          "first": "some-field{0}",
          "second": "some-other-field{0}"
        },
        "repeatingGroup": {
          "groupId": "the-group-id",
        }
      }
    }
  }
}
```

### Nested repeating groups 

It is also possible to add dynamics for nested repeating groups. The configuration resembles that of repeating group, but a second parameter `childGroupId` is added in the `repeatingGroup`object, as well as an extra index indicator.

Example: 

```json {hl_lines=[8,12,14,15,16]}
{
    "data": {
        "ruleConnection": {},
        "conditionalRendering": {
            "hide-nested-group-field": {
                "selectedFunction": "shouldHide",
                "inputParams": {
                    "value": "someGroup{0}.nestedGroup{1}.someField"
                },
                "selectedAction": "Hide",
                "selectedFields": {
                    "field": "the-component-id{0}{1}"
                },
                "repeatingGroup": {
                    "groupId": "mainGroup",
                    "childGroupId": "subGroup"
                }
            }
        }
    }
}
```

## Example with more complex dynamics 

Scenario:
An app has two sets of radiobuttons (yes/no) and a checkbox.

- When the app is loaded, only the fist set of radiobuttons are visible.
- If the user selects `Yes`, the second set of radiobuttons are shown.
  - If the user selects `Yes` in the second choice, the checkbox is shown.
  - If the user goes back to the first set of radiobuttons and selects `No`, both the second set of radiobuttons and the checkbox is hidden.

### Alternative 1
This can be solved by configuring two different conditions for when the fields should be displayed:

- One condition for the second set of radiobuttons
  - Is shown if `Yes` is selected in the first set
- One condition for the checkbox
  - Is shown when `Yes` is selected in both sets of radiobuttons.

Example code that can solve this case:

```javascript
var conditionalRuleHandlerObject = {
  showField2: (obj) => {
    if (obj && obj.field1 && obj.field1=== "yes") {
      return true;
    }
    return false;
  },

  showField3: (obj) => {
    if (obj && obj.field1 && obj.field1 === "yes"
      && obj.field2 && obj.field2 === "yes") {
        return true;
    }
    return false;
  }
}

var conditionalRuleHandlerHelper = {
  showField2: () => {
    return {
      field1: "Field 1"
    };
  },

  showField3: () => {
    return {
      field1: "Field 1",
      field2: "Field 2"
    };
  }
}
```

### Alternative 2

This can also be configured by using the same condition to show both the second set of radiobuttons and the checkbox.
In addition a rule that removes the value from the second set of radiobuttons if the user selects `No` in the first set:

```javascript
var ruleHandlerObject = {
  clearField: (obj) => {
    if (obj && obj.checkValue === "no") {
      return "";
    }
    return obj.currentValue;
  }
}

var ruleHandlerHelper = {
  clearField: () =>  {
    return {
      checkValue: "check against this value",
      currentValue: "the current value"
    }
  }
}

var conditionalRuleHandlerObject = {
  showField: (obj) => {
    if (obj && obj.checkField && obj.checkField === "yes") {
      return true;
    }
    return false;
  }
}

var conditionalRuleHandlerHelper = {
  showField: () => {
    return {
      checkField: "check against this value"
    };
  }
}
```


## Dynamics in PDF

From nuget versions 3.0.0 it is also possible to add dynamics for the PDF. This is done in the PDF Handler.
The application must include the `layout/ui/Settings.json` file defined [here](../../../../app/development/ux/pages/navigation/#order).

Configuring dynamics in PDF is similar to how validations are added on the server side.

The example below hides a field based on if the string `some-value` exists in a given field.
Here the code hides the component with the id `079f205b-c9ea-414d-9983-0d158e833e8a`. The id is reflected in the layout files.

```C#
        public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
        {
            if (data is Skjema)
            {
                Skjema skjema = (Skjema)data;

                if (skjema?.Innledninggrp9342?.Kontaktinformasjongrp9344?.KontaktpersonNavndatadef2?.value.Contains("some-value") == true)
                {
                    layoutSettings.Components = new Components();
                    layoutSettings.Components.ExcludeFromPdf = new System.Collections.Generic.List<string>();
                    layoutSettings.Components.ExcludeFromPdf.Add("079f205b-c9ea-414d-9983-0d158e833e8a");
                }
            }
            
            return await Task.FromResult(layoutSettings);
        }
        ```
