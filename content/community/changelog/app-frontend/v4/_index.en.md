---
title: v4
description: Overview of breaking changes introduced in v4 of app frontend.
weight: 99
---

App frontend v4 brings with it some new features and breaking changes. This document aims to give an overview of the
changes and how they may affect your app. As always, with a new major version, we recommend that you test your app
thoroughly before deploying to production.

### Requires backend version 8.0.0

App frontend v4 requires at least version 8.0.0 of the `Altinn.App.Core` and `Altinn.App.Api` nuget packages.
See the [overview of changes in backend v8](/community/changelog/app-nuget/v8) for more information on how to upgrade.

### Using layout sets is now required

Layout sets is a way to support multiple data steps in a single application.
This entails a slightly different folder structure in the `ui` folder of your app, as well as a new `layout-sets.json` file.
This used to be optional, but as of v4 it is required, even for apps with only a single data step.
See the [documentation on layout sets](/app/development/ux/pages/layout-sets) for more information.

### Language rewrite

The language system has that handles internal texts and app-specific text resources has been rewritten.
It should work mostly the same as before but there are a few subtle changes that may affect your app:

- Previously, when refering to a path in the data model which resulted in a null value, the full path would be shown instead for most components.
  However, in options from repeating groups it would instead show an empty string in place of the null value.
  This has been changed so that the full path is shown in all cases instead.
