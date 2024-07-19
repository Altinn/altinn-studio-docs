---
title: Customize the Data Model
description: In this module, we will customize the data model for the service
weight: 20
toc: true
---

In this module, we will customize the _data model_ for the form we are going to create.

### Topics covered in this module
- Rename fields in the data model
- Change the type of fields in the data model
- Add new fields to the data model
- Change settings on fields in the data model

### Requirements from Sogndal municipality
The municipality wants to collect the following data about new residents:
- Personal information
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

## Customize the Data Model
The data model defines what data is expected to be collected and in what format.
> _**You can think of a data model as a table of contents for the form.**_

For a simple form, there is often a 1-1 connection from fields in the data model to fields in the form, while for more advanced
forms, the data model and the form can be quite different.

A data model with some example fields is included when you create a service. You can edit the field names
to make it clear what they represent, and add your own fields.

The data model is used to determine _what_ data to collect. It is also used to determine _how_ the data
should look/be, by setting constraints that are validated.

1. Navigate to the "Data Model" page by clicking on "Data Model" in the top menu bar.
   - You will then see the data model with the fields that have been added.
2. Click on the first field in the data model, `property1`. A number of editing options will appear in the right panel.
3. Change the name of the field `property1` to `first name`.
4. Select the field `property2`, and change the name of the field to `last name`.
5. Select the field `property3`, and change the name of the field to `middle name`.
6. Note that the `middle name` field is not set as required, as the "Required" option is turned off. Click on the fields
    `first name` and `last name` and see that these fields are set as required. You can keep these settings as they are.
7. Click the "Add" button next to `model` at the top of the data model and select "Integer".
8. See that a new field named "name0" and type "Integer" has been added to the bottom of the data model. Change the name of the integer field to `age`.
9. Further down in the "Properties" panel on the right side, there is a field called "Less than or equal". Enter the number `120` in this field.
10. Click the "Add" button next to `model` at the top of the data model and select "Object".
11. See that a new field named "name0" and type "Object" has been added to the bottom of the data model. Change the name of the object field to `address`.
12. Click on the `address` field in the data model. Notice that the arrow now points down, and a group opens under the field with the message `This element is empty`.
13. Hover over the address field. You will see 3 buttons next to the field. Click the `+` sign and then "Add field" in the menu list to add a new field to the group.
14. Click on the new field that was added to the group and change the name of the field to `street address`.
15. Hover over the `address` group again, click the `+` sign, and "Add field" to add another field to the group. Name the field `postal code`.
    - The field automatically gets the type "Text" and can keep that type.
16. Add another new field to the `address` group and name the field `city`.
    - The field automatically gets the type "Text" and can keep that type.
17. Go back to the top of the data model and add a new group named `contact info`.
    - Click the "Add" button next to `model` at the top of the data model and select "Object".
18. Add a field to the `contact info` group and name the field `email`.
19. Add another field to the `contact info` group and name the field `phone`.
20. All fields from the requirements list are now added. Click the "Generate models" button to create all necessary
    model files for the service. Once this is completed, you will see a green box with a confirmation message at the top
    of the page.

<video autoplay loop controls muted src="./create-datamodel.mp4">Your browser does not support video playback.</video>

## Summary
In this module, you have customized the data model for the service by adding the desired fields and naming them.

{{<navigation-buttons
  urlBack="../modul1"
  textBack="<< Previous module"
  urlNext="../modul3"
  textNext="Next module >>"
>}}