---
title: Module 1
description: Create an app and make a simple form
linktitle: Module 1
tags: [apps, training, datamodel, localtest, texts]
weight: 20
---

In this module, you will create the application itself, add a data model, and set up a simple form based on the requirements from Sogndal Municipality.

The first two tasks (creating the application and adding the data model) must be done in Altinn Studio. If you are developing the app locally, you can follow the instructions for [preparing for local development and testing](/app/getting-started/local-dev) after completing these tasks.

{{% notice info %}}
**NOTE**  
All the steps in this module can be performed in Altinn Studio's graphical user interface, [Altinn Studio Designer](/app/getting-started/ui-editor). However, completing the remaining modules and having a fully functional application requires local development.
{{% /notice %}}

**Topics covered in this module:**

- Creating a new application
- Adding a data model
- Adding form components and connecting them to the data model
- Text editing

## Tasks

{{% expandlarge id="create-new-application" header="Create a New Application" %}}

Applications are created from the [Altinn Studio Dashboard](/app/getting-started/navigation/dashboard/).

### Requirements from the Municipality

The application must have a descriptive name (ID) that makes it easy to find among the large number of applications Sogndal Municipality has in Altinn Studio.

{{% notice info %}}
If you want to test the app in a [test environment](/app/guides/testing/deploy/) (described in [Module 3](/app/app-dev-course/modul3/)), you need to select an organization as the owner.
You must have [access to the organization](/app/getting-started/create-user/#join-an-organization), and the organization must have access to a test environment.
{{% /notice %}}

### Tasks

1. [Create an application in Altinn Studio](/app/getting-started/create-app/)

### Useful Documentation

- [Navigating Altinn Studio](/app/getting-started/navigation)
- [Altinn Studio Dashboard](/app/getting-started/navigation/dashboard/)

{{% /expandlarge %}}

{{% expandlarge id="add-data-model" header="Add a Data Model" %}}

The data model defines the data that can be submitted through an app and the format in which it should be submitted.

With Altinn Studio's [Data Modeling tool](/app/development/data/data-model/data-models-tool/),
 you can add a data model by [uploading an _xsd_ file](/app/development/data/data-model/data-models-tool#uploading-and-viewing-a-data-model)
  or you can [create a new data model](/app/development/data/data-model/data-models-tool/#create-a-new-data-model) from scratch.
You can also start from an existing data model and edit it in a text editor or [directly in Altinn Studio](/app/development/data/data-model/data-models-tool/#editing-a-data-model).
In this task, you will only upload a pre-existing data model.

### Requirements from the Municipality

Sogndal Municipality has created a [data model](datamodel.xsd) that represents the type of data they want to collect from future residents.

### Tasks

1. [Download the xsd file](datamodel.xsd). If the file opens in the browser, create a new text file and copy the content over. Save the file as `datamodel.xsd`.
Alternatively, you can copy the URL of the file and run the command `curl <file-URL>` from the command line. Open the file in a text editor and examine its content.
2. [Upload the data model in Altinn Studio](/app/development/data/data-model/data-models-tool/#uploading-and-viewing-a-data-model)
3. Click "Last opp dine endringer" and follow the instructions to save the changes.
4. Open the app's repository from the [Altinn Studio Dashboard](/app/getting-started/navigation/dashboard/) and take a closer look at the files in the `App/models` folder.

### Knowledge Check

- What kind of data does the service owner want to collect here?
- What effect does **\<minOccurs\>** have in the data model? You will see that the field has a different value for _Innflytter.Fornavn_ (First Name) and _Innflytter.Mellomnavn_ (Middle Name).
- What other properties are set on the _Innflytter.Mellomnavn_ (Middle Name) field?
- In addition to the uploaded _.xsd_ file, _.C#_, _.metadata.json_, and _.schema.json_ files have been generated. What is the relationship between these files?
- Some restrictions from the data model are not transferred to the _C#_ file. Which ones? Some new properties have also been added. Which ones?

{{% notice info %}}
If you plan to do the entire development or parts of it locally, you can [prepare for local development and testing](/app/getting-started/local-dev) after creating the application and adding the data model.
{{% /notice %}}

### Useful Documentation

- [Altinn Studio Data Modeling](/app/development/data/data-model/data-models-tool/)
- [Description of Indicators in XSD](https://www.w3schools.com/xml/schema_complex_indicators.asp)
- [Installing curl for Windows](https://developer.zendesk.com/documentation/api-basics/getting-started/installing-and-using-curl/#windows)
- [Altinn Studio Repository](/app/getting-started/navigation/repos/)

{{% /expandlarge %}}

{{% expandlarge id="edit-texts" header="Create and Edit Texts" %}}

[Texts in Altinn Studio](/app/development/ux/texts/) are stored in separate language files (also called resource files) and can be linked to form components using a text key.
The texts can be [created and edited in Altinn Studio Designer](/app/development/ux/texts/#altinn-studio-text-editor) or [directly in the file](/app/development/ux/texts/#changing-texts-directly-in-the-repository).

{{% notice warning %}}
**NOTE**: The display name for the application must be changed both in `App/config/applicationMetadata.json` and in the language files.
{{% /notice %}}

### Requirements from the Municipality

To make the service user-friendly and accessible for people with visual impairments, it is important that all components have good and descriptive labels.

### Tasks

1. [Create texts](/app/development/ux/texts/#add-and-change-texts-in-an-application) for the components of the first form. The texts should describe what needs to be filled in and will be displayed above the fields. Take a look at the next task to see which components you need texts for.
2. [Change the display name for the application](/app/development/ux/texts/#change-application-title). It is important that the application's display name sounds good and describes the service well.
3. [Add translation(s) for the texts](/app/development/ux/texts/#add-and-change-texts-in-an-application). The application must be available in Norwegian Bokmål, Norwegian Nynorsk, and English. In the initial version, it is sufficient to support only one of these languages.


Remember to upload changes when working in Designer so they are reflected in the repository.
In the next step, you will create components and link the texts you have created to them.

### Useful Documentation

- [Texts in Altinn Studio](/app/development/ux/texts/)
- [Editing Application Texts](/app/development/ux/texts/#add-and-change-texts-in-an-application)
- [Formatting of Texts](/app/development/ux/texts/#formatting-of-texts)
- [ISO 639-1 Standard language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

### Knowledge Check

In Altinn, we currently support three written languages: Norwegian Bokmål, Norwegian Nynorsk, and English.

- How do you add English language support to the application?
- If we were to support Ukrainian in the future, what language code would you need to annotate the file with?

{{% /expandlarge %}}

{{% expandlarge id="add-components" header="Add Components" %}}

The components in an application can be set up using "drag and drop" in [Altinn Studio Designer](/app/getting-started/ui-editor/)
or manually in the _{pagename}.json_ file that describes the structure of a form page (you can find the file under `App/ui/layouts`).

### Requirements from the Municipality

The first form page gathers personal information about the new resident and should have the following text input components:
- Name
  - First Name
  - Middle Name (optional)
  - Last Name
- Age
- Address
  - Street Address
  - Postal Code
  - City
- Contact Information
  - Email
  - Phone number

The fields should be mandatory unless indicated otherwise.

### Tasks

1. Set up the first form page with components based on the requirements from the Municipality.
2. Add labels by connecting text resources to each of the components.

Remember to upload changes when working in Designer so they are reflected in the repository.

### Useful Documentation

- [Building a Form with the UI Editor in Altinn Studio](/app/getting-started/ui-editor/)
- [Available components in Altinn Studio Library](/app/guides/design/guidelines/components/)

### Knowledge Check

In your application repository, you will find the _{pagename}.json_ file in the `App/ui/layouts` folder. The JSON file describes the form page you have set up in Altinn Studio, assuming you have uploaded the changes.

- Can you find the component linked to the email field?
- What change is required in this file if the email field is no longer mandatory?
- By changing one line in the _{pagename}.json_ file, you can convert the component linked to the middle name field into a free-text input field. What change is required?
{{% /expandlarge %}}

## Summary

In this module, you have created an application in Altinn Studio,
added a data model, and set up a form page that connects components to fields in the data model.

If you have prepared for local development, you have also cloned the application to your local development environment.
The application should be runnable on your local machine with LocalTest, and you should be able to fill in the fields.

## Solution Proposal

If you haven't completed all the steps, we have a [solution proposal](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/1) that you can draw inspiration from.

![Screenshot of the data collection page](/app/app-dev-course/modul1/data-screenshot.png "Screenshot of the data collection page")