- To alleviate the problem of refering to null values, a new `defaultValue` property has been added to the text resource files that, if set, will be shown instead of the data model path.
  See the [documentation on text resources](/app/development/ux/texts/#default-value) for more information.
- Variables in text are now supported for nested repeating groups which did not previously work as expected. <!-- TODO(Ole Martin): Is this correct? -->
- Using `dataModel.default` as the data source in text resources is no longer recommended. Instead, refer to the specific data model like this: `dataModel.myDataModel`. <!-- TODO(Ole Martin): Elaborate on why using default is a bad idea. -->

### Most users will be prompted for party each time

In the Altinn profile it was possible to change a setting to 'not be prompted for party each time'. This setting was
mistakenly never read by app-frontend, so we failed to respect it. The default setting in Altinn profile is
_to be prompted_ for a party each time, so in v4 we changed the default behaviour of app-frontend to match the
setting in Altinn profile. This means that most users will be prompted for party each time they start an app, unless
they have changed the setting in Altinn profile.

The setting can be found under __Advanced settings__ in the Altinn profile:
![Altinn profile setting called 'Do not ask what party I represent each time I start to fill in a new form'](profile-preference-en.png "Altinn profile setting called 'Do not ask what party I represent each time I start to fill in a new form'")

Unless the user changes this setting, they will be prompted with the following page each time they start a new instance:
![Page asking who the user wants to represent](prompt-en.png "Page asking who the user wants to represent")

### Tracks are no longer supported

Showing and hiding pages using [tracks](/app/development/ux/pages/tracks/) (calculate page order) is no longer supported.
This also means that the trigger `calculatePageOrder` no longer has any effect and should be removed from any components where it is used.
Instead, you should use dynamic expressions on the `hidden` property of a layout page to determine whether pages should be visible or hidden.
See the [documentation on dynamic expressions](/app/development/logic/expressions/#viseskjule-hele-sider) for more information.

### Data model schema validation works for more data models

The form data gets validated against the data model schema to show validation messages to the user filling out the form.
There was a bug in v3 that caused this validation to not happen at all for certain data model structures.
This has been now been fixed, but is a breaking change since if you previously did not get any schema validation errors, you may suddenly see them now.
If this was the case you should test your app to make sure validation works as expected.

### TODO: Validations against dataModelBindings

- https://github.com/Altinn/app-frontend-react/issues/1463
- Some apps may suddenly get schema-validation again

### TODO: Split group into separate components

- https://github.com/Altinn/app-frontend-react/pull/1713

<!-- TODO(Magnus): Explain what has changed and how to migrate -->

### Title and description changes for Groups

- https://github.com/Altinn/app-frontend-react/pull/1693

<!-- TODO(Magnus): Fix this to make sense with the new group components -->

The `title` attribute in `textResourceBindings` for the `Group` component as a repeating group previously only applied
to the title shown above each row in the summary view of the repeating group. This attribute is now only used as the
title for the repeating group in the form view. This means that the title will now be shown above the repeating group in
the form view if it has been set.

The `summaryTitle` attribute in `textResourceBindings` for the `Group` component is now used for displaying the title
above each row in the summary view of the repeating group.

The `body` attribute in `textResourceBindings` for the `Group` component is now called `description` in order to be
more consistent with the rest of the components.

### Validation triggers have been replaced

- https://github.com/Altinn/app-frontend-react/pull/1719

The concept of triggering validations has been removed in favor of keeping the validations in sync with the data model.
Instead of controlling when validations are triggered, you now control when validations are displayed to the user.
This functions more or less the same as before, but the configuration has been changed:

{{% expandlarge id="validate-page" header="Validation on page navigation" %}}

The old configuration for triggering validation on page change was the following:

```json {linenos=false,hl_lines=[5]}
{
  "id": "nav-buttons-1",
  "type": "NavigationButtons",
  "textResourceBindings": {...},
  "triggers": ["validatePage"]
}
```

Where the trigger could be one of: `validatePage | validateAllPages | validateCurrentAndPreviousPages`.

To achieve the same result in v4, you instead use the new `validateOnNext` property:

```json {linenos=false,hl_lines=[5,6,7,8]}
{
  "id": "nav-buttons-1",
  "type": "NavigationButtons",
  "textResourceBindings": {...},
  "validateOnNext": {
    "page": "current",
    "show": ["All"]
  }
}
```

Where `page` can be one of: `current | all | currentAndPrevious`. And `show` contains a set of validation types to check; this can be one or more of:

- `Schema`
- `Component`
- `Expression`
- `CustomBackend`
- `Required`
- `AllExceptRequired`
- `All`

Note that there is also a new `validateOnPrevious` property, which works the same way as `validateOnNext`. Equivalently, for the `NavigationBar` component, there is a new `validateOnForward` and `validateOnBackward` property.

{{% /expandlarge %}}

{{% expandlarge id="validate-repeating-group-row" header="Validation when saving repeating group row" %}}

The old configuration for triggering validation when saving a repeating group row was the following:

```json {linenos=false,hl_lines=[7]}
{
  "id": "repeating-group",
  "type": "Group",
  "children": [...],
  "maxCount": 99,
  "dataModelBindings": {...},
  "triggers": ["validateRow"],
  ...
}
```

To achieve the same result in v4, you instead use the new `validateOnSaveRow` property:

```json {linenos=false,hl_lines=[7]}
{
  "id": "repeating-group",
  "type": "Group",
  "children": [...],
  "maxCount": 99,
  "dataModelBindings": {...},
  "validateOnSaveRow": ["All"],
  ...
}
```

Where `validateOnSaveRow` contains a set of validation types to check; this can be one or more of:

- `Schema`
- `Component`
- `Expression`
- `CustomBackend`
- `Required`
- `AllExceptRequired`
- `All`

{{% /expandlarge %}}

{{% expandlarge id="single-field-validation" header="Single field validation" %}}

The old configuration for single field validation was the following:

```json {linenos=false,hl_lines=[6]}
{
  "id": "some-input-field",
  "type": "Input",
  "textResourceBindings": {...},
  "dataModelBindings": {...},
  "triggers": ["validation"]
},
```

To achieve the same result in v4, you instead use the new `showValidations` property:

```json {linenos=false,hl_lines=[6]}
{
  "id": "some-input-field",
  "type": "Input",
  "textResourceBindings": {...},
  "dataModelBindings": {...},
  "showValidations": ["AllExceptRequired"]
},
```

Where `showValidations` contains a set of validation types to check; this can be one or more of:

- `Schema`
- `Component`
- `Expression`
- `CustomBackend`
- `Required`
- `AllExceptRequired`
- `All`

This causes validations to become visible immediately when they occur.
Because of this, you may want to make sure that any custom validation code you have written does not produce a validation error when the field is empty, as this will cause the validation to be shown immediately when the user enters the page.
If leaving the field empty is invalid, please mark the field as required instead of validating that with custom code.

{{% /expandlarge %}}

There are also some changes to the default behavior of validations.
Previously, `Schema` and `Component` validations were implicitly triggered whenever the data changed.
In v4, these validations are not implicitly set to be always visible. If you want to keep the old behavior,
where these validations were shown immediatly while typing, you need to set `"showValidations": ["Schema", "Component"]` on those components.
