---
title: Code lists and options
linktitle: Options
description: How to set up code lists for components that use options
toc: true
weight: 40
aliases:
- /altinn-studio/guides/options
- /altinn-studio/reference/data/options
---

Several of the form components in Altinn 3 use options. By options, we mean a list of choices that can be selected by
the user. In the most basic use-cases you might [set up a list of options directly in the component configuration](sources/static),
but often you'll want to fetch the options from a _code list_.

### Terms

There are subtle differences between the terms _options_ and _code lists_:

- **Options**: A list of choices that can be selected by the user. Think of the contacts in your phone. When you use
  your contact list to dial someone, you are selecting from a list of options, and your phone uses the selected value
  (the phone number) to dial the person.
- **Code list**: A list of codes and their corresponding value and texts. Think of
  the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country codes. This list contains codes (like `NO`
  or `SE`) and their corresponding labels (like `Norway` or `Sweden`).

When selecting a value from (for example) a Dropdown component, you are selecting from a list of _options_, which
might be sourced from a _code list_. In that case, options is _what they are_, and a code list is _where they came from_.

### Supported components

The following components support options:

| Component                                                               | Type                  | Use case                                                                                           |
|-------------------------------------------------------------------------|-----------------------|----------------------------------------------------------------------------------------------------|
| [Dropdown](../../../reference/ux/components/dropdown)                   | Single choice         | Used to select a single option from a dropdown list                                                |
| [RadioButtons](../../../reference/ux/components/radiobuttons)           | Single choice         | Used to select a single option from a list of radio buttons                                        |
| [List](../../../reference/ux/components/listcomponent)                  | Single choice         | Used to select a single option from a list/table (with one radio button per row)                   |
| [Likert](../../../reference/ux/components/likert)                       | Single choice per row | Used to select a single option per row in a table, displayed as a scale. Commonly used in surveys. |
| [Checkboxes](../../../reference/ux/components/checkboxes)               | Multiple choice       | Used to select one or more options from a list of checkboxes                                       |
| [MultipleSelect](../../../reference/ux/components/multipleselect)       | Multiple choice       | Used to select one or more options from a dropdown list                                            |
| [FileUploadWithTag](../../../reference/ux/components/fileuploadwithtag) | Single choice         | Used to upload a file and tag it with an option                                                    |

In the categories below, you can learn more about how to produce a list of options, configure that option list to be used in a component, as well as common functionality supported across these components.

{{<children />}}
