---
title: Option
description: A component that allows you to display an option from a code list
schemaname: Option # Component schema name used to autogenerate list of properties from json schema (replace with appropriate component name)
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

## Usage

The `Option` component allows you to display an option from a code list. This can be useful if you have a _value_ from a code list,
but want to display this to the user without the user being able to change this value. In other words, the `Option` component
is a _read-only_ component, also known as a _display component_ or _presentation component_.

An example of use could be that the municipality the user belongs to is
[retrieved from the National Population Register (DSF) and stored in the data model via prefilling](../../../data/prefill).
Even though the user should not change this value, it should be displayed for information, as all parts of
the data model are part of the final submission. You can retrieve the list of
municipalities from [common shared code lists](../../../../guides/development/options/sources/shared) to look up
the municipality number and display the municipality name.

### Anatomy

[//]: # (TODO: Add screenshots of the component and describe the anatomy)


<!-- 
Add the following sections if relevant:

### Behavior

(How the component behaves in different contexts)

### Style

(Visual styling (e.g. alignment, padding, dos and don'ts))

### Best Practices

(Industry standards, dos and don'ts)

### Content guidelines

(E.g. punctuation rules, standard labels, etc.)

### Accessibility

(Component-specific best practices for accessibility.)

### Mobile

(How to apply component in mobile environments.)

-->
### Related

- [`Text`](../text/)
- [`Date`](../date/)
- [`Number`](../number/)

## Properties

{{% notice warning %}}
We are currently updating how properties for components are documented. The list of properties may therefore be inaccurate.
{{% /notice %}}

| **Property**                       | **Type** | **Description**                                                                                                                                                 |
|------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                               | string   | The component ID. Must be unique within all layouts/pages in a layout set. Cannot end with <hyphen><number>.                                            |
| `value`                            | number   | A value from the code list. This property can be a [dynamic expression](../../../logic/expressions) that retrieves this value from e.g. the data model. |
| `textResourceBindings.title`       | string   | Title (optional)                                                                                                                                           |
| `textResourceBindings.description` | string   | Description (optional)                                                                                                                                         |
| `textResourceBindings.help`        | string   | Help text (optional)                                                                                                                                         |
| `direction`                        | string   | Sets the structured direction of the title and value.<br/><br/> **Enum:** [horizontal, vertical] <br/><br/>**Default:** horizontal                           |
| `icon`                             | string   | The path to an icon to be displayed in connection with the choice (optional)                                                                                           |

In addition, all properties for [connecting to code lists](../../../../guides/development/options/sources/) are supported.

## Configuration

### Add the component to the layout

```json
{
  "id": "municipality",
  "type": "Option",
  "textResourceBindings": {
    "title": "Municipality",
  },
  "value": ["dataModel", "Prefill.MunicipalityNumber"],
  "direction": "vertical",
  "optionsId": "kommuner"
}
```

### Adding title, value and direction

<br>

#### `textResourceBindings.title`

Label for the choice. This can be added as a hardcoded string or as a reference to a [text resource](../../texts/#add-and-change-texts-in-an-application). This property is used to show the user
what the choice is about, not what the choice is. If you want to show the selected municipality, this could be
e.g. "Municipality" or "Your municipality". The actual choice (value) is retrieved from the code list, and is
then displayed as e.g. "Oslo".

#### `textResourceBindings.description`

Description for the choice. This can be added as a hardcoded string or as a reference to a [text resource](../../texts/#add-and-change-texts-in-an-application).

#### `textResourceBindings.help`

Help text for the choice. This can be added as a hardcoded string or as a reference to a [text resource](../../texts/#add-and-change-texts-in-an-application).

#### `value`

Here you specify the value to be displayed. This must match a value in the code list. The value can also be
determined by a [dynamic expression](../../../logic/expressions).

#### `direction`

Determines whether the choice is displayed below or next to the label. `horizontal` for next to the label and `vertical` for below.