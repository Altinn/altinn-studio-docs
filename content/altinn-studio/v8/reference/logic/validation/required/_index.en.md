---
title: Required fields
description: How to make a field required, and how to customise the error message the user sees
toc: true
weight: 10
---

A required field is a field the user must fill in before they can move on. You make a field required in the settings for the component in Altinn Studio Designer. In the layout file, this is stored as `required` on the component:

```json {hl_lines=[5]}
{
  "id": "first-name",
  "type": "Input",
  "textResourceBindings": { "title": "text-first-name" },
  "required": true,
  "dataModelBindings": { "simpleBinding": "Person.FirstName" }
}
```

The value can also be a [dynamic expression]({{< relref "/altinn-studio/v8/reference/logic/expressions" >}}), so that the field is only required in some cases.

## When the user sees the error

The user does not see errors for empty required fields while filling in the form. The app shows the error only when the user tries to submit, save a row in a repeating group or change page, if the app is set up to check when saving a row or changing page. See [When the user sees validation messages]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#when-the-user-sees-validation-messages).

The app shows all other validations straight away. That is why you usually let `required` check whether a field is filled in, and let the other rules accept empty fields.

## Hidden fields

If the component is hidden from the user, the app does not check whether the field is filled in, neither in the browser nor on the server. This also applies when the component is on a hidden page or in a hidden group.

You can therefore make a component both required and hidden, so that the field is only required when the user can see it. You can set up both in Designer. In the layout file, it looks like this:

```json {hl_lines=["5-6"]}
{
  "id": "number-of-children",
  "type": "Input",
  "textResourceBindings": { "title": "text-number-of-children" },
  "required": true,
  "hidden": ["equals", ["component", "has-children"], false],
  "dataModelBindings": { "simpleBinding": "Person.NumberOfChildren" }
}
```

## Default error message

The error message for required fields is _"You have to fill out {0}"_. The app replaces `{0}` with the name of the field.

The app finds the name of the field like this:

- If the component has a `shortName` text, the app uses it. You set up `shortName` per component, in the same way as the label (`title`). _For now, the app only uses this text in the error message for required fields._
- Otherwise, the app uses the label (`title`), starting with a lower-case letter unless the text looks like an abbreviation.
- For components with several fields, such as Address, the app uses the default texts for each field.

### Example: Field with only `title`

```json
{
  "id": "first-name",
  "type": "Input",
  "textResourceBindings": {
    "title": "text-first-name"
  },
  ...
}
```

The texts in the resource file:

```json
{
  "id": "text-first-name",
  "value": "First name"
}
```

The validation message is then `"You have to fill out first name"`.

### Example: Field with `shortName`

If the label is long, or does not fit well in the error message, you can add a `shortName` text that the app uses instead.
_The app only uses the `shortName` text in this error message, not anywhere else._

```json
{
  "id": "first-name",
  "type": "Input",
  "textResourceBindings": {
    "title": "text-first-name",
    "shortName": "first-name-short"
  },
  ...
}
```

The texts in the resource file:

```json
{
  "id": "text-first-name",
  "value": "Enter your first name"
},
{
  "id": "first-name-short",
  "value": "your first name"
}
```

The validation message is then `"You have to fill out your first name"`.

## Replacing the error message completely

If you want a completely different error message for a field, add `requiredValidation` to `textResourceBindings` on the component. The value is a text key from the [text resources]({{< relref "/altinn-studio/v8/reference/ux/texts" >}}), so that the message is available in all the languages the app supports.

```json {hl_lines=[6]}
{
  "id": "first-name",
  "type": "Input",
  "textResourceBindings": {
    "title": "text-first-name",
    "requiredValidation": "first-name-required"
  },
  ...
}
```

## Required fields on the server

The app can also check required fields on the server when the user moves on in the process. The check is off by default, and you turn it on with the `RequiredValidation` setting. We recommend turning it on, so that data other systems submit through the API is also checked. The server only checks components that are visible to the user, in tasks that have a layout set. See [Validation on the server]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#validation-on-the-server).

{{% notice info %}}
In v9, `RequiredValidation` is turned on by default.
{{% /notice %}}
