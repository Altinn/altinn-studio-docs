---
draft: true
title: Data model bindings
linktitle: Data model bindings
description: Connect components in a layout to fields in a data model
toc: true
tags: [needsReview]
---

A data model binding connects a component to a field in a data model. The component uses the binding to read or store data.

Add bindings to the component's `dataModelBindings` property. The property reference for each component lists the bindings it supports. For example, an `Input` uses `simpleBinding`, while a `RepeatingGroup` uses `group`.

## Short form

Write the field path as a string when the field belongs to the layout set's default data model:

```json
{
  "id": "first-name",
  "type": "Input",
  "dataModelBindings": {
    "simpleBinding": "person.firstName"
  }
}
```

Field paths use dot notation. In this example, `person.firstName` refers to the `firstName` field in the `person` object.

The default data model is the `defaultDataType` value in `App/ui/<layout-set>/Settings.json`.

## Extended form

Use an object containing `dataType` and `field` when the binding refers to a data model other than the default:

```json
{
  "id": "first-name",
  "type": "Input",
  "dataModelBindings": {
    "simpleBinding": {
      "dataType": "contact-information",
      "field": "person.firstName"
    }
  }
}
```

`dataType` is the data type ID in `App/config/applicationmetadata.json`. `field` is the field path in that data model.

The extended form lets components in the same form bind to different data models. Use the short form for components bound to the default data model, and the extended form for components bound to another data model.

## Binding keys

The key in `dataModelBindings` identifies the value that the component reads or stores. Common keys include:

| Key | Purpose |
| --- | --- |
| `simpleBinding` | One value, such as text, a number, or a boolean value |
| `list` | An array of string values |
| `group` | An array of objects in a repeating structure |

Some components define their own binding keys. For example, `Address` has separate bindings for the address, postal code, and postal place. Check the component's property reference to see which keys it supports and which ones are required.

## Bindings in repeating groups

A `RepeatingGroup` binds to the array it displays. Components in the group bind to fields in each object in that array. If the group binds to `people`, bind a name field in the group to `people.name`:

```json
[
  {
    "id": "people",
    "type": "RepeatingGroup",
    "children": ["person-name"],
    "dataModelBindings": {
      "group": "people"
    },
    "maxCount": 10
  },
  {
    "id": "person-name",
    "type": "Input",
    "dataModelBindings": {
      "simpleBinding": "people.name"
    }
  }
]
```
