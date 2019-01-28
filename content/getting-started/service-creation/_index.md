---
title: Create a service
description: Information on how to create a service in Altinn Studio
tags: ["guide"]
weight: 100
---

An overview of existing services is available on the dashboard. This is also where new services can be created from. 

### Create a new service

A new service is created from the dashboard.

{{<figure src="dashboard-overview.png?width=1000" title="Dashboard - overview">}}

1. Click on the "ny tjeneste" button in the top right corner of the dashboard. 
2. Select the service owner to create the service for
3. Enter the display name for the service
    - This is the name that will be shown to the end user, and can be changed later
4. The identifier name of the service will automatically be populated based on the display name. _This can not be changed once the service has been created._ This name is only used to identify the service in the solution. The identifier must start with a letter, and can only contain alphanumeric characters or underscore.
5. Create the service by clicking "Opprett"

{{<figure src="dashboard-new-service.png?width=1000" title="Dashboard - create a new service">}}

Once the service is created you will be redirected to the service. 

### Upload/view data model
The data model defines the data that can be submitted in the service. Currently the data model format must be XSD (Seres or OR).

The data model needs to be uploaded for each service. 

1. Open the service from the dashboard
2. Choose _Modellering -> Datamodell from the top navigation menu
3. Click on _Velg XSD_ and choose an XSD in the file explorer
4. Click _Last opp_

The data model XSD is then parsed, and all necessary files are generated. These files can be viewed by selecting the different tabs displayed on the data model page. There is also a visual representation (tree view) of the data model available on this page. 

{{<figure src="add-datamodel.png?width=700" title="Add/view data model">}}

### Create a form using the GUI editor

The GUI editor is available via the "Lage" option in the navigation menu. 

{{<figure src="ui-editor-empty.png?width=1000" title="GUI editor">}}

#### Form components
Form components can be dragged into the working surface in the middle from the menu on the left-hand side. The form components can be rearranged by dragging/dropping them on the working surface.

When hovering over a component, or after selecting a component by clicking on it, two icons are visible - a _trash_-icon for deleting the component and a _pencil_-icon for editing properties on the component. 

{{<figure src="ui-editor-add-components.gif?width=1000" title="GUI editor - add components">}}

See the [overview of form components](components) for more details on the different components that are available.

#### Editing the properties on a component
Each component has a set of properties that can be edited, for example texts, connection to data model, etc. In order to edit the properties on a component, hover over or click on the component. A _pencil_-icon will then be visible to the right of the component. Click on this icon to open the properties editor for the component. 

Save any changes by clicking the _checkmark_-icon to the right of the properties editor. Discard any changes by clicking the _X_-icon to the right of the properties editor.

{{<figure src="ui-editor-edit-properties.png?width=1000" title="GUI editor - edit properties on a component">}}

{{%notice info%}}
NOTE: The form components are currently being developed. As such, not all form components have a complete/updated properties editor.
{{% /notice%}}

See the [overview of form components](components) for information on which properties are available to edit.

### <a name="add-texts"></a> Texts
Texts are stored in resource files for the service. Texts can come from common libraries, from the data model, and be added manually. These texts are available for example when editing a form components properties, and selected texts will be shown to the end user.

#### Add/edit texts for the service
In the top navigation menu, select _UX_ -> _Tekster_ to go to the text editing page. 
An overview of the texts that are already available for the service is shown.

On this page, existing texts can be changed and new texts can be added. Add a new text by clicking _Ny tekst_, and enter the text and a unique identifier for the text. 

Save any changes by clicking _Lagre tekster_.

{{<figure src="ui-editor-texts.png?width=1000" title="UI editor - redigere tekster">}}

### Code lists
A code list is a pre-defined list of _codes_ and display texts that can be connected to a form component. Code lists can come from common libraries, and can be defined for each service.

#### Add/edit code list
In the top navigation meny, select _Modellering_ -> _Kodelister_. An overview of existing code lists will be shown. To edit an existing code list, select it from the overview. To add a new code list, click _Lag ny kodeliste_. 

{{<figure src="ui-editor-codelist.png?width=1000" title="UI editor - redigere kodelister">}}

#### Connect a code list to a form component
{{%notice info%}}
NOTE: Currently, the only form components that support code lists are _Radio buttons_ and _Checkboxes_.
{{% /notice%}}

1. Add a form component that supports code lists, and open the properties editor for the component. 
2. Select _Code list_ as option to add radio buttons.
3. Select a code list from the available options for the service.
    - Note that this must be a code list that is either defined for the service, or in a common library that the service has access to.
4. Save the changes by clicking the _checkmark_ icon to the right of the properties editor. 

When testing the service, the actual values from the code list will be loaded into the component. 

{{<figure src="ui-editor-add-codelist.png?width=1000" title="UI editor - add a code list to a form component">}}

{{% notice info %}}
NOTE: There is currently no language support for code lists.
{{% /notice %}}

### Call external APIs to fetch data
{{%notice info%}}
NOTE: Currently, only open APIs (that do not require authentication) are supported for this funcitonality.
{{% /notice%}}

External APIs can be used to populate data in the form from external sources. There is currently implemented support for two types of values fetched from external APIs: _Single value_ and _List of values_. 

#### APIs fetching a _single value_
This type of API potentially takes some input from a field in the form, submits this to the API as a parameter, and returns a single value in response. The connection can be configured to populate a set field in the form with this fetched value. An example of this is the _Bring poststed_ API, which takes a postal code as input and returns the postal area. 

#### APIs fetching a _list of values_
This type of APIs works in a similar way to code lists. It potentially takes some input from a field in the form, submits this to the API as a parameter, and returns a list of values in response. The connection can be configured to populate the options of a form component that can have multiple values (f.ex. a dropdown list, radio buttons, checkboxes). An example of this is the _SSB kommuneliste_ API, which returns a list of all the municipalities in Norway defined in a configured time interval. 

#### Available APIs:
| API  | Description | Type |
| ---- | ----------- | ---- |
| Bring poststed | Fetches the name of the Norwegian postal area based on input of corresponding postal code | Single value |
| SSB kommuneliste | Fetches a list of all Norwegian municipalities, as defined in a set time interval | List of values |

#### Configure API connection
1. Add any form components that might be needed for the input/output values for the selected API. Make sure that the form components are connected to fields in the data model.
2. Select _Legg til tilkobling_ under _API-tilkoblinger_ from the left-hand menu in the GUI editor.
3. Select _Eksternt API_.
4. Select API from the list of available APIs.
5. Add client parameters,if any (_ClientParam_) -  These are any input parameters that are populated from selected form data.
	- Add an example value to test the API call
	- Select data model field that corresponds to the data model field connected to the input field.
6. Add any additional parameters required by the API (_MetaParam_) - this is input required by the API that does not come from the form data.
7. Test the API call by clicking _Fetch from API using parameters_.
	- This will test that the call is working with the selected parameters, using the example value as input.
  - The response from the test will be shown in the textbox under _API Response_
8. Select _Add new mapping_ to map the response to a field in the form.
9. Select which object from the response that should be used to populate the field (the API may return more than one object in response).
10. Select data model field that corresponds to the data model field connected to the field that will show the output from the API.
  - Note that this should be a component type that supports lists (ex. dropdown, checkboxes, radiobuttons, etc.) for APIs returning a list of values.
11. Save the configuration by clicking _Lagre_.
12. Test that it works by typing in a valid input value in the input field, and see that the output field is populated with the result of the API call.

{{<figure src="ui-editor-api-config.png?width=700" title="GUI editor - Configure API connection">}}

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
