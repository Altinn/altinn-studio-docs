---
title: Altinn Studio Data Modeling
linktitle: Data Modeling
description: User guide for Altinn Studio Data Modeling tool
weight: 1
toc: true
---

{{% notice info %}}
The Data Modeling tool in Altinn Studio is under development and will have limited functionality until it is completed.
{{% /notice %}}

Altinn Studio Data Modeling is a tool for developing data models. It is based on a data model in JSONSchema format and can generate XSD and C# models from it.

### Data Model Files

* **XSD Data Model** (`<model>.XSD`): Data model in XML format that defines the elements that can be used in a document.
* **C# Data Model** (`<model>.cs`): Data model used by the application's backend to deserialize data and make it available for processing and validation.
* **JSON Schema** (`<model>.schema.json`): Data model in JSONSchema format used by the application's frontend for client-side form validation.
* **JSON Metadata** (`<model>.metadata.json`): Used by Altinn Studio to link components and dynamics to data fields.

## Navigating to Altinn Studio Data Modeling

1. Log in to Altinn Studio. If you are not in the [Altinn Studio Dashboard](/app/getting-started/navigation/dashboard/), navigate there by clicking on the logo in the top left corner or [here](https://altinn.studio/dashboard).
2. Select _Edit_ (blue pen icon) either for:  
   a. An app under "Mine applikasjoner" (My Applications) or  
   b. Data Modeling repository for your organization.
3. Select the **Datamodell** (Data model) tab in the top menu.

## Uploading and Viewing a Data Model

The data model defines the data that can be submitted through an app and the allowed format of the data.
Currently, we only support uploading XSD data models.
When uploading an XSD model `<model>.xsd`, the tool will generate the following files: `<model>.cs`, `<model>.schema.json`, and `<model>.metadata.json` (see [Data Model Files](#data-model-files)).

1. Click _Last opp datamodell_ (_Upload Data Model_) from the homepage if there are no existing data models or _Last opp_ (_Upload_) from the
   toolbar at the top of the tool.
2. Select an XSD data model file in the file picker and click _Last opp_.

![Upload Data Model](upload-datamodel.png "Upload Data Model")

After the data model is processed, you can find the generated files under `App/models/` in the app repository.

The types defined in the data model are displayed in the left-side panel.
A tree view of the data model can be opened to see a visual representation of the data model and the available fields.

![View Data Model](view-model.png "View Data Model")

## Selecting a Model from the Dropdown List

All models uploaded in the tool for an app or the organization's repository (`<org>-datamodels`) are available from the drop-down list in the toolbar.
XSDs that exist in a repository but do not have any associated model files (JSONSchema) will also appear in the list. See the next
section for more information.

### Specific to Organization-Level Data Modeling

When working with a data model repository at the organization level (instead of directly with an app), there are two groups of
data models displayed in the dropdown list.

- The first one is _JSONSchema_. These are models generated after the processing of uploaded XSD models.
- The second one is _XSD_. These are the XSDs that exist in the `<org>-datamodels` repository but have not been imported and
  processed in the tool. When selecting a model from the XSD list, it will automatically be imported into the tool, and
  a JSONSchema model file will be generated. This can then be further worked on in Altinn Studio Designer.

## Create a New Data Model

To create a new data model from scratch:

   1. Click _Lag ny_ (_Create new_) on the left-side of the toolbar.
   2. Enter the name of the data model in the field.
   3. Click _Opprett modell_ (_Create model_).

The data model will be created with some example fields that you can work with or delete:

  - `property1` (text, required)
  - `property2` (text, required)
  - `property3` (text)

![Create new data model](create-edit-model.gif "Create a new data model")

## Editing a Data Model

{{% notice warning %}}
Functionality for editing the data model with the Altinn Studio Data Model tool is under development and will be somewhat limited until it is completed.
{{% /notice %}}

Select a model from the dropdown list on the toolbar and click _Rediger_ (_edit_)
 in the top right corner of the model tool. A panel for editing the model will appear on the right side.

{{% notice info %}}
The JSONschema model is automatically saved as you work on it. To generate other model files such as XSD (and C# file for apps), you need to
click the _Generate Models_ button in the top right corner (see [Generating Model Files](#generating-model-files-xsd-and-c)).
{{% /notice %}}

### Adding a New Field

To add a field at the top-level (root node), click "Add" (button above existing fields).

You can add sub-fields to fields of the Object type via the context menu of the field (three dots to the right of the field name) or by clicking the field and select the tab _Felter_ (_Fields_) in the right-side panel.

### Adding a New Type

Click on the **+** sign in the "Types" panel on the left side.

### Converting Field to Type

A field can be converted to a type by clicking the three dots to the right of the field and selecting "Convert to Type".

### Editing a Type

1. Select the desired type from the panel on the left side by clicking on it. A tree view for the type will then appear in the center.
2. Properties for the type can be edited in the right-side panel.
3. Add new fields by clicking the "Legg til" (Add) button at the top.
4. Selecting individual fields to edit their properties in the right-side panel.
5. Exit the type editing mode for types by clicking on the **x** at the top of the model panel, next to `Du redigerer nå på <type>`.

### Deleting a Type

1. Select the desired type from the panel on the left side.
2. Click the context menu (three dots) on the top field (root node) of the type and select "Delete".

Note that it is not possible to delete types that are in use.

### Adding a Type Reference

A type reference is a field that follows the structure of a custom type.
 For instance, if you have the type 'Address' with fields 'StreetName', 'PostalCode', and 'Location', adding a reference to that type will automatically add these fields.
  The type is displayed next to the field name in the tree view.

 ![Type reference](type-references.png "Type references")

 To add a type reference at the top level, click _Legg til_ (add) at the top of the tree view and choose _Legg til referanse_ (add reference).
 To add a type reference as a sub field, click the three dots next to a field and select _Legg til referanse_.

 In the right-hand panel, select the type you wish to reference from the drop-down list "Refererer til" (refers to).

### Deleting a Field

Click on the three dots to the right of the node/field and select _Slett_ (delete) from the menu.

### Editing Properties of a Field

1. Click on the node/field you want to edit to display the properties in the right-side panel.
2. Edit the properties of the node/field as desired. The available properties for the field will vary based on the base type
   of the field.

### Editing/Adding XSD attributes, namespaces, etc., including `dataFormatId` and `dataFormatVersion`.

This is currently not directly supported in the tool and must be done manually. Descriptions
on how to do this can be found in the links below:

- [dataFormatId og dataFormatVersion][1]
- [XSD attributter generelt][2]
- [XSD namespaces][3]

## Generating Model Files (XSD and C#)

Once the model is ready, you can generate model files by clicking on the **Generate Models** button above the right panel.
For the `<org>-datamodels` repository, a XSD file will be generated. For the app repository, both a XSD and C# model files will be generated.
Remember to click **Last opp dine endringer** (Upload your changes) on the right side of the main menu in Altinn Studio to save your changes.

## Downloading XSD

A generated XSD file can be downloaded by accessing the repository: click on the person icon in the top right corner of the page and select
"Open repository." Navigate to the desired file in `App/models/` and click on the download icon.

![Download XSD repo](./download-xsd.png "Download XSD from repo")

[1]: ../altinn-2/#dataformatid-og-dataformatversion
[2]: ../altinn-2/#xsd-attributter
[3]: ../altinn-2/#xsd-namespaces
