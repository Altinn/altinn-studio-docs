---
title: Code lists and options
linktitle: Options
description: How to set up code lists for components that use options
toc: true
weight: 40
aliases:
- /altinn-studio/guides/options
- /altinn-studio/v8/reference/data/options
---

Several of the form components in Altinn 3 use options. By options, we mean a list of choices that can be selected by
the user. In the most basic use cases you might [set up a list of options directly in the component configuration](sources/static),
but often you'll want to fetch the options from a _code list_.

### Terms

There are subtle differences between the terms _options_ and _code lists_:

- **Options**: A list of choices that can be selected by the user. As an example, think of the contacts in your phone. When you use
  your contact list to call someone, you are selecting from a list of options, and your phone uses the selected value
  (the phone number) to call the person.
- **Code list**: A list of codes and their corresponding value and texts. This can for example be
  the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country codes. This list contains codes (like `NO`
  or `SE`) and their corresponding labels (like `Norway` or `Sweden`).

When selecting a value from (for example) a Dropdown component, you are selecting from a list of _options_, which
might be sourced from a _code list_. In that case, options is _what they are_, and a code list is _where they came from_.

### Supported components

The following components support options:

| Component                                                               | Type                  | Use case                                                                                           |
|-------------------------------------------------------------------------|-----------------------|----------------------------------------------------------------------------------------------------|
| [Dropdown](/en/altinn-studio/v8/reference/ux/components/dropdown/)                   | Single choice         | Used to select a single option from a dropdown list.                                               |
| [RadioButtons](/en/altinn-studio/v8/reference/ux/components/radiobuttons/)           | Single choice         | Used to select a single option from a list of radio buttons.                                       |
| [List](/en/altinn-studio/v8/reference/ux/components/listcomponent/)                  | Single choice         | Used to select a single option from a list/table (with one radio button per row).                  |
| [Likert](/en/altinn-studio/v8/reference/ux/components/likert/)                       | Single choice per row | Used to select a single option per row in a table, displayed as a scale. Commonly used in surveys. |
| [Checkboxes](/en/altinn-studio/v8/reference/ux/components/checkboxes/)               | Multiple choice       | Used to select one or more options from a list of checkboxes.                                      |
| [MultipleSelect](/en/altinn-studio/v8/reference/ux/components/multipleselect/)       | Multiple choice       | Used to select one or more options from a dropdown list.                                           |
| [FileUploadWithTag](/en/altinn-studio/v8/reference/ux/components/fileuploadwithtag/) | Single choice         | Used to upload a file and tag it with an option.                                                   |
| [Option](/en/altinn-studio/v8/reference/ux/components/option/)                       | Present single option | Used to present/display a single option.                                                           |

In the categories below, you can learn more about how to produce a code list, configure that list to be used in a
component in order to provide options in that component, as well as common functionality across
the previously mentioned components that support options.

{{<children />}}
