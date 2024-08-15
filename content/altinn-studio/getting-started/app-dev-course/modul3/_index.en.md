---
title: "Module 3: Create Form"
description: Create the first version of the form
tags: [apps, training, form]
weight: 30
---

In this module, you will set up a simple form based on the requirements from Sogndal municipality.

### Topics covered in this module

- Adding form components and linking them to the data model
- Editing texts in the form

### Requirements from the municipality

The form collects personal information about the newcomer and should include the following components:
- Name
    - First name
    - Middle name (optional)
    - Last name
- Age
- Address
    - Street address
    - Postal code
    - City
- Contact information
    - Email
    - Phone

## Create Form

You can set up the form from the "Create" page. Navigate to this via the "Create" button in the top menu.

There, you will see a blank first page for the form as a starting point.

1. Set up the form based on the requirements from the municipality.
    - Make sure to add prompts for all form fields.
    - For the address, you can use the Address component found under "Advanced" or use 3 text fields.
    - To allow the form to be submitted, add a "Button" on the last page.
    - All form fields must be linked to the corresponding fields in the data model - this is done in the "Data Model Bindings" section in the right panel.

Remember to upload changes when working in Designer so they are reflected in the central file area of the service.

### Useful documentation

- [User Guide - Create a Simple Form](/altinn-studio/guides/basic-form) 
- [Available Components in Altinn Studio](/altinn-studio/designer/build-app/ui-designer/components/)
- [Guidelines for Using Components](/altinn-studio/guides/design/guidelines/components/)

## Summary

In this module, you have created a service in Altinn Studio, made a data model, and set up a form that links components to the fields in the data model.

{{<navigation-buttons
urlBack="../modul2"
textBack="<< Previous module"
urlNext="../modul4"
textNext="Next module >>" 
>}}