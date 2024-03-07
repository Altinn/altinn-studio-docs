---
title: Module 1
description: Create an app and make a simple form
linktitle: Module 1
tags: [apps, training, datamodel, localtest, texts]
weight: 20
hidden: true
---

In this module, you will create the application itself, add a data model, and set up a simple form based on the requirements from Sogndal Municipality.

You'll have to perform the first two tasks, creating the application and adding the data model, in Altinn Studio's graphical user interface, [Altinn Studio Designer](/app/getting-started) (Designer).
 If you are developing the app locally, you can follow the instructions for [preparing for local development and testing](/app/getting-started/local-dev) after completing these tasks.

{{% notice info %}}
**NOTE**  
You can perform all the steps in this module in Designer.
 However, completing the remaining modules and having a fully functional application requires local development.
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

The application must have a descriptive name (ID), making it easy to find among the many applications Sogndal Municipality has in Altinn Studio.

{{% notice info %}}
If you want to test the app in a [test environment](/app/testing/deploy/) (described in [Module 3](/app/app-dev-course/modul3/)), you need to select an organization as the owner.
You must have [access to the organization](/app/getting-started/create-user/#join-an-organization), and the organization must have access to a test environment.
{{% /notice %}}

The data model defines the type and format of data that can be submitted through an app.

With Altinn Studio's [Data Modeling tool](/app/development/data/data-modeling/),
 you can add a data model by [uploading an _xsd_ file](/app/development/data/data-modeling#upload-and-display-data-model)
  or you can [create a new data model](/app/development/data/data-modeling/#create-a-new-data-model) from scratch.
You can also start from an existing data model and edit it in a text editor or [directly in Altinn Studio](/app/development/data/data-modeling/#editing-a-data-model).
In this task, you will only upload a pre-existing data model.

### Requirements from the Municipality

Sogndal Municipality has created a [data model](datamodel.xsd) representing the data they want to collect from future residents.

### Tasks

1. [Download the xsd file](datamodel.xsd). If the file opens in the browser, create a new text file and copy the content over. Save the file as `datamodel.xsd`.
Alternatively, copy the file URL and run the command `curl <file-URL> > datamodel.xsd` from the command line. Open the file in a text editor and examine its content.
2. [Upload the data model in Altinn Studio](/app/development/data/data-modeling/#upload-and-display-data-model)
3. Click "Last opp dine endringer" and follow the instructions to save the changes.
4. Open the app's repository from the [Altinn Studio Dashboard](/app/getting-started/navigation/dashboard/) and look at the files in the `App/models` folder.

{{% notice info %}}
If you intend to carry out all or parts of the development locally, now is the time to [prepare for local development and testing](/app/getting-started/local-dev).
{{% /notice %}}

### Useful Documentation

- [Altinn Studio Data Modeling](/app/development/data/data-modeling/)
- [Description of Indicators in XSD](https://www.w3schools.com/xml/schema_complex_indicators.asp)
- [Installing curl for Windows](https://developer.zendesk.com/documentation/api-basics/getting-started/installing-and-using-curl/#windows)
- [Altinn Studio Repository](/app/getting-started/navigation/repos/)

### Knowledge Check

{{% expandsmall id="m1t1q1" header="What data does the service owner want to collect here?" %}}

The data model consists of a primary element: "innflytter" (migrant).
This element contains sub-objects such as _Fornavn_ (first name), _Etternavn_ (last name), and _Mellomnavn_ (middle name). In addition, there are composite elements like _Adresse_ (address), _Kontaktinformasjon_ (contact information), and _Arbeidsinformasjon_ (work information).
{{% /expandsmall %}}

{{% expandsmall id="m1t1q2" header="What effect does `minOccurs` have in the data model? You will notice that the field has different values for `Innflytter.Fornavn` and `Innflytter.Mellomnavn`." %}}

`minOccurs` indicates how many times the object must be mentioned at a minimum.
- `minOccurs=0` means that the field is not required.
- `minOccurs=1` means it is expected to appear at least once in the model.
{{% /expandsmall %}}

{{% expandsmall id="m1t1q3" header="What other properties are set on the field `Innflytter.Mellomnavn`?" %}}

`nillable=true` is defined in the middle name field, meaning a null value is allowed for the middle name.
{{% /expandsmall %}}

{{% expandsmall id="m1t1q4" header="When uploading the data model (`.xsd` file), the following model files were generated: `.C#`, `.metadata.json`, and `.schema.json`. What is the relationship between these files and the `.xsd` file?" %}}

The mentioned files are all generated from the `.xsd` description of the data model. They describe all the data and the properties of the data fields. Not all properties are necessarily transferred to all files, but the sum of their settings should maintain the settings of the `.xsd` file.

- The C# model is used by the app backend to deserialize data and make it available for processing and validation.
- `.metadata.json` is used in Altinn Studio to connect components and dynamics to the data fields easily.
- The `.schema.json` file is used by the Altinn app frontend for form validation on the client side.
{{% /expandsmall %}}

{{% expandsmall id="m1t1q5" header="Certain restrictions from the data model are not transferred to the `.C#` file. Which ones? Additionally, new properties have been added. What are they?" %}}

- The properties `minOccurs` and `maxOccurs` are not transferred to the model.
- `nillable` is only transferred to certain types, such as _decimal_.
- `XmlElement.Order` is introduced as a decoration on each property.
  - This ensures that the order of elements will always be the same when the data is serialized to XML.
{{% /expandsmall %}}

{{% /expandlarge %}}

{{% expandlarge id="add-components" header="Add Components" %}}

You can configure the components in an application using the graphical user interface [Altinn Studio Designer](/app/getting-started/).
 You can also configure them manually by editing the `<pageName>.json` file, which describes the structure of a form page (you can find the file in `App/ui/layouts`).

### Requirements from the Municipality

The first form page gathers personal information about the new resident and should have the following components:
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

1. Set up the first form page with components based on the requirements of the Municipality.
2. Add labels by connecting text resources to each of the components.

Remember to upload changes when working in Designer to update the repository.

### Useful Documentation

- [Building a Form with the UI Editor in Altinn Studio](/app/getting-started/)
- [Available components in Altinn Studio Library](/app/guides/design/guidelines/components/)

### Knowledge Check

In your application repository, you will find the `<pageName>.json` file in the `App/ui/layouts` folder. The JSON file describes the form page you have set up in Altinn Studio, assuming you have uploaded the changes.

You can find `<page>.json` in your application repository in the folder `App/ui/layouts`. The JSON file describes the data page you have set up in Altinn Studio, assuming you have uploaded the changes (`<page>` is replaced with the page's name, for example, `data.json`).

{{% expandsmall id="m1t3q1" header="Do you find the component connected to the email field?" %}}

To locate the component connected to the email field, you can search for 'epost' (email).
You will find the field name connected to the component under `dataModelBindings.simpleBinding` (highlighted).

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{linenos=false,hl_lines="7"}
{
  ...
  
  "id": "epost",
  "type": "Input",
  "dataModelBindings": {
    "simpleBinding": "Innflytter.Kontaktinformasjon.Epost"
  },
  "required": true,
  "readOnly": false,
  "textResourceBindings": {
    "title": "innflytter.epost"
  }
}
```

{{% /expandsmall %}}

{{% expandsmall id="m1t3q2" header="What change is required in `<page>.json` if the email field should no longer be required?" %}}

To make a field optional, you can change `required: true` to `required: false`.
{{% /expandsmall %}}

{{% expandsmall id="m1t3q3" header="By changing one line in `<page>.json`, you can transform the component associated with the middle name into an input field for a long answer. What change is required?" %}}

The solution is to change the `type` field from `Input` to `TextArea` (highlighted).

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{linenos=false,hl_lines="3"}
{
  "id": "mellomnavn",
  "type": "TextArea",
  "textResourceBindings": {
    "title": "innflytter.mellomnavn"
  },
  "dataModelBindings": {
    "simpleBinding": "Innflytter.Mellomnavn"
  },
  "required": true,
  "readOnly": false
}
```
{{% /expandsmall %}}
{{% /expandlarge %}}

## Summary

In this module, you have created an application in Altinn Studio,
added a data model, and set up a form page that connects components to fields in the data model.

If you have prepared for local development, you have also cloned the application to your local development environment.
The application should be runnable on your local machine with LocalTest, and you should be able to fill in the fields.

## Solution

[Source code Module 1](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul1)<br>

{{% notice info %}}
A worked solution is underway.
{{% /notice %}}

<br><br>

{{% center %}}
<!--[Next module >>](../modul2/)-->
{{% /center %}}