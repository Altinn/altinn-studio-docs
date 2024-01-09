---
title: JsonSchema upgrade (2023)
linktitle: JsonSchema
description: FAQ for the new stricter JsonSchema that arrived in 2023
toc: true
---

# What?
During the start of September 2023 we upgraded the layout JsonSchema used by Altinn 3 apps to verify the layout files.
This change made the JsonSchema stricter and might have caused your app to display an increased amount of validation
errors (usually yellow lines) when developing locally in Visual Studio Code (or similar IDEs).

This document describes how to fix the most common errors in your app.

# Why?
When adding new properties and abilities to Altinn 3 apps, we used to update the JsonSchema file manually. Over time
this has led to a JsonSchema that differed a bit from the internal workings of the app frontend. With this change we
will make the JsonSchema stricter and derive the schema from a common configuration that we also use for our internal
types in the app frontend. The philosophy behind the change is also to make the JsonSchema stricter, because a strict
schema will make it easier to find errors in the layout files - and hopefully cause less confusion and frustration for
app developers in the future.

# Common errors and how to fix them

## Error showing up in the component id property
Earlier changes to the JsonSchema has made the format of the **id** property stricter. You should make sure to avoid
naming the **id** as **something-{number}**, as a trailing **{dash}{number}** is used internally in the app frontend to
differentiate multiple instances of components in repeating groups. Naming your component this way may cause unexpected
behavior in the app frontend.

PS: Also make sure the component IDs are unique across the layout page, and all other layout pages in the same
process step. The JsonSchema cannot verify this for you, but re-using component IDs will cause all components using
the same ID to be hidden when only one of them is hidden.

## A Group component shows up with strange validation errors
The **Group** component has been split into 4 different sub-types, as each of these have grown more complex over time.
Your component needs to match one of these sub-types, and your JsonSchema validator may be confused about which one
you're trying to match if some properties are present that doesn't match the sub-type you're trying to use.

Groups can now be one of:
1. Repeating groups (with **maxCount** set to a number greater than 1)
2. Repeating groups used to list Likert components (with **maxCount** set to a number greater than 1, and **edit.mode** set to
   **likert**)
3. Non-repeating groups (with **maxCount** set to 1, 0 or undefined)
4. Non-repeating groups with a **panel** property

The most common problem here occurs if **dataModelBindings** or **triggers** is set on a non-repeating group sub-type.
Non-repeating groups doesn't support data model bindings or triggers, so you should remove these properties if you're
trying to use a non-repeating group. For both types of repeating groups, **dataModelBindings** are required, and you
have to point to an array structure in the data model using the **group** property inside **dataModelBindings**. Without
a data model binding, the repeating group will not be able to store any data, and its relation to components inside
may fall apart.

## A FileUpload or FileUploadWithTag component warns about missing required property in dataModelBindings
A **FileUpload** or **FileUploadWithTag** _may_ have a **dataModelBindings** property, and it _is_ required when
setting it up [inside a repeating group](/app/development/ux/fields/grouping/repeating/attachments/).
The **dataModelBindings** may however be safely omitted entirely if the component is not placed inside a repeating group.

## A component warns about an unsupported property in textResourceBindings
The **textResourceBindings** property now only supports a certain set of properties, and text resource bindings that
are not implemented/handles anywhere in the app frontend will cause a validation error. The supported properties for
each component type should now be listed in suggestions by Visual Studio Code. A common issue is setting the **title**
property on an **AddressComponent**. The Address component does not currently support any text resource bindings.

## A component warns about dataModelBindings
Binding a component to the data model only makes sense for form components that can store data. The entire property
can be safely removed for components that doesn't store data, such as **Header**, **Paragraph**, **Button**, etc.

## A component warns about the readOnly/required property
The **readOnly** and **required** properties are only supported by form components. These properties can be safely
removed for components such as **Header**, **Paragraph**, **Button**, etc, as they will have no effect on the component
rendering.

## A Header component warns about missing size property
Many configurations of the **Header** component seem to be missing the **size** property. This property is required.

## A component other than Header warns about the size property
Many configurations also seem to have the **size** property set on components other than the **Header** component. This
is most likely caused by copy-pasting the **Header** component, and forgetting to remove the **size** property. The
**size** property is only supported by the **Header** component, and has no effect on other components (usually
**Paragraph** or **Panel**).

## The componentType property is not allowed
Some examples in docs used this property, but it has been unused for quite some time in our code. It can be safely
removed from your layout file.

## Setting optionsId to null produces a warning
For components using options (such as **Checkboxes**, **RadioButtons**, **Dropdown**, etc) you should set _either_
**options**, **optionsId** _or_ **source**. Setting more than one of these, or setting one of them to **null** can
lead to unexpected behavior in the app frontend or app backend. Removing the option that is set to **null** should
resolve any issues.