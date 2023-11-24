---
title: Dynamic expressions
linktitle: Expressions
description: Overview of dynamic expressions defined in JSON
tags: [dynamics, translate-to-english]
toc: true
---

{{% panel theme="warning" %}}
⚠️ Dynamic behaviour is an area under active development. This functionality is currently available as a beta feature in
Altinn Studio and offers limited configuration options. The UI only allows to build expressions with one level of
nesting, meaning an unlimited number of un-nested expressions can be combined using either the *OR* or *AND* operator.
However, the tool allows to edit more complicated expressions by freestyle writing. Currently the tool is also limited
to connecting expression to boolean component fields.
See [Expressions in Altinn Studio](../../../../altinn-studio/designer/build-app/expressions) on how to use Altinn Studio
to configure an expression.
{{% /panel %}}

## Introduction

Dynamic expressions enable the definition of simple dynamic behavior in an Altinn 3 app, such as defining whether a form
field should be shown or hidden, whether the field should be required or read-only.

These expressions are available in all Altinn 3 apps that use frontend version
[3.54.0](https://github.com/Altinn/app-frontend-react/releases/tag/v3.54.0) or later. By using this version or the 
latest major version, you can use dynamic expressions for [several use cases](#use-cases).

Starting from version `7.2.0` of the [nuget packages](../../../maintainance/dependencies#nuget) the expressions are also
supported in the backend. This means that the server will be able to evaluate the expressions and remove data upon
submission that is potentially stored in the [data model](../../data/data-model) /*9+and is associated with 
fields/components that are later hidden. Note that this only applies to data in the data model that is associated with 
hidden components - data in the data model that is not associated with components (and is thus implicitly hidden from
the user) will not be automatically removed.

It also makes it possible to omit submitting data that is otherwise associated with required fields - if these required 
fields are hidden in the form using dynamic expressions. This also applies when submitting directly from the API.

**Note:** Note that automatic removal of hidden data must currently be manually activated (opt-in) by adding the following
line to `App/appsettings.json` after upgrading the [nuget packages](../../../maintainance/dependencies#nuget)
to `7.2.0` or later:

```json {linenos=false,hl_lines=[5]}
  "AppSettings": {
    "OpenIdWellKnownEndpoint": "http://localhost:5101/authentication/api/v1/openid/",
    "RuntimeCookieName": "AltinnStudioRuntime",
    "RegisterEventsWithEventsComponent": false,
    "RemoveHiddenDataPreview": true
  },
```

### Structure and syntax

Structure and syntax:

The expressions are built up as a kind of mini-programming language, where everything is defined in JSON. The 
expressions themselves are always a list (array) of values, where the first value in each list is always a 
[function name](#functions). The rest of the values are sent as input/arguments to the function.

```json
["equals", "foo", "bar"]
```

In the example above, the strings "foo" and "bar" are compared. They are different, so the result of this expression is
a boolean value; false.

This function, [equals](#func-equals), expects to receive two [strings](#strings) as input/arguments. It is also 
possible to give it another expression as the second argument. If you do this, the expression will be interpreted so that
the innermost functions are executed first, and the outermost ones are executed last

```json
["equals", ["component", "firstName"], "John"]
```

In this example, the innermost expression/function call ["component", "firstName"] is executed first. If the value of 
the "firstName" component is equal to the string "John", the function returns the boolean value "true".

If you then use this expression for the `hidden` property of a component, the component will be hidden if you enter "John"
in the "firstName" component elsewhere in the application:

```json
{
  "id": "lastName",
  "type": "Input",
  ...
  "hidden": ["equals", ["component", "firstName"], "John"]
}
```json

There are no limitations on how large/deep the expressions can be. As an exercise, see if you can read what this 
expression does, and what possible values it can return:
```json
[
  "if",
  ["greaterThanEq", ["component", "age"], 16],
  [
    "if",
    ["lessThan", ["component", "age"], 62],
    "Please consider applying for our open position!",
    "else",
    ["concat", "At ", ["component", "age"], ", you are eligible for retirement"]
  ],
  "else",
  ["concat", "At ", ["component", "age"], ", you should stay in (pre)school"]
]
```

{{% expandlarge id="answer-expandable" header="Spoiler Alert: Click here for an interpretation of the above expression" %}}
The expression checks the value of a hypothetical component with ID "age". If the person is 16 years
or older, for example 45 years old, the text "Please consider applying for our open position!" is returned if the age is 
less than 62. Otherwise, the text "At 45, you are eligible for retirement" is returned. If the person is younger than 
16, the text "At 5, you should stay in (pre)school" is returned, assuming the age is 5.

**Please consider applying for our open position!**

For a person who is 62 years old, the text returned is:

**At 62, your are eligible for retirement**

And for a person who is 15 years old (or younger, such as a 4-year-old), the text returned is:

**At 4, you should stay in (pre)school**
{{% /expandlarge %}}

---  
### Use Cases  
  
Dynamic expressions are currently available for use in these properties, as defined in [layout files](../../ux/pages).  
  
| Components                                                | Property                      | Expected Value             | Frontend | Backend |  
| --------------------------------------------------------- | ----------------------------- | -------------------------- | -------- | ------- |  
| [Pages/layouts](#showhide-entire-pages)                   | `hidden`                      | [Boolean](#boolean-values) | ✅       | ✅      |  
| All                                                       | `hidden`                      | [Boolean](#boolean-values) | ✅       | ✅      |  
| Form components                                           | `required`                    | [Boolean](#boolean-values) | ✅       | ✅      |  
| Form components                                           | `readOnly`                    | [Boolean](#boolean-values) | ✅       | ❌      |  
| [Repeating groups](../../ux/fields/grouping/repeating)    | `hiddenRow`                   | [Boolean](#boolean-values) | ✅       | ❌      |  
| [Repeating groups](../../ux/fields/grouping/repeating)    | `edit.addButton`              | [Boolean](#boolean-values) | ✅       | ❌      |  
| [Repeating groups](../../ux/fields/grouping/repeating)    | `edit.saveButton`             | [Boolean](#boolean-values) | ✅       | ❌      |  
| [Repeating groups](../../ux/fields/grouping/repeating)    | `edit.deleteButton`           | [Boolean](#boolean-values) | ✅       | ❌      |  
| [Repeating groups](../../ux/fields/grouping/repeating)    | `edit.alertOnDelete`          | [Boolean](#boolean-values) | ✅       | ❌      |  
| [Repeating groups](../../ux/fields/grouping/repeating)    | `edit.saveAndNextButton`      | [Boolean](#boolean-values) | ✅       | ❌      |  
| All                                                       | `textResourceBindings.[*]` \* | [String](#strings)         | ✅       | ❌      |                                                   

\* = The values that can be overridden with textResourceBindings vary from component to component, but will work wherever
used. For repeating groups, you can find [more information here](../../ux/fields/grouping/repeating#textresourcebindings)  
  
{{% expandlarge id="rep-group-edit-button-text" header="Example: Change repeating group edit button text" %}}  

Here we change the text of the edit button in a repeating group based on whether `IsPrefill` is set to `true` in a given
address in the data model. If `IsPrefill` is `true` for an address, the row displaying that address will have an edit 
button with the text `"View"`. If `IsPrefill` is `false`, the button text will be `"Edit"` for that specific row. 

It is worth to mention that if a lookup on `IsPrefill` returns `null` (not found), the result is converted to `false` 
when used in an `if`. Read more about this in the sections on [if](#func-if) and [data types](#data-types)  
```json
{
  "id": "repeatingAddressGroup",
  "type": "Group",
  "children": ["field-id-one", "field-id-two"],
  "dataModelBindings": {
    "group": "Citizen.FormerAdresses"
  },
  "maxCount": 10,
  "textResourceBindings": {
    "edit_button_open": [
      "if",
      ["dataModel", "Citizen.FormerAdresses.IsPrefill"],
      "View",
      "else",
      "Edit"
    ]
  }
}
```

{{% /expandlarge %}}

### Testing, feilsøking og utvikling av uttrykk

### Testing, Debugging, and Developing Expressions  
  
When writing an expression, it's useful to have an idea of what the result will be and whether the expression is valid. 
Invalid expressions will give a warning in the JavaScript console in the browser when the page loads, so it's a good 
idea to have this console open when developing an application and testing expressions locally.  
  
It's also possible to test the execution of an expression directly in the developer tools. This is done by pressing
`Ctrl + Shift + K` (or `Cmd + Shift + K` on Mac) and navigating to the expression tab. Expressions may behave differently
depending on the component they are evaluated near. Therefore, you can also select a component to be used as context when
evaluating the expression in the developer tools.

{{% expandlarge id="rep-group-expandable" header="Example of IDs and Evaluation in Repeating Groups" %}}  
  
**Note:** This describes some implementation details in 
[app-frontend-react](https://github.com/Altinn/app-frontend-react/) and is only relevant when testing an expression in 
the developer tools that depends on a known position in a repeating group. This may change in the future, and such 
changes will not affect expressions defined in an application. The context is retrieved from where the expression is 
defined in the layout file.  

Imagine a [repeating group](../../ux/fields/grouping/repeating) for people with two fields: `name` and `age`. Given the 
following expression:  
  
`["component", "age"]`

What will the age be? It may vary depending on which group evaluates the expression. If there are two groups/rows, both 
the `name` and `age` components will exist twice. These will have IDs `name-0` and `age-0` (for the first row) and 
`name-1` and `age-1` (for the second row).  

Imagine the following data is filled in a repeating group:  
  
| Name | Component ID | Age | Component ID |  
| ---- | ------------ | --- | ------------ |  
| Per  | `name-0`     | 24  | `age-0`      |  
| Kari | `name-1`     | 36  | `age-1`      |  
| Ola  | `name-2`     | 18  | `age-2`      |  
  
Given the following expression: 

```json
["component", "age"]
```

And with these assumptions:  
  
1. No context has been given (or the expression is placed on a component that is not near an `age` component)  
2. The expression is evaluated in the context of `name-0`  
3. The expression is evaluated in the context of `name-1`  
  
What will the result be in the different examples? Here are the answers:  
  
1. This will find the "first and best" `age` component and thus find `age-0`. It therefore returns _24_, Per's age.  
2. Here, we try to search in the context of the `name` component on the first row, and again we find _24_, Per's age.  
3. In the last example, we have specified the second row in the repeating group by evaluating in the context of `name-1`. 
Here we find the closest `age` component `age-1`, which is _36_, Kari's age.  
  
{{% /expandlarge %}} 

## Functions

These functions are available for use in expressions:

| Function Name                                 | Parameters                                         | Return Value                         | Frontend | Backend |  
| --------------------------------------------- | -------------------------------------------------- | ------------------------------------ | -------- | ------- |  
| [`equals`](#func-equals)                      | [String](#strings), [String](#strings)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`notEquals`](#func-equals)                   | [String](#strings), [String](#strings)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`not`](#func-not)                            | [Boolean](#boolean-values)                         | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`greaterThan`](#func-gt)                     | [Number](#numbers), [Number](#numbers)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`greaterThanEq`](#func-gt)                   | [Number](#numbers), [Number](#numbers)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`lessThan`](#func-gt)                        | [Number](#numbers), [Number](#numbers)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`lessThanEq`](#func-gt)                      | [Number](#numbers), [Number](#numbers)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`concat`](#func-concat)                      | None or multiple [strings](#strings)               | [String](#strings)                   | ✅       | ✅      |  
| [`and`](#func-and)                            | One or more [boolean values](#boolean-values)      | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`or`](#func-and)                             | One or more [boolean values](#boolean-values)      | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`if`](#func-if)                              | [See detailed description](#func-if)               | [See detailed description](#func-if) | ✅       | ✅      |  
| [`contains`](#func-contains-not-contains)     | [String](#strings), [String](#strings)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`notContains`](#func-contains-not-contains)  | [String](#strings), [String](#strings)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`commaContains`](#func-commaContains)        | [String](#strings), [String](#strings)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`startsWith`](#func-starts-ends-with)        | [String](#strings), [String](#strings)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`endsWith`](#func-starts-ends-with)          | [String](#strings), [String](#strings)             | [Boolean](#boolean-values)           | ✅       | ✅      |  
| [`lowerCase`](#func-lowerCase-upperCase)      | [String](#strings)                                 | [String](#strings)                   | ✅       | ✅      |  
| [`upperCase`](#func-lowerCase-upperCase)      | [String](#strings)                                 | [String](#strings)                   | ✅       | ✅      |  
| [`stringLength`](#func-stringLength)          | [String](#strings)                                 | [Number](#numbers)                   | ✅       | ✅      |  
| [`text`](#func-text)                          | [String](#strings)                                 | [String](#strings)                   | ✅       | ❌      |  
| [`language`](#func-language)                  | None                                               | [String](#strings)                   | ✅       | ❌      |  
| [`displayValue`](#func-displayValue)          | [String](#strings)                                 | [String](#strings)                   | ✅       | ❌      |  
| [`round`](#func-round)                        | [Number](#numbers), optional [Number](#numbers)    | [String](#strings)                   | ✅       | ✅      |  
| [`instanceContext`](#func-instancecontext)    | [String](#strings)                                 | [String](#strings)                   | ✅       | ✅      |  
| [`frontendSettings`](#func-frontendsettings)  | [String](#strings)                                 | [String](#strings)                   | ✅       | ✅      |  
| [`dataModel`](#func-datamodel)                | [String](#strings)                                 | [String](#strings)                   | ✅       | ✅      |  
| [`component`](#func-component)                | [String](#strings)                                 | [String](#strings)                   | ✅       | ✅      |  

Detailed descriptions and examples

{{% expandlarge id="func-equals" header="equals / notEquals" %}}
These two functions compare two strings to check if they are equal (equals) or not equal (notEquals). If you send in 
values other than strings, the values are converted and compared as strings (read more about conversion here).

Examples:

```json
{
  "id": "lastName",
  "type": "Input",
  ...
  "hidden": ["equals",
    ["dataModel", "My.Model.FirstName"],
    "Ola"
  ],
  "readOnly": ["notEquals",
    ["frontendSettings", "FormIsEditable"],
    true
  ]
}
```

`notEquals` is essentially the same as, and a shortcut to, `["not", ["equals", ...]]`.

See also tips and tricks under [_String or less string comparison?_](#string-or-smaller-string-comparison)
{{% /expandlarge %}}

{{% expandlarge id="func-not" header="not" %}}
This function takes in a [boolean value](#boolean-values) or something that can be converted to a boolean value and 
returns the opposite boolean value. True becomes false, false becomes true.


The function can be useful if you want to _invert_ an expression. Instead of thinking about writing an expression that
_hides_ a component given certain conditions, you can wrap the expression in `not` and write the expression based on what
is needed to _show_ the component:


```json
{
  "id": "lastName",
  "type": "Input",
  "hidden": [
    "not",
    ["or", ["dataModel", "ShowLastName"], ["frontendSettings", "ShowAllFields"]]
  ]
}
```

{{% /expandlarge %}}

{{% expandlarge id="func-gt" header="greaterThan / greaterThanEq / lessThan / lessThanEq" %}}
These 4 functions expect two input numbers and compare whether _the first_ is compared with _the second_. That is, for 
the function `greaterThan`, the expression is true if the first number is _greater than_ the second.

| Function        | Description                                                     | Symbol |
| --------------- | --------------------------------------------------------------- | ------ |
| `greaterThan`   | Is the first number _greater than_ the second number?            | \>     |
| `greaterThanEq` | Is the first number _greater than or equal to_ the second number? | ≥      |
| `lessThan`      | Is the first number _less than_ the second number?               | \<     |
| `lessThanEq`    | Is the first number _less than or equal to_ the second number?   | ≤      |

If any of the arguments to these functions are [`null`](#null), the result will be `false` (regardless of whether it is
the first or second argument).

Example checking if age is over (or equal to) 18:

```json
["greaterThanEq", ["component", "alder"], 18]
```

{{% /expandlarge %}}

{{% expandlarge id="func-concat" header="concat" %}}
This function takes 0 or more strings as arguments and returns a string where all the strings in the arguments are 
concatenated. If the function is called without any arguments, it returns an empty string.

Note that the function doesn't automatically add spaces or commas when concatenating strings. To provide a more readable
result, it's recommended to add dashes where necessary:

```json
["concat", "Congratulations on your ", ["component", "age"], "-birthday!"]
```

The expression above gives the text Congratulations on your 18th-birthday! if the value in the age component was 18.

In the `concat`-function, [`null`](#null)-values are interpreted as empty strings. [Boolean values](#boolean-values) 
are output as the strings "true" and "false".
{{% /expandlarge %}}

{{% expandlarge id="func-and" header="and / or" %}}
The functions `and` and `or` expect 1 or more boolean values and produce a result based on whether **all** or 
**at least one** of the values were true (`true`).

| Function | Description                                      |
| -------- | ------------------------------------------------ |
| `and`    | Are **all** the arguments true? (`true`)         |
| `or`     | Is **at least one** of the arguments true? (`true`) |

Providing [`null`](#null) values will interpret them as false (`false`). Examples of usage can be found under
[_String or smaller string comparison?_](#string-or-smaller-string-comparison)
{{% /expandlarge %}}

{{% expandlarge id="func-if" header="if" %}}
The `if` function can be used to branch an expression so that the return value is controlled by the result of another 
boolean expression. The function can be called in two different ways: with 2 or 4 arguments:

| Argument        | Alternative 1                 | Alternative 2                 |
| --------------- | ---------------------------- | ---------------------------- |
| First argument  | [Boolean](#boolean-values)    | [Boolean](#boolean-values)    |
| Second argument | [Any type](#data-types)       | [Any type](#data-types)       |
| Third argument  |                              | The string `"else"`           |
| Fourth argument |                              | [Any type](#data-types)       |


In **alternative 1**, the return value of the function will be the value given as the second argument 
_if the first argument is true (`true`)_. If not, it returns the value `null`.

In **alternative 2**, the return value of the function will be the value given as the second argument 
_if the first argument is true (`true`)_. If not, it returns the value given in the fourth argument. You **must always** 
provide the string `"else"` as the third argument if you want to call the function with 4 arguments. The third argument 
is only there to make the expression more readable and serves no other function.

If you want more conditions and possible return values, you can nest multiple `if` calls inside the second or fourth argument:

```json
[
  "if",
  ["greaterThan", ["component", "birthYear"], 1945],
  "You were born after the World Wars",
  "else",
  [
    "if",
    ["greaterThanEq", ["component", "birthYear"], 1939],
    "You were born during World War II",
    "else",
    "You were born before World War II"
  ]
]
```

{{% /expandlarge %}}

{{% expandlarge id="func-language" header="language" %}}
The function `language` returns the user's selected language code.

Example:

```json
{
   "id": "lastName",
   "type": "Input",
   ...
   "readOnly": ["equal", ["language"], "en"],
}
```

If the current language is unknown, `nb` will be returned, which is the default language for Altinn 3 apps. 
Therefore, you can be confident that this function always returns a valid language.

**Note:** This function is not yet available in backend code. Consequently, it will generate an error message if used in
places [where expressions run on the backend](#use-cases), and if the functionality to automatically delete hidden data
(`RemoveHiddenDataPreview`) has been enabled.

{{% /expandlarge %}}

{{% expandlarge id="func-starts-ends-with" header="startsWith/endsWith" %}}
The `startsWith` function checks if the string provided as the first argument starts with the string given in the second 
argument. Similarly, the `endsWith` function checks if the first string ends with the second string.


```json
["startsWith", ["dataModel", "My.Model.FirstName"], "Jo"]
```

```json
["endsWith", ["dataModel", "My.Model.FirstName"], "hn"]
```

Some important details about these functions:

- All functions start and end with an empty string, so `startsWith` and `endsWith` will always return `true` if using an 
expression like `["startsWith", "...", ""]`. This is crucial to consider when using the value of a component or a lookup 
in the data model as the second argument.
- No strings start or end with a `null` value. If an expression like this is used:
  ```json
  [
    "startsWith",
    ["dataModel", "My.Model.FullName"],
    ["dataModel", "My.Model.FirstName"]
  ]
  ```
 the result will always be `false` as long as the first name is not provided. However, as mentioned earlier, if the first 
 name is set to an empty string (for example, if the user has erased their first name), the expression will return `true` 
 if a full name is set. To avoid some of this behavior, you can use the `if` function together with `equals` to check if 
 something is set to an empty string.
- `["startsWith", null, null]` always returns `false`.

**Note:** hese functions are not yet available in backend code. Therefore, they will generate an error message if used 
in places [where expressions run on the backend](#use-cases), og om man har slått på funksjonaliteten for å
automatisk slette skjulte data (`RemoveHiddenDataPreview`).

{{% /expandlarge %}}

{{% expandlarge id="func-stringLength" header="stringLength" %}}
The function `stringLength` returns the length of a string (in number of letters/characters), including spaces.

Example:

```json
["stringLength", ["dataModel", "My.Model.FirstName"]]
```

If the string is `null`, `stringLength` will return 0.

**Note:** This function is not yet available in backend code. Therefore, it will generate an error message if used in 
places [where expressions run on the backend](#use-cases), and if the functionality to automatically delete hidden data
 (`RemoveHiddenDataPreview`) has been enabled.

{{% /expandlarge %}}

{{% expandlarge id="func-contains-not-contains" header="contains / notContains" %}}
These two functions check whether string A includes or does not include string B.
Both `contains` and `notContains` are case-sensitive. This means that the string "Hei" does not include "hei". If you 
want to compare regardless of case, you can use the functions [`lowerCase` or `upperCase`](#func-lowerCase-upperCase) 
along with `contains` or `notContains`.

Example:

```json
{
   "id": "lastName",
   "type": "Input",
   ...
   "hidden": [
      "contains",
      ["dataModel", "My.Model.FirstName"],
      "J"
   ],
   "readOnly": [
      "notContains",
      ["dataModel", "My.Model.FirstName"],
      "D"
   ]
}
```

If you want to check for values in a comma-separated list, you can use the function [`commaContains`](#func-commaContains).

**Note:** These functions are not yet available in backend code. Therefore, they will generate an error message if used 
in places [where expressions run on the backend](#use-cases), and if the functionality to automatically delete hidden 
data (`RemoveHiddenDataPreview`) has been enabled.

{{% /expandlarge %}}

{{% expandlarge id="func-commaContains" header="commaContains" %}}
The function `commaContains` takes two arguments. The first argument is a comma-separated string, and the second argument
is the string you want to check if it's among the comma-separated values in the first argument.

Example:

```json
{
   "id": "addName",
   "type": "Input",
   ...
   "readOnly": ["commaContains", ["dataModel", "My.Model.Names"], "Ola"]
}
```

Note that any spaces before/after commas or before/after the first value are ignored. This function is particularly 
useful in cases where you use a component that stores multiple values in a comma-separated string, such as `Checkboxes` 
and `MultipleSelect`.

**Note:** This function is not yet available in backend code. Therefore, it will generate an error message if used in 
places [where expressions run on the backend](#use-cases), and if the functionality to automatically delete hidden data
(`RemoveHiddenDataPreview`) has been enabled.

{{% /expandlarge %}}

{{% expandlarge id="func-lowerCase-upperCase" header="lowerCase/upperCase" %}}
The functions `lowerCase` and `upperCase` take a string as input and return a new string where all characters are 
converted to lowercase or uppercase, respectively.

```json
["lowerCase", ["dataModel", "My.Model.LastName"]]
```

These functions provide a simple way to convert between lowercase and uppercase letters within a string.
One use case could be combining one of these functions with other comparison functions so that the comparisons are done 
regardless of whether uppercase or lowercase letters were used in the input value.

```json
["equals", ["upperCase", ["dataModel", "My.Model.LastName"]], "SMITH"]
```

**Note:** These functions are not yet available in backend code. Therefore, they will generate an error message if used 
in places [where expressions run on the backend](#use-cases), and if the functionality to automatically delete hidden 
data (`RemoveHiddenDataPreview`) has been enabled.

{{% /expandlarge %}}

{{% expandlarge id="func-round" header="round" %}}
The function `round` rounds a number to an integer or, optionally, to a decimal number with a configurable number of 
decimal places.

Example of rounding to 2 decimal places:

```json
["round", "122.99843", "2"]
```

Example of rounding to the nearest integer:

```json
["round", "3.4999"]
```

The return value from this function is a string, allowing it to be used for display purposes (note that the decimal 
separator is always a period). Even though the return value is a string, it can also be used further in expressions that
 expect numeric input.

**Note:** This function is not yet available in backend code. Therefore, it will generate an error message if used in 
places [where expressions run on the backend](#use-cases), and if the functionality to automatically delete hidden data
 (`RemoveHiddenDataPreview`) has been enabled.

{{% /expandlarge %}}

{{% expandlarge id="func-text" header="text" %}}
The function `text` takes a key as an argument and uses this key to retrieve the corresponding text from a text resource.
The function returns the value associated with the specified key.

Example:

```json
["text", "min-nøkkel-id"]
```

**Note:** Remember to manually test with text keys that contain variables. It's not guaranteed that these will work as 
expected.

**Note:** This function is not yet available in backend code. Therefore, it will generate an error message if used in 
places [where expressions run on the backend](#use-cases), and if the functionality to automatically delete hidden data 
(`RemoveHiddenDataPreview`) has been enabled.

{{% /expandlarge %}}

{{% expandlarge id="func-displayValue" header="displayValue" %}}
The function `displayValue` looks up a component and returns a formatted text string representing the value in the data 
model. This differs from the [component](#func-component) function, which returns the raw value in the data model. 
This function is best suited for displaying a component's value to the user and less for further logic based on the 
returned value. This is particularly relevant for Input fields with [number formatting](/app/development/ux/styling/#formatting-numbers),
date fields, radio buttons (and other components with code lists), etc.

Example:

```json
["displayValue", "component-id"]
```

**Note:** This function is not yet available in backend code. Therefore, it will generate an error message if used in 
places [where expressions run on the backend](#use-cases), and if the functionality to automatically delete hidden data 
(`RemoveHiddenDataPreview`) has been enabled.

{{% /expandlarge %}}

{{% expandlarge id="func-instancecontext" header="instanceContext (lookup)" %}}
This function allows retrieving information about the current instance. The following keys can be used as the first argument:

| Key                      | Value                          | Example Value                                       |
| ------------------------ | ------------------------------ | --------------------------------------------------- |
| `instanceId`             | Current instance ID            | `512345/48c31ffc-dcdd-416d-8bc7-194bec3b7bf0`       |
| `instanceOwnerPartyId`   | Current actor ID               | `512345`                                            |
| `instanceOwnerPartyType` | Type of actor owning instance  | `"org", "person", "selfIdentified", or "unknown"`   |
| `appId`                  | ID of the active app           | `org/app-name`                                      |

All these lookups will return a value of `null` if working in a [stateless context](../../configuration/stateless). 
Using keys other than those listed above will result in an error message. This behavior is unique among lookup functions
 to ensure that information not (yet) exposed via a key here is not attempted to be retrieved from the instance. 
 [Provide feedback](https://github.com/Altinn/app-frontend-react/issues/new?assignees=&labels=kind%2Ffeature-request%2Cstatus%2Ftriage&template=feature_request.yml) if you wish to retrieve instance data not available in this function.

The lookup is performed in the same data source available for [language/texts](../../ux/texts#data-sources).

{{% /expandlarge %}}

{{% expandlarge id="func-frontendsettings" header="frontendSettings (lookup)" %}}
This post allows retrieving information from a data source that can be controlled differently for each runtime 
environment.

The lookup is performed within the same data source available for [language/texts, and the setup is detailed there](../../ux/texts#data-sources).

**Note**:  The data source is named `applicationSettings` when used in language/texts, but the values must always be 
stored under the key `FrontEndSettings` in `appsettings.{environment}.json`. For this reason, the function has been named
`frontendSettings` here to indicate that lookups cannot be performed in the rest of `appsettings.{environment}.json`.

{{% /expandlarge %}}

{{% expandlarge id="func-datamodel" header="dataModel (lookup)" %}}
This lookup function enables retrieving values directly from the current data model. The first and only argument must 
point to a location in the data model and uses the same dot-separated format as used in `dataModelBindings`. When used 
within [repeating groups](../../ux/fields/grouping/repeating), there's _no_ need to use placeholders for indexes within 
the group - the expression automatically finds the relative position within the context of a repeating group.

Please note that lookups only function against [data types](#data-types) already supported in the expressions. If one looks up
an object or a list/array in the data model using the `dataModel` function, the result will always be `null`. 
This functionality may change, as there are plans to support objects and lists in the expressions in the future.

Example of lookup within a repeating group:

```json {linenos=false,hl_lines=[11,21,23,24,25,34,36,37,38]}
[
   {
      "id": "employees",
      "type": "Group",
      "textResourceBindings": {
         "title": "Employees in the company"
      },
      "maxCount": 99999,
      "children": ["employee-name", "employee-age"],
      "dataModelBindings": {
         "group": "Employees"
      }
   },
   {
      "id": "employee-name",
      "type": "Input",
      "textResourceBindings": {
         "title": "Full Name"
      },
      "dataModelBindings": {
         "simpleBinding": "Employees.Name"
      },
      "hidden": ["lessThan",
        ["dataModel", "Employees.Age"],
        18]
   },
   {
      "id": "employee-age",
      "type": "Input",
      "textResourceBindings": {
         "title": "Age"
      },
      "dataModelBindings": {
         "simpleBinding": "Employees.Age"
      },
      "hidden": ["equals",
        ["dataModel", "Employees[0].Name"],
        "Ola Nordmann"]
   }
]
```
The following observations can be made:

1. The first lookup (to control `hidden` on the component `employee-name`) is governed by the age of each employee. If 
the employee is under 18 years old, `employee-name` is hidden. Note that the same path in the data model is used as 
`simpleBinding` on `employee-age`.

2. The second lookup (to control `hidden` on the component `employee-age`) uses `[0]` in the data model lookup. This 
also works, but the behavior might be unexpected; here, all age components are hidden if the name of the _first_ 
employee is _Ola Nordmann_.
{{% /expandlarge %}}

{{% expandlarge id="func-component" header="component (lookup)" %}}
Direct lookups on a component are, in many ways, similar to lookups in the data model using [`dataModel`](#func-datamodel).
An expression that looks up the value of a component will search for the component and return the value stored in its 
`simpleBinding` in the data model. Currently, no other values are supported besides the one stored against 
`simpleBinding` (if other values are desired, one must directly access [`dataModel`](#func-datamodel)).

However, a lookup on a component will return `null` if the component whose value is being looked up is hidden 
(even if the component otherwise has associated data in the data model). This, to some extent, allows controlling the 
display of a component based on whether another component is visible or not. If the component is found on a completely 
different (yet hidden) page, the lookup also yields `null`, even if the data model has a value associated with the component.

Similar to [`dataModel`](#func-datamodel), lookups on a component ID will attempt to find the component in the vicinity 
of the expression within the context of [repeating groups](../../ux/fields/grouping/repeating). It will first search for the 
component in the current row before looking up through the page structure. 
{{% /expandlarge %}}

## Data Types

Expressions in the functions expect that the arguments sent in have a specific type. If an argument sent in has a 
different type than expected, the value is attempted to be converted to the correct type. For instance, the function 
`equals` expects two strings, but if you send in the boolean value `true` as either argument, it works fine too because 
the boolean value `true` is converted to the string `"true"`.


```json
["equals", true, "true"]
```

The expression above works and yields `true` as a result (because `true` and `"true"` are compared as the same value by 
converting `true` to `"true"` before comparison). This also allows calling a function that returns one datatype and,
for example, comparing it with a completely different datatype. Read more about which datatypes can be converted to what
below.

All functions expecting a specific datatype as an argument will also function if you send in [`null`](#null). 
However, in some cases, using a `null` value may result in an error message – for instance, attempting to look up in the
data model with `["dataModel", null]`. In the `concat` function, however, a `null` value is interpreted as an empty string.

### Strings

Strings contain arbitrary text and are a broad datatype that can be converted from numbers and boolean values.

Some strings can also be converted to other datatypes:

| String Value                                       | Can Substitute             | Examples                   |
| -------------------------------------------------- | -------------------------- | -------------------------- |
| Integers with or without negative signs             | [Number](#numbers)          | `3`, `-8`, `71254`         |
| Decimal numbers with or without negative signs      | [Number](#numbers)          | `3.14`, `-33.0`, `123.123` |
| `true` or `false` with lowercase or uppercase      | [Boolean](#boolean-values) | `true`, `True`, `FALSE`    |
| `null` with lowercase or uppercase                  | [Null](#null)              | `null`, `Null`, `NULL`     |

All other strings not listed in the table above will result in an error if attempted to be converted to other types.

### Numbers

Numeric values refer to positive and negative integers and decimal numbers. Some strings are also automatically converted
to a numeric value, as shown in the table for strings above. For a string to be successfully converted to a number, the 
string must meet the following criteria:

- The string contains only a number, with no other text before or after it.
- A negative sign (`-`) can be used, but a positive sign (`+`) is not supported.
- Decimal numbers must be represented with a period, not a comma.
- Thousands separators or other number formatting are not supported.

All other strings will result in an error if attempted to be converted to a number. Attempting to convert a [boolean value](#boolean-values) 
to a number will also result in an error.

Functions expecting a numeric input can also receive [`null`](#null). See more about its impact in the description of 
each function.

### Boolean Values

Boolean values include `true` (true) and `false` (false). When calling a function expecting a boolean value, certain 
other types can also be passed, which are converted to a boolean value:

- The numbers `1` and `0` function as `true` and `false`, respectively.
- The strings `"1"` and `"0"` function similarly to the numbers (and become `true` and `false`, respectively).
- The strings `"true"` and `"false"` are also converted to a boolean value.
- The value [`null`](#null) functions like `false`.

All other values will result in an error if passed to a function expecting a boolean value. Note that these rules differ 
slightly from the rules for [strings](#strings). Thus, there is a difference between values that can be _interpreted_ as 
a boolean value for a function expecting a boolean argument and values that are _equal_ to a boolean value. The function 
[`equals`](#func-equals) compares values as strings, so the number `1` and the string `"1"` will be considered equal, but 
it will not recognize `1` and `true` as equal values.

It might appear that the following expressions are similar:

1. `"hidden": ["dataModel", "hideName"]`
2. `"hidden": ["equals", ["dataModel", "hideName"], true]`
3. `"hidden": ["if", ["dataModel", "hideName"], true, "else", false]`

If the value (here obtained from the lookup `["dataModel", "hideName"]`) is `true` or `"true"`, the component will be hidden. 
However, if the value is `1` or `"1"`, the component will only be hidden with expressions in options 1 and 3. This is because
the result in the `hidden` expression [is converted to a boolean value](#use-cases), and 
`if` [expects a boolean value as the first argument](#func-if). However, `equals` compares the values as strings, and 
`"1"` is not equal to `"true"`.

Also, see tips and tricks under [_String or not a string comparison?_](#string-or-smaller-string-comparison)

### Null

Most places where a [string](#strings), [number](#numbers), or [boolean value](#boolean-values) is expected should also 
handle a `null` value. Null values indicate that a specific value is missing, and there is a difference between a `null` 
value, an empty [string](#strings), and the [number](#numbers) `0`.

If you perform a lookup in a function like `dataModel`, and the value you are searching for is not found/set, usually 
`null` will be the result.

## Tips and Tricks

### Show/Hide Entire Pages

Expressions can be used to show/hide entire pages. In the example below, the entire page will be hidden if a component 
(on one of the other pages) has the value _no_ or is not set.

```json
{
   "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
   "data": {
      "hidden": ["or",
         ["equals", ["component", "hasComplaints"], "no"],
         ["equals", ["component", "hasComplaints"], null]
      ],
      "layout": [
         ...
      ]
   }
}
```
This can be seen as an alternative to the [track selection functionality](../../ux/pages/tracks), but unlike track 
selection, the calculation of these expressions occurs in _both_ frontend _and_ backend. Therefore, it's not necessary
 to add `"triggers": ["calculatePageOrder"]` to make the functionality work.

If the page you are on is hidden, the application will automatically move to the next available page in the [page order](../../ux/pages/navigation#order). 
If all the next pages are hidden, the first possible page in the order will be displayed instead.

### String or smaller String Comparison?

The way expressions are evaluated might seem strict (for example, `0` and `null` are considered different values when 
compared with `equals`). This is a design choice made in Altinn for two reasons:

1. Strict rules are clear rules. The expressions are more likely to provide an error message if something is not as 
expected rather than leaving you wondering why things turned out the way they did.
2. If the expressions treat many different values as equal, it takes away your ability to differentiate between them 
if you want to.

If a less-strict comparison is desired, one can construct an expression using the [`or`](#func-and) function to recognize 
several different values:

```json
[
  "or",
  ["equals", ["dataModel", "My.Path"], 0],
  ["equals", ["dataModel", "My.Path"], false],
  ["equals", ["dataModel", "My.Path"], null],
  ["equals", ["dataModel", "My.Path"], ""]
]
```

Additionally, note that conversion to [boolean value](#boolean-values) allows for more alternatives than strings 
(as expected by `equals`). Given that the `or` function expects boolean values as arguments, and the values `0`,
`false`, and `null` are already accepted as boolean values, the following will function similarly to the expression above:


```json
["or", ["dataModel", "My.Path"], ["equals", ["dataModel", "My.Path"], ""]]
```
