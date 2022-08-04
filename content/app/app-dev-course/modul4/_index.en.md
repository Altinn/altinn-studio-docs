---
title: Module 4
description: Add code lists manually, progmatic and dynamically
linktitle: Module 4
tags: [apps, training, options, code lists, dynamics ]
weight: 20
---

In this module you're expanding the application you made in the previous modules to support even more of the [requirements of the municipality of Sogndal](../case/#demands-from-the-muncipality).

**Topics covered in this module:**

- Code lists/Options
- Dynamic

## Tasks

{{% expandlarge id="options-expandable" header="Collecting work information" %}}

In many applications there is a need to provide the user with a set of response options for a data field.
The answer options are referred to as _code lists_ or _options_.

In Altinn Studio this is supported in the form of radio buttons, checkboxes and dropdown lists.

{{% notice info %}}
There are three ways to set up code lists in Altinn today

1. Directly on the component through Altinn Studio or manually in _FormLayout.json_\*
2. In a static json-file referred to in the component
3. Programmatic in the application logic

   \* only available on radio buttons and check boxes
{{% /notice %}}

In this task, you will get to try out all three ways to set up a code list.


The municipality of Sogndal wishes to collect information on the newcomers working situation. Some of the data they wish to collect is which **sector** and **industry** the newcomer works in, and how many **years** the newcomer has been active in the workforce.


### In Altinn Studio

  1. Create a new form page to collect data about working conditions
  2. Set up a **radio button** component for _Sector_. Create the answer options `Offentlig` and `private` manually.
  3. Set up a **check box** component for _Industry_.
     Choose _Kodeliste_ as method for adding checkboxes and add _Kodeliste ID_ `industry`

     The rest of the setup for this component is done locally
  4. Set up a **dropdown list** for _Years in work force_
     Add _Kodeliste ID_ `years-in-work-force`

     The rest of the setup for this component is done locally
  5. _Commit_ and _Push_ your changes to master, 
     and _Pull_ the changes to your local development environment.

### In Local Development environment

1. The municipality of Sogndal has created a [code list](../industry.json) for **industries**. Download the file and place it correctly in the repository.

2. Set up the values in the code list for **Years in work force** directly in the application logic.

   Answer options:

   Label         | Data value
   --------------|----------
   0 - 5 years   | `0-5`
   5 - 10 years  | `5-10`
   10 - 20 years | `10-20`
   20+ years     | `20+`

3. Verify that all code lists works as expected.

### Useful documentation

- [How to set up static code lists](/app/development/data/options/#static-codelists-from-the-application-repository)
- [How to set up dynamic code lists](/app/development/data/options/#dynamic-codelists-generated-runtime)
- [Secured dynamic options](/app/development/data/options/#secured-dynamic-options)

### Knowledge check
- What is the difference between static and dynamic options?
- What will the area of use be for secured dynamic options?

{{% /expandlarge %}}


{{% expandlarge id="dynamic-expandable" header="Differentiated data base for public and private sector" %}}

In some cases the values displayed in a code list may be attached to a different field in the form.

The municipality of Sogndal wishes that the list of industries to choose from is personalised to what sector you work in.

Read through the requirements from the municipality to see if you can help them.

### Requirements from the municipality

We want the user to be presented with a different set of options for the industry choice
based on which sector they are in.

- Private sector: [Standard list of industries](../industry.json)
- Public sector: `State` and `Municipality`

### Useful documentation
- [How to pass query parameters when fetching options](/app/development/data/options/#pass-query-parameters-when-fetching-options)

### Knowledge check
- If a list of options is set up with mapping towards the data model - what happens when the field in question changes value?
- What happens with the chosen value on a field connected to an option-list that is retrieved over again from the server side?

{{% /expandlarge %}}

{{% expandlarge id="dynamic-formview" header="Tailored offer for IT-competence" %}}

### Requirements from the municipality

If the user chooses `IKT (data/it)` under industry, a text with a link to our overview of vacant positions should appear.

- Below the industry choice, the following text should appear

    ```rich
    We see that you have the competence we need in Sogndal.
    Here is an overview of vacant positions.
    ```

- Line 2 in the text should be a link that directs to: 
https://sogndal.easycruit.com/index.html

The text and link should **only** be visible if the user has chosen `IKT (data/it)`. In all other cases this will be hidden.

### Useful documentation
- [Add functions for dynamics](/app/development/logic/dynamic/#add-or-edit-functions-for-dynamics)
- [Examples of use of dynamic in form](/app/development/logic/dynamic/#example-usage-of-dynamics-on-an-appe)

### Knowledge check
- If you add a new function to `RuleHandlerHelper` - where will these functions run?
  - Would dynamic work without this defined?
- What is the correlation between functions defined in `RuleHandlerObject` and the file `RuleConfiguration.json`?

{{% /expandlarge %}}

## Summary

In this module you have set up a dropdown list, radio buttons and checkboxes and added values for these components manually, programmatically and dynamically.

The service should run on your local computer with local test
and you should be able to validate that the components present expected data values.

**Remember to _push_ your local changes, so that they are available in Altinn Studio when you're happy with them**

### Solution
If you did not manage to complete all the steps, we have an [example of a solution](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/4) that you can use as inspiration.

![Screenshot of collection of work information for private sector](/app/app-dev-course/modul4/arbeidsopplysninger-privat-screenshot.png "Screenshot of collection of work information for private sector")
![Screenshot of collection of work information for public sector](/app/app-dev-course/modul4/arbeidsopplysninger-offentlig-screenshot.png "Screenshot of collection of work information for public sector")