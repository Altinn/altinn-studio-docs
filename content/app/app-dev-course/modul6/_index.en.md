---
title: Module 6
description: Expansion of form with repeating group
linktitle: Module 6
tags: [apps, training, repeating groups, validation, data processing, consume API ]
weight: 20
---

In this module you will expand the application you have built in the previous modules to support more of [the functionality that the municipality of Sogndal wishes to implement](../case/#demands-from-the-muncipality).

**Topics covered in this module**
- Repeating groups
- Validation
- Data processing

## Tasks

{{% expandlarge id="rep-groups" header="Repeating groups" %}}
### Requirements from the muncipality

To be able to tailor the best possible offers to newcomers we wish to obtain an overview of former residences of the newcomer.

On the data page there should be an option to enter previous residences. Previous residences should contain the following fields:
- Street address
- Postal code
- Postal city

It should be possible to enter up to 10 former residences. 

### Useful documentation
- [Setup of field grouping](/app/development/ux/fields/grouping/setup/)
- [Setup of repeating groups](/app/development/ux/fields/grouping/repeating/)

### Comprehension check
- What field in the data model decides if an element is repeating?
- How many repetitions are allowed for the field `TidligereBosteder`? 

{{% /expandlarge %}}


{{% expandlarge id="validation" header="Valdiation" %}}
### Requirements from the muncipality

Due to a personal vendetta among one of the employees in the municipality of Sogndal, a user who enters the postal code `4619` as a previous residence
should **NOT** be allowed to move to Sogndal. In this case, an error message should appear at the field in question with the following text:

```rich
You are not welcome to our municipality. Sorry!
```

### Useful documentation
- [Server-side validation](/app/development/logic/validation/#server-side-validation)
- [How to implement custom validation](/app/development/logic/validation/#how-to-add-custom-validation)
- [Single field validations](/app/development/logic/validation/#single-field-validation)

### Comprehension check
- When are validations server-side running?
- Why should validations added on the client side also be duplicated server-side?

{{% /expandlarge %}}


{{% expandlarge id="processing" header="Data processing" %}}
### Requirements from the municipality
One of the data processors of Sogndal is sick of manually correcting a street address that often is being incorrectly entered by newcomers.
Therefore, we wish to programmatic correct this while the user is filling out the app.

If the user enters `Sesame Street 1` in the field `Innflytter.Adresse.Gateadresse`, this should automatically be corrected to `Sesamsgate 1`.
In all other cases, the field should remain the same.


### Useful documentation
- [Data processing](/app/development/logic/dataprocessing/)
- [Calculation](/app/development/logic/calculation/#calculation)

### Comprehension check
- When is data processing running?
- What seperates `ProcessDataWrite` and `ProcessDataRead`?
- What is the difference between DataProcessing and Calculations?

{{% /expandlarge %}}


### Summary
In this module you have had a look at **repeating groups** and how this is configured as a part of the user interface.
We have also had a look at how to set up custom **validations** in the backend for cases that will not be defined as a part of restrictions in the data model.
Lastly, we have looked at how to set up **data processing** that enables manipulation of data runtime.

### Solution
If you did not manage to complete all the steps, we have an [example of a solution](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/6) that you can use as inspiration.

![Screenshot of data collecting page with repeating groups](/app/app-dev-course/modul6/data-rep-grupper-screenshot.png "Screenshot of data collecting page with repeating groups")